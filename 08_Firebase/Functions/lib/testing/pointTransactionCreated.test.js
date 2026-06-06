"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const fft = require("firebase-functions-test");
// Set environment variable to enable mock Firestore connection locally
// In a real environment, you might use the Firebase Emulator Suite properly mapped.
process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
// Initialize the test environment (assuming project demo-edupulse-test matches the emulator setup)
const testEnv = fft({ projectId: 'demo-edupulse-test' });
const pointTransactionCreated_1 = require("../activities/triggers/pointTransactionCreated");
describe('onPointTransactionCreated Integration Test', () => {
    let wrapped;
    let db;
    beforeAll(() => {
        if (admin.apps.length === 0) {
            admin.initializeApp({ projectId: 'demo-edupulse-test' });
        }
        db = admin.firestore();
        wrapped = testEnv.wrap(pointTransactionCreated_1.onPointTransactionCreated);
    });
    afterAll(async () => {
        testEnv.cleanup();
    });
    afterEach(async () => {
        // Basic cleanup logic if needed for isolated tests.
        // In strict emulator environments, using the emulator clear URL is better.
    });
    it('safely increments student points and generates an activity, rejecting duplicate events', async () => {
        var _a, _b;
        const schoolId = 'test_school';
        const transactionId = 'test_tx_1';
        const studentId = 'test_student';
        const eventId = 'unique_event_id_1';
        // 1. Setup Student
        const studentRef = db.collection(`schools/${schoolId}/students`).doc(studentId);
        await studentRef.set({ totalPoints: 0 });
        const snap = testEnv.firestore.makeDocumentSnapshot({
            studentId: studentId,
            points: 15,
            reason: 'Homework Completion'
        }, `schools/${schoolId}/point_transactions/${transactionId}`);
        // 2. Execute trigger
        await wrapped(snap, {
            params: { schoolId, transactionId },
            eventId
        });
        // 3. Verify total points incremented
        const updatedStudent = await studentRef.get();
        expect((_a = updatedStudent.data()) === null || _a === void 0 ? void 0 : _a.totalPoints).toBe(15);
        // 4. Verify activity creation
        const activitiesQuery = await db.collection(`schools/${schoolId}/activities`)
            .where('studentId', '==', studentId)
            .get();
        expect(activitiesQuery.size).toBe(1);
        expect(activitiesQuery.docs[0].data().pointsAwarded).toBe(15);
        // 5. Test IDEMPOTENCY: Execute same trigger again with same eventId
        await wrapped(snap, {
            params: { schoolId, transactionId },
            eventId
        });
        // Points should STILL be 15, NOT 30!
        const unchangedStudent = await studentRef.get();
        expect((_b = unchangedStudent.data()) === null || _b === void 0 ? void 0 : _b.totalPoints).toBe(15);
        // Activities should STILL be 1
        const unchangedActivitiesQuery = await db.collection(`schools/${schoolId}/activities`)
            .where('studentId', '==', studentId)
            .get();
        expect(unchangedActivitiesQuery.size).toBe(1);
    });
});
//# sourceMappingURL=pointTransactionCreated.test.js.map