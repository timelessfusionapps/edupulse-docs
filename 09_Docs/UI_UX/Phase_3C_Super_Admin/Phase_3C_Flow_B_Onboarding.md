# Phase_3C_Flow_B_Onboarding.md

# EduPulse
## Phase 3C — Flow B: Onboarding

Version: 1.0

Status:

Approved for Stitch Execution

Depends On:

- Phase_3C_Super_Admin_UI_Design_System.md
- Phase_3C_Super_Admin_Architecture.md
- Existing EduPulse Design System

Purpose:

Defines the onboarding workflow for school acquisition and activation.

Screens:

1. Application Queue
2. Create School Wizard

This flow controls the first touchpoint between schools and EduPulse.

---

# Flow Overview

School Application Queue
↓
Review Application
↓
Approve / Reject
↓
Create School Wizard
↓
Tenant Activation
↓
Onboarding Begins

Primary behavior:

review → approve → configure → activate

---

# Screen 1 — School Application Queue

Screen ID:

school_application_queue

Purpose:

Review incoming self-registration requests.

Main operational queue.

---

## Layout Structure

Top:

Page Title

School Applications

Subtitle:

Pending school onboarding requests

Right:

Quick Actions

Buttons:

+ Create School

Broadcast Message

---

## Section A — Application Metrics Row

4 cards.

Cards:

1. Total Pending Applications
2. Approved Today
3. Rejected Today
4. Email Verification Pending

Purpose:

queue visibility.

---

## Section B — Application Table

Main table.

Columns:

School Name

Applicant Name

Official School Email

Email Verified

Contact Number

Website

Submitted Date

Status

Actions

---

## Status Rules

Pending = Orange

Email Verified = Green Badge

Email Pending = Yellow Badge

Approved = Blue Badge

Rejected = Red Badge

---

## Row Actions

Three-dot menu:

View Application

Approve

Reject

Request Clarification

View Verification Status

---

## Row Quick Action Buttons

Visible inline:

Approve

Reject

For faster processing.

---

# Application Detail Drawer

Opens from:

View Application

Drawer sections:

---

## School Information

School Name

Contact Number

Official Email

Website

Address

---

## Applicant Information

Applicant Name

Applicant Email

Phone

Role Requested

---

## Verification Status

Email Verification:

Verified / Pending

Verification Timestamp

Verification Attempts

---

## Internal Notes

Super Admin notes.

Textarea.

---

## Actions

Approve

Reject

Request Clarification

---

# UX Rules

Approval must be:

Fast

Explicit

Traceable

Approval always requires confirmation modal.

---

# Screen 2 — Create School Wizard

Screen ID:

create_school_wizard

Purpose:

Manual school creation OR finalization after approval.

Primary onboarding configurator.

Multi-step wizard.

---

## Layout Structure

Top:

Page Title

Create School

Progress Bar

Step Indicator

Example:

Step 1 of 5

---

# Step 1 — School Information

Fields:

School Name

Official Email

Website (optional)

Contact Number

Address

School Type

Country

Timezone

Academic Calendar Type

Buttons:

Save Draft

Next

---

# Step 2 — School Admin Assignment

Options:

Option A:

Assign Applicant as School Admin

Option B:

Assign Existing User

Option C:

Create New School Admin

Fields:

Name

Email

Phone

Role

Temporary Password

---

# Step 3 — Tenant Limits Setup

Fields:

Max Students

Max Teachers

Max Parents

Max Classes

Max Houses

Max Events

Storage Limit

Trial Duration

Feature Flags

UI:

Cards + toggles.

---

# Step 4 — Tenant Status Setup

Fields:

Initial Status

Options:

Onboarding

Trial

Active

Recommended default:

Onboarding

---

## Trial Settings

Trial Start Date

Trial End Date

Auto Suspend Toggle

---

# Step 5 — Review & Confirm

Summary screen.

Sections:

School Summary

Admin Summary

Limits Summary

Status Summary

Warnings

Confirmation Checkbox:

I confirm tenant creation.

Buttons:

Back

Create School

---

# Success Screen

After creation:

Success illustration

Message:

School Created Successfully

Actions:

View School

Go to Registry

Send Welcome Email

Start Guided Onboarding

---

# Stitch Execution Rules

Generate both screens together.

Maintain:

same sidebar
same app bar
same table system
same wizard system
same card system
same status badges

Must feel connected to:

Flow A Core Control

Do not redesign.

Extend EduPulse system only.

Desktop-first.

Priority:

Speed + clarity + operational safety.

This flow must feel like:

a SaaS onboarding control center.