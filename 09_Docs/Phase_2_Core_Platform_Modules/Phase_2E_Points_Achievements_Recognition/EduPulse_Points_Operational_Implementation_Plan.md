# EduPulse_Points_Operational_Implementation_Plan.md

# Phase 2E — Points, Achievements & Recognition Operational Implementation Plan

## Executive Summary

This document supplements the Architecture, Governance, Execution Plan, and Compatibility Assessment for **Phase 2E — Points, Achievements & Recognition**. Its purpose is to define the exact operational execution strategy for all core engines, ensuring zero ambiguity before implementation begins. It translates structural boundaries into explicit operational workflows, detailing exactly *how* points, achievements, approvals, leaderboards, and offline synchronizations will function.

---

## Repository Strategy

For every repository, the operational flow follows a strict sequence:
`Payload Received` → `Validator Execution` → `Datasource Interaction` → `Result Return`

### 1. PointsRepository
- **Firestore Collections:** `schools/{schoolId}/pointTransactions/{transactionId}`
- **Datasource:** `FirebasePointsDatasource`
- **Flow:** Validates `PointTransactionEntity` → Writes to canonical transaction collection (supporting single or multiple targets like student, class, house) → Returns success/failure. Ledger totals update separately.

### 2. AchievementRepository
- **Firestore Collections:** `achievementTemplates`, `students/{id}/achievements`
- **Datasource:** `FirebaseAchievementDatasource`
- **Flow:** Validates `AchievementEntity` against active templates → Writes assignment → Triggers `PointsRepository` if bonus points exist.

### 3. BadgeRepository
- **Firestore Collections:** `badgeTemplates`, `students/{id}/badges`
- **Datasource:** `FirebaseBadgeDatasource`
- **Flow:** Validates `BadgeEntity` (including expiry) → Writes assignment.

### 4. RecognitionRepository
- **Firestore Collections:** `recognitionTemplates`, `students/{id}/recognitions`
- **Datasource:** `FirebaseRecognitionDatasource`
- **Flow:** Validates `RecognitionEntity` → Writes assignment.

### 5. LeaderboardRepository
- **Firestore Collections:** `students/{id}` (aggregations), `classes/{id}`, `houses/{id}`
- **Datasource:** `FirebaseLeaderboardDatasource`
- **Flow:** Reads aggregated totals → Performs sorting → Returns sorted entity arrays.

### 6. ApprovalRepository
- **Firestore Collections:** `approvalWorkflows`
- **Datasource:** `FirebaseApprovalDatasource`
- **Flow:** Validates `ApprovalRequestEntity` → Writes request state (Pending/Approved/Rejected).

### 7. SnapshotRepository
- **Firestore Collections:** `leaderboardSnapshots`
- **Datasource:** `FirebaseSnapshotDatasource`
- **Flow:** Takes output of `LeaderboardRepository` → Converts to `LeaderboardSnapshotEntity` → Writes immutable document.

### 8. CategoryRepository
- **Firestore Collections:** `pointsCategories`, `deductionCategories`, `achievementCategories`
- **Datasource:** `FirebaseCategoryDatasource`
- **Flow:** Validates category state → Caches results locally for quick lookup.

### Template Lifecycle Governance
Explicit lifecycle governance is enforced for `AchievementTemplate`, `BadgeTemplate`, and `RecognitionTemplate`:
- Supported statuses are **Active** and **Archived** ONLY.
- `Draft`, `Pending`, or `Inactive` statuses are strictly prohibited.
- Only **Active** templates may be assigned.
- **Archived** templates remain available historically but cannot be newly assigned.
This aligns exactly with the governance philosophy established in Phase 2B.

---

## Ledger Strategy

All points are stored as immutable `PointTransactionEntity` records. Ledgers are aggregated from these transactions.

### Point Award Flow
1. **Award Points Request:** Service receives request.
2. **Validate Request:** `PointTransactionValidator` executes.
3. **Create PointTransaction:** Single canonical transaction record generated in `schools/{schoolId}/pointTransactions/{transactionId}` containing target definitions (e.g. Student, House).
4. **Update PointLedger:** Targets' total points aggregated via Firestore `FieldValue.increment()`.
5. **Update Leaderboard Totals:** `LeaderboardService` refreshes ranking state.
6. **Create Audit Event:** Emit `PointsAwarded`.

### Point Deduction Flow
#### Individual Deduction
1. **Deduction Request:** Service receives request with reason.
2. **Approval Request:** `ApprovalWorkflowService` evaluates requirement.
3. **Approval Decision:** Approver grants permission.
4. **Transaction Creation:** Negative `PointTransaction` created.
5. **Ledger Update:** Target's total reduced via `FieldValue.increment()`.
6. **Leaderboard Recalculation:** `LeaderboardService` updates rankings.
7. **Audit Event:** Emit `PointsDeducted` and `ApprovalGranted`.

#### Bulk Deduction
Executes the Individual Flow asynchronously inside a batched transaction array, ensuring atomic success or failure.

### Point Correction Flow
Points are strictly immutable. Editing is prohibited.
1. **Correction Request:** Original transaction ID referenced.
2. **Reversal Transaction:** Create negative equivalent of original transaction (e.g., if original was +10, write -10 reversal).
3. **Replacement Transaction:** Create new correct transaction (e.g., +15).
4. **Ledger Recalculated:** Target's total reflects net change.
5. **Audit Event:** Emit `PointsCorrected`.

---

## Approval Strategy

### Manual Awards
- Immediate execution.
- Reason required.
- No approval required by default.
- Schools may optionally configure approval requirements for specific award categories.

### Manual Deductions
- Approval required.
- Reason mandatory.
- Approval workflow mandatory.
- Permission-driven.

### Individual and Bulk Approvals
Authorized users evaluate pending deduction workflows or optionally configured award workflows.
1. Target action placed in `Pending` state.
2. `ApprovalRequestEntity` written to `approvalWorkflows`.
3. Authorized user queries pending workflows.
4. User Approves/Rejects (Single or Bulk).
5. If Approved, Target Action is executed.

### Approval Routing
- **Permission-Based Check:** Hardcoded role names (e.g., "Principal") are prohibited. `ApprovalWorkflowService` verifies user possesses the specific `can_approve_deductions` or equivalent RBAC permission.

---

## Events & Leadership Integration Strategy

### Event Integration (Phase 2D Hooks)
1. **Event Complete:** Hook triggered.
2. **Recognition/Achievement Evaluation:** Map event outcomes to `AchievementTemplates`.
3. **Point Assignment:** Execute Point Award Flow based on event rankings.
4. **Leaderboard Update:** Re-calculate targets.

### Leadership Integration (Phase 2C Hook)
1. Phase 2C assigns a student a leadership role.
2. Recognition Engine detects `LeadershipAssignment`.
3. Automatically triggers Recognition Assignment for roles (e.g., House Captain, Class Monitor).

---

## Leaderboard Strategy

### Calculation Method
Leaderboards are virtual aggregations calculated dynamically via queries sorting by descending total points.
- **Student:** Query `students` where `academicYearId` matches.
- **Class:** Query `classes` where `academicYearId` matches.
- **House:** Query `houses` where `academicYearId` matches.

### Recalculation & Synchronization
- Recalculated locally upon new Point Transactions.
- Synchronized globally via Firestore listeners.

---

## Synchronization Strategy

To mitigate offline synchronization risks (Medium Risk identified in Compatibility Assessment):
1. **Offline Transaction Queue:** `PointTransactionEntity` stored locally via Hive/sqflite.
2. **Synchronization:** Upon reconnection, the queue is pushed to Firestore in chronological batches.
3. **Ledger Rebuild:** Firestore resolves all `FieldValue.increment()` calls resolving conflicts.
4. **Leaderboard Rebuild:** Client requests a fresh fetch of Leaderboard state after the queue is cleared.

---

## Snapshot Strategy

Executed strictly at Academic Year Closure. The following records are **NEVER reset**: Point Transactions, Achievements, Badges, Recognition Records, Approval Records, and Audit Records.

Academic Year Closure must:
1. **Generate snapshots:** `LeaderboardService` locks calculations and generates final rankings, writing to `leaderboardSnapshots`.
2. **Store Champions:** Record House and Class Champions (Highest House Points, Highest Class Points).
3. **Archive historical records:** All current-year records become immutable and remain permanently available and queryable.
4. **Reset active totals:** Reset only current-year aggregate totals and active leaderboard calculations for the new year.

---

## Visibility Strategy

`parentVisible`, `studentVisible`, and `teacherVisible` boolean flags are appended to all Achievement, Badge, and Recognition records.
- Stored directly in the entity payload.
- Consumed by API access layers.
- Phase 2E does not implement the UI for the Parent Portal. Storage only.

---

## Audit Strategy

Audit events are appended sequentially to the Phase 1D audit log service.
- **PointsAwarded:** Emitted post `FieldValue.increment()`.
- **PointsDeducted:** Emitted post `FieldValue.increment()`.
- **PointsCorrected:** Emitted after Replacement Transaction write.
- **AchievementAssigned / BadgeAssigned / RecognitionAssigned:** Emitted post document creation.
- **BadgeExpired:** Emitted by cron/scheduled function.
- **ApprovalRequested / Granted / Rejected:** Emitted by `ApprovalWorkflowService`.
- **SnapshotGenerated / LeaderboardGenerated:** Emitted post Academic Year closure.

---

## Search & Performance Strategy

### Search
- Indexed natively in Firestore. Searching by Student, Class, House, Category, and Academic Year relies on array-contains and equality indexing.

### Firestore Performance
- **Batch Writes:** Used for all Bulk Awards and Bulk Deductions. Chunked at 500 documents per batch per Firestore limits.
- **Ledger Totals:** Updated strictly via `FieldValue.increment()` to prevent concurrent write collisions for large schools.

---

## Testing Strategy

Targeting **100% Coverage** per Execution Plan requirements.
- **Validator Tests:** Unit tests verifying boundary conditions, nulls, and negative inputs.
- **Service Tests:** Mocked data tests ensuring accurate sequences for point awards, deductions, and corrections.
- **Repository Tests:** Integration tests validating Firestore reads, writes, and batch behaviors.
- **Integration Tests:** Full module workflows simulated in testing environments.

---

## Execution Safety Rules
- **No Empty Scaffolds**
- **No TODO Markers**
- **No Stub Methods**
- **No Placeholder Repositories**
- **No Placeholder Datasources**

Every file generated during implementation must contain fully executable logic.

---

## Implementation Readiness Assessment

All operational ambiguities have been addressed. The architectural boundaries, data persistence flows, approval sequences, offline strategies, and snapshot mechanisms are clearly defined.

### Final Recommendation

**READY FOR IMPLEMENTATION**

Phase 2E is operationally defined and ready for implementation.
