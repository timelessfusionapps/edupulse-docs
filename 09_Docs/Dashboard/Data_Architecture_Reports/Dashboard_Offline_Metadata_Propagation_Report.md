# Dashboard Offline Metadata Propagation Report
The core response wrapper `DatasourceResponse<T>` pushes `DatasourceMetadata` to `RepositoryResponseState`. This metadata is rigorously unit-tested via `fake_cloud_firestore` to guarantee proper UI state reflection during partial network loss.
