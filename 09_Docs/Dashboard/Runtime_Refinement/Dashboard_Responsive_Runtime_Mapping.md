# Dashboard Responsive Runtime Mapping

## Goal
Define responsive runtime orchestration for the existing Dashboard UI.

## Desktop Runtime Mapping
- Persistent dark sidebar
- KPI strip at top
- Multi-column charts
- Feed + leaderboard side-by-side
- Notification panel

## Tablet Runtime Mapping
- Narrower sidebar
- Reduced chart density
- Condensed KPI cards
- Vertically prioritized feeds

## Mobile Runtime Mapping
- Vertical stacking
- KPI horizontal scrolling
- Charts stacked vertically
- Feed-first rendering

## Runtime Stability Rules
Realtime updates MUST NOT:
- reset scroll positions
- collapse layouts
- trigger overflow
- recreate charts
