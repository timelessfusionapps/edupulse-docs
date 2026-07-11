# Phase_3C_Flow_C_Execution_Plan.md

# EduPulse
## Phase 3C — Flow C Execution Plan

Version: 1.0

Status:

APPROVED FOR IMPLEMENTATION

Purpose:

Defines the strict Flutter implementation plan for Phase 3C Flow C.

This phase converts finalized Stitch designs into Flutter UI.

Flow C includes:

1. Trial Manager
2. Resource Limits
3. Recovery Queue

This is implementation only.

Architecture is locked.

Visuals are locked.

No redesign allowed.

---

# Authority Order

Strict read order:

1. Final Stitch Designs (highest authority)
2. EduPulse_Global_Design_System.md
3. Phase_3C_Flow_C_Execution_Architecture.md
4. Phase_3C_Flow_C_UI_Specification.md
5. Phase_3C_Flow_C_UI_Refinement.md

If conflict exists:

Stitch design wins.

Mandatory.

---

# Core Rule

Build an exact replica of the Stitch screens.

Strict.

Do not reinterpret.

Do not improve.

Do not simplify.

Do not optimize layout.

Do not change spacing.

Do not change typography.

Do not change card hierarchy.

Do not change table density.

Do not change drawer widths.

Do not change button placement.

Flutter output must visually match Stitch.

Pixel-accurate implementation required.

---

# Flow C Scope

Must build:

---

## Screen 1

Trial Manager

Path:

lib/features/trials/presentation/screens/

Files:

trial_manager_screen.dart

Widgets:

trial_metrics_row.dart
trial_table.dart
trial_risk_panel.dart
trial_detail_drawer.dart

---

## Screen 2

Resource Limits

Path:

lib/features/limits/presentation/screens/

Files:

resource_limits_screen.dart

Widgets:

limits_metrics_row.dart
limits_table.dart
capacity_alert_panel.dart
limits_growth_panel.dart

---

## Screen 3

Recovery Queue

Path:

lib/features/recovery/presentation/screens/

Files:

recovery_queue_screen.dart

Widgets:

recovery_metrics_row.dart
recovery_table.dart
risk_intelligence_panel.dart
recovery_detail_drawer.dart

---

# Shared UI Rules

Must reuse:

packages/shared_ui/

Required.

No duplicate components.

Use:

- buttons
- cards
- badges
- tables
- drawer containers
- inputs
- alerts

Reuse only.

---

# Small Required Improvements

These are approved improvements.

Must be added during Flutter build.

---

## Improvement 1 — Resource Usage Threshold Colors

For Resource Limits usage bars:

0–70%

Use:

Blue

---

71–90%

Use:

Amber

---

91–100%

Use:

Red

---

100%+

Use:

Critical Red

Mandatory.

This improves visual scanning.

---

## Improvement 2 — Recovery Audit Spacing

Inside Recovery Detail Drawer:

Increase spacing between audit history items.

Add:

8px vertical spacing.

Mandatory.

Improves readability.

---

# Visual Fidelity Rules

Strict.

---

## Sidebar

Must match Stitch exactly.

No changes.

---

## Topbar

Must match Stitch exactly.

No changes.

---

## Metrics Cards

Must match Stitch exactly.

No changes.

---

## Tables

Must match Stitch exactly.

No changes.

---

## Right Panels

Must match Stitch exactly.

No changes.

---

## Drawers

Must match Stitch exactly.

No changes.

---

# Technical Rules

Do NOT:

- connect repositories
- connect Firestore
- connect backend logic
- add Cubits
- add Bloc logic
- add DI
- add services
- add mappers

UI only.

Static placeholders allowed.

Same as Flow A/B.

---

# Routing Rules

Allowed:

Add routes only.

Required.

No routing refactor.

No router redesign.

---

# Test Rules

Mandatory after implementation:

Run:

flutter analyze

Must pass.

Run:

flutter test

Must pass.

No exceptions.

---

# Deliverables

After implementation generate:

1. Phase_3C_Flow_C_Implementation_Report.md
2. Phase_3C_Flow_C_Widget_Inventory.md
3. Phase_3C_Flow_C_Test_Report.md
4. Phase_3C_Flow_C_Implementation_Certification.md

Mandatory.

---

# Stop Rule

After Flutter implementation:

STOP.

Do not start Presentation Refactor.

That will be Phase 3C Flow C Presentation Refactor.