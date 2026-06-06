# Stream Reconciliation Architecture

## Strategy
`StudentStreamReconciler` transforms raw `DatasourceResponse` streams into stable `RepositoryResponse` streams using a persistent `LinkedHashMap`.

### Why a Map?
Firestore streams can occasionally emit duplicate records during rapid offline/online transitions or partial cache updates. By feeding the incoming stream models into `reconcilerMap[model.studentId] = model.toEntity()`, newer snapshots seamlessly overwrite older ones without changing the length of the list or causing index OutOfBounds errors in UI ListViews.

### Deterministic Merging
Because the Datasource layer forces an `.orderBy(FieldPath.documentId)` fallback on all queries, the `LinkedHashMap` natively preserves the exact sort order guaranteed by the database.
