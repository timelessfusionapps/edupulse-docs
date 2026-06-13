# Platform Shell Consolidation Assessment

## Objective
Assess the current state of UI Shell implementations (`app_shell` vs `platform_shell`) to determine their status, overlap, and integration risks.

## Investigation Findings

### 1. Shell Authoritativeness and Usage
- **Actively Used Shell:** `platform_shell`. 
  - **Evidence:** Inspection of `lib/core/router/app_router.dart` shows that `PlatformShellLayout` is the actively invoked `builder` within the global `ShellRoute`. 
- **Orphaned / Secondary Shell:** `app_shell`.
  - **Evidence:** `AppShellScreen` is defined in `lib/features/app_shell/presentation/app_shell_screen.dart` and imported into `app_router.dart`, but it is completely unused.

### 2. Ownership of Responsibilities
- **Routing:** Handled globally by `lib/core/router/app_router.dart` using GoRouter. Neither shell owns the route definition map.
- **Navigation (UI):** 
  - `platform_shell` actively renders the UI for navigation (Sidebar/Header). It fetches dynamic modules from `ModuleRegistry.getModules()`.
  - `app_shell` has hardcoded `NavigationItem` configurations (House Pulse, Leaderboards, etc.) but is completely inactive.
- **Authentication:** Handled globally by `AuthBloc` (`lib/features/auth/bloc/auth_bloc.dart`). The `app_router.dart` `redirect` callback performs AuthGuarding. Neither shell owns Auth logic.
- **Authorization:** `platform_shell` contains conceptual hooks (`ModuleRegistry`) for access-based UI filtering, but actual authorization enforcement is handled outside the shells.
- **Dashboard Entry Points:** The dashboard screen (`DashboardScreen`) is rendered as a child of the `platform_shell` via `GoRouter`.

### 3. Duplicate Responsibilities
Significant code duplication exists between the two directories:
- **Sidebars:** `platform_shell/presentation/widgets/sidebar_navigation.dart` vs `app_shell/widgets/sidebar_navigation.dart`.
- **Top Headers:** `platform_shell/widgets/global_header.dart` vs `app_shell/widgets/top_navigation_bar.dart`.
- **State Management:** `app_shell` contains an active `AppShellBloc` for toggling the sidebar, while `platform_shell` manages expansion via localized `setState` in `PlatformShellLayout`.

### 4. Integration Risks
- **Divergent Feature Sets:** `app_shell` contains domain-specific routes (e.g., `/house-pulse`, `/leaderboards`) that are not present in the dynamic `platform_shell` registry. Deleting `app_shell` without porting these links to the `ModuleRegistry` will result in unreachable features once those features are built.
- **State Management Conflict:** `app_shell` utilizes BLoC (`AppShellBloc`), whereas the active `platform_shell` utilizes ephemeral `setState`. Merging these might disrupt state consistency if child widgets expect a global shell state.

## Conclusion

### Authoritative Shell
`platform_shell`

### Secondary Shell
`app_shell` (Orphaned / Unused)

### Duplicate Components
- Sidebar Navigations
- Top Headers
- Layout Wrappers

### Integration Risks
- Loss of hardcoded navigation targets present in `app_shell`.
- Architectural conflict between BLoC (App Shell) and Ephemeral State (Platform Shell).

### Recommended Path
Deprecate `app_shell`. Migrate any unique domain routes (e.g., House Pulse, Impact Analytics) into the `ModuleRegistry` so they populate within the `platform_shell`, and establish a standard global UI state approach to unify layout behaviors before archiving `app_shell`.
