# EduPulse User Management Runtime Report

## Overview
This document specifies the runtime execution flow established for managing the lifecycle of users in the platform.

## Runtime Lifecycle Flow
The `UserRepositoryImpl` maps closely to the `UserLifecycleState` constants:
1. **Creation**: Admin creates a new user, saving them initially with `created` state.
2. **Password Generation**: Admin triggers `generateTemporaryPassword` which sets the state to `pendingPasswordChange`. Future access guards will interrogate this state and halt navigation until a password mutation is recorded.
3. **Activation**: Upon first successful password change, `forcePasswordChange` executes, transitioning the user permanently to `active`.

## Safe Mutation & Consistency
To maintain tenant safety without stalling operations:
- Every mutation function immediately generates a parallel `RbacAuditEvent` logged straight to `schools/{schoolId}/auditLogs`. This encompasses states like `UserSuspended`, `UserArchived`, `UserRestored`, and distinct password operations (`AdminPasswordReset`, `SelfServicePasswordReset`, `PasswordChanged`).
- A `FirestoreException` interrupts execution instantly if the constraints of the `RoleRepository` are violated (e.g., trying to save a User record containing an invalid or `isArchived` role).
