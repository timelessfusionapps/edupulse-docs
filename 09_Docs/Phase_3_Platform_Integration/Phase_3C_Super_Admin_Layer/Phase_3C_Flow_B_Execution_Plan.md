# Phase_3C_Flow_B_Execution_Plan.md

# EduPulse
## Phase 3C — Flow B Flutter Execution Plan

Version: 1.0

Status:

FINAL APPROVED

Purpose:

Implement the Super Admin onboarding workflow in Flutter.

This covers:

- Application Queue
- Application Detail Drawer
- Create School Wizard
- Approval Modal Set

This phase converts the approved Flow B Stitch screens into executable Flutter UI.

---

# Dependency Order

Must read before implementation:

1. Phase_3C_Flow_B_Execution_Architecture.md
2. Phase_3C_Flow_B_UI_Specification.md
3. Phase_3C_Flow_B_UI_Refinement.md

Priority:

Refinement file overrides all ambiguity.

---

# Build Location

MUST build only inside:

apps/super_admin_app/

Never inside:

apps/admin_app/

Never inside:

packages/

---

# Feature Structure

Create:

features/onboarding/

Inside:

presentation/
widgets/
models/

---

# Required Screens

Build:

1. ApplicationQueueScreen
2. CreateSchoolWizardScreen

Supporting:

ApplicationDetailDrawer
ApproveApplicationModal
RejectApplicationModal
ClarificationRequestModal

---

# Screen 1 — Application Queue

Create:

features/onboarding/presentation/screens/application_queue_screen.dart

Must implement:

---

## Section A — Metrics Row

Cards:

- Total Applications
- Pending Review
- Verified Applications
- Approved Applications
- Rejected Applications

---

## Section B — Filter Bar

Required:

- Search School
- Status Filter
- Verification Filter
- Submitted Date Filter
- Region Filter
- Trial Requested Filter
- Reset Filters

Sticky behavior required.

---

## Section C — Main Queue Table

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

Actions menu:

- View
- Approve
- Reject
- Request Clarification
- Archive

Mandatory.

---

## Section D — Application Risk Flags

Right panel.

Cards:

- Unverified Applications
- Duplicate School Names
- Suspicious Domains
- Incomplete Setup Data
- High Capacity Requests

---

# Application Detail Drawer

Create:

features/onboarding/presentation/widgets/application_detail_drawer.dart

Sections:

- School Information
- Admin Information
- Requested Capacity
- Location
- Verification Status
- Timeline
- Decision Summary

Actions:

- Approve
- Reject
- Request Clarification

---

# Screen 2 — Create School Wizard

Create:

features/onboarding/presentation/screens/create_school_wizard_screen.dart

Wizard type:

Multi-step

Five-step horizontal stepper

Sticky footer navigation

---

# Step 1 — School Identity

Fields:

- School Name
- School Type
- Board
- Country
- State
- City
- Official Email
- Contact Number

Must include:

Completion progress indicator.

Must include:

Draft status badge.

---

# Step 2 — Primary Admin Setup

Fields:

- Full Name
- Admin Email
- Mobile Number
- Username
- Password
- Confirm Password

Must include:

Verification Email toggle.

---

# Step 3 — Capacity Setup

Fields:

- Max Students
- Max Teachers
- Max Parents
- Max Classes
- Max Houses
- Max Events

Feature Flags:

Card toggles.

Not checkboxes.

---

# Step 4 — Trial Setup

Fields:

- Trial Duration
- Trial Start Date
- Trial End Date

Must include:

Trial Window Summary.

---

# Step 5 — Review & Confirm

Sections:

- School Summary
- Admin Summary
- Capacity Summary
- Feature Flags Summary
- Trial Summary

Actions:

- Create School
- Save Draft
- Cancel

---

# Modal 1 — Approve Application

Create:

features/onboarding/presentation/widgets/approve_application_modal.dart

Fields:

- Trial Duration
- Capacity Override
- Welcome Email Toggle

Must include:

Trial End Preview.

CTA:

Approve & Create

---

# Modal 2 — Reject Application

Create:

features/onboarding/presentation/widgets/reject_application_modal.dart

Fields:

- Rejection Reason
- Send Notification Toggle

Must include:

Severity Warning:

Rejected applications require re-submission.

CTA:

Reject Application

---

# Modal 3 — Clarification Request

Create:

features/onboarding/presentation/widgets/clarification_request_modal.dart

Fields:

- Clarification Message
- Email Preview
- Send Notification Toggle

Template Chips:

- Missing Documents
- Invalid Email
- Capacity Mismatch
- Duplicate School
- Incomplete Setup

CTA:

Send Clarification

---

# Navigation Color Lock

Mandatory:

Selected:

Background:

#4f46e5

Text/Icon:

#ffffff

Inactive:

Text/Icon:

#94a3b8

Hover:

Background:

#334155

Applies to:

Sidebar
Bottom Navigation
Future mobile tabs

Global lock.

---

# Shared Package Rules

Allowed imports only:

package:auth/
package:tenant/
package:schools/
package:notifications/
package:shared_core/
package:shared_ui/

Forbidden:

apps/admin_app/...

Strict.

---

# Theme Rules

Must use:

shared_ui tokens.

No duplicate theme systems.

---

# Routing

Create/update:

core/router/app_router.dart

Routes:

/applications
/create-school

Drawer integration required.

---

# Validation

Run:

flutter pub get

flutter analyze

flutter test

---

# Deliverables

Generate:

1. Phase_3C_Flow_B_UI_Build_Report.md
2. Phase_3C_Flow_B_Routing_Report.md
3. Phase_3C_Flow_B_Test_Report.md
4. Phase_3C_Flow_B_Certification.md

Save under:

09_Docs/Phase_3_Platform_Integration/Phase_3C_Super_Admin_Layer/

---

# Stop Rule

After Flow B implementation:

STOP.

Do not start Flow C.

Do not start Presentation Refactor.

Await review.