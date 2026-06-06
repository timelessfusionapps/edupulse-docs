# Dashboard Bloc Architecture Implementation

## Goal

Implement the operational orchestration layer for the EduPulse Dashboard module.

This phase establishes:
- multi-stream runtime orchestration
- isolated runtime stream zones
- rebuild-safe selector architecture
- realtime-safe dashboard coordination
- offline-safe operational rendering
- stream lifecycle management
- pagination-safe feed orchestration
- analytics-safe runtime coordination

IMPORTANT:
This phase DOES NOT implement:
- UI redesign
- heavy analytics calculations
- cross-zone rebuild propagation

This phase establishes:
# MULTI-STREAM BLOC ORCHESTRATION.

---

# 1. Dashboard Bloc Philosophy

The DashboardBloc acts as:
the operational runtime orchestrator.

DashboardBloc MUST:
- coordinate independent runtime zones
- isolate stream ownership
- preserve rebuild safety
- maintain responsive runtime integrity
- coordinate offline-safe rendering

DashboardBloc MUST NEVER:
- perform analytics calculations
- aggregate large datasets
- trigger global dashboard rebuilds

The Dashboard MUST behave as:
a segmented realtime operational system.

---

# 2. Runtime Stream Zones

Dashboard runtime orchestration MUST remain:
strictly segmented.

Each zone MUST own:
independent state orchestration.

---

## KPI Runtime Stream Zone

### Responsibilities
- operational metrics
- student counts
- attendance summaries
- reward summaries

### Stream Characteristics
- lightweight snapshots
- frequent safe updates
- offline-safe caching

### Runtime Rules
KPI updates MUST:
- rebuild KPI zones ONLY
- avoid chart rebuilds
- avoid feed rebuilds

---

## Analytics Runtime Stream Zone

### Responsibilities
- chart analytics
- trend rendering
- snapshot visualization

### Stream Characteristics
- throttled updates
- snapshot-safe rendering
- range-based orchestration

### Runtime Rules
Analytics updates MUST:
- rebuild charts ONLY
- preserve chart dimensions
- preserve axis continuity
- avoid animation explosions

---

## Feed Runtime Stream Zone

### Responsibilities
- realtime operational feed
- achievements
- activity streams

### Stream Characteristics
- append-safe updates
- pagination-safe orchestration
- deterministic ordering

### Runtime Rules
Feed updates MUST:
- preserve scroll continuity
- avoid full dashboard rebuilds
- support reconnect-safe restoration

---

## Leaderboard Runtime Stream Zone

### Responsibilities
- student rankings
- house rankings
- competition standings

### Stream Characteristics
- deterministic ranking streams
- optimistic-safe transitions
- stable row rendering

### Runtime Rules
Leaderboard updates MUST:
- rebuild leaderboard ONLY
- preserve ranking continuity
- avoid unstable transitions

---

## Notification Runtime Stream Zone

### Responsibilities
- operational alerts
- moderation notices
- system notifications

### Stream Characteristics
- lightweight operational streams
- insertion-safe rendering
- reconnect-safe restoration

### Runtime Rules
Notification updates MUST:
- rebuild notification zones ONLY
- avoid feed rebuild propagation
- preserve notification ordering

---

# 3. Folder Structure

Create:

```text
lib/features/dashboard/presentation/bloc/
```

---

## Required Structure

```text
bloc/
├── dashboard_bloc.dart
├── dashboard_event.dart
├── dashboard_state.dart
│
├── models/
│   ├── dashboard_feed_runtime_state.dart
│   ├── dashboard_chart_runtime_state.dart
│   ├── dashboard_kpi_runtime_state.dart
│   ├── dashboard_notification_runtime_state.dart
│   └── dashboard_leaderboard_runtime_state.dart
│
├── utils/
│   ├── dashboard_stream_registry.dart
│   ├── dashboard_stream_lifecycle_manager.dart
│   ├── dashboard_query_signature.dart
│   ├── dashboard_bloc_error_mapper.dart
│   ├── dashboard_stream_diagnostics.dart
│   └── dashboard_analytics_throttler.dart
│
└── selectors/
    ├── dashboard_kpi_selectors.dart
    ├── dashboard_chart_selectors.dart
    ├── dashboard_feed_selectors.dart
    ├── dashboard_notification_selectors.dart
    └── dashboard_leaderboard_selectors.dart
```

---

# 4. Dashboard Events

Dashboard events MUST remain:
strictly segmented.

---

## Required Events

### Initialization Events

```text
DashboardInitialized
DashboardReloadRequested
DashboardReconnectRequested
```

---

### KPI Events

```text
DashboardKpisLoaded
DashboardKpisRefreshRequested
```

---

### Analytics Events

```text
DashboardAnalyticsLoaded
DashboardAnalyticsRangeChanged
DashboardAnalyticsRefreshRequested
```

---

### Feed Events

```text
DashboardFeedLoaded
DashboardFeedNextPageRequested
DashboardFeedRefreshRequested
DashboardFeedStreamUpdated
```

---

### Leaderboard Events

```text
DashboardLeaderboardLoaded
DashboardLeaderboardRefreshRequested
```

---

### Notification Events

```text
DashboardNotificationsLoaded
DashboardNotificationsRefreshRequested
DashboardNotificationAcknowledged
```

---

### Offline Events

```text
DashboardOfflineDetected
DashboardReconnectSucceeded
DashboardReconnectFailed
```

---

# 5. Dashboard State Architecture

DashboardState MUST remain:
segmented.

Dashboard MUST NEVER:
use monolithic operational states.

---

## Required Dashboard State

```text
DashboardState
```

Contains:

```text
- kpiRuntimeState
- chartRuntimeState
- feedRuntimeState
- leaderboardRuntimeState
- notificationRuntimeState
```

---

## Runtime Status Types

Each runtime state MUST support:

```text
- initial
- loading
- partialLoading
- success
- offlineCached
- staleSnapshot
- refreshing
- paginationLoading
- reconnecting
- failure
```

---

# 6. Runtime State Segmentation

Each runtime domain MUST maintain:
isolated runtime ownership.

---

## KPI Runtime State

Contains:
- KPI entities
- offline flags
- stale snapshot flags

---

## Chart Runtime State

Contains:
- analytics entities
- active range
- throttling metadata
- snapshot metadata

---

## Feed Runtime State

Contains:
- activity entities
- pagination state
- cursor metadata
- append metadata

---

## Leaderboard Runtime State

Contains:
- ranking entities
- ranking delta metadata
- optimistic metadata

---

## Notification Runtime State

Contains:
- notification entities
- unread counts
- severity breakdowns

---

# 7. Stream Lifecycle Management

Dashboard runtime streams MUST remain:
strictly coordinated.

---

## Required Managers

### DashboardStreamRegistry

Responsibilities:
- stream ownership
- stream registration
- stream cleanup

---

### DashboardStreamLifecycleManager

Responsibilities:
- cancellation safety
- reconnect restoration
- stale stream prevention
- runtime-safe stream resets

---

## Runtime Rules

ALL streams MUST:
- cancel safely
- reconnect safely
- avoid zombie subscriptions
- avoid duplicate stream ownership

---

# 8. Query Signature Validation

Dashboard streams MUST validate:
runtime ownership integrity.

---

## Required Utility

```text
dashboard_query_signature.dart
```

Responsibilities:
- stale emission prevention
- query ownership validation
- stream identity validation

---

## Runtime Rules

Stale emissions MUST:
be discarded safely.

This prevents:
- pagination corruption
- stale feed rendering
- invalid chart updates

---

# 9. BlocSelector Strategy

CRITICAL REQUIREMENT.

Dashboard MUST use:
strict rebuild isolation.

---

## Required Selector Zones

### KPI Selectors
Rebuild KPI widgets ONLY.

---

### Chart Selectors
Rebuild charts ONLY.

---

### Feed Selectors
Rebuild feed widgets ONLY.

---

### Leaderboard Selectors
Rebuild leaderboard ONLY.

---

### Notification Selectors
Rebuild notification widgets ONLY.

---

## Forbidden Behaviors

DO NOT:
- rebuild the entire Dashboard
- trigger chart rebuilds from notifications
- trigger feed rebuilds from KPI updates

---

# 10. Analytics Runtime Strategy

Charts are:
HIGH-RISK runtime widgets.

---

## Required Runtime Rules

Charts MUST:
- rebuild independently
- preserve chart dimensions
- preserve axis spacing
- preserve animation continuity

---

## Analytics Throttling

Implement:

```text
dashboard_analytics_throttler.dart
```

Responsibilities:
- throttle rapid updates
- prevent animation explosions
- preserve runtime smoothness

---

# 11. Feed Runtime Strategy

Feeds MUST support:
future operational append-safe rendering.

---

## Required Runtime Rules

Feeds MUST:
- preserve scroll anchors
- append incrementally
- preserve pagination continuity
- preserve deterministic ordering

---

## Feed Pagination Rules

Pagination MUST:
- avoid duplicate insertions
- avoid cursor corruption
- preserve append safety

---

# 12. Leaderboard Runtime Strategy

Leaderboards MUST support:
future optimistic ranking transitions.

---

## Required Runtime Rules

Leaderboards MUST:
- preserve row continuity
- support rank delta rendering
- avoid unstable transitions

---

# 13. Notification Runtime Strategy

Notifications MUST:
remain lightweight operational streams.

---

## Required Runtime Rules

Notifications MUST:
- insert safely
- preserve ordering
- avoid dashboard rebuild propagation

---

# 14. Offline Runtime Strategy

Dashboard MUST support:
offline-first operational rendering.

---

## Required Behaviors

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

## Offline Indicators

Dashboard MUST expose:
- offline status
- stale snapshot status
- reconnecting status

---

# 15. Runtime Diagnostics

Implement:

```text
dashboard_stream_diagnostics.dart
```

Responsibilities:
- stream logging
- lifecycle diagnostics
- stale emission logging
- reconnect logging

---

## Runtime Safety Rules

Diagnostics MUST:
- remain lightweight
- avoid runtime slowdown
- activate primarily in debug mode

---

# 16. Error Mapping

Implement:

```text
dashboard_bloc_error_mapper.dart
```

Responsibilities:
- map repository exceptions
- generate UI-safe operational messages
- preserve runtime clarity

---

# 17. Rebuild Optimization Strategy

Dashboard MUST aggressively optimize:
runtime rebuilds.

---

## Required Strategies

Use:
- BlocSelector
- const widgets
- RepaintBoundary
- segmented runtime widgets

---

## Forbidden Behaviors

DO NOT:
- use giant BlocBuilders
- rebuild monolithic dashboard trees
- trigger cross-zone rebuild explosions

---

# 18. Runtime Validation Requirements

After implementation validate:

---

## Realtime Validation

Validate:
- KPI updates
- chart updates
- feed updates
- leaderboard updates
- notification insertions

---

## Rebuild Validation

Validate:
- isolated widget rebuilds
- chart stability
- feed scroll continuity

---

## Offline Validation

Validate:
- reconnect restoration
- cached rendering
- stale snapshot rendering

---

## Stress Validation

Validate:
- rapid updates
- reconnect loops
- pagination continuity
- stream cancellation safety

---

# 19. Forbidden Behaviors

DO NOT:
- redesign UI
- perform analytics calculations
- merge unrelated stream zones
- rebuild the dashboard globally
- aggregate large datasets client-side

Dashboard MUST remain:
runtime-safe,
segmented,
and operationally stable.

---

# 20. Deliverables

After implementation generate:

1. Dashboard_Bloc_Walkthrough.md
2. Dashboard_Stream_Zone_Architecture_Report.md
3. Dashboard_Rebuild_Isolation_Report.md
4. Dashboard_Analytics_Runtime_Report.md
5. Dashboard_Feed_Runtime_Report.md
6. Dashboard_Leaderboard_Runtime_Report.md
7. Dashboard_Notification_Runtime_Report.md
8. Dashboard_Offline_Runtime_Report.md
9. Dashboard_Stream_Diagnostics_Report.md
10. Dashboard_Bloc_Validation_Report.md

Save all reports inside:

```text
09_Docs/Dashboard/Bloc_Reports/
```

---

# 21. Final Goal

The Dashboard Bloc Architecture must establish:
a scalable operational orchestration layer prepared for:
- multi-stream realtime rendering
- offline-first operational UX
- rebuild-safe runtime isolation
- scalable analytics orchestration
- realtime-safe operational feeds
- notification-safe runtime rendering

while preserving:
architectural purity,
runtime integrity,
responsive stability,
and operational scalability.