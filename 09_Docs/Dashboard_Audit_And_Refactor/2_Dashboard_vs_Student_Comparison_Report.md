# Dashboard vs Student Comparison Report

| Feature | Student Management (New Standard) | Dashboard (Current) |
|---|---|---|
| Layout Orchestration | Strict routing to distinct views | Lazy Row-to-Column stacking |
| Mobile Strategy | Purpose-built dense cards | Oversized desktop cards squashed vertically |
| Constants | Centralized `constants/` | Hardcoded `flex` and spacing values |
| Overflow Safety | High (LayoutBuilder boundary checks) | Low (relies on unrestricted ScrollView) |