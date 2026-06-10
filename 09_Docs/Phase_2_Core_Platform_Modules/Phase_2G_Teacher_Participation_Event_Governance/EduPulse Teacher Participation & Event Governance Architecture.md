# EduPulse Teacher Participation & Event Governance Architecture

## Phase Information

**Phase:** 2G  
**Module:** Teacher Participation & Event Governance  
**Status:** Architecture Definition  
**Version:** 1.0

### Dependencies

- Phase 2B — School Administration
- Phase 2C — Student Management
- Phase 2D — Events, Competitions & Activities
- Phase 2E — Points, Achievements & Recognition
- Phase 2F — Notifications & Communication

---

# 1. Purpose

The purpose of this module is to provide a simple, event-centric and auditable mechanism for assigning teachers to events and granting them event-specific responsibilities.

EduPulse is not a Human Resource Management system.

EduPulse does not evaluate, score, rank, monitor attendance, manage leave, or perform appraisals of teachers.

Teachers exist within EduPulse solely as facilitators, governors and operators of student engagement workflows.

This module answers one question:

> Who is responsible for managing this event and its operational activities?

---

# 2. Architectural Philosophy

## Core Principle

The software must remain simple.

A School Administrator should be able to:

```text
Create Event
↓
Assign Event Manager
↓
Done
```

The Event Manager should then be able to delegate operational responsibilities to other teachers as required.

The architecture must avoid unnecessary complexity and must never require:

- Committee hierarchies
- Committee positions
- Teacher performance scoring
- Teacher ranking systems
- Teacher recognition systems
- Teacher analytics systems
- Teacher attendance systems
- Teacher leave management
- HR workflows

---

# 3. Architectural Objectives

This module exists to:

- Assign ownership of events
- Delegate event responsibilities
- Create accountability
- Enable governance workflows
- Maintain audit trails
- Simplify teacher participation

This module does not exist to manage teachers as employees.

---

# 4. Core Domain Objects

The module consists of the following primary objects:

### Teacher Group

Reusable collection of teachers.

Examples:

- Sports Committee
- Science Fair Team
- Annual Day Team
- Discipline Team
- Examination Support Team

---

### Event Team

Collection of teachers assigned to a specific event.

Contains:

- Event Manager
- Assigned Teachers
- Delegated Rights

---

### Event Rights

Defines operational capabilities within an event.

Examples:

- Manage Event
- Mark Attendance
- Award Event Points
- Publish Results
- Publish Announcements
- Manage Registrations

---

### Event Team Template

Reusable configuration for event staffing.

Examples:

- Sports Event Template
- Cultural Event Template
- Science Exhibition Template

---

### Governance Audit Record

Immutable historical record of governance actions.

---

# 5. Teacher Group Architecture

Teacher Groups are reusable collections of teachers.

The platform does not assign meaning to groups.

Schools may create groups according to their own operating model.

Examples:

- Sports Committee
- Annual Day Team
- Cultural Activities Team
- Science Fair Team

---

## Teacher Group Characteristics

### Academic Year Based

Teacher Groups belong to a specific Academic Year.

Example:

```text
2026-27
Sports Committee

↓

Archived

↓

2027-28
Sports Committee
```

---

### Multiple Memberships Allowed

A teacher may belong to multiple Teacher Groups.

Example:

```text
Murtaza Bhai

Sports Committee
Science Fair Team
Annual Day Team
```

---

### Historical Preservation

Archived Teacher Groups remain visible for historical reporting and audit purposes.

---

# 6. Event Team Architecture

Every event contains an Event Team.

The Event Team represents all teachers participating in the management of the event.

An Event Team may contain:

- Individual Teachers
- Teacher Groups
- Both

---

## Example

```text
Annual Sports Day

Event Manager
Murtaza Bhai

Assigned Group
Sports Committee

Additional Teacher
Aliasger Bhai
```

---

# 7. Event Manager Architecture

Every event must have exactly one Event Manager.

The Event Manager serves as the owner and primary accountable individual for the event.

---

## Event Manager Rights

The Event Manager automatically receives all event-level rights.

These rights apply only within the context of the assigned event.

### Default Rights

- Manage Event
- Modify Event Details
- Manage Registrations
- Mark Attendance
- Award Event Points
- Submit Point Deductions
- Publish Results
- Publish Announcements
- Manage Event Team
- Delegate Rights
- Close Event

---

## Accountability

The Event Manager remains accountable for:

- Event Operations
- Delegated Rights
- Event Closure
- Governance Compliance

---

# 8. Delegated Event Rights

The Event Manager may delegate specific rights to assigned teachers.

Delegation is optional.

---

## Attendance Manager

Can:

- Mark Attendance
- View Attendance Reports

Cannot:

- Publish Results
- Award Points

---

## Points Manager

Can:

- Award Event Points
- Submit Event Point Deductions

Cannot:

- Publish Results

---

## Communications Manager

Can:

- Publish Announcements
- Send Notifications
- Send WhatsApp Communications

Cannot:

- Award Points

---

## Results Manager

Can:

- Publish Results
- Manage Rankings

Cannot:

- Award Points

---

# 9. Event Rights Architecture

Rights are event-specific.

Rights do not exist outside the assigned event.

Example:

```text
Sports Day

Teacher A
→ Attendance Manager

Annual Day

Teacher A
→ Communications Manager
```

Assignments are independent.

---

## Rights Lifecycle

```text
Assigned
↓
Active
↓
Event Closed
↓
Expired
↓
Archived
```

---

# 10. Event Team Templates

Schools may create reusable Event Team Templates.

---

## Example

### Sports Event Template

- Event Manager
- Attendance Manager
- Points Manager
- Communications Manager

---

### Cultural Event Template

- Event Manager
- Registration Manager
- Results Manager
- Communications Manager

---

## Template Behaviour

Templates are:

- Reusable
- Editable
- Academic Year Aware

Template changes never affect existing events.

Example:

```text
Template Updated
↓
Future Events Updated
↓
Existing Events Unchanged
```

---

# 11. Governance Audit Architecture

Every governance action generates an audit record.

---

## Examples

- Event Created
- Event Modified
- Event Closed
- Attendance Recorded
- Points Awarded
- Points Deducted
- Results Published
- Announcement Published
- Rights Delegated
- Rights Revoked

---

## Audit Record Fields

Each record must contain:

- School ID
- Academic Year
- Event ID
- Teacher ID
- Action Type
- Timestamp
- Previous State
- New State
- Delegation Reference (if applicable)

---

# 12. Cross-Module Integration

## Phase 2D — Events

Consumes:

- Event Manager
- Event Team
- Event Rights

Supports:

- Event Lifecycle
- Registrations
- Attendance
- Results

---

## Phase 2E — Points, Achievements & Recognition

Consumes:

- Event Points Manager
- Event Governance Assignments

Supports:

- Event-Based Student Points
- Event-Based House Points
- Event-Based Class Points

Phase 2G is NOT the authority for overall point governance.

The authoritative source for all point governance remains Phase 2E.

---

## Phase 2F — Notifications & Communication

Consumes:

- Communications Manager Rights
- Teacher Groups

Supports:

- Announcements
- Notifications
- WhatsApp Messaging

---

# 13. Phase 2E Preservation Rules

## Preservation Rule 1

Phase 2G shall not modify, replace, override, or restrict any functionality defined within Phase 2E.

---

## Preservation Rule 2

Points may originate from both Event and Non-Event sources.

### Event Sources

- Sports Day
- Science Exhibition
- Debate Competition
- Annual Day
- Competitions
- Activities

### Non-Event Sources

- Discipline
- Behaviour
- Leadership
- Community Service
- Classroom Contributions
- Library Activities
- Administrative Awards
- Teacher Recognition of Student Actions
- Any configured Point Category

---

## Preservation Rule 3

Schools may assign point-awarding permissions directly through Phase 2E.

Example:

```text
Teacher A

Permission:
Award Student Points
```

This permission remains valid regardless of whether the teacher is assigned to any event.

---

## Preservation Rule 4

Event Governance rights apply only within the scope of the event.

Example:

```text
Sports Day

Teacher B
→ Points Manager
```

This grants authority only for Sports Day related point transactions.

---

## Preservation Rule 5

Teachers possessing global point-awarding permissions through Phase 2E retain those permissions regardless of their participation in events.

---

## Preservation Rule 6

Phase 2G may extend Phase 2E permissions within an event context.

Phase 2G must never revoke, reduce, override, or invalidate permissions already granted through Phase 2E.

---

## Preservation Rule 7

Phase 2E remains the authoritative module for:

- Point Categories
- Point Rules
- Point Approval Workflows
- Achievement Rules
- Badge Rules
- Recognition Rules
- Leaderboards
- House Rankings
- Class Rankings
- Student Rankings

---

# 14. Historical Preservation

Historical governance records must remain permanently available.

Examples:

- Previous Event Managers
- Previous Delegated Rights
- Previous Event Teams
- Previous Teacher Groups
- Previous Governance Actions

---

# 15. Out of Scope

The following are explicitly excluded:

- Teacher Recognition
- Teacher Achievements
- Teacher Badges
- Teacher Analytics
- Teacher Performance Tracking
- Teacher Attendance
- Teacher Leave Management
- HR Functions
- Payroll
- Teacher Appraisals
- Teacher Rankings
- Committee Hierarchies
- Committee Positions

---

# 16. Architecture Verdict

This architecture provides a lightweight, event-centric governance model that enables schools to manage teacher participation and accountability without transforming EduPulse into a School ERP or Human Resource Management system.

The architecture remains fully aligned with the EduPulse mission:

Students
↓
Events
↓
Participation
↓
Points
↓
Houses
↓
Recognition
↓
Communication
↓
School Culture