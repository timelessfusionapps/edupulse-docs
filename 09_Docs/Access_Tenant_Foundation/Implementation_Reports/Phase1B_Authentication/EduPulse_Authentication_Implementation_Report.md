# EduPulse Authentication Implementation Report

## Overview
Phase 1B - Authentication introduces the core authentication infrastructure using Firebase Authentication. It lays the groundwork for TenantContext integration and establishes the baseline for user session management in EduPulse.

## Domain Layer
- **AuthUserEntity**: Domain entity representing an authenticated user, decoupled from Firebase-specific classes. Includes `uid`, `email`, `emailVerified`, and `providerId`.
- **AuthState**: Added state machine for authentication flows, including `resolvingTenantContext`, `pendingPasswordChange`, `locked`, and `suspended` states.
- **AuthFailures**: Application-specific exceptions mapped from Firebase exceptions, ensuring domain boundary integrity.
- **AuthAuditEvent**: Contract established for logging critical authentication actions such as `loginSuccess`, `loginFailure`, `passwordChanged`, and `forcedLogout`.

## Data Layer
- **AuthenticationDatasource**: Interface defining core auth operations.
- **FirebaseAuthDatasourceImpl**: Implemented Email/Password and Google Sign-In via `firebase_auth` and `google_sign_in`. Added Firestore checks for `requiresPasswordChange` and tenant existence validation.
- **AuthRepositoryImpl**: Wraps the datasource and maps generic Firebase exceptions into domain-specific `AuthFailure` instances using `AuthExceptionMapper`.

## Presentation/Runtime Layer
- **AuthBloc**: Orchestrates the authentication lifecycle. Transitions states from `authenticating` -> `resolvingTenantContext` -> `pendingPasswordChange` or `authenticated`. Emits `AuthSuspended` or `AuthFailure` as appropriate.
- **WebIdleTimeoutWrapper**: Introduced a Flutter web-specific widget listener that detects pointer interactions and enforces a 60-minute idle timeout.

## Key Outcomes
The system can securely authenticate users, check their tenant-specific metadata (such as password resets), and hand over the session to the TenantContextResolver for the next phase of access resolution.
