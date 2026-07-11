const admin = require('firebase-admin');

process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';

admin.initializeApp({
  projectId: 'demo-edupulse-test'
});

const db = admin.firestore();

async function seedDevelopmentSchool() {
  const schoolId = 'edupulse_dev_school';
  console.log(`Starting seed for School ID: ${schoolId}`);

  const schoolRef = db.collection('schools').doc(schoolId);
  await schoolRef.set({
    name: 'EduPulse Development School',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    isArchived: false
  });

  // 1 Academic Year
  const yearId = 'ay_2026_2027';
  await schoolRef.collection('academic_years').doc(yearId).set({
    name: '2026-2027',
    startDate: new Date('2026-09-01'),
    endDate: new Date('2027-06-30'),
    status: 'active'
  });

  // 2 Terms
  const terms = ['Term 1', 'Term 2'];
  for (let i = 0; i < terms.length; i++) {
    await schoolRef.collection('terms').doc(`term_${i+1}`).set({
      name: terms[i],
      academicYearId: yearId,
      startDate: new Date(`202${6+i}-09-01`),
      endDate: new Date(`202${6+i}-12-31`)
    });
  }

  // 4 Houses
  const houseNames = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
  for (const name of houseNames) {
    await schoolRef.collection('houses').doc(`house_${name.toLowerCase()}`).set({
      name,
      totalPoints: 0,
      color: '#000000',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }

  // 5 Classes & 5 Sections
  for (let i = 1; i <= 5; i++) {
    const classId = `class_grade_${i}`;
    await schoolRef.collection('classes').doc(classId).set({
      name: `Grade ${i}`,
      academicYearId: yearId
    });
    
    await schoolRef.collection('sections').doc(`section_${i}A`).set({
      name: `Section A`,
      classId: classId
    });
  }

  // Users (1 Head, 1 Admin, 5 Teachers, 30 Students)
  const users = [
    { id: 'uid_dev_head', role: 'principal', name: 'Dev Head' },
    { id: 'uid_dev_admin', role: 'school_admin', name: 'Dev Admin' }
  ];
  for (let i = 1; i <= 5; i++) users.push({ id: `uid_dev_teacher_${i}`, role: 'teacher', name: `Teacher ${i}` });
  
  for (const u of users) {
    await schoolRef.collection('users').doc(u.id).set({
      name: u.name,
      role: u.role,
      email: `${u.id}@edupulse.dev`
    });
  }

  // 30 Students
  for (let i = 1; i <= 30; i++) {
    const houseIndex = i % 4;
    await schoolRef.collection('students').doc(`uid_student_${i}`).set({
      schoolId: schoolId,
      name: `Student ${i}`,
      houseId: `house_${houseNames[houseIndex].toLowerCase()}`,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }

  // 5 Events
  for (let i = 1; i <= 5; i++) {
    await schoolRef.collection('activities').doc(`event_${i}`).set({
      schoolId: schoolId,
      title: `Dev Event ${i}`,
      status: i <= 3 ? 'completed' : 'pending_approval',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }

  // 15 Recognitions (Point Transactions)
  for (let i = 1; i <= 15; i++) {
    await schoolRef.collection('point_transactions').doc(`pt_${i}`).set({
      schoolId: schoolId,
      studentId: `uid_student_${i}`,
      points: 10,
      reason: 'Good behavior',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }

  // 8 Leadership Assignments
  for (let i = 1; i <= 8; i++) {
    await schoolRef.collection('leadership_assignments').doc(`lead_${i}`).set({
      schoolId: schoolId,
      studentId: `uid_student_${i}`,
      roleTitle: 'Prefect',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }

  console.log('Seed completed successfully.');
}

seedDevelopmentSchool().catch(console.error);
