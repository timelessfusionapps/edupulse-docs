# Phase_3C_UI_Refinement.md

# EduPulse
## Phase 3C — Super Admin UI Refinement Lock

Version: 2.0

Status:

FINAL APPROVED

Purpose:

This document locks the final refined visual rules for Phase 3C Flow A before Flutter implementation.

It supersedes all previous UI refinement versions.

This document now includes:

- Dashboard refinements
- School Registry refinements
- School Detail refinements

This is the final visual authority.

---

# Approved Visual Base

Primary visual anchor:

Super Admin Dashboard

Inherited by:

- School Registry
- School Detail

Visual continuity must remain identical.

Mandatory inheritance:

- sidebar
- app bar
- spacing
- cards
- tables
- filters
- status badges
- quick actions

---

# Refinement 1 — Sidebar Identity Lock

Replace:

District Admin Portal

With:

Platform Control Center

Mandatory across all Phase 3C screens.

---

# Refinement 2 — Primary CTA Lock

Replace:

Issue Award

With:

+ Create School

Mandatory global CTA.

Visible in sidebar.

Used as platform-level creation trigger.

---

# Refinement 3 — Dashboard Quick Actions Lock

Final Quick Actions:

- Create New School
- Review Applications
- Manage Trials
- Recovery Requests

Remove:

- System Settings
- Critical Overrides

---

# Refinement 4 — Dashboard Applications Actions Lock

Applications table actions:

Must include:

- View
- Approve
- Reject

Single eye icon only is prohibited.

Use action menu.

---

# Refinement 5 — Status Color Lock

Global system lock:

Pending = Orange

Onboarding = Blue

Trial = Purple

Active = Green

Suspended = Red

Archived = Grey

Mandatory across all screens.

No exceptions.

---

# Refinement 6 — Dashboard Density Rule

Rule:

High signal.

Low clutter.

Avoid excessive empty space.

Prioritize operational density.

---

# Refinement 7 — School Registry Table Lock

Final columns:

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

No columns may be removed.

---

# Refinement 8 — School Registry Actions Lock

Actions menu must include:

- View School
- Suspend
- Archive
- Restore
- Change Admin
- Extend Trial
- View Audit

Mandatory.

---

# Refinement 9 — School Registry Filter Lock

Required filters:

- Search School
- Status
- School Admin
- Trial Status
- Created Date
- Student Count Range

Reset Filters required.

Must inherit Dashboard filter system.

---

# Refinement 10 — School Registry Right Panel Lock

Replace:

Audit Check

With:

Trial Risk Alerts

Panel must display:

- expiring trials
- suspended schools pending review
- archived schools awaiting recovery

Purpose:

Operational risk visibility.

---

# Refinement 11 — School Detail Header Lock

Required:

Breadcrumb:

Dashboard > School Registry > School Detail

Header:

School Name

Status Badge

Actions:

- Suspend
- Archive
- Change Admin
- Extend Trial

Restore:

Conditional only.

Visible only if:

status == suspended
OR
status == archived

Never visible for active schools.

---

# Refinement 12 — School Detail Summary Cards Lock

Final cards:

- Students
- Teachers
- Classes
- Parents
- Houses
- Active Users

Must remain top-level.

---

# Refinement 13 — School Detail Tabs Lock

Final tabs:

1. Overview
2. Admin
3. Usage
4. Limits
5. Audit
6. Lifecycle

No additions.

No removals.

---

# Refinement 14 — Usage Tab Lock

Do NOT use generic charts only.

Must use operational metric cards:

- Monthly Active Users
- Event Participation Count
- Recognition Count
- Leadership Count
- Parent Login Count

Optional chart:

Activity trend.

Cards are mandatory.

---

# Refinement 15 — Limits Tab Lock

Must explicitly display:

- Max Students
- Max Teachers
- Max Parents
- Max Classes
- Max Houses
- Max Events
- Storage Limit
- Feature Flags

Cards preferred.

Editable controls allowed.

---

# Refinement 16 — Audit Tab Lock

Must contain:

Embedded audit table.

Required columns:

- Action
- Performed By
- Timestamp
- Change Summary

Expandable details allowed.

Mandatory.

---

# Refinement 17 — Lifecycle Timeline Lock

Mandatory visual timeline.

States:

Pending
→ Onboarding
→ Trial
→ Active
→ Suspended
→ Archived

Must show:

- timestamps
- transition labels
- completion state

---

# Refinement 18 — Admin Access Summary Lock

Replace:

Tenant Access Overview

With:

Admin Access Summary

Must show:

- Primary Admin
- Last Login
- Active Sessions
- Access Health

Purpose:

Operational clarity.

---

# Refinement 19 — Flow Continuity Rule

Dashboard
→ Registry
→ Detail

Must feel like:

one continuous SaaS workflow.

No visual drift.

No component drift.

No layout changes.

---

# Refinement 20 — Flutter Implementation Lock

Flutter implementation must match:

1. Approved Stitch visuals
2. Phase_3C_Super_Admin_UI_Design_System.md
3. This refinement file

Priority order:

This file overrides all ambiguity.

This is final implementation authority.