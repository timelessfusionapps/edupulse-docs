# EduPulse_Event_Governance.md

## Phase

Phase 2D — Events, Competitions & Activities

---

# 1. Purpose

This document defines the operational governance, validation rules, lifecycle controls, security requirements, ownership rules, participation rules, ranking rules, attendance rules, and archival policies governing all Events, Competitions, and Activities within EduPulse.

This document is authoritative and supersedes implementation assumptions.

---

# 2. Governance Principles

## Configurable First

Schools must be able to configure:

- Event Types
- Event Categories
- Ranking Structures
- Scoring Models
- Visibility Policies
- Auto Archive Policies

Hardcoded educational assumptions are prohibited.

---

## Tenant Isolation

All event data must remain within:

schools/{schoolId}

No cross-school access is permitted.

---

## Permission Driven

All actions must be controlled through permissions.

Role-name checks are prohibited.

---

# 3. Event Type Governance

Event Types are school-managed master data.

Examples:

- Competition
- Activity
- Workshop
- Assembly
- Excursion

Schools may create custom types.

Event Types may not be deleted while referenced by active events.

Archived Event Types remain visible for historical reporting.

---

# 4. Event Category Governance

Categories classify events independently from Event Types.

Examples:

- Academic
- Sports
- Cultural
- Religious
- Community Service

Categories are configurable.

Categories may be archived but not deleted when historical references exist.

---

# 5. Event Ownership Governance

Every Event must have:

## Primary Event Owner

Exactly one.

Responsibilities:

- Event Management
- Attendance Management
- Result Submission
- Event Completion

---

## Supporting Event Owners

Zero or more.

May assist with administration.

Cannot exist without a Primary Event Owner.

---

# 6. Ownership Transfer Governance

Ownership transfers are permitted.

Requirements:

Permission:

Events.TransferOwnership

Audit Event:

EventOwnerTransferred

Historical ownership must be preserved.

Transfers must never overwrite audit history.

---

# 7. Event Lifecycle Governance

Supported States:

Draft

↓

Published

↓

Completed

↓

Archived

---

## Draft

Editable.

Invisible to participants.

---

## Published

Visible.

Participation enabled.

Attendance enabled.

---

## Completed

Participation closed.

Results permitted.

Attendance finalized.

---

## Archived

Read-only.

No modifications permitted.

---

# 8. Event Deletion Governance

Events are never permanently deleted.

Only:

Archive

is permitted.

This preserves:

- Attendance History
- Participation History
- Result History
- Future Analytics

---

# 9. Event Template Governance

Templates are reusable blueprints.

Templates:

- May be edited
- May be archived
- May generate unlimited events

Templates are not historical records.

Events generated from templates become independent records.

---

# 10. Recurring Event Governance

Supported Recurrence:

- Daily
- Weekly
- Monthly
- Custom

Recurrence must be represented through metadata.

Individual occurrences remain independently auditable.

---

# 10A. Registration Governance

Supported Registration Models:

- Teacher Assignment

- Self Registration

- Hybrid Registration

Teacher Assignment remains the default model.

Future self-registration workflows must respect RBAC and approval rules.

---

# 11. Participation Governance

Supported Participant Types:

- Student
- Team
- Class
- House

Events may support one or multiple participation modes.

---

# 12. Team Governance

Teams are event-specific entities.

Teams may contain students from:

- Multiple Classes
- Multiple Sections
- Multiple Houses

Team membership must remain historically preserved.

---

# 12A. Capacity Governance

Capacity is optional.

Default:

Unlimited

When configured, registrations exceeding capacity must be blocked.

Capacity changes must be auditable.

---

# 13. Attendance Governance

Supported Attendance States:

- Registered
- Present
- Absent
- Excused

Attendance must never be deleted.

Attendance history is immutable.

---

# 14. Result Governance

Results may be recorded for:

- Competitions
- Activities
- Workshops
- Assemblies
- Any Event Type

Results are not restricted to competitions.

---

# 14A. Event Stage Governance

Events may contain multiple stages.

Examples:

- Preliminary

- Quarter Final

- Semi Final

- Final

Stage history must remain immutable.

Results are stored at stage level.

---

# 15. Ranking Governance

Ranking structures are configurable.

Examples:

- First / Second / Third
- Gold / Silver / Bronze
- Star / Merit / Participation

No ranking structure is hardcoded.

---

# 16. Multiple Winner Governance

Supported.

Examples:

- Joint First Place
- Shared Gold Medal

The architecture must not assume unique rankings.

---
# 16A. Outcome Governance

Supported Outcome Types:

- Participation

- Recognition

- Ranking

- Certification

Every recorded result must map to at least one Outcome Type.

---

# 17. Result Locking Governance

Results may be locked after publication.

Permission Required:

Events.UnlockResults

Once locked:

- Rankings cannot be modified
- Winners cannot be modified
- Scoring cannot be modified

unless explicitly unlocked.

Audit Event Required:

ResultsUnlocked

---

# 18. Event Scoring Governance

Scoring models are event-specific.

Supported Targets:

- Student
- Team
- Class
- House

Scoring may include:

- Participation Points
- Ranking Points
- Bonus Points

---


# 18A. Achievement Governance

Events expose Achievement Hooks.

Examples:

- Winner

- Runner Up

- Participation

- Excellence Award

No achievement records are created in Phase 2D.

Only structured outputs are provided.

---

# 19. Points Integration Governance

This phase provides:

Points Hooks Only

No actual points engine is implemented.

Events must expose structured result outputs consumable by future Points modules.

---

# 20. Academic Scope Governance

Events may target:

- Academic Year
- Academic Group
- Class
- Section

Events must belong to exactly one Academic Year.

---

# 21. House Governance

Events may target:

- One House
- Multiple Houses
- All Houses

House participation history must remain preserved.

---

# 22. Visibility Governance

Supported Visibility:

- School Wide
- House Specific
- Class Specific
- Section Specific
- Student Specific

Visibility must be configurable.

---

# 23. Search Governance

Search must support:

- Event Title
- Event Type
- Category
- Academic Year
- Organizer
- House
- Class
- Section

Search results must remain tenant-scoped.

---

# 24. Auto Archive Governance

Schools may configure:

- Never Archive
- Archive After 30 Days
- Archive After 60 Days
- Archive After 90 Days

Auto Archive only applies to Completed events.

---
# 24A. Result Unlock Governance

Permission Required:

Events.UnlockResults

Unlocking results requires audit logging.

Required Audit Event:

ResultsUnlocked

Historical versions must remain preserved.

---

# 24B. Auto Archive Governance

Schools may configure:

- Never

- 30 Days

- 60 Days

- 90 Days

Only Completed events may be auto archived.

Archived events remain searchable and reportable.

---

# 25. Parent Visibility Governance

Future Parent Portal support must be anticipated.

No Parent Portal implementation exists in this phase.

Only integration hooks are permitted.

---

# 26. Notification Governance

Future Notification support must be anticipated.

Supported Hooks:

- EventCreated
- EventPublished
- EventUpdated
- EventCompleted
- EventArchived

No Notification Engine implementation exists in this phase.

---

# 27. Certificate Governance

Future support only.

Hooks must exist for:

- Participation Certificates
- Winner Certificates

No certificate generation implementation exists in this phase.

---

# 28. Audit Requirements

Required Audit Events:

- EventCreated
- EventUpdated
- EventPublished
- EventCompleted
- EventArchived
- EventOwnerTransferred
- AttendanceRecorded
- ResultsAssigned
- ResultsUnlocked

Audit records are immutable.

---

# 29. Security Requirements

All operations must enforce:

- Tenant Isolation
- RBAC Permissions
- Runtime Access Validation
- Audit Logging

No bypass paths permitted.

---

# 30. Future Expansion Governance

Future modules must integrate without requiring redesign:

- Points
- Achievements
- Notifications
- Reports
- Analytics
- Parent Portal
- AI Insights

This governance document establishes the permanent operational rules for Events, Competitions & Activities throughout EduPulse.