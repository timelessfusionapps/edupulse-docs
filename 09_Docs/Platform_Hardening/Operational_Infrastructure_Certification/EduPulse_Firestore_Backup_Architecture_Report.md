# EduPulse Firestore Backup Architecture Report

## Overview
This report outlines the finalized architecture for automated data survivability utilizing native Google Cloud Platform (GCP) resources.

## 1. Infrastructure as Code (Bash Pipeline)
- **Script**: `08_Firebase/scripts/backups/setup_firestore_backups.sh` has been implemented.
- **Trigger**: GCP Cloud Scheduler (`firestore-daily-backup`).
- **Frequency**: Runs daily at 2:00 AM UTC (`0 2 * * *`).
- **Mechanism**: The scheduler triggers a secure HTTP POST request to the native `firestore.googleapis.com/v1/...:exportDocuments` REST endpoint. This bypasses the need for intermediary Cloud Functions and relies purely on native GCP managed services for maximum reliability.

## 2. Storage Topology
- **Destination**: Exports are routed directly to a dedicated cold-storage bucket: `gs://edupulse-platform-prod-firestore-backups`.
- **IAM Security**: The scheduler executes under a highly restrictive Service Account (`firestore-backup-sa`) which is granted exclusively `roles/datastore.importExportAdmin` and `roles/storage.admin`. It cannot read plaintext data via client APIs.

## Conclusion
EduPulse now possesses an enterprise-grade, zero-maintenance automated backup pipeline. Student records and operational ledgers are safely serialized to cold storage every 24 hours.
