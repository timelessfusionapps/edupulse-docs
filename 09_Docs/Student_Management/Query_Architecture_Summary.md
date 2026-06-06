# Query Architecture Summary

## Philosophy
The Student Management module enforces a rigid, unified Query Architecture. Rather than passing individual string or int parameters down the repository chain, all queries are encapsulated in a single `StudentQueryParams` object.

## Components
1. **StudentQueryParams**: The root object. Guarantees deep equality (via Freezed) preventing unnecessary Bloc rebuilds when params haven't actually changed.
2. **StudentFilterParams**: Encapsulates where-clauses (grade, section, houseId, status, archiveState) and search constraints. Includes built-in length validations for search safety.
3. **StudentSortParams**: Defines the sort field and direction. Critical for preventing invalid Firestore combinations (like sorting on a different field than an inequality filter).
4. **StudentPaginationParams**: Standardizes cursor payload delivery for infinite scroll implementation.

## Serialization
All query components implement `fromJson`/`toJson`. This allows query states to be persisted to local storage, ensuring offline resilience and state restoration upon app restarts.
