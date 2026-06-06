"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSchools = seedSchools;
const admin = require("firebase-admin");
async function seedSchools(db) {
    const batch = db.batch();
    // School 1 (Main test school)
    const school1Ref = db.collection('schools').doc('school_1');
    batch.set(school1Ref, {
        name: 'Springfield Elementary',
        domain: 'springfield.edu',
        subscriptionPlan: 'pro',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        isArchived: false,
    });
    // School 2 (Tenant isolation test school)
    const school2Ref = db.collection('schools').doc('school_2');
    batch.set(school2Ref, {
        name: 'Shelbyville Middle School',
        domain: 'shelbyville.edu',
        subscriptionPlan: 'basic',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        isArchived: false,
    });
    await batch.commit();
    console.log('   -> Seeded 2 Schools');
}
//# sourceMappingURL=SchoolSeeder.js.map