# Phase_3C_Flow_F_Stitch_Execution.md

## Phase 3C — Flow F  
### Recovery & Incident Response Layer  
Execution Mode: Stitch Generation Only  
Project: **EduPulse Phase 3C**

Status: Ready for Execution

---

# 1. Execution Objective

Generate the complete **Flow F Recovery & Incident Response Layer** inside the existing Stitch project:

```text
EduPulse Phase 3C
```

Important:

Do NOT create a new Stitch project.

All Flow F screens must live inside the same master Phase 3C project.

This maintains:

- visual continuity
- component reuse
- shell consistency
- flow inheritance

---

# 2. Mandatory Authority Documents

Load and obey:

1. `EduPulse_Global_Design_System.md`
2. `Phase_3C_Global_UI_Normalization.md`
3. `Phase_3C_Flow_F_Execution_Architecture.md`
4. `Phase_3C_Flow_F_UI_Specification.md`

These are absolute.

No improvisation.

No redesign.

No alternate layouts.

---

# 3. Permanent Global Rules

Apply these globally.

Mandatory.

---

## Sidebar

Width:

240px

Background:

#0F172A

States:

Active:

Background → #4F46E5  
Text/Icon → #FFFFFF

Inactive:

Text/Icon → #94A3B8

Hover:

#334155

---

## Topbar

Permanent.

Must contain:

Left:

- Global Search

Right:

- Notifications
- Help
- System Status
- Profile

Forbidden:

- CTA buttons
- workflow buttons
- export buttons
- lock buttons

All CTAs must remain below page titles.

---

# 4. Permanent Card Accent Rule

Mandatory.

Every card must contain:

Left accent bar:

Width:

4px

Full height

Flush aligned

Embedded into card

Never floating.

Applies to:

- metrics
- recovery cards
- incident cards
- rollback cards
- lockdown cards
- verification cards
- risk cards
- timeline cards

---

## Semantic Color Mapping

Primary → #4F46E5  
Pending → #F59E0B  
Recovery Active → #6366F1  
Resolved → #22C55E  
Rejected → #DC2626  
Critical → #7C3AED  
Locked → #DC2626

Strict.

---

# 5. Card Standards

Background:

#FFFFFF

Border:

#E2E8F0

Radius:

16px

Shadow:

none

Padding:

20px

Gap:

16px

Section Gap:

32px

Page Padding:

24px

Mandatory.

---

# 6. Typography Lock

Font:

Inter

Page Title:

32px / 700

Section:

20px / 600

Card Title:

14px / 500

Table:

14px / 500

Meta:

12px / 400

Mandatory.

---

# 7. Screen Generation Order

Generate in this exact order.

---

# SCREEN 1 — Recovery Requests Center

Purpose:

Main intake queue.

Generate:

---

Header:

Title:

Recovery Requests Center

Subtitle:

Review, approve, and execute restoration requests across the platform.

Primary CTA:

Create Recovery Request

---

Metrics:

4 cards:

- Pending Recoveries
- Critical Recoveries
- Rollbacks Waiting
- Active Restorations

---

Main Table:

Columns:

Request ID  
Source  
Resource Type  
Severity  
Requested By  
Created At  
Status  
Actions

Actions:

- Review
- Approve
- Reject

---

Right Panel:

Recovery Risk Summary

Cards:

- High Severity Recoveries
- Dependency Conflicts
- Locked Resources
- Verification Pending

---

# SCREEN 2 — Incident Resolution Pipeline

Purpose:

Track live incidents.

Generate:

---

Header:

Title:

Incident Resolution Pipeline

Subtitle:

Track and manage active incidents through their recovery lifecycle.

CTA:

Create Incident Case

---

Pipeline stages:

Pending  
Validated  
Assigned  
Investigating  
Recovery  
Verification  
Resolved  
Archived

---

Incident cards:

Fields:

- Incident ID
- Severity
- Owner
- Resource
- Time Active
- SLA Status

Actions:

- Open Case
- Escalate
- Lock Resource

---

# SCREEN 3 — Rollback Approval Center

Purpose:

High-risk reversals.

Generate:

---

Header:

Title:

Rollback Approval Center

Subtitle:

Authorize high-risk reversals before restoration.

---

Approval Table:

Columns:

Rollback ID  
Target Resource  
Rollback Type  
Risk Level  
Requested By  
Approval Level  
Status  
Actions

Actions:

- Approve
- Reject
- Inspect

---

Approval Matrix Panel:

Visual:

Decision tree

Low → Auto  
Medium → Admin  
High → Super Admin  
Critical → Owner

---

# SCREEN 4 — Emergency Lockdown Control

Purpose:

Containment layer.

Generate:

---

Header:

Title:

Emergency Lockdown Control

Subtitle:

Freeze active systems to contain high-risk incidents.

Danger CTA:

Initiate Global Lockdown

---

Lock Grid:

Cards:

- Schools
- Admin Accounts
- Trial Engine
- Billing Engine
- Communication Engine
- API Access

States:

Unlocked  
Soft Locked  
Hard Locked

Actions:

- Soft Lock
- Hard Lock
- Release Lock

---

Global Status Panel:

- Total Locked Systems
- Critical Active Locks
- Pending Releases

---

# SCREEN 5 — Restoration Timeline

Purpose:

Recovery history.

Generate:

---

Header:

Title:

Restoration Timeline

Subtitle:

Track every action performed during recovery execution.

---

Vertical Timeline:

Stages:

Incident Detected  
Review Opened  
Approval Granted  
Rollback Executed  
Restore Completed  
Integrity Verified  
Closed

Each node:

- timestamp
- actor
- action
- resource

---

Local Drawer:

Recovery Payload Drawer

Width:

420px

Contains:

- before snapshot
- after snapshot
- restore source
- operator notes

---

# SCREEN 6 — Integrity Verification Center

Purpose:

Post-recovery validation.

Generate:

---

Header:

Title:

Integrity Verification Center

Subtitle:

Validate restored systems and confirm operational consistency.

Primary CTA:

Run Verification Scan

---

Metrics:

4 cards:

- Passed Checks
- Failed Checks
- Orphaned Records
- Mismatch Flags

---

Verification Table:

Columns:

Check ID  
Module  
Type  
Status  
Affected Resource  
Severity  
Action

Actions:

- Resolve
- Retry
- Escalate

---

Right Panel:

Integrity Risk Summary

Cards:

- Missing Links
- Billing Mismatches
- Permission Drift
- Data Loss Risk

---

# 8. Drawers & Modals

Generate:

---

Recovery Request Review Drawer

Width:

420px

Contains:

- summary
- affected resources
- dependencies
- severity
- actions

---

Rollback Approval Modal

Contains:

- rollback summary
- impact preview
- approval notes

Actions:

Approve / Reject

---

Lockdown Confirmation Modal

Contains:

- target
- lock type
- impact scope
- operator reason

Critical red action.

---

Integrity Report Drawer

Width:

420px

Contains:

- validation report
- failed checks
- affected dependencies
- recovery recommendations

---

# 9. Execution Rules

Generate all 6 screens in a single continuity pass.

Do not break:

- shell continuity
- card system
- spacing system
- typography
- badge semantics
- timeline patterns

Flow F must feel like:

Flow E + operational action layer.

Heavier.

Urgent.

Controlled.

---

# 10. Deliverables

After generation:

Generate:

- `Phase_3C_Flow_F_Stitch_Report.md`
- `Phase_3C_Flow_F_Visual_Audit.md`
- `Phase_3C_Flow_F_Certification.md`

Stop after Stitch generation.

Do NOT generate Flutter code.