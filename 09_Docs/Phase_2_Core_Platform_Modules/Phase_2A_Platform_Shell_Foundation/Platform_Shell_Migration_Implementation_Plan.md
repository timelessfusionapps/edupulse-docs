# Platform Shell Migration Implementation Plan

## Overview
This plan details the steps required to safely migrate the remaining domain placeholder definitions from the obsolete `app_shell` into the active `platform_shell`, enabling the complete deprecation of the `app_shell` directory.

## Components to Migrate
- **Domain Navigation Mappings:** The UX placeholders currently hardcoded as `NavigationItem` in `AppShellScreen` for upcoming modules.
  - House Pulse (`/house-pulse`)
  - Leaderboards (`/leaderboards`)
  - Impact Analytics (`/analytics`)
  - School Settings (`/settings`)

## Target Location
- **Registry:** `lib/features/platform_shell/domain/registries/module_registry.dart`
- **Application Startup / Injection:** Where `ModuleRegistry.registerModule` is typically invoked (e.g., `lib/core/di/service_locator.dart` or a dedicated app initializer).

## ModuleRegistry Updates
Create a new initialization function or utilize the existing application bootstrap to register the following `ModuleMetadata` instances:
1. `ModuleMetadata(id: 'house-pulse', displayName: 'House Pulse', icon: Icons.home_outlined, requiredPermission: 'view_house_pulse', displayOrder: 10, category: 'Student Life')`
2. `ModuleMetadata(id: 'leaderboards', displayName: 'Leaderboards', icon: Icons.leaderboard_outlined, requiredPermission: 'view_leaderboards', displayOrder: 20, category: 'Student Life')`
3. `ModuleMetadata(id: 'students', displayName: 'Student Directory', icon: Icons.people_outline, requiredPermission: 'view_students', displayOrder: 30, category: 'Administration')` (If not already mapped).
4. `ModuleMetadata(id: 'analytics', displayName: 'Impact Analytics', icon: Icons.analytics_outlined, requiredPermission: 'view_analytics', displayOrder: 40, category: 'Academics')`
5. `ModuleMetadata(id: 'settings', displayName: 'School Settings', icon: Icons.settings_outlined, requiredPermission: 'manage_school', displayOrder: 50, category: 'Administration')`

## Routing Updates
1. **Remove `InfrastructureDemoScreen`:** Delete `AppRoutes.infrastructureDemo` from `route_names.dart` and remove its `GoRoute` registration from `app_router.dart`.
2. **Remove Unused Imports:** Remove `import '../../features/app_shell/presentation/app_shell_screen.dart';` and `infrastructure_demo_screen.dart` from `app_router.dart`.

## Deletion
Once migrations are in place, recursively delete the `lib/features/app_shell/` and `test/features/app_shell/` directories.

## Testing Requirements
- **Analyzer:** Execute `flutter analyze` to ensure no orphaned imports of `app_shell` exist across the codebase.
- **Unit Tests:** Execute `flutter test` to ensure router and registry functionalities remain intact.
- **Visual Verification:** Run the application to confirm the `platform_shell` sidebar automatically populates the newly registered placeholder modules.

## Governance Requirements
- The migration must preserve the Phase 2A Navigation Governance rule that routes are dynamically controlled by permissions (mapped via `requiredPermission` in `ModuleMetadata`).
- Code must not contain dead features (`app_shell` removal).

## Next Steps
Awaiting authorization to execute this implementation plan.
