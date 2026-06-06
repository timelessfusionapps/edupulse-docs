# Dashboard Runtime Widget Map

## Goal
Map the existing EduPulse Dashboard UI into isolated runtime rebuild zones.

## KPI Runtime Zone
Widgets:
- DashboardKpiStrip
- StudentCountCard
- AttendanceCard
- RewardsCard
- CompetitionCard

Rules:
- Independent BlocSelector subscriptions
- No chart rebuild propagation
- Realtime-safe incremental updates

## Chart Runtime Zone
Widgets:
- StudentGrowthChart
- ParticipationTrendChart
- HousePerformanceChart
- AttendanceAnalyticsChart

Rules:
- Independent analytics streams
- Axis preservation
- Animation-safe rendering
- Throttled updates

## Feed Runtime Zone
Widgets:
- DashboardActivityFeed
- AchievementFeed
- SystemEventsFeed

Rules:
- Pagination-safe rendering
- Append-only updates
- Scroll anchor preservation

## Leaderboard Runtime Zone
Widgets:
- TopStudentsLeaderboard
- TopHousesLeaderboard
- CompetitionLeaderboard

Rules:
- Deterministic ordering
- Stable ranking transitions
- Optimistic-safe rendering

## Notification Runtime Zone
Widgets:
- NotificationPanel
- AlertsWidget
- ModerationQueue

Rules:
- Isolated rebuilds
- Realtime-safe insertions
- Cached alert rendering
