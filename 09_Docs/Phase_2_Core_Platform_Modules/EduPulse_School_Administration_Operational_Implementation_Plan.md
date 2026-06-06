# Phase 2B — School Administration Operational Implementation Plan

## 1. Executive Summary

This document defines the operational implementation plan for Phase 2B. Building on the established structural foundation (Entities, Models, Repository Interfaces), this plan outlines the remaining backend architecture, business logic, state management, and UI scaffolding required to make the School Administration module operationally functional.

## 2. Remaining Scope

The operational implementation will bridge the gap between structure and functionality by implementing:
- Concrete Repositories and Firestore Datasources.
- Robust validation frameworks deriving rules directly from `EduPulse_Academic_Structure_Governance.md`.
- Core operational engines (Class Teacher Assignments, House Master Assignments, Roll Number Governance).
- The Academic Year Carry Forward Engine.
- State Management (Blocs) and basic UI Scaffolding.

**Out of Scope**: Final UI/UX redesigns, Student Management, Parent Management, Events, Points, Announcements, Reports.

## 3. Repository Implementation Plan

The concrete repositories will integrate domain logic, validation layers, and Firestore mapping.

- **`AcademicYearRepositoryImpl`**:
  - Implements CRUD operations, activation toggle, and archiving.
  - Enforces the `schools/{schoolId}` tenant boundary.
  - Injects `AcademicYearValidator` to ensure "Only One Active Academic Year" is strictly enforced before allowing an activation mutation.

- **`AcademicStructureRepositoryImpl`**:
  - Manages Permanent Groups and Year-bound Classes, Sections, and Terms.
  - Enforces duplicate name prevention and valid Group references during creation.
  - Handles the automatic generation of "Default Section A" upon Class creation.

- **`AcademicAssignmentRepositoryImpl`**:
  - Executes Teacher and House Master assignments.
  - Handles the automatic replacement mechanism for Class Teachers (No confirmation dialog, direct destructive update + audit log).
  - Enforces exactly one Class Teacher and one Primary House Master.

## 4. Datasource Implementation Plan

- **`FirebaseSchoolAdministrationDatasourceImpl`**:
  - **Firestore Reads**: Scoped entirely under `schools/{schoolId}` using `TenantContext`.
  - **Firestore Writes**: Standard document creation and updates for granular entities (Groups, Classes, Sections).
  - **Batch Operations / Transactions**: 
    - Activating an Academic Year requires a transaction to simultaneously set the new year to `Active` and the previously active year to `Archived`.
    - Generating the `AssignmentAuditLog` alongside assignment replacements using batched writes to ensure integrity.

## 5. Validation Plan

A robust validation framework will be implemented. All rules strictly derive from `EduPulse_Academic_Structure_Governance.md`:
- **`AcademicYearValidator`**: Validates date ranges and exclusivity of Active status.
- **`AcademicStructureValidator`**: Validates hierarchy ownership (Classes belong to Groups, Sections to Classes), prevents duplicates, and verifies Term date bounds against parent Academic Year limits.
- **`TeacherAssignmentValidator`**: Ensures exactly one Class Teacher exists per Class/Section assignment and verifies target users hold the `Teacher` role.
- **`HouseAssignmentValidator`**: Validates house assignments against permanent House definitions from Phase 1C.
- **`RollNumberValidator`**: Validates input against the active `RollNumberSchemeService` configuration setup at the school level.

## 6. Carry Forward Plan

- **`AcademicYearCarryForwardService`**:
  - **Source Year Rule**: Can carry forward from *any* selected academic year (Active or Archived).
  - **Structure**: Deep copies Classes, Sections, and Terms. 
  - **Academic Groups**: Permanent assets (`schools/{schoolId}/academicGroups`). They are **NOT** duplicated. The copied Classes will reference the existing permanent groups.
  - **Options**: Administrator toggles for `Copy Class Teachers (YES/NO)` and `Copy House Masters (YES/NO)`.
  - **Strict Exclusions**: Students, Events, Points, Announcements, and Reports will **never** be copied.
  - **Execution**: Utilizes Firestore Batched Writes to ensure atomic failure/success of the entire structural copy.

## 7. Operational Engines & Services

- **Roll Number Governance Engine**: 
  - Implements `RollNumberSchemeService` for school-level configurations.
  - Implements `RollNumberPreviewGenerator` to allow administrators to preview sequences (e.g., `001, 002`, or `6A01, 6A02`) before committing the scheme, preventing misconfigurations.

- **Audit Event Definitions**:
  - `AcademicYearCreated`, `AcademicYearActivated`, `AcademicYearArchived`
  - `AcademicGroupCreated`, `AcademicGroupArchived`
  - `ClassCreated`, `ClassArchived`
  - `SectionCreated`, `SectionArchived`
  - `TermCreated`, `TermArchived`
  - `ClassTeacherAssigned`, `ClassTeacherReplaced`
  - `HouseMasterAssigned`, `HouseMasterReplaced`
  - `CarryForwardExecuted`

## 8. Bloc Plan

State management will be implemented via BLoC to handle complex business logic streams:
- **`SchoolAdministrationBloc`**: Top-level orchestration and routing state.
- **`AcademicYearBloc`**: Handles `CreateYear`, `ActivateYear`, `ArchiveYear`, and `InitiateCarryForward` events.
- **`AcademicStructureBloc`**: Handles nested CRUD for Groups, Classes, Sections, and Terms.
- **`TeacherAssignmentBloc`**: Emits loading/success/error states for automatic teacher replacement flows.
- **`HouseAssignmentBloc`**: Emits loading/success/error states for house master configurations.

## 9. UI Scaffolding & Preservation Plan

Because this phase is strictly backend architecture and operational logic, UI implementation is strictly limited to scaffolding.
**Explicit Preservations**:
- **Placeholder UI Only**: No UI Redesign, No Theme Changes.
- **Dashboard Preserved**: No Dashboard Layout Changes, No Widget Changes.
- **Shell Preserved**: No Platform Shell Modifications, No Navigation Restructuring.
- **Forms**: Raw input forms mapped to Blocs for entity creation and validation.

## 10. RBAC Integration

Access decisions are strictly **Permission-Based** derived from Phase 1D. Implementation checks will evaluate:
- `SchoolAdministration.View`
- `SchoolAdministration.Create`
- `SchoolAdministration.Edit`
- `SchoolAdministration.Archive`
- `SchoolAdministration.CarryForward`
Role-name checks (`School Admin`, `Super Admin`) will **NOT** be used for implementation authorization.

## 11. Testing Plan

Comprehensive automated testing to guarantee operational stability before UI integration:
- **Repository Tests**: Mocking `FirebaseSchoolAdministrationDatasourceImpl` to ensure correct data mapping and tenant injection.
- **Datasource Tests**: Verifying Firestore path construction and transaction logic.
- **Validation Tests**: Unit testing all validators against the Governance document rules.
- **Carry Forward Tests**: Validating deep copy integrity, group reference preservation, and strict exclusion of out-of-scope entities.
- **Tenant Isolation Tests**: Assuring `schoolId` bounds cannot be bypassed.
- **RBAC Tests**: Guaranteeing mutation operations are rejected without proper `SchoolAdministration.*` permissions.
- **Bloc Tests**: Testing event-to-state mappings for complex flows like year activation and assignment replacement.

## 12. Certification Preparation

After successful implementation and testing, the following **POST-IMPLEMENTATION CERTIFICATION ARTIFACTS** will be generated:
- `EduPulse_School_Administration_Certification.md`
- `EduPulse_Academic_Year_Carry_Forward_Report.md`

## 13. Recommended Execution Sequence

1. **Validation Engine**: Implement the `AcademicStructureValidator` and associated validators based on Governance rules.
2. **Datasource Implementation**: Build `FirebaseSchoolAdministrationDatasourceImpl` with transactions and batching.
3. **Repository Integration**: Implement concrete repositories wrapping the datasource and injecting the validators.
4. **Core Engines**: Build `AcademicYearCarryForwardService`, `RollNumberSchemeService`, and `RollNumberPreviewGenerator`.
5. **State Management**: Implement Blocs and map to Repository futures.
6. **UI Scaffolding**: Build functional placeholder screens and connect routes.
7. **Testing**: Execute full test suite across the operational layer.
8. **Reporting**: Generate required implementation, runtime, assignment, and governance compliance reports.
