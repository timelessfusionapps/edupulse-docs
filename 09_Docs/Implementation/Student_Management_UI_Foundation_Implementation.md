# Student Management UI Foundation Implementation

## Overview
This document defines the highly scalable, responsive, and overflow-proof UI architecture for the Student Management module. This acts as the blueprint for all future operational SaaS modules in EduPulse (e.g., Teachers, Rewards, Analytics).

## 1. Core Architecture Pattern
The frontend strictly adheres to a separated presentation structure that prevents layout logic bleeding across breakpoints.

### Folder Structure
```text
lib/features/students/presentation/
  constants/                 # Magic numbers, breakpoints, animation durations
  layouts/                   # responsive_student_layout.dart (Orchestrator)
  widgets/
    adaptive/                # Widgets that morph automatically based on breakpoints
    desktop/                 # >1024px specific views (Custom Tables)
    tablet/                  # 768px-1024px specific views (Condensed Tables)
    mobile/                  # <768px specific views (Card Lists)
    shared/                  # Reusable badges, empty states, skeletons
    states/                  # Error, Loading, and Empty state wrappers
```

## 2. Hardcoded Width Prevention
To prevent RenderFlex overflows, we categorically reject hardcoded widths in structural containers.
- **Tables**: Columns utilize `Expanded(flex: X)` instead of fixed widths.
- **Adaptive Widgets**: `adaptive_filters.dart` relies on `Wrap` or shifts to a modal bottom sheet based on available horizontal constraints, completely avoiding `SingleChildScrollView(horizontal)` which masks poor responsive design.

## 3. Custom Table Implementation
Flutter's default `DataTable` is restrictive and notoriously poor at handling operational SaaS requirements (like custom row heights, specific hover overlays, and sticky layouts).
- We use a custom `ListView.builder`.
- Rows are standard `Container`s leveraging flexbox (`Row` with `Expanded` children).
- Zebra striping and hover states are handled via custom `Material` ink responses, allowing us to hit the exact 140ms animation standard defined in the design system.

## 4. Mobile UX Strategy
Mobile does NOT use tables.
Below `768px`, the `responsive_student_layout.dart` orchestrator seamlessly transitions to `student_mobile_view.dart`.
- The dataset is rendered as vertical `student_mobile_card.dart` widgets.
- The cards maintain high operational density, showing Avatar, Name, Grade, House, Points, and Status without feeling oversized.
- Bottom sheet overlays replace desktop dropdown filters.

## 5. Skeleton and Empty States
No layout shifts (`CLS - Cumulative Layout Shift`) are permitted.
- `student_skeleton_table.dart` perfectly matches the column proportions of the loaded table.
- Empty states are vertically and horizontally centered inside the exact constraints the table would have occupied.

## 6. Performance & Animation
- **Animations**: Restricted to 140ms–180ms for a snappy, operational feel.
- **Const Constructors**: Enforced globally for all static elements (badges, labels).
- **RepaintBoundaries**: Applied to lists/tables to prevent full-screen repaints during scroll events.

## 7. Mandatory Validation Widths
The implementation will be aggressively validated against:
- `1440px`, `1280px`, `1024px` (Desktop)
- `900px`, `768px` (Tablet)
- `600px`, `430px`, `390px` (Mobile)
