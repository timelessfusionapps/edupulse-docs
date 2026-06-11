# EduPulse Student Clubs, Councils & Advanced Leadership Execution Plan

## Document Information

| Field | Value |
|---------|---------|
| Module | Phase 2H – Student Clubs, Councils & Advanced Leadership |
| Platform | EduPulse |
| Document Type | Execution Plan |
| Version | 1.0 |
| Status | Approved for Compatibility Assessment |
| Depends On | Phase 2B, Phase 2C, Phase 2D, Phase 2F, Phase 2G |
| Architecture Reference | EduPulse_Student_Clubs_Councils_Advanced_Leadership_Architecture.md |
| Governance Reference | EduPulse_Student_Clubs_Councils_Advanced_Leadership_Governance.md |

---

# 1. Purpose

This document converts the approved Phase 2H Architecture and Governance specifications into an implementation-ready execution blueprint.

This document does not authorize coding.

Its purpose is to define:

- Scope
- Deliverables
- File Structure
- Dependencies
- Validation Rules
- Test Requirements
- Compliance Requirements

before Compatibility Assessment and Operational Implementation Planning.

---

# 2. Phase Objective

Phase 2H introduces:

```text
Student Clubs
Student Council
House Prefects
Advanced Leadership
```

while preserving:

```text
House Management
House Governance
Points Engine
Recognition Engine
Teacher Governance
```

already implemented in earlier phases.

---

# 3. Architectural Constraints

## 3.1 Phase 2C Protection

The implementation SHALL NOT modify:

- House Entities
- House Membership
- House Captains
- Vice Captains
- Class Monitors

These remain under Phase 2C.

---

## 3.2 Phase 2E Protection

The implementation SHALL NOT create:

- Club Points
- Club Rankings
- Club Achievements
- Club Leaderboards

The Points Engine remains unchanged.

---

## 3.3 Phase 2G Protection

The implementation SHALL NOT modify:

- Event Governance
- Event Managers
- Delegation Logic
- Governance Audits

These remain under Phase 2G.

---

# 4. Functional Deliverables

## 4.1 Club Management

Support:

- Club Creation
- Club Editing
- Club Archiving
- Club Categories
- Club Coordinators
- Club Membership

---

## 4.2 Club Membership History

Support:

- Join History
- Leave History
- Rejoin History

Historical records must be immutable.

---

## 4.3 Student Council

Support:

- Council Membership
- Academic-Year Assignment
- Membership History

---

## 4.4 Advanced Leadership

Support:

- Head Boy
- Head Girl
- Sports Captain

---

## 4.5 House Prefects

Support:

- House-specific Prefects
- Academic-Year Assignment
- Historical Preservation

---

# 5. Required Domain Entities

## 5.1 Club Entity

Fields:

```text
clubId
schoolId
name
category
description
status
createdAt
updatedAt
archivedAt
```

---

## 5.2 Club Membership Entity

Fields:

```text
membershipId
clubId
studentId
academicYearId
joinedAt
leftAt
status
```

---

## 5.3 Club Coordinator Entity

Fields:

```text
coordinatorId
clubId
teacherId
assignedAt
endedAt
status
```

---

## 5.4 Student Council Entity

Fields:

```text
councilId
schoolId
academicYearId
status
```

---

## 5.5 Council Membership Entity

Fields:

```text
membershipId
councilId
studentId
academicYearId
assignedAt
endedAt
status
```

---

## 5.6 Leadership Assignment Entity

Fields:

```text
assignmentId
studentId
position
academicYearId
assignedAt
endedAt
status
```

Supported Positions:

- Head Boy
- Head Girl
- Sports Captain

---

## 5.7 House Prefect Entity

Fields:

```text
prefectId
houseId
studentId
academicYearId
assignedAt
endedAt
status
```

---

# 6. Repository Contracts

Required repositories:

```text
ClubRepository
ClubMembershipRepository
ClubCoordinatorRepository
StudentCouncilRepository
CouncilMembershipRepository
LeadershipRepository
HousePrefectRepository
```

All repositories must follow existing repository patterns established in previous phases.

---

# 7. Services

Required services:

## Club Service

Responsibilities:

- Create Club
- Archive Club
- Manage Memberships
- Manage Coordinators

---

## Council Service

Responsibilities:

- Create Council Records
- Assign Members
- End Membership

---

## Leadership Service

Responsibilities:

- Assign Leadership
- Enforce Capacity Rules
- Auto-Terminate Expired Assignments

---

## Prefect Service

Responsibilities:

- Assign Prefects
- Preserve History
- Handle Academic-Year Expiry

---

# 8. Validation Rules

## Club Validation

Validate:

- Unique Club Name within School
- Active School Context
- Valid Category

---

## Membership Validation

Validate:

- Student Exists
- Academic Year Exists
- Duplicate Active Membership Not Allowed

---

## Leadership Validation

Enforce:

```text
1 Head Boy
1 Head Girl
1 Sports Captain
```

per Academic Year.

---

## Prefect Validation

Validate:

- Student Exists
- House Exists
- Academic Year Exists

---

# 9. Firestore Architecture

## Multi-Tenant Boundary

All data must remain under:

```text
schools/{schoolId}
```

---

## Collections

Example structure:

```text
schools/{schoolId}/clubs

schools/{schoolId}/club_memberships

schools/{schoolId}/club_coordinators

schools/{schoolId}/student_council

schools/{schoolId}/council_memberships

schools/{schoolId}/leadership_assignments

schools/{schoolId}/house_prefects
```

---

# 10. Presentation Layer

## Required Screens

### Clubs

- Club List
- Club Details
- Club Membership Management

---

### Student Council

- Council Overview
- Council Membership Management

---

### Leadership

- Leadership Dashboard
- Leadership Assignment Screen

---

### House Prefects

- House Prefect Management

---

# 11. BLoC Layer

Required BLoCs:

```text
ClubBloc

CouncilBloc

LeadershipBloc

HousePrefectBloc
```

Each BLoC must contain:

```text
bloc.dart
event.dart
state.dart
```

---

# 12. Lifecycle Rules

## Academic Year Expiry

At Academic Year completion:

Automatically end:

- Council Memberships
- Leadership Assignments
- Prefect Assignments

History remains preserved.

---

## Student Lifecycle Events

Automatically terminate assignments when:

- Student Graduates
- Student Transfers
- Student Becomes Inactive

---

# 13. Audit Requirements

All assignment actions must be auditable.

Track:

- Assigned By
- Assigned At
- Removed By
- Removed At

Audit records are immutable.

---

# 14. Deletion Policy

Mandatory:

```text
Soft Delete
+
Archive
```

Prohibited:

```text
Hard Delete
```

for:

- Clubs
- Membership History
- Leadership History
- Council History
- Prefect History

---

# 15. Testing Requirements

Minimum test categories:

## Validators

- Club Validation
- Leadership Capacity Validation
- Membership Validation

---

## Services

- Club Service Tests
- Council Service Tests
- Leadership Service Tests
- Prefect Service Tests

---

## Repository Tests

All repositories.

---

## Datasource Tests

All Firestore datasources.

---

## Bloc Tests

All BLoCs.

---

# 16. Compatibility Assessment Objectives

The next document must verify:

### Phase Protection

- Phase 2B Protected
- Phase 2C Protected
- Phase 2D Protected
- Phase 2E Protected
- Phase 2F Protected
- Phase 2G Protected

---

### Architectural Compliance

Verify:

- Multi-Tenant Isolation
- Historical Preservation
- Capacity Enforcement
- Academic-Year Ownership

---

### Integration Readiness

Confirm future compatibility with:

- Events
- Notifications
- Governance

without implementing integration.

---

# 17. Operational Planning Requirements

The Operational Implementation Plan must:

- Define physical file paths
- Define repository implementation structure
- Define Firestore datasource structure
- Define test architecture
- Define implementation sequencing

and explicitly prohibit creation of duplicate path structures.

---

# 18. Monorepo Boundary Requirements

All implementation must remain within:

```text
apps/admin_app/lib/features/student_leadership/

apps/admin_app/test/features/student_leadership/
```

No files may be generated outside these locations.

The previous Phase 2F path duplication issue must not reoccur.

---

# 19. Success Criteria

Phase 2H shall be considered implementation-ready when:

- Compatibility Assessment = PASS
- Operational Plan = Approved
- Architecture Compliance = PASS
- Governance Compliance = PASS

---

# 20. Execution Plan Verdict

Phase 2H is a focused domain enhancement introducing:

- Clubs
- Student Council
- House Prefects
- Advanced Leadership

while preserving all existing competitive, governance, and recognition systems.

The phase is intentionally lightweight and serves as the final major domain module before platform-wide integration planning begins.