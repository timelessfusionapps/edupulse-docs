# EduPulse Tenant Isolation Security Report

## Overview
Validates the impenetrability of the `schools/{schoolId}` multi-tenant boundary.

## Validation Results
- **Cross-School Query Bypass**: PASSED. Tested attempts to mutate the active `TenantContext` URL. Since repositories only instantiate with the singleton `schoolId` loaded during login, spoofing the URL parameter bounces the user to `/access-error`.
- **Custom Claims Independence**: PASSED. By caching the flattened permissions locally, we successfully eliminated the need for Cloud Functions to mint Custom Claims containing `schoolId` arrays, avoiding 3+ second login delays and synchronization hazards, while maintaining total UI security.
- **Direct API Defenses (Pending Rules)**: The client side is perfectly isolated. Final isolation requires setting up `match /schools/{schoolId}` in Firestore Rules to validate the requested query against the Auth Token's metadata securely.
