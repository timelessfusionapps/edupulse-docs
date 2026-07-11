# Phase_3C_Flow_D_Internal_Governance.md

# EduPulse
## Phase 3C — Flow D: Internal Governance

Version: 1.0

Status:

Approved for Stitch Execution

Depends On:

- Phase_3C_Super_Admin_UI_Design_System.md
- Phase_3C_Super_Admin_Architecture.md
- Existing EduPulse Design System

Purpose:

Defines internal platform governance and administrative control.

Screens:

1. Platform Admin Manager
2. Audit Center
3. Communication Center

Primary function:

govern → monitor → communicate

---

# Flow Overview

Platform Admin Manager
↓
Audit Center
↓
Communication Center

This flow governs EduPulse itself.

Not school operations.

Must feel:

secure
traceable
authoritative

---

# Screen 1 — Platform Admin Manager

Screen ID:

platform_admin_manager

Purpose:

Manage internal EduPulse administrators.

Used by:

Owner only.

---

## Layout Structure

Top:

Page Title

Platform Admin Management

Subtitle:

Manage internal administrative roles and permissions

Right:

Actions

Buttons:

+ Add Platform Admin

Permission Templates

---

## Section A — Admin Metrics Row

Cards:

Total Platform Admins

Active Admins

Suspended Admins

Pending Invites

---

## Section B — Platform Admin Table

Columns:

Name

Email

Role

Permission Scope

Status

Last Active

Created By

Actions

---

## Roles

Owner

Platform Admin

Support Admin

Operations Admin

Onboarding Admin

---

## Status Rules

Active = Green

Pending = Orange

Suspended = Red

Inactive = Grey

---

## Row Actions

View Profile

Edit Permissions

Suspend Admin

Revoke Access

View Audit

---

# Permission Drawer

Opens on:

Edit Permissions

Grouped modules:

School Approvals

School Suspension

Recovery Rights

Tenant Limits

Platform Communication

Audit Access

Platform Admin Management

Toggle-based.

Grouped cards.

---

# Invite Flow

Modal:

Name

Email

Role

Permission Template

Custom Permissions

Send Invite

---

# UX Rules

Permissions must feel:

explicit

clear

non-accidental

No hidden escalations.

---

# Screen 2 — Audit Center

Screen ID:

audit_center

Purpose:

Full Super Admin operational audit.

Platform-level only.

---

## Layout Structure

Top:

Page Title

Audit Center

Subtitle:

Track all critical platform actions

Right:

Actions

Buttons:

Export Logs

Advanced Filters

---

## Section A — Audit Metrics Row

Cards:

Total Logs

Today’s Logs

Critical Actions

Pending Reviews

---

## Section B — Filter Bar

Filters:

Action Type

Admin

School

Date Range

Severity

Status

Search by keyword

---

## Section C — Audit Timeline Table

Columns:

Action

Actor

Target

School

Timestamp

Severity

Status

Details

---

## Severity Colors

Critical = Red

Warning = Orange

Info = Blue

Normal = Grey

---

## Expandable Detail View

Shows:

Old Value

New Value

Action Reason

Device

IP (future)

Session ID

Triggered Notifications

---

## Timeline View Toggle

Optional alternate view.

Visual chronological timeline.

For:

approvals

suspensions

restorations

limit changes

admin permission changes

---

# UX Rules

Audit must feel:

forensic

precise

filterable

never cluttered

---

# Screen 3 — Communication Center

Screen ID:

communication_center

Purpose:

Manage platform-wide communication.

Used for:

schools
admins
broadcasts

---

## Layout Structure

Three-column layout.

---

## Left Column — Templates

Sections:

Verification Email

Welcome Email

Trial Reminder

Suspension Notice

Recovery Approval

Broadcast Announcement

Maintenance Alert

Saved Drafts

Template list selectable.

---

## Middle Column — Editor

Rich text editor.

Fields:

Subject

Message Body

Attachments (future)

Variables:

School Name

Admin Name

Trial Date

Status

Preview mode toggle.

---

## Right Column — Audience Selector

Audience options:

All Schools

Trial Schools

Suspended Schools

Pending Schools

Archived Schools

Specific School

Specific Admin

Platform Admins

---

## Channel Selector

Toggles:

Email

In-App Notification

Broadcast

Can combine channels.

---

## Scheduling Options

Send Now

Schedule Later

Save Draft

---

## Recent Communication History

Bottom panel:

Recent sends

Status

Opened

Failed

Queued

---

# Broadcast Preview Modal

Before sending:

Preview full message

Audience count

Confirmation required

---

# UX Rules

Communication must feel:

controlled

professional

deliberate

No accidental broadcasts.

---

# Stitch Execution Rules

Generate all 3 screens together.

Maintain:

same sidebar
same app bar
same spacing
same card hierarchy
same table system
same filters
same modal system

Must connect visually to:

Flow A
Flow B
Flow C

No redesign.

Extend existing EduPulse system only.

Desktop-first.

Priority:

Governance precision over visual complexity.

All actions must feel high-authority.