# Phase_3C_Flow_A_Core_Control.md

# EduPulse
## Phase 3C — Flow A: Core Control

Version: 1.0

Status:

Approved for Stitch

Depends On:

- Phase_3C_Super_Admin_UI_Design_System.md
- EduPulse_Design_System_V1
- Existing Dashboard System

Purpose:

Defines the primary Super Admin control flow.

Screens:

1. Dashboard
2. School Registry
3. School Detail

This flow establishes the operational control center for EduPulse.

---

# Flow Overview

Super Admin Dashboard
↓
School Registry
↓
School Detail

Primary behavior:

overview → drilldown → inspect

No operational mutation in this flow except approved top-level actions.

---

# Screen 1 — Super Admin Dashboard

Screen ID:

super_admin_dashboard

Purpose:

Platform-wide overview.

Desktop-first.

---

## Layout Structure

Top:

Page Title

Subtitle:

Platform Overview

Right:

Quick Actions

Buttons:

+ Create School

View Applications

Send Broadcast

---

## Section A — Global Metrics Row

5 horizontal cards.

Cards:

1. Total Schools
2. Active Schools
3. Pending Applications
4. Trial Schools
5. Suspended Schools

Each card:

- icon
- value
- delta indicator
- clickable drilldown

Card style:

Standard EduPulse metric cards.

---

## Section B — Platform Scale Snapshot

4 medium cards.

Cards:

- Total Students
- Total Teachers
- Total Classes
- Total Active Users

Purpose:

cross-tenant scale.

---

## Section C — School Status Distribution

Visual:

Horizontal segmented chart

Statuses:

Pending

Onboarding

Trial

Active

Suspended

Archived

Clickable filters.

---

## Section D — Recent Applications

Compact table.

Columns:

School Name

Applicant

Email Verified

Submitted Date

Status

Actions

Actions:

View

Approve

Reject

Max rows:

5

View All link.

---

## Section E — Trial Expiry Alerts

Card list.

Displays:

School Name

Days Remaining

Admin Name

Quick Action:

Extend Trial

Priority badges:

Critical

Warning

Normal

---

## Section F — Recent Platform Activity

Timeline layout.

Shows:

School approved

School suspended

Admin changed

Recovery approved

Limits modified

Visual markers required.

---

## Section G — Quick Actions Panel

Vertical card.

Actions:

Create School

View Pending Applications

Manage Trials

Recovery Requests

Platform Admins

Audit Center

Communication Center

Pinned right side.

---

# UX Rules

Dashboard must feel:

high signal
low clutter
fast actionable

---

# Screen 2 — School Registry

Screen ID:

school_registry

Purpose:

View and manage all schools.

Main data-heavy screen.

---

## Layout Structure

Top:

Page Title

School Registry

Right:

+ Create School

---

## Top Filter Bar

Search field:

Search school name

Filters:

Status

Admin

Trial Status

Created Date

Student Count Range

Reset Filters

---

## Main Table

Columns:

School Name

School Admin

Status

Students

Teachers

Classes

Trial Ends

Created Date

Last Active

Actions

---

## Row Actions

Three-dot menu:

View School

Suspend

Archive

Restore

Change Admin

Extend Trial

View Audit

---

## Status Badge Rules

Pending = Orange

Onboarding = Blue

Trial = Purple

Active = Green

Suspended = Red

Archived = Grey

Must match design system.

---

## Right Side Quick Stats Panel

Optional sticky card.

Displays:

Schools by Status

Total Active

Total Trial

Suspended Count

Pending Count

---

# UX Rules

Registry must prioritize:

speed
filtering
bulk visibility

---

# Screen 3 — School Detail

Screen ID:

school_detail

Purpose:

Read-only tenant oversight.

Deep school inspection.

---

## Layout Structure

Top:

Breadcrumb:

Dashboard > School Registry > School Detail

Title:

School Name

Status Badge

Right Actions:

Suspend

Archive

Restore

Change Admin

Extend Trial

---

## Header Summary Cards

Cards:

Students

Teachers

Classes

Parents

Houses

Active Users

---

## Tab System

Required tabs:

1. Overview
2. Admin
3. Usage
4. Limits
5. Audit
6. Lifecycle

---

# Tab 1 — Overview

Displays:

School Profile

Contact Info

Website

Official Email

Registration Date

Current Status

Trial Status

---

# Tab 2 — Admin

Displays:

Assigned School Admin

Email

Role

Last Login

School Memberships

Admin History

---

# Tab 3 — Usage

Displays:

Student usage

Teacher usage

Login frequency

Feature usage

Event participation count

Recognition count

Leadership count

Read-only metrics.

---

# Tab 4 — Limits

Displays:

Current limits:

Students

Teachers

Parents

Classes

Events

Storage

Feature Flags

Edit button:

Opens modal.

---

# Tab 5 — Audit

Embedded audit table.

Columns:

Action

Performed By

Timestamp

Change Summary

Expandable details.

---

# Tab 6 — Lifecycle

Visual timeline:

Pending
→ Onboarding
→ Trial
→ Active
→ Suspended
→ Archived

Shows timestamps.

Shows transitions.

Shows reasons.

---

# Stitch Instructions

Must generate all 3 screens together.

Maintain:

same sidebar
same spacing
same cards
same tables
same typography
same status badges

Important:

Dashboard → Registry → Detail must feel like one single workflow.

Do not redesign components.

Extend existing EduPulse system.

Desktop-first only.

Prioritize admin efficiency over aesthetics.