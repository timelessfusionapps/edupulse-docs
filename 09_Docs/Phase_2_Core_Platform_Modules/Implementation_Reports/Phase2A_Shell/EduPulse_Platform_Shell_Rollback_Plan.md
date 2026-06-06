# EduPulse Platform Shell Rollback Plan

## Purpose
In the event that the Phase 2A Platform Shell integration introduces catastrophic side-effects in production (e.g., rendering issues, routing loops), this document outlines the exact procedure to safely rollback the application to its certified Phase 1 state.

## Rollback Procedure

1. **Revert Router Augmentation**
   Modify `apps/admin_app/lib/core/router/app_router.dart`:
   - Locate the `ShellRoute`.
   - Change `builder: (context, state, child) => PlatformShellLayout(child: child);`
   - Back to the certified Phase 1 version: `builder: (context, state, child) => AppShellScreen(child: child);`

2. **Clean up Imports**
   - Remove `import '../../features/platform_shell/presentation/layouts/platform_shell_layout.dart';` from `app_router.dart`.

3. **Verify Restoration**
   - The original `AppShellScreen` (Phase 1) contains hardcoded navigation and basic layout styling.
   - Run `flutter analyze` to ensure no dangling dependencies remain.
   - The Dashboard will instantly revert to its prior visual wrapper layout, entirely severing Phase 2A from the render tree.
