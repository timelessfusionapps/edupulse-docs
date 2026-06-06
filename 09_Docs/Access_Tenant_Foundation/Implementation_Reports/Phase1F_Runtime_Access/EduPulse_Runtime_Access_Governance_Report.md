# EduPulse Runtime Access Governance Report

## Overview
This document outlines the strict operational constraints imposed on caching and data retrieval within the Runtime layer.

## 1. AccessContext Governance
- **Immutability per Event**: The `AccessContext` is rebuilt completely on refresh rather than patched, avoiding race conditions in permission checking.
- **Tenant Rigidity**: The `schoolId` embedded in the `AccessContext` is the ultimate truth. Manual URL manipulation (`/admin/school_2/students`) is entirely irrelevant because the Repository layer strictly queries using the singleton `schoolId` from the context.

## 2. Cache Refresh Policies
- **Memory Only**: Permissions are cached purely in memory. This circumvents the massive architectural payload limit issues of Firebase Custom Claims.
- **Invalidation**: The UI layer must invoke `resolver.invalidateCache()` upon receiving a Firestore Snapshot indicating a change in the user's document.

## 3. Listener Governance
- **Hard Restriction**: The application must ONLY mount a single persistent Firestore listener at `schools/{schoolId}/users/{uid}`.
- **Prohibited Patterns**: Mounting broad listeners on the Roles or Permissions collections is completely prohibited, as this would generate uncontrolled billable reads. Role updates rely on the `UserEntity` triggering the rebuild, which then executes a single `RoleEntity` fetch.
