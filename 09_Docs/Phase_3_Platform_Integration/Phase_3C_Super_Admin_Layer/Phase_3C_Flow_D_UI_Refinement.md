# Phase_3C_Flow_D_UI_Refinement.md

## Objective

Perform a strict UI refinement and normalization pass on **Flow D (Platform Governance)** using the finalized `EduPulse_Global_Design_System.md`.

This is **not a redesign**.

This is a precision refinement pass to resolve visual inconsistencies, strengthen governance hierarchy, normalize component behavior, and prepare the screens for exact Flutter replication.

Antigravity must use:

- **Loop Skill Set** → for iterative correction until the visual output matches all specifications.
- **Stitch Enhance Prompt Skill**  
https://github.com/google-labs-code/stitch-skills/blob/main/plugins/stitch-utilities/skills/enhance-prompt

Enhance prompts using:

- enterprise governance UI
- security dashboard UI
- forensic audit dashboard
- role access matrix
- admin control center
- system authority management
- privilege escalation controls
- risk intelligence panels

---

# Global Refinement Rules

## 1. Global Design Lock (Mandatory)

Strictly follow:

`EduPulse_Global_Design_System.md`

No deviations.

Lock:

### Sidebar
- Width: `240px`
- Background: `#0F172A`
- Active item:
  - Background: `#4F46E5`
  - Text/Icon: `#FFFFFF`
- Inactive:
  - Text/Icon: `#94A3B8`
- Hover:
  - Background: `#334155`

---

## 2. Topbar Standardization (All Flow D)

Every Flow D screen must use identical topbar layout.

### Left:
Search Input

### Right:
Notifications
Help
System Status
Profile

Remove inconsistent variants:
- Support text
- Standalone profile-only bars
- Partial icon groups

Topbar must remain globally identical.

---

## 3. Button Standardization

All buttons:

Height: `44px`

Primary:
- Fill: `#4F46E5`
- Text: White

Secondary:
- Border: `#CBD5E1`
- Background: White

Danger:
- Border/Text: `#DC2626`

Critical:
- Fill: `#DC2626`
- Text: White

---

## 4. Drawer Naming Normalization

Replace generic:

"System Details"

with contextual names.

### Registry:
Admin Details

### Activity Logs:
Event Details

### Permission Matrix:
Permission Audit

### Role Assignment:
Role Audit

### Access Suspension:
Access Suspension Control

Subtitles must also match context.

---

# Screen-Specific Refinements

---

# 1. Platform Admin Registry

## Metric Card Compression

Reduce height.

Current:
~160px

Target:
`120px`

Reason:
Improve information density.

---

## Governance Panel Expansion

Increase width.

Current:
~260px

Target:
`300–320px`

Reason:
Reduce content compression.

---

## Drawer Action Hierarchy

Current:
- Modify Access
- Revoke All

Replace with:

Primary:
Modify Access

Danger:
Suspend Access

Critical:
Revoke Permanently

This must align with Suspension flow.

---

# 2. Invite Platform Admin Modal

## Permission Group Visual Differentiation

Keep neutral cards.

Only tint icon containers.

Use:

Audit → `#EEF2FF`

Platform → `#FEF2F2`

Trial → `#FFFBEB`

School → `#ECFDF5`

Capacity → `#F8FAFC`

Communication → `#F1F5F9`

Do not tint entire card.

Only icon container.

Purpose:
Faster category scanning.

---

# 3. System Permission Matrix

## Checkbox Alignment Lock

All matrix cells must be vertically and horizontally centered.

No drift.

Strict grid alignment.

---

## Admin Override Column Risk Elevation

Current:
Purple

Replace:

Background:
`#FEF2F2`

Text:
`#DC2626`

Reason:
This is destructive privilege.

Must visually communicate danger.

---

## Recent Changes Expansion

Increase entries.

Current:
1–2

Target:
3–5 minimum

Purpose:
Prevent underfilled panels.

---

# 4. System Activity Logs

## Metric Card Border Normalization

Current:
Some cards use thicker semantic borders.

Normalize:

Use left border accent only.

No heavy border containers.

Consistent with global alert cards.

---

## Table Density Optimization

Reduce row height.

Current:
~88px

Target:
`72px`

Purpose:
Enterprise audit density.

---

## JSON Panel Typography

Use monospace typography.

Preferred:
- JetBrains Mono
or
- IBM Plex Mono

Reason:
Audit readability.

---

# 5. Role Assignment Detail

## Left Identity Card Compression

Reduce vertical padding.

Current too tall.

Keep same content.

More compact.

---

## Bottom Metrics Strip Wrapping

Current:
Floating metrics

Wrap into one shared container:

Contains:
- Current Assignment Risk
- 2FA Status
- Last Transition
- Signature Requirement

Unified card surface.

Reason:
Increase cohesion.

---

# 6. Access Suspension Control

## Drawer Header Correction

Current:
System Details

Replace:

Title:
Access Suspension Control

Subtitle:
Administrative Identity Lockdown

Reason:
Critical action context.

---

## Action Priority Lock

Order:

Primary:
Suspend Access

Secondary:
Reinstate

Critical:
Revoke Permanently

Must remain fixed.

---

# Global Semantic Badge Normalization

Lock statuses.

Active:
Green

Pending:
Amber

Suspended:
Red

Reviewing:
Blue

Escalated:
Purple

Critical:
Red solid

No random badge colors.

Use global semantic map only.

---

# Final Verification Checklist

Antigravity must verify:

- Sidebar is identical across all Flow D screens
- Topbar is identical across all Flow D screens
- Button heights are 44px everywhere
- Drawer naming is contextual
- Card heights are normalized
- Table density matches design system
- Badge colors follow semantic mapping
- Governance risk panels have proper width
- Matrix alignment is precise
- JSON uses monospace
- Alert cards use semantic surfaces only
- No screen drifts from global design system

---

# Output Requirement

Regenerate refined Stitch screens only.

Do not generate code.

Do not modify architecture.

Do not create Flutter widgets.

Only perform visual normalization and governance hierarchy refinement.

Stop after all Flow D refined screens are complete.