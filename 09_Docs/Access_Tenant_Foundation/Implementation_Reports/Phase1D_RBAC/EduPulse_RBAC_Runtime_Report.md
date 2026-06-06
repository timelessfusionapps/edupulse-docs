# EduPulse RBAC Runtime Report

## Overview
This document specifies the runtime execution and validation flow for the RBAC Foundation logic.

## Runtime State Flow
1. **Tenant Isolation**: When initializing roles, `FirebaseRoleDatasourceImpl` permanently restricts all path access patterns to `schools/{schoolId}`. Accidental leakage is blocked at the datasource boundaries.
2. **Permission Flattening**: When checking user capabilities, the system leverages `PermissionRepositoryImpl.resolveEffectivePermissions`. The repository dynamically queries up the hierarchy (restricted to 1 parent).
3. **Union Resolution**: It performs a boolean Union between the child permissions and the parent permissions, yielding a flattened array of explicitly granted capabilities.

## Mutation Runtime & Auditing
- Real-time role modifications successfully pass through the `RoleRepositoryImpl`.
- Immediately upon mutation (Create, Update, Archive), an `RbacAuditEvent` is instantiated.
- The audit payload is committed adjacently to `schools/{schoolId}/auditLogs` in the same execution cycle, guaranteeing traceability without modifying legacy schemas.
