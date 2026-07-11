# Phase 3C — Flow H Flutter Implementation
## Executive Command Center
### EduPulse Super Admin Platform

---

# Phase

Phase 3C — Super Admin Layer

## Flow

Flow H — Executive Command Center

## Implementation Type

Flutter UI Implementation

---

# Objective

Implement the approved Flow H Stitch screens in Flutter.

This implementation must reproduce the approved Stitch screens with pixel-level visual parity while fully adhering to the established Phase 3C architecture.

Flow H is an executive layer.

It summarizes platform-wide information from Flows A–G.

It does **not** introduce new operational functionality.

---

# Required Reference Documents

Review these documents before writing any code.

Mandatory:

- Phase_3C_Flow_H_Execution_Architecture.md
- Phase_3C_Flow_H_UI_Specification.md
- Phase_3C_Flow_H_Stitch_Execution.md
- Flow_H_Final_Visual_Audit.md
- Flow_H_Final_Certification.md
- EduPulse_Global_Design_System.md
- Phase_3C_Global_UI_Normalization.md

Do not begin implementation until these documents have been reviewed.

---

# Execution Rules

This implementation follows the permanent Phase 3C execution rules.

Mandatory:

- Reuse existing widgets wherever possible.
- Reuse existing design tokens.
- Reuse typography.
- Reuse spacing.
- Reuse responsive layout.
- Reuse routing.
- Reuse shell navigation.

Do NOT:

- redesign the UI
- introduce new design language
- modify approved components
- introduce backend logic
- implement AI
- add Firestore
- create mock APIs

---

# New Screens

Create only two screens.

---

## 1.

executive_command_center_screen.dart

Purpose:

Executive landing page summarizing the complete Super Admin platform.

Route:

/executive

Responsibilities:

- Executive Health Cards
- Strategic Watchlist summary
- Platform Health summary
- Executive Alerts
- Executive Timeline
- Quick navigation to Flows A–G

---

## 2.

strategic_watchlist_screen.dart

Route:

/executive/watchlist

Responsibilities:

- Watchlist table
- Filter bar
- Executive summary cards
- Executive recommendation panel
- Pulse feed
- Export actions

---

# Widgets

Create only widgets that do not already exist.

Reuse everything possible.

---

## Create

executive_health_card.dart

Purpose:

Executive summary metric.

Reuse styling from GovernanceMetricCard.

Differences:

- executive status label
- business summary
- semantic accent

---

## Create

platform_summary_card.dart

Business summary card.

Examples:

- Schools
- Applications
- Governance
- Audit
- Recovery
- Communications

Do not display infrastructure telemetry.

---

## Create

executive_alert_banner.dart

Large alert card.

Reuse:

- semantic colors
- alert badges
- button styling

---

## Create

executive_timeline_widget.dart

Reusable executive timeline.

Reuse timeline styling from previous flows.

---

## Create

watchlist_summary_card.dart

Top metric cards for Strategic Watchlist.

Reuse existing metric card spacing.

---

## Create

executive_recommendation_panel.dart

Static recommendation panel.

Contains:

- recommendations
- executive notes

No AI.

Static content only.

---

## Create

pulse_feed_widget.dart

Chronological executive activity feed.

Reuse existing timeline typography.

---

# Reuse Existing Widgets

Mandatory reuse.

Reuse:

GovernanceMetricCard

StatusBadge

AppScaffold

ShellNavigation

MetricCard

ExecutiveTable

ResponsivePageLayout

DrawerScaffold

ActionButton

FilterBar

SearchBar

SectionHeader

CardContainer

SemanticBadge

Timeline components

Modal framework

Existing button components

Existing icon library

Existing design tokens

No duplicate widgets.

---

# Routing

Add:

/executive

/executive/watchlist

Integrate into existing GoRouter configuration.

No new navigation architecture.

---

# Sidebar

Reuse the approved Phase 3C Super Admin sidebar.

Do not create a Flow H-specific navigation.

Flow H is part of the existing Super Admin experience.

---

# Responsive Behaviour

Desktop

Primary target.

---

Tablet

Collapse spacing only.

No layout redesign.

---

Mobile

Use existing responsive collapse behavior.

Maintain section ordering.

---

# Drawers

Create only if approved.

Allowed:

ExecutiveSummaryDrawer

WatchlistDetailDrawer

PlatformHealthDrawer

Drawers summarize information only.

No operational controls.

---

# Modals

Allowed:

Export Executive Snapshot

Export Watchlist

Filter Configuration

Reuse existing modal components.

---

# Business Data

Static placeholder data only.

No backend.

No repositories.

No APIs.

No Firestore.

No providers beyond existing mock state.

---

# Typography

Reuse Phase 3C typography.

No font changes.

No weight changes.

No color changes.

---

# Colors

Reuse semantic colors.

Green

Healthy

Amber

Attention

Red

Critical

Purple

System

Blue

Information

No new colors.

---

# Spacing

Reuse global spacing tokens.

No custom spacing values.

---

# Elevation

Reuse approved Phase 3C elevation tokens.

---

# Border Radius

Reuse global radius tokens.

No custom radii.

---

# Animations

Only existing subtle animations.

Hover

Fade

Drawer

Modal

No custom animations.

---

# Accessibility

Maintain:

semantic labels

keyboard navigation

focus order

button sizing

contrast ratios

---

# Flutter Quality Checks

Implementation must pass:

flutter analyze

No warnings.

No errors.

---

# Visual Verification

Capture screenshots for:

Executive Command Center

Strategic Watchlist

Export Modal

Watchlist Drawer

Desktop

Tablet

Mobile

Compare against approved Stitch screens.

Pixel parity required.

---

# Deliverables

After implementation create:

Phase_3C_Flow_H_Flutter_Report.md

Phase_3C_Flow_H_Parity_Report.md

Phase_3C_Flow_H_Implementation_Certification.md

Store in:

09_Docs/
Phase_3_Platform_Integration/
Phase_3C_Super_Admin_Layer/

---

# Completion Criteria

Flow H is complete only when:

✓ Flutter implementation matches approved Stitch

✓ Responsive layouts verified

✓ Existing widgets reused

✓ flutter analyze passes

✓ Visual parity achieved

✓ Documentation completed

✓ Screens approved

---

# Stop Rule

After Flutter implementation:

STOP.

Do not begin any additional Phase.

Wait for user review of Flutter screenshots.

Once approved, Flow H will be locked and Phase 3C Super Admin Layer will be officially completed.