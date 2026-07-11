Perfect. This is the mandatory stabilization layer before Flow E.

Below is the formal refactor document.

⸻

Phase_3C_Flow_D_Presentation_Refactor.md

# Phase 3C — Flow D Presentation Refactor
## Objective
Perform the final presentation-layer stabilization of Flow D after Flutter implementation.
This refactor is **mandatory** before certification.
This is NOT a redesign.
This is a **presentation correction + behavioral completion pass** to align the Flutter implementation with:
- EduPulse_Global_Design_System.md
- Phase_3C_Flow_D_Execution_Architecture.md
- Phase_3C_Flow_D_UI_Specification.md
- Phase_3C_Flow_D_UI_Refinement.md
Flow D must reach full visual and behavioral parity with the approved Stitch master.
---
# Scope
Only these screens:
1. Platform Admin Registry
2. Invite Platform Admin Modal
3. Role Audit Drawer
4. System Activity Logs
5. Event Details Drawer
6. Access Suspension Control
Do not modify Flows A–C.
Do not start Flow E.
---
# Refactor Layer A — Functional Repairs
---
## A1. Invite Platform Admin CTA (Critical)
### Current Issue
Button is visible but non-functional.
### Required Fix
Bind button to modal trigger.
Required implementation:
```dart
onPressed: () {
  showDialog(
    context: context,
    builder: (_) => const InvitePlatformAdminModal(),
  );
}

Validation

Must open modal instantly.

No routing.

No delayed state.

No empty overlay.

Priority: P0

⸻

A2. Drawer Action Routing

Verify all action menus:

Platform Admin Registry:

* Modify Access
* Suspend Access
* Revoke Permanently

System Activity Logs:

* View Event Details

Must trigger:

* proper drawers
* correct payload
* selected entity injection

Priority: P0

⸻

Refactor Layer B — Data Presentation Recovery

⸻

B1. Platform Admin Registry Metric Cards

Current Issue

Top cards rendering empty.

Must restore:

Card 1:

* Total Admins

Card 2:

* Active

Card 3:

* Suspended

Card 4:

* Pending Invites

Card 5:

* High Activity

Data Source

Create:

PlatformAdminRegistryVM

Fields:

totalAdmins
activeAdmins
suspendedAdmins
pendingInvites
highActivityCount

Priority: P0

⸻

B2. System Activity Logs Metric Cards

Current Issue

Cards empty.

Must restore:

* Total Actions
* High Risk
* Failed
* Suspicious

Data Source

Create:

SystemActivityLogVM

Priority: P0

⸻

Refactor Layer C — Layout Stability

⸻

C1. Role Audit Drawer Overflow Fix

Current Issue

Observed:

* Avatar overlap
* Badge collision
* Vertical text clipping
* Privilege boundaries compressed
* Bottom metrics container undersized

Required Fixes

Identity card:

Lock:

Height: 180px
Padding: 20px
Avatar: 56x56
Gap: 16px

Role cards:

Lock:

Min height: 140px
Padding: 20px
Gap: 16px

Bottom summary:

Convert floating metrics into:

Single unified card.

Structure:

Assignment Risk
2FA Status
Last Transition
Signature Required

Equal spacing.

No floating chips.

Priority: P0

⸻

C2. Drawer Width Lock

Apply globally:

Width: 420px

For:

* Role Audit
* Event Details
* Access Suspension

No flexible widths.

No overflow.

Priority: P1

⸻

Refactor Layer D — ViewModel Extraction

Remove all static fixtures from widgets.

⸻

D1. Required ViewModels

Create:

PlatformAdminRegistryVM
InvitePlatformAdminVM
AdminRoleAuditVM
SystemActivityLogVM
GovernanceRiskPanelVM
AccessSuspensionVM

⸻

D2. Remove hardcoded:

Registry:

Alex Sterling
Samantha Reed
David Chen

Must be list-driven.

⸻

Logs:

Jun 28, 2026...

Must be timestamp-driven.

⸻

Risk Alerts:

Must come from:

GovernanceRiskPanelVM.flags

Priority: P1

⸻

Refactor Layer E — Modal Integrity

⸻

E1. Invite Platform Admin Modal

Validate:

Fields:

* Full Name
* Email Address

Role cards:

* Owner
* Super Admin
* Support Lead

Permission groups:

* School
* Trial
* Capacity
* Communication
* Audit
* Platform

Footer:

* Cancel
* Save Draft
* Send Invite

Behavior:

Role selection updates permission defaults.

Priority: P1

⸻

Refactor Layer F — Final Presentation Polish

⸻

F1. Typography Validation

Lock:

Page Title:

32px / 700

Section Titles:

20px / 600

Card Labels:

14px / 500

Table Body:

14px / 500

Meta text:

12px / 400

⸻

F2. Semantic Colors

Strict:

Active:
#22C55E

Pending:
#F59E0B

Suspended:
#DC2626

High Risk:
#7C3AED

Critical:
#DC2626

Warning:
#F59E0B

Info:
#2563EB

No custom colors allowed.

⸻

Validation Checklist

Must verify:

[ ] Invite Platform Admin button opens modal
[ ] All metric cards populated
[ ] Registry VM connected
[ ] Audit VM connected
[ ] Role Audit drawer stable
[ ] No clipping
[ ] No overflow
[ ] Drawer width locked
[ ] Risk panel dynamic
[ ] Logs dynamic
[ ] Action routing functional
[ ] Modals functional
[ ] No hardcoded UI fixtures

⸻

Deliverables

After execution generate:

1. Phase_3C_Flow_D_Presentation_Refactor_Report.md
2. Phase_3C_Flow_D_Stability_Audit.md
3. Phase_3C_Flow_D_Certification.md

⸻

Certification Rule

Flow D cannot be marked complete until:

* UI parity achieved
* behavior parity achieved
* VM extraction complete
* no visual overflow exists
* all CTA workflows functional

Until then:

Flow E remains blocked.

---
## Execution instructions for Antigravity
Execute in this exact order:
### Step 1 — Functional restoration
Fix:
- Invite Platform Admin button
- drawer actions
- modal invocation
---
### Step 2 — Data restoration
Connect:
- PlatformAdminRegistryVM
- SystemActivityLogVM
- GovernanceRiskPanelVM
Populate all empty cards.
---
### Step 3 — Layout stabilization
Fix:
- Role Audit drawer overflow
- metric container compression
- drawer width lock
---
### Step 4 — Fixture extraction
Remove all hardcoded:
- names
- timestamps
- permissions
- alerts
Replace with VM-driven structures.
---
### Step 5 — Certification pass
Run:
```bash
flutter analyze
flutter test

Then produce:

Phase_3C_Flow_D_Presentation_Refactor_Report.md
Phase_3C_Flow_D_Stability_Audit.md
Phase_3C_Flow_D_Certification.md

After that, we do the final Flow D certification review. Only then we unlock Flow E.