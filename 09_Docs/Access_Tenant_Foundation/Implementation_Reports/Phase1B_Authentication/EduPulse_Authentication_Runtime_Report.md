# EduPulse Authentication Runtime Report

## Overview
This document covers the runtime integration of the Authentication layer within EduPulse, defining the state machine and flow logic that bridges Authentication with Tenant Context.

## AuthState Machine
The `AuthBloc` manages transitions across the following distinct states:
1. **AuthInitial**: The starting state when the application boots.
2. **AuthAuthenticating**: Indicates that credentials are being verified.
3. **AuthResolvingTenantContext**: After successful authentication, before the tenant profile is completely verified. (Required for smooth UX transition and proper routing).
4. **AuthPendingPasswordChange**: A state signaling that the UI must prompt the user to change a temporary password.
5. **AuthAuthenticated**: The user has been successfully authenticated, context resolved, and has access to the app.
6. **AuthSuspended**: Emitted when the user account or the associated school's tenant is marked as suspended.
7. **AuthFailure**: A terminal/recovery state for failed attempts, containing human-readable error messages mapped from Firebase.

## Session Management
- **Persistent Sessions (Mobile)**: Sessions persist naturally through Firebase Auth until explicitly signed out, revoked, or password changed.
- **Idle Timeout (Web)**: Implemented `WebIdleTimeoutWrapper` which tracks user interactions (pointer events). If 60 minutes pass without activity, it triggers `AuthForcedLogoutEvent`, which clears the `TenantContext` and securely signs the user out.

## Multi-Device Revocation
The system relies on Firebase's underlying token revocation mechanism. When an account is suspended or a password reset occurs globally, the Firebase ID Token becomes invalid. The `AuthBloc` listens to `_authRepository.authStateChanges`; when the stream yields `null` (due to forced token expiry or remote logout), the bloc clears the local context and routes the user back to the login screen.
