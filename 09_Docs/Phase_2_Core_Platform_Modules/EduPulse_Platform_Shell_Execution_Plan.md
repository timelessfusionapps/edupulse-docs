# Phase 2A — Platform Shell & Navigation Execution Plan

## Objective
This execution plan details the implementation strategy for the EduPulse Platform Shell and Navigation architecture. The Shell will act as the outer container for all feature modules, enforcing layout responsiveness, navigation governance, and permission-based visibility.

Execution authority is NOT granted. This plan is designed strictly for architecture review and approval.

---

## Pre-Implementation Step 1: Compatibility Assessment (MANDATORY)
Before any code changes occur, a Compatibility Assessment must be conducted and documented in `EduPulse_Platform_Shell_Compatibility_Assessment.md`.

**Assessment Scope:**
The assessment must identify integration points for:
- Dashboard
- Authentication
- RBAC
- User Management
- Runtime Access
- School Configuration

**Execution Rule:**
If the assessment identifies a risk to any certified modules, **Execution Pauses** until a review is completed.

---

## Scope & Runtime Preservation Requirements

### In Scope
- Shell Layout Framework (Header, Sidebar, Content Area, Breakpoints)
- Module Registry & Route Registry Systems
- Breadcrumb Framework
- Permission-Driven Navigation Interceptors
- Empty State Component
- Shell-level UI components (Notification Bell, Global Search Bar placeholders)
- User Preferences (Favorites, Recently Visited)

### Dashboard Preservation Rules (MANDATORY)
Phase 2A is an infrastructure phase. The existing Dashboard implementation MUST be preserved flawlessly.
**Prohibited Actions:**
- Changing Dashboard Layout, Visual Design, or UX.
- Changing or creating Dashboard Widgets.
- Changing existing Dashboard Business Logic or Navigation Flows.

**Approved Dashboard Integration:**
The shell may only register the Dashboard module, register its route, wrap it in the Shell layout, and apply permission/breadcrumb support.

### Out of Scope
- Implementation of Business Modules (Students, Events, Points, Reports, Announcements, Parent Portal).

---

## Required Implementation Areas

### 1. Shell Layout Framework
Implement the responsive container.
- **Desktop (≥ 1200px)**: Expanded fixed Sidebar + Header + Content.
- **Tablet (768px – 1199px)**: Icon-only Collapsible Sidebar + Header + Content.
- **Mobile (< 768px)**: Hidden Hamburger Drawer + Header + Content.

### 2. Module Registry
Implement a central registry pattern defining available capabilities.
- **Responsibilities**: Manage Module Metadata, Menu Metadata, Permissions Mapping, Navigation Icons, and Display Ordering.
- **Workflow**: Module is registered → Shell reads registry → Menus render based on AccessContext.

### 3. Route Registry (Augmentation Rule)
Isolate routing logic from UI metadata.
- **Responsibilities**: Route Definitions (e.g. `/students`), Route Metadata, Breadcrumb Name Mapping, Permission Mapping.
- **Required Rule**: The Route Registry must **Augment** the existing router. It must NOT Replace, Refactor, or Rewrite the existing routing architecture. Existing routes must continue to function exactly as they do today.

### 4. Navigation Framework
Implement the Sidebar UI component parsing the registries.
- **Features**: Collapsible Sections, Nested Navigation, Favorites list, Recently Visited list.

### 5. Breadcrumb Framework
Implement dynamic hierarchical tracing.
- **Components**: `BreadcrumbBuilder`, `BreadcrumbResolver`.
- **Support**: Deep linking and dynamic route name resolution (e.g. `Dashboard > Students > Student Profile`).

### 6. Permission Driven Navigation
Integrate Phase 1 runtime guards.
- Drive Menu, Widget, and Action visibility dynamically using `AccessContext` and `RuntimePermissionResolver`.

### 7. Dashboard Shell Integration
Integrate the preserved dashboard securely.
- **Loading**: Role-Based Dashboard Loading (School Admin, Teacher, House Master).
- *Strict Rule: No new widgets will be built.*

### 8. Global Search Framework (Placeholder Only)
Implement the architectural container.
- **Approved Scope**: Search Bar UI, Search Contracts, Search Result Placeholder Views.
- **Explicitly Prohibited**: Firestore Search Queries, Search Indexing, Search Services, Search Optimization, Search Analytics. (Future phases only).

### 9. Notification Framework (Placeholder Only)
Implement the architectural container.
- **Approved Scope**: Notification Bell UI, Unread Badge, Notification Drawer, Notification UI States.
- **Explicitly Prohibited**: Notification Storage, Notification Delivery, Notification Processing, Notification Engine, Realtime Notifications. (Future phases only).

### 10. Quick Actions Framework
Implement global data entry points.
- **Components**: Global "Create" FAB/Button in the Header.
- **Control**: Strictly permission controlled via AccessContext.

### 11. Empty State Framework
Implement a reusable UI component.
- `EmptyStateComponent` (Icon, Message, Primary Action).

### 12. Branding Integration
Link Phase 1C School Configuration to the Shell UI.
- Apply Primary Color, Secondary Color, Logo, and House Colors to the Sidebar and Header elements without redesigning the layouts.

### 13. User Preferences Framework
Implement storage integration for navigation history.
- **Storage Target**: `schools/{schoolId}/users/{uid}/preferences`
- **Management**: Favorites mapping, Last 10 Recently Visited queue.

---

## Files To Create
- `lib/features/platform_shell/domain/registries/module_registry.dart`
- `lib/features/platform_shell/domain/registries/route_registry.dart`
- `lib/features/platform_shell/presentation/layouts/platform_shell_layout.dart`
- `lib/features/platform_shell/presentation/widgets/sidebar_navigation.dart`
- `lib/features/platform_shell/presentation/widgets/global_header.dart`
- `lib/features/platform_shell/presentation/widgets/breadcrumb_trail.dart`
- `lib/features/platform_shell/presentation/widgets/empty_state_component.dart`
- `lib/features/platform_shell/data/repositories/user_preferences_repository_impl.dart`
- `test/features/platform_shell/shell_validation_test.dart`

## Files To Modify
- `lib/core/di/service_locator.dart`
- `lib/core/router/app_router.dart` (Strictly Augmentation)

---

## Testing Strategy & Certification Gates
Before certification can be granted, the following gates must be passed:

**1. Code Quality Gates**
- `flutter analyze` must pass with zero issues.
- `flutter test` must pass (covering Module Registration, Route Registration, Permission Visibility, Favorites, Breadcrumbs, etc.).

**2. Dashboard Visual Verification Gate**
- Confirm: Dashboard Layout remains unchanged.
- Confirm: Dashboard Widgets remain unchanged.
- Confirm: Dashboard UX remains unchanged.
- Confirm: Dashboard Business Logic remains unchanged.

---

## Deliverables
Upon completion of Phase 2A execution, the following must be generated:
1. `EduPulse_Platform_Shell_Compatibility_Assessment.md` *(Must precede execution)*
2. `EduPulse_Platform_Shell_Implementation_Report.md`
3. `EduPulse_Platform_Shell_Runtime_Report.md`
4. `EduPulse_Platform_Navigation_Report.md`
5. `EduPulse_Platform_Shell_Test_Report.md`
6. `EduPulse_Platform_Shell_Architecture_Compliance_Report.md`
7. `EduPulse_Platform_Shell_Rollback_Plan.md` *(Plan to disable integration and restore certified state)*

---
*End of Plan.*
