# Phase_3C_Flow_F_UI_Specification.md

## Phase 3C — Flow F  
### Recovery & Incident Response Layer

Status: UI Specification  
Mode: Stitch Generation First  
Authority: Phase_3C_Flow_F_Execution_Architecture.md  
Dependencies: Flow E

---

# 1. Global Design Authority

Mandatory:

Use:

EduPulse_Global_Design_System.md

And:

Phase_3C_Global_UI_Normalization.md

Must inherit:

- Sidebar
- Topbar
- Typography
- Card Accent Rule
- Table Density
- Drawer Width Standard
- Semantic Badge System

No deviation.

---

# 2. Visual Tone

Flow F must feel:

- heavier than Flow E
- operationally critical
- urgent
- controlled
- highly structured

Keywords:

Recovery  
Containment  
Restoration  
Escalation  
Rollback  
Verification

Visual tone:

Less analytical.

More action-driven.

---

# 3. Screen Inventory

Flow F contains 6 major surfaces.

---

# Screen 1 — Recovery Requests Center

Purpose:

Primary intake queue.

---

## Header

Title:

Recovery Requests Center

Subtitle:

Review, approve, and execute restoration requests across the platform.

Primary CTA:

Create Recovery Request

---

## Metrics Row

4 cards:

- Pending Recoveries
- Critical Recoveries
- Rollbacks Waiting
- Active Restorations

All with semantic accent bars.

---

## Main Table

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

## Right Panel

Title:

Recovery Risk Summary

Cards:

- High Severity Recoveries
- Dependency Conflicts
- Locked Resources
- Verification Pending

---

# Screen 2 — Incident Resolution Pipeline

Purpose:

Track live incidents.

---

## Header

Title:

Incident Resolution Pipeline

Subtitle:

Track and manage active incidents through their recovery lifecycle.

CTA:

Create Incident Case

---

## Pipeline View

Horizontal stage tracker:

Pending  
Validated  
Assigned  
Investigating  
Recovery  
Verification  
Resolved  
Archived

Each stage shows:

count badge.

---

## Incident Cards

Each card shows:

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

# Screen 3 — Rollback Approval Center

Purpose:

Approve critical reversals.

---

## Header

Title:

Rollback Approval Center

Subtitle:

Authorize high-risk reversals before restoration.

---

## Approval Queue Table

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

## Approval Matrix Panel

Shows:

Low → Auto  
Medium → Admin  
High → Super Admin  
Critical → Owner

Visual:

vertical decision tree.

---

# Screen 4 — Emergency Lockdown Control

Purpose:

Immediate containment.

Critical visual surface.

---

## Header

Title:

Emergency Lockdown Control

Subtitle:

Freeze active systems to contain high-risk incidents.

Danger CTA:

Initiate Global Lockdown

Red.

---

## Lock Targets Grid

Cards:

- Schools
- Admin Accounts
- Trial Engine
- Billing Engine
- Communication Engine
- API Access

Each card:

Status:

Unlocked / Soft Locked / Hard Locked

Actions:

- Soft Lock
- Hard Lock
- Release Lock

---

## Global Status Panel

Shows:

- Total Locked Systems
- Critical Active Locks
- Pending Releases

---

# Screen 5 — Restoration Timeline

Purpose:

Visual incident history.

---

## Header

Title:

Restoration Timeline

Subtitle:

Track every action performed during recovery execution.

---

## Timeline View

Vertical.

Stages:

Incident Detected  
Review Opened  
Approval Granted  
Rollback Executed  
Restore Completed  
Integrity Verified  
Closed

Each timeline node:

timestamp  
actor  
resource  
action

---

## Recovery Payload Drawer

Local drawer.

420px.

Shows:

- before snapshot
- after snapshot
- restore source
- operator notes

---

# Screen 6 — Integrity Verification Center

Purpose:

Post-recovery system verification.

Critical.

---

## Header

Title:

Integrity Verification Center

Subtitle:

Validate restored systems and confirm operational consistency.

CTA:

Run Verification Scan

---

## Verification Metrics

Cards:

- Passed Checks
- Failed Checks
- Orphaned Records
- Mismatch Flags

---

## Verification Table

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

## Integrity Risk Panel

Cards:

- Missing Links
- Billing Mismatches
- Permission Drift
- Data Loss Risk

---

# 4. Drawers & Modals

Flow F requires:

---

## Recovery Request Review Drawer

Width:

420px

Contains:

- request summary
- affected resources
- severity
- dependency graph
- actions

---

## Rollback Approval Modal

Contains:

- rollback summary
- impact preview
- affected entities
- approval notes

Actions:

Approve / Reject

---

## Lockdown Confirmation Modal

Contains:

- target
- lock type
- impact scope
- operator reason

Critical red action.

---

## Integrity Report Drawer

Contains:

- validation results
- failed checks
- dependency chain
- recommended fixes

---

# 5. Badge System

Mandatory:

Pending → Amber  
Approved → Blue  
Recovery Active → Indigo  
Resolved → Green  
Rejected → Red  
Locked → Red  
Critical → Violet

Strict.

---

# 6. Table Standards

Mandatory:

Header Height:

52px

Row Height:

72px

Padding:

24px

Radius:

16px

No shadows.

---

# 7. Drawer Standards

All drawers:

Width:

420px

Fixed.

No responsive variation.

---

# 8. Card Accent Rule

Permanent.

All cards:

4px left accent.

Flush.

Full height.

Semantic.

Mandatory.

---

# 9. Stop Rule

Next:

Phase_3C_Flow_F_Stitch_Execution.md

Do not generate Flutter yet.