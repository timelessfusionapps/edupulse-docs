# Firestore Foundation Summary

## Purpose
To document the Firestore data structures, typed paths, and serialization logic. This foundation ensures that Firestore interactions are highly structured, type-safe, and free from "magic strings".

## Architectural Decisions
- **Centralized Paths**: `FirestorePaths` and `FirestoreCollections` act as the single source of truth for all database document paths. This mitigates typos and broken references.
- **Freezed for Serialization**: We selected `freezed` alongside `json_serializable`. This completely removes manual `fromJson` mapping errors and ensures robust `==` operator implementations (via `Equatable` equivalents) for BLoC state comparisons.
- **Custom Converters**: Created `TimestampConverter` to automatically transform Firestore `Timestamp` objects into standard Dart `DateTime` objects during serialization.

## Implementation Details
1. **`firestore_paths.dart`**: Provides helper methods `FirestorePaths.student(schoolId, studentId)` which output deterministic document addresses.
2. **`firestore_converters.dart`**: Implements `JsonConverter<DateTime, Object>` to intercept Firestore Timestamps and convert them safely. Includes fallbacks for string dates (useful for JSON mock data) and integers (milliseconds).

## Multi-Tenant & Security Considerations
- The `FirestorePaths` methods *require* `schoolId` as the first parameter. It is syntactically impossible to generate a path to a `student` or `house` without explicitly stating the tenant ID.

## Scalability Considerations
- Using `.withConverter<T>` in our future Datasource extensions guarantees that the client only ever receives fully typed domain entities, significantly reducing parsing overhead in the presentation layer.

## Validation Strategy
- Confirmed that `json_serializable` compiles successfully and generates `*.g.dart` mappings accurately.
- `flutter analyze` verifies that all typed paths are utilized correctly without arbitrary string concatenation across the app.

## Future Developers Note
If you add a new collection to Firestore (e.g., `rewards`), you MUST:
1. Add the constant to `FirestoreCollections`.
2. Add the builder function to `FirestorePaths` (e.g., `static String reward(String schoolId, String rewardId)`).
3. Annotate your model's date fields with `@TimestampConverter()`.
