# Student Stream Lifecycle Architecture

## Overview
This document specifies how realtime Firestore streams are initialized, maintained, and safely disposed of within the Student Management module.

## Core Architectural Rules
1. **Single Source Stream**: The `StudentDatasource` provides a unified stream of raw data (`DatasourceResponse`) that the `StudentRepository` maps into a `RepositoryResponse`. 
2. **Reinitialization Safety**: Before instantiating a new stream (e.g., due to changed filters or queries), the old stream subscription MUST be fully canceled. 
3. **Leak Prevention**: Cross-tick persistence and stale listeners must be destroyed to prevent ghost data from bleeding into active views.
4. **Signature Verification**: Every emitted state must carry a `querySignature` to allow the Bloc to discard delayed stream chunks matching old parameters.

## Implementation Guidelines
- The `StudentStreamReconciler` handles merging paginated chunks and updating the internal list securely.
- Subscriptions inside `StudentBloc` must be tracked and cancelled in `close()` or before assigning a new subscription on query changes.
