# EduPulse RBAC (Role-Based Access Control) Architecture

## Purpose

This document defines the Role-Based Access Control (RBAC) architecture for EduPulse.

The objective is to provide a flexible, scalable, and school-configurable authorization system that supports multiple schools with different organizational structures while maintaining strict security and tenant isolation.

This architecture serves as the security foundation for all present and future EduPulse modules.

---

# Design Principles

EduPulse RBAC is built on the following principles:

1. Permission-Based Access
2. Role-Based Authorization
3. Tenant Isolation
4. Configuration over Customization
5. Auditability
6. Least Privilege Access
7. Scalability without Architectural Rewrites

---

# Authorization Hierarchy

Authorization follows the flow:

```text
Authentication
    ↓
User
    ↓
Role
    ↓
Permissions
    ↓
Feature Access
```

Users never receive permissions directly.

Permissions are granted through roles.

---

# System Roles

The following platform roles are fixed and cannot be deleted.

## Super Admin

Platform-level administrator.

Responsibilities:

- Create Schools
- Activate Schools
- Suspend Schools
- Manage Subscriptions
- Billing Management
- Platform Analytics
- Create First School Admin
- Operational Recovery
- Tenant Support

Super Admin may access any school for support and administrative purposes.

---

## School Admin

School-level administrator.

Responsibilities:

- School Configuration
- User Management
- Role Management
- Permission Management
- Student Management
- Event Management
- Points Management
- Audit Log Access

School Admin has full authority within their assigned school.

---

## Parent

Parent users are fixed system roles.

Responsibilities:

- View Linked Children
- View Event Participation
- View Points
- View Announcements
- View Reports

Parent visibility remains configurable at the school level.

---

# Custom School Roles

Schools may create their own roles.

Examples:

- Teacher
- Head Teacher
- Academic Coordinator
- Principal
- Vice Principal
- House Master
- Sports Coordinator
- Event Coordinator

Schools are not restricted to predefined staff roles.

---

# School Admin Role Management Capabilities

School Admins may:

- Create Role
- Edit Role
- Delete Role
- Clone Role
- Assign Permissions
- Assign Users to Roles

This allows schools to model their organizational structure without requiring EduPulse support intervention.

---

# Role Templates

EduPulse shall provide role templates for rapid setup.

Examples:

- Teacher
- Head Teacher
- Principal
- Academic Coordinator
- House Master
- Event Coordinator

Templates may be cloned and customized.

---

# Role Inheritance

EduPulse supports role inheritance.

Example:

```text
Teacher
    ↓
Head Teacher
    ↓
Academic Coordinator
```

Inherited roles automatically receive permissions from parent roles.

Additional permissions may be added at higher levels.

Benefits:

- Easier maintenance
- Reduced configuration effort
- Consistent permission structures

---

# Permission Architecture

EduPulse uses Action-Level Permissions.

Permissions follow the format:

```text
Module.Action
```

Examples:

```text
Students.View
Students.Create
Students.Edit
Students.Delete
```

```text
Events.View
Events.Create
Events.Edit
Events.Delete
```

This structure provides maximum flexibility and scalability.

---

# Permission Categories

## Dashboard

```text
Dashboard.View
Dashboard.Export
```

---

## Students

```text
Students.View
Students.Create
Students.Edit
Students.Delete
Students.Export
```

---

## Events

```text
Events.View
Events.Create
Events.Edit
Events.Delete
Events.Publish
Events.Archive
```

---

## Event Participation

Important:

EduPulse does NOT manage daily school attendance.

This category represents participation tracking for events only.

```text
EventParticipation.View
EventParticipation.Mark
EventParticipation.Edit
EventParticipation.Export
```

Examples:

- Sports Day
- Competitions
- House Events
- Cultural Programs
- Academic Events

---

## Points

Points are treated as a high-security category.

```text
Points.Assign
Points.Deduct
Points.BulkAssign
Points.ApproveChanges
Points.ViewHistory
```

This allows schools to separate operational and approval responsibilities.

---

## Announcements

```text
Announcements.View
Announcements.Create
Announcements.Edit
Announcements.Delete
Announcements.Publish
```

---

## Reports

```text
Reports.View
Reports.Export
Reports.Generate
```

---

## Users

```text
Users.View
Users.Create
Users.Edit
Users.Disable
Users.ResetPassword
```

---

## Roles

```text
Roles.View
Roles.Create
Roles.Edit
Roles.Delete
Roles.Clone
```

---

## School Settings

```text
SchoolSettings.View
SchoolSettings.Edit
```

---

## Billing

Reserved for Super Admin.

```text
Billing.View
Billing.Manage
Billing.Suspend
```

---

# Teacher Scope Restrictions

Teachers do not automatically receive access to all students.

Teachers may only access:

- Assigned Classes
- Assigned Students
- Assigned Events
- Assigned Houses

This prevents unnecessary exposure of school-wide student data.

---

# Parent Visibility Controls

Schools may configure which information is visible to parents.

Examples:

```text
Points
Event Participation
Announcements
Reports
```

A school may enable or disable categories independently.

Example:

School A:

- View Points
- View Event Participation

School B:

- View Points Only

---

# Permission Groups

To simplify administration, EduPulse supports Permission Groups.

Examples:

## Academic Permissions

```text
Students.View
Reports.View
Reports.Export
```

---

## Event Permissions

```text
Events.View
Events.Create
Events.Edit
EventParticipation.Mark
```

---

## House Permissions

```text
Points.Assign
Points.ViewHistory
Events.View
```

Permission Groups reduce manual configuration effort.

---

# User Access Control

School Admins may:

- Disable User
- Suspend User
- Force Password Reset
- Revoke Access Immediately

These actions take effect instantly.

---

# Audit Trail

All security-sensitive actions must be logged.

Tracked activities include:

- Role Created
- Role Updated
- Role Deleted
- Permission Changed
- User Created
- User Disabled
- Password Reset
- Points Assigned
- Points Deducted
- Event Created
- Event Updated
- School Settings Changed

---

# Audit Log Structure

Each log entry contains:

```text
Timestamp
SchoolId
UserId
UserName
Action
EntityType
EntityId
OldValue
NewValue
```

Future Enhancements:

```text
IP Address
Device Information
Location Metadata
```

---

# Audit Log Filtering

School Admins may filter logs by:

- User
- Action
- Date Range
- Entity Type
- Entity ID

Audit logs may also be exported.

---

# Super Admin Override Access

Super Admin may:

- Access Any School
- Recover Accounts
- Reset Permissions
- Audit Security Settings
- Investigate Issues

This access exists solely for platform administration and support.

All Super Admin actions must also be logged.

---

# Tenant Security Requirements

All RBAC enforcement must remain tenant-aware.

Every authorization check must validate:

```text
schoolId
```

No role or permission may grant access to another school's data.

---

# Success Criteria

EduPulse RBAC must support:

- Multi-Tenant SaaS Operation
- Dynamic School Structures
- Role Inheritance
- Permission Groups
- Fine-Grained Authorization
- Parent Access Controls
- Event Participation Tracking
- Secure Points Management
- Full Auditability

without requiring future architectural rewrites.

The RBAC system shall serve as the definitive authorization framework for all future EduPulse modules.