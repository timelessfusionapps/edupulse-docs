# Student Pagination Orchestration Architecture

## Overview
This document enforces the standard for infinite-scrolling or explicit paginated loads against the Firestore realtime stream for Student models.

## Core Architectural Rules
1. **Cursor-Based**: Pagination must use deterministic Firestore cursors (`startAfterDocument`), not offsets.
2. **Chunk Merging**: The Bloc/Repository must merge subsequent pages securely into the existing list without wiping out earlier items or causing UI layout jumps.
3. **Stream Aggregation**: When observing realtime queries, pagination chunks must be continuously updated in isolation to avoid re-fetching identical historical documents.
4. **State Flags**: The UI must reflect pagination operations via non-blocking indicators (`StudentViewStatus.paginationLoading`) separate from full-page reloads.

## Implementation Guidelines
- Disallow duplicate loading of the same cursor using guard checks (`state.hasMoreData`).
- Utilize the `StudentStreamReconciler` to inject new documents seamlessly based on sort order.
- Track total documents explicitly to properly disable the "Next" buttons or stop infinite scroll triggers.
