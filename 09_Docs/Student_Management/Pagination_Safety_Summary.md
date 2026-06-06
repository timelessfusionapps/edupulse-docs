# Pagination Safety Summary

## Cursor Array Architecture
EduPulse completely abandons `DocumentSnapshot` pagination. Instead, `StudentPaginationParams` enforces exactly two elements: `[sortValue, documentId]`.

## Runtime Validation
`StudentQueryValidator` guarantees that any invalid or malformed cursor array instantly throws a `DatasourceValidationException` before generating a cloud read.

## Tie-Breaker Stability
`StudentQueryBuilder` enforces a mandatory `.orderBy(FieldPath.documentId)` fallback on all queries. This guarantees that if two students have the exact same `totalPoints` or `createdAt` value, the pagination cursor will not bounce endlessly between them.
