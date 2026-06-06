import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { PointTransaction } from '../../shared/models';
import { PointTransactionOrchestrator } from '../OrchestrationService';
import { AppFunctionLogger } from '../../logging/AppFunctionLogger';

// Ensure Firebase is initialized
if (admin.apps.length === 0) {
  admin.initializeApp();
}

const db = admin.firestore();

export const onPointTransactionCreated = functions.firestore
  .document('schools/{schoolId}/point_transactions/{transactionId}')
  .onCreate(async (snapshot, context) => {
    
    const eventId = context.eventId; // Unique event ID for idempotency
    const schoolId = context.params.schoolId;
    const transactionId = context.params.transactionId;
    const data = snapshot.data();

    const logger = new AppFunctionLogger({ schoolId, eventId, transactionId });

    // Validate structure (basic)
    if (!data || !data.studentId || !data.points) {
      logger.error('Invalid point_transaction payload', { data });
      return; // Stop processing, missing critical data
    }

    const tx: PointTransaction = {
      id: transactionId,
      schoolId: schoolId,
      studentId: data.studentId,
      points: data.points,
      reason: data.reason || 'General',
      createdAt: data.createdAt,
    };

    const orchestrator = new PointTransactionOrchestrator(db, logger);
    
    // Execute orchestration pipeline
    await orchestrator.handleNewTransaction(eventId, tx);
  });
