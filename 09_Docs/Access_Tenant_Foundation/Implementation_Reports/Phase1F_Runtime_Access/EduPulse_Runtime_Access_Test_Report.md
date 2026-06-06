# EduPulse Runtime Access Test Report

## Overview
This report lists the executed validation checks against the Runtime Access layer to verify that routing interception operates flawlessly without Firebase Custom Claims.

## Validation Execution Summary

### 1. Lifecycle Routing Test (Suspension & Archived)
- **Result**: PASSED. Verified that an `active` user navigating to `/dashboard` succeeds, but injecting a `suspended` status forces an immediate intercept string `/suspension`. Crucially, simulating an `archived` user correctly redirected to `/archived-account` instead of throwing an exception or forcing a logout.

### 2. Dashboard Protection & Permission Resolution Test
- **Result**: PASSED. Evaluated the `/dashboard` route for an active user whose resolved permissions array lacked the `Dashboard.View` flag. The Guard flawlessly bounced the request, returning the `/unauthorized` fallback. The exact same user successfully passed the `/students` check because their role resolved the `Students.View` string.

### 3. Archived Role Routing Test
- **Result**: PASSED. Simulated the scenario where an active user attempts navigation but their backend `RoleEntity` has been recently archived (throwing a validation error in the repository layer during resolution). The Guard effectively captured the Exception and returned `/access-error` instead of hard crashing the app.

### 4. Cache Refresh Test
- **Result**: PASSED. Executed sequential calls to `resolver.resolve()`. Verified via Mocktail tracking that the first call executed exactly 1 network read against the `UserRepository`. The second call executed 0 network reads, proving the memory cache intercepted the request. Triggering `invalidateCache()` and re-running the fetch correctly fired exactly 1 new network read.
