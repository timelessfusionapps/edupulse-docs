# Phase 1E — User Management Execution Plan

## Objective
This execution plan details the domain, data, and runtime architecture for User Management within EduPulse. It aligns with the `EduPulse_User_Management_Architecture.md`, `EduPulse_RBAC_Architecture.md`, and tenant isolation guarantees.

Execution authority is NOT granted. This plan is designed strictly for architecture review and approval.

---

## 1. User Domain Architecture

The User Domain encapsulates the core identity structures for all platform users.

```dart
enum UserLifecycleState {
  invited,
  created,
  pendingPasswordChange,
  active,
  locked,
  suspended,
  archived,
}

abstract class UserEntity {
  final String uid;
  final String schoolId;
  final String roleId;
  final UserLifecycleState status;
  final DateTime createdAt;
  final DateTime updatedAt;
  final DateTime? lastLogin;
  final UserProfileEntity profile;
}

class UserProfileEntity {
  final String firstName;
  final String lastName;
  final String email;
  final String mobileNumber;
  // Future fields: profilePhoto, employeeId, department
}

class TeacherEntity extends UserEntity {
  // Currently identical to UserEntity, future expansion for class assignments.
}

class ParentEntity extends UserEntity {
  final List<String> childStudentIds; // One Parent -> Multiple Children
  final String relationship; // e.g. "Father", "Mother", "Guardian", "Other"
}
```

---

## 2. Firestore Architecture

All User structures must remain strictly isolated per tenant.

**Path Strategy:**
```text
Collection: schools/{schoolId}/users
Document: {uid}
```

**Fields:**
- `roleId` (String)
- `status` (String - mapping to UserLifecycleState)
- `firstName` (String)
- `lastName` (String)
- `email` (String)
- `mobileNumber` (String)
- `userType` (String - e.g., 'Teacher', 'SchoolAdmin', 'Parent')
- `childStudentIds` (Array of Strings - for Parents only)
- `relationship` (String - for Parents only)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)
- `lastLogin` (Timestamp)

*This schema supports Teachers, School Admins, future Parents, and future reserved user types without restructuring.*

---

## 3. Teacher Onboarding & Offboarding Workflow

**Onboarding:**
1. **Create User**: Admin enters basic profile data (Name, Email, Mobile). Status may begin as `invited` or `created`.
2. **Assign Role**: Admin selects a role from the active (non-archived) `RoleRepository` payload.
3. **Generate Temporary Password**: System provisions auth credentials.
4. **Initial State**: Account transitions to `pendingPasswordChange` upon first login.
5. **Force Password Change**: User is locked from the dashboard until they submit a new password.
6. **Activate User**: State formally transitions to `active`.

**Offboarding (Architectural Documentation for Future Phase):**
1. **Identify Assets**: Identify Assigned Classes, Assigned Events, and Assigned Approvals.
2. **Transfer Ownership**: Admin reassigns these assets to another active Teacher/Admin.
3. **Archive User**: User is transitioned to `archived` state.

---

## 4. Parent Onboarding Workflow

Parent accounts are initiated automatically based on Student records but explicitly require Admin oversight.
1. **Student Created**: School Admin creates a Student and enters Parent Contact Information.
2. **Parent Matching (No Automatic Linking)**:
   - Primary Match: Exact `Email Address` match.
   - Secondary Match: Exact `Mobile Number` match.
3. **Admin Confirmation Required**:
   - If a potential match is found, the system presents it for Admin Review.
   - Admin Confirmation is required to explicitly link the parent.
4. **Link Parent**: Once confirmed, the `studentId` is appended to the parent's `childStudentIds` array.
5. **Relationship Model**: Architecture guarantees `One Parent -> Multiple Children`. 
   - *Future Multi-Parent Support:* Architecture inherently supports `Multiple Parents -> Single Student` (e.g., Student has links to Father, Mother, and Guardian). Implementation of multi-parent UI is deferred.

---

## 5. Parent Conflict Resolution & Merge

1. **Different Parent Emails**: If emails differ entirely but the mobile matches, the system flags a duplicate risk and prompts the Admin during student creation.
2. **Merge Operations**: School Admins may execute a "Merge Parents" operation for duplicate accounts.
   - Combines `childStudentIds`.
   - Archives the secondary (duplicate) parent record.
3. **Merge History Architecture**:
   - Merge creates a dedicated Merge History Record to support future rollback capability.
   - Preserves: Who Performed Merge, When Merge Occurred, Original Parent IDs, Children Affected, Fields Changed.

---

## 6. User Lifecycle Management & Governance Constraints

Hard Deletion is strictly **BANNED**. All removals use the `archived` state.

**Supported State Mutations:**
- **Activate**: Moves user to normal operational state (`active`).
- **Suspend**: Administrative restriction (`suspended`). Login blocked, but identity remains fully active in the database for queries.
- **Lock**: Security protection (`locked`) after multiple failed logins.
- **Archive**: Staff offboarding (`archived`). Login disabled, hidden from active user lists.
- **Restore**: Admin may recover an `archived` or `suspended` user back to `active`.

**Governance Validation Rules:**
- **Self-Archive Protection**: A School Admin attempting to archive themselves is strictly BLOCKED.
- **Last School Admin Protection**: The last active School Admin in a tenant cannot be Suspended or Archived. Attempting this is strictly BLOCKED to prevent tenant lockout.

---

## 7. Password Management

- **Temporary Password**: Generated automatically upon User Creation or Admin Reset.
- **Admin Reset**: School Admin can trigger a password reset for a user, moving them to `pendingPasswordChange`.
- **Email Reset**: Self-service forgotten password flow via email link.
- **Force Password Change**: Users in `pendingPasswordChange` are strictly blocked by routing guards from accessing the dashboard until completed.

---

## 8. Historical Data Preservation

- **Archived Users**: When offboarded, users are marked `archived` but NEVER deleted.
- **Audit Integrity**: Points History, Audit Logs, Approvals, and Event creations hold the `uid` of the user. Because the document at `schools/{schoolId}/users/{uid}` always exists, historical joins will consistently retrieve the original "First Name Last Name", preventing orphaned records or "Deleted User" anomalies.

---

## 9. Role Assignment Integration

- **RoleRepository Dependency**: User Management will fetch `schools/{schoolId}/roles` to populate the assignment dropdown.
- **Archived Role Validation**: Roles with `isArchived == true` will be explicitly filtered out of the selection list to prevent assigning deprecated roles to new staff.
- **Role Change**: Admins can update a user's `roleId`. The runtime will force the user to re-evaluate their permissions on their next token refresh or login.

---

## 10. Runtime Integration Strategy

*(Planning only. No implementation in Phase 1E.)*
- **Authentication**: Connects to `FirebaseAuth`. Custom tokens will NOT be used for RBAC.
- **TenantContext**: `TenantContextResolver` will fetch the `UserEntity`, read the `roleId`, fetch the `RoleEntity`, and flatten the permissions to determine Dashboard access.
- **Runtime Access Guards**: Routing logic will intercept navigation if the `UserEntity.status` is `locked`, `suspended`, or `pendingPasswordChange`, rendering appropriate fallback screens.

---

## 11. Audit Events

All lifecycle changes must generate logs in `schools/{schoolId}/auditLogs`.

**Tracked Actions:**
- `UserCreated`
- `UserUpdated`
- `UserSuspended`
- `UserArchived`
- `UserRestored`
- `RoleAssigned`
- `RoleChanged`
- `ParentMerged`
- `AdminPasswordReset`
- `SelfServicePasswordReset`
- `PasswordChanged`

---

## 12. Validation Strategy

Unit and integration testing requirements:
1. **Teacher Onboarding Test**: Verify creation to active state progression.
2. **Parent Match Validation Test**: Verify an email/mobile match requires explicit Admin Confirmation before linking occurs.
3. **Parent Merge Audit Test**: Verify a parent merge correctly generates an Audit Record with original IDs and rollback metadata.
4. **Archived User Protection Test**: Verify an `archived` user cannot be permanently deleted from Firestore through the repository.
5. **Role Assignment Test**: Verify that archived roles are not returned as valid assignment options.
6. **Tenant Isolation Test**: Verify queries for Users are strictly bound to a specific `schoolId`.
7. **Audit Event Generation Test**: Verify state changes correctly dispatch structured logs.
8. **Last School Admin Protection Test**: Verify an archive or suspend attempt on the final active School Admin is explicitly blocked.

---

## 13. Documentation Deliverables

Upon completion of Phase 1E execution, the following must be generated:
1. `EduPulse_User_Management_Implementation_Report.md`
2. `EduPulse_Parent_Onboarding_Architecture_Report.md`
3. `EduPulse_User_Lifecycle_Runtime_Report.md`
4. `EduPulse_Parent_Linking_Governance_Report.md`
5. `EduPulse_User_Management_Test_Report.md`
6. `EduPulse_User_Management_Certification.md`

---
*End of Plan.*
