# Phase 2B — Academic Assignment Foundation

## 1. Purpose

The **Academic Assignment Foundation** defines the critical bridge between **School Administration** (the structural framework of the school) and **Student Management** (the tracking of individual student records). 

This document establishes the architecture for how permanent user entities are mapped to time-bound academic structures, ensuring that user records persist seamlessly across multiple academic years.

## 2. Permanent Entities

The following entities are **permanent**. They are created once and are never recreated, duplicated, or deleted when an Academic Year changes or rolls over.

- **Student**: Represents the core identity and personal details of a learner.
- **Teacher**: Represents the staff member.
- **Parent**: Represents the guardian linked to one or more students.

Their lifecycle exists independently of the Active Academic Year. Only their assignments change over time.

## 3. Student Identification Governance

To maintain tracking integrity across academic years, Student Identification is split into two distinct concepts:

### A. Student ID
- **Example**: `STU000001`
- **Characteristics**:
  - System Generated
  - Unique globally (or per school tenant)
  - Permanent
  - Never Changes
- **Usage**: Used as the primary foreign key in databases, permanent record keeping, parent associations, and alumni tracking.

### B. Roll Number Governance
- **Example**: `1`, `2`, `3` or `601`, `602`
- **Governance Rules**:
  - **School Roll Number Scheme**: Configured at the School level (e.g., sequential vs grade-prefixed).
  - **Applied Consistently**: Must be applied consistently across all academic assignments for that year.
  - **Restrictions**: Teachers must not be able to invent their own numbering patterns.
- **Characteristics**:
  - Academic
  - Class Based
  - Teacher Visible
  - Can Change (typically changes every academic year)

## 4. Academic Assignment Layer

Because Users are permanent, their relationship to the school's structure must be managed through an **Academic Assignment Layer**. Assignments change yearly. Users do not.

### A. Teacher Assignment Layer

Teachers are assigned to Classes/Sections on a per-academic-year basis.

```text
Academic Year
      ↓
Class
      ↓
Assigned Teachers (Many)
      ↓
Class Teacher (Exactly One)
```
- **Assigned Teachers**: Many teachers can be assigned to a Class/Section.
- **Class Teacher**: Exactly one Class Teacher acts as the administrative owner.
- **Support for Future Modules**:
  - **Events & Points**: Enables querying which teachers have default permission to award points or run events for a specific class.
  - **Permissions**: Class Teachers are granted elevated administrative access over their assigned class's data.
  - **Future Reports**: Class Teachers become the default signatories or reviewers for report cards.

### B. Student Assignment Layer

```text
Academic Year
      ↓
Student Assignment (Junction Entity)
      ↓
  - Student Reference (Permanent)
  - Class Reference (Year-bound)
  - Section Reference (Year-bound)
  - House Reference (Permanent asset, assigned for the year)
  - Roll Number (Year-bound, School Scheme enforced)
```

### Firestore Structure Proposal

```typescript
// Student Assignment Collection (Junction Table)
// Stored underneath the Academic Year to heavily isolate yearly enrollments.
schools/{schoolId}/academicYears/{academicYearId}/studentAssignments/{assignmentId}
{
  "studentId": "permanentStudentId", // Reference to the permanent student record
  "classId": "classId", // Reference to the class in this academic year
  "sectionId": "sectionId", // Reference to the section in this academic year
  "houseId": "houseId", // Reference to the permanent house
  "rollNumber": "601", // The student's roll number for this specific year
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
  // Note: Statuses like Transferred, Withdrawn, Enrolled are omitted from Phase 2B 
  // as they belong to future Student Management / ERP workflows.
}

// Teacher Assignment Collection
schools/{schoolId}/academicYears/{academicYearId}/classes/{classId}/teacherAssignments/{assignmentId}
{
  "sectionId": "sectionId", // Optional
  "classTeacherId": "userId", // Exactly One
  "assignedTeacherIds": ["userId1", "userId2"], // Multiple allowed
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## 5. Future Dependency Mapping

The Academic Assignment Foundation guarantees that future modules can be built without redesigning the core architecture:

- **Student Management**: Adding a student simply involves creating the permanent Student record (if new) and generating a `StudentAssignment` for the Active Academic Year.
- **Parent Management**: Parents link to the `studentId`. When a parent opens the app, the system queries the `studentAssignments` for the Active Academic Year to fetch their child's current Class, Section, and Roll Number.
- **Events & Points**: Event rosters and Point ledgers will reference the `assignmentId` or `studentId` combined with the `academicYearId`.
- **Reports**: Report cards will be generated by querying data scoped to the `academicYearId` and associated `studentId`.
- **Announcements**: Broadcasts to "Class 6A" will resolve by finding all `studentAssignments` in the Active Academic Year where `sectionId` matches Class 6A.

## 6. Out Of Scope

The following are explicitly out of scope for this foundation and will be addressed in future phases:
- Admissions, Transferred, Withdrawn, and Enrolled statuses.
- The actual creation and management of Student records.
- Promotion Rules (moving students from one Academic Year's assignments to the next).
- Attendance taking.
- Generating Events, Points, Reports, or Announcements based on these assignments.
