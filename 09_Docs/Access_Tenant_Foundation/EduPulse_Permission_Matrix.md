# EduPulse Permission Matrix

## Purpose

This document defines the official permission matrix for EduPulse.

It serves as the single source of truth for:

- UI Visibility
- Feature Access
- API Authorization
- Firestore Security Enforcement
- RBAC Configuration
- Future Module Expansion

This matrix must be referenced by all future modules.

---

# Permission Architecture

EduPulse uses:

```text
Role
    ↓
Permissions
    ↓
Scope
    ↓
Feature Access
```

Permissions are assigned to Roles.

Roles are assigned to Users.

Permissions are never assigned directly to users.

---

# Permission Scope Levels

Permissions may be granted at different scopes.

## Class Scope

Access limited to:

```text
Assigned Classes
Assigned Students
Assigned Events
```

---

## Section Scope

Access limited to:

```text
Multiple Classes
Department
Section
```

---

## School Scope

Access across entire school.

---

## Platform Scope

Reserved for:

```text
Super Admin
```

---

# System Roles

Fixed Roles:

```text
Super Admin
School Admin
Parent
```

Custom Roles:

```text
Teacher
Head Teacher
Coordinator
Principal
Vice Principal
House Master
Sports Coordinator
Custom School Roles
```

---

# Dashboard Permissions

| Permission | Super Admin | School Admin | Teacher | Head Teacher | Parent |
|------------|------------|------------|----------|----------|----------|
| Dashboard.View | ✅ | ✅ | ✅ | ✅ | ✅ |
| Dashboard.Export | ✅ | ✅ | ❌ | Optional | ❌ |

---

# Student Permissions

| Permission | Super Admin | School Admin | Teacher | Head Teacher | Parent |
|------------|------------|------------|----------|----------|----------|
| Students.View | Override Only | ✅ | ✅ Class Scope | ✅ Section Scope | Child Only |
| Students.Create | ❌ | ✅ | ❌ | ❌ | ❌ |
| Students.Edit | ❌ | ✅ | ❌ | ❌ | ❌ |
| Students.Delete | ❌ | ✅ | ❌ | ❌ | ❌ |
| Students.Export | ❌ | ✅ | ❌ | Optional | ❌ |

---

# Event Permissions

## Teacher

Scope:

```text
Class Scope
```

Permissions:

| Permission |
|------------|
| Events.View |
| Events.Create |
| Events.Edit |
| Events.Delete |

Teacher events are limited to assigned classes.

---

## Head Teacher / Coordinator

Scope:

```text
Section Scope
```

Permissions:

| Permission |
|------------|
| Events.View |
| Events.Create |
| Events.Edit |
| Events.Delete |
| Events.Publish |

---

## School Admin

Scope:

```text
School Scope
```

Full CRUD access.

---

# Event Participation Permissions

Important:

EduPulse does NOT manage daily school attendance.

Event Participation represents participation tracking for school activities.

| Permission | School Admin | Teacher | Head Teacher | Parent |
|------------|------------|----------|----------|----------|
| EventParticipation.View | ✅ | ✅ | ✅ | Optional |
| EventParticipation.Mark | ✅ | ✅ Class Scope | ✅ Section Scope | ❌ |
| EventParticipation.Edit | ✅ | Limited | ✅ | ❌ |
| EventParticipation.Export | ✅ | ❌ | Optional | ❌ |

---

# Points Permissions

## Points Workflow

### Assign Points

Teacher:

```text
Immediate Execution
```

No approval required.

---

### Deduct Points

Teacher:

```text
Approval Required
```

Approval authority:

```text
Head Teacher
Coordinator
Principal
```

depending on school structure.

---

### Bulk Assign Points

Approval required.

Workflow:

```text
Teacher
    ↓
Bulk Assignment Request
    ↓
Approval
    ↓
Execution
```

---

# Points Permission Matrix

| Permission | School Admin | Teacher | Head Teacher | Parent |
|------------|------------|----------|----------|----------|
| Points.Assign | ✅ | ✅ | ✅ | ❌ |
| Points.Deduct | ✅ | Request Only | ✅ | ❌ |
| Points.BulkAssign | ✅ | Request Only | ✅ | ❌ |
| Points.ApproveChanges | ✅ | ❌ | ✅ | ❌ |
| Points.ViewHistory | ✅ | ✅ | ✅ | Optional |

---

# Announcement Permissions

## Teacher

Scope:

```text
Class Scope
```

May create announcements for assigned classes.

---

## Head Teacher

Scope:

```text
Section Scope
```

May create announcements across multiple classes.

---

## School Admin

Scope:

```text
School Scope
```

May create school-wide announcements.

---

# Announcement Matrix

| Permission | School Admin | Teacher | Head Teacher | Parent |
|------------|------------|----------|----------|----------|
| Announcements.View | ✅ | ✅ | ✅ | Optional |
| Announcements.Create | ✅ | ✅ Class Scope | ✅ Section Scope | ❌ |
| Announcements.Edit | ✅ | Own Announcements | Section Scope | ❌ |
| Announcements.Delete | ✅ | Own Announcements | Section Scope | ❌ |
| Announcements.Publish | ✅ | ❌ | ✅ | ❌ |

---

# Reports Permissions

| Permission | School Admin | Teacher | Head Teacher | Parent |
|------------|------------|----------|----------|----------|
| Reports.View | ✅ | Assigned Students | Section Scope | Optional |
| Reports.Generate | ✅ | ❌ | Optional | ❌ |
| Reports.Export | ✅ | ❌ | Optional | ❌ |

---

# User Management Permissions

Reserved exclusively for School Admin.

| Permission | School Admin |
|------------|------------|
| Users.View | ✅ |
| Users.Create | ✅ |
| Users.Edit | ✅ |
| Users.Disable | ✅ |
| Users.ResetPassword | ✅ |

No custom role receives User Management permissions in Phase 1.

---

# Role Management Permissions

Reserved exclusively for School Admin.

| Permission | School Admin |
|------------|------------|
| Roles.View | ✅ |
| Roles.Create | ✅ |
| Roles.Edit | ✅ |
| Roles.Delete | ✅ |
| Roles.Clone | ✅ |

---

# School Configuration Permissions

| Permission | School Admin |
|------------|------------|
| SchoolSettings.View | ✅ |
| SchoolSettings.Edit | ✅ |

---

# Audit Log Permissions

Audit logs use dedicated permissions.

| Permission | School Admin | Custom Roles |
|------------|------------|------------|
| AuditLogs.View | ✅ | Optional |
| AuditLogs.Export | ✅ | Optional |

Schools may grant Audit Log access to:

- Principal
- Vice Principal
- Coordinator

through custom permissions.

---

# Parent Visibility Controls

Parent visibility is configurable by school.

Schools may independently enable or disable:

```text
Student Profile
Points
Point History
Event Participation
Reports
Announcements
```

Example:

School A:

```text
Points
Reports
Announcements
```

School B:

```text
Points
Event Participation
Announcements
```

---

# Emergency Access Controls

School Admin may:

```text
Disable User
Suspend User
Force Password Reset
Revoke Access Immediately
```

Changes take effect immediately.

---

# Super Admin Permissions

Super Admin does NOT have unrestricted access to school data.

Default Access:

```text
Platform Metadata
Subscriptions
Billing
Tenant Health
Usage Metrics
```

---

# Support Override Mode

When support intervention is required:

```text
Super Admin
    ↓
Support Override
    ↓
Temporary School Access
```

Requirements:

- Logged
- Audited
- Traceable

---

# Reserved Future Permission Categories

Reserved for future modules:

```text
Communication
Parent Portal
Teacher Portal
AI Features
Integrations
Finance
Daily Attendance (if ever introduced)
```

No permissions assigned in Phase 1.

---

# School Admin Protection

School Admin always retains:

```text
Full School Access
```

A School Admin cannot accidentally remove their own core administrative permissions.

---

# Success Criteria

The EduPulse Permission Matrix must support:

- Dynamic School Structures
- Tenant Isolation
- Fine-Grained Authorization
- Approval Workflows
- Scope-Based Access
- Parent Visibility Controls
- Event Participation Tracking
- Secure Points Management
- Future Module Expansion

without requiring RBAC restructuring.

This document serves as the definitive authorisation reference for the EduPulse platform.