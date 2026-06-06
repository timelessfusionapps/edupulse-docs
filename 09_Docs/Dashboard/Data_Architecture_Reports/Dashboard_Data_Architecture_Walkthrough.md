# Dashboard Data Architecture Walkthrough
## Overview
The Dashboard module now incorporates a strictly typed Data Architecture relying on a repository pattern that completely isolates UI from Firebase.
## Layers
- **Entities**: Pure representations (`DashboardKpiEntity`, etc.) using Freezed.
- **Models**: Firestore serialization (`DashboardKpiModel`, etc.) using `@JsonSerializable` and `@TimestampConverter`.
- **Datasources**: `FirebaseDashboard...DatasourceImpl` handling raw Firestore interaction with `DatasourceResponse`.
- **Repositories**: Transform Firebase models to Entities, handling `RepositoryResponse<T>`.
