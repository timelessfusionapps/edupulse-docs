# EduPulse_Phase_3C_Implementation_Design.md

# EduPulse
## Phase 3C — Super Admin Layer Implementation Design

Version: 1.0

Status:

APPROVED FOR UI MOCKUP

Scope:

Super Admin Experience Layer

---

# Purpose

This document defines the implementation blueprint for the Super Admin Layer.

This phase introduces the first operational UI over the certified EduPulse backend.

This design governs:

- UI screens
- navigation flows
- state orchestration
- backend bindings
- additive entities
- additive repositories
- additive services

This document precedes UI wireframing.

---

# Implementation Principles

This phase must:

✓ reuse certified backend

✓ remain additive

✓ preserve tenant isolation

✓ preserve RBAC

✓ preserve repository certification

No backend restructuring.

---

# Workstream 1 — Super Admin Core Dashboard

Screen:

SuperAdminDashboardScreen

Purpose:

Platform overview.

Widgets:

---

## Global Metrics Cards

Display:

- Total Schools
- Active Schools
- Pending Applications
- Trial Schools
- Suspended Schools

---

## School Metrics Snapshot

Display:

- Total Students
- Total Teachers
- Total Classes
- Total Active Users

---

## Recent Activity Feed

Display:

- recent approvals
- suspensions
- recoveries
- admin changes

---

# Workstream 2 — School Registry Screen

Screen:

SchoolRegistryScreen

Purpose:

Manage all schools.

Features:

- searchable list
- filters
- status filter
- onboarding filter

Columns:

- school name
- admin
- status
- students
- teachers
- trial expiry

Actions:

- view
- approve
- suspend
- archive
- restore

---

# Workstream 3 — School Application Queue

Screen:

SchoolApplicationQueueScreen

Purpose:

Review self-registrations.

Features:

- pending list
- email verification status
- contact details
- school metadata

Actions:

- approve
- reject
- request clarification

---

# Workstream 4 — School Creation Flow

Screen:

CreateSchoolWizardScreen

Flow:

Step 1:

School details

Step 2:

Admin assignment

Step 3:

Limits setup

Step 4:

Initial status

Step 5:

Confirmation

Supports:

manual onboarding.

---

# Workstream 5 — School Detail Screen

Screen:

SchoolDetailScreen

Purpose:

Read-only school oversight.

Sections:

- school profile
- admin details
- limits
- usage
- activity
- lifecycle state

Actions:

- suspend
- archive
- restore
- change admin
- extend trial

---

# Workstream 6 — Tenant Limits Manager

Screen:

SchoolLimitsScreen

Purpose:

Manage per-school limits.

Editable:

- student limit
- teacher limit
- parent limit
- class limit
- event limit
- storage
- feature flags

Must audit all changes.

---

# Workstream 7 — Trial Manager

Screen:

TrialManagementScreen

Purpose:

Manage trial lifecycle.

Features:

- expiry countdown
- extend trial
- activate school
- suspend on expiry

---

# Workstream 8 — Recovery Request Queue

Screen:

RecoveryRequestScreen

Purpose:

Handle suspended/archived recovery.

Features:

- request list
- reason
- timestamps
- school metadata

Actions:

- approve
- reject

---

# Workstream 9 — Platform Admin RBAC

Screen:

PlatformAdminManagementScreen

Purpose:

Manage internal platform admins.

Supports:

- create platform admin
- assign permissions
- revoke permissions

Permission modules:

- school approval
- school suspension
- recovery
- audit access
- communication
- limits management

---

# Workstream 10 — Audit Center

Screen:

SuperAdminAuditScreen

Purpose:

Trace platform actions.

Filters:

- by school
- by action
- by admin
- by date

Tracks:

- approvals
- suspensions
- archival
- limits
- communication

---

# Workstream 11 — Communication Center

Screen:

PlatformCommunicationScreen

Purpose:

Send:

- welcome emails
- trial reminders
- broadcasts
- maintenance alerts

Channels:

- email
- in-app
- broadcast

---

# Navigation Structure

Super Admin Dashboard
├── School Registry
├── Application Queue
├── Create School
├── Trial Manager
├── Recovery Queue
├── Platform Admins
├── Audit Center
└── Communication Center

---

# Additive Backend Components

New Entities:

- MasterUserEntity
- SchoolApplicationEntity
- SchoolLimitPolicyEntity
- RecoveryRequestEntity
- PlatformAdminPermissionEntity
- SuperAdminAuditEntity

---

New Repositories:

- SuperAdminRepository
- SchoolApplicationRepository
- PlatformAdminRepository
- AuditRepository

---

New Services:

- SchoolOnboardingService
- TrialLifecycleService
- SchoolRecoveryService
- PlatformCommunicationService

---

# UI State Management

Recommended Cubits:

- SuperAdminDashboardCubit
- SchoolRegistryCubit
- SchoolApplicationCubit
- SchoolCreationCubit
- TrialManagementCubit
- RecoveryCubit
- PlatformAdminCubit
- AuditCubit
- CommunicationCubit

---

# Stitch Wireframe Requirements

Must create mockups for:

1. Dashboard
2. School Registry
3. School Detail
4. Application Queue
5. Create School Wizard
6. Limits Screen
7. Trial Manager
8. Recovery Queue
9. Platform Admin Manager
10. Audit Center
11. Communication Center

This becomes the execution reference.

---

# Next Step

Generate:

Phase_3C_Super_Admin_UI_Mockup

using Stitch.

Then refine.

Then execute.