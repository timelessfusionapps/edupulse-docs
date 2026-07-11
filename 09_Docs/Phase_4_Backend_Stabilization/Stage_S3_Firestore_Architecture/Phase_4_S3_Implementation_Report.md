# Phase 4 — Stage S3
## Firestore Architecture Stabilization Report
**Date:** 2026-07-10
**Current Status:** Stage S3 Implementation Complete
Certification Complete
Awaiting Architectural Approval

---

## S3.1 — Firestore Discovery & Inventory

### 1. Collection Classification Matrix
| Collection | Classification | Owner Repository |
|---|---|---|
| `schools` | Platform | `FirebaseSchoolDatasourceImpl` (ISchoolRepository) |
| `schools/{schoolId}/roles` | Tenant | `FirebaseRoleDatasourceImpl` (IRoleRepository) |
| `schools/{schoolId}/users` | Tenant | `FirebaseAuthDatasourceImpl` (IAuthRepository) |
| `schools/{schoolId}/preferences` | Tenant | `FirebasePreferenceDatasource` (IPreferenceRepository) |
| `schools/{schoolId}/announcements` | Tenant | `FirebaseAnnouncementDatasource` (IAnnouncementRepository) |
| `schools/{schoolId}/notifications` | Tenant | `FirebaseNotificationDatasource` (INotificationRepository) |
| `schools/{schoolId}/schedulings` | Tenant | `FirebaseSchedulingDatasource` (ISchedulingRepository) |
| `schools/{schoolId}/broadcasts` | Tenant | `FirebaseBroadcastDatasource` (IBroadcastRepository) |
| `schools/{schoolId}/whatsapptemplates`| Tenant | `FirebaseWhatsAppTemplateDatasource` (IWhatsAppTemplateRepository) |
| `schools/{schoolId}/communicationgroups`| Tenant | `FirebaseCommunicationGroupDatasource` (ICommunicationGroupRepository) |
| `schools/{schoolId}/categorys` | Tenant | `FirebaseCategoryDatasource` (ICategoryRepository) |
| `schools/{schoolId}/deliverys` | Tenant | `FirebaseDeliveryDatasource` (IDeliveryRepository) |
| `schools/{schoolId}/templates` | Tenant | `FirebaseTemplateDatasource` (ITemplateRepository) |
| `schools/{schoolId}/audits` | Tenant | `FirebaseAuditDatasource` (IAuditRepository) |
| `schools/{schoolId}/auditLogs` | Tenant | `FirebaseRoleDatasourceImpl` (IRoleRepository) |

### 2. Firestore Converter Inventory
| Datasource | Current Serialization Method | Target DTO | Existing Mapper | Migration Confidence Score |
|---|---|---|---|---|
| `FirebaseSchoolDatasourceImpl` | Manual `data['field']` casting | `SchoolDto` | `SchoolMapper` | 95 |
| `FirebaseAuthDatasourceImpl` | Manual `UserSession.fromJson(doc.data())` | `AuthUserDto` | None | < 80 |
| `FirebaseRoleDatasourceImpl` | Manual `Map<String, dynamic>` casting | `RoleDto` | None | < 80 |
| Notification Datasources (x10) | Manual `Entity(id: data['id'])` casting | e.g., `NotificationCategoryDto` | None (Direct to Domain) | 70 |

### 3. Transactions and Batch Writes
- **Transactions & Batch Writes:** Zero occurrences. All writes are independent, single-document `.set()` or `.update()` calls.
- **Indexes:** Queries currently rely on basic single-field lookups without compound index constraints.

---

## S3.2 — Canonical Firestore Proposal

### Findings & Inconsistencies

1. **Collection Naming Inconsistencies (🟢 Pilot Priority)**
   - `categorys` violates English pluralization and should be `categories`.
   - `deliverys` violates English pluralization and should be `deliveries`.

2. **Audit Collections Investigation (🔵 Deferred)**
   - **Purpose of `audits`**: Manages generic system and notification-related audit logs via `FirebaseAuditDatasource` in the Notifications subsystem.
   - **Purpose of `auditLogs`**: Specifically records role and permission assignment events directly within the `FirebaseRoleDatasourceImpl` in the RBAC subsystem.
   - **Status**: Both collections are actively used by different subsystems. Neither is strictly legacy, though they represent fragmented audit approaches.
   - **Recommendation**: **Merge**. Consolidate both into a unified `audit_events` collection driven by a Centralized Event Pipeline. Since deep refactoring is required, this should be deferred until Phase 4 - Stage S5 (Audit Infrastructure).

3. **Converter Inconsistencies (🟢 Pilot Priority)**
   - Manual `doc.data()` casting in datasources bypasses type-safe DTO boundaries.
   - **Proposal:** Standardize `withConverter<Dto>` across datasources where Migration Confidence is high (e.g., `SchoolDto`).

4. **Tenant Isolation Verification (🟢 Pilot Priority)**
   - Confirmed: All tenant data is correctly isolated under the `schools/{schoolId}` path. No cross-tenant bleeding observed in current queries.

5. **Missing Transactions & Batches (🔵 Deferred)**
   - Current implementation lacks atomic consistency for multi-document operations (e.g., bulk notifications).
   - **Proposal:** Defer transaction and batch optimization until Phase 4 - Stage S6.

### Firestore Readiness Scores

| Collection / Subsystem | Score | Classification | Notes |
|---|---|---|---|
| Schools (`schools`) | 85 | Minor Improvements Required | Requires `withConverter` implementation. |
| Auth (`users`) | 85 | Minor Improvements Required | Requires `withConverter` implementation. |
| RBAC (`roles`, `auditLogs`) | 75 | Needs Stabilization | Converters needed. |
| Notifications (`notifications`, etc) | 70 | Needs Stabilization | Requires renaming `categorys` → `categories`, `deliverys` → `deliveries`, and `withConverter`. |

### Proposed Architecture Changes (For S3.3 Execution)
1. **Rename Collections (Data Migration Required if populated):**
   - `categorys` → `categories`
   - `deliverys` → `deliveries`
2. **Implement Converters:** Refactor datasources to use `.withConverter()` bound to canonical DTOs (e.g., `SchoolDto`).

---

**Execution Status:** S3.3 Implementation Completed.

---

## S3.3 — Firestore Migration Impact Matrix

| Change | Data Migration Required (Yes/No) | Breaking Risk | Pilot Priority | Migration Confidence |
|---|---|---|---|---|
| Implement `.withConverter()` for `SchoolDto` in `schools` collection | No | Medium | High (🟢) | 95 |
| Rename `categorys` to `categories` | Yes | High | Deferred (🔵) | 70 |
| Rename `deliverys` to `deliveries` | Yes | High | Deferred (🔵) | 70 |
