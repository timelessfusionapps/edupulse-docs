# Firestore Converter Strategy

## Approach
EduPulse strictly relies on `.withConverter<StudentModel>()` using a centralized `StudentFirestoreConverter`.

## Serialization Isolation
The converter safely maps Firestore `DocumentSnapshot` data into strongly-typed `StudentModel` instances. It intercepts the `snapshot.id` and forces it into the JSON payload (as `studentId`) to satisfy `freezed` mappings, and strips it back out during `toFirestore` to prevent redundant storage.

## Timestamp Safety
Combined with `@TimestampConverter()` inside the model, this strategy ensures that timestamps are cleanly parsed whether they come from real Firestore Timestamps, cached integer strings, or Emulator mocks.
