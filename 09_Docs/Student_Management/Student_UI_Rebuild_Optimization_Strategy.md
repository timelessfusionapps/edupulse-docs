# Student UI Rebuild Optimization Strategy

## 1. Overview

This document defines the rebuild optimization architecture for the Student Management module.

The goal is:
- minimize unnecessary rebuilds
- preserve responsive stability
- optimize large dataset rendering
- stabilize realtime updates

---

# 2. Core Principle

The UI MUST NEVER:
fully rebuild for small state changes.

Instead:
updates must remain:
segmented and targeted.

---

# 3. BlocSelector Strategy

Preferred:
BlocSelector

Avoid:
large global BlocBuilder rebuilds.

Purpose:
limit widget rebuild scope.

---

# 4. Desktop Rebuild Segmentation

Desktop UI rebuild zones:
- KPI Strip
- Filters
- Search Bar
- Pagination Footer
- Student Table
- Individual Rows

Each must rebuild independently.

---

# 5. Tablet Rebuild Segmentation

Tablet rebuilds:
- preserve condensed table stability
- avoid sidebar-triggered table rebuilds
- isolate filter rebuilds

---

# 6. Mobile Rebuild Segmentation

Mobile rebuild zones:
- card list
- filter sheet
- pagination controls
- mutation indicators

Avoid:
full-screen rebuilds.

---

# 7. Table Row Optimization

Each row MUST:
- use RepaintBoundary
- rebuild independently
- preserve hover stability

Avoid:
whole-table rebuilds.

---

# 8. Pagination Rebuild Rules

Pagination updates MUST NOT:
rebuild:
- search
- filters
- KPI strip

Only pagination widgets rebuild.

---

# 9. Mutation Rebuild Rules

Create/update/archive mutations MUST:
- rebuild affected rows only
- preserve scroll position
- preserve pagination state

---

# 10. Loading State Optimization

Loading states MUST remain segmented:
- initial loading
- pagination loading
- refresh loading
- mutation loading

Avoid:
full-page flicker.

---

# 11. Skeleton Stability

Skeleton layouts MUST:
match final layout dimensions exactly.

Purpose:
prevent layout shifts.

---

# 12. Search Rebuild Safety

Search updates MUST:
- debounce safely
- avoid rebuilding unchanged widgets
- reset pagination safely

---

# 13. Stream Rebuild Safety

Realtime streams MUST:
- emit minimally
- avoid redundant state emissions
- preserve stable ordering

---

# 14. Scroll Stability

Realtime updates MUST NOT:
- jump scroll position
- reset list position
- destabilize pagination

---

# 15. Performance Requirements

The UI must remain performant with:
- 5,000+ students
- active realtime streams
- active mutations

---

# 16. Future Compatibility

This rebuild strategy prepares for:
- infinite scrolling
- live analytics
- live leaderboards
- animated updates
- virtualization