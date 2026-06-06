# EduPulse Access & Tenant Foundation Master Architecture

## Purpose

This document defines the foundational identity, tenancy, ownership, and access architecture of the EduPulse platform.

The objective is to establish a scalable, multi-tenant SaaS architecture that supports multiple schools while maintaining strict data isolation, operational simplicity, and long-term scalability.

---

# Core Philosophy

EduPulse follows a:

**Configuration-over-Customization** philosophy.

Schools may configure:

- Branding
- Academic terminology
- Roles
- Permissions
- Houses
- School settings

However, core workflows remain standardized to ensure:

- Simplicity
- Predictable user experience
- Easier support
- Lower operational overhead
- Long-term scalability

---

# Multi-Tenant Architecture

EduPulse is designed as a multi-tenant SaaS platform.

```text
EduPulse Platform
 ├── School A
 ├── School B
 ├── School C
 └── School N
```

Each school operates independently.

All data isolation is enforced using:

```text
schoolId
```

Every business record belongs to exactly one school.

---

# Tenant Ownership Hierarchy

```text
Super Admin
    │
    ├── School
            │
            ├── School Admin
            │
            ├── Staff
            │
            ├── Parents
            │
            └── Students
```

---

# Fixed System Roles

The following platform roles are immutable:

## Super Admin

Responsible for:

- Creating schools
- Activating schools
- Suspending schools
- Subscription management
- Billing
- Platform analytics
- Creating first School Admin

---

## School Admin

Responsible for:

- School configuration
- User management
- Role management
- Permission management
- Student management
- Staff management

---

## Parent

Responsible for:

- Viewing linked children
- Attendance
- Points
- Events
- Announcements
- Reports

---

# School-Defined Roles

Schools may create custom roles.

Examples:

- Teacher
- Head Teacher
- Academic Coordinator
- Principal
- Vice Principal
- House Master
- Sports Coordinator

Schools may:

- Create Role
- Edit Role
- Delete Role
- Clone Role
- Assign Permissions

---

# User Lifecycle

```text
School Admin
    ↓
Create User
    ↓
Temporary Password
    ↓
First Login
    ↓
Mandatory Password Change
```

---

# Parent Architecture

One parent account may be linked to multiple students.

```text
Parent
 ├── Student A
 ├── Student B
 └── Student C
```

This supports families with multiple children.

---

# Student Identity

Every student must possess:

```text
Admission Number
```

Requirements:

- Mandatory
- Unique within school
- Immutable after creation (except by School Admin)

---

# Subscription Ownership

Subscription ownership remains exclusively under:

```text
Super Admin
```

Schools cannot directly manage subscription plans in Phase 1.

---

# Access Foundation Principles

1. Multi-tenant first
2. School isolation mandatory
3. Role-based access control
4. Permission-based authorization
5. Configuration over customization
6. Simple onboarding
7. Enterprise scalability
8. No cross-school visibility

---

# Success Criteria

EduPulse shall support:

- Hundreds of schools
- Thousands of users
- Dynamic roles
- Dynamic permissions
- Dynamic houses
- School-specific branding

without requiring foundational architectural rewrites.