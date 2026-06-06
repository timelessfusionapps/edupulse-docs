# Student Offline & Optimistic State Architecture

## 1. Overview

This document defines the offline-first and optimistic state architecture for the Student Management module.

The architecture prepares EduPulse for:
- unstable school internet
- reconnect-safe workflows
- optimistic mutations
- pending write visibility
- offline-safe operation

---

# 2. Core Principles

The system must:
- remain usable offline
- preserve local visibility
- avoid destructive state loss
- reconcile safely after reconnect

---

# 3. Offline-First Philosophy

Firestore local persistence becomes:
the first operational layer.

The network becomes:
a synchronization layer.

---

# 4. Cached Read Strategy

When offline:
- cached student lists remain visible
- cached pagination remains visible
- filters continue operating locally

---

# 5. Pending Mutation Architecture

Pending mutations represent:
writes not yet confirmed by server reconciliation.

Examples:
- create student
- update student
- archive student

---

# 6. Optimistic UI Strategy

Optimistic UI flow:
1. Mutation initiated
2. UI updates immediately
3. Pending indicator appears
4. Firestore reconciles authoritative state

---

# 7. Pending Mutation Indicators

UI should eventually support:
- syncing badges
- pending indicators
- reconnect banners
- retry indicators

---

# 8. Reconnect Restoration

Reconnect lifecycle:
1. Firebase reconnects
2. Pending writes replay
3. Streams resume
4. Reconciliation restores authoritative state

---

# 9. Rollback Preparation

Architecture prepares for:
future rollback handling.

Current strategy:
Firestore last-write-wins.

---

# 10. Offline Mutation Safety

Offline writes MUST:
- queue safely
- replay safely
- preserve tenant integrity
- preserve pagination integrity

---

# 11. Archive Workflow Safety

Archived students MUST:
- disappear immediately locally
- remain archived after reconnect
- preserve historical analytics

---

# 12. Conflict Resolution Strategy

Current conflict strategy:
Firestore last-write-wins.

Future compatibility prepared for:
- merge resolution
- admin conflict resolution
- activity reconciliation

---

# 13. Offline UI States

The Bloc will eventually expose:
- offlineCached
- reconnecting
- syncing
- staleCache
- pendingMutation

WITHOUT exposing Firebase internals.

---

# 14. Stale Cache Handling

The UI must distinguish:
- truly empty data
- stale cached data
- failed network data

---

# 15. Retry Architecture

Failed mutations should support:
- retry workflows
- reconnect retry
- manual retry

---

# 16. Pagination Safety

Offline pagination MUST preserve:
- cursor stability
- deterministic ordering
- reconnect-safe restoration

---

# 17. Stream Safety

Realtime streams MUST:
- survive reconnects
- reconcile safely
- avoid duplicate entities
- preserve optimistic mutations

---

# 18. Future Scalability

This architecture prepares for:
- teacher attendance
- competitions
- activities
- live scoring
- offline classrooms

WITHOUT redesigning orchestration.