# EduPulse RBAC Implementation Report

## Overview
Phase 1D implements the foundational elements of Role-Based Access Control (RBAC) into the administrative backend of EduPulse, preparing the system for robust permission-based routing.

## Domain Layer
- **RoleEntity**: Base model representing both protected System Roles (e.g., School Admin) and dynamic Custom Roles. Added limits explicitly enforcing a maximum of 1 Parent Role.
- **PermissionEntity**: Defines action-level granularity using the `<Module>.<Action>` convention.
- **PermissionGroupEntity**: Logically categorizes permissions for UI simplification.
- **RbacAuditEvent**: Data contract wrapping RBAC state transitions to ensure immutable historical compliance tracking.

## Data Layer
- **RoleDatasource / FirebaseRoleDatasourceImpl**: Interacts directly with `schools/{schoolId}/roles` and `schools/{schoolId}/auditLogs`. Implements protections prohibiting archival or mutation of protected system constants.
- **RoleRepositoryImpl**: Coordinates safe writes to Firestore and auto-triggers `RbacAuditEvent` logs asynchronously.
- **PermissionDatasource / StaticPermissionDatasourceImpl**: Statically provisions the exact permission definitions validated in the execution plan to prevent string malformations.
- **PermissionRepositoryImpl**: Implements dependency validation matrices (e.g. `ApprovePointChanges` requiring `ViewPointHistory`) and dynamically resolves nested permissions `Union(Child, Parent)`.

## Execution Results
The foundation is fully built and deployed within the DI lifecycle. No UI interfaces or routing interceptors were injected, perfectly isolating the scope as planned.
