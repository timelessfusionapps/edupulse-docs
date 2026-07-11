# Phase_3C_Flow_C_Operations.md

# EduPulse
## Phase 3C — Flow C: Operations

Version: 1.0

Status:

Approved for Stitch Execution

Depends On:

- Phase_3C_Super_Admin_UI_Design_System.md
- Phase_3C_Super_Admin_Architecture.md
- Existing EduPulse Design System

Purpose:

Defines the operational control workflows for active school lifecycle management.

Screens:

1. Tenant Limits Manager
2. Trial Manager
3. Recovery Queue

Primary function:

maintain → regulate → restore

---

# Flow Overview

School Detail
↓
Limits Management
↓
Trial Management
↓
Recovery Queue

Operational control flow.

These screens are lifecycle sensitive.

Must prioritize:

clarity
traceability
safety

---

# Screen 1 — Tenant Limits Manager

Screen ID:

tenant_limits_manager

Purpose:

Manage per-school resource limits.

---

## Layout Structure

Top:

Page Title

Tenant Limits

Subtitle:

Configure operational capacity for each school

Right:

Actions

Buttons:

Save Changes

Reset Defaults

---

## School Selector

Top sticky selector.

Dropdown:

Search School

Select active tenant.

Displays:

School Name

Current Status

Current Plan

Trial Status

---

## Section A — Core Resource Limits

Card grid.

Fields:

Max Students

Max Teachers

Max Parents

Max Classes

Max Houses

Max Events

Storage Limit

Each field:

number input

helper text

current usage indicator

Example:

Students:

320 / 500

Progress bar inline.

---

## Section B — Feature Access Toggles

Toggle cards.

Features:

Recognition

Leadership

Events

Contribution Engine

House Impact

Parent Dashboard

Exports

Notifications

Audit Access

Each:

Enabled / Disabled

---

## Section C — Trial Configuration

Fields:

Trial Duration

Trial Override Days

Auto Suspend Toggle

Grace Period

Warning Notifications Toggle

---

## Section D — Limit Change Audit Summary

Compact audit list.

Shows:

Field Changed

Old Value

New Value

Changed By

Timestamp

Last 5 changes.

View Full Audit link.

---

# Save Flow

On save:

Confirmation modal:

Apply new limits?

Requires:

Reason field

Mandatory.

---

# UX Rules

Changes must feel:

deliberate

auditable

non-accidental

---

# Screen 2 — Trial Manager

Screen ID:

trial_manager

Purpose:

Manage active school trial lifecycle.

---

## Layout Structure

Top:

Page Title

Trial Management

Right:

Quick Actions

Buttons:

Extend Trial

Activate School

Suspend Trial

---

## Section A — Trial Summary Cards

Cards:

Total Trial Schools

Expiring in 7 Days

Expired Trials

Converted to Active

---

## Section B — Trial Schools Table

Columns:

School Name

School Admin

Trial Start

Trial End

Days Remaining

Status

Auto Suspend

Actions

---

## Status Colors

Trial Active = Purple

Expiring Soon = Orange

Expired = Red

Converted = Green

---

## Row Actions

View

Extend Trial

Activate

Suspend

Send Reminder

---

## Section C — Expiry Timeline

Visual calendar/timeline.

Shows:

Upcoming expiries

Grouped by week.

---

## Section D — Trial Alerts

Priority cards:

Critical:

1–3 days

Warning:

4–7 days

Normal:

8+ days

---

# Extend Trial Modal

Fields:

Extra Days

Reason

Notify School Toggle

Requires audit log.

---

# Activate School Flow

Confirmation modal.

Converts:

Trial → Active

Triggers:

Welcome email

Status notification

---

# UX Rules

Trial operations must be:

simple

fast

explicit

---

# Screen 3 — Recovery Queue

Screen ID:

recovery_queue

Purpose:

Handle school restoration requests.

For:

Suspended
Archived

---

## Layout Structure

Top:

Page Title

Recovery Requests

Subtitle:

Pending restoration approvals

Right:

Quick Actions

Buttons:

View Archived Schools

Broadcast Recovery Policy

---

## Section A — Recovery Metrics

Cards:

Pending Requests

Approved Today

Rejected Today

Archived Schools

---

## Section B — Recovery Request Table

Columns:

School Name

Current Status

Requested By

Request Date

Reason

Last Active

Priority

Actions

---

## Priority Rules

Critical = Red

Normal = Blue

Low = Grey

---

## Row Actions

View Request

Approve Recovery

Reject Recovery

View Audit History

---

# Recovery Detail Drawer

Sections:

School Summary

Reason for Recovery

Archived/Suspended Cause

Last Activity Snapshot

Admin Details

Previous Trial Status

Usage History

Audit Summary

---

## Actions

Approve Recovery

Reject Recovery

Request Clarification

---

# Approve Recovery Flow

Confirmation modal:

Restore school?

Options:

Restore as:

Trial

Active

Onboarding

Optional:

Extend trial

Notify admin

---

# Reject Recovery Flow

Fields:

Reason

Notify school

---

# UX Rules

Recovery should feel:

formal

clear

safe

No auto-restores.

---

# Stitch Execution Rules

Generate all 3 screens together.

Maintain:

same sidebar
same app bar
same cards
same table hierarchy
same filters
same modal patterns

Must visually connect to:

Flow A Core Control

Flow B Onboarding

Do not redesign EduPulse.

Only extend existing design system.

Desktop-first only.

Focus:

Operational governance over aesthetics.