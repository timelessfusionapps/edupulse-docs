# EduPulse Firestore Tenant Structure Report

## Validated Structure
The primary Tenant Foundation validation executed the following Firestore path:

```text
schools/{schoolId}
```

This strictly enforces that all future modules, such as:
- `schools/{schoolId}/students`
- `schools/{schoolId}/dashboard`
- `schools/{schoolId}/events`

...can sit safely beneath this boundary.

## Exception Mapping
The Datasource implementation maps all generic Firestore errors into domain-safe `AppException` types, ensuring that `FirebaseException` does not leak to the bloc layer. This preserves the clean architecture isolation, ensuring the UI layer remains completely agnostic of the database provider.
