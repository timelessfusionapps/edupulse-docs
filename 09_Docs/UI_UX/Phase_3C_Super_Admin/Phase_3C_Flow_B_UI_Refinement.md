# Phase_3C_Flow_B_UI_Refinement.md

# EduPulse
## Phase 3C — Flow B UI Refinement Lock

Version: 1.0

Status:

FINAL REFINEMENT PASS

Purpose:

Locks the final refinements required for Flow B before Flutter implementation.

This document must be applied through:

1. Stitch Enhance Prompt Skill
2. Stitch Loop Skill

This is mandatory.

No manual raw Stitch prompting.

---

# Stitch Utility Governance

Flow B must use:

---

## Skill 1 — Enhance Prompt

Purpose:

Transform architecture and UI specifications into Stitch-optimized prompts.

Required.

Use before:

stitch-loop

Pipeline:

Architecture
→ UI Spec
→ Refinement
→ Enhance Prompt
→ Stitch Loop

Mandatory.

---

## Skill 2 — Stitch Loop

Purpose:

Generate all connected Flow B screens in one continuity pass.

Required.

Must generate:

- Application Queue
- Application Detail Drawer
- Create School Wizard
- Approval Modal
- Reject Modal
- Clarification Modal

Single flow generation only.

Do not generate separately.

Mandatory.

---

# Global Navigation Color Lock

This becomes global Phase 3 governance.

Applies to:

Sidebar

Bottom Navigation

Future mobile tabs

Locked.

---

# Navigation Item Colors

---

## Selected (Active) State

Background:

#4f46e5

(Indigo 600)

Use:

active item container

Text/Icon:

#ffffff

(White)

Mandatory.

---

## De-selected (Inactive) State

Text/Icon:

#94a3b8

(Slate 400)

Use:

inactive items

Mandatory.

---

## Hover State

Background:

#334155

(Slate 700)

Use:

hover feedback

Only for inactive items.

Mandatory.

---

# Flow B Refinements

---

# Refinement 1 — Sidebar Continuity Lock

Must inherit Flow A exactly.

Replace:

Control Center

With:

Platform Control Center

Mandatory.

No alternate naming.

---

# Refinement 2 — Create School CTA Lock

Sidebar CTA must always be:

+ Create School

Replace:

New Award

Mandatory.

Global.

---

# Refinement 3 — Application Queue Columns Lock

Final columns:

1. School Name
2. Applicant Name
3. School Email
4. Email Verified
5. Submitted Date
6. Status
7. Region
8. Requested Capacity
9. Actions

No missing columns.

Locked.

---

# Refinement 4 — Application Status Separation Lock

Application Queue statuses only:

Pending

Verified

Awaiting Response

Approved

Rejected

Archived

Forbidden:

Trial

Onboarding

Active

Suspended

These belong to school lifecycle only.

Strict separation.

---

# Refinement 5 — Detail Drawer Decision Summary Lock

Add:

Decision Summary section.

Must show:

Trial Duration

Requested Capacity

Feature Flags

Expected Tenant Tier

Purpose:

Fast decision clarity.

Mandatory.

---

# Refinement 6 — Detail Drawer Clarification CTA Lock

Add:

Request Clarification

alongside:

Approve

Reject

Mandatory.

---

# Refinement 7 — Wizard Sidebar Continuity Lock

Wizard must use:

exact Flow A / Flow B sidebar.

Forbidden:

Analytics

Houses

Rewards

These are wrong context.

Must match:

Super Admin navigation.

Strict.

---

# Refinement 8 — Wizard Step Descriptor Lock

Add secondary helper text under each step.

Example:

School Identity
(Basic Information)

Primary Admin
(Account Owner)

Capacity Setup
(Resource Limits)

Trial Setup
(Access Window)

Review & Confirm
(Final Validation)

Recommended.

---

# Refinement 9 — Wizard Draft Status Lock

Top-right status badge required.

Possible states:

Draft Saved

Unsaved Changes

Auto-saving

Mandatory.

---

# Refinement 10 — Wizard Completion Progress Lock

Show:

completion indicator.

Example:

2/8 Required Fields Complete

Mandatory.

Improves completion behavior.

---

# Refinement 11 — Clarification Modal Template Chips Lock

Add quick chips:

Missing Documents

Invalid Email

Capacity Mismatch

Duplicate School Found

Incomplete Setup Data

Clickable.

Mandatory.

---

# Refinement 12 — Reject Modal Severity Lock

Add warning:

Rejected applications cannot re-enter queue without re-submission.

Mandatory.

Operational clarity.

---

# Refinement 13 — Approve Modal Trial Preview Lock

Add visual block:

Trial Ends:
[date]

Must calculate preview.

Example:

Trial Ends: 14 Feb 2026

Mandatory.

---

# Final Flow B Lock

After applying these refinements:

Flow B becomes:

Flutter-ready.

No more Stitch redesign.

This becomes final visual authority for Flow B.