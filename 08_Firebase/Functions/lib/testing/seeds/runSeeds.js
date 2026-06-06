"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
// VERY IMPORTANT: Emulator kill-switch protection.
// We must NEVER run this script against a live production database.
if (process.env.FIRESTORE_EMULATOR_HOST !== '127.0.0.1:8080' &&
    process.env.FIRESTORE_EMULATOR_HOST !== 'localhost:8080') {
    console.error('FATAL: FIRESTORE_EMULATOR_HOST is not explicitly set to a local emulator.');
    console.error('Aborting seed to protect production databases!');
    process.exit(1);
}
if (!process.env.FIREBASE_AUTH_EMULATOR_HOST) {
    console.error('FATAL: FIREBASE_AUTH_EMULATOR_HOST is not set.');
    console.error('Aborting seed to protect production databases!');
    process.exit(1);
}
// Initialize admin app without default credentials (safely relies on emulator flags)
if (admin.apps.length === 0) {
    admin.initializeApp({
        projectId: 'demo-edupulse-test',
    });
}
const db = admin.firestore();
const auth = admin.auth();
const SchoolSeeder_1 = require("./SchoolSeeder");
const UserSeeder_1 = require("./UserSeeder");
const StudentSeeder_1 = require("./StudentSeeder");
async function runSeeds() {
    console.log('🚀 Starting EduPulse Emulator Seeding Process...');
    try {
        console.log('--- 1. Seeding Schools ---');
        await (0, SchoolSeeder_1.seedSchools)(db);
        console.log('--- 2. Seeding Development Personas ---');
        await (0, UserSeeder_1.seedUsers)(auth, db);
        console.log('--- 3. Seeding Realistic Student Data ---');
        await (0, StudentSeeder_1.seedStudents)(db);
        console.log('✅ Seeding completed successfully!');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Seeding failed with error:', error);
        process.exit(1);
    }
}
runSeeds();
//# sourceMappingURL=runSeeds.js.map