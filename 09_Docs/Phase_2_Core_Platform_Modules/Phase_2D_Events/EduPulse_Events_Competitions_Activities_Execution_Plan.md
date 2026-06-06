# EduPulse_Events_Competitions_Activities_Execution_Plan.md

## Phase

Phase 2D — Events, Competitions & Activities

---

# 1. Objective

Implement the complete backend architecture, domain layer, data layer, service layer, repository layer, validation layer, Firestore architecture, RBAC integration, search architecture, testing framework, and UI scaffolding for the Events, Competitions & Activities module exactly as defined in:

- EduPulse_Events_Competitions_Activities_Architecture.md
- EduPulse_Event_Governance.md

This execution plan is authoritative.

No architectural deviations are permitted.

---

# 2. Mandatory Pre-Execution Requirement

Before implementation begins, generate:

EduPulse_Events_Compatibility_Assessment.md

The assessment must verify:

- Dashboard Preservation
- Router Preservation
- Authentication Preservation
- Platform Shell Preservation
- RBAC Preservation
- School Administration Compatibility
- Student Management Compatibility
- Tenant Isolation Preservation

If any blocking risk is identified:

STOP EXECUTION

Generate findings.

Await approval.

---

# 3. Implementation Principles

## Additive Architecture Only

Implementation must extend the platform.

Existing modules must not be rewritten.

---

## No Empty Scaffolds

The following are prohibited:

- Empty classes
- Empty repositories
- Empty datasources
- Empty services
- Empty validators
- TODO markers
- Placeholder methods

Every generated file must contain executable implementation logic.

---

## Dashboard Preservation Rule

No modifications permitted inside:

- Dashboard Business Logic
- Dashboard Widgets
- Dashboard Repositories
- Dashboard Routes

---

## Router Preservation Rule

Existing:

- Authentication Redirects
- Route Paths
- Shell Architecture

must remain unchanged.

---

# 4. Domain Layer

Create:

lib/features/events/domain/entities/

## Required Entities

### EventEntity

Core event record.

Fields include:

- eventId
- academicYearId
- eventTypeId
- categoryId
- title
- description
- venue
- status
- recurrencePattern
- visibilityScope
- createdBy
- createdAt
- updatedAt

---

### EventTypeEntity

School-configurable event types.

---

### EventCategoryEntity

School-configurable categories.

---

### EventTemplateEntity

Reusable event blueprints.

---

### EventParticipantEntity

Supports:

- Student
- Team
- Class
- House

---

### EventAttendanceEntity

Attendance tracking.

---

### EventResultEntity

Results and rankings.

---

### EventStageEntity

Supports:

- Round 1
- Quarter Final
- Semi Final
- Final

---

### TeamEntity

Event-scoped teams.

Teams belong to events.

Teams are not reusable school assets in Phase 2D.

---

### EventOwnershipEntity

Primary Event Owner + Supporting Teachers.

---

### EventScoringEntity

Ranking-to-points mapping.

Hooks only.

No Points Engine.

---

### RankingTemplateEntity

Supports:

- 1st / 2nd / 3rd
- Gold / Silver / Bronze
- Custom Structures

School configurable.

---

### EventCapacityEntity

Optional capacity management.

Default:

Unlimited

---

### EventOutcomeEntity

Supports:

- Participation
- Recognition
- Ranking
- Certification

---

### EventRegistrationEntity

Supports:

- Teacher Assignment
- Future Self Registration
- Hybrid Registration

No Self Registration UI in Phase 2D.

---

# 5. Repository Contracts

Create:

lib/features/events/domain/repositories/

## Required Repositories

### EventRepository

### EventTypeRepository

### EventCategoryRepository

### EventTemplateRepository

### EventAttendanceRepository

### EventResultRepository

### EventParticipantRepository

### TeamRepository

### EventOwnershipRepository

### RankingTemplateRepository

---

# 6. Domain Services

Create:

lib/features/events/domain/services/

## Required Services

### EventLifecycleService

Manages:

Draft

↓

Published

↓

Completed

↓

Archived

---

### EventTemplateService

Template generation and duplication.

---

### EventOwnershipService

Assignment and transfer.

---

### EventRecurrenceService

Supports:

- Daily
- Weekly
- Monthly
- Custom

---

### EventAttendanceService

Attendance management.

---

### EventResultService

Result processing.

---

### EventScoringService

Ranking → Point mapping.

Hooks only.

---

### RankingTemplateService

Manages ranking structures.

---

### EventRegistrationService

Teacher assignment and future registration workflows.

---

### EventArchiveService

Manual and automatic archival.

---

### EventCapacityService

Capacity enforcement.

---

### EventOutcomeService

Maps:

- Participation
- Recognition
- Ranking
- Certification

---

# 7. Validators

Create:

lib/features/events/domain/validators/

## Required Validators

### EventValidator

### AttendanceValidator

### ResultValidator

### OwnershipValidator

### CapacityValidator

### ScoringValidator

### StageValidator

### RegistrationValidator

---

# 8. Data Models

Create:

lib/features/events/data/models/

Generate Freezed + JsonSerializable models for:

- All Entities
- All Enumerations
- All Value Objects

No manual serialization.

---

# 9. Firebase Datasources

Create:

lib/features/events/data/datasources/firebase/

## Required Datasources

### FirebaseEventDatasource

### FirebaseEventTypeDatasource

### FirebaseEventCategoryDatasource

### FirebaseEventTemplateDatasource

### FirebaseAttendanceDatasource

### FirebaseResultDatasource

### FirebaseParticipantDatasource

### FirebaseTeamDatasource

### FirebaseOwnershipDatasource

### FirebaseRankingTemplateDatasource

---

# 10. Repository Implementations

Create:

lib/features/events/data/repositories_impl/

Implement all repository contracts.

All implementations must:

- Contain executable logic
- Use Firestore
- Enforce school boundaries
- Respect RBAC requirements

---

# 11. Firestore Architecture

Mandatory boundary:

schools/{schoolId}

## Collections

- eventTypes
- eventCategories
- events
- eventTemplates
- teams
- rankingTemplates

## Subcollections

events/{eventId}/participants

events/{eventId}/attendance

events/{eventId}/results

events/{eventId}/stages

events/{eventId}/ownership

---

# 12. RBAC Integration

Use only certified Phase 1D permissions.

No role-name checks.

Examples:

- Events.View
- Events.Create
- Events.Edit
- Events.Publish
- Events.Complete
- Events.Archive
- Events.AssignResults
- Events.UnlockResults
- Events.TransferOwnership
- Events.ManageAttendance
- Events.ManageTemplates
- Events.ConfigureScoring

---

# 13. Future Integration Hooks

Expose hooks only.

No implementation.

## Points Hooks

Supports:

- Student Points
- Class Points
- House Points

---

## Achievement Hooks

Supports:

- Winner
- Runner Up
- Participation
- Special Recognition

---

## Notification Hooks

Supports:

- Created
- Published
- Updated
- Completed
- Archived

---

## Certificate Hooks

Supports:

- Participation Certificate
- Winner Certificate

---

# 14. Presentation Layer

Create:

lib/features/events/presentation/

## Required Screens

### EventListScreen

### EventDetailScreen

### EventTemplateListScreen

### TeamManagementScreen

### AttendanceScreen

### ResultsScreen

### EventConfigurationScreen

### RankingTemplateManagementScreen

### EventCreationWizardScreen

---

# 15. Event Creation Wizard

Mandatory wizard flow:

## Step 1

Event Basics

- Name
- Type
- Category
- Academic Year

---

## Step 2

Audience & Scope

- School
- Academic Group
- Class
- Section
- House

---

## Step 3

Participants

- Student
- Team
- Class
- House

---

## Step 4

Owners

- Primary Event Owner
- Supporting Teachers

---

## Step 5

Ranking & Scoring

- Ranking Template
- Points Mapping
- Capacity

---

## Step 6

Review & Publish

---

# 16. Bloc Layer

Create:

presentation/bloc/

## Required Blocs

### EventBloc

### EventTemplateBloc

### EventAttendanceBloc

### EventResultBloc

### EventParticipantBloc

### EventOwnershipBloc

### TeamBloc

### EventConfigurationBloc

### RankingTemplateBloc

---

# 17. Search Architecture

Implement tenant-scoped search by:

- Event Name
- Event Type
- Category
- Academic Year
- House
- Class
- Section
- Event Owner

---

# 18. Audit Logging

Mandatory Audit Events:

- EventCreated
- EventUpdated
- EventPublished
- EventCompleted
- EventArchived
- EventOwnerTransferred
- AttendanceRecorded
- ResultsAssigned
- ResultsUnlocked
- RankingTemplateCreated
- TemplateGenerated

Audit records are immutable.

---

# 19. Testing

Create:

test/features/events/

## Validator Tests

- EventValidatorTest
- AttendanceValidatorTest
- ResultValidatorTest
- CapacityValidatorTest
- RegistrationValidatorTest

## Service Tests

- EventLifecycleServiceTest
- EventOwnershipServiceTest
- EventArchiveServiceTest
- EventOutcomeServiceTest
- RankingTemplateServiceTest

## Repository Tests

All repository implementations.

---

# 20. Validation Requirements

Must execute:

flutter analyze

Expected Result:

0 issues

---

Must execute:

flutter test

Expected Result:

100% pass

---

# 21. Dashboard Preservation Verification

Implementation Report must explicitly confirm:

- Dashboard Widgets Unchanged
- Dashboard Business Logic Unchanged
- Dashboard Routes Unchanged
- Dashboard Repositories Unchanged

---

# 22. Router Preservation Verification

Implementation Report must explicitly confirm:

- Authentication Redirects Unchanged
- Existing Routes Unchanged
- Shell Navigation Unchanged
- Runtime Access Integration Unchanged

---

# 23. Required Reports

Generate after implementation:

### EduPulse_Events_Implementation_Report.md

### EduPulse_Events_Runtime_Report.md

### EduPulse_Events_Test_Report.md

### EduPulse_Events_Architecture_Compliance_Report.md

### EduPulse_Events_Governance_Compliance_Report.md

### EduPulse_Events_Compatibility_Assessment.md

---

# 24. Certification Documents

Generate only after:

- Compatibility Assessment Pass
- Analyzer Pass
- Test Pass
- Architecture Compliance Pass
- Governance Compliance Pass

## Required Certifications

### EduPulse_Events_Certification.md

### EduPulse_Event_Governance_Certification.md

---

# 25. Completion Output

Upon completion Antigravity must provide:

## Files Created

## Files Modified

## Validation Results

## Test Results

## Risks / Blockers

## Dashboard Preservation Verification

## Router Preservation Verification

## Certification Recommendation

No section may be omitted.

---

# 26. Execution Authorization Rule

Implementation may begin only after:

EduPulse_Events_Compatibility_Assessment.md

has been generated and reviewed.

If blocking risks are identified:

STOP EXECUTION

Report findings.

Await approval.