import * as admin from 'firebase-admin';

export interface AnalyticsSnapshot {
  schoolId: string;
  metric: string;
  value: any;
  timestamp: any;
}

export class AnalyticsService {
  constructor(private db: admin.firestore.Firestore) {}

  /**
   * Appends an immutable analytics snapshot to the database.
   * This avoids hot-document issues by creating a time-series log
   * rather than constantly updating a central aggregated document.
   */
  async appendSnapshot(snapshot: AnalyticsSnapshot) {
    const ref = this.db.collection(`schools/${snapshot.schoolId}/analytics_history`).doc();
    await ref.set({
      ...snapshot,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }
}
