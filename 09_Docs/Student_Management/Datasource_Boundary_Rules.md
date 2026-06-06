# Datasource Boundary Rules

## Immutable Rules
1. **Zero UI Logic**: The Datasource does not format strings, translate enums, or map colors.
2. **Zero Auth Resolution**: The Datasource does not read Firebase Auth. The `schoolId` must be passed to it.
3. **Zero DocumentSnapshots**: The Datasource is the absolute edge of the Firebase SDK. `QuerySnapshot` and `DocumentSnapshot` die here.
4. **Exception Wrapping**: Raw `FirebaseException` objects are strictly intercepted and wrapped in `AppException` types (`OfflineException`, `UnauthorizedException`) to decouple error handling from Firebase.

Violating these boundaries will result in immediate PR rejection.
