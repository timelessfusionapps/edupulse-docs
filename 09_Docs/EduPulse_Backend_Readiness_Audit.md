# EduPulse Backend Readiness Audit

**Status:** INCOMPLETE / FAILED READINESS  
**Target:** Phase 3C Flows A–F Support  
**Methodology:** Architectural Forensic Review of Actual Implementation  
**Rules Enforced:**   
1. EduPulse_Firestore_Cost_Optimization_Architecture.md  
2. EduPulse_Backend_Integration_Contract.md  
3. EduPulse_Data_Modeling_Standard.md  
4. EduPulse_Security_Rules_Contract.md  

---

## Section 1: Current Backend Architecture Map

The current architecture is a partial implementation. It contains a basic domain-driven structure (packages like `auth`, `tenant`, `schools`, `events`, `notifications`) but lacks almost all advanced platform governance, financial, and audit layers.

The frontend heavily leaks into the backend layer, with `FirebaseFirestore.instance` calls directly embedded in generic datasources, bypassing the strict ViewModel → Repository → Service constraint.

---

## Section 2: Existing Backend Assets

**Repositories Found:**
- `auth_repository`, `role_repository`, `permission_repository`
- `tenant_aware_base_repository`
- `school_repository`
- `user_repository`, `parent_repository`
- `event_repository` (and its sub-repositories)
- `notification_repository` (and its sub-repositories)
- `dashboard_repository`, `student_ranking_repository`, etc.

**Services Found:**
- `tenant_context_service`
- `event_scoring_service`, `event_lifecycle_service`
- `notificationdispatch_service`, `readtracking_service`
- `student_import_service`, `csv_validation_service`

**Cloud Functions:**
- Basic scaffolding in `08_Firebase/Functions/src/` (`AppFunctionLogger.ts`, `OrchestrationService.ts`, empty `triggers` folder)

---

## Section 3: Missing Backend Assets

The following mandatory components are entirely missing from the codebase:

- **Missing Domains:** `trials`, `platform_admin`, `audit_center`, `recovery`, `fees`, `attendance`, `exams`.
- **Missing Services:** `AuditService`, `ComplianceService`, `RecoveryService`, `BackupService`, `AnomalyService`, `IntegrityVerificationService`.
- **Missing DTOs & Mappers:** The entire application lacks domain mappers and DTO objects (e.g., `StudentDto`, `StudentMapper`). Raw Firestore maps are leaking into the application layer.

---

## Section 4: Critical Blockers Before Flow F

Flow F (Recovery and Rollback) is currently impossible to execute safely due to:
1. **Absence of Event Pipeline:** No `audit_logs` writer, no `audit_metrics` aggregator, no anomaly detection engine.
2. **Missing Rollback Primitives:** No data diff engine, archive loaders, or restore references.
3. **No Soft-Delete:** The `is_deleted` and `deleted_at` fields are not enforced systematically across models.

---

## Section 5: Cost Leak Risks

Multiple violations of the Cost Optimization Architecture were found:
1. **Unbounded Reads:** `.get()` is frequently used without `.limit()`. For example, in `firebase_student_datasource_impl.dart`, `firebase_student_assignment_datasource_impl.dart`, and multiple event datasources.
2. **Snapshot Leaks:** While `students.snapshots()` is explicitly forbidden, `student_datasource_impl.dart` (line 84) uses `.snapshots(includeMetadataChanges: true)`. Dashboard datasources also rely heavily on snapshots.
3. **Missing Pagination:** No cursor-based pagination is implemented in the heavy collection queries.

---

## Section 6: Security Vulnerabilities

A review of `08_Firebase/firestore.rules` reveals massive gaps against the Security Rules Contract:
1. **Missing Root Collections:** The mandatory `audit_logs`, `compliance_queue`, `anomaly_flags`, and `platform_admins` collections are entirely missing from the rules.
2. **Missing Financial Protections:** No rules exist for `fee_history`, meaning fee mutations are completely unprotected.
3. **Overly Permissive Writes:** Collections like `leaderboards`, `analytics`, `dashboard_metrics`, and `notifications` have `allow read, write: if isTenantUser(targetSchoolId);`, allowing any authenticated user in the school to maliciously overwrite global dashboard data.
4. **Missing Immutability:** `audit_logs` and `fee_history` immutability are not enforced because they don't exist in the rules.

---

## Section 7: Event Pipeline Readiness

**Score: 0 / 100**
- `Action → Audit → Aggregate → Detect → Queue → Recover` pipeline does not exist.
- Cloud Functions for audit writing, archival, anomaly detection, and compliance escalation are missing.
- `audit_logs` is not modeled in Firestore or Security Rules.

---

## Section 8: Recovery System Readiness

**Score: 0 / 100**
- No backup snapshots.
- No restore references.
- No rollback primitives.
- Soft-delete policy is not globally enforced.
- No `RecoveryService` or Cloud Functions for restoration.

---

## Section 9: Backend Implementation Roadmap

To support Flows A-F, the following must be built, in this exact order:

1. **Security & Data Foundation (Immediate):**
   - Rewrite `firestore.rules` to include missing collections (`audit_logs`, `fees`, `platform_admins`) and lock down broad writes on analytics.
   - Implement `DTOs` and `Mappers` to stop raw map leakage.
2. **Architecture Stabilization (Short-term):**
   - Remove `FirebaseFirestore.instance` from generic data layers.
   - Add `.limit()` to all unbounded `.get()` queries.
   - Refactor `.snapshots()` to use caching or polling for heavy collections (like students).
3. **Core Services Engine (Medium-term):**
   - Build `AuditService` and `ComplianceService`.
   - Implement Cloud Functions for fee processing, audit writers, and anomaly detection.
4. **Recovery Infrastructure (Pre-Flow F):**
   - Build `RecoveryService` and `BackupService`.
   - Implement the event pipeline and soft-delete/rollback primitives.

---

## Readiness Scoring

- **UI readiness:** 20 / 100
- **Repository readiness:** 30 / 100
- **Service readiness:** 10 / 100
- **Cloud Function readiness:** 0 / 100
- **Audit engine readiness:** 0 / 100
- **Recovery engine readiness:** 0 / 100
- **Security readiness:** 30 / 100
- **Overall backend readiness:** 15 / 100

---

## Final Certification

Can EduPulse safely support Flows A–F?
**NO**
