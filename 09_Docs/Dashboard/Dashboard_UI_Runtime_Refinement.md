# Dashboard UI Runtime Refinement

This document defines the complete responsive runtime UI behavior for the EduPulse Dashboard. The dashboard acts as the primary operational control center, requiring an exceptionally stable, fluid, and robust UI layer across all device formats.

## 1. Dashboard Layout System
The layout seamlessly adapts to the available viewport to maximize operational efficiency:
- **Desktop (>1024px):** **Operational Control Center.** A multi-pane layout featuring a fixed left sidebar. The main content area is divided into a broad primary column (KPIs and Charts) and a narrower secondary right column (Activity Feed and Notifications).
- **Tablet (768px - 1023px):** **Condensed Operational Layout.** The sidebar becomes collapsible or converts to a compact rail. The main content area wraps into a fluid grid where the secondary column drops below the primary charts.
- **Mobile (<768px):** **Vertical Operational Feed.** A single-column scrolling view. Widgets stack sequentially: KPIs at the top (potentially horizontally scrollable), followed by Charts, Quick Actions, and finally the Activity Feed.

## 2. Dashboard Responsive Runtime Behavior
- **Widget Stacking:** As the viewport shrinks, grid components (like KPI cards) dynamically alter their cross-axis count (e.g., from 4 columns to 2 columns to 1 column).
- **Responsive Rebuilds:** `LayoutBuilder` and `MediaQuery` should be scoped as tightly as possible. Only the specific layout wrappers rebuild upon resize, preserving the internal state of the widgets (e.g., scroll position in the feed).
- **Runtime Layout Swaps:** Transitioning from a Desktop multi-pane layout to a Mobile stacked layout must preserve the `ScrollController` offsets where applicable to prevent the user from losing their context.

## 3. KPI Card Runtime Behavior
- **Realtime Updates:** The numbers inside the KPI cards update dynamically via streams. They must utilize implicit animations (e.g., `TweenAnimationBuilder`) to smoothly count up or down.
- **Loading States:** Initial load displays a subtle shimmer skeleton matching the shape of the card.
- **Mutation Indicators:** If a background process or optimistic mutation is altering a KPI, a subtle progress ring or color change indicates the pending state.
- **Offline Indicators:** A small, unobtrusive grey dot or strike-through icon on the card indicates the data is loaded from the local cache and is not receiving real-time updates.

## 4. Chart Runtime Behavior
- **Smooth Realtime Updates:** As new data arrives, the chart must animate the transition. It must not flash or redraw the entire canvas.
- **Animation Safety:** Data ingestion must be debounced or throttled to prevent rapid, chaotic animations if data streams rapidly.
- **Axis Stability:** Y-axis and X-axis scaling must remain stable and only interpolate smoothly to new ranges when the data pushes beyond current boundaries.
- **Offline Rendering:** Charts must render flawlessly from local cache. 
- **IMPORTANT:** Charts MUST NOT flicker under any circumstances, including layout resizes or realtime data injections.

## 5. Activity Feed Runtime Behavior
- **Live Updates:** New events slide into the top of the feed using an `AnimatedList` or `ListView` with item animation.
- **Pagination Behavior:** Scrolling to the bottom triggers a subtle bottom-loader. Once data is fetched, it appends seamlessly without jumping the scroll position.
- **Scroll Preservation:** If the user has scrolled down the feed, new incoming live events at the top MUST NOT jump the user's scroll position. They can either accumulate quietly behind a "New Updates" chip, or the list adjusts its scroll offset silently.
- **Incremental Rendering:** Render only visible items using `ListView.builder` to maintain 60fps regardless of the feed size.

## 6. Dashboard Interaction UX
- **Hover States:** On Desktop, interactive elements (cards, list items, quick actions) feature subtle elevation changes or background color shifts on hover.
- **Mobile Gestures:** Support swipe-to-dismiss on notifications and pull-to-refresh on the main dashboard view (specifically the Activity Feed).
- **Retry UX:** Failed actions (e.g., a quick action error) result in a temporary SnackBar with a clear "Retry" action.
- **Refresh UX:** Manual pull-to-refresh triggers a synchronized fetching state across all blocs, showing subtle localized loaders.
- **Reconnect UX:** When the network restores, an ephemeral, non-blocking green success banner confirms connection restoration, and stale UI elements instantly snap to current values via their restored streams.

## 7. Dashboard Empty/Error States
- **Empty Dashboard:** For a completely new school, display encouraging "Zero State" illustrations and onboarding prompts instead of blank cards or zeroed charts.
- **Offline Dashboard:** Display a top-level yellow banner: "Offline Mode. Displaying cached data."
- **Partial Failure Rendering:** If the Activity Feed fails to load due to a permission error, the rest of the Dashboard (KPIs, Charts) MUST continue to render normally. 
- **Widget-Level Failure Handling:** Replace the failed widget with a localized error boundary card (e.g., "Unable to load feed") featuring a local retry button. Do not crash the entire Dashboard layout.

## 8. Responsive Runtime Stress Rules
- **Zero Overflow Policy:** Stringent testing guarantees no `RenderFlex` overflow errors on any standard mobile viewport (down to 390px width). Text must truncate (`TextOverflow.ellipsis`) or wrap appropriately.
- **Runtime Stability:** Heavy layout shifts (like opening the keyboard or side panel) must maintain 60fps.
- **Scroll Stability:** Nested scrolling (e.g., scrolling the Activity feed inside a scrolling Mobile dashboard) must be carefully managed using `NeverScrollableScrollPhysics` on inner lists, deferring to the primary outer scroll controller.
- **Widget Isolation:** Complex widgets must be wrapped in `RepaintBoundary` to prevent UI changes in one widget from triggering repaints in adjacent stable widgets.
