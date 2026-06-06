# Student Offline Orchestration Architecture

## Overview
This document outlines the system for handling connectivity drops, offline caching, and silent recovery operations for student data.

## Core Architectural Rules
1. **Firestore Cache Priority**: Reads must attempt to fetch from server first, but instantly fall back to local cache (`GetOptions(source: Source.cache)`) if offline. 
2. **Mutation Queue**: Offline mutations (Archive, Edit) are stored securely in a local queue and broadcasted to the Bloc as `pending`. 
3. **Recovery Sequence**: Upon reconnect, queued mutations must be executed idempotently before fresh server data replaces the offline cache.
4. **UI Degradation**: The UI must display an offline indicator while gracefully disabling only those actions strictly requiring server validation.

## Implementation Guidelines
- Configure `FirebaseFirestore` with persistence enabled at initialization.
- Catch `FirebaseException` with specific offline/unavailable codes in the Datasource and map them to offline-specific states.
- Emit offline flags through the `RepositoryResponse` back to the Bloc to trigger the UI banner.
