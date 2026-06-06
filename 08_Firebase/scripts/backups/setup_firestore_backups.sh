#!/bin/bash
# Setup Automated Firestore Backups using GCP Cloud Scheduler

PROJECT_ID="edupulse-platform-prod"
BUCKET_NAME="gs://${PROJECT_ID}-firestore-backups"
SERVICE_ACCOUNT="firestore-backup-sa@${PROJECT_ID}.iam.gserviceaccount.com"

# 1. Create a storage bucket with a 30-day retention policy
echo "Creating backup bucket: $BUCKET_NAME"
gcloud storage buckets create $BUCKET_NAME --project=$PROJECT_ID --location=us-central1
gcloud storage buckets update $BUCKET_NAME --lifecycle-file=lifecycle.json

# 2. Create service account for backups
echo "Creating service account: $SERVICE_ACCOUNT"
gcloud iam service-accounts create firestore-backup-sa --display-name="Firestore Backup Service Account" --project=$PROJECT_ID
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT" \
    --role="roles/datastore.importExportAdmin"

gcloud storage buckets add-iam-policy-binding $BUCKET_NAME \
    --member="serviceAccount:$SERVICE_ACCOUNT" \
    --role="roles/storage.admin"

# 3. Create a Cloud Scheduler Job to run daily at 2 AM
echo "Creating Cloud Scheduler Job..."
gcloud scheduler jobs create http firestore-daily-backup \
    --project=$PROJECT_ID \
    --schedule="0 2 * * *" \
    --uri="https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default):exportDocuments" \
    --message-body="{\"outputUriPrefix\": \"${BUCKET_NAME}\"}" \
    --oauth-service-account-email=$SERVICE_ACCOUNT \
    --oauth-token-scope="https://www.googleapis.com/auth/datastore" \
    --headers="Content-Type=application/json"

echo "Firestore Automated Backups Configured Successfully."
