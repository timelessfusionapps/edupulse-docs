# Firestore Index Alignment Summary

## Philosophy
Firestore requires composite indexes for queries combining equality filters with inequality or sorting filters. To prevent runtime query failures, `StudentSortParams` and `StudentFilterParams` are designed to tightly align with pre-defined indexes.

## Index Requirements
The following composite indexes must be defined in `firestore.indexes.json` before full implementation:

1. **Default View**: `schoolId` (ASC) + `archiveState` (ASC) + `fullName` (ASC)
2. **Recent Additions**: `schoolId` (ASC) + `archiveState` (ASC) + `createdAt` (DESC)
3. **Filtering**: `schoolId` (ASC) + `archiveState` (ASC) + `grade` (ASC) + `fullName` (ASC)

## Sorting Constraints
`StudentSortParams` documentation warns developers: **If an inequality filter (e.g. >, <) is used, the first orderBy MUST be on that exact same field.**
Our params abstract this danger by relying strictly on predefined sort enumerations (`StudentSortField`) that align directly with deployed indexes.
