# EduPulse Runtime Access Implementation Report

## Overview
Phase 1F implements the `AccessContext` and the core `RuntimeAccessGuard` middleware. This capstone phase completes the Access & Tenant Foundation, tying together Authentication, RBAC, User Management, and Route Authorization into a cohesive runtime gatekeeper.

## Domain Layer
- **AccessContext**: The singleton runtime memory model holding the resolved `schoolId`, `userId`, `roleId`, `userLifecycleState`, and flattened `permissions`.
- **RouteAccessPolicy**: A static registry mapping critical application paths to explicit boolean permissions (e.g., `/dashboard` strictly maps to `Dashboard.View`).

## Resolvers & Guards
- **RuntimePermissionResolver**: Serves as the high-speed caching intermediary between the `UserRepository`, `PermissionRepository`, and the router. It forces live resolution on initialization but serves from memory during rapid in-app navigation to save Firestore reads.
- **RuntimeAccessGuard**: The primary routing interceptor. It prioritizes User Lifecycle routing (routing `archived` users to the archived screen, `suspended` to suspension) over standard permission checks, cleanly sealing the application from unprivileged navigation.

## Execution Results
The runtime access middleware has been built and thoroughly unit-tested for redirect behaviors. It is fully ready to be injected into a UI Router (like `GoRouter`) in future frontend implementations without requiring any business logic refactoring.
