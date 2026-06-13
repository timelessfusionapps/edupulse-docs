# Phase 2B Academic Assignment Implementation Plan

## Document Name

Phase_2B_Academic_Assignment_Implementation_Plan.md

## Purpose

Implement the Academic Assignment capability that remains an active responsibility of Phase 2B School Administration.

The implementation shall support:

1. Class Teacher Assignments
2. House Master Assignments
3. Academic Year Carry Forward Support

The implementation shall not duplicate functionality already owned by:

- Phase 2C Student Management
- Phase 2G Teacher Participation & Event Governance
- Phase 2H Student Leadership

---

# Feature 1
## Class Teacher Assignment

### Purpose

Assign a teacher to a class for a specific academic year.

Examples:

- Grade 5A → Teacher X
- Grade 7B → Teacher Y

### Requirements

Support:

- Academic Year
- Class
- Section
- Assigned Teacher
- Effective Date
- Active Status
- Assignment History

### Governance

Only one active Class Teacher assignment per Class/Section per Academic Year.

History must be preserved.

Soft Delete only.

---

# Feature 2
## House Master Assignment

### Purpose

Assign a teacher as House Master for a House.

Examples:

- Blue House → Teacher A
- Green House → Teacher B

### Requirements

Support:

- Academic Year
- House
- Assigned Teacher
- Effective Date
- Active Status
- Assignment History

### Governance

Only one active House Master assignment per House per Academic Year.

History must be preserved.

Soft Delete only.

---

# Feature 3
## Academic Year Carry Forward Support

### Purpose

Provide assignment data required by Academic Year closure and carry-forward workflows.

### Requirements

Assignments must remain queryable by:

- Academic Year
- Class
- House
- Teacher

Historical assignments must remain immutable.

---

# Domain Layer

### Entities

- ClassTeacherAssignmentEntity
- HouseMasterAssignmentEntity
- AcademicAssignmentHistoryEntity

### Repository

- AcademicAssignmentRepository

### Validators

- ClassTeacherAssignmentValidator
- HouseMasterAssignmentValidator

### Services

- AcademicAssignmentService
- AcademicYearCarryForwardSupportService

---

# Data Layer

### Datasource

FirebaseAcademicAssignmentDatasource

### Collections

schools/{schoolId}/academic_assignments/

schools/{schoolId}/academic_assignment_history/

### Repository Implementation

AcademicAssignmentRepositoryImpl

Replace all stubbed logic.

Remove:

- throw UnimplementedError()
- async => null
- mock return values

---

# Presentation Layer

### Screens

- Class Teacher Assignment Screen
- House Master Assignment Screen

### Dialogs

- Class Teacher Assignment Dialog
- House Master Assignment Dialog

### State Management

- AcademicAssignmentBloc
- AcademicAssignmentEvent
- AcademicAssignmentState

No placeholders.

No mock data.

No Center(Text()) implementations.

---

# Phase Protection Rules

### Phase 2B Owns

- Class Teacher Assignment
- House Master Assignment
- Assignment History

### Phase 2C Owns

- Student Academic Placement

### Phase 2G Owns

- Event Governance
- Event Managers

### Phase 2H Owns

- Student Leadership

No ownership overlap permitted.

---

# Required Deliverables

- Phase_2B_Academic_Assignment_Implementation_Report.md
- Phase_2B_Academic_Assignment_Runtime_Report.md
- Phase_2B_Academic_Assignment_Test_Report.md
- Phase_2B_Academic_Assignment_Architecture_Compliance_Report.md
- Phase_2B_Academic_Assignment_Governance_Compliance_Report.md

---

# Success Criteria

1. Class Teacher Assignment implemented.
2. House Master Assignment implemented.
3. Carry Forward support implemented.
4. Stub repository removed.
5. Analyzer passes.
6. Tests pass.
7. Assignment history preserved.
8. No overlap with Phases 2C, 2G, or 2H.

## Final Verdict

READY FOR IMPLEMENTATION