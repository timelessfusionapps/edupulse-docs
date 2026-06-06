# Dashboard Feed Runtime Standards

## Goal
Define realtime-safe feed orchestration standards.

## Runtime Rules

### Pagination Safety
Feeds MUST support:
- cursor-safe pagination
- deterministic ordering
- duplicate prevention

### Realtime Insertions
Feeds MUST:
- append incrementally
- preserve scroll anchors
- avoid list rebuild explosions

### Offline Rendering
Feeds MUST:
- render cached history
- restore safely after reconnect
