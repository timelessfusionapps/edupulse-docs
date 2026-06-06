# Offline Coordination Summary

## Coordination Role
The Repository coordinates offline data by translating `DatasourceMetadata.isFromCache` into `RepositoryResponseState.offlineCached`.

## Pagination Preservation
If the user scrolls down while offline, the Datasource loads the next chunk from cache. The Repository Reconciler maps the new cached chunks flawlessly into the existing entity list without corrupting the active stream.

## Optimistic UI
Because `hasPendingWrites` is bubbled up, the Bloc can conditionally attach a `syncing` boolean to specific `StudentEntity` UI models, allowing a subtle syncing indicator to appear next to freshly edited rows.
