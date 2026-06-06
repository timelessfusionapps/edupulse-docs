# EduPulse Runtime Module Replication Standard

This document is the MASTER engineering standard for all future EduPulse modules. It dictates the required architecture layers, runtime behavior, responsive standards, and stream orchestration logic extrapolated from the highly validated Student Management module.

## 1. Required Architecture Layers
All modules strictly enforce the following unidirectional flow:
**UI → Bloc → Repository → Datasource → Firebase**

### Responsibilities:
- **UI Layer:** Declarative rendering. Listens to Bloc state. Never directly instantiates Firebase streams or calls Firebase SDKs. Only maps Bloc states to widgets.
- **Bloc Layer:** Operational orchestration. Manages stream subscriptions, coordinates pagination, catches errors, and formats domain state for the UI.
- **Repository Layer:** Domain logic boundary. Maps Datasource models (DTOs) into clean Domain Entities. Handles retry logic and offline fallback coordination where applicable.
- **Datasource Layer:** Network/Database boundary. Executes Firebase queries, manages local caching policies, and yields raw DTO streams or Futures.
- **Firebase Layer:** The underlying infrastructure providing Realtime streams and offline persistence.

### Forbidden Behaviors:
- ❌ Direct Firebase access from UI widgets.
- ❌ Bypassing the Repository layer to call the Datasource directly from the Bloc.
- ❌ Violating stream ownership (e.g., UI manually cancelling streams managed by the Bloc).

## 2. Runtime Standards
- **Stream Lifecycle Management:** Streams must be initialized lazily or upon specific `Load` events. Streams must be tied to the Bloc lifecycle or explicitly cancelled when filters/queries change.
- **Stream Cancellation Rules:** A Bloc must proactively cancel existing stream subscriptions *before* instantiating a new subscription for the same data domain to prevent memory leaks and zombie streams.
- **Reconnect-Safe Orchestration:** The Datasource must utilize Firebase's native offline capabilities so that active streams automatically resume and sync upon network reconnection without requiring a full manual refresh.
- **Pagination-Safe Streams:** Infinite scrolling must use cursor-based pagination (e.g., `startAfterDocument`). Active streams should safely append to existing lists without duplicating state.
- **Optimistic Mutation Architecture:** Mutations (Create/Update/Delete) must instantly yield a new success/pending state in the Bloc before the network response confirms, masking latency. Errors must trigger a state rollback.
- **Offline-First Runtime Standards:** Data fetched must be cache-enabled (`GetOptions(source: Source.serverAndCache)`). UI must gracefully render cached data when offline.

## 3. Rebuild Optimization Standards
- **BlocSelector Usage:** Use `BlocSelector` (or Riverpod's `select`) to listen only to the specific property of the state needed by a widget.
- **Rebuild Isolation:** Never rebuild a global list when a single item changes.
- **Selector Granularity:** Selectors must be granular to the smallest atomic component (e.g., a status pill, an avatar).
- **Row-Level Rebuild Safety:** When mutating an item in a list, only that specific row's widget should rebuild.
- **Card-Level Rebuild Safety:** Complex cards must isolate their internal state changes (like hovering or local expanding) from the parent layout.
- **Segmented Loading States:** Do not use full-screen loading spinners if only a segment of data is loading. Use localized skeleton loaders.

## 4. Responsive Runtime Standards
### Viewport Behaviors:
- **Desktop Runtime (1024px+):** Maximized operational control center. Multi-column layouts, expanded sidebars, dense data tables.
- **Tablet Runtime (768px - 1023px):** Condensed operational layout. Collapsible sidebars, wrap-around grids.
- **Mobile Runtime (< 768px):** Vertical operational feed. Stacked cards, bottom sheets for filters/actions.

### Rules:
- **Layout Swap Rules:** Transitions between breakpoints must be seamless. Maintain state when swapping layouts (e.g., a search query stays active when resizing window from Desktop to Mobile).
- **Runtime Stability Rules:** UI resizing must not trigger unnecessary data re-fetching.
- **Scroll Stability Rules:** Avoid scroll jumps when layout shifts occur.

## 5. Offline Runtime Standards
- **Offline Cache Behavior:** Always default to displaying the local cache immediately upon launch to ensure instantaneous rendering, while the server fetch happens transparently in the background.
- **Reconnect Restoration:** Active UI elements must automatically receive the synced server data immediately upon reconnection.
- **Retry Orchestration:** Failed network mutations should be queued locally (handled by Firestore offline persistence) and retried automatically.
- **Stale Cache Indicators:** If data is verified to be severely outdated, provide a subtle visual indicator (e.g., an "Offline Mode" banner).
- **Optimistic Mutation Rendering:** Mutated items while offline must display normally, perhaps with a subtle syncing icon until confirmed.

## 6. Pagination Standards
- **Cursor Architecture:** Always use DocumentSnapshot cursors (`startAfterDocument`), never integer offsets.
- **Pagination Orchestration:** The Bloc maintains the `List<T>` and the current cursor. New pages append to the `List<T>`.
- **Pagination-Safe Streams:** If real-time stream updates conflict with pagination chunks, the Bloc must reconcile the lists to prevent duplication.
- **Deterministic Ordering:** Paginated queries must always include a deterministic secondary sort (e.g., `documentId`) to prevent cursor drift.
- **Duplicate Prevention:** The Bloc must explicitly filter out items that already exist in the state before appending new paginated results.

## 7. Realtime Stream Standards
- **Stream Ownership:** The Bloc or a dedicated Stream Manager class exclusively owns the `StreamSubscription`.
- **Stream Lifecycle:** Cancel on `close()` or when stream parameters change.
- **Stale Emission Prevention:** Discard stream events that arrive after the subscription was supposed to be cancelled (due to async gaps).
- **Archive-Safe Removals:** Realtime deletions must gracefully animate the item out of the UI without causing index out-of-bounds errors in paginated lists.
- **Multi-Stream Coordination:** If a view depends on multiple streams, use a combining mechanism (like `rxdart`'s `combineLatest`) in the Bloc/Repository to yield a single unified state to the UI.

## 8. Validation Standards
Every new module MUST undergo the following validation tests before release:
- **Runtime Validation:** Ensure core use cases function under real-world usage.
- **Stress Testing:** Test rapid inputs, rapid scrolling, and aggressive filtering.
- **Responsive Validation:** Test all layout breakpoints for overflow errors and stable widget swapping.
- **Stream Validation:** Test for memory leaks and zombie streams during multiple filter swaps.
- **Offline Validation:** Test app behavior while completely disconnected and during connection toggling.
- **Rebuild Validation:** Use Flutter Inspector to guarantee isolated rebuilds.

## 9. Documentation Standards
Every new module MUST produce the following documentation:
- Architecture Docs (defining domain and orchestration)
- Walkthrough Docs (summarizing the implementation)
- Runtime Validation Docs
- Stress Test Reports
- Production Readiness Reports

## 10. Production Readiness Standards
Before deployment, a module must meet these criteria:
- **Runtime Certification:** Passes all validation standards.
- **Stability Requirements:** Zero known crashes or unhandled exceptions under stress.
- **Scalability Requirements:** Uses cursor-based pagination for large datasets. No integer offsets.
- **Operational UX Requirements:** Features optimistic updates, localized loaders, and offline graceful degradation.
