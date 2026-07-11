# EduPulse_Phase_3C_Super_Admin_Architecture.md

# EduPulse
## Phase 3C — Super Admin Layer Architecture

Version: 1.0

Status:

APPROVED

Scope:

Platform Control Layer

---

# Purpose

Phase 3C introduces the first user-facing operational layer for EduPulse:

Super Admin Layer.

This layer controls:

- school onboarding
- tenant lifecycle
- tenant limits
- school recovery
- school oversight
- platform-wide communication
- platform administrator hierarchy

This is the SaaS foundation.

---

# Dependency Baseline

Consumes certified systems:

Phase 2:

- Multi-Tenant Core
- Authentication
- RBAC

Phase 3A:

- Tenant Isolation
- Integration Services
- Firebase Validation

Phase 3B:

- Parent Engagement Foundation
- Notification Foundation
- Contribution Engine
- House Impact Engine (read-only visibility)

---

# Core Architecture

Platform Owner Layer
↓
Platform Admin Layer
↓
Tenant Layer
↓
School Admin Layer
↓
School Users

---

# Module 1 — School Registration

Supports Hybrid Model:

## Manual Registration

Super Admin creates school directly.

Flow:

Create School
→ Assign Admin
→ Onboarding starts

---

## Self Registration

School applies.

Flow:

Application
→ Email Verification
→ Super Admin Approval
→ Tenant Creation

---

# Module 2 — School Verification Layer

Verification requirements:

Required:

- School Name
- Contact Number
- Official School Email

Optional:

- Website

Validation:

- block public domains
- verify email ownership
- optionally match website domain

Purpose:

Prevent fake school registration.

---

# Module 3 — Tenant Lifecycle

Status model:

Pending
↓
Onboarding
↓
Trial
↓
Active
↓
Suspended
↓
Archived

---

## Pending

Awaiting approval.

---

## Onboarding

Guided setup active.

---

## Trial

Fixed 30-day trial.

---

## Active

Operational tenant.

---

## Suspended

Access blocked.

Data preserved.

---

## Archived

Read-only permanent preservation.

Recoverable.

---

# Module 4 — Guided Onboarding Wizard

After approval:

School Admin completes:

Step 1:

Academic setup

- academic year
- terms
- sessions

Step 2:

Class setup

- classes
- sections

Step 3:

House setup

- names
- colors

Step 4:

Teacher setup

Step 5:

Student import

- manual
- CSV

Step 6:

Parent mapping

Step 7:

Recognition categories

Step 8:

Event categories

---

# Module 5 — School Admin Assignment

Hybrid assignment:

Self-registration:

Applicant becomes default School Admin.

Manual onboarding:

Super Admin assigns.

Override supported.

---

# Module 6 — Multi-School Ownership

Architecture:

Master User
↓
SchoolMemberships[]

A user may manage multiple schools.

Authentication:

simple email/username + password

School verification:

separate official school email

Runtime isolation:

activeSchoolId

Maintains strict tenant isolation.

---

# Module 7 — Tenant Limits

Per-school custom limits:

Configurable:

- max students
- max teachers
- max parents
- max classes
- max houses
- max events
- storage limits
- trial overrides
- feature flags

Supports future subscriptions.

---

# Module 8 — Super Admin Dashboard

Shows:

## School Registry

- School Name
- Status
- School Admin
- Created Date
- Trial Status

---

## Basic Metrics

Per school:

- total students
- total teachers
- total classes
- active users

---

## Platform Metrics

Global:

- total schools
- total students
- total teachers
- active tenants
- pending approvals

---

# Module 9 — Super Admin Oversight

Read-only only.

Can:

- view users
- view school metrics
- view onboarding progress
- view usage

Cannot:

- modify school operations
- modify student records
- modify events
- modify recognition

---

# Module 10 — Communication Layer

Supports:

## Email

- verification
- welcome
- trial reminders
- suspension
- recovery

---

## In-App Notifications

- onboarding reminders
- approval notifications
- warnings

---

## Broadcast Announcements

Platform-wide:

- maintenance
- updates
- releases

---

# Module 11 — Recovery Layer

Recovery request model:

Suspended / Archived
↓
School requests recovery
↓
Super Admin reviews
↓
Approve / Reject

---

# Module 12 — Audit Layer

Tracks:

- school creation
- approvals
- suspensions
- archival
- restorations
- limit changes
- admin changes
- broadcasts
- communication events

Scope:

Super Admin layer only.

---

# Module 13 — Tiered Super Admin RBAC

Roles:

## Owner

Full rights.

Controls all.

---

## Platform Admin

Configurable.

Examples:

- Onboarding Admin
- Support Admin
- Operations Admin

Owner defines:

- approval rights
- suspension rights
- recovery rights
- audit rights
- communication rights

---

# Build Order

1. Super Admin Core Dashboard
2. School Registration Flow
3. Approval Queue
4. Verification Flow
5. Tenant Lifecycle Manager
6. Guided Onboarding
7. Limits Manager
8. Communication Layer
9. Recovery Layer
10. Audit Layer
11. Platform Admin RBAC

---

# Certification Objective

Phase 3C is certified only if:

✓ Schools can register

✓ Schools can be approved

✓ Tenants can be created

✓ Onboarding can complete

✓ Trial can start

✓ Limits can be configured

✓ Recovery can work

✓ Audits can trace all actions

✓ Platform admins can be permissioned