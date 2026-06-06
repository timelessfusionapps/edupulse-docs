# Student Selector And Rebuild Boundary Architecture

## Overview
This document enforces strict UI rebuild boundaries within the Student Management module to prevent wasteful rendering cycles.

## Core Architectural Rules
1. **Targeted Rebuilds**: Large global `BlocBuilder` implementations that wrap entire screens are FORBIDDEN.
2. **Selector Usage**: Use `BlocSelector` to isolate specific UI fragments (e.g., search bar, filters, KPI strip, pagination) from unrelated state changes.
3. **Memoization**: `BlocSelector` must map complex state objects into primitive or easily comparable representations whenever possible to trigger rebuilds ONLY when semantic state changes.
4. **BuildWhen Guards**: When `BlocBuilder` is absolutely required, `buildWhen` must be implemented to explicitly check for changes in relevant fields (e.g., `previous.students != current.students`).

## Implementation Guidelines
- **Search Bar**: Rebuilds only when `state.searchQuery` changes.
- **Filters**: Rebuilds only when `state.selectedHouse`, `state.selectedGrade`, etc., change.
- **KPIs**: Rebuilds only when the underlying subset of students affects the aggregated count computations.
- **Data Table**: Rebuilds only when `state.students` or `state.status` changes.