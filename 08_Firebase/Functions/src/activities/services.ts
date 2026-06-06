import * as admin from 'firebase-admin';
import { PointTransaction, Activity } from '../shared/models';

export class ActivitiesService {
  constructor(private db: admin.firestore.Firestore) {}

  async createActivityFromTransaction(tx: PointTransaction, batch?: admin.firestore.WriteBatch) {
    const activityRef = this.db.collection(`schools/${tx.schoolId}/activities`).doc();
    const activityData: Activity = {
      schoolId: tx.schoolId,
      studentId: tx.studentId,
      title: 'Points Awarded',
      description: `Awarded ${tx.points} points for ${tx.reason}`,
      pointsAwarded: tx.points,
      type: 'point_transaction',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    if (batch) {
      batch.set(activityRef, activityData);
    } else {
      await activityRef.set(activityData);
    }
  }
}

export class LeaderboardService {
  constructor(private db: admin.firestore.Firestore) {}

  /**
   * Safely increments the total points of a student without causing a full
   * synchronous leaderboard recalculation, preventing hot-document write amplifications.
   */
  async incrementStudentPoints(tx: PointTransaction, batch?: admin.firestore.WriteBatch) {
    const studentRef = this.db.collection(`schools/${tx.schoolId}/students`).doc(tx.studentId);
    
    if (batch) {
      batch.update(studentRef, {
        totalPoints: admin.firestore.FieldValue.increment(tx.points)
      });
    } else {
      await studentRef.update({
        totalPoints: admin.firestore.FieldValue.increment(tx.points)
      });
    }
  }
}

export class RewardService {
  constructor(private db: admin.firestore.Firestore) {}

  async evaluateBadges(tx: PointTransaction) {
    // Stub for evaluating badge thresholds asynchronously
    // e.g., if totalPoints cross a threshold, queue a badge unlock job.
    if (!this.db) return; // satisfy strict mode
  }
}

export class NotificationService {
  constructor(private db: admin.firestore.Firestore) {}

  async queueNotification(tx: PointTransaction) {
    // Stub for pushing into a notification queue collection or Pub/Sub topic
    // Avoids synchronously waiting for APNS/FCM.
    if (!this.db) return; // satisfy strict mode
  }
}

