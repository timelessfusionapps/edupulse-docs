# EduPulse Analytics & Dashboard Architecture

## Document Information

| Field | Value |
|----------|----------|
| Module | Phase 2I – Analytics & Dashboards |
| Document Type | Architecture |
| Status | Approved Architecture Baseline |
| Depends On | Phase 2B, 2C, 2D, 2E, 2F, 2G, 2H |
| Architecture Version | 1.0 |

---

# 1. Purpose

Phase 2I establishes the Analytics and Dashboard Intelligence Layer of EduPulse.

The purpose of this phase is not to create new operational data.

The purpose is to:

- Aggregate platform data
- Calculate analytics
- Generate rankings
- Generate participation metrics
- Generate recognition metrics
- Produce dashboard-ready data
- Preserve historical analytical snapshots

Phase 2I serves as the read-optimized intelligence layer of EduPulse.

---

# 2. Architectural Principle

All previous phases act as Operational Systems of Record.

Examples:

- Phase 2C owns Students
- Phase 2D owns Events
- Phase 2E owns Points & Recognition
- Phase 2F owns Notifications
- Phase 2G owns Governance
- Phase 2H owns Clubs & Leadership

Phase 2I owns none of the above operational data.

Phase 2I owns:

- Analytics
- Aggregations
- KPIs
- Rankings
- Dashboard Data
- Historical Analytical Snapshots

---

# 3. Analytics Ownership Boundaries

## Phase 2I Owns

### Student Analytics

- Student Rankings
- Student Participation Metrics
- Student Achievement Metrics
- Student Historical Analytics

### House Analytics

- House Rankings
- House Participation Metrics
- House Achievement Metrics
- House Historical Performance

### Class Analytics

- Class Rankings
- Average Points Per Student
- Class Participation Metrics

### Event Analytics

- Participation Metrics
- Attendance Metrics
- Event Outcome Metrics

### Recognition Analytics

- Recognition Totals
- Recognition Trends
- Recognition Distribution Metrics

### Dashboard Aggregations

- School Dashboard Data
- House Dashboard Data
- Student Dashboard Data

---

## Phase 2I Does Not Own

### Students

Owned by Phase 2C

### Events

Owned by Phase 2D

### Points

Owned by Phase 2E

### Recognition Records

Owned by Phase 2E

### Notifications

Owned by Phase 2F

### Governance

Owned by Phase 2G

### Leadership

Owned by Phase 2H

---

# 4. Dashboard Scope

Phase 2I officially supports:

## School Dashboard

Provides institution-wide visibility.

## House Dashboard

Provides house-specific visibility.

## Student Dashboard

Provides student-specific visibility.

---

Teacher Dashboards are not included in Phase 2I.

Teacher analytics may exist as backend calculations only.

---

# 5. Aggregation Engine Architecture

The Analytics Engine shall aggregate information from:

- Students
- Events
- Attendance
- Points
- Recognition
- Leadership
- Clubs

Aggregation services shall generate:

### Rankings

- Student Rankings
- House Rankings
- Class Rankings

### Participation Analytics

- Student Participation
- Class Participation
- House Participation

### Recognition Analytics

- Student Recognition
- House Recognition
- School Recognition

### Historical Analytics

- Term Analytics
- Academic Year Analytics
- Historical Trends

The Aggregation Engine shall be independent of UI components.

---

# 6. Dashboard Data Service Architecture

Dashboards shall never directly calculate analytics.

Dashboards shall consume precomputed analytical data.

Architecture:

Operational Data
↓
Aggregation Engine
↓
Analytics Collections
↓
Dashboard Data Services
↓
Dashboard UI

This architecture minimizes Firebase costs and improves performance.

---

# 7. Firebase Cost Governance

Phase 2I shall be designed using a cost-aware architecture.

## Objective

Minimize:

- Firestore Reads
- Firestore Writes
- Repeated Aggregations
- Expensive Queries

---

## Prohibited Pattern

Dashboard Open
↓
Read Thousands of Records
↓
Calculate Rankings

---

## Approved Pattern

Dashboard Open
↓
Read Analytics Snapshot

---

## Hybrid Refresh Strategy

### Immediate Updates

Lightweight calculations:

- Student Point Totals
- House Point Totals
- Current Rankings

---

### Scheduled Updates

Heavy calculations:

- Participation Analytics
- Recognition Trends
- Historical Analytics
- Academic Year Summaries

---

# 8. Centralized Analytics Storage

Analytics shall be stored in a centralized analytics domain.

Structure:

schools/{schoolId}/analytics/

Subdomains:

- dashboards/
- student_rankings/
- house_rankings/
- class_rankings/
- participation/
- recognition/
- snapshots/

No analytics data shall be stored inside operational modules.

---

# 9. Snapshot Architecture

Phase 2I shall preserve immutable analytics snapshots.

Supported snapshot periods:

## Term Snapshots

- Term 1
- Term 2
- Term 3

## Academic Year Snapshots

- 2026
- 2027
- 2028

## Ranking Snapshots

- Student Rankings
- House Rankings
- Class Rankings

Snapshots shall never be modified once finalized.

---

# 10. Historical Analytics Strategy

Phase 2I supports:

## Current Year Analytics

Current Academic Year

---

## Historical Comparison Analytics

Academic Year vs Academic Year

---

## Term Comparison Analytics

Term vs Term

---

Historical analytics shall be read from snapshots whenever possible.

---

# 11. Leaderboard Architecture

## Student Leaderboards

Supported:

- School-Wide Rankings
- Class-Wise Rankings

Ranking Basis:

Total Points Only

Achievements and Participation remain independent metrics.

---

## House Leaderboards

Supported:

- Current Academic Year Rankings
- Historical Rankings

Ranking Basis:

Total House Points

---

## Class Leaderboards

Ranking Basis:

Average Points Per Student

This rule shall be fixed and visible in the dashboard interface.

This prevents larger classes from gaining unfair advantage.

---

# 12. Participation Analytics Architecture

Participation Analytics shall support:

## School Level

- Total Events Conducted
- Total Participants
- Participation %

---

## Event Level

- Assigned Students
- Participated Students
- Participation %
- Points Awarded

---

## Class Level

- Participation %
- Event Participation Counts

---

## House Level

- Participation %
- Event Participation Counts

---

# 13. Recognition Analytics Architecture

Recognition Analytics shall support:

## Monthly Analytics

Recognition by Month

---

## Term Analytics

Recognition by Term

---

## Academic Year Analytics

Recognition by Academic Year

---

## Student Recognition Metrics

- Recognition Count
- Recognition History

---

## House Recognition Metrics

- Recognition Distribution
- Recognition Trends

---

# 14. Student Analytics Architecture

Student Analytics shall support:

- Events Participated
- Points Earned
- Achievements Earned
- House Contribution
- Leadership History
- Club Membership History

Phase 2I stores analytical summaries only.

Operational records remain owned by source modules.

---

# 15. Club Analytics Architecture

Supported:

- Membership Counts
- Participation Counts

Explicitly Excluded:

- Club Rankings
- Club Points
- Club Competitions

This maintains alignment with EduPulse's mission.

---

# 16. Security & Multi-Tenant Architecture

All analytics data shall remain bounded to:

schools/{schoolId}

Cross-school analytics are prohibited.

Cross-tenant access is prohibited.

---

# 17. Phase Protection Boundaries

Phase 2I shall not modify:

### Phase 2C

Student Records

### Phase 2D

Event Records

### Phase 2E

Points & Recognition Records

### Phase 2F

Notifications

### Phase 2G

Governance

### Phase 2H

Leadership & Clubs

Phase 2I may read data from these phases but shall never become the authoritative source.

---

# 18. Phase 3A Integration Protection

Phase 2I shall not implement:

- Cross-Module Business Logic Rewrites
- Notification Automation
- Event Automation
- AI Recommendations
- Predictive Analytics

Phase 2I exists solely to provide analytics and dashboard intelligence.

Platform-wide orchestration and deep integration belong to Phase 3A.

---

# 19. Architecture Verdict

Phase 2I establishes the centralized Analytics and Dashboard Intelligence Layer of EduPulse.

It transforms operational data into measurable participation, recognition, ranking, and engagement insights while maintaining strict ownership boundaries across all prior phases.

The architecture is optimized for:

- Scalability
- Cost Efficiency
- Historical Analysis
- Multi-Tenant Safety
- Future Platform Integration

House Rankings shall be calculated exclusively from House Points
owned by Phase 2E.

Participation Metrics shall remain analytical indicators only
and shall never influence House Rankings.

Participation %, Event Participation, Recognition Counts,
Leadership Participation, or Club Participation shall not alter
House Standing calculations.

This ensures:
- Transparent ranking logic
- Easy school-wide understanding
- Consistency with Phase 2E
- Fair competitive scoring