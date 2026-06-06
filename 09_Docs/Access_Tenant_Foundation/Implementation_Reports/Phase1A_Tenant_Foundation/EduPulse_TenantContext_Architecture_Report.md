# EduPulse TenantContext Architecture Report

## Purpose
This document explains the runtime operation of the newly implemented `TenantContext`.

## The `TenantContext` Object
`TenantContext` operates as the definitive source of truth for the active session. It contains:
- `schoolId` (Mandatory isolation boundary)
- `schoolCode`
- `userId`
- `roleId`
- `permissions` (List of allowed Module.Action operations)

## The Resolution Service
`TenantContextResolver` implements `TenantContextService`.

### Strict Initialization
If an empty `TenantContext` is injected, the service immediately throws a `TenantResolutionException`. The application is mathematically prevented from executing without a tenant boundary.

### Stream Architecture
It exposes a `Stream<TenantContext> onContextUpdated` which allows future Blocs (like Dashboard and Students) to seamlessly rebuild themselves dynamically when permissions or roles change, eliminating the need to force-logout the user for minor role adjustments.
