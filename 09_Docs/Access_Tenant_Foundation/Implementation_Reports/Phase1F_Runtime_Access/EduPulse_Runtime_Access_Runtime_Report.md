# EduPulse Runtime Access Runtime Report

## Overview
This document specifies the real-time execution flow implemented to safeguard EduPulse routes against unauthorized entry.

## Route Evaluation Flow
The `RuntimeAccessGuard.evaluateRoute` method intercepts every UI navigation event:
1. **Resolution**: `RuntimePermissionResolver` checks its memory cache. If empty or invalid, it fetches the `UserEntity` and the inherited `Permissions` from Firestore synchronously.
2. **Lifecycle Gate**: Checks `userLifecycleState`. 
   - `invited` redirects to `/invitation-acceptance`
   - `created` / `pendingPasswordChange` redirect to `/force-password-change`
   - `locked` redirects to `/account-locked`
   - `suspended` redirects to `/suspension`
   - `archived` redirects to `/archived-account`
3. **Policy Gate**: If the state is `active`, the Guard matches the requested `routePath` against the `RouteAccessPolicy`. If the requisite string permission (e.g., `Students.View`) is missing from the `AccessContext.permissions` array, it forces a redirect to `/unauthorized`.
4. **Resolution Failure**: If the `RoleRepository` throws an error (e.g., the underlying Role was suddenly archived by another Admin), the guard catches the exception and redirects safely to `/access-error`.

## Persistence Integration
Firebase Auth manages the session token, but the Guard effectively neutralizes the token if the user lacks the correct state or permission, perfectly segregating Authentication (Identity) from Authorization (Access).
