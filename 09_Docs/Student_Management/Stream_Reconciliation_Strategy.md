# Stream Reconciliation Strategy

## Problem
Raw `.snapshots()` on large collections can emit overlapping or duplicated documents depending on the cache state and pending writes, resulting in jittery, rebuilding UI tables.

## Solution
`StudentDatasourceImpl` intercepts the stream snapshot and maps it through a deterministic reconciliation loop:

```dart
final Map<String, StudentModel> reconciliationMap = {};
for (var doc in snapshot.docs) {
  reconciliationMap[doc.data().studentId] = doc.data();
}
```

## Benefits
- **Duplicate Prevention**: Re-emitted documents overwrite their older versions instantly.
- **Ordered Safety**: The Map preserves the exact sequence provided by the Firestore index.
- **Partial Rebuilds**: The UI only receives stable lists, enabling Bloc selectors to animate individual row changes.
