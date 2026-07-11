# Phase 4 — Stage S1: Backend Defect Register
## Super Admin Platform
**Date:** 2026-07-10

### Critical Priority
- **DEF-001:** Missing Platform-Level Security Rules. The `firestore.rules` file enforces a "Default Deny" but lacks rules for platform collections (`platform_admins`, `audit_logs`, etc.), blocking all Super Admin operations outside of a specific school.
  **Pilot Status:** 🟢 Required for Pilot
- **DEF-002:** Missing Centralized Audit Logs. Audit trails are disjointed; `firestore.rules` protects `point_transactions`, but platform-wide audit pipelines do not exist.
  **Pilot Status:** 🟡 Recommended Before Production
- **DEF-003:** Missing Recovery Infrastructure. Flow F (Recovery & Incident Response) has no backend implementation. No `recovery_jobs` collection or rollback handlers exist.
  **Pilot Status:** 🟡 Recommended Before Production
- **DEF-004:** Severe DTO Layer Deficiencies. The packages layer relies almost entirely on domain entities, lacking data-layer DTOs (`school_model.dart` is an exception). This guarantees raw map leakage and unsafe serialization.
  **Pilot Status:** 🟢 Required for Pilot

### High Priority
- **DEF-005:** Missing Repositories for Core Flows. No backend repositories exist for Flow C (Trial Governance), Flow D (Platform Admin Governance), Flow F (Recovery), or Flow H (Command Center).
  **Pilot Status:** 🟢 Required for Pilot (Flow D only; Flow C, F, H deferred or recommended)
- **DEF-006:** Missing Central Event Pipeline. Event-driven architecture is not implemented. There is no infrastructure to publish and subscribe to cross-module events (e.g., rollback events, audit events).
  **Pilot Status:** 🟢 Required for Pilot
- **DEF-007:** Missing Cloud Functions for Communication. The Dart `notifications` package has repositories, but the Cloud Functions to dispatch, trigger, and track these broadcasts (Flow G) are missing.
  **Pilot Status:** 🔵 Deferred After Pilot
- **DEF-008:** Missing Platform-Level Firestore Collections. Collections for Super Admin workflows have not been provisioned in Firestore architecture documentation or rules.
  **Pilot Status:** 🟢 Required for Pilot

### Medium Priority
- **DEF-009:** Missing Scheduled Functions. Recurring jobs for cleanup, trial expiration, and subscription checks are not present in Cloud Functions.
  **Pilot Status:** 🟡 Recommended Before Production
- **DEF-010:** Missing Executive Aggregation Services. `analytics` package exists but does not aggregate platform health or watchlists required for Flow H.
  **Pilot Status:** 🔵 Deferred After Pilot
- **DEF-011:** Inconsistent Mapping Layer. Without DTOs, mappers are either missing or dangerously implemented directly on entities.
  **Pilot Status:** 🟢 Required for Pilot

### Low Priority
- **DEF-012:** Unoptimized Query Indexes. As new platform collections are created, `firestore.indexes.json` will need to be updated to support the complex aggregations for the Executive Command Center.
  **Pilot Status:** 🔵 Deferred After Pilot
