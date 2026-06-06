# Firebase Backend Foundation Walkthrough

## Purpose
This document provides a high-level walkthrough of the Phase 1 Firebase Backend Foundation implementation for the EduPulse SaaS platform. It serves as the entry point for understanding how the offline-first, tenant-aware Firebase infrastructure was established.

## Architectural Decisions
- **Emulator-First**: All development logic is decoupled from production by defaulting to the Firebase Emulator Suite when `envConfig.isDev` is true. This prevents accidental data bleed and allows offline development.
- **Tenant-First Queries**: Implemented a mandatory `schoolId` constraint across the entire repository tier to ensure multi-tenancy from Day 1.
- **Strict Layers**: Adopted `UI -> BLoC -> Repository -> Datasource -> Firebase`. The UI never accesses Firebase directly, preventing UI-authoritative manipulation.

## Implementation Details
1. **Dependencies**: Upgraded and resolved `firebase_core`, `cloud_firestore`, `cloud_functions`, `freezed`, and `json_serializable` for robust serialization and connectivity.
2. **Configuration Injection**: Integrated `FirebaseEmulatorConfig.connectEmulators()` directly into `InitializationManager` before DI setup.
3. **Domain Layer**: Created `PaginatedResult` (freezed) and `BaseRepository` to ensure standard API compliance across all modules.

## Multi-Tenant & Security Considerations
- **Tenant Isolation**: Achieved natively by `TenantAwareBaseRepository` which delegates to `BaseRemoteDatasource`.
- **Security Rules**: Deployed strict validation ensuring `request.auth.token.schoolId == schoolId` for all hierarchical reads/writes.

## Offline-First & Scalability
- Relies on Firestore's default offline cache and pending writes queue.
- `PaginatedResult` is integrated into `BaseRemoteDatasource` ensuring no global fetch queries are possible without pagination parameters, mitigating large payload scalability risks.

## Future Expansion Readiness
The repository is primed for Phase 2. Future engineers only need to implement specific repositories (e.g., `StudentRepository`) by extending `TenantAwareBaseRepository` to inherit all security, pagination, and tenant isolation benefits instantly.
