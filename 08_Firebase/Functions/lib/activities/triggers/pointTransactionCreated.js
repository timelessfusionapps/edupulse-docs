"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onPointTransactionCreated = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const OrchestrationService_1 = require("../OrchestrationService");
const AppFunctionLogger_1 = require("../../logging/AppFunctionLogger");
// Ensure Firebase is initialized
if (admin.apps.length === 0) {
    admin.initializeApp();
}
const db = admin.firestore();
exports.onPointTransactionCreated = functions.firestore
    .document('schools/{schoolId}/point_transactions/{transactionId}')
    .onCreate(async (snapshot, context) => {
    const eventId = context.eventId; // Unique event ID for idempotency
    const schoolId = context.params.schoolId;
    const transactionId = context.params.transactionId;
    const data = snapshot.data();
    const logger = new AppFunctionLogger_1.AppFunctionLogger({ schoolId, eventId, transactionId });
    // Validate structure (basic)
    if (!data || !data.studentId || !data.points) {
        logger.error('Invalid point_transaction payload', { data });
        return; // Stop processing, missing critical data
    }
    const tx = {
        id: transactionId,
        schoolId: schoolId,
        studentId: data.studentId,
        points: data.points,
        reason: data.reason || 'General',
        createdAt: data.createdAt,
    };
    const orchestrator = new OrchestrationService_1.PointTransactionOrchestrator(db, logger);
    // Execute orchestration pipeline
    await orchestrator.handleNewTransaction(eventId, tx);
});
//# sourceMappingURL=pointTransactionCreated.js.map