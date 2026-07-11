# Phase_3C_Flow_G_UI_Specification.md

## Phase 3C — Flow G
### Communication & Broadcast Governance Layer

Status: UI Specification  
Mode: Stitch Generation First  
Authority: Phase_3C_Flow_G_Execution_Architecture.md  
Dependencies: Flow B, C, D, E, F

---

# 1. Global Design Authority

Mandatory:

Use:

- EduPulse_Global_Design_System.md
- Phase_3C_Global_UI_Normalization.md

Must inherit:

- Sidebar
- Topbar
- Typography
- Card Accent Rule
- Table Density
- Drawer Width Standard
- Badge System

No deviation.

---

# 2. Visual Tone

Flow G must feel:

- operational
- communication-heavy
- alert-driven
- structured
- scalable

Keywords:

Broadcast  
Notify  
Escalate  
Deliver  
Track  
Confirm

Tone:

Less forensic than Flow E  
Less critical than Flow F  
More orchestration-focused.

---

# 3. Screen Inventory

Flow G contains 6 primary surfaces.

---

# Screen 1 — Broadcast Command Center

Purpose:

Centralized communication orchestration.

---

## Header

Title:

Broadcast Command Center

Subtitle:

Create, schedule, and monitor all platform-wide communication.

Primary CTA:

Create Broadcast

---

## Metrics Row

Cards:

- Active Broadcasts
- Scheduled Broadcasts
- Failed Deliveries
- Draft Messages
- Pending Approvals

All must use semantic left accent bars.

---

## Main Table

Columns:

Broadcast ID  
Title  
Type  
Audience  
Channel  
Scheduled At  
Status  
Actions

Actions:

- Open
- Edit
- Send
- Cancel

---

## Right Rail

Title:

Broadcast Health

Cards:

- Failed Delivery Count
- Queue Backlog
- Channel Downtime
- Retry Queue

---

# Screen 2 — School Announcement Governance

Purpose:

Targeted school communication.

---

## Header

Title:

School Announcement Governance

Subtitle:

Target schools, boards, and regions with structured announcements.

CTA:

Create Announcement

---

## Filters

Horizontal:

- Region
- Board
- Status
- School Type
- Trial/Active

---

## Announcement Queue

Columns:

Announcement ID  
School(s)  
Type  
Channel  
Priority  
Created By  
Status  
Actions

Actions:

- View
- Edit
- Dispatch

---

## Right Panel

Cards:

- Schools Pending Read
- Failed Dispatches
- Retry Queue
- Escalation Pending

---

# Screen 3 — Emergency Alert Engine

Purpose:

Critical alerts.

Highest priority.

---

## Header

Title:

Emergency Alert Engine

Subtitle:

Issue critical emergency communication instantly across the platform.

Danger CTA:

Send Emergency Alert

---

## Active Alerts Panel

Cards:

- Critical Incidents
- Active Lockdowns
- Service Interruptions
- Security Breaches

---

## Emergency Queue

Columns:

Alert ID  
Severity  
Affected Region  
Channel  
Triggered By  
Status  
Actions

Actions:

- View
- Broadcast
- Escalate

---

## Live Delivery Feed

Table:

Timestamp  
Channel  
Delivered  
Failed  
Retries  
Status

---

# Screen 4 — Compliance Notification Engine

Purpose:

Automated reminders.

---

## Header

Title:

Compliance Notification Engine

Subtitle:

Track and dispatch policy, verification, and lifecycle reminders.

CTA:

Create Rule

---

## Rules Table

Columns:

Rule ID  
Trigger  
Audience  
Frequency  
Last Sent  
Next Run  
Status  
Actions

Actions:

- Edit
- Pause
- Run Now

---

## Notification Log

Timeline:

- Sent
- Delivered
- Opened
- Escalated

---

# Screen 5 — Internal Admin Messaging

Purpose:

Platform admin communication.

---

## Header

Title:

Internal Admin Messaging

Subtitle:

Coordinate operational actions across platform admins.

CTA:

New Thread

---

## Layout

Split:

Left:

Thread list.

Right:

Conversation detail.

---

## Thread List

Each item:

- Subject
- Participants
- Last message
- Linked incident (optional)
- Unread count

---

## Conversation Panel

Messages:

- timestamp
- sender
- mentions
- attachments
- linked audit item

Footer:

Reply box  
Mention selector  
Attach button  
Escalate thread

---

# Screen 6 — Delivery Intelligence Center

Purpose:

Communication observability.

---

## Header

Title:

Delivery Intelligence Center

Subtitle:

Track all delivery health and communication success.

CTA:

Export Delivery Report

---

## Metrics Row

Cards:

- Sent
- Delivered
- Opened
- Failed
- Retried

---

## Channel Health Grid

Cards:

- Email
- SMS
- Push
- In-App

Each card:

Status:

Healthy  
Delayed  
Degraded  
Offline

---

## Delivery Table

Columns:

Message ID  
Channel  
Audience  
Sent  
Delivered  
Opened  
Failed  
Retries  
Actions

Actions:

- Retry
- Inspect
- Export

---

# 4. Drawers & Modals

Mandatory.

---

## Broadcast Detail Drawer

Width:

420px

Contains:

- content preview
- audience breakdown
- channel selection
- schedule info
- delivery logs

---

## Emergency Alert Modal

Contains:

- alert type
- severity
- audience
- channel
- confirmation

Danger action.

---

## Compliance Rule Drawer

Contains:

- trigger
- frequency
- audience
- escalation ladder
- pause/resume

---

## Thread Detail Drawer

Contains:

- thread metadata
- linked incidents
- participant roles
- escalation history

---

## Delivery Inspection Drawer

Contains:

- delivery trace
- retries
- failures
- bounce reasons
- read receipts

---

# 5. Badge System

Mandatory.

Draft → Gray  
Scheduled → Blue  
Sent → Indigo  
Delivered → Green  
Failed → Red  
Retrying → Amber  
Escalated → Purple  
Critical → Red

Strict.

---

# 6. Table Standards

Mandatory.

Header Height:

52px

Row Height:

72px

Padding:

24px

Radius:

16px

No shadows.

---

# 7. Drawer Standards

All drawers:

Width:

420px

Fixed.

No responsive variation.

---

# 8. Card Accent Rule

Permanent.

All cards:

4px left accent.

Flush.

Full height.

Semantic.

Mandatory.

---

# 9. Flow Connections

Flow G consumes:

Flow B → onboarding notifications  
Flow C → trial warnings  
Flow D → admin alerts  
Flow E → compliance escalations  
Flow F → incident communication

Must visually reflect upstream dependency.

---

# 10. Stop Rule

Next:

Phase_3C_Flow_G_Stitch_Execution.md

Do not generate Flutter yet.