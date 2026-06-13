# EduPulse Analytics & Dashboard Operational Implementation Plan

## Document Information

| Field | Value |
|----------|----------|
| Module | Phase 2I – Analytics & Dashboards |
| Document Type | Operational Implementation Plan |
| Target Path | `09_Docs/Phase_2_Core_Platform_Modules/Phase_2I_Analytics_Dashboards/EduPulse_Analytics_Dashboard_Operational_Implementation_Plan.md` |

---

## 1. Implementation Scope
This implementation blueprint transforms the approved Phase 2I architecture into actionable development directives. The scope encompasses the backend Aggregation Engine, centralized Analytics Storage, Data Services, and the frontend Dashboard UI layer. It explicitly excludes the modification of operational records and the implementation of automated intelligent workflows (Phase 3A).

## 2. Directory Structure
All implementation shall strictly reside within the following bounded context:
`apps/admin_app/lib/features/analytics_dashboard/`

All tests shall strictly reside within:
`apps/admin_app/test/features/analytics_dashboard/`

**Prohibited Structure:**
The creation of nested duplicate application paths (e.g., `apps/admin_app/apps/admin_app/`) is strictly forbidden and will immediately block certification.

## 3. Entity Plan
The domain layer will define the following core entities:
- **DashboardSummaryEntity:** Represents aggregated school-wide KPIs (total students, events, points, recognitions).
- **StudentRankingEntity:** Represents student leaderboard entries (StudentId, Rank, Total Points, Academic Year).
- **HouseRankingEntity:** Represents house leaderboard standings (HouseId, Rank, Total Points, Academic Year).
- **ClassRankingEntity:** Represents class standings based on Average Points Per Student.
- **ParticipationAnalyticsEntity:** Tracks event, class, and house participation rates.
- **RecognitionAnalyticsEntity:** Tracks recognition counts, distribution, and trends over time.
- **AnalyticsSnapshotEntity:** Encapsulates immutable historical data points for terms and academic years.
- **AnalyticsAuditRecord:** Tracks snapshot lifecycle and rebuild operations.

## 4. Repository Plan
The repository layer will interface between the domain and datasources:
- **DashboardRepository:** Aggregates and provides unified dashboard datasets.
- **StudentRankingRepository:** Manages retrieval of student ranking datasets.
- **HouseRankingRepository:** Manages retrieval of house ranking datasets.
- **ClassRankingRepository:** Manages retrieval of class ranking datasets.
- **ParticipationAnalyticsRepository:** Manages participation metric datasets.
- **RecognitionAnalyticsRepository:** Manages recognition trend datasets.
- **AnalyticsSnapshotRepository:** Manages reading and persistence of immutable snapshots.

## 5. Datasource Plan
All Firestore datasources will operate strictly under the centralized analytics domain:
`schools/{schoolId}/analytics/`

**Subcollections:**
- `/dashboards/`
- `/student_rankings/`
- `/house_rankings/`
- `/class_rankings/`
- `/participation/`
- `/recognition/`
- `/snapshots/`
- `/audit_logs/`

Access boundaries will be enforced via Firestore Security Rules, ensuring multi-tenant isolation. No analytics data will be stored within operational module paths.

## 6. Service Plan
Domain services will form the Aggregation Engine:
- **StudentRankingService:** Calculates school-wide and class-wise rankings based strictly on points.
- **HouseRankingService:** Calculates house standings based strictly on House Points.
- **ClassRankingService:** Calculates average points per student.
- **ParticipationAnalyticsService:** Aggregates participation percentages across events, classes, and houses.
- **RecognitionAnalyticsService:** Aggregates recognition counts by month, term, and academic year.
- **SnapshotGenerationService:** Responsible for generating immutable Term and Academic-Year snapshots.

## 7. Bloc Plan
The presentation state management will consist of:
- **DashboardBloc:** Manages state for the overarching School Dashboard.
- **HouseAnalyticsBloc:** Manages state for House-specific metrics and standings.
- **StudentAnalyticsBloc:** Manages state for individual student insights and achievements.
- **RankingsBloc:** Manages state for displaying Student, House, and Class leaderboards.

## 8. Screen Plan
The UI layer will purely consume data services and handle no business calculations.
- **School Dashboard Screen:** Displays high-level KPIs, overall rankings, and school-wide participation/recognition metrics.
- **House Dashboard Screen:** Displays house standings, house-specific participation, and top contributors.
- **Student Dashboard Screen:** Displays individual points, participation records, and earned achievements.

## 9. Snapshot & Leaderboard Freeze Plan
- **Snapshot Creation:** Triggered via scheduled Cloud Functions at the end of defined periods (Terms/Academic Years).
- **Snapshot Finalization:** Validates completeness and locks the record.
- **Snapshot Versioning:** Snapshots must include `snapshotVersion`, `generatedAt`, `generatedBy`, and `sourceAcademicYear`.
- **Snapshot Retention Governance:** Snapshots may never be hard deleted. They remain permanently auditable.
- **Historical Retrieval:** UI strictly reads from finalized snapshots when requesting historical comparisons.
- **Immutability Enforcement:** Firestore security rules and backend validators will prevent updates or deletions of finalized snapshot documents.
- **Leaderboard Freeze Rules:** A **Term Ranking Freeze** and an **Academic-Year Ranking Freeze** are enforced immediately after snapshot finalization.

## 10. Analytics Rebuild Governance
Rebuild operations are heavily strictly governed:
- **Full Rebuild:** Complete regeneration of all historical analytics.
- **Partial Rebuild:** Targeted regeneration of specific datasets.
- **Academic-Year Rebuild:** Regeneration of a specific academic year's analytics.
- **Term Rebuild:** Regeneration of a specific term's analytics.

**Rule:** Snapshots must never be overwritten. Rebuilds strictly create new versions.

## 11. Ranking Tie & Participation Governance
- **Ranking Tie Governance:** Rule: Equal points = equal rank. Tie handling must preserve identical ranks for identical point values.
- **Participation Governance:** Participation Analytics must be calculated exclusively from actual participants. Assigned students must not be counted as participants.

## 12. Testing Plan
All tests will reside in `apps/admin_app/test/features/analytics_dashboard/`.
- **Rankings:** Validate that participation does not alter house rankings, and class rankings correctly compute averages.
- **Participation:** Validate accurate percentage calculations against operational event counts.
- **Recognition:** Validate time-series aggregation logic.
- **Snapshots:** Verify that finalized snapshots cannot be mutated.
- **Multi-Tenant Protection:** Assert that queries cannot span multiple `schoolId` paths.

## 13. Analytics Audit Trail Planning
A new `AnalyticsAuditRecord` will track critical operations to ensure traceability. It must track:
- Snapshot Creation
- Snapshot Finalization
- Rebuild Operations
- Ranking Regeneration

## 14. Multi-Tenant Plan
The module enforces strict `schoolId` segregation. All Firebase queries, service logic, and repository methods must inject and scope against the tenant ID. Cross-tenant aggregation is categorically prohibited.

## 15. Cost & Cache Governance Plan
The implementation uses a **Hybrid Refresh Strategy**:
- Immediate updates are restricted to lightweight point totals and rank shifts.
- Scheduled updates via background workers aggregate heavy historical, participation, and recognition metrics.
- **Analytics Cache Governance:** The Dashboard UI must never query operational collections directly. It must consume analytics collections only.
- **Cost Protection Thresholds:** Full population scans on dashboard load are strictly prohibited. Historical recalculation during normal dashboard access is strictly prohibited.

## 16. Phase Protection Plan
Phase 2I is explicitly prohibited from executing operational workflows. 
**Explicit Rule:** Phase 2I may READ from prior phases. Phase 2I may never WRITE to prior phases.

**Exclusions (Reserved for Phase 3A):**
- Notification Automation
- AI Predictions and Recommendations
- Workflow Automation
- Cross-Module Command Execution

## 17. Risks
- **Data Skew during Initial Sync:** Generating the first batch of analytics for schools with massive existing operational datasets might timeout Cloud Functions if not paginated.
- **Stale Data Expectations:** Users must be educated that complex analytics (like participation trends) refresh on a schedule, rather than synchronously in real-time.

## 18. Final Verdict
**READY FOR IMPLEMENTATION REVIEW**
