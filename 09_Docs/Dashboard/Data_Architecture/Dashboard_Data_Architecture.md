# Dashboard Data Architecture

## Goal

Define the complete data orchestration architecture for the EduPulse Dashboard before implementation begins.

The Dashboard is:
# a multi-stream aggregation module.

Unlike Student Management,
the Dashboard coordinates:
- multiple repositories
- multiple datasources
- multiple realtime streams
- multiple analytics snapshots
- multiple runtime rendering zones

This document defines:
- data ownership
- aggregation architecture
- stream boundaries
- caching behavior
- pagination strategy
- analytics snapshot strategy
- runtime-safe data orchestration

---

# 1. Dashboard Data Philosophy

The Dashboard MUST function as:
a lightweight operational aggregation layer.

The Dashboard itself:
MUST NOT:
- perform heavy calculations
- aggregate large datasets in UI
- compute rankings locally
- calculate analytics inside Bloc

Instead:
Dashboard consumes:
- optimized repository outputs
- analytics snapshots
- lightweight realtime streams
- incremental operational data

---

# 2. Dashboard Runtime Data Domains

The Dashboard coordinates multiple independent runtime domains.

Each domain:
- owns independent streams
- owns isolated rebuild zones
- maintains independent cache behavior

---

## KPI Runtime Zones

### Purpose
Provide lightweight operational metrics.

### Data Sources
- students collection
- activities collection
- rewards collection
- competitions collection

### Examples
- totalStudents
- activeStudents
- activitiesToday
- rewardsIssued
- activeCompetitions

### Runtime Characteristics
- lightweight aggregation
- realtime-safe updates
- incremental changes
- cached fallback rendering

### Data Strategy
KPIs SHOULD:
prefer pre-aggregated snapshots where possible.

Avoid:
full collection scans.

---

## Chart Runtime Zones

### Purpose
Provide analytics visualizations.

### Data Sources
- analytics snapshots
- weekly aggregates
- historical trend collections

### Examples
- student growth trends
- engagement analytics
- attendance trends
- house performance metrics

### Runtime Characteristics
- throttled updates
- stale-safe rendering
- incremental dataset updates

### Data Strategy
Charts MUST consume:
snapshot documents.

Charts MUST NOT:
query large raw collections directly.

---

## Feed Runtime Zones

### Purpose
Provide operational realtime feeds.

### Data Sources
- activities
- notifications
- achievements
- competition events

### Runtime Characteristics
- realtime-safe pagination
- append-safe rendering
- cursor-safe streams

### Feed Types
- recent activities
- recent achievements
- recent competitions
- system updates

### Data Strategy
Feeds MUST support:
- cursor pagination
- deterministic ordering
- incremental loading

---

## Leaderboard Runtime Zones

### Purpose
Provide realtime ranking visibility.

### Data Sources
- leaderboard snapshots
- ranking collections
- competition standings

### Runtime Characteristics
- deterministic ordering
- stable ranking transitions
- incremental ranking updates

### Data Strategy
Leaderboards SHOULD consume:
pre-ranked collections.

Avoid:
local sorting inside UI.

---

## Notification Runtime Zones

### Purpose
Provide operational alerting.

### Data Sources
- notifications collection
- alerts collection
- moderation queues

### Runtime Characteristics
- realtime insertions
- isolated refresh cycles
- lightweight rendering

### Data Strategy
Notifications MUST remain:
lightweight and independently queryable.

---

# 3. Dashboard Repository Architecture

The Dashboard MUST consume:
domain-specific repositories.

---

## Required Repositories

### StudentRepository
Provides:
- KPI metrics
- student counts
- student trends

### ActivityRepository
Provides:
- activity feed
- activity analytics
- participation trends

### LeaderboardRepository
Provides:
- rankings
- leaderboard snapshots

### NotificationRepository
Provides:
- alerts
- notices
- operational notifications

### AnalyticsRepository
Provides:
- chart snapshots
- historical analytics

---

# 4. Dashboard Datasource Architecture

Datasources MUST remain:
fully isolated per domain.

Dashboard MUST NOT:
directly query Firebase.

---

## Datasource Responsibilities

### StudentDatasource
- student counts
- active student metrics

### ActivityDatasource
- realtime feeds
- activity snapshots

### AnalyticsDatasource
- chart datasets
- aggregated analytics

### NotificationDatasource
- realtime alerts

### LeaderboardDatasource
- rankings
- competition standings

---

# 5. Dashboard Stream Architecture

Dashboard requires:
multi-stream orchestration.

---

## Stream Ownership Rules

Each runtime zone owns:
independent stream subscriptions.

---

## Required Streams

### KPI Streams
Realtime KPI metrics.

### Feed Streams
Realtime operational feed.

### Chart Streams
Analytics snapshot updates.

### Leaderboard Streams
Realtime rankings.

### Notification Streams
Realtime alerts.

---

## Stream Safety Rules

Streams MUST support:
- cancellation safety
- reconnect restoration
- stale emission prevention
- duplicate prevention

---

# 6. Analytics Snapshot Architecture

Analytics MUST rely heavily on:
snapshot documents.

---

## Why Snapshots Matter

Avoid:
- expensive collection scans
- heavy client aggregation
- large realtime calculations

---

## Snapshot Examples

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

# 7. Pagination Architecture

Only feed-style zones require pagination.

---

## Paginated Zones

### Activity Feed
Cursor-safe pagination.

### Notifications Feed
Incremental loading.

### Achievement Feed
Append-safe pagination.

---

## Pagination Standards

Pagination MUST support:
- cursor safety
- deterministic ordering
- duplicate prevention
- reconnect-safe restoration

---

# 8. Offline Data Architecture

Dashboard MUST support:
offline-first operation.

---

## Offline Runtime Rules

### KPI Zones
Render cached snapshots.

### Charts
Render stale analytics safely.

### Feeds
Render cached feed history.

### Notifications
Render cached notices.

### Leaderboards
Render cached rankings.

---

# 9. Dashboard Caching Strategy

Caching MUST remain:
domain-specific.

---

## Cache Priorities

### High Priority Cache
- KPI snapshots
- leaderboards
- notifications

### Medium Priority Cache
- activity feeds

### Low Priority Cache
- historical analytics

---

# 10. Dashboard Rebuild Isolation Strategy

Each runtime zone MUST receive:
isolated state updates.

---

## Forbidden Behaviors

Avoid:
- global dashboard refreshes
- cross-zone rebuild propagation
- chart-triggered feed rebuilds

---

# 11. Runtime Data Validation Requirements

Dashboard data orchestration MUST later validate:
- stream safety
- pagination safety
- snapshot consistency
- cache restoration
- reconnect synchronization
- deterministic ordering

---

# 12. Scalability Strategy

Dashboard architecture MUST scale safely for:
- large student counts
- large activity feeds
- realtime analytics growth
- future notifications expansion
- competition systems
- parent portals

---

# 13. Final Architectural Goal

The Dashboard Data Architecture must enable:
- scalable multi-stream orchestration
- realtime-safe analytics
- rebuild-safe rendering
- offline-first aggregation
- operational responsiveness

while preserving:
runtime stability,
performance,
and architectural purity.