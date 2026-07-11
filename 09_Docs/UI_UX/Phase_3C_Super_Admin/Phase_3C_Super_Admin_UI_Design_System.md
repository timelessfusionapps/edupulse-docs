# Phase_3C_Super_Admin_UI_Design_System.md

# EduPulse
## Phase 3C — Super Admin UI Design System

Version: 1.0

Status:

Approved

Depends On:

- EduPulse_Design_System_V1
- Existing Dashboard UI System
- Existing Student Management UI System

Purpose:

Extend the existing EduPulse design system into the Super Admin experience layer.

This document defines:

- layout structure
- component rules
- visual hierarchy
- interaction patterns
- screen consistency rules

This document is the design source for all Stitch wireframes in Phase 3C.

---

# 1. Design Philosophy

Super Admin is:

NOT school-facing.

It is:

Platform-facing.

This means the UI must feel:

- more operational
- more analytical
- more administrative
- less classroom-oriented

Visual identity must remain EduPulse.

But hierarchy must feel:

SaaS Control Panel.

---

# 2. Layout Structure

Phase 3C follows:

Desktop-first.

Primary structure:

Sidebar Layout

Top App Bar

Content Grid

Structure:

Left Sidebar (fixed)
Top Header
Scrollable Content Area

Standard spacing:

24px outer padding

16px internal spacing

32px section spacing

---

# 3. Navigation System

Sidebar sections:

Dashboard

Schools

Applications

Trials

Recovery Requests

Platform Admins

Audit Center

Communication

Settings

Sidebar behavior:

Collapsible

Active route highlight

Notification badges

Status indicators

---

# 4. Color System

Must inherit existing EduPulse colors.

Additional status colors:

Pending:

Orange

Onboarding:

Blue

Trial:

Purple

Active:

Green

Suspended:

Red

Archived:

Grey

Status badges must use:

Soft background
Strong text contrast

Never full solid fills.

---

# 5. Typography Rules

Use existing EduPulse typography.

Hierarchy:

Page Title:

Largest

Section Title:

Medium Bold

Card Title:

Semi Bold

Body:

Regular

Table Data:

Compact Regular

Meta Text:

Muted

Audit Logs:

Monospace optional

---

# 6. Card System

Used heavily.

Standard cards:

Metrics Card

School Summary Card

Trial Status Card

Admin Activity Card

Recovery Request Card

Rules:

Rounded corners

Soft shadow

Minimal border

Consistent padding

Hover state enabled

---

# 7. Table System

Super Admin is table-heavy.

Used in:

School Registry

Applications

Audit Logs

Recovery Queue

Platform Admins

Standard table columns:

Sortable

Filterable

Searchable

Sticky header

Row click enabled

Status badge inline

Action menu right aligned

---

# 8. Action System

Primary actions:

Solid buttons

Examples:

Approve
Create School
Restore
Save

Secondary actions:

Outlined buttons

Examples:

View
Edit
Extend Trial

Danger actions:

Red only

Examples:

Suspend
Archive
Delete

Dropdown actions:

Three-dot menu

Used in tables

---

# 9. Filter System

Must remain consistent.

Used in:

Registry
Audit
Applications
Trials

Standard filters:

Status

Date

School

Admin

Activity Type

Use top horizontal filter bar.

---

# 10. Wizard System

Used for:

Create School

Multi-step onboarding.

Pattern:

Step Indicator Top

Single Form Per Step

Progress Bar

Back / Next buttons

Save Draft option

Final Review Screen

---

# 11. Modal Rules

Used for:

Approval

Suspension

Archive

Recovery Approval

Admin Permission Edit

Rules:

Compact

Clear CTA

Explicit warnings

Danger actions isolated

---

# 12. Notification Pattern

Top-right bell.

Displays:

Pending applications

Recovery requests

Trial expiry alerts

Platform announcements

Unread counts mandatory.

---

# 13. Dashboard Composition

Super Admin Dashboard structure:

Section 1:

Platform Metrics Row

Section 2:

School Status Overview

Section 3:

Recent Applications

Section 4:

Trial Expiry Alerts

Section 5:

Recent Activity Feed

Section 6:

Quick Actions

---

# 14. School Registry Composition

Top:

Search + Filters

Middle:

School Data Table

Right:

Quick Stats Panel (optional)

Actions:

View

Suspend

Archive

Restore

Change Admin

---

# 15. School Detail Composition

Tabs:

Overview

Admin

Usage

Limits

Audit

Lifecycle

Read-only emphasis.

Actions pinned at top-right.

---

# 16. Audit Center Composition

Layout:

Search

Filters

Timeline Table

Expandable log detail

Visual timeline markers

Important for compliance.

---

# 17. Communication Center Composition

Split layout:

Left:

Templates

Middle:

Message editor

Right:

Audience selector

Supports:

Email

In-app

Broadcast

---

# 18. Platform Admin Management Composition

Table + Permissions Drawer

View:

Admin list

Role

Permissions

Status

Drawer:

Permission toggles

Grouped by module

---

# 19. UX Rules

Super Admin actions must always feel:

Safe

Traceable

Explicit

No silent destructive actions.

All dangerous actions require confirmation.

---

# 20. Stitch Execution Rules

Stitch must follow:

- Existing EduPulse component system
- Existing spacing system
- Existing card hierarchy
- Existing table patterns
- Existing button styles

Do not redesign EduPulse.

Only extend it.

All Phase 3C screens must visually feel part of the same platform.

---

# Next Step

Generate 4 Flow Packs:

1. Core Control
2. Onboarding
3. Operations
4. Internal Governance

These become Stitch prompts.