# EduPulse_Events_Competitions_Activities_Architecture.md

## Phase

Phase 2D — Events, Competitions & Activities

---

# 1. Purpose

The Events, Competitions & Activities module provides the operational foundation for organizing, managing, tracking, and evaluating all student participation activities within EduPulse.

This module serves as the central engagement layer connecting:

- Students
- Academic Structure
- Houses
- Teams
- Competitions
- Activities
- Attendance
- Rankings
- Future Points
- Future Achievements
- Future Notifications
- Future Parent Visibility

The architecture must remain independent from ERP functionality and focus exclusively on student engagement, participation, competition, leadership, and school activities.

---

# 2. Scope

This module supports:

- School Events
- House Events
- Class Events
- Academic Group Events
- Competitions
- Activities
- Workshops
- Excursions
- Assemblies
- Cultural Programs
- Sports Events

The module must support both:

- One-time Events
- Recurring Events

---

# 3. Core Architectural Principles

## Configurable Over Hardcoded

No event type, category, ranking structure, or scoring model may be hardcoded.

Schools must be able to configure these structures.

---

## Multi-Tenant Isolation

All event data must remain inside:

```text
schools/{schoolId}
```

No alternative tenant structure is permitted.

---

## Permission Driven

All access must be controlled through RBAC permissions.

No role-name checks.

---

## Academic-Year Bound

Every event must belong to exactly one Academic Year.

---

# 4. Event Domain Architecture

## EventEntity

Represents the primary event record.

Core Fields:

- eventId
- academicYearId
- eventTypeId
- categoryId
- title
- description
- venue
- startDateTime
- endDateTime
- recurrencePattern
- visibilityScope
- lifecycleStatus
- createdBy
- createdAt
- updatedAt

---

# 5. Event Type Architecture

## EventTypeEntity

School-configurable.

Examples:

- Competition
- Activity
- Assembly
- Workshop
- Excursion
- Sports Event
- Cultural Event
- Academic Event

Schools may add unlimited custom types.

Examples:

- Quran Recitation
- Hifz Competition
- Reading Circle
- Mushaira
- Science Fair

No hardcoded restrictions.

---

# 6. Event Category Architecture

Categories classify events independently from event types.

Examples:

Event Type:

Competition

Category:

Sports

Examples:

- Academic
- Sports
- Cultural
- Religious
- Leadership
- Community Service

Categories are school-configurable.

---

# 7. Event Ownership Architecture

Every event contains:

## Primary Event Owner

Exactly one.

Typically a teacher.

Responsible for:

- Event execution
- Attendance
- Results
- Reporting

---

## Supporting Event Owners

Zero or more.

May assist with:

- Attendance
- Judging
- Participation
- Administration

---

# 8. Event Lifecycle

## Supported States

Draft

↓

Published

↓

Completed

↓

Archived

---

### Draft

Editable.

Not visible to participants.

---

### Published

Visible.

Open for participation.

---

### Completed

Participation closed.

Results may be entered.

---

### Archived

Read-only historical record.

---

# 9. Event Templates

Reusable blueprints.

Examples:

- Weekly Assembly
- Quran Competition
- Sports Day
- Science Fair

Template Contains:

- Event Type
- Category
- Audience
- Scoring Model
- Participation Structure

Templates create new events.

Templates are not events.

---

# 10. Recurring Events

Supported Patterns:

- None
- Daily
- Weekly
- Monthly
- Custom

Examples:

- Morning Assembly
- Weekly Sports Activity
- Monthly Competition

Recurrence metadata must be stored separately from event execution records.

---
# 10A. Event Registration Architecture

Supported Registration Modes:

## Teacher Assignment

Participants are directly assigned by authorized users.

## Self Registration

Future-ready capability.

Students may submit registration requests.

Approval workflow is configurable.

## Hybrid Registration

Combination of assignment and self-registration.

No self-registration UI is implemented in Phase 2D.

Only architectural support is required.

---

# 11. Participation Architecture

Supported Participant Types:

## Student

Individual participant.

## Team

Custom group.

## Class

Whole class participation.

## House

Whole house participation.

---

# 12. Team Architecture

## TeamEntity

Fields:

- teamId
- teamName
- academicYearId
- eventId
- participants

Examples:

- Blue House Debate Team
- Science Exhibition Team
- Quiz Team A

Teams may contain students from multiple classes.

---
# 12A. Event Capacity Architecture

Events may optionally define capacity limits.

Examples:

- Workshop = 40 Students

- Debate = 8 Teams

- Competition = 100 Participants

Capacity Types:

- Student Capacity

- Team Capacity

- Class Capacity

- House Capacity

Default:

Unlimited

Capacity enforcement is optional and configurable.

---

# 13. Attendance Architecture

Supported Attendance States:

- Registered
- Present
- Absent
- Excused

Attendance may be recorded for:

- Students
- Teams
- Classes
- Houses

---

# 14. Results Architecture

Results supported for all event types.

Not limited to competitions.

Examples:

- Competition Winners
- Workshop Outcomes
- Activity Completion
- Participation Recognition

---

# 14A. Event Stage Architecture

Multi-stage competitions are supported.

## EventStageEntity

Fields:

- stageId

- eventId

- stageName

- sequence

- status

Examples:

Round 1

↓

Quarter Final

↓

Semi Final

↓

Final

Stages remain independently auditable.

No tournament engine is implemented in Phase 2D.

---

# 15. Ranking Architecture

Rankings are fully configurable.

Examples:

- 1st / 2nd / 3rd
- Gold / Silver / Bronze
- Star / Merit / Participation

No fixed ranking model.

---

# 16. Multiple Winners

Supported.

Examples:

- Joint First Place
- Multiple Gold Winners

Ranking engine must support ties.

---

# 16A. Outcome Architecture

Results are not restricted to rankings.

## OutcomeType

Supported Values:

- Participation

- Recognition

- Ranking

- Certification

Examples:

Participation:

Student attended event.

Recognition:

Student acknowledged for contribution.

Ranking:

Student placed First.

Certification:

Student eligible for certificate.

Future modules consume Outcome Types directly.

---

# 17. Event Scoring Architecture

Events may define:

- Minimum Points
- Maximum Points
- Ranking-Based Points

Examples:

1st Place = 10

2nd Place = 7

3rd Place = 5

Participation = 2

Scoring models are configurable per event.

---

# 18. Points Integration Hooks

Future integration only.

Event results may generate:

- Student Points
- Class Points
- House Points

No Points Engine implementation in this phase.

---



# 18A. Achievement Integration Hooks

Future integration only.

Events may emit structured achievement hooks.

Examples:

- Winner

- Runner Up

- Participation

- Special Recognition

No Achievement Engine is implemented in Phase 2D.

Only hooks are exposed.

# 19. Academic Structure Integration

Events may target:

- Academic Year
- Academic Group
- Class
- Section

Examples:

- Grade 6 Debate
- Section A Reading Competition
- Whole School Assembly

---

# 20. House Integration

Events may target:

- One House
- Multiple Houses
- All Houses

House participation history must remain preserved.

---

# 21. Student Integration

Events consume Student Management.

Dependencies:

- Student Profile
- Student Lifecycle
- Academic Assignment
- Leadership Assignments

No duplication of student data.

---

# 22. Parent Visibility Hooks

Future integration only.

Architecture must expose visibility hooks for:

- Parent Portal
- Parent Notifications

No implementation in Phase 2D.

---

# 23. Notification Hooks

Future integration only.

Events may emit:

- Created
- Published
- Updated
- Cancelled
- Completed

No notification engine implementation.

---

# 24. Certificate Hooks

Future integration only.

Support:

- Participation Certificate
- Winner Certificate

No certificate generation in Phase 2D.

---

# 25. Search Architecture

Search Fields:

- Event Title
- Event Type
- Category
- Academic Year
- Organizer
- Class
- Section
- House

Search must remain tenant-safe.

---

# 26. Firestore Architecture

Suggested Collections:

```text
schools/{schoolId}/eventTypes

schools/{schoolId}/eventCategories

schools/{schoolId}/events

schools/{schoolId}/eventTemplates

schools/{schoolId}/teams
```

Subcollections:

```text
events/{eventId}/participants

events/{eventId}/attendance

events/{eventId}/results
```

---

# 27. RBAC Integration

Suggested Permissions:

Events.View

Events.Create

Events.Edit

Events.Publish

Events.Complete

Events.Archive

Events.DeleteTemplate

Events.ManageTemplates

Events.AssignResults

Events.UnlockResults

Events.TransferOwnership

Events.ViewAttendance

Events.ManageAttendance

Events.ConfigureScoring

---

# 28. Audit Requirements

Audit Events:

- EventCreated
- EventUpdated
- EventPublished
- EventCompleted
- EventArchived
- EventOwnerTransferred
- ResultsAssigned
- ResultsUnlocked
- AttendanceRecorded

---

# 29. Exclusions

Out of Scope:

- Budgeting
- Finance
- Fees
- Transport
- Hostel
- ERP Admissions
- Timetable
- Payroll

---

# 30. Future Integrations

Future Modules:

- Points Management
- Achievement Management
- Notifications
- Reports
- Analytics
- Parent Portal
- AI Insights

This architecture must remain stable and not require redesign when those modules are introduced.