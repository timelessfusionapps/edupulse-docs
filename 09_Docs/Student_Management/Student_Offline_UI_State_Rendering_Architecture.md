# Student Offline UI State Rendering Architecture

## Overview
This document specifies how the UI visually communicates offline operation modes and gracefully degrades functionality when network connectivity is lost.

## Core Architectural Rules
1. **Explicit Communication**: The UI must explicitly notify the user when operating in offline mode using a dedicated component (e.g., `StudentOfflineBanner`).
2. **Mutation Degradation**: Mutations (Archive, Edit) executed while offline should visually indicate their pending status (e.g., by reducing row opacity or showing a pending icon) instead of freezing or disappearing immediately.
3. **Query Consistency**: Offline cached queries must render identically to live queries, preserving filters, search parameters, and sorting.
4. **Auto-Recovery**: When connectivity is restored, the Bloc orchestrates silent background reconciliation. The UI must transition seamlessly back to live data without blocking UX or resetting scroll position.

## Implementation Guidelines
- Check `state.isOffline` exposed by the `StudentBloc` to conditionally render the offline banner.
- Monitor `state.hasPendingMutations` to adjust row opacity or interactivity in tables and lists.
- Avoid locking the UI; local optimistic operations must remain fast and responsive.