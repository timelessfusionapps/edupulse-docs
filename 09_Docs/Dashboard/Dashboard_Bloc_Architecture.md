# Dashboard Bloc Architecture

This document defines the operational orchestration layer for the Dashboard. It establishes how Riverpod/Bloc manages state, coordinates multiple streams, and ensures data integrity before the UI layer renders it.

## 1. Dashboard Bloc Philosophy
The `DashboardBloc` (or Riverpod equivalent) acts as the central intelligence node orchestrating multiple runtime streams. 
- The Bloc coordinates and synchronizes parallel streams (KPIs, Feed, Analytics).
- **CRITICAL:** The Bloc NEVER directly accesses Firebase. All network and caching operations are abstracted behind the `DashboardRepository`.

## 2. Dashboard Events
The orchestration layer responds to the following events (if using explicit event mapping):
- **Load Events:** Initiates the initial dashboard synchronization. Triggers cache retrieval followed by stream establishment.
- **Refresh Events:** Triggered manually by the user (pull-to-refresh). Forces a repository bypass-cache fetch and resets active streams.
- **Reconnect Events:** System-level events triggered by network restoration. Verifies stream health and forces a soft refresh of stale data.
- **Pagination Events:** Dispatched when the Activity Feed reaches the bottom. Triggers cursor-based fetching without disturbing active KPI streams.
- **Analytics Refresh Events:** Triggered by filter changes (e.g., User selects "Last 30 Days"). Cancels the old analytics stream and establishes a new one.
- **Feed Update Events:** Internal events dispatched when the realtime feed stream pushes a new item.

## 3. Dashboard State Architecture
To prevent full-screen rebuilds, the dashboard state is strictly segmented.
State should be modelled as a composite object with isolated sub-states:
- **Segmented Widget States:** A single monolithic `DashboardState` object containing distinct, immutable sub-states for each domain.
- **KPI States:** `AsyncValue<KPISnapshot>` representing loading, error, or data.
- **Chart States:** `AsyncValue<AnalyticsSnapshot>` representing chart geometry data.
- **Feed States:** `AsyncValue<List<ActivityEvent>>` along with cursor metadata (`hasReachedMax`).
- **Offline States:** Global boolean flag `isOffline` to trigger UI banners.
- **Reconnect States:** `isSyncing` flag for when connection is restored but data is actively updating.

## 4. Multi-Stream Lifecycle Coordination
- **Stream Ownership:** The Bloc manages `StreamSubscription` instances for each domain (KPIs, Feed, Analytics) independently.
- **Stream Replacement:** When user changes a filter (e.g., House KPI filter), the Bloc must `cancel()` the specific existing KPI subscription before initiating a new one.
- **Stream Cancellation:** The `close()` method of the Bloc must iterate and cleanly cancel all active subscriptions to prevent memory leaks on navigation.
- **Reconnect Orchestration:** Relies primarily on Firebase SDK's auto-reconnect. The Bloc listens to a connectivity service stream to toggle the `isOffline` state.

## 5. Selector Isolation Strategy
The UI must strictly map to state properties using selectors:
- **KPI Selectors:** `ref.watch(dashboardProvider.select((state) => state.kpiSnapshot))`
- **Chart Selectors:** `ref.watch(dashboardProvider.select((state) => state.analyticsSnapshot))`
- **Feed Selectors:** `ref.watch(dashboardProvider.select((state) => state.feedItems))`
- **Notification Selectors:** `ref.watch(dashboardProvider.select((state) => state.unreadNotificationsCount))`
This guarantees that an incoming chat message (Notification) does not cause the charts to redraw.

## 6. Pagination Orchestration
- **Activity Feed Pagination:** The Feed manages a `List<ActivityEvent>`. Realtime updates prepend to the list. Pagination appends to the list.
- **Safe Cursor Handling:** The Bloc tracks the `lastDocument` from the initial payload and uses it for subsequent `nextPage` events.
- **Feed Merge Strategy:** When a realtime event arrives that might also exist in a newly paginated chunk, the Bloc must deduplicate by ID before emitting the new state to prevent duplicate rendering in the UI.

## 7. Offline Runtime Coordination
- **Stale Analytics:** If the initial load relies purely on cache because the device is offline, the Bloc marks the state with `isFromCache = true`.
- **Offline Cache Restoration:** The Repository returns the cached data immediately. The Bloc emits `DashboardState.success(..., isOffline: true)`.
- **Retry Orchestration:** Optimistic actions initiated from the dashboard (e.g., Quick Add Student) that fail due to network are caught by the Repository, persisted locally, and the Bloc emits a "Pending Sync" status.

## 8. Dashboard Mutation Coordination
- **Mutation-Safe Refreshes:** Refreshes must not blow away optimistically mutated data.
- **Optimistic Dashboard Updates:** If a user action (e.g., acknowledging an alert) occurs, the Bloc instantly mutates the local state representation and emits it, masking the network call.
- **Realtime Synchronization:** If the server subsequently rejects the mutation, the Bloc catches the error and rolls the local state back to the previous snapshot.

## 9. Dashboard Runtime Validation Strategy
- **Rebuild Validation:** Unit testing state emissions. If `kpiSnapshot` changes, ensure `analyticsSnapshot` reference remains identical.
- **Stream Validation:** Test that `close()` successfully terminates all mocked stream subscriptions.
- **Stress Validation:** Dispatch 100 concurrent `FeedUpdateEvent`s to verify the Bloc throttles state emissions and doesn't crash the UI thread.
- **Chart Validation:** Test Bloc state outputs with empty, partial, and negative analytics datasets.
