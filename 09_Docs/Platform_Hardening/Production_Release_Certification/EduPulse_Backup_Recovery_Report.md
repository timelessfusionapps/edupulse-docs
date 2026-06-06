# EduPulse Backup & Disaster Recovery Report

## Overview
This report evaluates the data survivability, automated export strategies, and rollback capabilities required for a production-grade multi-tenant architecture.

## 1. Automated Firestore Exports
- **Current Status**: Not Implemented.
- **Assessment**: The repository does not currently contain scheduled Cloud Functions or Google Cloud Scheduler definitions for executing managed Firestore exports (`gcloud firestore export`).
- **Risk Level**: Critical for multi-tenant production. If an admin accidentally corrupts the `schools/{schoolId}` collection, there is currently no cold-storage backup to roll back to.

## 2. Rollback Safety
- **Client Rollback**: **PASS**. The client architecture strictly versions its data access (e.g., using robust `fromJson` mappings with null-safety). Reverting to a previous client binary will not instantly corrupt the database.
- **Schema Rollback**: **PASS**. Because Firestore is NoSQL, older client builds gracefully ignore new fields.

## 3. Required Action Plan
Before migrating production data or onboarding live schools, the following infrastructure must be provisioned:
1. **GCP Storage Bucket**: Create `gs://edupulse-firestore-backups`.
2. **Cloud Scheduler Job**: Define a daily chron job invoking the `v1.projects.databases.exportDocuments` REST API.
3. **Data Lifecycle**: Apply a 30-day auto-delete policy to the bucket to manage storage costs.

## Conclusion
The client application is resilient to rollback operations, but the backend infrastructure lacks disaster recovery procedures. Configuring automated GCP exports is a strict operational prerequisite prior to handling live student data.
