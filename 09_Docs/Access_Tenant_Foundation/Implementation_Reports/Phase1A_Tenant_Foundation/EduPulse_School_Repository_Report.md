# EduPulse School Repository Report

## Overview
The `SchoolRepository` forms the domain boundary between the UI/Bloc layer and the Firebase backend for school operations.

## TenantContext Enforcement
The repository strictly enforces Tenant Isolation logic at the class level:

```dart
final context = tenantContextService.currentContext;

if (context.schoolId != schoolId) {
  throw const TenantResolutionException('Cross-tenant access is strictly prohibited.');
}
```

This prevents any UI spoofing from succeeding. If a teacher from School A manipulates the UI state to request School B's dashboard, the repository checks the requested ID against the authenticated context and hard-fails.

## Offline First & Metadata
It adheres to the exact same rigorous metadata architecture established in the Student module, utilizing `RepositoryResponseState.offlineCached` and `RepositoryResponseState.success` so the UI knows if it is viewing fresh server data or cached offline data.
