# Phase 3C — Flow G Flutter Polish Pass
## EduPulse Super Admin Layer
### Scope: Communication & Broadcast Governance

---

# Objective

This document defines the **final Flutter polish pass** for Flow G.

The core implementation is already complete.

This phase is **NOT a redesign**.

This phase is strictly for:

1. Visual parity correction
2. Structural parity correction
3. Missing component completion
4. Final Stitch-to-Flutter alignment

---

# Critical Rule

Antigravity must treat the current implementation as the source of truth.

Everything already approved must remain untouched.

Only the specific changes listed in this document may be made.

No refactoring.

No redesigning.

No spacing experiments.

No component substitutions.

No global token changes.

No route changes.

No architecture changes.

---

# Approved Areas (LOCKED)

These are approved and must not be changed.

---

## 1. Folder Architecture

LOCKED:

apps/super_admin_app/lib/features/communication/

Do not move files.

Do not rename directories.

Do not restructure.

---

## 2. Routing

LOCKED:

/communications/broadcasts  
/communications/announcements  
/communications/emergency  
/communications/compliance  
/communications/internal  
/communications/logs

No changes.

---

## 3. Global Shell Layout

LOCKED:

- Sidebar width
- Header height
- Notification bell placement
- Search bar structure
- User profile placement
- Status pill placement

No modifications.

---

## 4. Global Design Tokens

LOCKED:

- Typography scale
- Border radius
- Elevation
- Color tokens
- Divider colors
- Hover colors
- Card paddings
- Semantic colors

Must remain identical.

---

## 5. GovernanceMetricCard Usage

APPROVED.

Continue using existing card system.

Do not replace.

Do not rebuild.

All new cards must use same pattern.

---

## 6. Internal Admin Messaging Layout

APPROVED.

Only composer compression allowed.

Nothing else.

---

---

# POLISH CHANGES

These are mandatory.

Only these.

---

# A. Broadcast Command Center

File:
broadcast_command_center_screen.dart

---

## A1. Fix Layout Order

Current:

Toolbar  
Metrics  
Table

Required:

Metrics  
Toolbar  
Table

Exact Stitch order must be restored.

Do not alter spacing.

Only reorder.

---

## A2. Compact Metric Formatting

Current:

1200000

Required:

1.2M

Use compact notation formatter.

Apply to all metric cards.

Examples:

1200000 → 1.2M  
504000 → 504k  
42000 → 42k

No font changes.

---

## A3. Add Missing Failed Channels Card

Right rail currently incomplete.

Must include:

Card title:
Failed Channels

Insert below:
Retry Queue

Use same card shell.

Contents:

- SMS Congestion — carrier latency spike
- Email Bounce Cluster — invalid recipient burst
- Push Timeout Spike — delayed gateway response

Use semantic status dots.

No charts.

Simple stacked list.

---

---

# B. School Announcement Governance

File:
school_announcement_governance_screen.dart

---

## B1. Add Missing Top Tabs

Current implementation is missing Stitch tabs.

Add:

Announcements  
Automated Triggers  
Templates  
Broadcast Logs  
Policy Management

Requirements:

- Horizontal tab strip
- Active tab underline
- Use current typography
- Use current tab spacing system

Do not introduce new styles.

---

## B2. Right Rail Compression

Current side cards are too tall.

Reduce card height by approximately 18%.

Do not reduce padding horizontally.

Only vertical compression.

Keep:

- metric count
- semantic bar
- label hierarchy

unchanged.

---

---

# C. Emergency Alert Engine

File:
emergency_alert_engine_screen.dart

---

## C1. Transmission Strength Placeholder Enhancement

Current placeholder too empty.

Add static visual mock:

- light grid background
- pulse nodes
- propagation lines
- signal dots

Static only.

No animation.

No charts package.

Must look like a technical propagation map.

---

## C2. Emergency Modal Compression

Current first modal too tall.

Reduce:

- top padding
- internal vertical spacing
- section gaps

Target:

12% overall height reduction.

Do not alter:

- fields
- toggles
- buttons
- severity cards

---

---

# D. Compliance Notification Center

File:
compliance_notification_center_screen.dart

New:
compliance_rule_drawer.dart

---

## D1. Implement Missing Rule Detail Drawer

Current missing.

Required.

Clicking a rule row must open right-side drawer.

Drawer sections:

1. Rule Metadata
- name
- category
- state

2. Trigger Conditions
- list cards

3. Automated Actions
- list cards

4. Dependency Graph

Use:

Trigger → Reminder → Escalation → Closure

Horizontal flow.

Semantic state pills.

---

No modifications to table.

No modifications to timeline.

Only drawer implementation.

---

---

# E. Internal Admin Messaging

File:
internal_admin_messaging_screen.dart

---

## E1. Final Composer Compression

Current still slightly oversized.

Reduce height by additional 10%.

Preserve:

- mention button
- attach button
- emoji button
- send button
- text field

Do not touch thread list.

Do not touch incident panel.

---

---

# F. Delivery Intelligence Center

File:
delivery_intelligence_center_screen.dart

---

## F1. Verify Delivery Inspection Drawer

Drawer already implemented.

Must verify working.

Requirement:

Click action icon opens drawer.

Must show:

- Technical Summary
- Delivery Metadata (2-column grid)
- Timeline logs

No redesign.

Only verify and patch if broken.

---

## F2. Normalize Table Action Buttons

Current spacing inconsistent.

Apply:

32px x 32px button size

8px spacing

Across all action icons.

Must match Broadcast screen exactly.

---

---

# G. Global Notification Dropdown

Files:
platform_shell_layout.dart
notification_center_dropdown.dart

---

## G1. Final Verification Required

Must open from existing bell icon.

Must NOT create duplicate bell.

Must preserve current topbar.

Dropdown must include grouped sections:

Critical Alerts  
Approvals  
Broadcast Failures  
Compliance Violations  
Emergency Logs  
Internal Messages

Each group:

- small uppercase label
- 12px gap between groups

Preserve:

- existing icons
- existing timestamps

---

---

# Final Verification

After execution, Antigravity must submit:

1. Broadcast screen
2. Broadcast drawer
3. Announcement screen
4. Announcement drawer
5. Emergency screen
6. Emergency modal
7. Emergency confirmation modal
8. Compliance screen
9. Compliance drawer
10. Internal messaging screen
11. Delivery screen
12. Delivery inspection drawer
13. Notification dropdown

All must match:

05_UI_UX/Phase_3C_Flow_G_Stitch_Screens

Strict parity required.

---

# Final Rule

DO NOT MODIFY:

- Any approved implementation
- Existing controllers
- Existing models
- Existing routes
- Existing reusable widgets
- Existing shell structure

Patch only what is listed.

Nothing else.