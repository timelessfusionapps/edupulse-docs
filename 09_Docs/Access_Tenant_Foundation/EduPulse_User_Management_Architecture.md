# EduPulse User Management Architecture

## Purpose

This document defines the complete User Management Architecture for EduPulse.

It governs:

- User Lifecycle
- Teacher Onboarding
- Parent Onboarding
- Account Status Management
- Password Management
- Parent-Student Relationships
- Staff Offboarding
- Historical Data Retention
- Identity Preservation
- Account Recovery

This document serves as the authoritative reference for all identity-related operations within the EduPulse platform.

---

# Design Principles

EduPulse User Management is built upon:

1. Simplicity for Schools
2. Strong Auditability
3. Identity Preservation
4. Multi-Tenant Isolation
5. No Hard Deletes
6. Parent-Centric Family Management
7. Future Scalability

---

# User Types

The platform supports the following user categories:

## System Roles

```text
Super Admin
School Admin
Parent
```

---

## School-Defined Roles

Examples:

```text
Teacher
Head Teacher
Principal
Vice Principal
Coordinator
House Master
Sports Coordinator
```

Additional custom roles may be created by School Admins.

---

# User Lifecycle

Every user follows a controlled lifecycle.

```text
Created
    ↓
Pending Password Change
    ↓
Active
    ↓
Locked
    ↓
Suspended
    ↓
Archived
```

---

# User State Definitions

## Created

Account exists but onboarding has not yet started.

Characteristics:

- User record exists
- Login credentials generated
- User has not logged in

---

## Pending Password Change

Temporary password still active.

Characteristics:

- Login allowed
- Dashboard access blocked
- Password change required

---

## Active

Normal operational state.

Characteristics:

- Full access according to role
- Normal platform usage

---

## Locked

Security protection state.

Triggered by:

```text
Multiple failed login attempts
```

Characteristics:

- Login blocked
- School Admin may unlock

---

## Suspended

Administrative restriction state.

Characteristics:

- Login blocked
- Data retained
- Historical ownership retained

Examples:

```text
Temporary leave
Policy violation
Investigation
```

---

## Archived

Offboarded user.

Characteristics:

- Login disabled
- Hidden from active operational screens
- Historical records preserved

---

# Archived Users Management

Archived users appear in a dedicated:

```text
Archived Users
```

section.

They are not displayed within active user listings.

---

# User Profile Structure

Each user contains:

```text
User ID
School ID
Role ID
First Name
Last Name
Email
Mobile Number
Status
Created At
Updated At
Last Login
```

Future Expansion:

```text
Profile Photo
Department
Employee ID
```

---

# Teacher Onboarding

Teacher creation is performed by School Admin.

Workflow:

```text
School Admin
    ↓
Create User
    ↓
Assign Role
    ↓
Generate Temporary Password
    ↓
System Sends Welcome Email
    ↓
Teacher Login
    ↓
Mandatory Password Change
    ↓
Active Account
```

---

# Teacher Initial Profile

Required fields:

```text
First Name
Last Name
Email
Mobile Number
Role
```

Assignments are configured later.

Examples:

```text
Classes
Departments
Houses
Events
```

This keeps onboarding simple.

---

# Parent Onboarding

Parent accounts are automatically created.

Parents are not manually provisioned by School Admins.

---

# Parent Creation Workflow

```text
Student Created
    ↓
Parent Information Entered
    ↓
Parent Matching Check
    ↓
Create or Link Parent
```

---

# Parent Matching Logic

Primary Match:

```text
Email Address
```

Secondary Match:

```text
Mobile Number
```

Workflow:

```text
Existing Parent Found
    ↓
Link Student
```

OR

```text
No Match Found
    ↓
Create Parent Account
```

---

# Parent Profile Structure

Required fields:

```text
Parent Name
Email Address
Mobile Number
Relationship
```

Examples:

```text
Father
Mother
Guardian
```

---

# Parent-Student Relationship Model

V1:

```text
One Parent
    ↓
Multiple Students
```

Example:

```text
Parent
 ├── Child A
 ├── Child B
 └── Child C
```

---

# Future Relationship Support

The architecture must support future expansion to:

```text
Multiple Parents
    ↓
Multiple Students
```

Examples:

```text
Mother
Father
Guardian
```

No UI implementation required in Phase 1.

Architecture support only.

---

# Parent Account Merge

School Admins may merge duplicate parent accounts.

Example:

```text
Parent A
 └── Student A

Parent B
 └── Student B
```

Merge Result:

```text
Parent
 ├── Student A
 └── Student B
```

All historical relationships must be preserved.

---

# Password Management

EduPulse supports:

## Administrator Reset

Workflow:

```text
School Admin
    ↓
Reset Password
    ↓
Generate Temporary Password
    ↓
User Changes Password
```

---

## Email Reset

Workflow:

```text
Forgot Password
    ↓
Email Verification
    ↓
Reset Link
    ↓
New Password
```

---

# Password Security Rules

Requirements:

```text
Minimum Length
Complex Passwords
Password Hashing
Secure Transport
```

Future:

```text
Multi-Factor Authentication
```

---

# User Locking

Accounts may be locked after excessive failed login attempts.

Workflow:

```text
Failed Logins
    ↓
Locked State
    ↓
School Admin Unlock
```

---

# Staff Offboarding

When staff leave the school:

```text
Active
    ↓
Archived
```

Users are never deleted.

---

# Offboarding Principles

Preserve:

```text
Audit Logs
Events
Announcements
Point Actions
Approvals
Reports
```

Historical ownership must remain intact.

---

# Historical Data Retention

Historical records must preserve original user identity.

Example:

```text
Teacher
    ↓
Assigned Points
```

Years later:

```text
Audit History
```

must still show:

```text
Original Teacher Name
```

not:

```text
Deleted User
```

---

# User Deletion Policy

EduPulse does not support hard deletion in Phase 1.

School Admins cannot permanently delete users.

Super Admins cannot permanently delete users.

All removals are performed using:

```text
Archive
```

---

# Identity Preservation Policy

Identity ownership must never be removed from:

```text
Audit Logs
Points History
Announcements
Events
Approvals
Reports
```

This guarantees platform auditability.

---

# School Transfer Policy

Phase 1 approach:

```text
Student Leaves School A
    ↓
Archive Student
    ↓
Create Student In School B
```

No transfer workflow exists in Phase 1.

This keeps tenant boundaries simple.

---

# User Search & Filtering

School Admins must be able to filter users by:

```text
Role
Status
Department
Class Assignment
Date Created
Last Login
```

Future:

```text
Advanced Search
```

---

# Audit Requirements

The following actions must be logged:

```text
User Created
User Updated
User Archived
User Suspended
Password Reset
Role Changed
Parent Merge
Account Unlock
```

All entries must include:

```text
Timestamp
School ID
Actor User ID
Target User ID
Action
```

---

# Tenant Isolation Requirements

Every user record must belong to:

```text
School ID
```

Cross-school access is prohibited.

Users cannot exist across multiple schools.

A teacher working at multiple schools requires:

```text
Separate Accounts
```

for each school.

---

# Success Criteria

The EduPulse User Management Architecture must support:

- Secure User Lifecycle Management
- Automated Parent Onboarding
- Controlled Teacher Onboarding
- Password Recovery
- Parent-Student Linking
- Staff Offboarding
- Identity Preservation
- Auditability
- Multi-Tenant Isolation

without requiring future architectural redesign.

This document serves as the definitive identity lifecycle reference for the EduPulse platform.