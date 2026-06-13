# EduPulse Analytics & Dashboard Execution Plan

## Document Information

| Field | Value |
|----------|----------|
| Module | Phase 2I – Analytics & Dashboards |
| Document Type | Execution Plan |
| Status | Approved Execution Baseline |
| Depends On | Analytics Architecture, Analytics Governance |
| Version | 1.0 |

---

# 1. Purpose

This document defines the execution strategy for implementing Phase 2I Analytics & Dashboards.

The purpose of this phase is to create the centralized analytical intelligence layer of EduPulse.

Phase 2I shall:

- Aggregate platform data
- Generate rankings
- Generate participation analytics
- Generate recognition analytics
- Generate dashboard-ready datasets
- Generate historical analytical snapshots

Phase 2I shall not become the owner of operational records.

---

# 2. Implementation Principles

Implementation shall follow the same architectural discipline used in:

- Phase 2G
- Phase 2H

The module shall remain:

- Independent
- Testable
- Auditable
- Multi-tenant safe
- Cost-efficient

---

# 3. Implementation Boundaries

All implementation shall remain inside:

apps/admin_app/lib/features/analytics_dashboard/

All tests shall remain inside:

apps/admin_app/test/features/analytics_dashboard/

---

## Strictly Prohibited

The following path shall never be created:

apps/admin_app/apps/admin_app/

Any nested duplicate application structure shall immediately block implementation.

---

# 4. Domain Ownership

Phase 2I owns:

- Analytics
- Aggregations
- Rankings
- Dashboard Datasets
- Historical Snapshots

Phase 2I does not own:

- Students
- Events
- Attendance
- Points
- Recognition
- Notifications
- Governance
- Clubs
- Leadership

---

# 5. Proposed Module Structure

analytics_dashboard/

domain/

- entities/
- repositories/
- services/
- validators/

data/

- datasources/
- repositories_impl/

presentation/

- bloc/
- screens/

---

# 6. Core Analytics Entities

The following entities shall be created.

---

## DashboardSummaryEntity

Represents School Dashboard summary information.

Contains:

- Academic Year
- Total Students
- Total Events
- Total Points
- Total Recognitions
- Participation %

---

## StudentRankingEntity

Contains:

- StudentId
- Rank
- Total Points
- Academic Year

---

## HouseRankingEntity

Contains:

- HouseId
- Rank
- Total Points
- Academic Year

---

## ClassRankingEntity

Contains:

- ClassId
- Average Points Per Student
- Rank
- Academic Year

---

## ParticipationAnalyticsEntity

Contains:

- EventId
- Assigned Students
- Participated Students
- Participation %

---

## RecognitionAnalyticsEntity

Contains:

- Period
- Recognition Count
- Recognition Distribution

---

## AnalyticsSnapshotEntity

Contains:

- Snapshot Type
- Snapshot Period
- Snapshot Data
- Created Timestamp

Snapshots shall be immutable.

---

# 7. Repository Layer

Repositories shall include:

## DashboardRepository

Provides dashboard datasets.

---

## StudentRankingRepository

Provides student rankings.

---

## HouseRankingRepository

Provides house rankings.

---

## ClassRankingRepository

Provides class rankings.

---

## ParticipationAnalyticsRepository

Provides participation analytics.

---

## RecognitionAnalyticsRepository

Provides recognition analytics.

---

## AnalyticsSnapshotRepository

Provides snapshot persistence.

---

# 8. Aggregation Services

The Aggregation Engine shall be implemented as domain services.

---

## StudentRankingService

Responsible for:

- School-wide rankings
- Class-wise rankings

Ranking Basis:

Points only.

---

## HouseRankingService

Responsible for:

- House standings

Ranking Basis:

House Points only.

Participation shall not affect ranking.

---

## ClassRankingService

Responsible for:

Average Points Per Student.

This rule shall be fixed.

---

## ParticipationAnalyticsService

Responsible for:

- Event Participation
- Class Participation
- House Participation

---

## RecognitionAnalyticsService

Responsible for:

- Monthly Recognition Analytics
- Term Recognition Analytics
- Academic-Year Recognition Analytics

---

## SnapshotGenerationService

Responsible for:

- Term Snapshots
- Academic-Year Snapshots
- Historical Rankings

---

# 9. Firebase Datasources

Create dedicated Firestore datasources.

---

## DashboardDatasource

Reads dashboard summaries.

---

## RankingDatasource

Reads ranking collections.

---

## ParticipationDatasource

Reads participation analytics.

---

## RecognitionDatasource

Reads recognition analytics.

---

## SnapshotDatasource

Reads and writes snapshots.

---

# 10. Analytics Storage Architecture

Analytics shall be stored under:

schools/{schoolId}/analytics/

Subcollections:

- dashboards/
- student_rankings/
- house_rankings/
- class_rankings/
- participation/
- recognition/
- snapshots/

No analytics data shall be stored in operational modules.

---

# 11. Refresh Strategy

Approved Model:

Hybrid Refresh

---

## Immediate Updates

Triggered by:

- Point Changes
- House Point Changes

Updates:

- Student Rankings
- House Rankings

---

## Scheduled Updates

Triggered periodically.

Updates:

- Participation Analytics
- Recognition Trends
- Historical Summaries

---

# 12. Dashboard Data Services

Dashboards shall consume only Dashboard Data Services.

Dashboards shall never calculate analytics directly.

Architecture:

Operational Records
↓
Aggregation Services
↓
Analytics Collections
↓
Dashboard Data Services
↓
UI

---

# 13. Dashboard Screens

The following screens shall be implemented.

---

## School Dashboard Screen

Displays:

- School KPIs
- Rankings
- Participation Metrics
- Recognition Metrics

---

## House Dashboard Screen

Displays:

- House Standing
- Participation Metrics
- Recognition Metrics
- Top Contributors

---

## Student Dashboard Screen

Displays:

- Points
- Participation
- Achievements
- Leadership Summary
- Club Summary

---

# 14. Bloc Layer

Create:

---

## DashboardBloc

Handles:

School Dashboard

---

## HouseAnalyticsBloc

Handles:

House Dashboard

---

## StudentAnalyticsBloc

Handles:

Student Dashboard

---

## RankingsBloc

Handles:

Student
House
Class Rankings

---

# 15. Validators

Create:

---

## RankingValidator

Ensures ranking integrity.

---

## SnapshotValidator

Ensures immutable snapshots.

---

## AnalyticsPeriodValidator

Validates:

- Academic Year
- Term
- Monthly Periods

---

# 16. Historical Analytics

Support:

- Current Academic Year
- Historical Academic Years
- Term Comparisons
- Monthly Comparisons

Historical analytics shall prefer snapshots over recalculation.

---

# 17. Cost Governance Implementation

Implementation must optimize:

- Read Costs
- Write Costs
- Storage Costs

---

## Required Rule

Read analytics collections.

Do not repeatedly read operational records.

---

## Required Rule

Reuse snapshots whenever possible.

---

## Required Rule

Prevent unnecessary ranking recalculations.

---

# 18. Multi-Tenant Protection

All analytics operations shall remain bounded to:

schools/{schoolId}

Cross-tenant analytics are prohibited.

Cross-school analytics are prohibited.

---

# 19. Audit Requirements

Audit records shall exist for:

- Snapshot Generation
- Snapshot Finalization
- Analytics Regeneration
- Historical Rebuild Operations

Audit records shall be immutable.

---

# 20. Testing Requirements

Mandatory tests:

---

## Ranking Tests

- Student Rankings
- House Rankings
- Class Rankings

---

## Participation Tests

- Event Participation
- Class Participation
- House Participation

---

## Recognition Tests

- Monthly
- Term
- Academic Year

---

## Snapshot Tests

- Creation
- Immutability
- Historical Retrieval

---

## Multi-Tenant Tests

- Tenant Isolation
- Query Boundaries

---

# 21. Phase Protection Verification

Implementation shall not modify:

- Phase 2C
- Phase 2D
- Phase 2E
- Phase 2F
- Phase 2G
- Phase 2H

Phase 2I may consume data only.

---

# 22. Phase 3A Integration Protection

The following are explicitly out of scope:

- Notification Automation
- AI Recommendations
- Predictive Analytics
- Workflow Automation
- Cross-Module Command Execution

These belong to future integration phases.

---

# 23. Execution Success Criteria

Phase 2I implementation shall be considered complete only when:

- Analytics Engine exists
- Aggregation Services exist
- Rankings exist
- Participation Analytics exist
- Recognition Analytics exist
- Snapshot Architecture exists
- Dashboard Data Services exist
- Tests pass
- Multi-tenant protection verified
- Cost governance implemented

---

# 24. Execution Verdict

Phase 2I establishes the centralized analytics and dashboard intelligence layer for EduPulse.

It transforms operational platform data into scalable, cost-efficient, historically reliable insights while preserving strict ownership boundaries and preparing the platform for Phase 3A Integration.