# Phase_3C_Flow_G_Flutter_Execution

## Phase

Phase 3C — Super Admin Layer

## Flow

Flow G — Communication & Broadcast Governance

## Status

Approved for Flutter Implementation

---

# Objective

This document defines the Flutter implementation architecture for Flow G based on the approved Stitch-generated UI screens.

This phase converts all approved visual screens into Flutter code with exact parity.

No redesigns.

No structural changes.

No visual interpretation.

Implementation must follow:

1. Global Design System
2. Existing Phase 3C architecture
3. Approved Stitch screens

---

# Source of Truth

Stitch-generated UI screens are stored here:

```text
05_UI_UX/Phase_3C_Flow_G_Stitch_Screens
```

These screens are the visual source of truth.

Antigravity must:

- inspect these screens carefully
- match spacing exactly
- match layout hierarchy exactly
- match component placements exactly
- match drawer widths exactly
- match modal sizes exactly
- match table proportions exactly
- match alignment exactly

Strict replication required.

No improvisation allowed.

---

# Global Design Rule

All cards used in Flow G MUST match the global card system used across:

- Flow A
- Flow B
- Flow C
- Flow D
- Flow E
- Flow F

Card rules:

- 16px radius
- uniform shadow token
- 24px internal padding
- consistent border behavior
- same hover behavior
- same semantic accent logic where applicable

Do NOT create new card variants.

Reuse the global card component system.

---

# Folder Structure

Save all files inside:

```text
lib/features/super_admin/communication/
```

Structure:

```text
lib/features/super_admin/communication/
│
├── screens/
│   ├── broadcast_command_center_screen.dart
│   ├── school_announcement_governance_screen.dart
│   ├── emergency_alert_engine_screen.dart
│   ├── compliance_notification_center_screen.dart
│   ├── internal_admin_messaging_screen.dart
│   ├── delivery_intelligence_center_screen.dart
│
├── widgets/
│   ├── broadcast_metrics_strip.dart
│   ├── broadcast_table.dart
│   ├── delivery_channel_widget.dart
│   ├── retry_queue_widget.dart
│   ├── failed_channels_widget.dart
│   ├── audience_preview_drawer.dart
│   ├── emergency_dispatch_modal.dart
│   ├── compliance_rule_drawer.dart
│   ├── dependency_graph_widget.dart
│   ├── notification_timeline_widget.dart
│   ├── admin_thread_list.dart
│   ├── incident_context_panel.dart
│   ├── delivery_inspection_drawer.dart
│   ├── notification_center_dropdown.dart
│
├── models/
│   ├── broadcast_model.dart
│   ├── announcement_model.dart
│   ├── emergency_alert_model.dart
│   ├── compliance_rule_model.dart
│   ├── admin_message_model.dart
│   ├── delivery_event_model.dart
│
├── controllers/
│   ├── broadcast_controller.dart
│   ├── announcement_controller.dart
│   ├── emergency_controller.dart
│   ├── compliance_controller.dart
│   ├── messaging_controller.dart
│   ├── delivery_controller.dart
```

---

# Screen Implementation Requirements

---

# 1. Broadcast Command Center

File:

```text
screens/broadcast_command_center_screen.dart
```

Must implement:

### KPI Strip

Cards:

- Active Broadcasts
- Scheduled Broadcasts
- Failed Dispatches
- Reach Coverage

Reuse global metric cards.

---

### Main Broadcast Table

Columns:

- Broadcast ID
- Type
- Target Scope
- Channel
- Initiated By
- Status
- Actions

Actions:

Right-aligned icon buttons:

- Eye
- Pause
- Retry
- Cancel

Spacing:

8px

Container:

32px

---

### Right Rail

Must include:

1. Delivery Channel Split
2. Success Ratio
3. Retry Queue
4. Failed Channels

Use stacked card blocks.

---

# 2. School Announcement Governance

File:

```text
screens/school_announcement_governance_screen.dart
```

Must implement:

### Filter Row

Filters:

- Region
- Board
- Status
- School

---

### Announcement Queue Table

Columns:

- Announcement ID
- School(s)
- Type
- Channel
- Priority
- Status

---

### Audience Preview Drawer

Width:

420px

Must match Stitch exactly.

Sections:

- Targeted Schools
- Reach Potential
- Region Distribution
- Board Distribution
- Recipient Roles

Sticky CTA:

Confirm & Lock Audience

---

# 3. Emergency Alert Engine

File:

```text
screens/emergency_alert_engine_screen.dart
```

Must implement:

### Emergency KPI Cards

Cards:

- Critical Incidents
- Active Lockdowns
- Service Interruptions
- Security Breaches

Semantic colors required.

---

### Emergency Queue Table

Columns:

- Alert ID
- Severity
- Region
- Channel
- Triggered By
- Status
- Actions

---

### Emergency Dispatch Modal

Modal width:

420px

Confirmation modal:

360px

Must be separate.

Do not merge.

---

# 4. Compliance Notification Center

File:

```text
screens/compliance_notification_center_screen.dart
```

Must implement:

### Rules Table

Columns:

- Rule ID
- Trigger
- Escalation
- Status
- Last Run

---

### Rule Detail Drawer

Width:

420px

Sections:

- Trigger Conditions
- Rule Dependency Graph
- Automated Actions

---

### Notification Timeline

Below table.

Vertical timeline.

Max height:

300px

---

# 5. Internal Admin Messaging

File:

```text
screens/internal_admin_messaging_screen.dart
```

Layout:

Split screen.

---

### Left Panel

Thread list

Must support:

- active thread
- unread count
- urgency marker

---

### Right Panel

Conversation panel

Includes:

- chat bubbles
- timestamps
- attachments
- mentions

---

### Incident Context Panel

Must remain fixed.

---

### Composer

Reduced height version.

Must match Stitch final polish.

---

# 6. Delivery Intelligence Center

File:

```text
screens/delivery_intelligence_center_screen.dart
```

Must implement:

### KPI Row

Cards:

- Total Sent
- Success Rate
- Avg Latency
- Failure Ratio

---

### Channel Health Grid

Cards:

- SMS
- Email
- Push
- Internal

---

### Channel Latency Graph

Exact visual parity.

---

### Delivery Table

Columns:

- Delivery ID
- Channel
- Latency
- Retries
- Status

---

### Delivery Inspection Drawer

Width:

420px

Sections:

1. Technical Summary
2. Delivery Metadata
3. Delivery Timeline

---

# Notification Center Integration

File:

```text
widgets/notification_center_dropdown.dart
```

Must integrate into topbar.

Groups:

- Critical Recoveries
- Pending Approvals
- Failed Broadcasts
- Compliance Violations
- Emergency Alerts
- Internal Messages

Preserve:

- icons
- timestamps
- grouping spacing

---

# Implementation Rules

STRICT:

- Use existing global table widget
- Use existing global drawer widget
- Use existing global modal widget
- Use existing semantic chips
- Use existing badge system
- Use existing card system
- Use existing topbar
- Use existing sidebar
- Use existing typography tokens

Do NOT introduce:

- new visual language
- new card types
- new spacing system
- new border system

---

# Routing

Add routes:

```text
/recovery-center/communications/broadcasts
/recovery-center/communications/announcements
/recovery-center/communications/emergency
/recovery-center/communications/compliance
/recovery-center/communications/messages
/recovery-center/communications/delivery
```

Maintain current route hierarchy.

---

# Verification Checklist

Before certification:

- Stitch parity verified
- Drawer parity verified
- Modal parity verified
- Table parity verified
- Responsive verified
- Scroll behavior verified
- Hover states verified
- Notification center verified
- Card parity verified
- Global design compliance verified

---

# Final Instruction for Antigravity

This is NOT a design phase.

This is a direct Flutter replication phase.

Use:

```text
05_UI_UX/Phase_3C_Flow_G_Stitch_Screens
```

as visual truth.

Build exact Flutter equivalents.

Preserve everything.

No deviations.