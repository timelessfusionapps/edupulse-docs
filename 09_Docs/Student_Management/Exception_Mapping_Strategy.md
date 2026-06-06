# Exception Mapping Strategy

## The Problem
Leaking `FirebaseException` or `GrpcError` upwards tightly couples the presentation layer to Firebase.

## The Strategy
`RepositoryExceptionMapper` intercepts ALL errors thrown by the Datasource.

### Mapping Rules
1. **Known Exceptions**: If the Datasource already wrapped it in an `AppException` (like `OfflineException` or `UnauthorizedException`), it passes cleanly.
2. **Unknown Exceptions**: If a raw SDK error escapes the Datasource, the Mapper catches it and wraps it in a generic `UnknownException`.

The Bloc layer will only ever catch `AppException`.
