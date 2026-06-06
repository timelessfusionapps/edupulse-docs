# EduPulse Backup Retention Policy

## Overview
This report defines the data lifecycle rules applied to the Firestore backup storage bucket to prevent unchecked storage cost inflation.

## 1. Policy Definition
- **File**: `lifecycle.json` applied during bucket creation.
- **Rule**: `{ "action": {"type": "Delete"}, "condition": {"age": 30} }`

## 2. Operational Impact
- **Retention Window**: The system retains exactly 30 rolling daily snapshots of the entire database.
- **Automated Purging**: On day 31, the oldest backup is automatically pruned by GCP Storage lifecycle management.
- **Cost Cap**: Because the data volume of 30 backups is highly predictable, the Cloud Storage bill remains strictly capped, preventing exponential cost growth over the platform's multi-year lifespan.

## Conclusion
The retention policy balances long-term survivability with strict operational cost controls, safely covering the standard 30-day window required to notice and remediate silent data corruption.
