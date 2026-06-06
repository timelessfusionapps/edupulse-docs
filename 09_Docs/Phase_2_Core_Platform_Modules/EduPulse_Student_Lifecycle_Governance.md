# Phase 2C — Student Lifecycle Governance

## 1. Overview
This document serves as the authoritative rulebook governing the Student Lifecycle within EduPulse. All implementations of Student Management must adhere strictly to these governance policies.

## 2. Lifecycle State Rules
The student state is strictly managed through the following enums:
- **Active**: Currently enrolled and active in the active academic year.
- **Archived**: Withdrawn or removed from active rosters. Hidden by default.
- **Graduated**: Successfully completed the school's highest academic grade.

**Prohibited States**: Suspended, Pending, Deleted, Transferred.
*Student deletion is fundamentally prohibited to protect data integrity.*

### 2.1 Graduation Rules
A student may only transition from `Active` to `Graduated` through an explicit graduation action.
- **Required Permission**: `Students.Graduate`
- **Restrictions**: Graduated students cannot receive new Academic Assignments, nor can they become House Captain, Vice Captain, or Class Monitor.
- **Preservation**: Historical data remains fully accessible.

### 2.2 Archive Permission Governance
Archiving a student requires the explicit `Students.Archive` permission derived from Phase 1D RBAC. No role-name-based authorization is permitted.

## 3. Identity vs. Academic Tracking Governance

### 3.1 Student ID Immutability Governance
- The Student ID is the source of truth for a student's identity.
- It is a permanent identity and is strictly **immutable**.
- Once generated, it cannot be edited, reassigned, or regenerated except through future system-level migration tooling.

### 3.2 Roll Number Governance
- Roll Numbers govern academic tracking.
- Roll Numbers are legally allowed to change between Academic Years.
- They are intrinsically linked to Phase 2B Governance patterns (e.g., sequences tied to Sections like `6A01`).

## 4. History Preservation Rules

### 4.1 Academic & House History
- The system must maintain an unbroken chain of historical academic assignments.
- A student's class, section, and house belonging to an archived academic year must never be mutated or deleted.
- Modifying a student's current house or section generates a destructive update on the current assignment, but historical records remain untouched.

## 5. Parent Reference Rules
- Parent References are strictly structural arrays or subcollections pointing to a student's guardians.
- References track the `isPrimaryContact` flag to distinguish primary vs. secondary contact workflows without requiring Parent Management implementation.

## 6. Leadership Assignment Rules
- Leadership roles (House Captain, Vice Captain, Class Monitor) are optional and bounded by the Academic Year.
- **Leadership Assignment Limits**: Per Academic Year, the limits are strictly enforced as:
  - **One** House Captain per House.
  - **One** Vice Captain per House.
  - **One** Class Monitor per Class.
*(Future expansion may override these limits, but they remain the default architectural rules).*

## 7. Import & Duplicate Governance

### 7.1 CSV Import Validation Rules
- All CSV imports must clear Validation and Preview stages before commit.
- **No Silent Failures**: Invalid references (e.g., invalid Academic Year, Class, Section, or House) must never be silently ignored.
- Rows containing invalid references must be highlighted during Preview, present detailed validation errors, and require correction before Commit.

### 7.2 Duplicate Detection Governance
- **Rule**: If `Name` AND `DOB` match an existing student, throw a Warning.
- **Action**: Do not block creation. The system must render a warning dialogue allowing the administrator to intentionally bypass the warning ("Admin Review & Continue").

## 8. Search & Visibility Governance
- **Default Search Visibility**: Returns `Active` students only.
- **Filters**: Searches must support explicit filters: `Active`, `Archived`, `Graduated`, `All`.
- Archived and Graduated students must be explicitly requested via these filters, remaining hidden by default.

## 9. Future Integration Boundaries
This architecture establishes the hooks required for:
- **Phase 2D/3**: Points and Events mapping (via `studentId` and current `houseId`).
- **Parent Portal**: Account provisioning (via Parent References).
- **Analytics**: Historical progression and cohort tracking (via Academic Assignments).
No direct implementations for these downstream modules are permitted in Phase 2C.
