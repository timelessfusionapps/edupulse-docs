# EduPulse_Points_Achievements_Recognition_Architecture.md

# Phase 2E — Points, Achievements & Recognition Architecture

Version: 1.0
Status: Architecture Approved
Phase: 2E

---

## 1. Purpose

The Points, Achievements & Recognition Module serves as the recognition and merit engine of EduPulse.

It provides:

- Student Points
- Class Points
- House Points
- Achievements
- Badges
- Recognition Records
- Leaderboards
- Historical Snapshots

This module consumes Events, Activities, and Manual Awards while providing future integrations for Notifications, Reports, Analytics, Parent Portal, and AI Intelligence.

---

## 2. Architectural Principles

### Permanent Ledger

All point transactions are immutable.

Points are never edited or deleted.

Corrections are performed using reversal transactions.

---

### Academic Year Isolation

All leaderboards and rankings belong to a specific Academic Year.

Academic Year closure archives:

- Points
- Leaderboards
- Achievements
- Badges
- Recognition Records

---

### Event Independence

The module must operate independently of Events.

Points, Achievements, and Recognition may be awarded manually without requiring an Event.

---

### Multi-Tenant Isolation

All data must be scoped to:

schools/{schoolId}

No cross-school visibility is permitted.

---

## 3. Core Domains

### Points Engine

Supports:

- Student Points
- Class Points
- House Points

A Point Transaction may contribute to one or more targets.

Examples:

Sports Day Winner:
- Student
- House

Class Quiz:
- Student
- Class
- House

---

### Achievement Engine

Represents meaningful accomplishments.

Examples:

- Math Champion
- Science Excellence
- Sports Star
- Perfect Attendance
- Leadership Excellence

Achievements never expire.

Achievements become archived historical records after Academic Year closure.

---

### Badge Engine

Badges are visual representations of accomplishments.

Badges may be:

- Manual
- Automatic

Badge expiry is configurable.

Supported expiry modes:

- End of Term
- End of Academic Year
- Custom Date
- Never Expires

---

### Recognition Engine

Recognition Records capture meaningful contributions.

Examples:

- Community Service
- Volunteer Contribution
- School Representation
- Event Support
- Outstanding Conduct

Recognition Records may exist with or without points.

---

## 4. Point Sources

Supported Sources:

- Event Results
- Activities
- Manual Awards
- Manual Deductions
- Achievement Bonus Points
- Badge Bonus Points

---

## 5. Point Categories

School Configurable.

Examples:

- Academic
- Sports
- Leadership
- Behaviour
- Service
- Attendance

---

## 6. Deduction Categories

School Configurable.

Examples:

- Discipline
- Uniform Violation
- Late Submission
- Misconduct

---

## 7. Achievement Categories

School Configurable.

Examples:

- Academic
- Sports
- Leadership
- Behaviour
- Service
- Arts
- Attendance

---

## 8. Recognition Categories

School Configurable.

Examples:

- Community Service
- School Representation
- Volunteer Work
- Mentorship
- Event Contribution

---

## 9. Leaderboards

Supported Leaderboards:

### Student Leaderboard

Ranks Students by Total Points.

### Class Leaderboard

Ranks Classes by Total Points.

### House Leaderboard

Ranks Houses by Total Points.

Leaderboard updates occur in real-time when connectivity is available.

Offline transactions synchronize and recalculate rankings upon reconnection.

---

## 10. Championship Logic

Version 1:

House Champion =
Highest House Points

Class Champion =
Highest Class Points

Future Enhancement:

Custom Championship Formula Engine.

---

## 11. Historical Snapshots

At Academic Year Closure:

Create immutable snapshots of:

- Student Rankings
- Class Rankings
- House Rankings

Store:

- Champion
- Final Score
- Ranking Position

Historical snapshots remain permanently available.

---

## 12. Visibility Layer

Each Achievement, Badge, and Recognition Record supports:

- studentVisible
- parentVisible
- teacherVisible

No Parent Portal UI is included in Phase 2E.

Visibility metadata is stored for future phases.

---

## 13. Approval Engine

Supports:

- Award Approval
- Deduction Approval

Approval Roles are fully configurable.

Examples:

Teacher
→ House Master
→ School Admin

or

Teacher
→ Principal

---

## 14. Bulk Operations

Supports bulk assignment of:

- Points
- Achievements
- Badges
- Recognition Records

Targets:

- Student Groups
- Classes
- Houses
- Event Participants

---

## 15. Integration Hooks

### Consumes

Phase 2C:
- Students
- Leadership Assignments

Phase 2D:
- Event Results
- Rankings
- Participation

### Provides

Future:
- Notifications
- Reporting
- Analytics
- Parent Portal
- AI Intelligence

---

## 16. Core Entities

Points:

- PointTransactionEntity
- PointLedgerEntity
- PointCategoryEntity
- DeductionCategoryEntity

Achievements:

- AchievementEntity
- AchievementTemplateEntity
- AchievementCategoryEntity

Badges:

- BadgeEntity
- BadgeTemplateEntity

Recognition:

- RecognitionEntity
- RecognitionTemplateEntity

Leaderboards:

- StudentLeaderboardEntity
- ClassLeaderboardEntity
- HouseLeaderboardEntity
- LeaderboardSnapshotEntity

Approvals:

- ApprovalRequestEntity
- ApprovalWorkflowEntity

---

## 17. Repository Layer

Required Repositories:

- PointsRepository
- AchievementRepository
- BadgeRepository
- RecognitionRepository
- LeaderboardRepository
- ApprovalRepository
- SnapshotRepository

---

## 18. Certification Requirements

No repository, datasource, service, validator, bloc, or screen may be certified if:

- Empty
- Placeholder
- Stubbed
- TODO-based

Execution Audit and Re-Audit are mandatory.