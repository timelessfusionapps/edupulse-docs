import * as admin from 'firebase-admin';

export class IdempotencyService {
  private db: admin.firestore.Firestore;

  constructor(db?: admin.firestore.Firestore) {
    // If not provided, fallback to default admin app db
    this.db = db ?? admin.firestore();
  }

  /**
   * Acquires a lock for a given event ID.
   * If the event has already been processed, returns false.
   * Otherwise, locks the event and returns true.
   * Must be called inside a transaction if wrapping other transactional writes,
   * but for simple idempotency checks, a standalone transaction works.
   */
  async acquireLock(eventId: string, domain: string = 'general'): Promise<boolean> {
    const lockRef = this.db.collection('processed_events').doc(eventId);
    
    try {
      return await this.db.runTransaction(async (transaction) => {
        const doc = await transaction.get(lockRef);
        
        if (doc.exists) {
          return false; // Already processed
        }

        transaction.set(lockRef, {
          domain,
          processedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        
        return true; // Lock acquired successfully
      });
    } catch (e) {
      throw new Error(`Failed to acquire lock for eventId: ${eventId}. Error: ${e}`);
    }
  }
}
