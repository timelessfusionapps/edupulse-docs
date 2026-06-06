# Student Mutation Orchestration Architecture

## Overview
This document enforces safety rules for executing writes (creates, updates, soft-deletes/archives) on Student data within the operational pipeline.

## Core Architectural Rules
1. **Idempotency**: All mutations must be designed to be idempotent. Duplicate executions caused by offline retries must safely resolve to the identical final state.
2. **Soft Deletes**: Deletions (`StudentArchived`) must update the `archiveState` flag rather than permanently wiping the Firestore document, preserving referential integrity for historical logs.
3. **UI Isolation**: Row-level mutations must NOT trigger a full table rebuild. Pending mutations apply targeted opacity changes localized to the specific student row.
4. **Optimistic Pre-computation**: The UI anticipates a successful outcome by marking `isMutating` instantly, rolling back silently if the Repository signals a permanent failure.

## Implementation Guidelines
- Track `pendingMutations` using a `Set<String>` of student IDs within the `StudentState`.
- Pass the `isMutating` boolean down to components like `StudentTableRow` and `StudentMobileCard`.
- Map exceptions directly to actionable UI snackbars or offline queues without corrupting the active read stream.
