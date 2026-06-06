# Backend Folder Architecture

## Purpose
To provide a visual roadmap of the newly established backend architecture across both the Flutter client application and the Firebase backend workspace.

## Application Architecture (`apps/admin_app/lib/`)
```text
lib/
 ├── bootstrap/
 │    └── initialization_manager.dart     # Bootstraps DI and Emulators
 ├── core/
 │    ├── data/
 │    │    ├── datasources/
 │    │    │    └── base_remote_datasource.dart    # Firestore boilerplate & tenant isolation
 │    │    └── repositories/
 │    │         └── tenant_aware_base_repository.dart # Abstract Base Repo
 │    ├── domain/
 │    │    ├── entities/
 │    │    │    └── paginated_result.dart          # Generic pagination model
 │    │    └── repositories/
 │    │         └── base_repository.dart           # The ultimate API contract
 │    ├── errors/
 │    │    └── app_exceptions.dart                 # Unified exceptions
 │    └── firebase/
 │         ├── firebase_emulator_config.dart       # Handles localhost switching
 │         ├── firestore_converters.dart           # Timestamp -> DateTime mappers
 │         └── firestore_paths.dart                # Centralized string builders
```

## Firebase Workspace Architecture (`08_Firebase/`)
```text
08_Firebase/
 ├── .firebaserc                          # Target project mappings
 ├── firebase.json                        # Emulator & hosting config
 ├── firestore.rules                      # Strict security rules
 ├── firestore.indexes.json               # Future composite indexes
 └── functions/
      ├── package.json
      ├── tsconfig.json
      └── src/
           ├── index.ts                   # Export root
           ├── callables/                 # (Future) Client invoked functions
           └── triggers/                  # (Future) Event driven hooks
```

## Scalability Considerations
- **Modular Domains**: Grouping by `domain` and `data` strictly separates "what" the app does from "how" it does it. If we ever swap Firestore for a GraphQL backend, only the `data` folder changes.
- **Micro-Services Ready**: The `functions` directory is split into `callables` and `triggers`, preventing a monolithic `index.ts` from causing slow cold starts.
