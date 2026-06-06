# Phase 1D — RBAC Foundation Execution Plan

## Objective
This execution plan details the domain, data, runtime, and audit architecture for Role-Based Access Control (RBAC) in EduPulse. It aligns with the `EduPulse_RBAC_Architecture.md`, `EduPulse_Permission_Matrix.md`, and tenant isolation guarantees.

Execution authority is NOT granted. This plan is designed strictly for architecture review and approval.

---

## 1. RBAC Domain Architecture

The RBAC Domain encapsulates roles, permissions, permission groups, and inheritance hierarchies.

```dart
class RoleEntity {
  final String roleId;
  final String name;
  final String description;
  final bool isSystemRole; 
  final bool isArchived;
  final List<String> permissions; // e.g., "Students.View"
  final String? parentRoleId; // Maximum 1 Parent Role for inheritance
}

class PermissionEntity {
  final String id; // e.g., "Students.Create"
  final String module; // e.g., "Students"
  final String action; // e.g., "Create"
  final String description;
}

class PermissionGroupEntity {
  final String groupId; // e.g., "StudentManagement"
  final String name;
  final List<String> permissions;
}

class RoleInheritanceEntity {
  final String childRoleId;
  final String parentRoleId;
  // Flattened set of resolved permissions after inheritance
  final List<String> resolvedPermissions;
}
```

---

## 2. Firestore Architecture

All RBAC structures must remain isolated per tenant.

**Path Strategy:**
```text
Collection: schools/{schoolId}/roles
Document: {roleId}
```

**Fields:**
- `name` (String)
- `description` (String)
- `isSystemRole` (Boolean)
- `isArchived` (Boolean)
- `permissions` (Array of Strings, e.g., `["Students.View", "Events.Create"]`)
- `parentRoleId` (String, nullable)
- `metadata`: { `createdAt`, `updatedAt`, `createdBy` }

System Roles will be seeded during tenant creation but stored physically inside the tenant's `roles` collection to allow customized permission additions where applicable.

---

## 3. Role Lifecycle

**Operations Supported:**
1. **Create Role**: Instantiate a new custom role with selected permissions.
2. **Edit Role**: Modify permissions or description of an existing role.
3. **Archive Role**: Soft-delete a custom role to prevent future assignments while maintaining historical audit integrity (e.g. Audit Logs, Point History, Approvals must display the original identity).
4. **Clone Role**: Duplicate an existing role (System or Custom) into a new Custom role.

*Note: Permanent Role Deletion is NOT supported to preserve historical references.*

---

## 4. Permission Architecture

Permissions follow the `<Module>.<Action>` format.

- **Student Permissions**: `Students.View`, `Students.Create`, `Students.Edit`, `Students.Archive`
- **Event Permissions**: `Events.View`, `Events.Create`, `Events.Edit`, `Events.Delete`, `EventParticipation.View`, `EventParticipation.Mark`, `EventParticipation.Edit`
- **Points Permissions**: `Points.Assign`, `Points.Deduct`, `Points.BulkAssign`, `Points.ApprovePointChanges`, `Points.ViewPointHistory`
- **Announcement Permissions**: `Announcements.View`, `Announcements.Create`, `Announcements.Edit`, `Announcements.Delete`, `Announcements.Publish`
- **Report Permissions**: `Reports.View`, `Reports.Export`, `Reports.Generate`
- **School Configuration Permissions**: `SchoolSettings.View`, `SchoolSettings.Edit`

---

## 5. Permission Groups

To streamline UI selection for School Admins, permissions are clustered into groups:
1. **Student Management**: (`Students.View`, `Students.Create`, `Students.Edit`, `Students.Archive`)
2. **Event Management**: (`Events.View`, `Events.Create`, `Events.Edit`, `Events.Delete`)
3. **Points Management**: (`Points.Assign`, `Points.Deduct`, `Points.BulkAssign`, `Points.ApprovePointChanges`, `Points.ViewPointHistory`)
4. **Announcements**: (`Announcements.View`, `Announcements.Create`, `Announcements.Edit`, `Announcements.Delete`, `Announcements.Publish`)
5. **Reporting**: (`Reports.View`, `Reports.Export`, `Reports.Generate`)
6. **School Configuration**: (`SchoolSettings.View`, `SchoolSettings.Edit`)

---

## 6. Role Governance & Inheritance Rules

**Inheritance Constraints:**
- **Maximum 1 Parent Role**: A role can inherit from at most one parent role (e.g. `Head Teacher` inherits from `Teacher`). Multiple inheritance (e.g. `Teacher` and `House Master` inheriting to a single custom role) is explicitly prohibited to simplify permission structures for non-technical users.
- **Permission Inheritance**: Child role dynamically resolves permissions as `Union(ChildPermissions, ParentPermissions)`.
- **Permission Override**: Explicit removals or additions at the Child level supersede the Parent level.

**Permission Dependency Architecture:**
Architectural validation rules will prevent invalid or broken permission combinations during role creation/editing. Examples:
- `Points.ApprovePointChanges` strictly requires `Points.ViewPointHistory`.
- `Students.Edit` strictly requires `Students.View`.
- `Reports.Export` strictly requires `Reports.View`.

---

## 7. System Roles

Protected System Roles (`isSystemRole: true`) have specific protection rules:
**Cannot Delete, Cannot Archive, Cannot Rename.**

1. **School Admin**: Full access to all Tenant operations.
2. **Principal**: High-level academic oversight, approval capabilities.
3. **Vice Principal**: Operational oversight.
4. **Coordinator**: Section/Department level access.
5. **Head Teacher**: Section level access, announcement publishing.
6. **Teacher**: Class scope access, point assignment.
7. **House Master**: House scope access.

*Future Reserved Roles:*
- **Parent**: (Moved to reserved due to Parent Portal deferment. Not active in Phase 1D).

---

## 8. Custom Roles

Schools can model exact structures using Custom Roles (`isSystemRole: false`).
- **Create**: Define from scratch.
- **Clone**: Duplicate a system or custom role.
- **Modify Permissions**: Adjust access to modules.
- **Archive**: Soft-delete when no longer required. Cannot be permanently deleted.

---

## 9. Runtime Integration Strategy

*(Planning only. No implementation in Phase 1D.)*
- **Tenant Resolution via Firestore**: No Firebase Custom Claims will be used. User permissions strictly resolve through `schools/{schoolId}/users/{uid}`.
- **Flow**: `User` -> `roleId` (from user document) -> `RoleEntity` -> `Permissions` -> `TenantContext`.
- **User Management**: The user creation flow will include a dropdown to assign roles derived from `schools/{schoolId}/roles`. Archival states will exclude roles from this assignment list.
- **Runtime Access Guards**: Flutter `BlocProvider` and Router Guards will intercept navigation by verifying resolved permission strings against required endpoints.
- **Bulk Points Approval Workflow**: 
  - *Single Point Assignment*: Requires `Points.Assign`, saves immediately.
  - *Bulk Point Assignment*: Requires `Points.BulkAssign`, creates a pending request. Requires a user with `Points.ApprovePointChanges` to commit.

---

## 10. Audit Requirements

All RBAC modifications must be captured for compliance.

**Path Strategy:**
```text
Collection: schools/{schoolId}/auditLogs
```

**Events Tracked:**
- `RoleCreated`, `RoleUpdated`, `RoleArchived`
- `PermissionChanged` (Granular diff of added/removed permissions)
- `RoleAssigned` (User assigned to a role)
- `RoleRemoved` (User removed from a role)

**Audit Schema:**
Includes `Timestamp`, `UserId` (Actor), `Action`, `EntityType` (Role/User), `EntityId`, `OldValue`, and `NewValue`.

---

## 11. Validation Strategy

Unit and integration tests required during execution:
1. **Permission Resolution**: Verify `Union` logic accurately flattens single-parent/child permissions.
2. **Role Inheritance**: Verify updating a Parent role's permissions cascades successfully to the resolved Child role.
3. **Protected Role Test**: Verify attempting to rename a System Role (e.g., `School Admin`) is explicitly blocked.
4. **Archived Role Test**: Verify that an archived role cannot be fetched or displayed in assignment lists.
5. **Permission Dependency Test**: Verify assigning `Points.ApprovePointChanges` validates and automatically requires/injects `Points.ViewPointHistory` or fails if not provided.
6. **Tenant Isolation**: Verify `school_A` cannot query or assign `school_B` roles.

---

## 12. Documentation Deliverables

Upon completion of Phase 1D execution, the following must be generated:
1. `EduPulse_RBAC_Implementation_Report.md`
2. `EduPulse_RBAC_Runtime_Report.md`
3. `EduPulse_Role_Inheritance_Architecture_Report.md`
4. `EduPulse_RBAC_Security_Report.md`
5. `EduPulse_RBAC_Test_Report.md`
6. `EduPulse_Role_Governance_Report.md`
7. `EduPulse_RBAC_Certification.md`

---
*End of Plan.*
