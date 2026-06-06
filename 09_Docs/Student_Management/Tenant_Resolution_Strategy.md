# Tenant Resolution Strategy

## Separation of Concerns
The Datasource does not know about tenants. The Bloc should not be burdened with injecting tenants into every call.

## The Injection Point
The `StudentRepositoryImpl` constructor accepts a `TenantProvider`. 
Before calling the Datasource, it invokes `tenantProvider.currentSchoolId`.

## Safety Fallback
If the user's session expires or the provider returns an empty string, the Repository halts execution immediately and throws `TenantResolutionException`. This is mathematically safer than allowing an empty string to hit Firestore, which could either result in an invalid path error or worse, an accidental cross-tenant collection group query.
