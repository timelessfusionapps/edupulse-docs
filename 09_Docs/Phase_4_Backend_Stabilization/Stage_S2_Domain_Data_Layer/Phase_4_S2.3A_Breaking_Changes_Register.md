# Phase 4 — Stage S2.3A
## Breaking Changes Register
**Date:** 2026-07-10

### Breaking Changes Encountered
**None.**

As per the S2.3A execution contract, only Low-Risk modifications were performed. No architectural behaviors, repository interfaces, or entity ownership models were redesigned. No un-documented breaking changes were introduced to the platform.

## Breaking Changes Avoided

The following high-risk changes were intentionally postponed during S2.3A to avoid breaking functionality:

- **Renaming `AuthUserEntity` to `AuthUser`:** This model is referenced across 17 files, including critical Firebase auth datasources and repository implementations. A simultaneous rename without careful import mapping and DTO separation could break core authentication.
- **Renaming `RoleEntity` to `Role`:** Highly coupled (13 references) with the RBAC repository. Changing the canonical model requires updating all downstream permission checks simultaneously.
- **Renaming `PermissionEntity` to `Permission`:** Same risk profile as `RoleEntity` due to dependencies in the RBAC validation layer.
- **Renaming `SchoolEntity` to `School`:** Integrated deeply into `SchoolRepositoryImpl` and `SchoolModel`. Renaming requires careful orchestration of DTO boundaries first.
- **Converting `SchoolModel` to `SchoolDto`:** This class acts as both a Model and DTO with heavy usage in the Firestore datasource layer (7 references). Direct renaming to DTO without mapper verification was avoided.
