# Phase 1F — Runtime Access Integration Execution Plan

## Objective
This execution plan details the architecture and flow for Runtime Access Integration (Phase 1F). It fuses Firebase Authentication, User Management lifecycles, and Role-Based Access Control into a unified, secure navigation and authorization model for the EduPulse platform.

Execution authority is NOT granted. This plan is designed strictly for architecture review and approval.

---

## 1. Runtime Access Architecture & AccessContext

The runtime enforcement layer intercepting and validating all user interactions.

**AccessContext Structure:**
The singleton runtime state must contain:
- `schoolId` (String)
- `userId` (String)
- `roleId` (String)
- `userLifecycleState` (UserLifecycleState)
- `permissions` (List<String>)
- *Optional*: `displayName` (String), `email` (String)

**Core Components:**
- **RuntimePermissionResolver**: A memory-cached service that evaluates the user's `roleId`, queries the `RoleRepository`, and computes the effective boolean permissions upon login or refresh.
- **RuntimeAccessGuard**: A routing middleware (e.g., GoRouter redirect) that evaluates the `UserLifecycleState` and `AccessContext` before rendering any requested screen.
- **RouteAccessPolicy**: Defined rules mapping specific application routes to required string permissions (e.g., `/students` requires `Students.View`).

---

## 2. Login Resolution Flow

The step-by-step resolution process after a user presses "Login".

```text
Login Submitted
      ↓
Authentication Success (Firebase Token Generated)
      ↓
TenantContext Resolution (Determine `schoolId`)
      ↓
User Load (Fetch UserEntity from `schools/{schoolId}/users/{uid}`)
      ↓
Role Resolution (Fetch RoleEntity from `schools/{schoolId}/roles/{roleId}`)
      ↓
Permission Resolution (Flatten Role + Parent inheritances)
      ↓
AccessContext Populated (Cached in Memory)
      ↓
Dashboard Rendered (If permitted)
```

---

## 3. User Lifecycle Runtime Enforcement

The Router must enforce the exact `UserLifecycleState` before evaluating standard permissions. None of these blocked states initiate a forced Firebase logout.

- **invited**: Redirect to `Invitation Acceptance Screen` (Future). Block Dashboard.
- **created**: Wait for first login. Transitions immediately to `pendingPasswordChange`.
- **pendingPasswordChange**: Redirect to `Force Change Password Screen`. Block all other routes.
- **active**: Standard RouteAccessPolicy enforcement.
- **locked**: Firebase Auth succeeds, but Runtime redirects to `Account Locked Screen`.
- **suspended**: Firebase Auth succeeds, but Runtime redirects to `Account Suspended Screen`.
- **archived**: Firebase Auth succeeds, but Runtime redirects to `Archived Account Screen`. The user remains authenticated but entirely blocked from application access. No Firebase logout occurs.

---

## 4. Route Protection Architecture & Unauthorized Fallback

Every screen in EduPulse must be permission-driven.

- **Dashboard**: Requires `Dashboard.View`. If missing, the dashboard is explicitly blocked.
- **Students Module**: Requires `Students.View`.
- **School Configuration Module**: Requires `School.ManageConfiguration`.
- **RBAC Module**: Requires `Roles.Manage` and `Roles.View`.
- **Reports Module**: Requires `Reports.View`.
- **Events Module**: Requires `Events.View`.
- **Announcements Module**: Requires `Announcements.View`.
- **Points Module**: Requires `Points.ViewPointHistory` or `Points.Assign`.

**Unauthorized Route Enforcement:**
```text
Permission Missing
        ↓
Unauthorized Screen
```
Silent redirects, blank screens, or infinite redirect loops are strictly PROHIBITED.

---

## 5. Screen Visibility & Action-Level Permissions

Navigation Menus and Dashboard Cards must dynamically react to `AccessContext` to prevent dead clicks.

```text
Permission Exists in AccessContext
      ↓
Show Screen / Render Menu Item

Permission Missing in AccessContext
      ↓
Hide Screen / Omit Menu Item
```

Within a successfully rendered screen, discrete UI components evaluate action-level permissions:
- **Can View**: Controls list rendering.
- **Can Create**: Controls the visibility of the "Add New" FAB/Button.
- **Can Edit**: Controls the visibility of inline edit icons.
- **Can Delete/Archive**: Controls the visibility of the destructive actions.
- **Can Approve**: Controls the rendering of approval workflows (e.g., Points Engine).

---

## 6. Runtime Permission Caching & Refresh Architecture

To strictly adhere to the mandate against using Firebase Custom Claims (preventing cloud function delays), permissions must be resolved live but cached intelligently in memory.

**Cache Invalidation Architecture:**
```text
Login
      ↓
Resolve Permissions
      ↓
Store In Memory Cache
```

**Cache Refresh Triggers:**
The memory cache is automatically invalidated and rebuilt to prevent stale permissions and unauthorized access during:
- Role Change
- Permission Change
- User State Change
- Manual Refresh

---

## 7. Listener Scope Restrictions & Dynamic Refresh Flow

Firestore listeners must be tightly governed to maintain predictable billing.

**Approved Listener Strategy:**
The runtime may ONLY listen to:
```text
schools/{schoolId}/users/{uid}
```
Listening to every role, every permission, every module, or every collection is strictly PROHIBITED.

**Runtime Refresh Flow:**
```text
User Document Changes (e.g. status or roleId update)
        ↓
Refresh AccessContext (Triggered by the single document listener)
        ↓
Refresh Permissions (Re-fetches the role and rebuilds cache)
```

---

## 8. Role Archived Runtime Flow

If a user's assigned role is marked as `archived`:
```text
Role Archived (detected on next refresh/login)
      ↓
Role Resolution Failure
      ↓
Access Error Screen
```
The user remains authenticated but access is blocked. No Firebase logout occurs.

---

## 9. Tenant Boundary Enforcement

Protecting against URL spoofing and multi-tenant contamination.

- **Cross School Navigation**: The active `schoolId` is immutable for the duration of the session inside the `AccessContext`.
- **Route Manipulation**: `RuntimeAccessGuard` intercepts manual URL changes. If a user types `/admin/school-config` but lacks the policy permission, they are bounced to the `Unauthorized Screen`.
- **Database Boundary**: Repositories read exclusively from `schools/{AccessContext.schoolId}/`.

---

## 10. Audit Events

The runtime access layer must log critical security events into `schools/{schoolId}/auditLogs`.

- **Access Denied**: User navigated to a route manually but failed the `RouteAccessPolicy`.
- **Permission Failure**: User attempted an API/Repository write operation missing an action permission.
- **Lifecycle Failure**: Suspended/Locked/Archived user attempted to bypass the respective fallback screen.
- **Route Blocked**: Route interception executed successfully.

---

## 11. Validation Strategy

Integration testing targets:
1. **Archived User Test**: Verify `Archived User` -> `Archived Account Screen`.
2. **Archived Role Test**: Verify `Role Archived` -> `Access Error Screen`.
3. **Dashboard Permission Test**: Verify `Dashboard.View` missing -> Dashboard Blocked.
4. **Permission Cache Refresh Test**: Verify `Role Change` -> Permission Cache Rebuilt.
5. **Route Protection**: Verify unprivileged user access bounces to an unauthorized handler.
6. **Screen Visibility**: Verify navigation menus hide items mapped to missing permissions.
7. **Action Visibility**: Verify "Edit" buttons vanish if `Can Edit` is missing.
8. **Lifecycle Routing**: Verify `pendingPasswordChange` locks routing to the password reset screen.
9. **Suspension Routing**: Verify a `suspended` status immediately routes to the Suspension screen without Firebase logout.
10. **Tenant Isolation**: Verify URL manipulations cannot override the `TenantContext.schoolId`.

---

## 12. Documentation Deliverables

Upon completion of Phase 1F execution, the following must be generated:
1. `EduPulse_Runtime_Integration_Implementation_Report.md`
2. `EduPulse_Runtime_Access_Governance_Report.md`
3. `EduPulse_Guard_Policy_Governance_Report.md`
4. `EduPulse_Runtime_Test_Report.md`
5. `EduPulse_Access_Tenant_Foundation_Final_Certification.md` (Capstone closing Document)

---
*End of Plan.*
