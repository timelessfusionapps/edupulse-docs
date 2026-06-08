# Phase 2B — Academic Structure Governance

## 1. Purpose

This document serves as the operational governance guide for School Administration in EduPulse. It defines the strict rules, validations, and ownership structures that govern Academic Years, Classes, Sections, and user assignments, ensuring platform consistency and data integrity.

## 2. Academic Structure Ownership Rules

The platform enforces a strict ownership hierarchy. No child entity can exist without its defined owner in the academic structure.

```text
Academic Year
      ↓
Academic Group (Optional)
      ↓
Class
      ↓
Section (Optional)
```
- **Academic Group Owns Classes**: A Class may belong to an Academic Group. If the Group is deleted, its Classes must either be reassigned or deleted.
- **Class Owns Sections**: A Section cannot exist independently of a Class.
- **Enforcement**: This hierarchy is validated during creation and modification. Orphaned entities are not permitted.

## 3. Academic Year Rules
- **Approved Statuses**: Only `Active` and `Archived` are permitted. (Draft, Pending, and Inactive are not valid).
- **Rule of Exclusivity**: **Only One Academic Year May Be Active** at any given time per school.
- **Activation Flow**: Activating a new Academic Year automatically and immediately archives the current Active Academic Year.
- **Immutability of Dates**: Once an Academic Year is activated, modifying its Start Date and End Date requires super-admin privileges or is restricted to prevent cascading data integrity issues.

## 4. Academic Group Rules
- **Configuration**: Optional, fully configurable by the school (e.g., Primary, Middle, Secondary).
- **Purpose**: Used for broad categorization and filtering across the platform.

## 5. Class Rules
- **Configuration**: Fully configurable without hardcoded naming constraints.
- **Ownership**: Classes must be bound to an Academic Year and can optionally be owned by an Academic Group.

## 6. Section Rules
- **Configuration**: Optional, fully configurable.
- **Automation**: When a Class is created, a default Section (e.g., "A") may be automatically generated.
- **Ownership**: Sections are strictly owned by Classes.

## 7. Term / Semester Rules
- **Configuration**: Subdivisions of an Academic Year. Fully configurable names (e.g., Term 1, Semester 1).
- **Bounds**: The Start Date and End Date of a Term must fall strictly within the bounds of its parent Academic Year.

## 8. Carry Forward Rules
When a New Academic Year is created by copying an existing one:
- **Copied**: Academic Groups, Classes, Sections, Terms.
- **Optional**: Administrator can choose to copy Class Teacher Assignments (YES/NO) and House Master Assignments (YES/NO).
- **Never Copied**: Students, Events, Points, Reports, Announcements.

## 9. Class Teacher Assignment Rules
- **Support**: A Class/Section can have multiple Assigned Teachers.
- **Mandate**: There must be **Exactly One Class Teacher** designated as the administrative owner.
- **Reassignment**: Assigning a new Class Teacher automatically replaces the previous one. No confirmation is required. Audit logs capture the change permanently.

## 10. House Master Assignment Rules
- **Permanent Houses**: Houses are permanent school assets. They are not recreated per Academic Year.
- **Assignments**: House Masters and Optional Co-House Masters are assigned per Academic Year to a permanent House.
- **Reassignment**: Assigning a new House Master automatically replaces the previous one. Audit logs capture the change permanently.

## 11. Roll Number Governance
- **School Roll Number Scheme**: The format of Roll Numbers is configured strictly at the School level (e.g., sequential 1, 2, 3 or prefixed 601, 602, 603).
- **Enforcement**: Roll numbers are applied consistently across all academic assignments. Teachers are not permitted to invent or modify their own numbering patterns.

## 12. Future Dependency Mapping
This governance structure directly supports future modules without requiring redesign:
- **Student Management**: Relies on the exact Academic Year -> Class -> Section hierarchy for assignment.
- **Parent Management**: Inherits the student's validated structural context without additional logic.
- **Events & Points**: Scoped strictly by the Active Academic Year. Class Teachers automatically inherit permission to manage events/points for their Class.
- **Announcements**: Leverages the validated Class -> Section hierarchy to target specific groups.
- **Reports**: Uses Terms to group grading periods and relies on the exactly-one Class Teacher assignment to define the administrative reviewer.
