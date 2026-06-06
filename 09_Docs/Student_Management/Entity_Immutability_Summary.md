# Entity Immutability Summary

## Philosophy
To prevent accidental mutation bugs and ensure reactive state integrity, EduPulse enforces strict immutability across the domain layer using Freezed.

## Immutable Safety
The `StudentEntity` contains critical fields that must **NEVER** be mutated after initial creation. These fields define the absolute identity and organizational boundary of the record:

1. `studentId`: The primary UUID.
2. `schoolId`: The tenant boundary (mutation would result in tenant leakage).
3. `createdAt`: The immutable chronological anchor.

## Nullability Hardening
All identity, organizational, and timestamp fields are declared as strictly `required` and non-nullable in the Entity. This guarantees that inconsistent or corrupt documents fetched from Firestore will throw immediate parsing exceptions at the Datasource layer, rather than failing silently deep in the UI.

## Model Versioning
`schemaVersion` is injected into the Entity. This guarantees that as future requirements evolve, older immutable records can be safely migrated to the newest standard via backward compatibility checks.
