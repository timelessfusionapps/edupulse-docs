# EduPulse Authentication Security Report

## Overview
This document details the security enforcements applied in Phase 1B of the EduPulse Authentication module, focusing on credentials, tenant isolation, and forced lifecycle actions.

## Security Enforcements

### 1. Account Creation Policies
- Google Sign-In is configured strictly to authenticate existing users. The `checkUserExistsInTenant` query ensures that users cannot auto-create unauthorized accounts in a specific school's tenant space if they do not already have an admin-provisioned profile inside `schools/{schoolId}/users`.

### 2. Password Policies
- Temporary passwords assigned during teacher onboarding trigger the `requiresPasswordChange` flag.
- The `AuthBloc` intercepts the login sequence and checks `schools/{schoolId}/users/{uid}` for this flag. If true, the system transitions to `AuthPendingPasswordChange`, blocking dashboard access until updated.

### 3. Tenant Boundary Verification
- The authentication layer DOES NOT use global `users` collection queries, as mandated by the multi-tenant architecture. All user profile verification checks include the explicit `schoolId` context path (`schools/{schoolId}/users/{uid}`).

### 4. Exception Mapping
- Firebase Auth exceptions are heavily masked through the `AuthExceptionMapper`. Precise error codes (`user-not-found`, `invalid-credential`) are mapped into unified domain failures like `UserNotFoundFailure` or `InvalidCredentialsFailure`, preventing detailed Firebase internals from leaking into the UI.

### 5. Audit Logging (Foundation)
- An `AuthAuditEvent` contract has been established for tracking security-sensitive operations such as logins, failures, logouts, and password resets. Once the Audit module is fully built, this entity will be hooked into the `AuthBloc` transitions to guarantee complete auditability.
