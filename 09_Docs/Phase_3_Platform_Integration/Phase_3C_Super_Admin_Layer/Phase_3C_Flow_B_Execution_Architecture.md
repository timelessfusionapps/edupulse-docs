# Phase_3C_Flow_B_Execution_Architecture.md

# EduPulse
## Phase 3C — Flow B Execution Architecture

Version: 1.0

Status:

APPROVED

Purpose:

Defines the onboarding workflow architecture for schools entering the EduPulse platform.

This flow operationalizes:

school registration
verification
approval
trial provisioning

This is the first live tenant acquisition workflow.

---

# Flow B Scope

Includes:

1. Application Queue
2. Create School Wizard
3. Approval Workflow

This phase is still:

UI + UX stabilization

Not runtime repository binding.

---

# Core Business Flow

School Application Created
↓
Email Verification Sent
↓
Application Queue Review
↓
Approve / Reject
↓
School Tenant Created
↓
Trial Activated
↓
Welcome Email Sent
↓
School Admin Onboarding Starts

---

# Flow B Screens

Must build:

1. Application Queue
2. Create School Wizard

Approval Workflow exists as action system inside Queue.

Not separate screen.

---

# Screen 1 — Application Queue

Purpose:

Review all incoming school applications.

Used by:

Super Admin.

---

# Required Layout

Must inherit Flow A visual system.

Same:

- sidebar
- top bar
- cards
- filters
- tables

No new layout system.

---

## Top Header

Title:

Application Queue

Primary CTA:

+ Create School

Secondary CTA:

Export Queue

---

## Metrics Row

Cards:

- Total Applications
- Pending Review
- Verified Applications
- Rejected Applications
- Approved Applications

---

## Filter Bar

Required:

- Search School
- Status
- Verification Status
- Submitted Date
- Region
- Trial Requested

Reset Filters mandatory.

---

## Queue Table

Columns:

1. School Name
2. Applicant Name
3. School Email
4. Email Verified
5. Submitted Date
6. Status
7. Region
8. Requested Capacity
9. Actions

---

## Actions

Required:

- View
- Approve
- Reject
- Request Clarification
- Archive

Use action menu.

---

## Right Panel

Application Risk Flags

Must show:

- unverified applications
- duplicate school names
- suspicious domains
- incomplete setup data

Operational risk visibility.

---

# Application Detail Drawer

Opens from:

View

Must show:

School Info

Admin Info

Requested Capacity

Region

Contact

Verification Status

Application Timeline

---

# Screen 2 — Create School Wizard

Purpose:

Manual school creation.

Used by:

Super Admin.

This bypasses application queue.

Used for assisted onboarding.

---

# Wizard Type

Guided Wizard

Multi-step.

Mandatory.

---

# Step Structure

---

## Step 1 — School Identity

Fields:

- School Name
- School Type
- Board
- Country
- State
- City
- School Email
- Contact Number

Validation:

School email required.

Personal email discouraged.

---

## Step 2 — Primary Admin Setup

Fields:

- Full Name
- Admin Email
- Mobile Number
- Username
- Password

Must trigger:

verification email.

---

## Step 3 — Capacity Configuration

Fields:

- Max Students
- Max Teachers
- Max Parents
- Max Classes
- Max Houses
- Max Events

Also:

Feature Flags

Toggle list.

---

## Step 4 — Trial Setup

Fields:

- Trial Duration
- Trial Start Date
- Trial End Date

Defaults:

30 days

Manual override allowed.

---

## Step 5 — Review & Confirm

Summary:

School

Admin

Capacity

Trial

Feature Flags

Final actions:

Create School

Save Draft

Cancel

---

# Approval Workflow Rules

Inside Application Queue.

Approve triggers:

1. create tenant
2. create school
3. create primary admin
4. initialize limits
5. initialize trial
6. send welcome email

Reject triggers:

1. rejection reason
2. notification email

Request Clarification triggers:

1. clarification request email
2. status = awaiting_response

---

# Email Workflow

Must support:

Verification Email

Welcome Email

Rejection Email

Clarification Email

Reuse:

notifications package

No new notification logic.

---

# Status Lifecycle

Application statuses:

Pending
Verified
Awaiting Response
Approved
Rejected
Archived

Must use global status color system.

---

# Shared Package Dependencies

Allowed:

package:auth/
package:tenant/
package:schools/
package:notifications/
package:shared_core/
package:shared_ui/

No admin_app imports.

Strict.

---

# Output of Flow B

After Flow B:

EduPulse can onboard demo schools.

This unlocks:

Phase 3D School Admin Experience

because school tenants now exist.

---

# Stop Rule

After Flow B:

STOP.

Do not start Flow C.