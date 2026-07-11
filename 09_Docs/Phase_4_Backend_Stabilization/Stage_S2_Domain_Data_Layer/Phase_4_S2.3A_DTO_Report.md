# Phase 4 — Stage S2.3A
## DTO Report
**Date:** 2026-07-10

### DTO Standardization

#### 1. School DTO Layer
- **Status:** Organized
- **Action:** Moved existing `SchoolModel` into the canonical `packages/schools/lib/dto/school_model.dart` folder structure.
- **Note:** `SchoolModel` acts functionally as a DTO currently. High-risk renaming to `SchoolDto` is pending S2.3B.

*No brand new DTOs were mass-generated during S2.3A to avoid unreviewed business logic introduction.*

## DTOs Deferred

The following DTOs were intentionally not created to avoid business logic modifications during Low-Risk Implementation.

#### 1. AuthUserDto
- **Name:** AuthUserDto
- **Reason:** Existing serialization logic is embedded directly within Firebase remote data source methods. Extracting it requires business logic separation.
- **Pilot Priority:** 🟢 Pilot Priority
- **Target Stage:** Phase 4 - Stage S2.3B

#### 2. RoleDto
- **Name:** RoleDto
- **Reason:** High-risk model that requires careful extraction of parsing logic from RBAC data sources.
- **Pilot Priority:** 🟢 Pilot Priority
- **Target Stage:** Phase 4 - Stage S2.3B

#### 3. PermissionDto
- **Name:** PermissionDto
- **Reason:** Requires restructuring of RBAC data source serialization.
- **Pilot Priority:** 🟢 Pilot Priority
- **Target Stage:** Phase 4 - Stage S2.3B

#### 4. TenantContextDto
- **Name:** TenantContextDto
- **Reason:** Parsing logic relies heavily on session management and custom exception handling.
- **Pilot Priority:** 🟢 Pilot Priority
- **Target Stage:** Phase 4 - Stage S2.3B
