# Phase 2C — Student Management Architecture

## 1. Executive Summary

This document defines the Student Management Architecture for EduPulse. It establishes the foundational student domain layer that will be consumed by all downstream modules (Events, Points, Reports, etc.). The design prioritizes historical preservation, strict tenant isolation (`schools/{schoolId}`), and a robust, permission-driven access model.

## 2. Tenant Isolation & Access Control

### 2.1 Tenant Boundary
All student data is strictly bounded within the `schools/{schoolId}` root collection. The architecture completely prohibits the use of global `tenants/{tenantId}` paths, adhering to Phase 1's Multi-Tenant Data Isolation Architecture.

### 2.2 RBAC Integration
Authorization relies entirely on Phase 1D fine-grained permissions. Role-name checks (e.g., "School Admin") are prohibited.
**Required Permissions:**
- `Students.View`
- `Students.Create`
- `Students.Edit`
- `Students.Archive`
- `Students.Graduate`
- `Students.Import`
- `Students.AssignLeadership`
- `Students.ViewHistory`

## 3. Student Identity & Profile Architecture

### 3.1 Student Identity Model
- **Student ID**: A permanent, school-configurable identifier (e.g., `TEMS-00001`) that never changes throughout the student's lifecycle. It represents identity, not academic placement. **Student ID is strictly immutable**. Once generated, it cannot be edited, reassigned, or regenerated except through future system-level migration tooling.
- **Roll Number Model**: Represents academic tracking (e.g., `601`, `6A01`) derived from Phase 2B. Roll numbers belong to the *Academic Assignment* and will change annually.

### 3.2 Student Profile Structure
**Mandatory Fields:**
- `studentId`
- `rollNumber` (resolved via active assignment)
- `firstName`
- `lastName`
- `gender` (Enum: `Male`, `Female`)
- `dateOfBirth`
- `status` (Enum: `Active`, `Archived`, `Graduated`)

**System Fields:**
- `createdAt`
- `updatedAt`

**Optional Fields:**
- `leavingDate`
- `photoUrl` (Architected for future use; no UI required at this phase).

## 4. Academic & House Assignment Architecture

### 4.1 StudentAcademicAssignmentEntity
Defines the mapping between a student and their structural academic placement.
**Required Fields:**
- `studentId`
- `academicYearId`
- `classId`
- `sectionId`
- `houseId`
- `rollNumber`
- `status`
- `assignedAt`

A student possesses exactly **one active Academic Assignment** at any given time.
- **Hierarchy**: Student → Academic Year → Class → Section.
- **History**: Full academic history is retained permanently (e.g., 2026-27 Class 6A, 2027-28 Class 7A). History deletion is strictly prohibited.

### 4.2 House Assignment
House assignments are coupled to the Academic Assignment via the `houseId` field, preventing accidental permanent House bindings.
- **History**: Retained permanently alongside the Academic Assignment (e.g., 2026-27 Blue, 2027-28 Green).

## 5. Parent Foundation Architecture

Provides a lightweight structural reference linking a student to their guardians. This is a precursor to a full Parent Management module.
- **Relationship Types**: Father, Mother, Guardian, Other.
- **Fields**: Name, Phone, Email, Relationship, `isPrimaryContact`.
- **Enhancement Purpose**: Adding `isPrimaryContact` supports Primary Contact and Secondary Contact workflows without requiring a full Parent Management implementation yet.

## 6. Leadership Assignment Architecture

### 6.1 StudentLeadershipAssignmentEntity
Defines the mapping for optional leadership positions bounded by the Academic Year.
**Required Fields:**
- `studentId`
- `academicYearId`
- `leadershipRole` (Supported Values: `HouseCaptain`, `ViceCaptain`, `ClassMonitor`)
**Additional Fields:**
- `assignedAt`
- `endedAt`

## 7. Student Creation & Import Architecture

### 7.1 Manual Creation & Duplicate Detection
- System implements a **Warning-Only Duplicate Detection**.
- **Trigger**: Exact match on `First Name` + `Last Name` + `Date Of Birth`.
- **Workflow**: Warns the administrator and requires an explicit "Admin Review & Continue" action. It does not hard-block creation.

### 7.2 CSV Bulk Import
The bulk import mechanism is strictly staged:
1. **Preview Stage**: Parses CSV and renders the payload.
2. **Validation Stage**: Flags schema errors and duplicates.
3. **Error Reporting Stage**: Highlights rows needing correction. Invalid references (e.g., invalid Academic Year, Class, Section, House) must never be silently ignored. They must present detailed validation errors and require correction before Commit.
4. **Commit Stage**: Executes the batched creation or update.
*Direct execution without completing the preview stage is prohibited.*

## 8. Student Search Architecture

### 8.1 Search Index Architecture Decision
**Decision: Option A — Embedded search tokens inside Student documents.**
**Rationale:** For standard school scales (1,000–5,000 students per tenant), embedding tokenized arrays (`searchKeywords`) directly within the student document is highly performant and eliminates the write-amplification and synchronization risks associated with a dedicated search index collection. It naturally adheres to the `schools/{schoolId}` boundary natively without dual-collection transaction overhead.

### 8.2 Fields & Visibility
- **Fields Indexed**: Name, Student ID, Roll Number, Class, Section, House.
- **Default Search Visibility**: Returns `Active Students Only`.
- **Explicit Filters Available**: Active, Archived, Graduated, All.

## 9. Archive Behavior
- **Archive-Only Policy**: Student deletion is fundamentally prohibited.
- **Integrity**: Archiving preserves all Academic History, House History, Events, Points, Achievements, and Reports.
- **Visibility**: Archived students are hidden by default across the platform. Explicit `Students.Archive` permission is required to trigger this state.

## 10. Firestore Data Architecture

**Collections (Nested under `schools/{schoolId}`):**
- `students`: Core profile data with embedded search tokens.
- `students/{studentId}/academicAssignments`: Subcollection for historical and active academic/house placements.
- `students/{studentId}/parentReferences`: Subcollection for lightweight guardian data.
- `students/{studentId}/leadershipAssignments`: Subcollection for leadership roles mapped to academic years.

## 11. Exclusions (Out of Scope)
The following are explicitly excluded from this phase:
Attendance, Admissions Workflow, Streams, Promotion Rules, Fees, ERP Features, Timetable, Transport, Hostel, Medical Records, Parent Portal, Event Management, Points Management.
