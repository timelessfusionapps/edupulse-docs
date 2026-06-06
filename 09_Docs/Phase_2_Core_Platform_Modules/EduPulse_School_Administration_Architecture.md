# Phase 2B — School Administration Architecture

## 1. Architecture Overview

Phase 2B establishes the foundational academic structure of a school prior to the commencement of Student Management. This phase creates the operational framework—Academic Years, Groups, Classes, Sections, Terms, and House Administrations—upon which students, events, points, reports, and parents will eventually depend.

### Key Architectural Principles
- **Principle 1: Academic Year Changes ≠ User Lifecycle Changes**: Students, Teachers, and Parents are permanent records. Only academic assignments (e.g., which class a student is in) change between academic years.
- **Principle 2: School Administration ≠ Student Management**: This phase solely creates the structural framework. It does not manage the students themselves.
- **Principle 3: One Active Academic Year**: Only one Academic Year may be Active at any given time across a school. Activating a new Academic Year automatically archives the currently active one.

## 2. Entity Definitions

### Academic Year
- **Description**: Defines the time bounds for a school year.
- **Attributes**: Name, Start Date, End Date, Status (Active/Archived).
- **Rules**: Only one can be Active. Can be created blank or by copying an existing year (carrying forward structure).

### Academic Groups
- **Description**: Replaces "Grade Structure". Groups classes into broader categories (e.g., Primary, Middle, Secondary; Junior, Senior).
- **Attributes**: Name, Description.
- **Rules**: Fully configurable by the school, optional. **Academic Groups own Classes**.

### Classes
- **Description**: Represents a grade or year level (e.g., Class 1, Year 1).
- **Attributes**: Name, Academic Group Reference (optional).
- **Rules**: Fully configurable, no hardcoded naming. **Classes own Sections**.

### Sections
- **Description**: Subdivisions of a Class (e.g., A, B, C; Alpha, Beta).
- **Attributes**: Name.
- **Rules**: Fully configurable, optional. A default "Section A" may be automatically generated upon Class creation.

### Terms / Semesters
- **Description**: Subdivisions of an Academic Year.
- **Attributes**: Name, Start Date, End Date, Academic Year Reference.
- **Rules**: Fully configurable (e.g., Term 1, Semester 1), no hardcoded naming.

### Houses Administration
- **Description**: Houses are permanent school assets configured in Phase 1C. They do not get recreated every year. Only their assignments (House Masters) change per Academic Year.
- **Rules**: `House ≠ Academic Year`. The House itself remains permanent. Reassignment of House Masters automatically replaces previous assignments with audit logs.

### Class Teacher Assignment
- **Description**: Teachers assigned to manage a specific Class/Section.
- **Rules**: Multiple teachers can be assigned to a Class, but **exactly one** must be the designated Class Teacher (administrative owner).

## 3. Academic Structure Hierarchy Enforcement

The architecture strictly enforces the following ownership hierarchy:

```text
Academic Year
      ↓
Academic Group (Optional)
      ↓
Class
      ↓
Section (Optional)
```
- **Academic Group Owns Classes**
- **Class Owns Sections**
Hierarchy validation is enforced through nested references or subcollections, ensuring a Section cannot exist without a Class, and a Class is bound to a specific Academic Year (and optionally an Academic Group).

## 4. Lifecycle Definitions

### Academic Year Lifecycle
- **Approved Statuses**: `Active` or `Archived` ONLY.
- **Rule**: Only One Academic Year May Be Active.
- **Activation Flow**: Activating a new Academic Year automatically archives the current Active Academic Year.
- **Carry Forward**: When copying an existing year, the system copies Academic Groups, Classes, Sections, Terms. The admin chooses whether to copy Class Teacher Assignments and House Master Assignments. The system **never** copies Students, Events, Points, Reports, or Announcements.

### Assignment Lifecycle
- **Class Teacher & House Master**: Reassignments are destructive updates (replacing the previous owner) but generate a permanent audit log entry for historical tracking.

## 5. Firestore Structure Proposal

```typescript
// All entities exist under the School Tenant Document: schools/{schoolId}

// Permanent Houses Collection
schools/{schoolId}/houses/{houseId}
{
  "name": "Blue House", // Permanent asset
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}

// Academic Years Collection
schools/{schoolId}/academicYears/{academicYearId}
{
  "name": "2024-2025",
  "startDate": "2024-04-01T00:00:00Z",
  "endDate": "2025-03-31T23:59:59Z",
  "status": "Active", // strictly "Active" or "Archived"
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "createdBy": "userId"
}

// Academic Groups Collection
schools/{schoolId}/academicYears/{academicYearId}/academicGroups/{groupId}
{
  "name": "Primary", // Owns classes
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}

// Classes Collection
schools/{schoolId}/academicYears/{academicYearId}/classes/{classId}
{
  "name": "Class 1",
  "academicGroupId": "groupId", // optional owner
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}

// Sections Collection
schools/{schoolId}/academicYears/{academicYearId}/classes/{classId}/sections/{sectionId}
{
  "name": "A", // Owned by Class
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}

// Teacher Assignments (Class Teacher & Assigned Teachers)
schools/{schoolId}/academicYears/{academicYearId}/classes/{classId}/teacherAssignments/{assignmentId}
{
  "sectionId": "sectionId", // Optional, if assigned to a specific section
  "classTeacherId": "userId", // Exactly One
  "assignedTeacherIds": ["userId1", "userId2"], // Multiple allowed
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}

// Terms Collection
schools/{schoolId}/academicYears/{academicYearId}/terms/{termId}
{
  "name": "Term 1",
  "startDate": "2024-04-01T00:00:00Z",
  "endDate": "2024-09-30T23:59:59Z",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}

// House Assignments for the Academic Year
schools/{schoolId}/academicYears/{academicYearId}/houseAssignments/{assignmentId}
{
  "houseId": "houseId", // Reference to schools/{schoolId}/houses/{houseId}
  "primaryHouseMasterId": "userId",
  "coHouseMasterId": "userId", // optional
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}

// Audit Logs Collection
schools/{schoolId}/auditLogs/{logId}
{
  "entityType": "Section",
  "entityId": "sectionId",
  "action": "CLASS_TEACHER_REASSIGNED",
  "previousValue": "oldUserId",
  "newValue": "newUserId",
  "performedBy": "adminUserId",
  "timestamp": "timestamp"
}
```

## 6. Tenant Isolation Considerations

All School Administration entities (Academic Years, Groups, Classes, Sections, Terms, Houses) are scoped strictly under the School document (`schools/{schoolId}`). 
- Querying for active Academic Years, Classes, or Terms requires the `schoolId` parameter via routing/context.
- Security Rules must enforce that users (Admins, Teachers) can only read/write academic structures within their assigned `schoolId`.

## 7. Future Dependency Mapping

This architecture lays the groundwork for subsequent phases without requiring redesign:
- **Student Management**: Students will be assigned to a specific `sectionId` within an `academicYearId` via junction collections.
- **Parent Management**: Parents will link to permanent Student entities; the app will resolve the student's current context by querying assignments for the active `academicYearId`.
- **Events & Points**: Will be scoped to an `academicYearId`. Summaries can be grouped by `termId`, `classId`, or `houseId` relationships.
- **Reports**: Can aggregate data using the defined `termId` boundaries and `classId` structures.

## 8. Out Of Scope

The following features are explicitly out of scope for Phase 2B and belong to later phases:
- Admissions
- Streams
- Promotion Rules
- Attendance
- Student Management
- Parent Management
- Events
- Points
- Announcements
- Reports

## 9. Risks & Assumptions

- **Assumptions**: 
  - The House structures created in Phase 1C are permanent school assets referenced and managed via Assignments per Academic Year in this phase.
  - School Admin users have the appropriate permissions established in Phase 1 to execute these configurations.
- **Risks**:
  - Activating a new Academic Year archiving the old one might lead to accidental data view shifting if not clearly communicated in the UI. Proper prompts, confirmations, and clear UI indicators for "Active Academic Year" are required.

## 10. Recommended Execution Sequence

1. **Academic Year CRUD**: Implement creation, listing, updating, and the Active/Archived toggle logic.
2. **Carry Forward Logic**: Implement the deep copy mechanism for duplicating an Academic Year and its nested subcollections (Groups, Classes, Sections, Terms).
3. **Academic Structure CRUD**: Implement CRUD for Groups, Classes, Sections, and Terms within an Academic Year.
4. **House Assignments**: Implement House Master assignments per Academic Year, referencing permanent Houses.
5. **Class Teacher Assignment**: Implement assignment logic with the constraints (exactly one Class Teacher) and Audit Log generation.
