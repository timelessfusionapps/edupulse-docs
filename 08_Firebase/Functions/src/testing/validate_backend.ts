import * as admin from 'firebase-admin';

if (
  process.env.FIRESTORE_EMULATOR_HOST !== '127.0.0.1:8080' &&
  process.env.FIRESTORE_EMULATOR_HOST !== 'localhost:8080'
) {
  console.error('FATAL: FIRESTORE_EMULATOR_HOST is not set.');
  process.exit(1);
}

if (admin.apps.length === 0) {
  admin.initializeApp({ projectId: 'demo-edupulse-test' });
}

const db = admin.firestore();
const auth = admin.auth();

async function validateBackend() {
  console.log('🔍 Starting Backend Validation...');

  try {
    // 1. Check School
    const school = await db.collection('schools').doc('school_1').get();
    if (!school.exists) throw new Error('school_1 does not exist.');
    console.log('✅ Firestore: Schools reachable.');

    // 2. Check Auth User and Claims
    const user = await auth.getUser('teacher_1');
    if (!user) throw new Error('teacher_1 auth user missing.');
    
    if (user.customClaims?.role !== 'teacher' || user.customClaims?.schoolId !== 'school_1') {
      throw new Error(`Invalid custom claims for teacher_1: ${JSON.stringify(user.customClaims)}`);
    }
    console.log('✅ Auth & Claims: Custom claims are correctly injected.');

    // 3. Check Pagination Students
    const students = await db.collection('schools/school_1/students').limit(10).get();
    if (students.empty) throw new Error('Students collection is empty.');
    console.log(`✅ Firestore: Found ${students.size} seeded students.`);

    console.log('✅ Backend validation PASSED.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Backend validation FAILED:', error);
    process.exit(1);
  }
}

validateBackend();
