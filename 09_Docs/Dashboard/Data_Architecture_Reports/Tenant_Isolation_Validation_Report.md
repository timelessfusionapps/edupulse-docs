# Tenant Isolation Validation Report
Every request requires a `schoolId` provided dynamically via `TenantProvider`. Direct instantiation of IDs inside UI is strictly prohibited. `TenantResolutionException` prevents cross-tenant access.
