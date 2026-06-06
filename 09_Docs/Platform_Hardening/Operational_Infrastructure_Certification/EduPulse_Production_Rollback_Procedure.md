# EduPulse Production Rollback Procedure

## Overview
This report outlines the protocol for rolling back a corrupted production deployment.

## 1. Client Binary Rollback (Web)
If a critical UI bug or infinite loop is deployed to the production web dashboard:
1. Open the Firebase Hosting console.
2. Locate the deployment history table.
3. Identify the previous stable release.
4. Click **"Roll Back"**.
*Time to execute: < 1 Minute. Impact: Immediate.*

## 2. Database Schema / Data Rollback
If a deployed background script or buggy Cloud Function corrupts live student data:
1. Immediately disable the corrupted function/script.
2. Execute the Firestore Import playbook (`EduPulse_Disaster_Recovery_Report.md`) using the 2 AM backup from the bucket `gs://edupulse-platform-prod-firestore-backups`.
*Time to execute: ~15 Minutes. Impact: Platform downtime during restoration.*

## Conclusion
Rollback procedures for both the client interface and the backend data lake are explicitly defined and rely on native GCP tooling, guaranteeing minimal Mean Time To Recovery (MTTR).
