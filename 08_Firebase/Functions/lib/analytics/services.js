"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const admin = require("firebase-admin");
class AnalyticsService {
    constructor(db) {
        this.db = db;
    }
    /**
     * Appends an immutable analytics snapshot to the database.
     * This avoids hot-document issues by creating a time-series log
     * rather than constantly updating a central aggregated document.
     */
    async appendSnapshot(snapshot) {
        const ref = this.db.collection(`schools/${snapshot.schoolId}/analytics_history`).doc();
        await ref.set(Object.assign(Object.assign({}, snapshot), { createdAt: admin.firestore.FieldValue.serverTimestamp() }));
    }
}
exports.AnalyticsService = AnalyticsService;
//# sourceMappingURL=services.js.map