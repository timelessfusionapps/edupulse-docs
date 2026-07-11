# Phase 4 — Stage S1: Backend Stabilization Roadmap
## Super Admin Platform
**Date:** 2026-07-10

This roadmap converts the Backend Readiness Assessment findings and Defect Register into executable work packages (Stages S2 -> S9), ordered by dependency.

> **Permanent Architectural Rule:** No backend capability may be permanently omitted because it has been deferred. Deferred work must always remain documented, prioritized, and scheduled for a future stabilization stage. The objective of the TEMS pilot is to sequence implementation—not to reduce platform scope.

### Stage S2: Domain & Data Layer Stabilization
**Reason:** Everything else depends on a stable domain model.
**Contents:** DTOs, Models, Mappers, Repository Interfaces, Serialization, Deserialization, Repository Contracts.
- **Work Package S2.1:** Audit all domain entities and create corresponding Data Transfer Objects (DTOs) for robust serialization/deserialization.
  **Pilot Status:** 🟢 Required for Pilot
- **Work Package S2.2:** Implement robust mappers between DTOs and Domain Entities across all packages.
  **Pilot Status:** 🟢 Required for Pilot
- **Work Package S2.3:** Standardize Repository Interfaces and Repository Contracts across all implemented flows.
  **Pilot Status:** 🟢 Required for Pilot
- **Work Package S2.4:** Implement missing repositories for Flow D (Platform Admins).
  **Pilot Status:** 🟢 Required for Pilot
- **Work Package S2.5:** Implement missing repositories for Flow C (Trials) and Flow H (Command Center).
  **Pilot Status:** 🔵 Deferred After Pilot

### Stage S3: Firestore Architecture Stabilization
**Contents:** Collections, Subcollections, Document hierarchy, Naming standards, Composite indexes, Cost optimization, Multi-tenant partitioning.
- **Work Package S3.1:** Define and create Firestore architecture for platform collections (`platform_admins`).
  **Pilot Status:** 🟢 Required for Pilot
- **Work Package S3.2:** Define Firestore architecture for `audit_logs`, `recovery_jobs`.
  **Pilot Status:** 🟡 Recommended Before Production
- **Work Package S3.3:** Define Firestore architecture for `platform_broadcasts`, `platform_health`.
  **Pilot Status:** 🔵 Deferred After Pilot

### Stage S4: Security Rules Stabilization
**Contents:** Firestore Rules, Tenant isolation, School isolation, Platform access, Validation rules, Delete protection, Financial protection, Audit protection.
- **Work Package S4.1:** Update `firestore.rules` to include platform collections, establishing strict super-admin-only boundaries.
  **Pilot Status:** 🟢 Required for Pilot
- **Work Package S4.2:** Implement rules for core tenant isolation, school isolation, and basic validation rules.
  **Pilot Status:** 🟢 Required for Pilot
- **Work Package S4.3:** Implement financial protection and audit protection rules.
  **Pilot Status:** 🟡 Recommended Before Production

### Stage S5: Event & Audit Pipeline
**Contents:** Event generation, Audit logging, Compliance queue, Activity timelines, Event repositories, Immutable audit records.
- **Work Package S5.1:** Establish a centralized Event Bus / Pipeline package for cross-module communication.
  **Pilot Status:** 🟢 Required for Pilot
- **Work Package S5.2:** Implement the central `audit_logs` repository and connect existing audit entities to write immutable audit records.
  **Pilot Status:** 🟡 Recommended Before Production
- **Work Package S5.3:** Create compliance queues and detailed activity timelines.
  **Pilot Status:** 🔵 Deferred After Pilot

### Stage S6: Cloud Functions & Platform Services
**Contents:** Notification triggers, Recovery handlers, Scheduled jobs, Broadcast processing, Compliance processing.
- **Work Package S6.1:** Create scheduled Cloud Functions for trial expirations, subscription checks.
  **Pilot Status:** 🟡 Recommended Before Production
- **Work Package S6.2:** Implement Cloud Functions for processing and dispatching `platform_broadcasts` and `announcements`.
  **Pilot Status:** 🔵 Deferred After Pilot
- **Work Package S6.3:** Implement automated compliance processing and reporting.
  **Pilot Status:** 🔵 Deferred After Pilot

### Stage S7: Recovery Infrastructure
**Contents:** Rollback, Recovery jobs, Integrity verification, Recovery approvals, Recovery history.
- **Work Package S7.1:** Implement the `recovery_jobs` repository and DTOs.
  **Pilot Status:** 🟡 Recommended Before Production
- **Work Package S7.2:** Create Cloud Functions handlers for data rollback, integrity verification, and state snapshotting.
  **Pilot Status:** 🔵 Deferred After Pilot
- **Work Package S7.3:** Implement approval workflow security rules for critical recovery actions.
  **Pilot Status:** 🔵 Deferred After Pilot

### Stage S8: Executive Aggregation Services
**Contents:** Executive summaries, Cross-flow aggregation, Watchlist aggregation, Platform health aggregation.
- **Work Package S8.1:** Extend the `analytics` package to aggregate cross-tenant health metrics and watchlists.
  **Pilot Status:** 🔵 Deferred After Pilot
- **Work Package S8.2:** Implement optimized query endpoints for executive summaries.
  **Pilot Status:** 🔵 Deferred After Pilot
- **Work Package S8.3:** Update `firestore.indexes.json` to support complex command center aggregation queries.
  **Pilot Status:** 🔵 Deferred After Pilot

### Stage S9: Final Backend Certification
- **Work Package S9.1:** Conduct integration testing between Super Admin UI and the stabilized backend.
  **Pilot Status:** 🟢 Required for Pilot
- **Work Package S9.2:** Perform a forensic security audit on the finalized `firestore.rules`.
  **Pilot Status:** 🟢 Required for Pilot

---

# Deferred Implementation Register

**Purpose:** Maintain a permanent inventory of everything postponed for the TEMS pilot.

| Feature | Original Stage | Reason | Risk | Future Stage |
| :--- | :--- | :--- | :--- | :--- |
| Missing repositories for Flow C (Trials) and Flow H (Command Center) | S2 | Not required for single-school pilot. | Trial governance and command center logic handled manually or statically. | Post-Pilot Phase 4.2 |
| Firestore architecture for `platform_broadcasts`, `platform_health` | S3 | Broadcasts and aggregated health aren't critical for initial TEMS launch. | Lack of cross-tenant comms or real-time health dashboard. | Post-Pilot Phase 4.2 |
| Compliance queues and detailed activity timelines | S5 | Complex compliance and timelines not mandatory for basic operation. | Reduced visibility into long-term user actions. | Post-Pilot Phase 4.2 |
| Cloud Functions for `platform_broadcasts` and compliance processing | S6 | Manual broadcasts are acceptable initially; compliance is deferred. | High manual overhead for platform announcements. | Post-Pilot Phase 4.2 |
| Cloud Function handlers for data rollback and recovery approvals | S7 | Database point-in-time recovery and manual developer intervention will suffice for pilot scale. | Increased time-to-recovery for complex incidents. | Post-Pilot Phase 4.2 |
| Executive Aggregation Services | S8 | Not required for single-school pilot. | Executive dashboard will continue using static aggregation. | Post-Pilot Phase 4.2 |
