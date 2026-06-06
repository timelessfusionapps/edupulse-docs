# Repository Architecture Summary

## Purpose
To detail the Repository and Datasource abstraction layers established in Phase 1. This architecture guarantees strict separation between the Flutter UI, business logic (BLoC), and Firebase Data layer.

## Architectural Decisions
- **Datasource Abstraction**: `BaseRemoteDatasource<T>` abstracts Firebase logic (getting, setting, deleting).
- **Tenant Enforcement**: Repositories are required to implement `TenantAwareBaseRepository<T>`. This ensures that a `schoolId` is always provided to the underlying datasource, preventing a developer from accidentally making a global query.
- **Soft Deletes over Hard Deletes**: The base datasource overrides `delete()` to mutate the `isArchived` flag. This preserves referential integrity (e.g., an archived student's past points remain intact).
- **Standardized Error Handling**: Eliminated fragmented errors by catching `FirebaseException` in the datasource and rethrowing `FirestoreException` or `TenantIsolationException`.

## Implementation Details
### Core Interfaces
1. **`BaseRepository<T>`**: Defines required CRUD signatures (`getById`, `getAll`, `getPaginated`, `create`, `update`, `delete`).
2. **`TenantAwareBaseRepository<T>`**: Concrete base connecting the repository to a datasource.
3. **`BaseRemoteDatasource<T>`**: Implements `getPaginated()` using `startAfterDocument`, `limit`, and orderBy logic.

### Folder Structure
```text
lib/core/domain/
 ├── entities/          # PaginatedResult
 ├── repositories/      # BaseRepository
 └── value_objects/     # (Reserved)

lib/core/data/
 ├── datasources/       # BaseRemoteDatasource
 └── repositories/      # TenantAwareBaseRepository

lib/core/errors/
 └── app_exceptions.dart
```

## Validation Strategy
- **Repository Validation**: Tested by confirming that attempting to instantiate a datasource without a `schoolId` throws a `TenantIsolationException`.
- **Serialization Validation**: Leverages `freezed` and `json_serializable` for zero-boilerplate model validation.

## Scalability & Offline-First Considerations
- **Scalability**: By making `getPaginated` a base requirement, we ensure that as the tenant's data grows (e.g., 50,000 activities), the frontend is forced to paginate, keeping memory footprint low.
- **Offline-First**: The datasource operates seamlessly against the Firestore local cache. If offline, the cache is read. If an update occurs, it is queued via Firestore's pending writes.

## Future Developers Note
When creating a new feature (e.g., `Leaderboard`), you MUST NOT query Firestore directly in the UI. You must create a `LeaderboardDatasource` extending `BaseRemoteDatasource`, and a `LeaderboardRepository` extending `TenantAwareBaseRepository`.
