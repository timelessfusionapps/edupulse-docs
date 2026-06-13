# Platform Shell Deprecation Assessment

## Overview
This assessment evaluates the functionality isolated within `app_shell/` to determine whether its components must be MIGRATED to `platform_shell/` or RETIRED. 

---

## Step 1: Routes Existing Only in `app_shell/`

| Route Name | Purpose | Current Usage | Evidence |
| :--- | :--- | :--- | :--- |
| `/house-pulse` | Entry point for House Pulse feature | Unused | Hardcoded as `NavigationItem` in `AppShellScreen`. Not registered in `app_router.dart`. |
| `/leaderboards` | Entry point for Leaderboards | Unused | Hardcoded as `NavigationItem` in `AppShellScreen`. Not registered in `app_router.dart`. |
| `/analytics` | Entry point for Impact Analytics | Unused | Hardcoded as `NavigationItem` in `AppShellScreen`. Not registered in `app_router.dart`. |
| `/settings` | Entry point for School Settings | Unused | Hardcoded as `NavigationItem` in `AppShellScreen`. Not registered in `app_router.dart`. |
| `/infrastructure-demo` | Demo screen for Connectivity state | Active | Screen defined in `app_shell/presentation/` and registered in `app_router.dart`. |

---

## Step 2: Navigation Components Existing Only in `app_shell/`

- **MobileDrawer:** (`lib/features/app_shell/widgets/mobile_drawer.dart`). Superseded by inline Drawer in `PlatformShellLayout`.
- **ResponsiveShellWrapper:** (`lib/features/app_shell/widgets/responsive_shell_wrapper.dart`). Superseded by `LayoutBuilder` in `PlatformShellLayout`.
- **AppShellBloc:** (`lib/features/app_shell/bloc/`). Manages sidebar state. Superseded by `setState` in `PlatformShellLayout`.
- **BreadcrumbHeader:** (`lib/features/app_shell/widgets/breadcrumb_header.dart`). Superseded by `breadcrumb_trail.dart` in `platform_shell`.
- **NavigationItem Model:** (`lib/features/app_shell/models/navigation_item.dart`). Superseded by `ModuleMetadata` in `platform_shell`.

---

## Step 3: Dashboard Registrations Only in `app_shell/`

- **None.** The primary dashboard routing is mapped globally in `app_router.dart` (`/dashboard`), and `platform_shell` explicitly defines the `Dashboard` menu item inside `sidebar_navigation.dart`.

---

## Step 4: Module Registrations Only in `app_shell/`

`app_shell_screen.dart` contains hardcoded visual representations for features that act as pseudo-module registrations:
- House Pulse (`/house-pulse`)
- Leaderboards (`/leaderboards`)
- Impact Analytics (`/analytics`)
- School Settings (`/settings`)

These do not exist in `ModuleRegistry` within `platform_shell/`. If `app_shell/` is deleted without migrating these definitions, the platform will lose the UX placeholders for these upcoming domains.

---

## Step 5: Component Classification

| Component Name | Location | Purpose | Evidence | Classification | Recommended Action |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Domain Navigation Mappings** | `app_shell_screen.dart` | Links for Analytics, Settings, etc. | `_navItems` array in `app_shell_screen.dart` | **MIGRATE** | Port as `ModuleMetadata` into `ModuleRegistry`. |
| **Infrastructure Demo Screen** | `app_shell/presentation/` | Proof of concept screen | Mapped in `app_router.dart` | **RETIRE** | Code is obsolete testing artifact. |
| **MobileDrawer** | `app_shell/widgets/` | Mobile navigation UI | Replaced by `PlatformShellLayout` | **RETIRE** | Delete. |
| **ResponsiveShellWrapper** | `app_shell/widgets/` | Layout break points | Replaced by `PlatformShellLayout` | **RETIRE** | Delete. |
| **TopNavigationBar** | `app_shell/widgets/` | App bar UI | Replaced by `GlobalHeader` | **RETIRE** | Delete. |
| **SidebarNavigation** | `app_shell/widgets/` | Sidebar UI | Replaced by `platform_shell` Sidebar | **RETIRE** | Delete. |
| **BreadcrumbHeader** | `app_shell/widgets/` | Breadcrumbs UI | Replaced by `BreadcrumbTrail` | **RETIRE** | Delete. |
| **AppShellBloc** | `app_shell/bloc/` | Sidebar State management | Replaced by `setState` in `platform_shell` | **RETIRE** | Delete. |
| **NavigationItem** | `app_shell/models/` | Data model for links | Replaced by `ModuleMetadata` | **RETIRE** | Delete. |

---

## Final Sections

### 1. Migration Candidates
- Placeholder Domain Mappings (House Pulse, Leaderboards, Analytics, Settings).

### 2. Retirement Candidates
- All visual widgets (`TopNavigationBar`, `SidebarNavigation`, `MobileDrawer`, `BreadcrumbHeader`, `ResponsiveShellWrapper`).
- `AppShellBloc` (State, Events).
- `NavigationItem` Model.
- `InfrastructureDemoScreen`.

### 3. Risks
- Deleting `app_shell` outright deletes the structural awareness of Phase 3/4 modules (Analytics, Leaderboards). 

### 4. Integration Impact
- Safely porting the domains into `ModuleRegistry` will immediately populate the active `platform_shell` sidebar with the correct future links, resolving the UI discrepancy.

### 5. Recommendation
Perform the migration of domain placeholders to the `ModuleRegistry`, remove `InfrastructureDemoScreen` from `app_router.dart`, and then safely delete the `app_shell` directory entirely.

---

## Final Output

- **Number of MIGRATE components:** 1 (Domain Navigation Mappings)
- **Number of RETIRE components:** 8
- **Final Verdict:** MIGRATION REQUIRED
