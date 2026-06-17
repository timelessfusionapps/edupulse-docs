# EduPulse Dashboard & Analytics Readiness Assessment

## 1. Dashboard Implementation Status
Physical inspection reveals that **partial frontend implementation** exists for the Dashboard module. The UI relies on a mixture of live Firestore streams and hardcoded mock data.

**Located Files:**
- **Screens:** `/Users/murtazasulaihi/Developer/EduPulse/apps/admin_app/lib/features/dashboard/presentation/screens/dashboard_screen.dart`
- **Blocs:** `/Users/murtazasulaihi/Developer/EduPulse/apps/admin_app/lib/features/dashboard/presentation/bloc/dashboard_bloc.dart`
- **Datasources:**
  - `/Users/murtazasulaihi/Developer/EduPulse/apps/admin_app/lib/features/dashboard/data/datasources/firebase/firebase_dashboard_kpi_datasource_impl.dart`
  - `/Users/murtazasulaihi/Developer/EduPulse/apps/admin_app/lib/features/dashboard/data/datasources/firebase/firebase_dashboard_leaderboard_datasource_impl.dart`
  - `/Users/murtazasulaihi/Developer/EduPulse/apps/admin_app/lib/features/dashboard/data/datasources/firebase/firebase_dashboard_analytics_datasource_impl.dart`
  - `/Users/murtazasulaihi/Developer/EduPulse/apps/admin_app/lib/features/dashboard/data/datasources/firebase/firebase_dashboard_feed_datasource_impl.dart`

**Dashboard Data Source Audit:**
- **KPIs:** A. Live Firestore (`dashboard_metrics/kpis`)
- **Leaderboard:** A. Live Firestore (`leaderboards/{typeStr}/entries`)
- **Global Feed:** A. Live Firestore (`activities`)
- **Upcoming Events:** D. Hardcoded values (`_mockEvents` array in `dashboard_screen.dart`)
- **Trend Values:** D. Hardcoded values (e.g., `trendValue: '↑ 8%'` in `dashboard_screen.dart`)

## 2. Analytics Implementation Status
The backend logic to compute analytics is practically non-existent.
- **Implemented:** A minimal `AnalyticsService` (`08_Firebase/Functions/src/analytics/services.ts`) exists with a single `appendSnapshot` method that writes to an `analytics_history` collection.
- **Implemented:** `PointTransactionOrchestrator` (`08_Firebase/Functions/src/activities/OrchestrationService.ts`) increments `totalPoints` for a student when a point transaction is created.
- **Missing:** There are no scheduled Cloud Functions or trigger-based orchestrators that aggregate these points into House rankings, compute participation rates, or update the `leaderboards` collection. 

## 3. Existing Aggregation Logic
**None.**
Cross-module aggregation does not exist. Data streams in the UI point to Firebase collections (e.g., `dashboard_metrics`) that are currently only populated by a Stress Tester (`DashboardAnalyticsStressTester`) rather than actual business logic.

## 4. Missing Aggregation Logic
The codebase completely lacks backend services required to unify isolated modules (Phase 2C - 2H). Missing logic includes:
- Cross-module data pipelines (Student Management + Events + Points + Governance).
- CRON jobs (Pub/Sub) for Daily, Weekly, and Monthly snapshot aggregation.
- Synchronous or asynchronous Leaderboard re-ranking engines.

## 5. Missing Analytics
A comprehensive suite of analytics must be built for the various user portals:
- **School Dashboard:** Total active events, system-wide participation rates, overall point distribution, top homeroom calculations.
- **House Dashboard:** Dynamic house standing calculations, daily/weekly point deltas, contribution by grade level.
- **Student Dashboard:** Individual rank percentiles, point trend analysis, attendance summaries.
- **Teacher Dashboard:** Teacher governance summaries, recognition impact scores, class performance metrics.
- **Event Dashboard:** Event participation counts, RSVP vs. Attendance ratios.
- **Recognition Dashboard:** Badge unlock velocity, achievement distributions.

## 6. Phase 2I Necessity Verdict
**PHASE 2I REQUIRED**

**Evidence:**
Option C (Phase 2I Analytics & Dashboards Is Entirely Required) is the correct assessment. While the UI layer has been stubbed out and connected to Firestore, the underlying Firestore collections receive no real analytical data. The backend lacks the necessary aggregation orchestrators to unify Phase 2C-2H modules. The Dashboard is currently a UI shell.

## 7. Recommended Next Step
Phase 2I Analytics & Dashboards must be fully developed and deployed **BEFORE** conducting the Phase-by-Phase Verification Review.

If the Verification Review of Phase 2 (Platform Integration) proceeds without Phase 2I, the review will inevitably fail, as the integrated modules have no way to surface their cross-module impact to the end user without the dashboard and analytics backend.
