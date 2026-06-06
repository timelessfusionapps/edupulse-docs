# EduPulse App Shell Foundation (V1)

## Overview
This document outlines the architecture, philosophy, and technical implementation details of the App Shell Foundation for the EduPulse `admin_app`. The App Shell serves as the primary structural container and navigation backbone for the entire application, ensuring a consistent, responsive, and scalable user experience across all devices.

## 1. Core Concepts and Philosophy

### App Shell Responsibilities
The App Shell is responsible for:
- Providing the persistent global layout (sidebar, top bar, navigation).
- Managing top-level navigation state and dynamic route resolution.
- Ensuring a cohesive responsive layout system across Mobile, Tablet, and Desktop breakpoints.
- Hosting all distinct feature modules as nested content layers without requiring them to handle their own global navigation UI.

### Shell Architecture Philosophy
The architecture is strictly "feature-first." The `app_shell` is treated as a foundational feature module itself. It knows how to layout navigation items and provide structural scaffolding, but it is agnostic to the business logic of the child modules it hosts (e.g., Students, Rewards, Settings). This guarantees that new modules can be plugged into the shell without modifying its core layout engine.

### Why App Shell Before Authentication?
Implementing the App Shell before Authentication establishes a stable, accessible structural environment to build and test the core UI/UX immediately. This decoupled approach allows parallel development of complex, responsive UI states without being artificially blocked by backend auth integration or session management state machines. Once Authentication is ready, it will simply guard the shell and inject user claims to drive the shell's configuration.

## 2. Navigation and Routing Architecture

### Routing Architecture
We utilize a declarative, path-based routing strategy enforcing strong typing over string-based literals using `AppRoutes`. This minimizes routing errors and ensures a single source of truth for the application's navigation map.

### go_router Shell Structure
We rely on `go_router` and its `ShellRoute` capability. 
The `ShellRoute` wraps all primary application routes with the `AppShellScreen`. When navigating between features (e.g., `/dashboard` to `/students`), `go_router` dynamically swaps the nested `child` widget inside the persistent `AppShellScreen` container. This preserves the navigation UI state, preventing unnecessary rebuilds and jarring transitions.

## 3. Responsive Layout Strategy

The application adopts a robust, breakpoint-driven responsive strategy to cater to a diverse array of device forms.

### Responsive Breakpoints Integration
Breakpoints are sourced from our single source of truth: `AppBreakpoints` (`lib/theme/tokens/app_breakpoints.dart`).
- **Mobile:** `< 600px`
- **Tablet:** `600px - 1199px`
- **Desktop:** `>= 1200px`

### Desktop/Tablet/Mobile Behavior
- **Desktop (`>= 1200px`)**: Displays a persistent, togglable `SidebarNavigation`. The `TopNavigationBar` manages contextual actions.
- **Tablet (`600px - 1199px`)**: Displays a persistent, slimline `SidebarNavigation` (showing only icons) to maximize horizontal real estate.
- **Mobile (`< 600px`)**: Hides the sidebar completely, utilizing a `MobileDrawer` accessible via a hamburger menu in the `TopNavigationBar`.

### Responsive Shell Scaffolding & Wrapper Widgets
The `ResponsiveShellWrapper` widget observes the current constraints (via `LayoutBuilder`) and seamlessly swaps out the `Scaffold` configurations for Mobile, Tablet, and Desktop layouts, ensuring fluid transitions during window resizes.

## 4. UI Components

### Sidebar Navigation System
The `SidebarNavigation` component is an animated, data-driven side panel. It ingests a list of `NavigationItem` models and renders them. It supports an expanded and collapsed state (controlled globally) and highlights the active route by matching the current URL path against its items.

### Mobile Drawer System
The `MobileDrawer` provides equivalent navigational capability on constrained screens. It automatically closes upon selection and relies on standard Material drawer mechanics.

### Top Navigation Bar System
The `TopNavigationBar` provides a unified horizontal header containing global actions (notifications, profile). On mobile, it automatically surfaces the `IconButton` to trigger the `MobileDrawer`. On desktop, it triggers the expansion/collapse of the sidebar.

### Breadcrumb Architecture
The `BreadcrumbHeader` reads the current `GoRouter` URL segments, automatically generating a hierarchical breadcrumb trail. This provides users with clear contextual orientation regardless of how deep they navigate.

## 5. State Management

### Navigation State Management & AppShellBloc
The App Shell strictly adheres to the BLoC pattern for UI state that falls outside the purview of `go_router`.
`AppShellBloc` is a lightweight state manager responsible for purely UI-driven shell interactions—primarily, the expanded/collapsed state of the desktop sidebar. It exposes `ToggleSidebarEvent` and emits an `AppShellState`. It does *not* manage routing paths; `go_router` remains the sole source of truth for the active URI.

## 6. Architecture & Scalability Considerations

### Folder Structure Organization
The shell components live within `lib/features/app_shell/`, organized into `bloc/`, `models/`, `presentation/`, and `widgets/`. This encapsulation prevents shell-specific UI code from polluting the shared `core` or `theme` folders.

### Scalability Considerations
- **Data-Driven Menus:** The navigation menu relies on `NavigationItem` configurations, making it trivial to add or remove links without touching the UI rendering logic.
- **Pluggable Architecture:** Any new screen created by developers only needs its route registered as a child of the `ShellRoute` to automatically inherit the global layout.

### Future Role-Based Navigation Support
Because the navigation menu is built from a list of `NavigationItem` objects, we can easily filter this list based on user roles (e.g., hiding the "Admin" tab from a standard teacher).

### Future Authenticated Routing Support
The `go_router` setup is prepared to accept a `redirect` handler that will interrogate an `AuthBloc` (once implemented) to protect shell routes, intercepting unauthenticated requests and routing them to a login page.

## 7. Testing & Validation

### Testing Strategy
- **Widget Tests:** Implemented unit tests for the `ResponsiveShellWrapper` directly asserting layout shifts at specific screen sizes by mutating `tester.view.physicalSize`.
- **Routing Tests:** Verified that `AppRouter` successfully inflates the initial dashboard route wrapped in the shell.

### Validation Performed
- Layout behavior verified across Mobile, Tablet, and Desktop dimensions.
- State transitions (Sidebar toggle) validated.
- `flutter analyze` completed with 0 issues.
- `flutter test` executed with a 100% pass rate.

## 8. File Manifest

### Files Created
- `lib/features/app_shell/bloc/app_shell_bloc.dart`
- `lib/features/app_shell/bloc/app_shell_event.dart`
- `lib/features/app_shell/bloc/app_shell_state.dart`
- `lib/features/app_shell/models/navigation_item.dart`
- `lib/features/app_shell/presentation/app_shell_screen.dart`
- `lib/features/app_shell/presentation/demo_dashboard_screen.dart`
- `lib/features/app_shell/widgets/breadcrumb_header.dart`
- `lib/features/app_shell/widgets/mobile_drawer.dart`
- `lib/features/app_shell/widgets/responsive_shell_wrapper.dart`
- `lib/features/app_shell/widgets/sidebar_navigation.dart`
- `lib/features/app_shell/widgets/top_navigation_bar.dart`
- `test/features/app_shell/widgets/responsive_shell_wrapper_test.dart`
- `test/core/router/app_router_test.dart`

### Files Modified
- `lib/main.dart`: Integrated `AppShellBloc` and `MaterialApp.router`.
- `lib/core/router/app_router.dart`: Implemented `ShellRoute` wrapper logic.
- `lib/core/router/route_names.dart`: Added core navigation paths.
- `test/widget_test.dart`: Removed default counter test and cleaned up references.

### Important Reusable Widgets
- **`ResponsiveShellWrapper`**: The core driver for responsive layout swapping.
- **`SidebarNavigation`**: The primary UI interface for desktop/tablet routing.

### Important Route Structures
- `AppRoutes.dashboard` (`/dashboard`) serves as the root entry point for the Shell.
