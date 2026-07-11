# Phase_3C_Flow_D_Execution_Architecture.md

# EduPulse
## Phase 3C — Flow D Execution Architecture

Version: 1.0

Status:

APPROVED

Purpose:

Defines the internal governance architecture for managing platform administrators.

This flow controls:

- Platform Admin Registry
- Platform Admin Onboarding
- Role Assignment
- Permission Matrix
- Access Suspension
- Activity Monitoring

This is the governance layer of the Super Admin platform.

---

# Core Governance Principle

Owner (Master Control)
↓
Platform Admins
↓
Scoped Roles
↓
Scoped Permissions
↓
Activity Tracking
↓
Suspension / Revocation

Only the Owner has unrestricted authority.

Platform Admins operate within assigned scopes.

Mandatory.

---

# Flow D Scope

Includes:

1. Platform Admin Registry
2. Invite Platform Admin
3. Role Assignment
4. Permission Matrix
5. Activity Logs
6. Access Suspension

---

# Existing Package Reuse

Flow D must reuse:

package:auth/
package:rbac/
package:tenant/
package:notifications/
package:shared_core/
package:shared_ui/

Mandatory.

No duplicate auth systems.

No duplicate role systems.

No local RBAC recreation.

Strict.

---

# Role Hierarchy

Level 1:

Owner

Capabilities:

Full platform access.

Immutable.

Cannot be suspended.

Cannot be edited.

---

Level 2:

Platform Admin

Capabilities:

Depends on assigned roles.

Can be suspended.

Can be edited.

Can be revoked.

---

# Core Permission Groups

Permissions are grouped.

---

## School Governance

Permissions:

- create_school
- approve_school
- suspend_school
- archive_school
- recover_school

---

## Trial Governance

Permissions:

- extend_trial
- convert_trial
- suspend_trial

---

## Capacity Governance

Permissions:

- adjust_limits
- increase_capacity
- reduce_capacity

---

## Communication Governance

Permissions:

- send_broadcast
- send_school_notice
- send_admin_notice

---

## Audit Governance

Permissions:

- view_audit_logs
- export_audit_logs

---

## Platform Governance

Permissions:

- invite_admin
- edit_admin
- suspend_admin
- revoke_admin

Restricted.

Owner only by default.

---

# Screen 1 — Platform Admin Registry

Purpose:

View and manage all platform admins.

---

# Sections

Metrics Row:

- Total Platform Admins
- Active Admins
- Suspended Admins
- Pending Invites
- High Activity Admins

---

Filter Bar:

- Search Admin
- Role Filter
- Status Filter
- Last Active Filter

---

Main Table:

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

Actions:

- View Profile
- Edit Role
- Edit Permissions
- Suspend Access
- Revoke Access

---

Right Panel:

Risk Flags:

- Inactive Admins
- Suspicious Activity
- Excessive Access Changes
- Pending Invites

---

# Screen 2 — Invite Platform Admin

Purpose:

Add new internal operators.

---

Form Sections:

- Full Name
- Email
- Role Assignment
- Initial Permission Groups
- Notes

Actions:

- Send Invite
- Save Draft

---

Invitation Flow:

Invite Sent
↓
Email Accepted
↓
Password Setup
↓
Access Activated

---

# Screen 3 — Role Assignment

Purpose:

Assign operational scope.

---

Sections:

- Current Role
- Available Roles
- Scope Summary
- Risk Summary

Actions:

- Save Role
- Reset

---

# Screen 4 — Permission Matrix

Purpose:

Control granular access.

---

Matrix Layout:

Rows:

Permission groups

Columns:

Allow / Deny

Grouped by:

School
Trial
Capacity
Communication
Audit
Platform

---

Actions:

- Save Permissions
- Reset Defaults

---

# Screen 5 — Activity Logs

Purpose:

Track platform admin actions.

---

Table:

Columns:

1. Admin
2. Action
3. Resource
4. Timestamp
5. Severity
6. Outcome

Filters:

- Admin
- Action Type
- Severity
- Date

---

Right Panel:

Activity Risk Alerts:

- Excessive Actions
- Repeated Failures
- High-risk Actions
- Unauthorized Attempts

---

# Screen 6 — Access Suspension

Purpose:

Temporarily suspend or permanently revoke admin access.

---

Sections:

- Admin Summary
- Suspension Reason
- Audit Summary
- Risk Assessment

Actions:

- Suspend
- Reinstate
- Revoke Permanently

---

# Data Ownership Rules

Owner controls:

All platform admins.

Platform admins do not control other admins unless granted.

Owner overrides all.

Mandatory.

---

# Audit Requirements

Every Flow D action must be auditable.

Required for:

- role change
- permission change
- suspension
- reinstatement
- revoke

Mandatory.

Flow E will consume this.

---

# Output of Flow D

After Flow D:

Platform governance becomes operational.

This unlocks:

Flow E — Audit Center

because governance actions now exist.

---

# Stop Rule

After architecture:

STOP.

Next:

Phase_3C_Flow_D_UI_Specification.md