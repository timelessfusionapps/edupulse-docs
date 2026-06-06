# RepositoryResponse Architecture

## Problem
In offline-first apps, the UI needs to know if the data it just fetched is fresh from the server, stale from the cache, or optimistic (pending write). Traditionally, developers leak Firebase `SnapshotMetadata` directly to the Bloc. This breaks Clean Architecture and makes swapping the database impossible.

## Solution
`RepositoryResponse<T>` acts as a pure domain abstraction.

```dart
class RepositoryResponse<T> {
  final T data;
  final RepositoryResponseState state;
  final bool hasPendingWrites;
}
```

### States
- `success`: Fully synced and fresh.
- `offlineCached`: Loaded from the device cache, sync pending.
- `partialSuccess`: Handled partial stream recoveries.
- `loading`: Explicit UI shimmer state triggers.
- `failure`: Wrapped errors.
