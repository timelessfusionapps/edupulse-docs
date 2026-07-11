# Phase_3C_Flow_G_Antigravity_Flutter_Execution

## Phase

Phase 3C — Super Admin Layer

## Flow

Flow G — Communication & Broadcast Governance

## Mode

Flutter Execution

Status: Approved for Implementation

---

# Objective

Implement Flow G in Flutter by replicating the approved Stitch screens exactly.

This is NOT a design phase.

This is NOT an interpretation phase.

This is a:

```text
Stitch → Flutter parity replication phase
```

Visual fidelity is mandatory.

---

# Required Files To Load Before Execution

Load and inspect:

```text
09_Docs/Phase_3_Platform_Integration/Phase_3C_Super_Admin_Layer/Phase_3C_Flow_G_Execution_Architecture.md
09_Docs/Phase_3_Platform_Integration/Phase_3C_Super_Admin_Layer/Phase_3C_Flow_G_UI_Specification.md
09_Docs/Phase_3_Platform_Integration/Phase_3C_Super_Admin_Layer/Phase_3C_Flow_G_Stitch_Execution.md
09_Docs/Phase_3_Platform_Integration/Phase_3C_Super_Admin_Layer/Phase_3C_Flow_G_Flutter_Execution.md
```

Mandatory.

Do not skip.

---

# Visual Source of Truth

Inspect all Stitch screens here:

```text
05_UI_UX/Phase_3C_Flow_G_Stitch_Screens
```

This folder is the visual contract.

Mandatory:

- inspect spacing
- inspect card heights
- inspect rail widths
- inspect table density
- inspect drawer structure
- inspect modal proportions
- inspect chip sizing
- inspect icon placements

You must replicate exactly.

Do NOT improvise.

---

# Global Design Contract

Use the existing global system.

Do NOT create new design variants.

Must reuse:

```text
GlobalMetricCard
GlobalDataTable
GlobalDrawerShell
GlobalModalShell
GlobalSemanticChip
GlobalSidebarShell
GlobalTopbar
GlobalCard
```

Mandatory.

---

# Card System Rule (Permanent)

All Flow G cards must match:

```text
Phase 3C Global Card System
```

Rules:

- 16px radius
- same elevation token
- same padding (24px)
- same semantic accent logic
- same hover behavior
- same border token
- same typography hierarchy

Do NOT create Flow G-specific card systems.

Reuse existing.

---

# Implementation Order

Execute in exact order.

---

# Step 1 — Build Models

Create:

```text
models/
```

Files:

- broadcast_model.dart
- announcement_model.dart
- emergency_alert_model.dart
- compliance_rule_model.dart
- admin_message_model.dart
- delivery_event_model.dart

Use mock factories only.

No backend.

---

# Step 2 — Build Widgets

Create:

```text
widgets/
```

Files:

- broadcast_metrics_strip.dart
- broadcast_table.dart
- delivery_channel_widget.dart
- retry_queue_widget.dart
- failed_channels_widget.dart
- audience_preview_drawer.dart
- emergency_dispatch_modal.dart
- compliance_rule_drawer.dart
- dependency_graph_widget.dart
- notification_timeline_widget.dart
- admin_thread_list.dart
- incident_context_panel.dart
- delivery_inspection_drawer.dart
- notification_center_dropdown.dart

Rules:

Widgets must remain reusable.

Do not hardcode screen logic.

---

# Step 3 — Build Screens

Create:

```text
screens/
```

Files:

---

## 1. Broadcast Command Center

File:

```text
broadcast_command_center_screen.dart
```

Must match Stitch exactly.

Includes:

- KPI row
- Broadcast table
- Bulk toolbar
- Right rail:
  - Channel split
  - Success ratio
  - Retry queue
  - Failed channels

Do not simplify.

---

## 2. School Announcement Governance

File:

```text
school_announcement_governance_screen.dart
```

Includes:

- filter row
- queue table
- audience preview drawer
- empty state card

Drawer width:

```text
420px
```

Mandatory.

---

## 3. Emergency Alert Engine

File:

```text
emergency_alert_engine_screen.dart
```

Includes:

- emergency KPIs
- queue table
- emergency dispatch modal
- confirmation modal

Widths:

Main modal:

```text
420px
```

Confirmation modal:

```text
360px
```

Must remain separate.

---

## 4. Compliance Notification Center

File:

```text
compliance_notification_center_screen.dart
```

Includes:

- rules table
- dependency graph
- notification timeline
- rule detail drawer

Drawer:

```text
420px
```

Mandatory.

---

## 5. Internal Admin Messaging

File:

```text
internal_admin_messaging_screen.dart
```

Must preserve:

- thread list
- conversation panel
- incident context panel
- compressed composer

Do not change layout ratios.

---

## 6. Delivery Intelligence Center

File:

```text
delivery_intelligence_center_screen.dart
```

Includes:

- KPI strip
- channel grid
- latency graph
- delivery table
- delivery inspection drawer

Drawer:

```text
420px
```

Must preserve sections:

- Technical Summary
- Delivery Metadata
- Timeline

---

# Step 4 — Notification Center Integration

Integrate:

```text
notification_center_dropdown.dart
```

Into:

Global topbar.

Do not duplicate bell systems.

Must support grouped sections.

---

# Step 5 — Routing

Add routes.

Mandatory:

```text
/communications/broadcasts
/communications/announcements
/communications/emergency
/communications/compliance
/communications/messages
/communications/delivery
```

Flow G is top-level.

Do NOT nest under Recovery.

Do NOT nest under Audit.

Sidebar:

```text
Dashboard
Schools
Applications
Trials
Platform Admins
Audit Center
Recovery Center
Communications
Settings
```

Mandatory.

---

# Execution Rules

STRICT:

Do NOT:

- redesign tables
- redesign cards
- redesign drawers
- redesign topbar
- redesign sidebar
- change spacing
- change semantic chip system
- alter global typography

Only replicate Stitch.

---

# After Implementation

Generate:

```text
Phase_3C_Flow_G_Implementation_Report.md
Phase_3C_Flow_G_VM_Inventory.md
Phase_3C_Flow_G_Test_Report.md
Phase_3C_Flow_G_Certification.md
```

Save:

```text
09_Docs/Phase_3_Platform_Integration/Phase_3C_Super_Admin_Layer/
```

---

# Final Validation

Run:

```bash
flutter analyze
flutter test
```

Then provide:

- full screenshots
- desktop audit
- drawer audit
- modal audit
- responsive audit

Stop after that.

Wait for visual review.