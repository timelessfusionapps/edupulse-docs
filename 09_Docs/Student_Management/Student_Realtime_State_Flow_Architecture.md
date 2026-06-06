# Student Realtime State Flow Architecture

## 1. Overview

This document defines the realtime operational state flow architecture for the Student Management module.

Its purpose is to standardize:
- stream orchestration
- mutation flow
- pagination coordination
- optimistic state transitions
- reconnect restoration
- offline synchronization

This architecture ensures:
- deterministic UI behavior
- stable realtime streams
- safe pagination
- archive-safe updates
- rebuild-safe orchestration

---

# 2. Architectural Flow

The realtime state flow strictly follows:

UI → Bloc → Repository → Datasource → Firebase

Realtime updates flow back upward through:
Firebase → Datasource → Repository → Bloc → UI

---

# 3. Core Realtime Principles

The architecture must preserve:
- deterministic ordering
- duplicate prevention
- pagination integrity
- archive-safe removal
- reconnect-safe restoration
- offline-safe synchronization

---

# 4. Stream Lifecycle Flow

## Initial Load

1. UI dispatches:
LoadStudentsRequested

2. Bloc initializes:
watchStudents()

3. Repository subscribes to:
Datasource stream

4. Datasource attaches:
Firestore snapshots listener

5. Initial snapshot flows upward.

---

# 5. Realtime Stream Tick Flow

Each Firestore snapshot tick:
- replaces current authoritative snapshot
- reconciles entities per tick
- avoids stale cross-tick persistence

Purpose:
prevent:
- stale entities
- archive leakage
- duplicate rows

---

# 6. Mutation Lifecycle

## Create Flow

1. UI dispatches:
StudentCreated

2. Bloc emits:
mutationInProgress

3. Repository executes:
createStudent()

4. Datasource performs:
Firestore write

5. Firestore emits:
stream tick

6. Stream reconciliation updates UI safely

---

# 7. Update Lifecycle

Update flow preserves:
- stable ordering
- pagination integrity
- optimistic visibility
- stream-safe reconciliation

---

# 8. Archive Lifecycle

Archive flow:
- performs soft delete only
- removes student immediately from active streams
- preserves historical analytics
- preserves pagination stability

Archived students MUST disappear:
on next stream tick.

---

# 9. Pagination State Flow

Pagination state is coordinated entirely inside Bloc.

UI NEVER:
- tracks Firestore cursors
- manages pagination reconciliation

---

# 10. Search Flow

Search lifecycle:
1. Search input changes
2. Debouncer activates
3. Existing pagination resets
4. New stream initializes safely

Purpose:
prevent:
query spam and stale pagination.

---

# 11. Offline State Flow

When offline:
- cached entities remain visible
- streams continue locally
- pending writes remain tracked

When reconnecting:
- stream reconciliation restores authoritative ordering

---

# 12. Optimistic Mutation Flow

Optimistic flow:
1. Mutation initiated
2. Pending mutation metadata exposed
3. Local cache updates instantly
4. Firestore reconciliation finalizes authoritative state

---

# 13. Reconnect Restoration Flow

Reconnect lifecycle:
1. Firebase reconnects
2. Streams resume
3. Fresh snapshots arrive
4. Reconciliation safely replaces stale cache state

---

# 14. Error Flow

Realtime failures:
- permission denied
- missing indexes
- offline errors
- stream cancellation

must map into:
UI-safe error states.

---

# 15. Partial Loading Flow

The Bloc supports:
- partial pagination loading
- mutation-only loading
- refresh loading

without:
full-screen rebuilds.

---

# 16. Stream Cleanup Flow

All subscriptions MUST:
- cancel safely
- dispose safely
- prevent duplicate listeners

inside:
Bloc.close()

---

# 17. Deterministic Ordering Rules

Realtime updates MUST preserve:
- stable sorting
- pagination integrity
- duplicate prevention
- archive-safe removal

---

# 18. Future Scalability

This architecture prepares for:
- competitions
- activities
- live leaderboards
- analytics streams
- notifications

WITHOUT redesigning orchestration.