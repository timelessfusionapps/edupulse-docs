# Phase_3C_Flow_C_UI_Specification.md

# EduPulse
## Phase 3C — Flow C UI Specification

Version: 1.0

Status:

APPROVED

Purpose:

Defines the exact Stitch-ready UI contract for Flow C.

Flow C includes:

1. Trial Manager
2. Limits Screen
3. Recovery Queue

This extends the existing Super Admin design system.

No new visual language.

Must inherit:

Flow A + Flow B.

---

# Base Visual Authority

Must follow:

1. Phase_3C_Super_Admin_UI_Design_System.md
2. Phase_3C_UI_Refinement.md
3. Phase_3C_Flow_B_UI_Refinement.md

Visual inheritance mandatory.

Same:

sidebar
top bar
cards
filters
tables
drawers
status badges
spacing
modal system

Strict continuity.

---

# Global Navigation Color Lock

Mandatory.

Selected:

Background:

#4f46e5

Text/Icon:

#ffffff

Inactive:

Text/Icon:

#94a3b8

Hover:

Background:

#334155

Applies to:

Sidebar
Bottom Navigation
Future mobile tabs

Locked.

---

# Stitch Utility Governance

Must use:

---

## Skill 1 — Enhance Prompt

Required.

Must optimize:

Flow C architecture
UI specification
future refinements

before stitch generation.

Mandatory.

---

## Skill 2 — Stitch Loop

Required.

Generate all Flow C screens in one continuity pass.

Do not generate separately.

Mandatory.

---

# Flow C Screen 1

Trial Manager

Screen ID:

trial_manager

Purpose:

Manage active and expiring trials.

---

# Layout Structure

Same as Flow A / B.

Three-zone layout:

Top Header
Main Trial Table
Right Risk Panel

---

# Header

Title:

Trial Manager

Subtitle:

Track, extend, and convert active school trials

Actions:

Primary:

Extend Trial

Secondary:

Export Trials

---

# Metrics Row

Cards:

Active Trials

Expiring in 7 Days

Expired Trials

Converted Schools

Trial Extensions

---

# Filter Bar

Required:

Search School

Trial Status

End Date

Region

School Size

Conversion Status

Reset Filters

Sticky.

Mandatory.

---

# Main Trial Table

Columns:

School Name

Trial Start

Trial End

Days Remaining

Status

Current Plan

Capacity Used

Actions

---

# Status Badges

Active = Green

Expiring Soon = Orange

Expired = Red

Converted = Blue

Extended = Purple

Locked.

---

# Actions Menu

Required:

View School

Extend Trial

Convert to Paid

Suspend

Archive

---

# Right Side Panel

Panel Title:

Trial Risk Alerts

Cards:

Expiring in 3 Days

Expired Without Action

Over Capacity Trials

Inactive Trial Schools

Purpose:

Immediate operational risk.

---

# Trial Detail Drawer

Sections:

School Overview

Trial Timeline

Usage Snapshot

Capacity Snapshot

Conversion Readiness

Actions:

Extend Trial

Convert to Paid

Suspend

---

# Flow C Screen 2

Limits Screen

Screen ID:

resource_limits

Purpose:

Monitor and adjust tenant limits.

---

# Layout Structure

Same as previous.

---

# Header

Title:

Resource Limits

Subtitle:

Control school resource allocations

Actions:

Primary:

Adjust Limits

Secondary:

Bulk Export

---

# Metrics Row

Cards:

Total Capacity Allocated

Capacity Utilized

Over-Limit Schools

Near-Limit Schools

Available Capacity

---

# Filter Bar

Required:

Search School

Resource Type

Limit Status

Region

Usage %

Reset Filters

Sticky.

---

# Main Limits Table

Columns:

School Name

Students

Teachers

Parents

Classes

Houses

Events

Storage

Usage %

Actions

---

# Status Badges

Healthy = Green

Near Limit = Orange

Over Limit = Red

Critical = Purple

Locked.

---

# Actions Menu

Required:

View Limits

Increase Limits

Reduce Limits

Suspend

---

# Right Side Panel

Panel Title:

Capacity Alerts

Cards:

Student Overload

Storage Critical

Event Limit Reached

Parent Capacity Full

---

# Limits Detail Drawer

Sections:

Current Allocation

Current Usage

Growth Rate

Upgrade Recommendation

Actions:

Adjust Limits

Save Changes

---

# Flow C Screen 3

Recovery Queue

Screen ID:

recovery_queue

Purpose:

Manage suspended and archived school restoration.

---

# Layout Structure

Same as Flow A / B.

---

# Header

Title:

Recovery Queue

Subtitle:

Review and process school restoration requests

Actions:

Primary:

Review Requests

Secondary:

Export Queue

---

# Metrics Row

Cards:

Pending Recoveries

Approved Recoveries

Rejected Recoveries

Restored Schools

High Risk Recoveries

---

# Filter Bar

Required:

Search School

Recovery Status

Suspension Reason

Submitted Date

Region

Reset Filters

Sticky.

---

# Main Recovery Table

Columns:

School Name

Previous Status

Suspension Reason

Recovery Requested

Submitted Date

Risk Level

Status

Actions

---

# Status Badges

Pending = Orange

Approved = Green

Rejected = Red

Restored = Blue

High Risk = Purple

Locked.

---

# Actions Menu

Required:

View Request

Approve Recovery

Reject Recovery

Restore School

---

# Right Side Panel

Panel Title:

Recovery Risk Flags

Cards:

Unpaid Schools

Repeated Violations

Suspicious Recoveries

Incomplete Appeals

---

# Recovery Detail Drawer

Sections:

School Summary

Suspension History

Recovery Reason

Audit History

Risk Assessment

Actions:

Approve

Reject

Restore

---

# UX Rules

Flow C must feel:

operational
critical
controlled
high-authority

This is the active operations layer.

Not onboarding.

Not setup.

Must feel:

platform lifecycle control.

---

# Stitch Rules

Generate:

1. Trial Manager
2. Limits Screen
3. Recovery Queue

Use:

Enhance Prompt
→ Stitch Loop

Mandatory.

Do NOT generate Flutter.

Do NOT implement.

Do NOT create repositories.

Do NOT create ViewModels.

Visual generation only.

Stop after generation.