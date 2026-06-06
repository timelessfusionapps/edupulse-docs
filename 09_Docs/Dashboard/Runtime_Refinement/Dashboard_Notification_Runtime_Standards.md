# Dashboard Notification Runtime Standards

## Goal
Define realtime-safe notification rendering standards.

## Runtime Rules

### Realtime Insertions
Notifications MUST:
- insert safely
- avoid global rebuilds
- preserve operational continuity

### Offline Rendering
Notifications MUST:
- render cached alerts
- preserve unread state
- support reconnect-safe synchronization
