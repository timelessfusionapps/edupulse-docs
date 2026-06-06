# Offline Metadata Handling Summary

## Problem
Firebase throws `unavailable` or operates in a stale cache mode when offline. The UI needs to know if the data it's showing is stale or waiting to be synced, but exposing `DocumentSnapshot` to the UI breaks clean architecture.

## Solution
EduPulse introduces `DatasourceResponse<T>` wrapping `DatasourceMetadata`.

## Implementation
1. **Cache Visibility**: `isFromCache` allows the Bloc to render an "Offline Mode" banner over the table.
2. **Pending Writes**: `hasPendingWrites` allows the UI to display a subtle spinning sync icon next to students that have been created/updated locally but not yet acknowledged by the cloud.
3. **Purity**: Zero Firebase dependencies exist outside the Datasource Layer.
