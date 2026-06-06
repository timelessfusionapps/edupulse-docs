# Query Builder Architecture Summary

## Problem
Chaining `.where`, `.orderBy`, and `.limit` directly inside the Datasource implementation leads to bloated, untestable execution engines that are prone to accidental modification.

## Solution
EduPulse introduces `StudentQueryBuilder`.

### Responsibilities
1. **Archive Safely**: Unconditionally applies `.where('archiveState', ...)` to prevent ghost records.
2. **Deterministic Tie-Breakers**: Unconditionally applies `.orderBy(FieldPath.documentId)` at the end of every sort sequence to guarantee pagination stability.
3. **Cursor Injection**: Safely unpacks `[sortValue, documentId]` arrays into `.startAfter()`.

This ensures `StudentDatasourceImpl` remains entirely lean and focused on stream/cache management rather than query construction logic.
