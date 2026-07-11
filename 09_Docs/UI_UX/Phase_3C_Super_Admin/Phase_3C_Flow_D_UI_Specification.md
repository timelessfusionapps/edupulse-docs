# Phase_3C_Flow_D_UI_Specification.md

# EduPulse
## Phase 3C — Flow D UI Specification

Version: 1.0

Status:

APPROVED

Purpose:

Defines the Stitch-ready UI specification for Flow D.

Flow D governs:

1. Platform Admin Registry
2. Invite Platform Admin
3. Role Assignment
4. Permission Matrix
5. Activity Logs
6. Access Suspension

This is the internal governance layer.

---

# Authority Order

Read in exact order:

1. EduPulse_Global_Design_System.md
2. Phase_3C_Flow_D_Execution_Architecture.md
3. Phase_3C_Flow_D_UI_Specification.md

Mandatory.

Global Design System is highest visual authority.

---

# Stitch Utility Rules

Must use:

1. Enhance Prompt Skill
2. Stitch Loop Skill

Mandatory.

Generate all screens in one continuity pass.

Do not generate separately.

---

# Visual Tone

Flow D must feel:

- secure
- authoritative
- permission-driven
- audit-heavy
- risk-aware

This is NOT school management.

This is platform governance.

UI must reflect higher stakes.

---

# Screen 1 — Platform Admin Registry

Screen ID:

platform_admin_registry

Purpose:

View and manage internal operators.

---

# Layout

Three-zone layout:

Top Header
Main Table
Right Risk Panel

Same visual continuity as Flow A/B/C.

---

# Header

Title:

Platform Admin Registry

Subtitle:

Manage platform operators and governance roles

Actions:

Primary:

Invite Platform Admin

Secondary:

Export Registry

---

# Metrics Row

Cards:

- Total Platform Admins
- Active Admins
- Suspended Admins
- Pending Invites
- High Activity Admins

---

# Filter Bar

Required:

- Search Admin
- Role Filter
- Status Filter
- Last Active Filter
- Permission Group Filter

Sticky.

Mandatory.

---

# Main Table

Columns:

1. Admin Name
2. Email
3. Role
4. Status
5. Permissions Count
6. Last Active
7. Activity Score
8. Actions

---

# Status Badges

Active = Green

Suspended = Red

Pending Invite = Orange

Owner = Indigo

High Risk = Violet

Mandatory.

---

# Actions Menu

Required:

- View Profile
- Edit Role
- Edit Permissions
- Suspend Access
- Revoke Access

---

# Right Panel

Panel Title:

Governance Risk Flags

Cards:

- Inactive Admins
- Suspicious Activity
- Excessive Role Changes
- Pending Invites

Mandatory.

---

# Screen 2 — Invite Platform Admin

Screen ID:

invite_platform_admin

Purpose:

Invite internal operators.

---

# Layout

Form-centered.

Same width system as Create School Wizard.

---

# Form Sections

Section 1:

Admin Identity

Fields:

- Full Name
- Email
- Contact Number

---

Section 2:

Role Assignment

Fields:

- Role Selector
- Scope Summary

---

Section 3:

Initial Permission Groups

Toggle cards:

- School Governance
- Trial Governance
- Capacity Governance
- Communication Governance
- Audit Governance
- Platform Governance

Not checkboxes.

Card toggles.

Mandatory.

---

Section 4:

Notes

Textarea.

---

# Footer Actions

Primary:

Send Invite

Secondary:

Save Draft

Tertiary:

Cancel

---

# Screen 3 — Role Assignment

Screen ID:

role_assignment

Purpose:

Assign role hierarchy.

---

# Layout

Split layout.

Left:

Current Role Summary

Right:

Available Roles

Bottom:

Risk Summary

---

# Actions

Primary:

Save Role

Secondary:

Reset

---

# Screen 4 — Permission Matrix

Screen ID:

permission_matrix

Purpose:

Control granular permissions.

---

# Layout

Matrix table.

Rows:

Permission Groups

Columns:

Allow
Deny

Grouped by:

School
Trial
Capacity
Communication
Audit
Platform

---

# Additional Panel

Right Panel:

Permission Risk Summary

Cards:

- Owner-only permissions
- High-risk permissions
- Recently changed permissions

Mandatory.

---

# Footer Actions

Primary:

Save Permissions

Secondary:

Reset Defaults

---

# Screen 5 — Activity Logs

Screen ID:

activity_logs

Purpose:

Audit internal admin activity.

---

# Header

Title:

Activity Logs

Subtitle:

Track all governance actions

Actions:

Primary:

Export Logs

---

# Metrics Row

Cards:

- Total Actions
- High-risk Actions
- Failed Actions
- Suspicious Attempts
- Unauthorized Access

---

# Filters

Required:

- Admin
- Action Type
- Severity
- Date Range

Sticky.

---

# Main Table

Columns:

1. Admin
2. Action
3. Resource
4. Timestamp
5. Severity
6. Outcome

---

# Severity Colors

Low = Blue

Medium = Amber

High = Red

Critical = Violet

Mandatory.

---

# Right Panel

Panel Title:

Risk Intelligence

Cards:

- Excessive Actions
- Repeated Failures
- High-risk Access
- Unauthorized Attempts

---

# Screen 6 — Access Suspension

Screen ID:

access_suspension

Purpose:

Suspend or revoke platform operators.

---

# Layout

Drawer-based.

Same detail drawer pattern as Flow C.

---

# Sections

- Admin Summary
- Current Role
- Suspension Reason
- Audit Summary
- Risk Assessment

---

# Footer Actions

Primary:

Suspend Access

Secondary:

Reinstate Access

Danger:

Revoke Permanently

---

# UX Rules

Flow D must emphasize:

permission clarity

role hierarchy

risk visibility

ownership boundaries

audit traceability

Must feel stricter than Flow C.

---

# Global UI Rules

Must follow:

- Dark sidebar
- Standardized tables
- Standardized metrics cards
- Standardized drawers
- Standardized CTA hierarchy
- Standardized alert cards

Inherited from normalized Phase 3C.

No drift allowed.

---

# Stitch Output Rules

Generate only visuals.

Do NOT:

- generate Flutter
- create repositories
- create ViewModels
- connect RBAC logic
- create backend contracts

Visual generation only.

Stop after generation.