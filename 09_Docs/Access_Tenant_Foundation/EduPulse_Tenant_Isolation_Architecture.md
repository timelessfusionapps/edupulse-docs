# EduPulse Tenant Isolation Architecture

## Purpose

This document defines the tenant isolation architecture for EduPulse.

Its purpose is to guarantee:

- Complete school data isolation
- Secure multi-tenant operation
- Scalable Firestore architecture
- Tenant-aware repositories
- Tenant-aware runtime execution
- Controlled Super Admin access
- Enterprise-grade security boundaries

This document serves as the definitive security architecture for the EduPulse platform.

---

# Design Principles

EduPulse tenant architecture is built upon:

1. Complete School Isolation
2. Zero Cross-Tenant Visibility
3. Defense-in-Depth Security
4. Tenant-Aware Runtime Architecture
5. Auditability
6. Scalability
7. School Data Ownership

---

# Tenant Model

EduPulse is a multi-tenant SaaS platform.

```text
EduPulse Platform
 ├── School A
 ├── School B
 ├── School C
 └── School N
```

Each school is an independent tenant.

Schools cannot access:

- Other schools
- Other users
- Other students
- Other reports
- Other events

---

# School Identity

Every school contains:

```text
schoolId
schoolCode
schoolName
subscriptionStatus
createdAt
updatedAt
```

---

## schoolId

System-generated unique identifier.

Example:

```text
8fa2e91b-xxxx-xxxx-xxxx
```

Used internally throughout the platform.

---

## schoolCode

Human-readable unique identifier.

Examples:

```text
TEMS
DPS
NPS
SJS
```

Future Uses:

```text
tems.edupulse.app
dps.edupulse.app
```

Support operations and tenant lookup.

---

# Firestore Tenancy Model

All business data must exist beneath:

```text
schools/{schoolId}
```

No business collections may exist globally.

---

# Required Firestore Structure

```text
schools
 └── {schoolId}
      ├── settings
      ├── users
      ├── roles
      ├── students
      ├── parents
      ├── houses
      ├── events
      ├── eventParticipation
      ├── announcements
      ├── points
      ├── reports
      ├── dashboard
      ├── auditLogs
      └── configuration
```

---

# Prohibited Architecture

The following architecture is prohibited:

```text
students
users
events
points
```

with:

```text
schoolId
```

filters.

Reason:

- Higher security risk
- Easier developer mistakes
- More difficult auditing
- More complex security rules

---

# Tenant Context Architecture

Every authenticated session receives:

```text
TenantContext
```

---

# TenantContext Structure

```text
schoolId
userId
roleId
permissions
```

Future Extensions:

```text
subscriptionTier
tenantRegion
featureFlags
```

---

# TenantContext Lifecycle

```text
Authentication
    ↓
User Profile Resolution
    ↓
TenantContext Creation
    ↓
Repository Injection
    ↓
Application Runtime
```

---

# Repository Architecture

Repositories must be tenant-aware.

Required Architecture:

```text
TenantContext
      ↓
Datasource
      ↓
Repository
      ↓
Bloc
      ↓
UI
```

---

# Repository Enforcement

Every repository query must automatically inject:

```text
schoolId
```

from TenantContext.

Example:

```text
schools/{schoolId}/students
```

Repositories must never accept arbitrary tenant identifiers from UI layers.

---

# Mandatory Tenant Scoping

Every repository operation must validate:

```text
schoolId
```

before:

- Reads
- Writes
- Updates
- Deletes
- Streams

No exceptions.

---

# Bloc Architecture

Blocs must remain tenant-agnostic.

Blocs do not directly enforce tenancy.

Repositories provide already-filtered data.

Architecture:

```text
Repository
    ↓
Tenant Filtered Data
    ↓
Bloc
    ↓
UI
```

Benefits:

- Cleaner architecture
- Centralized security
- Easier testing
- Reduced duplication

---

# Multi-Tenant Query Architecture

Queries must always target a specific tenant.

Correct:

```text
schools/{schoolId}/students
```

Correct:

```text
schools/{schoolId}/events
```

Correct:

```text
schools/{schoolId}/dashboard
```

---

# Forbidden Queries

Forbidden:

```text
all schools
```

Forbidden:

```text
collectionGroup('students')
```

for operational school workflows.

Forbidden:

```text
cross-school reporting
```

unless explicitly executed through platform administration tooling.

---

# Security Strategy

EduPulse uses Triple-Layer Protection.

Architecture:

```text
UI
 ↓
Repository
 ↓
Firestore Rules
```

---

# Layer 1 – UI Protection

UI components hide inaccessible features.

Examples:

- Hidden buttons
- Hidden navigation
- Hidden actions

This layer improves user experience.

It is not considered a security boundary.

---

# Layer 2 – Repository Protection

Repositories enforce:

```text
TenantContext
Permissions
Role Constraints
```

All business operations pass through repositories.

---

# Layer 3 – Firestore Rules

Firestore remains the final security boundary.

Firestore Rules must verify:

```text
Authenticated User
Tenant Membership
Role Requirements
```

before allowing access.

---

# Cross-School Protection

Cross-school access is prohibited.

Example:

Teacher:

```text
School A
```

cannot query:

```text
School B
```

even if:

- UI manipulated
- API requests modified
- URLs altered

Firestore must reject access.

---

# Super Admin Access Model

Super Admin operates separately from school users.

Default access is restricted.

---

# Normal Super Admin Visibility

Super Admin may view:

```text
School Name
School Code
Subscription Status
User Counts
Storage Metrics
Platform Health
Usage Metrics
```

No direct access to school records.

---

# Restricted Data

Super Admin cannot browse:

```text
Students
Parents
Events
Points
Reports
Announcements
```

during normal operation.

---

# Support Override Mode

Support Override provides temporary access.

Workflow:

```text
Support Request
    ↓
Reason Entered
    ↓
Override Activated
    ↓
Temporary Access Granted
```

---

# Override Requirements

Mandatory:

```text
Reason
Timestamp
Actor
Target School
```

All actions must be logged.

---

# Override Audit Logging

Every override event records:

```text
Support User
Reason
School
Duration
Accessed Modules
Timestamp
```

Override history cannot be deleted.

---

# Subscription Isolation

Every school maintains an independent subscription.

Examples:

```text
Active
Grace Period
Suspended
```

---

# Subscription Grace Period

When subscription expires:

```text
Active
    ↓
Read Only
    ↓
30 Day Grace Period
    ↓
Suspended
```

---

# Read-Only Mode

During grace period:

Allowed:

```text
View Data
Export Data
Review Records
```

Blocked:

```text
Create
Edit
Delete
Assign Points
Create Events
```

---

# Suspended State

After grace period:

```text
Login Disabled
```

Data remains preserved.

No data is deleted.

---

# Data Ownership Model

EduPulse follows:

```text
Data Owner      = School
Data Processor  = EduPulse
```

---

# School Rights

Schools own:

```text
Students
Parents
Users
Events
Points
Reports
Announcements
```

and all associated records.

---

# EduPulse Responsibilities

EduPulse is responsible for:

```text
Processing
Storage
Security
Backups
Infrastructure
Recovery
```

on behalf of schools.

---

# Data Export Readiness

Architecture must support future:

```text
Tenant Data Export
```

capabilities.

Schools must be able to retrieve their data.

---

# Backup Isolation

Backups must preserve:

```text
schoolId
```

boundaries.

Tenant recovery must support:

```text
Single School Restoration
```

without affecting other schools.

---

# Future Scaling Strategy

The architecture must support:

```text
Hundreds of Schools
Thousands of Users
Millions of Records
```

without requiring tenancy redesign.

---

# Success Criteria

EduPulse Tenant Isolation Architecture must provide:

- Complete School Isolation
- Secure Multi-Tenant Operation
- Tenant-Aware Runtime Execution
- Repository-Level Enforcement
- Triple-Layer Security
- Controlled Super Admin Access
- Subscription Isolation
- Data Ownership Protection
- Scalable Firestore Architecture

without requiring future foundational restructuring.

This document serves as the definitive tenant security architecture for the EduPulse platform.