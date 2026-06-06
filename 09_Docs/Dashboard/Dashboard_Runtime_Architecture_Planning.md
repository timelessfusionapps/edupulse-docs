# Dashboard Runtime Architecture Planning

## 1. Dashboard Runtime Philosophy
The Dashboard is the operational nerve center of EduPulse. Unlike the Student Management module, which is primarily CRUD-focused on a single entity, the Dashboard is **aggregation-driven** and **multi-stream**. It must concurrently orchestrate data from various domains without blocking the main UI thread. Due to its dense nature, the Dashboard demands strictly isolated rebuild zones; a change in the Activity Feed must never cause a KPI card to rebuild.

## 2. Dashboard Data Domains
The runtime architecture will orchestrate the following domains:
- **Students KPIs:** High-level metrics (Total Students, Active Students, Attendance Rates).
- **Activities Feed:** A real-time timeline of administrative and student actions.
- **Leaderboards:** Top performing students or classes.
- **Houses:** Aggregated metrics for school houses (Points, Events).
- **Competitions:** Active ongoing competitions and their statuses.
- **Notifications:** Critical alerts needing administrative attention.
- **Analytics Snapshots:** Pre-aggregated chart data.

## 3. Multi-Stream Coordination Architecture
Because the Dashboard pulls from multiple domains, stream coordination is critical:
- **Multiple Simultaneous Streams:** The Dashboard will establish multiple parallel streams (e.g., one for KPI, one for Feed).
- **Stream Prioritization:** Critical operational streams (KPIs, Notifications) should establish connections first, followed by secondary streams (Activity Feed, Leaderboards).
- **Stream Cancellation:** If the user navigates away from the Dashboard, all streams must be cleanly cancelled to free memory.
- **Reconnect Restoration:** Upon network drop, streams fall back to cache. Upon reconnect, Firebase automatically resyncs the active streams.
- **Stream Ownership Boundaries:** Each specific widget sub-section (or its dedicated Bloc) will own its stream. A monolithic Dashboard Stream is forbidden to avoid unnecessary overarching rebuilds.

## 4. Dashboard Rebuild Segmentation
To guarantee 60fps performance, the Dashboard UI will be segmented into isolated rebuild zones:
- **KPI Cards:** Rebuild independently when new KPI snapshots arrive.
- **Charts:** Rebuild only when the overarching analytics snapshot updates.
- **Activity Feed:** Rebuilds only its list view; handles incremental appends locally.
- **Leaderboard Widget:** Isolated mini-list rebuild.
- **Notifications Widget:** Isolated badge and list rebuild.
- **Quick Actions:** Static layout, no rebuilds unless permission state changes.
- **Analytics Widgets:** Rebuild only when specific filters (e.g., "This Week" vs "This Month") are applied.

**IMPORTANT:** Prevent full dashboard rebuilds. The top-level `DashboardScreen` should be effectively `const` or rebuild only on major layout shifts (e.g., resizing window).

## 5. Dashboard Realtime Strategy
- **Realtime KPI Updates:** Monitored via a document snapshot listener on an aggregated metrics document (do not count raw documents client-side).
- **Realtime Activity Feed Updates:** Uses a limited query stream (e.g., `limit(10)` ordered by timestamp) to push new events to the top of the feed.
- **Leaderboard Synchronization:** Refreshed via a realtime stream on the active leaderboard query.
- **Chart Refresh Behavior:** Charts update dynamically as new snapshot data streams in, animating the delta rather than redrawing the entire canvas.

## 6. Dashboard Offline Runtime Strategy
- **Cached Dashboard Rendering:** Instantly render the last known state of all KPIs and feeds from local persistence.
- **Stale Analytics Rendering:** Display charts with cached data but include a subtle visual indicator (e.g., a "Syncing..." or "Offline" icon) if the cache is older than a specified threshold.
- **Reconnect Orchestration:** Background streams auto-recover upon network reconnection.
- **Retry Workflows:** Any quick actions taken on the dashboard (e.g., acknowledging a notification) are optimistically resolved and queued for retry if offline.

## 7. Dashboard Pagination Strategy
While most dashboard elements are fixed-size, some require pagination:
- **Feed Pagination:** The Activity Feed will load the first 10 items. A "Load More" button or infinite scroll at the bottom of the feed widget will paginate further using cursor logic.
- **Incremental Loading:** Pagination must not block the rest of the Dashboard or stall realtime updates at the top of the feed.
- **Pagination-Safe Streams:** The top of the feed remains a realtime stream, while older items are fetched via static cursor queries and appended.

## 8. Dashboard Runtime Stability Rules
- **Scroll Preservation:** Updating a KPI card or appending to the Activity Feed must not alter the user's scroll position on the main dashboard layout.
- **Animation Stability:** KPI number counters or chart bars must animate smoothly between state changes without sudden janks or layout pops.
- **Chart Stability:** Chart axes must remain stable and only shift if the new data definitively exceeds the current visible boundaries.
- **Reconnect Stability:** Rapidly toggling online/offline must not cause the dashboard to flash blank loading screens.

## 9. Dashboard Performance Strategy
- **Selector Isolation:** `BlocSelector` is mandatory for all granular components.
- **Rebuild Minimization:** Strict use of `const` constructors for all static UI elements (headers, wrappers, background cards).
- **Stream Throttling:** If the Activity Feed receives high-velocity updates, the Bloc should throttle or debounce UI emissions to prevent rendering thrash.
- **Analytics Caching:** Heavy analytical calculations must be done on the server (via Cloud Functions or Firestore aggregation queries) and stored in specific metric documents. The client only streams the pre-computed results.

## 10. Dashboard Runtime Validation Strategy
Before release, the Dashboard must pass:
- **Stress Tests:** Rapid toggling of analytics timeframes (Day/Week/Month).
- **Realtime Tests:** Simulate massive data ingestion (100+ activity events per minute) to ensure the feed throttles UI updates correctly.
- **Rebuild Tests:** Utilize Flutter DevTools to verify that activity feed updates do not trigger KPI card rebuilds.
- **Offline Tests:** Disconnect network, load dashboard, verify cached rendering and subsequent reconnect recovery.
- **Chart Stability Tests:** Ensure charts do not crash or throw layout exceptions when fed edge-case data (all zeros, negative values, missing data points).
