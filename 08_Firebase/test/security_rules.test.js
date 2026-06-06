const fs = require('fs');
const { initializeTestEnvironment, assertFails, assertSucceeds } = require('@firebase/rules-unit-testing');
const { serverTimestamp, setDoc, doc, addDoc, collection, getDoc, updateDoc, deleteDoc } = require('firebase/firestore');

let testEnv;

// ==========================================
// 1. EMULATOR CUSTOM-CLAIMS HELPER UTILITIES
// ==========================================
function getAuthContext(uid, schoolId, role, districtId = null) {
  return {
    uid,
    token: {
      schoolId,
      role,
      ...(districtId && { districtId })
    }
  };
}

// ==========================================
// 2. REUSABLE RBAC TESTING PERSONAS
// ==========================================
const personas = {
  unauthenticated: null,
  superAdmin: getAuthContext('uid_super', 'any_school', 'super_admin'),
  schoolAdmin: getAuthContext('uid_admin', 'school_1', 'school_admin'),
  principal: getAuthContext('uid_principal', 'school_1', 'principal'),
  teacher: getAuthContext('uid_teacher', 'school_1', 'teacher'),
  otherSchoolTeacher: getAuthContext('uid_other', 'school_2', 'teacher'),
  // Student role not explicitly tested here as it's not in the main write paths yet, but mapped
  student: getAuthContext('uid_student', 'school_1', 'student'),
};

before(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'demo-edupulse-test',
    firestore: {
      rules: fs.readFileSync('firestore.rules', 'utf8'),
    },
  });
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

after(async () => {
  await testEnv.cleanup();
});

describe('Firestore Security Rules: Tenant Isolation & RBAC', () => {

  it('Denies read for unauthenticated users on schools', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    await assertFails(getDoc(doc(db, 'schools/school_1')));
  });

  it('Allows teacher to read their own school', async () => {
    const db = testEnv.authenticatedContext('uid_teacher', personas.teacher.token).firestore();
    await assertSucceeds(getDoc(doc(db, 'schools/school_1')));
  });

  it('Denies teacher reading a different school (Tenant Isolation)', async () => {
    const db = testEnv.authenticatedContext('uid_teacher', personas.teacher.token).firestore();
    await assertFails(getDoc(doc(db, 'schools/school_2')));
  });

  it('Allows super_admin to read ANY school', async () => {
    const db = testEnv.authenticatedContext('uid_super', personas.superAdmin.token).firestore();
    await assertSucceeds(getDoc(doc(db, 'schools/school_2')));
  });

});

describe('Firestore Security Rules: Activities (Malicious Write Prevention)', () => {

  const validActivity = (schoolId) => ({
    schoolId,
    title: 'Test Activity',
    isArchived: false,
    createdAt: serverTimestamp() 
  });

  it('Allows teacher to create activity in their school with valid payload', async () => {
    const db = testEnv.authenticatedContext('uid_teacher', personas.teacher.token).firestore();
    await assertSucceeds(addDoc(collection(db, 'schools/school_1/activities'), validActivity('school_1')));
  });

  it('Denies teacher from creating activity in another school (Tenant Breach)', async () => {
    const db = testEnv.authenticatedContext('uid_teacher', personas.teacher.token).firestore();
    await assertFails(addDoc(collection(db, 'schools/school_2/activities'), validActivity('school_2')));
  });

  it('Denies creation if schoolId payload does not match the URL path (Spoofing Attempt)', async () => {
    const db = testEnv.authenticatedContext('uid_teacher', personas.teacher.token).firestore();
    await assertFails(addDoc(collection(db, 'schools/school_1/activities'), validActivity('school_2')));
  });
  
  it('Denies creation if future timestamp is provided', async () => {
    const db = testEnv.authenticatedContext('uid_teacher', personas.teacher.token).firestore();
    const payload = validActivity('school_1');
    payload.createdAt = new Date(Date.now() + 100000); // Future date
    await assertFails(addDoc(collection(db, 'schools/school_1/activities'), payload));
  });

  it('Denies student from creating an activity (Privilege Escalation)', async () => {
    const db = testEnv.authenticatedContext('uid_student', personas.student.token).firestore();
    await assertFails(addDoc(collection(db, 'schools/school_1/activities'), validActivity('school_1')));
  });

});

describe('Firestore Security Rules: Hard Delete Prevention', () => {

  it('Denies school_admin from hard-deleting a student', async () => {
    const db = testEnv.authenticatedContext('uid_admin', personas.schoolAdmin.token).firestore();
    await assertFails(deleteDoc(doc(db, 'schools/school_1/students/student_1')));
  });

  it('Allows super_admin to hard-delete a student', async () => {
    const db = testEnv.authenticatedContext('uid_super', personas.superAdmin.token).firestore();
    await assertSucceeds(deleteDoc(doc(db, 'schools/school_1/students/student_1')));
  });

});

describe('Firestore Security Rules: Point Transactions Immutability', () => {

  const validTx = (schoolId) => ({
    schoolId,
    points: 10,
    isArchived: false,
    createdAt: serverTimestamp()
  });

  it('Allows teacher to create point transaction', async () => {
    const db = testEnv.authenticatedContext('uid_teacher', personas.teacher.token).firestore();
    await assertSucceeds(setDoc(doc(db, 'schools/school_1/point_transactions/tx1'), validTx('school_1')));
  });

  it('Denies ANY client from updating point transaction', async () => {
    // Setup transaction as admin (bypassing rules in setup using withSecurityRulesDisabled)
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'schools/school_1/point_transactions/tx2'), validTx('school_1'));
    });

    const db = testEnv.authenticatedContext('uid_teacher', personas.teacher.token).firestore();
    await assertFails(updateDoc(doc(db, 'schools/school_1/point_transactions/tx2'), { points: 20 }));
  });

});

