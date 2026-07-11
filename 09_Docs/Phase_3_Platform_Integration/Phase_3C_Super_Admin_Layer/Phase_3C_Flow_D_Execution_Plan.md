# Phase_3C_Flow_D_Execution_Plan.md

## Objective

Convert the finalized **Flow D (Platform Governance Layer)** Stitch screens into production Flutter screens using the existing EduPulse architecture.

This execution must preserve **exact visual parity** with Stitch.

This is not a redesign.

This is not a UI interpretation pass.

This is a **pixel-faithful implementation pass**.

---

# Source of Truth Hierarchy

Strict priority:

### Priority 1 (Absolute)

Final refined Stitch screens.

These are the final visual authority.

If any conflict exists between Stitch and any documentation:

**Stitch wins.**

---

### Priority 2

`Phase_3C_Flow_D_UI_Refinement.md`

Used for locked refinements.

---

### Priority 3

`EduPulse_Global_Design_System.md`

Supportive only.

Not overriding Stitch.

Use only when Stitch is silent.

---

# Core Rule: Exact Replica Policy

Antigravity must create exact replicas.

Do not:

- improve layouts
- rebalance cards
- change density
- modify spacing
- alter table sizing
- reposition buttons
- resize drawers
- reinterpret hierarchy
- replace component structures

Replicate:

- exact spacing
- exact card heights
- exact border radius
- exact typography
- exact table density
- exact drawer widths
- exact button sizes
- exact badge sizes
- exact icon placements
- exact alert spacing
- exact sidebar dimensions
- exact topbar behavior

Visual precision is mandatory.

---

# Implementation Scope

Implement these screens:

---

## 1. Platform Admin Registry

Path:

`features/platform_admin/presentation/screens/platform_admin_registry_screen.dart`

Includes:

- metrics strip
- admin ledger table
- governance risk side panel
- bottom security policy cards
- admin detail drawer

---

## 2. Invite Platform Admin Modal

Path:

`features/platform_admin/presentation/widgets/invite_platform_admin_modal.dart`

Includes:

- identity form
- role assignment cards
- permission group cards
- CTA footer

---

## 3. System Permission Matrix

Path:

`features/platform_admin/presentation/screens/system_permission_matrix_screen.dart`

Includes:

- permission table matrix
- admin override column
- risk summary panel
- recent changes panel
- permission audit drawer

---

## 4. System Activity Logs

Path:

`features/platform_admin/presentation/screens/system_activity_logs_screen.dart`

Includes:

- metric strip
- audit logs table
- risk intelligence panel
- storage metrics
- event detail drawer
- JSON viewer

---

## 5. Role Assignment Detail

Path:

`features/platform_admin/presentation/screens/role_assignment_detail_screen.dart`

Includes:

- identity sidebar
- role selection cards
- privilege boundaries
- bottom metrics strip
- role audit drawer

---

## 6. Access Suspension Control

Path:

`features/platform_admin/presentation/screens/access_suspension_control_screen.dart`

Includes:

- identity card
- suspension protocol form
- risk assessment panel
- action CTA group

---

# Required ViewModels

Create under:

`features/platform_admin/presentation/models/`

Mandatory:

---

## platform_admin_registry_vm.dart

Contains:

- metrics
- registry entries
- risk flags
- drawer details
- security policies

Required:

- mock()
- mockList()

---

## admin_detail_drawer_vm.dart

Contains:

- identity
- permissions
- recent activity
- device metadata

Required:

- mock()

---

## permission_matrix_vm.dart

Contains:

- categories
- permissions
- override states
- risk summary
- audit history

Required:

- mock()

---

## role_assignment_vm.dart

Contains:

- selected subject
- current role
- candidate roles
- privilege boundaries
- role transition history

Required:

- mock()

---

## activity_log_vm.dart

Contains:

- log metrics
- log rows
- intelligence alerts
- storage metrics

Required:

- mock()
- mockList()

---

## audit_event_detail_vm.dart

Contains:

- event metadata
- JSON payload
- security validations

Required:

- mock()

---

## access_suspension_vm.dart

Contains:

- identity
- suspension reasons
- critical dependencies
- risk severity

Required:

- mock()

---

## invite_platform_admin_vm.dart

Contains:

- identity fields
- role options
- permission groups

Required:

- mock()

---

# Widget Extraction Requirements

Create reusable widgets:

Path:

`features/platform_admin/presentation/widgets/`

Required:

---

## governance_metric_card.dart

Used across:

- registry
- logs
- permissions

---

## admin_registry_table.dart

Registry table component.

---

## risk_flag_panel.dart

Governance alert system.

Reusable.

---

## permission_matrix_table.dart

Matrix grid.

Must preserve exact alignment.

---

## audit_log_table.dart

Audit records table.

Exact row density.

---

## audit_json_viewer.dart

Must use monospace.

Exact drawer replica.

---

## admin_identity_card.dart

Reusable across:

- registry drawer
- suspension
- role assignment

---

## permission_group_card.dart

Used in invite modal.

---

## suspension_action_panel.dart

Critical action CTA group.

---

# Layout Rules

Use existing:

`platform_shell_layout.dart`

Must preserve:

---

## Sidebar

Width:

240px exact

Color:

#0F172A

---

## Topbar

Standardized:

Left:
Search

Right:
Notifications
Help
System Status
Profile

Do not modify.

---

## Button Height

44px exact.

Global.

---

## Table Density

Registry:
64px rows

Logs:
72px rows

Permission matrix:
72px rows

Must match Stitch.

---

## Drawers

Preserve exact widths from Stitch.

Do not approximate.

---

# Routing Integration

Use existing GoRouter.

Add:

```dart
/platform-admin
/platform-admin/invite
/platform-admin/permissions
/platform-admin/activity-logs
/platform-admin/roles/:id
/platform-admin/suspend/:id
```

Use shell continuity.

No isolated pages.

---

# Architectural Constraints

Strict:

Do not:

- connect Firestore
- add repositories
- add services
- add APIs
- add cubits/blocs unless already required
- alter DI
- modify existing flows
- modify shared design system

Presentation-only.

Mock-driven.

---

# Validation

Mandatory:

```bash
flutter analyze
flutter test
```

Must pass:

- zero errors
- zero warnings

---

# Deliverables

After completion:

Required:

---

## Phase_3C_Flow_D_Implementation_Report.md

Contains:

- files created
- widgets extracted
- routes added
- implementation notes

---

## Phase_3C_Flow_D_VM_Inventory.md

Lists all VM models.

---

## Phase_3C_Flow_D_Test_Report.md

Contains:

- analyze results
- test results

---

## Phase_3C_Flow_D_Implementation_Certification.md

Confirms:

- exact Stitch parity
- architecture integrity
- zero backend coupling

---

# Final Rule

Stop after implementation.

Do not proceed to Flow E.

Do not begin refactor.

Wait for review.