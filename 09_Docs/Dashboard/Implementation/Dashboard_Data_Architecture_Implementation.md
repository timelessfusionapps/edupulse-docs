# Dashboard Data Architecture Implementation

## Goal

Implement the scalable backend-ready data orchestration architecture for the EduPulse Dashboard module.

This phase establishes:
- repository orchestration
- datasource architecture
- analytics snapshot strategy
- realtime feed structures
- leaderboard runtime data
- notification runtime data
- pagination-safe feed architecture
- offline-safe runtime preparation
- future DashboardBloc integration

IMPORTANT:
This phase DOES NOT implement:
- DashboardBloc
- UI ↔ Bloc orchestration
- realtime runtime selectors
- advanced stream merging

This phase establishes:
# DATA ARCHITECTURE ONLY.

---

# 1. Dashboard Data Philosophy

The Dashboard is:
a realtime operational aggregation system.

The Dashboard MUST:
consume lightweight operational datasets.

The Dashboard MUST NOT:
- perform heavy analytics calculations in UI
- aggregate large collections client-side
- compute rankings locally
- scan massive Firestore collections repeatedly

The Dashboard MUST rely heavily on:
- analytics snapshots
- pre-ranked leaderboard collections
- lightweight operational streams

---

# 2. Feature Structure

Create:

```text
lib/features/dashboard/
```

---

## Required Structure

```text
dashboard/
├── data/
│   ├── datasources/
│   ├── models/
│   ├── repositories/
│   └── query/
│
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── params/
│
└── presentation/
```

IMPORTANT:
Presentation layer already exists from the UI Foundation phase.

DO NOT:
modify runtime-safe UI architecture.

---

# 3. Runtime Data Domains

The Dashboard contains:
multiple independent runtime data domains.

Each domain MUST remain:
isolated.

---

## KPI Runtime Domain

### Responsibilities
- operational counts
- attendance metrics
- rewards metrics
- competition metrics

### Data Sources
- analytics snapshots
- lightweight counters

### Runtime Rules
KPIs MUST:
- remain lightweight
- support future realtime streams
- support offline-safe caching

---

## Chart Runtime Domain

### Responsibilities
- analytics rendering
- operational trends
- historical summaries

### Data Sources
- analytics snapshot collections
- pre-aggregated trend documents

### Runtime Rules
Charts MUST:
- consume lightweight snapshots
- avoid large collection scans
- support throttled future updates

---

## Feed Runtime Domain

### Responsibilities
- recent activities
- achievements
- operational events

### Data Sources
- activity collections
- feed collections

### Runtime Rules
Feeds MUST:
- support pagination-safe queries
- support realtime-safe append rendering
- preserve deterministic ordering

---

## Leaderboard Runtime Domain

### Responsibilities
- student rankings
- house rankings
- competition standings

### Data Sources
- leaderboard snapshot collections
- ranking collections

### Runtime Rules
Leaderboards MUST:
- preserve deterministic ordering
- avoid local ranking calculations
- support future optimistic rendering

---

## Notification Runtime Domain

### Responsibilities
- alerts
- notices
- moderation events

### Data Sources
- notifications collection
- alert collections

### Runtime Rules
Notifications MUST:
- remain lightweight
- support future realtime insertion
- support offline-safe rendering

---

# 4. Firestore Collection Architecture

The Dashboard MUST consume:
pre-structured operational collections.

---

## Analytics Collections

### Daily Analytics

```text
schools/{schoolId}/analytics/daily
```

### Weekly Analytics

```text
schools/{schoolId}/analytics/weekly
```

### Monthly Analytics

```text
schools/{schoolId}/analytics/monthly
```

---

## Feed Collections

### Activities

```text
schools/{schoolId}/activities/{activityId}
```

### Achievements

```text
schools/{schoolId}/achievements/{achievementId}
```

### Events

```text
schools/{schoolId}/events/{eventId}
```

---

## Leaderboard Collections

### Student Rankings

```text
schools/{schoolId}/leaderboards/students
```

### House Rankings

```text
schools/{schoolId}/leaderboards/houses
```

### Competition Standings

```text
schools/{schoolId}/leaderboards/competitions
```

---

## Notification Collections

### Notifications

```text
schools/{schoolId}/notifications/{notificationId}
```

### Alerts

```text
schools/{schoolId}/alerts/{alertId}
```

---

# 5. Domain Entities

Create lightweight runtime-safe entities.

---

## Required Entities

### DashboardKpiEntity
Contains:
- totalStudents
- activeStudents
- attendancePercentage
- rewardsIssued
- competitionsActive

---

### DashboardActivityEntity
Contains:
- activityId
- title
- description
- actor
- createdAt
- activityType

---

### DashboardLeaderboardEntity
Contains:
- rank
- title
- points
- metadata

---

### DashboardNotificationEntity
Contains:
- notificationId
- title
- body
- severity
- createdAt

---

### DashboardAnalyticsEntity
Contains:
- labels
- datasets
- chartType
- updatedAt

---

# 6. Query Parameter Architecture

Dashboard MUST implement:
runtime-safe query abstractions.

---

## Required Params

### DashboardFeedPaginationParams
Contains:
- limit
- cursor
- ordering

---

### DashboardAnalyticsParams
Contains:
- range
- aggregationType
- chartType

---

### DashboardLeaderboardParams
Contains:
- leaderboardType
- limit
- rankingPeriod

---

### DashboardNotificationParams
Contains:
- severity
- unreadOnly
- limit

---

# 7. Datasource Architecture

Dashboard datasources MUST remain:
fully isolated.

---

## Required Datasources

### DashboardKpiDatasource
Provides KPI snapshots.

---

### DashboardAnalyticsDatasource
Provides analytics snapshots.

---

### DashboardFeedDatasource
Provides realtime operational feeds.

---

### DashboardLeaderboardDatasource
Provides rankings.

---

### DashboardNotificationDatasource
Provides operational alerts.

---

# 8. Repository Architecture

Repositories MUST abstract:
all Firebase logic.

---

## Required Repositories

### DashboardKpiRepository

### DashboardAnalyticsRepository

### DashboardFeedRepository

### DashboardLeaderboardRepository

### DashboardNotificationRepository

---

## Repository Responsibilities

Repositories MUST:
- map models → entities
- coordinate caching
- map exceptions
- preserve runtime-safe data

Repositories MUST NEVER:
- expose Firebase internals upward

---

# 9. Pagination Architecture

Pagination exists ONLY for:
feed runtime domains.

---

## Required Pagination Rules

Pagination MUST:
- use cursor-safe queries
- preserve deterministic ordering
- prevent duplicate rows
- support reconnect restoration

---

## Cursor Structure

Use:

```text
[lastUpdatedAt, documentId]
```

for stable ordering.

---

# 10. Analytics Snapshot Strategy

Dashboard analytics MUST rely on:
pre-aggregated snapshots.

---

## Forbidden Behaviors

DO NOT:
- aggregate analytics in UI
- scan massive collections
- calculate trends client-side

---

## Snapshot Benefits

Snapshots provide:
- scalable analytics
- lightweight queries
- offline-safe rendering
- predictable runtime performance

---

# 11. Offline Data Strategy

Dashboard MUST support:
offline-first runtime behavior.

---

## Offline Requirements

### KPIs
Render cached metrics.

### Charts
Render stale analytics safely.

### Feeds
Render cached operational history.

### Notifications
Render cached alerts.

### Leaderboards
Render cached rankings.

---

# 12. Stream Ownership Strategy

Dashboard future streams MUST remain:
strictly isolated.

---

## Future Stream Zones

### KPI Streams
Independent subscriptions.

### Chart Streams
Independent subscriptions.

### Feed Streams
Independent subscriptions.

### Leaderboard Streams
Independent subscriptions.

### Notification Streams
Independent subscriptions.

---

## Runtime Safety Rules

Future streams MUST support:
- cancellation safety
- reconnect restoration
- stale emission prevention
- duplicate prevention

---

# 13. Exception Architecture

Create Dashboard-safe exceptions.

---

## Required Exceptions

### DashboardOfflineException

### DashboardAnalyticsException

### DashboardFeedException

### DashboardLeaderboardException

### DashboardNotificationException

---

# 14. Tenant Isolation

ALL queries MUST remain:
tenant-safe.

---

## Required Rule

Every query MUST enforce:

```text
schoolId
```

scope isolation.

---

# 15. Future DashboardBloc Integration

This phase prepares for:
future multi-stream DashboardBloc orchestration.

Repositories and datasources MUST:
- remain stream-safe
- support future BlocSelector isolation
- support future reconnect-safe orchestration

---

# 16. Validation Requirements

After implementation validate:
- query stability
- snapshot integrity
- pagination safety
- deterministic ordering
- tenant isolation
- offline-safe caching

---

# 17. Forbidden Behaviors

DO NOT:
- implement DashboardBloc
- implement UI orchestration
- implement realtime widget rebuilds
- implement stream merging
- implement heavy analytics calculations

This phase is:
DATA ARCHITECTURE ONLY.

---

# 18. Deliverables

After implementation generate:
- Dashboard Data Architecture Walkthrough
- Analytics Snapshot Architecture Report
- Feed Pagination Architecture Report
- Leaderboard Data Architecture Report
- Notification Data Architecture Report
- Offline Data Strategy Report
- Tenant Isolation Validation Report
- Dashboard Repository Architecture Report

Save all reports inside:

```text
09_Docs/Dashboard/Data_Architecture_Reports/
```

---

# 19. Final Goal

The Dashboard Data Architecture must establish:
a scalable operational backend foundation prepared for:
- multi-stream orchestration
- realtime-safe analytics
- offline-first rendering
- rebuild-safe DashboardBloc integration
- scalable operational runtime systems

while preserving:
architectural purity,
runtime integrity,
and operational scalability.