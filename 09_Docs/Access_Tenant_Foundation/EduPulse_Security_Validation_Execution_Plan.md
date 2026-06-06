# Phase 1G — Security Validation Execution Plan

## Objective
This execution plan details the architecture and strategy for Security Validation (Phase 1G). As the capstone of the Access & Tenant Foundation, this phase verifies that all previously built domain, data, and runtime layers (Phases 1A through 1F) are structurally secure and impenetrable.

Execution authority is NOT granted. This plan is designed strictly for architecture review and approval. No new features will be built.

---

## 1. Authentication Security Validation
Validating that identity endpoints strictly adhere to defined behaviors.

**Validation Targets:**
- **Invalid Login**: Verify standard rejected authentication behaviors (incorrect email/password).
- **Disabled User**: Verify Firebase Auth `disabled` flags prevent token generation.
- **Suspended User**: Verify Firebase token generates, but runtime catches `suspended` state and traps user on `Suspension Screen` without forcing Firebase logout.
- **Archived User**: Verify Firebase token generates, but runtime catches `archived` state and traps user on `Archived Account Screen` without forcing Firebase logout.
- **Pending Password Change**: Verify Firebase token generates, but runtime forces routing to `Force Change Password Screen` blocking all dashboard access.

---

## 2. Tenant Isolation Security Validation
Confirming the absolute rigidness of the `schools/{schoolId}` boundary without reliance on Firebase Custom Claims.

**Validation Targets:**
- **Cross-school Access Attempts**: Attempt to query `schools/school_A/users/user_1` while the active `TenantContext` is locked to `school_B`. Verify rejection.
- **Manual schoolId Manipulation**: Attempt to alter the `schoolId` parameter during UI navigation. Verify the Repository layer ignores the URL and relies exclusively on the singleton `AccessContext`.
- **URL Tampering**: Verify dynamic parameters (e.g., `/students/student_id`) cannot be exploited to retrieve documents outside the active tenant.
- **Repository Bypass**: Ensure no repository exposes an unbounded query (e.g., querying `users` globally without a `schoolId` prefix).

---

## 3. RBAC Security Validation
Validating that roles and permissions cannot be exploited.

**Validation Targets:**
- **Permission Escalation Attempts**: Attempt to assign a user a higher permission group than the assigner possesses. Verify failure.
- **Unauthorized Role Assignment**: Verify non-admins cannot mutate `users/{uid}/roleId`.
- **Archived Role Assignment**: Attempt to assign an `isArchived == true` role to a new user. Verify `RoleRepository` throws validation error.
- **Protected Role Modification**: Attempt to delete, rename, or archive System Roles (e.g., School Admin). Verify rejection.
- **Role Inheritance Abuse**: Ensure nested parent roles resolve exactly as mapped without circular dependency crashes.

---

## 4. User Lifecycle Security Validation
Validating the rigidness of user mutation safeguards.

**Validation Targets:**
- **Suspended Users**: Ensure suspended users cannot read/write domain records (e.g., students).
- **Locked Users**: Ensure locked users are safely trapped in the `Account Locked Screen`.
- **Archived Users**: Ensure archived users cannot interact with the system and their records cannot be permanently deleted.
- **Last School Admin Protections**: Attempt to suspend or archive the final `SchoolAdmin` for a tenant. Verify hard rejection by the repository.
- **Last School Admin Downgrade Protection**: Attempt to change the role of the final `SchoolAdmin` to `Teacher`. Verify blocked, validation failure, and audit event generated. A school must never lose its final administrator.
- **Self-Archive Protections**: Attempt to archive oneself (`actorUid == targetUid`). Verify hard rejection.

---

## 5. Runtime Access Security Validation
Validating the `RuntimeAccessGuard` and memory caching.

**Validation Targets:**
- **Route Bypass Attempts**: Manually hit `/dashboard` without `Dashboard.View`. Verify intercept to `/unauthorized`.
- **Unauthorized Screen Access**: Verify missing permissions result in the `Unauthorized Screen` without infinite redirect loops.
- **Unauthorized Actions**: Verify components mapped to `Can Create`, `Can Edit`, and `Can Delete` remain hidden if permissions are absent from `AccessContext`.
- **Dashboard Access**: Verify Dashboard explicitly requires `Dashboard.View` to render.
- **AccessContext Tampering Validation**: Attempt to mutate `AccessContext` client-side (e.g., change `roleId`, inject permission, alter `schoolId`). Verify access denied, context rebuilt, and permission resolution revalidated.
- **Role Archived While Logged In**: Validate flow: User Logged In → Role Archived → Cache Refresh → Role Resolution Failure → Access Error Screen (no app crash, no silent failure).

---

## 6. Direct Firestore / API Abuse Validation
Validating protection against direct database attacks bypassing all UI and repository logic.

**Validation Targets:**
- **Direct Firestore SDK Access**: Attempt direct Firestore queries bypassing the Repository Layer, Bloc Layer, RuntimeAccessGuard, and UI Layer. Verify `Permission Denied`, `Access Blocked`, and `Tenant Isolation Preserved`.
- **Cross-tenant Query Attempts**: Execute raw Firebase queries across boundaries. Verify `Permission Denied` from Firestore Rules.

---

## 7. Audit Integrity Validation
Validating the trail of immutable actions.

**Validation Targets:**
- **Audit Log Immutability Test**: Attempt to edit, delete, or overwrite an existing Audit Log. Verify blocked, rejected, and audit integrity preserved.
- **Role Changes**: Verify `UserRoleUpdated` event generation.
- **User Changes**: Verify `UserSuspended`, `UserArchived`, `UserRestored` event generation.
- **Unauthorized Parent Merge**: Attempt a parent merge without proper permissions. Verify blocked and audit event generated.

---

## 8. Route Protection Validation
Validating edge cases in UI routing.

**Validation Targets:**
- **Direct URL Access**: Pasting `/admin/school-config` directly into a browser tab.
- **Browser Refresh**: Hitting F5 on a protected route while session is active. Verify `TenantContext` rebuilds transparently.
- **Session Restoration**: Verify app restarts pull the cached user state cleanly.
- **Runtime Permission Changes**: Verify background role changes invalidate the cache and force UI to reflect new permissions immediately.

---

## 9. Failure Handling Validation
Validating the application's response to fatal logic states.

**Validation Targets:**
- **Missing Role**: `RoleResolutionFailure` → `Access Error Screen`.
- **Archived Role**: `RoleResolutionFailure` → `Access Error Screen`.
- **Missing Permissions**: Route Guard Trap → `Unauthorized Screen`.
- **Missing User Document**: `AuthenticationException` → Logout & Login Screen.
- **Invalid Tenant Context**: Guard Trap → `Access Error Screen`.

---

## 10. Security Risk Assessment

- **Critical Risks**: 
  - *Risk*: A suspended user's token is still valid. 
  - *Remediation*: The `RuntimeAccessGuard` traps them in the `Suspension Screen` locally. Firestore Rules must independently block writes for `status == suspended` to prevent direct API abuse.
- **Major Risks**: 
  - *Risk*: Direct SDK Abuse. 
  - *Remediation*: Firestore Rules must rigorously enforce role and state validations independently of the client repository.
- **Minor Risks**: 
  - *Risk*: Client-side Memory Tampering. 
  - *Remediation*: State reconstruction via `RuntimePermissionResolver` automatically revalidates tampering attempts against the database.

---

## 11. Validation Strategy

- **Automated Tests**: Execute unit and integration tests simulating state mutations, routing intercepts, and direct repository bypasses.
- **Manual Validation**: Execute simulated direct SDK attacks and UI state manipulations.
- **Architecture Verification**: Cross-referencing implemented rules against the matrix.
- **Security Certification Criteria**: All validation targets must return PASS without exceptions. Any bypass identified immediately halts certification.

---

## 12. Documentation Deliverables
Upon completion of Phase 1G execution, the following must be generated:
1. `EduPulse_Security_Attack_Matrix_Report.md` (Detailed attack scenarios, expected vs actual results, risk ratings)
2. `EduPulse_Security_Validation_Report.md`
3. `EduPulse_Firestore_Rules_Security_Audit.md`
4. `EduPulse_Access_Tenant_Foundation_Final_Certification.md` (Capstone closing Document)

---
*End of Plan.*
