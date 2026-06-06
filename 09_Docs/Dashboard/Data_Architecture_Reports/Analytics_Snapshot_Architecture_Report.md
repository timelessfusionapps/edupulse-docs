# Analytics Snapshot Architecture Report
Dashboard utilizes a "Snapshot ONLY" architecture.
- Snapshots are queried from `schools/{schoolId}/analytics/{range}`.
- Prevents massive UI-side aggregations.
- Enforces predictable performance using purely generated snapshots, limiting client compute requirements.
