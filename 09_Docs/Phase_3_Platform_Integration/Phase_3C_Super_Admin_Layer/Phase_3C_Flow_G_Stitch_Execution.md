# Phase_3C_Flow_G_Stitch_Execution.md

## Phase 3C — Flow G
### Communication & Broadcast Governance Layer

Execution Mode: Stitch Generation Only  
Project: EduPulse Phase 3C  
Status: Ready for Execution

---

# 1. Execution Objective

Generate the complete Flow G Communication Layer inside:

EduPulse Phase 3C

Important:

Do NOT create a new Stitch project.

All Flow G screens must be created inside the existing Phase 3C Stitch project.

This preserves:

- visual continuity
- shell consistency
- shared components
- flow inheritance

---

# 2. Mandatory Authority Documents

Load and obey:

1. EduPulse_Global_Design_System.md
2. Phase_3C_Global_UI_Normalization.md
3. Phase_3C_Flow_G_Execution_Architecture.md
4. Phase_3C_Flow_G_UI_Specification.md

These are absolute.

No improvisation.

---

# 3. Navigation Placement Rule

Flow G is a top-level module.

Create:

Communications

Sidebar placement:

Dashboard  
Schools  
Applications  
Trials  
Platform Admins  
Audit Center  
Recovery Center  
Communications  
Settings

Do NOT nest under any previous flow.

Mandatory.

---

# 4. Permanent Global Rules

Apply globally.

---

## Sidebar

Width:

240px

Background:

#0F172A

States:

Active → #4F46E5  
Inactive → #94A3B8  
Hover → #334155

---

## Topbar

Permanent:

Left:

- Global Search

Right:

- Notifications
- Help
- System Status
- Profile

No CTA buttons inside topbar.

---

## Card Accent Rule

Every card:

4px left semantic accent

Mandatory.

Applies to:

- metrics
- broadcast cards
- alert cards
- delivery cards
- compliance cards
- message cards

---

# 5. Card Standards

Background:

#FFFFFF

Border:

#E2E8F0

Radius:

16px

Shadow:

none

Padding:

20px

Gap:

16px

Page Padding:

24px

Section Gap:

32px

Mandatory.

---

# 6. Typography Lock

Inter

Page Titles:

32px / 700

Section:

20px / 600

Card Title:

14px / 500

Table:

14px / 500

Meta:

12px / 400

Mandatory.

---

# 7. Screen Generation Order

Generate in exact order.

---

# SCREEN 1 — Broadcast Command Center

Generate:

Header:
- Title
- Subtitle
- Create Broadcast CTA

Metrics:
- Active Broadcasts
- Scheduled Broadcasts
- Failed Deliveries
- Draft Messages
- Pending Approvals

Main Table:
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

Right Rail:
Broadcast Health

Cards:
- Failed Delivery Count
- Queue Backlog
- Channel Downtime
- Retry Queue

---

# SCREEN 2 — School Announcement Governance

Generate:

Header:
- Title
- Subtitle
- Create Announcement CTA

Filters:
- Region
- Board
- Status
- School Type
- Trial/Active

Queue Table:
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

Right Rail:
- Schools Pending Read
- Failed Dispatches
- Retry Queue
- Escalation Pending

---

# SCREEN 3 — Emergency Alert Engine

Critical screen.

Generate:

Header:
- Title
- Subtitle
- Send Emergency Alert CTA

Alert Panel:
- Critical Incidents
- Active Lockdowns
- Service Interruptions
- Security Breaches

Queue Table:
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

Live Delivery Feed:
Timestamp  
Channel  
Delivered  
Failed  
Retries  
Status

---

# SCREEN 4 — Compliance Notification Engine

Generate:

Header:
- Title
- Subtitle
- Create Rule CTA

Rules Table:
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

Timeline:
- Sent
- Delivered
- Opened
- Escalated

---

# SCREEN 5 — Internal Admin Messaging

Generate:

Header:
- Title
- Subtitle
- New Thread CTA

Layout:

Left:
Thread list

Right:
Conversation panel

Thread item:

- Subject
- Participants
- Last message
- Linked incident
- Unread count

Conversation:

- Messages
- Mentions
- Attachments
- Audit link

Footer:
- Reply
- Mention
- Attach
- Escalate

---

# SCREEN 6 — Delivery Intelligence Center

Generate:

Header:
- Title
- Subtitle
- Export Delivery Report CTA

Metrics:
- Sent
- Delivered
- Opened
- Failed
- Retried

Channel Health:
- Email
- SMS
- Push
- In-App

States:
Healthy  
Delayed  
Degraded  
Offline

Delivery Table:
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

# 8. Drawers & Modals

Generate:

Broadcast Detail Drawer (420px)

Contains:
- preview
- audience
- channels
- schedule
- logs

---

Emergency Alert Modal

Contains:
- type
- severity
- audience
- channel
- confirmation

Danger action.

---

Compliance Rule Drawer

Contains:
- trigger
- frequency
- audience
- escalation

---

Thread Detail Drawer

Contains:
- metadata
- linked incidents
- participants
- escalation history

---

Delivery Inspection Drawer

Contains:
- trace
- retries
- failures
- bounce reasons
- receipts

---

# 9. Execution Rules

Generate all 6 screens in one continuous pass.

Do not break:

- shell continuity
- card system
- typography
- badge semantics
- delivery hierarchy
- alert urgency

Flow G must feel:

Operational  
High-volume  
Structured  
Communication-first

Not:

Analytics-heavy  
Recovery-heavy

---

# 10. Deliverables

After generation create:

- Phase_3C_Flow_G_Stitch_Report.md
- Phase_3C_Flow_G_Visual_Audit.md
- Phase_3C_Flow_G_Certification.md

Store under:

09_Docs/Phase_3_Platform_Integration/Phase_3C_Super_Admin_Layer/

Stop after Stitch generation.

Do NOT generate Flutter.