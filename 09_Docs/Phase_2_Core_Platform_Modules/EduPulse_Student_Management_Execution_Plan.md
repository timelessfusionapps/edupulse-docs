# Phase 2C — Student Management Execution Plan

## 1. Executive Summary

This Execution Plan defines the structured delivery of the Phase 2C Student Management Module. It ensures that implementation aligns perfectly with the approved `EduPulse_Student_Management_Architecture.md`, `EduPulse_Student_Lifecycle_Governance.md`, and the foundational components from Phase 1 and Phase 2A/2B. 

## 2. Prerequisites Validation

Before implementation begins, ensure the following modules are fully certified and operational:
- **Phase 1D**: Fine-grained RBAC permissions (`Students.Create`, `Students.Graduate`, etc.).
- **Phase 2B**: School Administration (Academic Years, Classes, Sections, Houses must be queryable and structurally sound to accept student assignments).

## 3. Implementation Phasing

### Phase 3.1: Domain Layer Implementation
- **Entities**:
  - Implement `StudentEntity` with immutability guarantees on `studentId`.
  - Implement `StudentAcademicAssignmentEntity`.
  - Implement `StudentLeadershipAssignmentEntity`.
  - Implement lightweight Parent References structure (`isPrimaryContact` included).
- **Enums & States**: Implement `StudentLifecycleState` (Active, Archived, Graduated) and Leadership Roles.
- **Repository Interfaces**: Define `IStudentRepository`, `IStudentAssignmentRepository`, `IStudentImportRepository`.

### Phase 3.2: Validation Framework
- Build `StudentCreationValidator` encompassing duplicate detection logic (Warning-only for Name + DOB matches).
- Build `StudentAssignmentValidator` enforcing active assignment limits and parent reference bounds.
- Build `LeadershipAssignmentValidator` enforcing strict capacity limits (1 Captain/House, 1 Monitor/Class).

### Phase 3.3: Data Layer & Firestore Mapping
- Implement `FirebaseStudentDatasourceImpl` adhering exclusively to `schools/{schoolId}`.
- Map Firestore collections: `students`, `academicAssignments`, `parentReferences`, `leadershipAssignments`.
- Implement Option A Search Indexing: Auto-generate token arrays inside the `searchKeywords` array upon student mutation.

### Phase 3.4: CSV Import Engine
- Implement parsing service.
- Implement Validation Stage rejecting orphaned references (Invalid classes, sections, houses).
- Provide detailed error structures for the Presentation layer to render during the Preview Stage.

### Phase 3.5: State Management (Blocs)
- `StudentProfileBloc`: Handles CRUD, Archive, and Graduate workflows.
- `StudentAssignmentBloc`: Handles academic history progression.
- `StudentImportBloc`: Orchestrates the Preview → Validate → Error → Commit workflow.

### Phase 3.6: Presentation & Scaffolding
- Implement placeholder screens reflecting the workflow architectures.
- Embed the Global Student Search interface with default filtering for "Active" and toggles for "Archived/Graduated".

## 4. RBAC Integration Mapping
The execution strictly enforces the following bounds:
- Creation requires `Students.Create`.
- Archival requires `Students.Archive`.
- Graduation requires `Students.Graduate`.
- Viewing historical assignments requires `Students.ViewHistory`.

## 5. Security & Isolation Constraints
- All Firestore transactions and reads must extract and utilize the `schoolId` root parameter.
- Cross-tenant querying is physically prevented by omitting multi-tenant indices.

## 6. Required Output & Verification

Once implemented, the following must be generated prior to Certification:
1. `EduPulse_Student_Management_Implementation_Report.md`
2. `EduPulse_Student_Management_Runtime_Report.md`
3. `EduPulse_Student_Management_Validation_Report.md`
4. `EduPulse_Student_Management_Import_Engine_Report.md`
5. `EduPulse_Student_Management_Test_Report.md`

*(Note: Certification artifacts are intentionally excluded from this phase and will only be generated post-validation).*
