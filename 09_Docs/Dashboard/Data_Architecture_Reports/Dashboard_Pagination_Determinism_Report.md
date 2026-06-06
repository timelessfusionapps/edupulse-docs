# Dashboard Pagination Determinism Report
All list queries include `.orderBy(FieldPath.documentId)` fallback logic. Cursors enforce an explicit two-element payload (`[timestamp, documentId]`) generating stable cursor boundaries immune to duplication.
