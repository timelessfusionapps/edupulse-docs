"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsers = seedUsers;
const admin = require("firebase-admin");
const PERSONAS = [
    { uid: 'superadmin_1', email: 'superadmin@edupulse.test', role: 'super_admin', schoolId: null },
    { uid: 'schooladmin_1', email: 'schooladmin@edupulse.test', role: 'school_admin', schoolId: 'school_1' },
    { uid: 'principal_1', email: 'principal@edupulse.test', role: 'principal', schoolId: 'school_1' },
    { uid: 'teacher_1', email: 'teacher1@edupulse.test', role: 'teacher', schoolId: 'school_1' },
    { uid: 'student_1', email: 'student1@edupulse.test', role: 'student', schoolId: 'school_1' },
    { uid: 'parent_1', email: 'parent1@edupulse.test', role: 'parent', schoolId: 'school_1' }, // Added parent_school_1
    { uid: 'teacher_2', email: 'teacher2@edupulse.test', role: 'teacher', schoolId: 'school_2' }, // For cross-tenant tests
];
async function seedUsers(auth, db) {
    const batch = db.batch();
    for (const persona of PERSONAS) {
        try {
            // 1. Create Auth User
            await auth.createUser({
                uid: persona.uid,
                email: persona.email,
                password: 'password123', // Hardcoded deterministic password
                emailVerified: true,
            });
            // 2. Inject Custom Claims strictly via Admin SDK (Emulator only due to guards in runSeeds)
            await auth.setCustomUserClaims(persona.uid, {
                role: persona.role,
                schoolId: persona.schoolId,
            });
            // 3. Create Public Profile Document
            if (persona.schoolId) {
                const userRef = db.collection(`schools/${persona.schoolId}/users`).doc(persona.uid);
                batch.set(userRef, {
                    email: persona.email,
                    role: persona.role,
                    schoolId: persona.schoolId,
                    createdAt: admin.firestore.FieldValue.serverTimestamp(),
                    isArchived: false,
                });
            }
        }
        catch (e) {
            if (e.code === 'auth/uid-already-exists') {
                console.log(`   -> Persona ${persona.email} already exists. Skipping auth creation.`);
            }
            else {
                throw e;
            }
        }
    }
    await batch.commit();
    console.log(`   -> Seeded ${PERSONAS.length} Personas and Claims`);
}
//# sourceMappingURL=UserSeeder.js.map