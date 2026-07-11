# EduPulse Firestore Cost Optimization Architecture
Version: 1.0  
Authority Level: Global System Architecture  
Applies To: Entire EduPulse Platform  
Status: Mandatory

---

# 1. Purpose

This document defines the global Firestore architecture rules for EduPulse.

Its purpose is to:

- minimize Firestore read/write costs
- prevent uncontrolled query expansion
- reduce unnecessary listeners
- prevent architecture leaks
- enforce data lifecycle policies
- standardize backend communication
- govern audit logging architecture
- define safe frontend/backend integration practices

This document must be referenced during:

- backend implementation
- Flutter integration
- Cloud Functions development
- Firestore schema design
- ViewModel design
- repository pattern implementation
- analytics integration

No module may violate these standards.

---

# 2. Core Cost Model

Firestore cost is driven by:

## Writes
Charged when:
- creating documents
- updating documents
- deleting documents

Rule:

Every write must be intentional.

Never write duplicate states.

---

## Reads
Charged when:
- fetching documents
- listening to snapshots
- refreshing collections
- querying filtered results

Rule:

Reads are the highest hidden cost.

Minimize aggressively.

---

## Storage
Charged for:
- document size
- retained logs
- duplicated data

Rule:

Data must have lifecycle ownership.

---

## Network Egress
Charged when:
- large payloads move repeatedly
- large collections are fetched

Rule:

Never overfetch.

---

# 3. Global Firestore Rules

---

## Rule 1: No Unbounded Reads

Forbidden:

```dart
collection('students').get();
```

Required:

```dart
collection('students').limit(20);
```

Mandatory:
- every collection query must have limit
- default page size = 20
- maximum page size = 50

---

## Rule 2: Pagination Is Mandatory

Required:

Use:
- startAfter()
- endBefore()
- cursors

Forbidden:
- full collection loads
- page-number offset simulation

---

## Rule 3: No Global Snapshot Streams on Heavy Collections

Forbidden:

audit_logs.snapshots()

students.snapshots()

fees.snapshots()

Allowed only for:
- low-frequency small collections
- current user profile
- current classroom presence

Preferred:

polling

Recommended polling:
30–60 seconds

---

## Rule 4: Derived Data Over Live Aggregation

Forbidden:

counting documents client-side

Example:

- total fees collected
- total absentees
- critical logs
- pending approvals

Required:

maintain summary documents:

dashboard_metrics/current

audit_metrics/current

attendance_metrics/today

---

## Rule 5: No Duplicate Writes

Before writing:

validate if state changed

Forbidden:

writing same value again

Example:

attendance status unchanged

Do not write.

---

## Rule 6: Use Batch Writes for Atomic Operations

Required for:

- fee allocation
- admission creation
- audit logging
- permission changes

Use:

WriteBatch

Avoid:

multiple isolated writes

---

## Rule 7: Transactions for Critical Financial Operations

Mandatory for:

- fee payment
- refunds
- salary release
- scholarship adjustment

Never perform these as loose writes.

---

# 4. Audit Logging Policy

Audit logs are mandatory only for critical actions.

---

## Allowed Audit Scope

Must log:

- role changes
- permission changes
- fee edits
- student deletion
- staff deletion
- recovery actions
- exports
- account suspension
- login anomalies
- policy overrides
- bulk operations

---

## Forbidden Audit Scope

Must NOT log:

- screen opens
- button clicks
- tab changes
- text typing
- simple navigation
- low-risk reads

Reason:

prevents write inflation

---

# 5. Audit Architecture Standard

Use layered architecture.

---

## Layer 1: Raw Logs

Collection:

audit_logs

Retention:

90 days

Purpose:

forensics

Immutable.

---

## Layer 2: Derived Intelligence

Collections:

audit_metrics
compliance_queue
risk_clusters
anomaly_flags

Purpose:

dashboard reads

Cheap.

---

## Layer 3: Archive Layer

Storage:

BigQuery
Cloud Storage

Retention:

90+ days

Purpose:

long-term analytics

Firestore must not store permanent forensic history.

---

# 6. Data Retention Rules

---

## Short-Lived Data

Auto-delete:

- temporary notifications
- session traces
- low-risk logs

TTL:
7–30 days

---

## Medium-Lived Data

Keep:

- attendance records
- active fee states
- active academic records

Retention:
operational lifecycle

---

## Long-Lived Data

Archive:

- financial history
- board results
- audit trails

Move to cold storage.

---

# 7. Frontend Integration Rules

Mandatory:

Frontend must never directly construct Firestore queries.

All access through:

Repository Layer

Structure:

UI
→ ViewModel
→ Repository
→ Firestore Service

Forbidden:

UI → Firestore direct

---

# 8. Security Leak Prevention Rules

Never expose:

- raw admin permissions
- internal risk scoring logic
- audit hashes
- system tokens
- internal IDs unnecessarily

Use DTO sanitization.

---

# 9. Query Optimization Rules

Required indexes for:

- timestamp
- schoolId
- academicYear
- studentId
- feeStatus
- severity
- actorId

Every compound filter must be indexed.

No exception.

---

# 10. Cache Rules

Mandatory:

Enable local persistence.

Use:

Hive
or
Firestore local cache

Cache:

- user profile
- dashboard summaries
- permissions
- school metadata

Do not repeatedly fetch stable data.

---

# 11. Module-Specific Cost Policies

---

## Attendance

Batch writes preferred.

Never read entire class for one student update.

---

## Fees

Always transactional.

Use summary docs.

---

## Exams

Read only active exam scope.

Never full academic history.

---

## Staff

Lazy load.

---

## Platform Admin

Strict audit logging.

No real-time full admin registry.

---

## Audit Center

Use derived intelligence collections.

Never live-scan raw logs.

---

# 12. Verification Checklist

Before any backend module goes live:

Check:

[ ] Has query limit?
[ ] Has pagination?
[ ] Uses repository?
[ ] Avoids direct UI query?
[ ] Avoids unnecessary listener?
[ ] Uses summary docs?
[ ] Uses batch/transaction?
[ ] Has retention policy?
[ ] Has archive policy?
[ ] Has index coverage?
[ ] Has cache strategy?
[ ] Has audit scope validation?

If any answer is NO:

Implementation is blocked.

---

# 13. Enforcement Rule

This document overrides:

- local feature decisions
- temporary shortcuts
- developer convenience patterns

Violation of these rules requires architecture review.

This document becomes the Firestore Governance Contract for EduPulse.