"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = exports.RewardService = exports.LeaderboardService = exports.ActivitiesService = void 0;
const admin = require("firebase-admin");
class ActivitiesService {
    constructor(db) {
        this.db = db;
    }
    async createActivityFromTransaction(tx, batch) {
        const activityRef = this.db.collection(`schools/${tx.schoolId}/activities`).doc();
        const activityData = {
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
        }
        else {
            await activityRef.set(activityData);
        }
    }
}
exports.ActivitiesService = ActivitiesService;
class LeaderboardService {
    constructor(db) {
        this.db = db;
    }
    /**
     * Safely increments the total points of a student without causing a full
     * synchronous leaderboard recalculation, preventing hot-document write amplifications.
     */
    async incrementStudentPoints(tx, batch) {
        const studentRef = this.db.collection(`schools/${tx.schoolId}/students`).doc(tx.studentId);
        if (batch) {
            batch.update(studentRef, {
                totalPoints: admin.firestore.FieldValue.increment(tx.points)
            });
        }
        else {
            await studentRef.update({
                totalPoints: admin.firestore.FieldValue.increment(tx.points)
            });
        }
    }
}
exports.LeaderboardService = LeaderboardService;
class RewardService {
    constructor(db) {
        this.db = db;
    }
    async evaluateBadges(tx) {
        // Stub for evaluating badge thresholds asynchronously
        // e.g., if totalPoints cross a threshold, queue a badge unlock job.
        if (!this.db)
            return; // satisfy strict mode
    }
}
exports.RewardService = RewardService;
class NotificationService {
    constructor(db) {
        this.db = db;
    }
    async queueNotification(tx) {
        // Stub for pushing into a notification queue collection or Pub/Sub topic
        // Avoids synchronously waiting for APNS/FCM.
        if (!this.db)
            return; // satisfy strict mode
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=services.js.map