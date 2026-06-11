# EduPulse Student Clubs, Councils & Advanced Leadership Architecture

## Document Information

| Field | Value |
|---------|---------|
| Module | Phase 2H – Student Clubs, Councils & Advanced Leadership |
| Platform | EduPulse |
| Architecture Version | 1.0 |
| Status | Draft |
| Depends On | Phase 2B, Phase 2C, Phase 2D, Phase 2F, Phase 2G |
| Date | Current Approved Version |

---

# 1. Purpose

## 1.1 Objective

The purpose of this module is to provide structured support for:

- Student Clubs
- Student Councils
- House Prefects
- Advanced Student Leadership

while preserving EduPulse's primary mission:

```text
Student Participation
↓
Events
↓
Points
↓
House Competition
↓
Recognition
```

This module exists to support student engagement, responsibility, leadership development, and participation without introducing a secondary competitive ecosystem.

---

# 2. Architectural Principles

## 2.1 Platform Principle

EduPulse follows:

```text
Platform First
School Second
User Never
```

Meaning:

- Platform defaults are preferred.
- Schools may configure only where schools genuinely differ.
- Teachers and operational users should not configure business rules.

---

## 2.2 House Preservation Principle

Houses are already implemented under:

- Phase 2B – School Administration
- Phase 2C – Student Management

This module SHALL NOT:

- Recreate House Management
- Recreate House Membership
- Recreate House Governance
- Recreate House Captains
- Recreate Vice Captains

Those remain the authoritative responsibility of Phase 2B and Phase 2C.

---

## 2.3 Recognition Preservation Principle

This module SHALL NOT extend:

- Points
- Achievements
- Recognition
- Rankings
- Leaderboards

for Clubs.

These remain under Phase 2E.

---

# 3. Scope

## 3.1 Included

### Clubs

- Club Creation
- Club Categories
- Club Coordinators
- Club Membership
- Club Membership History
- Club Lifecycle

### Student Council

- Student Council Membership
- Council History
- Academic-Year Tracking

### Advanced Leadership

- Head Boy
- Head Girl
- Sports Captain

### House Prefects

- House-specific Prefects
- Academic-Year Tracking
- Historical Preservation

---

## 3.2 Explicitly Excluded

### House Features

Excluded because already implemented:

- House Management
- House Membership
- House Captain
- Vice Captain

### Elections

Not supported:

- Voting
- Nominations
- Campaigns
- Ballot Systems

### Club Competition

Not supported:

- Club Points
- Club Rankings
- Club Achievements
- Club Leaderboards

### Governance Expansion

Not supported:

- Student Administrative Rights
- Student Moderation Rights
- Student Approval Workflows

---

# 4. Club Architecture

## 4.1 Club Entity

A Club represents a long-term student participation group.

Examples:

- Science Club
- Robotics Club
- Photography Club
- Eco Club
- Literary Club
- Debate Club

Clubs are permanent entities.

Membership changes over time.

The Club itself does not reset each academic year.

---

## 4.2 Club Structure

```text
Club
├─ Category
├─ Coordinators
├─ Members
├─ Membership History
└─ Lifecycle
```

---

## 4.3 Club Categories

The platform shall provide support for optional categorization.

Examples:

- Academic
- STEM
- Arts
- Cultural
- Sports
- Community Service

Schools may create custom categories.

Categories are organizational only.

Categories have no effect on scoring, rankings, or governance.

---

## 4.4 Club Coordinators

A Club may have:

- One Coordinator
- Multiple Coordinators

Coordinator assignments are teacher-based.

Coordinator history must be preserved.

---

## 4.5 Club Membership

Students may:

- Join Clubs
- Leave Clubs
- Rejoin Clubs

during the same academic year.

Membership actions must be historically recorded.

Students may belong to multiple clubs simultaneously.

---

## 4.6 Club Membership History

Every membership change must create a historical record.

Example:

```text
Student A
Science Club
01 July 2027 – Joined

Student A
Science Club
15 November 2027 – Left
```

Membership history must never be overwritten.

---

# 5. Student Council Architecture

## 5.1 Student Council Model

EduPulse supports:

```text
Student Council
+
Prefects
```

as the default governance structure.

No alternative council models are supported in Version 1.

---

## 5.2 Council Membership

Student Council membership is:

- Academic-Year Based
- Historically Preserved
- Unlimited in size

The platform imposes no membership cap.

---

## 5.3 Council History

Historical records must preserve:

- Student
- Academic Year
- Position (if any)
- Start Date
- End Date

Historical records may not be modified retroactively.

---

# 6. Advanced Leadership Architecture

## 6.1 Leadership Positions

The following leadership positions are supported:

- Head Boy
- Head Girl
- Sports Captain

---

## 6.2 Existing Leadership Positions

The following positions remain governed by Phase 2C:

- House Captain
- Vice Captain
- Class Monitor

This module shall not duplicate or replace them.

---

## 6.3 Capacity Rules

The following positions are unique per academic year:

- 1 Head Boy
- 1 Head Girl
- 1 Sports Captain

The system must enforce uniqueness.

---

## 6.4 Leadership Lifecycle

Leadership appointments are:

- Academic-Year Based
- Historically Preserved

Appointments automatically expire when:

- Academic Year Ends
- Student Graduates
- Student Transfers
- Student Becomes Inactive

---

# 7. House Prefect Architecture

## 7.1 House-Specific Prefects

Prefects belong to Houses.

Examples:

- Blue House Prefect
- Green House Prefect
- Yellow House Prefect
- Red House Prefect

---

## 7.2 Prefect Capacity

Multiple Prefects may exist within a House.

The platform does not impose capacity limits.

Schools determine operational usage.

---

# 8. Governance Boundaries

## 8.1 Assignment Authority

Only:

- School Admin
- Principal

may assign:

- Head Boy
- Head Girl
- Sports Captain
- Prefects
- Council Members
- Club Coordinators

---

## 8.2 Teacher Authority

Teachers may not:

- Appoint Leadership Positions
- Modify Council Membership
- Assign Prefects

unless explicitly acting under School Admin authority.

---

# 9. Integration Boundaries

## 9.1 Future Event Integration

Future integration with Phase 2D will permit:

- Club Participation in Events
- Council Participation in Events
- Leadership Participation Tracking

---

## 9.2 Future Notification Integration

Future integration with Phase 2F will permit:

- Club Announcements
- Club Notifications
- Council Notifications

---

## 9.3 Phase 2E Protection

This module shall not:

- Create Point Categories
- Award Club Points
- Generate Club Rankings
- Create Club Achievements

Phase 2E remains the sole authority for Points, Achievements and Recognition.

---

# 10. Data Retention Strategy

## 10.1 Deletion Policy

All records use:

```text
Soft Delete + Archive
```

Hard deletion is prohibited.

---

## 10.2 Historical Preservation

The following records must be preserved permanently:

- Club History
- Membership History
- Coordinator History
- Council History
- Leadership History
- Prefect History

---

# 11. Architecture Verdict

Phase 2H introduces:

- Student Clubs
- Student Councils
- House Prefects
- Advanced Leadership

while preserving:

- Houses
- House Competition
- Points
- Recognition
- Teacher Governance

The architecture intentionally avoids expanding EduPulse into a Club Competition platform and remains aligned with the core mission of student participation, events, houses, points, and recognition.