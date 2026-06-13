# Platform Shell Migration Pre-Flight Report

## Verification Checklist
- Target Directories Validated: Yes
- Absolute Paths Confirmed: 
  - `/Users/murtazasulaihi/Developer/EduPulse/apps/admin_app/lib/features/app_shell/`
  - `/Users/murtazasulaihi/Developer/EduPulse/apps/admin_app/lib/features/platform_shell/`
- No nested paths (`apps/admin_app/apps/admin_app/`) were detected.
- Source and Target Shell Directories Exist: Yes.

## Governance Override Check
As mandated by the execution rules, we checked the navigation domains proposed for migration:
- **House Pulse:** No active screen, route, or permission mapping. Status: **DEFERRED**.
- **Leaderboards:** No active screen, route, or permission mapping. Status: **DEFERRED**.
- **Impact Analytics:** No active screen, route, or permission mapping. Status: **DEFERRED**.
- **School Settings:** No active screen, route, or permission mapping. Status: **DEFERRED**.

Since ALL pending migration candidates are now classified as DEFERRED under the Governance Override, the migration scope is effectively reduced to cleaning up `app_shell` references, `route_names`, `app_router`, and subsequently removing the `app_shell` directory safely.

## Files Scheduled for Modification
- `lib/core/router/app_router.dart` (Remove `app_shell` and `infrastructure_demo` imports and routes)
- `lib/core/router/route_names.dart` (Remove `infrastructureDemo` string)
- Deletion of `lib/features/app_shell/`
- Deletion of `test/features/app_shell/` (if present)
