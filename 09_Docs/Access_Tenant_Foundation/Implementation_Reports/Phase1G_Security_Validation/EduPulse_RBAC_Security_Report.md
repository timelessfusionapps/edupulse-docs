# EduPulse RBAC Security Report

## Overview
Validates the structural protections built into the Roles and Permissions model.

## Validation Results
- **Archived Role Shielding**: PASSED. If a user is assigned an archived role, `PermissionRepository.resolveEffectivePermissions` throws an exception, forcing the `RuntimeAccessGuard` to trap the user in the `/access-error` fallback screen.
- **System Role Tampering**: PASSED. Evaluated the repository-level hardcoded blocks preventing deletion or archiving of core roles like `SchoolAdmin`.
- **Last Admin Protection**: PASSED. Evaluated the exact transaction boundary enforcing that a `SchoolAdmin` role cannot be changed to `Teacher` if they are the final active admin remaining in the tenant.
