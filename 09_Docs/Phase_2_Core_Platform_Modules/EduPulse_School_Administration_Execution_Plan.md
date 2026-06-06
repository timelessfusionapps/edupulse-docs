# Phase 2B — School Administration Execution Plan

## 1. Executive Summary

This document defines the execution plan for Phase 2B of the EduPulse core platform. The implementation will establish the School Administration framework—the structural academic foundation required before Student Management can begin. The execution is strictly constrained to structural configuration and does not include the creation or management of students, parents, or event data.

## 2. Scope

### In Scope
- **Academic Years**: Create, Edit, Activate, Archive, Copy, and Carry Forward structure. Enforcement of "Only One Active Academic Year".
- **Academic Groups**: Create, Edit, Archive (e.g., Primary, Secondary). These are permanent structural definitions at the school level.
- **Classes**: Create, Edit, Archive. Fully configurable naming (e.g., Class 1, Year 1). Bound to a specific Academic Year.
- **Sections**: Create, Edit, Archive. Optional usage, fully configurable, with Default Section A support.
- **Terms / Semesters**: Create, Edit, Archive. Configurable Name, Start Date, End Date bounds.
- **Class Teacher Assignment**: Assign multiple teachers to a class; enforce exactly one Class Teacher.
- **House Administration Integration**: Assign primary and optional co-house masters per academic year to permanent Houses.
- **Academic Year Carry Forward**: Deep copy of academic structure. Optional copy of teacher/house assignments.
- **Academic Assignment Foundation**: Placeholder foundation-level entity defining the assignment architecture required by Phase 2C Student Management.
- **Roll Number Governance**: Configuration of school-level roll number schemes.

### Out of Scope
Explicitly prohibited from this phase:
- Student Management (No student assignment implementation authorized)
- Parent Management
- Events
- Points
- Announcements
- Reports
- Attendance
- Admissions
- Streams
- Promotion Rules

## 3. Architecture & Governance Alignment

The implementation must strictly align with the approved architecture:
- **Phase 1A–1H**: Access & Tenant Foundation
- **Phase 2A**: Platform Shell & Navigation
- **Phase 2B**: School Administration Architecture, Academic Assignment Foundation, and Academic Structure Governance.
- **Tenant Boundary**: All implementation must remain strictly inside `schools/{schoolId}`. The term `tenants/{tenantId}` or any alternative tenancy model is absolutely forbidden.
- **Governance Enforcement**: All validation rules implemented in this phase **must derive directly** from `EduPulse_Academic_Structure_Governance.md`. This is the authoritative source for all rules.

## 4. Domain Layer Plan

### Required Entities
- `AcademicYearEntity`
- `AcademicGroupEntity` (Permanent structure)
- `ClassEntity`
- `SectionEntity`
- `TermEntity`
- `HouseAssignmentEntity`
  - Required fields: `houseId`, `academicYearId`, `houseMasterId`, `coHouseMasterId`.
  - *Note: `House ≠ Academic Year`. The House remains permanent. Only assignments change.*
- `TeacherAssignmentEntity`
- `AcademicAssignmentFoundationEntity` (Placeholder for Phase 2C architecture only)
- `RollNumberSchemeEntity` (School-level configuration, highly extensible)

### Required Value Objects
- `AcademicDateRange` (Start/End dates with bounds validation)
- `AssignmentAuditLog`

### Required Repositories
- `IAcademicYearRepository`
- `IAcademicStructureRepository` (Groups, Classes, Sections, Terms)
- `IAcademicAssignmentRepository` (Teacher and House Masters)

## 5. Data Layer Plan

### Firestore Structure
All paths originate under the strict tenant boundary `schools/{schoolId}`.
- `schools/{schoolId}/academicYears`
- `schools/{schoolId}/academicGroups` (Permanent Structural Definitions)
- `schools/{schoolId}/academicYears/{academicYearId}/classes` (Classes remain Academic-Year Specific)
- `schools/{schoolId}/academicYears/{academicYearId}/classes/{classId}/sections`
- `schools/{schoolId}/academicYears/{academicYearId}/classes/{classId}/teacherAssignments`
- `schools/{schoolId}/academicYears/{academicYearId}/terms`
- `schools/{schoolId}/academicYears/{academicYearId}/houseAssignments`
- `schools/{schoolId}/academicYears/{academicYearId}/academicAssignmentFoundations` (Foundation only placeholder)
- `schools/{schoolId}/houses` (Permanent entities, read-only context in this phase)
- `schools/{schoolId}/settings/rollNumberScheme` (Governance config)

### Implementations
- **Datasource Interfaces**: `ISchoolAdminRemoteDataSource`
- **Datasource Implementations**: `FirestoreSchoolAdminDataSource`
- **Repository Implementations**: Map directly to Domain interfaces using the Firestore datasource.
- **Model Mappings**: Firebase `DocumentSnapshot` to Domain Entities and `toMap` for writes.

### Validation Rules (Data Layer)
- Derived directly from `EduPulse_Academic_Structure_Governance.md`.
- Enforce exactly one active `AcademicYear` using transactional writes.
- Prevent duplicate names for Classes/Sections within the same parent context.

## 6. Presentation Layer Plan

### Blocs
- `AcademicYearBloc` (CRUD, Activation, Carry Forward)
- `AcademicStructureBloc` (Groups, Classes, Sections, Terms)
- `TeacherAssignmentBloc`
- `HouseAssignmentBloc`
- `RollNumberGovernanceBloc`

### States & Events
- Standard `Loading`, `Loaded`, `Error` states.
- Specific events for `ActivateYear`, `InitiateCarryForward`, `AssignClassTeacher`, etc.

### Screens, Forms, and Workflows
- **Screens**: Academic Year List, Academic Structure Dashboard.
- **Forms**: Create/Edit Year, Term, Group, Class, Section.
- **Teacher Replacement Flow**: Assign New Class Teacher -> Automatically Replace Existing Class Teacher -> Audit Log Entry -> Success Notification (No confirmation dialog required).
- **Navigation Paths**: Integrated into the Phase 2A Platform Shell routing.

## 7. Runtime Integration Plan

- **TenantContext Integration**: Ensure every repository call is injected with the resolved `schoolId` from the active context.
- **AccessContext Integration**: Verify the user's active session is valid before structure modifications.
- **RBAC Integration**: Route protection and UI conditional rendering ensuring only users with `Admin` or specific `SchoolAdmin` roles can execute Academic Structure mutations.
- **Audit Logging**: Generate structured logs for Class Teacher and House Master replacements, writing to `schools/{schoolId}/auditLogs`.

## 8. Validation Strategy

The execution must implement validation layers derived strictly from `EduPulse_Academic_Structure_Governance.md`:
- **Single Active Academic Year**: Prevent activation if constraints fail.
- **Duplicate Constraints**: Block duplicate Class Names globally per year, and duplicate Section Names within a Class.
- **Invalid Links**: Prevent assigning a Class to a non-existent Academic Group.
- **Teacher/House Master Assignments**: Ensure the target users exist and hold the `Teacher` role. Enforce the "Exactly One Class Teacher" rule.
- **Carry Forward Integrity**: Ensure all nested collections are copied correctly and transactional failure rolls back the entire copy operation.
- **Roll Number Governance**: Extensible string scheme enforced uniformly across the school (e.g., 601, 001, 6A01). Teachers cannot invent schemes.

## 9. Testing Strategy

- **Domain Tests**: Unit tests for Entity logic and Value Objects.
- **Repository Tests**: Mocking Firestore to ensure correct path generation (`schools/{schoolId}`) and data mapping.
- **Bloc Tests**: Testing state emission for CRUD and complex flows (Carry Forward, Activation).
- **Validation Tests**: Ensure bounds checking, uniqueness, and hierarchy constraints function.
- **Tenant Isolation Tests**: Ensure it is impossible to read/write outside the injected `schoolId`.
- **RBAC Permission Tests**: Ensure non-admins cannot mutate the structure.
- **Carry Forward Tests**: Thorough unit/integration tests for the deep-copy logic.

## 10. Deliverables

Execution of this phase will generate the following required reports:
1. `EduPulse_School_Administration_Implementation_Report.md`
2. `EduPulse_School_Administration_Runtime_Report.md`
3. `EduPulse_Academic_Assignment_Report.md`
4. `EduPulse_Academic_Structure_Governance_Compliance_Report.md`
5. `EduPulse_School_Administration_Test_Report.md`
6. `EduPulse_School_Administration_Architecture_Compliance_Report.md`
7. `EduPulse_Academic_Year_Carry_Forward_Report.md` (Generated only after implementation and testing)

## 11. Mandatory Compatibility Assessment

Before any execution begins, the system must generate:
`EduPulse_School_Administration_Compatibility_Assessment.md`

**Purpose**: Identify if the planned implementation affects the existing:
- Dashboard
- Dashboard Widgets
- Dashboard Repositories
- Dashboard Routing
- Platform Shell
- Authentication
- RBAC
- Runtime Access
- School Configuration

**Condition**: If risks are identified, **Execution Must Stop**, the Assessment Must Be Presented, and **User Approval Required** before implementation may continue.

## 12. Risks & Assumptions

- **Assumptions**: The Phase 1 Access/Tenant configuration reliably provides the `schoolId`. Roles and permissions established in Phase 1 are stable and accessible.
- **Risks**: The "Carry Forward" deep copy operation could hit Firestore batch limits if a school's structure is exceptionally large. Chunked batch writes may need to be implemented.

## 13. Recommended Execution Sequence

1. **Mandatory Step**: Generate Compatibility Assessment & Secure Approval.
2. **Domain & Data Foundation**: Implement Entities, Models, Repositories, and basic CRUD for Academic Years and permanent Academic Groups.
3. **Hierarchy Foundation**: Implement Classes, Sections, and Terms within Academic Years.
4. **Assignment Integration**: Implement Class Teacher and House Master Assignments (integrating Phase 1C House definitions).
5. **Advanced Flows**: Implement Academic Year Activation logic and Carry Forward deep copy.
6. **Governance**: Implement Roll Number Governance logic and Foundation Entities.
7. **Presentation & UI**: Build out Blocs, Screens, Forms, and connect to Platform Shell navigation.
8. **Testing & Validation**: Complete testing suite and generate final deliverables.
