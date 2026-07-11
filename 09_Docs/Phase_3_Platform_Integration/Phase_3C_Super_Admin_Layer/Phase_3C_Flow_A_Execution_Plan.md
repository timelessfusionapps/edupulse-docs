# Phase_3C_Flow_A_Execution_Plan.md

# EduPulse
## Phase 3C — Flow A Flutter Execution Plan

Version: 2.0

Status:

FINAL APPROVED

Purpose:

Implement the first production-ready Super Admin UI layer in Flutter.

This plan converts the approved Stitch Flow A screens into executable Flutter UI.

Scope:

Flow A only.

Includes:

1. Super Admin Dashboard
2. School Registry
3. School Detail

No Flow B.

No Flow C.

No Flow D.

---

# Dependency Order

Must read before implementation:

1. Phase_3C_Super_Admin_UI_Design_System.md
2. Phase_3C_Flow_A_Core_Control.md
3. Phase_3C_UI_Refinement.md

Implementation must obey all 3.

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

# Folder Structure

Create:

apps/super_admin_app/lib/

Structure:

core/
features/

---

# Core Structure

Create:

core/router/
core/theme/
core/di/
core/widgets/

---

# Feature Structure

Create:

features/dashboard/
features/schools/

---

# Screen 1 — Super Admin Dashboard

Create:

features/dashboard/presentation/screens/super_admin_dashboard_screen.dart

Must implement:

---

## Section A — Global Metrics Row

Cards:

- Total Schools
- Active Schools
- Pending Applications
- Trial Schools
- Suspended Schools

---

## Section B — Platform Scale Snapshot

Cards:

- Total Students
- Total Teachers
- Total Classes
- Total Active Users

---

## Section C — Status Distribution

Segmented bar.

Locked colors.

---

## Section D — Recent Applications Table

Columns:

- School Name
- Applicant
- Verified
- Date
- Status
- Actions

Actions:

- View
- Approve
- Reject

---

## Section E — Trial Expiry Alerts

Right panel.

---

## Section F — Activity Feed

Timeline.

---

## Section G — Quick Actions Panel

Final actions:

- Create New School
- Review Applications
- Manage Trials
- Recovery Requests

---

# Screen 2 — School Registry

Create:

features/schools/presentation/screens/school_registry_screen.dart

Must implement:

---

## Top Header

Title:

School Registry

CTA:

+ Create School

---

## Filters

Required:

- Search School
- Status
- School Admin
- Trial Status
- Created Date
- Student Count Range
- Reset Filters

---

## Main Registry Table

Locked columns:

1. School Name
2. School Admin
3. Status
4. Students
5. Teachers
6. Classes
7. Trial Ends
8. Created Date
9. Last Active
10. Actions

---

## Actions Menu

Must include:

- View School
- Suspend
- Archive
- Restore
- Change Admin
- Extend Trial
- View Audit

---

## Right Panel

Trial Risk Alerts

Not Audit Check.

---

# Screen 3 — School Detail

Create:

features/schools/presentation/screens/school_detail_screen.dart

Must implement:

---

## Header

Breadcrumb:

Dashboard > School Registry > School Detail

School Name

Status Badge

Actions:

- Suspend
- Archive
- Change Admin
- Extend Trial

Conditional:

Restore

Only when:

suspended OR archived

---

## Summary Cards

Locked:

- Students
- Teachers
- Classes
- Parents
- Houses
- Active Users

---

## Tabs

Locked:

1. Overview
2. Admin
3. Usage
4. Limits
5. Audit
6. Lifecycle

---

## Usage Tab

Must contain:

- Monthly Active Users
- Event Participation
- Recognition Count
- Leadership Count
- Parent Login Count

Optional:

Activity chart.

---

## Limits Tab

Must contain:

- Max Students
- Max Teachers
- Max Parents
- Max Classes
- Max Houses
- Max Events
- Storage Limit
- Feature Flags

---

## Audit Tab

Embedded table.

Required columns:

- Action
- Performed By
- Timestamp
- Change Summary

---

## Lifecycle Tab

Visual timeline:

Pending
→ Onboarding
→ Trial
→ Active
→ Suspended
→ Archived

---

## Admin Access Summary

Must replace:

Tenant Access Overview

Required:

- Primary Admin
- Last Login
- Active Sessions
- Access Health

---

# Shared Package Rules

Allowed imports only:

package:auth/
package:tenant/
package:rbac/
package:schools/
package:notifications/
package:shared_core/
package:shared_ui/

Forbidden:

apps/admin_app/...

Strictly prohibited.

---

# Theme Rules

Must use:

shared_ui theme tokens.

Do not duplicate theme system.

Do not create alternate colors.

---

# Routing

Create:

core/router/app_router.dart

Routes:

/dashboard
/schools
/schools/:id

---

# Dependency Injection

Create:

core/di/service_locator.dart

Register:

repositories only.

Reuse package services.

No duplicated business logic.

---

# Validation

Run:

flutter pub get

flutter analyze

flutter test

---

# Deliverables

Generate:

1. Phase_3C_Flow_A_UI_Build_Report.md
2. Phase_3C_Flow_A_Routing_Report.md
3. Phase_3C_Flow_A_DI_Report.md
4. Phase_3C_Flow_A_Test_Report.md
5. Phase_3C_Flow_A_Certification.md

Save under:

09_Docs/Phase_3_Platform_Integration/Phase_3C_Super_Admin_Layer/

---

# Stop Rule

After Flow A implementation:

STOP.

Do not start Flow B.

Await review.