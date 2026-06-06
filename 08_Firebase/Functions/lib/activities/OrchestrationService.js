"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointTransactionOrchestrator = void 0;
const services_1 = require("./services");
const IdempotencyService_1 = require("../utils/IdempotencyService");
class PointTransactionOrchestrator {
    constructor(db, logger) {
        this.db = db;
        this.logger = logger;
        this.activitiesService = new services_1.ActivitiesService(db);
        this.leaderboardService = new services_1.LeaderboardService(db);
        this.rewardService = new services_1.RewardService(db);
        this.notificationService = new services_1.NotificationService(db);
        this.idempotencyService = new IdempotencyService_1.IdempotencyService(db);
    }
    async handleNewTransaction(eventId, tx) {
        this.logger.info(`Starting orchestration for transaction ${tx.id}`);
        const isLocked = await this.idempotencyService.acquireLock(eventId, 'point_transactions');
        if (!isLocked) {
            this.logger.warn(`Event ${eventId} has already been processed. Skipping orchestration.`);
            return;
        }
        try {
            const batch = this.db.batch();
            // 1. Create activity record via service
            await this.activitiesService.createActivityFromTransaction(tx, batch);
            // 2. Safely increment student points via service
            await this.leaderboardService.incrementStudentPoints(tx, batch);
            await batch.commit();
            this.logger.info(`Core mutations applied for transaction ${tx.id}`);
            // 3. Delegate to async queued services
            await this.rewardService.evaluateBadges(tx);
            await this.notificationService.queueNotification(tx);
        }
        catch (e) {
            this.logger.error(`Error orchestrating transaction ${tx.id}`, e);
            throw e;
        }
    }
}
exports.PointTransactionOrchestrator = PointTransactionOrchestrator;
//# sourceMappingURL=OrchestrationService.js.map