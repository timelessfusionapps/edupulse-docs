# Phase 4 — Stage S4
## Firestore Security Discovery & Inventory Report
**Date:** 2026-07-10
**Status:** Stage S4.3 Implementation Complete

---

### 1. Existing Firestore Security Rules
The current security rules (`08_Firebase/firestore.rules`) provide a foundational structure utilizing custom authentication claims (`request.auth.token`) and helper functions. The rules successfully implement a default-deny posture for unhandled subcollections.

### 2. Match Hierarchy
The rules follow a strict multi-tenant hierarchy rooted at the school level:
- `/schools/{targetSchoolId}`
  - `/students/{studentId}`
  - `/activities/{activityId}`
  - `/point_transactions/{txId}`
  - `/houses/{houseId}`
  - `/leaderboards/{document=**}`
  - `/analytics/{document=**}`
  - `/dashboard_metrics/{document=**}`
  - `/notifications/{document=**}`

### 3. Tenant Isolation Rules
**Finding:** Tenant boundaries are strictly enforced via the `isTenantUser(targetSchoolId)` helper, which validates that the user's token `schoolId` matches the requested path.
**Classification:** 🟢 Pilot Priority (Ensure this helper is applied universally).

### 4. Role-Based Access Controls
**Finding:** RBAC is implemented using token claims mapping to four core roles: `super_admin`, `school_admin`, `principal`, and `teacher`. Student/Parent roles are implicitly treated as standard tenant users without elevated privileges.
**Classification:** 🟢 Pilot Priority (Ensure RBAC helpers are strictly applied to all mutating operations).

### 5. Collection-Level Permissions
**Finding:** Collections like `students`, `activities`, and `houses` have distinct, role-restricted create/update/delete blocks. However, others are grouped with wildcard permissions.
**Classification:** 🟢 Pilot Priority (Every collection must have explicit C/R/U/D rules mapped to Repository operations).

### 6. Rule Inheritance & Duplication
**Finding:** Role checks (e.g., `isSchoolAdmin() || isPrincipal() || isSuperAdmin()`) and validation schema checks are duplicated across multiple collection match blocks. 
**Classification:** 🟢 Pilot Priority (Refactor into consolidated capability helpers to reduce maintenance risk).

### 7. Helper Functions & Authentication Checks
**Finding:** The rules use robust helpers for authentication (`isAuthenticated()`), token claims (`schoolId()`), and schema immutability (`protectedImmutableFields()`). 
**Classification:** 🟢 Pilot Priority (Maintain and expand helpers for the new collections).

### 8. Overly Permissive Rules (Critical Flaw)
**Finding:** The `leaderboards`, `analytics`, `dashboard_metrics`, and `notifications` collections currently use `allow read, write: if isTenantUser(targetSchoolId);`. This allows *any* authenticated user (including students) to arbitrarily write, overwrite, or delete platform metrics and notifications.
**Classification:** 🟢 Pilot Priority (These must be immediately locked down. Writes should be restricted to `super_admin` or specific backend functions).

### 9. Missing Rules
**Finding:** The Stage S3 execution established several collections that are completely missing from the security rules:
- `users` (Auth)
- `roles` (RBAC)
- `preferences`
- `announcements`
- `schedulings`
- `broadcasts`
- `whatsapptemplates`
- `communicationgroups`
- `categories` (formerly categorys)
- `deliveries` (formerly deliverys)
- `templates`
These currently hit the fallback `match /{document=**} { allow read, write: if false; }`, meaning they are inaccessible to legitimate users.
**Classification:** 🟢 Pilot Priority (Rules for Pilot-required collections must be added).

### 10. Audit and System Collections
**Finding:** Rules for `audits` and `auditLogs` are missing and currently blocked by the default deny.
**Classification:** 🔵 Deferred After TEMS Pilot (Audit infrastructure is deferred to Stage S5).

### 11. Rule Ownership
**Finding:** Collection paths are currently mapped to domain entities but lack clear comments tracing them back to their authoritative repositories (e.g., `ISchoolRepository`).
**Classification:** 🟢 Pilot Priority (Add documentation mapping to rules).

---

## S4.2 Canonical Security Proposal

### 1. Collection Classification Matrix
| Collection | Classification | Owning Repository |
|---|---|---|
| `schools` | Platform | `ISchoolRepository` |
| `schools/{schoolId}/students` | Tenant | `IStudentRepository` |
| `schools/{schoolId}/activities` | Tenant | `IActivityRepository` |
| `schools/{schoolId}/point_transactions` | Tenant | `IPointTransactionRepository` |
| `schools/{schoolId}/houses` | Tenant | `IHouseRepository` |
| `schools/{schoolId}/leaderboards` | Tenant | `ILeaderboardRepository` |
| `schools/{schoolId}/analytics` | Tenant | `IAnalyticsRepository` |
| `schools/{schoolId}/dashboard_metrics` | Tenant | `IDashboardMetricsRepository` |
| `schools/{schoolId}/notifications` | User | `INotificationRepository` |
| `schools/{schoolId}/users` | Tenant | `IAuthRepository` |
| `schools/{schoolId}/roles` | Tenant | `IRoleRepository` |
| `schools/{schoolId}/preferences` | User | `IPreferenceRepository` |
| `schools/{schoolId}/categories` | Tenant | `ICategoryRepository` |
| `schools/{schoolId}/deliveries` | Tenant | `IDeliveryRepository` |
| `schools/{schoolId}/announcements` | Tenant | `IAnnouncementRepository` |

### 2. Security Permission Matrix
*Legend: R = Read, C = Create, U = Update, D = Delete. (Self) = Only own document.*

| Collection | Student | Parent | Teacher | Principal | School Admin | Super Admin | Cloud Functions (Stage S6) |
|---|---|---|---|---|---|---|---|
| `schools` | R | R | R | R | R, U | R, C, U, D | R, C, U, D |
| `students` | R (Self) | R (Child) | R, C, U | R, C, U | R, C, U | R, C, U, D | R, C, U, D |
| `activities` | R | R | R, C, U | R, C, U | R, C, U | R, C, U, D | R, C, U, D |
| `point_transactions`| R (Self) | R (Child) | R, C | R, C | R, C | R, C, D | R, C, U, D |
| `houses` | R | R | R | R, C, U | R, C, U | R, C, U, D | R, C, U, D |
| `leaderboards` | R | R | R | R | R | R | R, C, U, D |
| `analytics` | - | - | - | R | R | R | R, C, U, D |
| `metrics` | - | - | - | R | R | R | R, C, U, D |
| `notifications` | R, U (Self) | R, U (Self) | R, U (Self), C | R, U (Self), C | R, U (Self), C | R, C, U, D | R, C, U, D |
| `users` | R (Self) | R (Self) | R | R, C, U | R, C, U | R, C, U, D | R, C, U, D |
| `roles` | - | - | - | R | R, U | R, C, U, D | R, C, U, D |
| `categories` | R | R | R | R, C, U | R, C, U | R, C, U, D | R, C, U, D |
| `announcements` | R | R | R, C, U | R, C, U | R, C, U | R, C, U, D | R, C, U, D |

### 3. Security Rule Readiness Score

| Collection | Score | Status Classification | Notes |
|---|---|---|---|
| `schools`, `students`, `activities` | 85 | Minor Improvements | Rules exist but require helper consolidation. |
| `houses`, `point_transactions` | 85 | Minor Improvements | Immutability on point transactions is well structured. |
| `leaderboards`, `analytics`, `metrics`| 40 | Pilot Blocker | Overly permissive wildcards allow student writes. |
| `notifications` | 40 | Pilot Blocker | Overly permissive wildcards allow student writes. |
| Missing Collections (`users`, `roles`, etc) | 0 | Pilot Blocker | Caught by default deny; legitimate access blocked. |

### 4. Helper Strategy

- **Existing Helper:** `isTenantUser(targetSchoolId)`, `isTeacher()`, `isPrincipal()`, `isSchoolAdmin()`, `isSuperAdmin()`, `protectedImmutableFields()`. These provide a strong, unified core that should remain unchanged.
- **Missing Helper:** 
  - `isSelf(userId)`: To validate that a student/parent is only reading or updating their own specific record (e.g., in `users` or `notifications`).
  - `isStudent()` / `isParent()`: Explicit role checks for lower-privilege tiers, ensuring they are intentionally allowed or denied.
- **Helper Requiring Expansion:** 
  - `isValidCreationSchema()` and `isValidUpdateSchema()` need to be expanded or abstracted to handle specific mandatory constraints for the new collections (e.g., ensuring `schoolId` is always injected properly for `announcements` and `categories`).

### 5. Helper Usage Matrix

| Helper Name | Collections Using It | Purpose |
|---|---|---|
| `isAuthenticated()` | All (Base helper) | Validates that a user is logged into Firebase Auth. |
| `schoolId()` | All (Tenant helper) | Extracts the `schoolId` claim from the auth token. |
| `userRole()` | All (Role helper) | Extracts the `role` claim, defaulting to `super_admin`. |
| `isTenantUser()` | All Tenant Collections | Validates that the user belongs to the target tenant (or is super admin). |
| `isSuperAdmin()` | `schools`, `students`, `activities`, `houses`, `point_transactions` | Validates elevated platform administration privileges. |
| `isSchoolAdmin()` | `schools`, `students`, `houses` | Validates tenant-level administration privileges. |
| `isPrincipal()` | `schools`, `students`, `activities`, `houses`, `point_transactions` | Validates instructional leadership privileges. |
| `isTeacher()` | `students`, `activities`, `point_transactions` | Validates staff-level privileges. |
| `notUpdating()` | `schools`, `point_transactions` | Validates that a specific field is omitted from update payloads. |
| `protectedImmutableFields()` | `schools` | Prevents mutation of core tenant identification fields. |
| `protectedServerFields()` | `schools` | Prevents mutation of system-calculated or billing fields. |
| `isValidCreationSchema()` | `students`, `activities`, `houses`, `point_transactions` | Validates `schoolId` and `createdAt` during document creation. |
| `isValidUpdateSchema()` | `students`, `activities`, `houses` | Currently acts as a placeholder; intended for update validation. |

### 6. Notification Ownership

#### User Notifications
Targeted notifications sent to specific users within a tenant.
- **Owner:** Target User
- **Creator:** Cloud Functions (Stage S6)
- **Reader:** Target User (Self), Super Admin
- **Updater:** Target User (Self - Status changes only), Super Admin
- **Deleter:** Super Admin

#### System Notifications
Broadcasts or generic tenant-wide notifications.
- **Owner:** Tenant (`schoolId`)
- **Creator:** Principal, School Admin, Super Admin
- **Reader:** All Tenant Users
- **Updater:** Principal, School Admin, Super Admin
- **Deleter:** Super Admin

### 7. Repository ↔ Collection Ownership Matrix

| Repository | Primary Collection | Secondary Collections |
|---|---|---|
| `ISchoolRepository` | `schools` | None |
| `IAuthRepository` | `schools/{schoolId}/users` | None |
| `IRoleRepository` | `schools/{schoolId}/roles` | `schools/{schoolId}/auditLogs` |
| `IStudentRepository` | `schools/{schoolId}/students` | None |
| `IActivityRepository` | `schools/{schoolId}/activities` | None |
| `IPointTransactionRepository` | `schools/{schoolId}/point_transactions` | None |
| `IHouseRepository` | `schools/{schoolId}/houses` | None |
| `ILeaderboardRepository` | `schools/{schoolId}/leaderboards` | None |
| `IAnalyticsRepository` | `schools/{schoolId}/analytics` | None |
| `IDashboardMetricsRepository` | `schools/{schoolId}/dashboard_metrics` | None |
| `INotificationRepository` | `schools/{schoolId}/notifications` | None |
| `IPreferenceRepository` | `schools/{schoolId}/preferences` | None |
| `ICategoryRepository` | `schools/{schoolId}/categories` | None |
| `IDeliveryRepository` | `schools/{schoolId}/deliveries` | None |
| `IAnnouncementRepository` | `schools/{schoolId}/announcements` | None |
| `ITemplateRepository` | `schools/{schoolId}/templates` | None |
| `ISchedulingRepository` | `schools/{schoolId}/schedulings` | None |
| `IBroadcastRepository` | `schools/{schoolId}/broadcasts` | None |
| `IWhatsAppTemplateRepository` | `schools/{schoolId}/whatsapptemplates` | None |
| `ICommunicationGroupRepository`| `schools/{schoolId}/communicationgroups` | None |
| `IAuditRepository` | `schools/{schoolId}/audits` | None |

---

### Conclusion
The Firestore Security Rules now establish a strong foundation for tenant isolation. The complete Security Rule Implementation (S4.3) successfully addressed critical omissions and overly permissive wildcard rules.

---

### Final Security Hardening
- **Fail-safe role fallback implemented:** The `userRole()` helper now safely defaults to `'unknown'` instead of `'super_admin'` when the role claim is missing.
- **Security posture strengthened:** This prevents unintended privilege escalation and ensures any unmapped role safely fails closed against RBAC boundaries.
- **Verification:** Existing emulator tests continue to pass successfully.
