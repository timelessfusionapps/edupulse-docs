# Phase_3C_Flow_B_UI_Specification.md

# EduPulse
## Phase 3C — Flow B UI Specification

Version: 1.0

Status:

APPROVED

Purpose:

Defines the exact UI contract for Stitch generation for Flow B.

Flow B includes:

1. Application Queue
2. Create School Wizard
3. Approval Modals

This file extends the Super Admin UI Design System.

No new visual language.

Must inherit:

Flow A visual system.

---

# Base Visual Authority

Must follow:

1. Phase_3C_Super_Admin_UI_Design_System.md
2. Phase_3C_UI_Refinement.md
3. Approved Flow A screens

Visual inheritance mandatory.

Use:

same sidebar
same top bar
same cards
same table density
same filter system
same modals
same spacing

---

# Flow B Screen 1

Application Queue

Screen ID:

application_queue

Purpose:

Manage incoming school applications.

---

# Layout Structure

Same as Dashboard.

Three-zone layout:

Top Header
Main Queue Table
Right Risk Panel

---

# Header

Title:

Application Queue

Subtitle:

Review and process incoming school applications

Actions:

Primary:

+ Create School

Secondary:

Export Queue

---

# Metrics Row

Cards:

Total Applications

Pending Review

Verified Applications

Approved Applications

Rejected Applications

Status colors must follow global system.

---

# Filter Bar

Required:

Search School

Status Filter

Verification Filter

Submitted Date Filter

Region Filter

Trial Requested Filter

Reset Filters

Sticky behavior.

Must inherit Flow A.

---

# Main Queue Table

Columns:

School Name

Applicant Name

School Email

Email Verified

Submitted Date

Status

Region

Requested Capacity

Actions

---

# Status Badges

Pending = Orange

Verified = Blue

Approved = Green

Rejected = Red

Awaiting Response = Purple

Archived = Grey

Locked.

---

# Row Actions Menu

Required:

View

Approve

Reject

Request Clarification

Archive

Use three-dot menu.

---

# Right Side Panel

Panel Title:

Application Risk Flags

Cards:

Unverified Applications

Duplicate School Names

Suspicious Email Domains

Incomplete Setup Data

High Capacity Requests

Purpose:

Operational risk visibility.

---

# Detail Drawer

Opens from:

View

Sections:

School Information

Primary Admin Information

Requested Capacity

Location

Contact

Verification Status

Application Timeline

Documents (future)

No approval actions inside drawer.

Actions remain table-level.

---

# Flow B Screen 2

Create School Wizard

Screen ID:

create_school_wizard

Purpose:

Manual school onboarding.

---

# Wizard Layout

Centered large panel.

Stepper on top.

Five steps.

Must feel guided.

No clutter.

---

# Stepper

Visual:

horizontal

Numbered.

Progressive.

Locked.

Steps:

1. School Identity
2. Primary Admin
3. Capacity Setup
4. Trial Setup
5. Review & Confirm

---

# Step 1 — School Identity

Fields:

School Name

School Type

Board

Country

State

City

School Email

Contact Number

Validation states visible.

Inline errors.

---

# Step 2 — Primary Admin Setup

Fields:

Full Name

Admin Email

Mobile Number

Username

Password

Confirm Password

Verification Email toggle

Required.

---

# Step 3 — Capacity Setup

Fields:

Max Students

Max Teachers

Max Parents

Max Classes

Max Houses

Max Events

Feature Flags

Feature Flags:

toggle cards.

Not checkboxes.

---

# Step 4 — Trial Setup

Fields:

Trial Duration

Trial Start Date

Trial End Date

Default:

30 Days

Manual override allowed.

Visual preview:

Trial Window Summary

---

# Step 5 — Review & Confirm

Summary blocks:

School Info

Admin Info

Capacity

Feature Flags

Trial Setup

Actions:

Create School

Save Draft

Cancel

---

# Footer Navigation

Buttons:

Back

Next

Save Draft

Must persist.

Sticky footer.

---

# Approval Modal 1

Approve Application

Modal ID:

approve_application_modal

Purpose:

Approve school.

Fields:

Trial Duration

Capacity Override

Welcome Email toggle

Final confirmation

Primary CTA:

Approve & Create

---

# Approval Modal 2

Reject Application

Modal ID:

reject_application_modal

Fields:

Rejection Reason

Send Notification toggle

Primary CTA:

Reject Application

---

# Approval Modal 3

Clarification Request

Modal ID:

clarification_request_modal

Fields:

Clarification Message

Email Preview

Send Notification

Primary CTA:

Send Clarification

---

# UX Rules

Flow B must feel:

operational
controlled
high-authority

Not casual.

Must feel:

tenant onboarding system

---

# Stitch Rules

Generate:

1. Application Queue
2. Create School Wizard
3. Approval Modal Set

Do NOT generate Flutter code.

Do NOT implement.

Do NOT create repositories.

Do NOT create ViewModels.

Visual generation only.

Stop after generation.