# Phase_3C_Flow_A_Presentation_Refactor.md

# EduPulse
## Phase 3C — Flow A Presentation Refactor

Version: 1.0

Status:

APPROVED

Purpose:

Refactor Flow A UI screens to remove direct hardcoded inline values and replace them with presentation-layer mock ViewModels.

This phase does NOT connect live backend data.

This phase creates the UI data contract.

---

# Why this phase exists

Current Flow A implementation uses:

hardcoded:

- strings
- counts
- lists
- rows
- badges
- charts

This makes future backend binding difficult.

We must now introduce:

ViewModel-driven rendering.

---

# Scope

Only:

1. Super Admin Dashboard
2. School Registry
3. School Detail

No UI redesign.

No logic changes.

No backend changes.

---

# Refactor Rule

Allowed:

UI data abstraction.

Forbidden:

layout changes.

styling changes.

routing changes.

DI changes.

backend calls.

repository calls.

Firestore calls.

---

# Required Folder Structure

Create:

apps/super_admin_app/lib/features/

---

## Dashboard

dashboard/
presentation/
models/

Create:

dashboard_metrics_vm.dart
dashboard_application_vm.dart
dashboard_alert_vm.dart
dashboard_activity_vm.dart

---

## Schools

schools/
presentation/
models/

Create:

school_registry_item_vm.dart
school_registry_stats_vm.dart
school_detail_vm.dart
school_usage_vm.dart
school_limits_vm.dart
school_audit_vm.dart
school_lifecycle_vm.dart
school_admin_access_vm.dart

---

# Screen Refactors

---

# Screen 1 — SuperAdminDashboardScreen

Refactor:

Replace inline:

- total school counts
- application rows
- trial alerts
- activity feed

Use:

DashboardMetricsVM
DashboardApplicationVM
DashboardAlertVM
DashboardActivityVM

Must render:

List-driven.

No inline literals.

---

# Screen 2 — SchoolRegistryScreen

Refactor:

Replace inline:

table rows

Use:

List<SchoolRegistryItemVM>

Replace inline stats:

Use:

SchoolRegistryStatsVM

Filters remain visual only.

No live filter logic yet.

---

# Screen 3 — SchoolDetailScreen

Refactor:

Replace inline:

- school name
- summary cards
- usage
- limits
- audit
- lifecycle
- admin access

Use:

SchoolDetailVM

Nested:

SchoolUsageVM
SchoolLimitsVM
SchoolAuditVM
SchoolLifecycleVM
SchoolAdminAccessVM

---

# Mock Data Rule

Create temporary mock factories.

Allowed:

static mock data.

Example:

DashboardMetricsVM.mock()

SchoolDetailVM.mock()

RegistryItems.mockList()

Required.

---

# Naming Rules

Use:

VM suffix only.

No DTO.

No Entity.

No Repository.

No Model (domain-level).

These are presentation-only contracts.

---

# Future Binding Rule

Later:

VMs will be mapped from repositories.

Pattern:

Repository
→ Domain Entity
→ Mapper
→ ViewModel
→ UI

This phase creates only:

ViewModel
→ UI

---

# Validation

Run:

flutter analyze

flutter test

---

# Deliverables

Generate:

1. Phase_3C_Flow_A_Presentation_Refactor_Report.md
2. Phase_3C_Flow_A_VM_Inventory.md
3. Phase_3C_Flow_A_Test_Report.md
4. Phase_3C_Flow_A_Refactor_Certification.md

Save under:

09_Docs/Phase_3_Platform_Integration/Phase_3C_Super_Admin_Layer/

---

# Stop Rule

After refactor:

STOP.

Do not start Flow B.

Do not bind repositories.

Await review.