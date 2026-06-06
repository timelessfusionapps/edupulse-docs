import * as admin from 'firebase-admin';
import { PointTransaction } from '../shared/models';
import { ActivitiesService, LeaderboardService, RewardService, NotificationService } from './services';
import { IdempotencyService } from '../utils/IdempotencyService';
import { AppFunctionLogger } from '../logging/AppFunctionLogger';

export class PointTransactionOrchestrator {
  private activitiesService: ActivitiesService;
  private leaderboardService: LeaderboardService;
  private rewardService: RewardService;
  private notificationService: NotificationService;
  private idempotencyService: IdempotencyService;

  constructor(private db: admin.firestore.Firestore, private logger: AppFunctionLogger) {
    this.activitiesService = new ActivitiesService(db);
    this.leaderboardService = new LeaderboardService(db);
    this.rewardService = new RewardService(db);
    this.notificationService = new NotificationService(db);
    this.idempotencyService = new IdempotencyService(db);
  }

  async handleNewTransaction(eventId: string, tx: PointTransaction) {
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

    } catch (e) {
      this.logger.error(`Error orchestrating transaction ${tx.id}`, e);
      throw e; 
    }
  }
}

