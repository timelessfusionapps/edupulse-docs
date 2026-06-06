# EduPulse Query Architecture Report

## Overview
This report documents the findings of the Phase 1 Query Architecture Audit across all modules in EduPulse, validating query structures, collection paths, filter combinations, ordering constraints, and realtime listener requirements.

## 1. Dashboard Module

### 1.1 KPI Metrics
- **Collection Path**: `schools/{schoolId}/dashboard_metrics/kpis`
- **Listener Type**: Realtime Snapshot Listener
- **Filters**: None (Direct Document Fetch)
- **Ordering**: None
- **Pagination**: None (Single Document)
- **Index Requirements**: No composite index required.

### 1.2 Recent Activity Feed
- **Collection Path**: `schools/{schoolId}/activities`
- **Listener Type**: Paginated Realtime Stream / Future Fetch
- **Filters**: None
- **Ordering**: 
  - `orderBy('updatedAt', DESC)`
  - `orderBy(FieldPath.documentId, DESC)`
- **Pagination**: Yes (`startAfter(cursor)`, `limit(params.limit)`)
- **Index Requirements**: None (Single-field index on `updatedAt` supports document ID tie-breakers).

### 1.3 Leaderboards
- **Collection Path**: `schools/{schoolId}/leaderboards/{type}/entries`
- **Listener Type**: Paginated Realtime Stream / Future Fetch
- **Filters**: None
- **Ordering**: 
  - `orderBy('rank', ASC)`
  - `orderBy(FieldPath.documentId, ASC)`
- **Pagination**: Yes (`limit(params.limit)`)
- **Index Requirements**: None (Single-field index on `rank`).

### 1.4 Notifications
- **Collection Path**: `schools/{schoolId}/notifications`
- **Listener Type**: Paginated Realtime Stream / Future Fetch
- **Filters**: 
  - `.where('isRead', isEqualTo: false)` (optional)
  - `.where('severity', isEqualTo: params.severity)` (optional)
- **Ordering**: 
  - `orderBy('createdAt', DESC)`
  - `orderBy(FieldPath.documentId, DESC)`
- **Pagination**: Yes (`limit(params.limit)`)
- **Index Requirements**: **Composite Indexes Required**.

### 1.5 Analytics Snapshots
- **Collection Path**: `schools/{schoolId}/analytics/{range}`
- **Listener Type**: Realtime Snapshot Listener / Future Fetch
- **Filters**: None
- **Ordering**: None
- **Pagination**: None (Single Document)
- **Index Requirements**: No composite index required.

## 2. Students Module
- **Collection Path**: `schools/{schoolId}/students`
- **Listener Type**: Standard Query / Future Fetch
- **Filters**:
  - `archiveState`
  - `grade`
  - `section`
  - `houseId`
  - `status`
  - `searchKeywords` (arrayContains)
- **Ordering**: Dynamic (`sort.field`, `DESC/ASC`) + `documentId` tie-breaker
- **Pagination**: Yes (`startAfter(cursor)`, `limit(params.limit)`)
- **Index Requirements**: **Composite Indexes Required** for various combination of filters and sorting fields.

## Conclusion
The core EduPulse architecture has successfully decoupled heavy analytical processing from client-side streams. Dashboard querying primarily leverages pre-aggregated singleton reads and simple chronological range scans, resulting in an exceptionally efficient footprint. Composite index requirements are strictly localized to complex filtering in the Notifications and Students modules.
