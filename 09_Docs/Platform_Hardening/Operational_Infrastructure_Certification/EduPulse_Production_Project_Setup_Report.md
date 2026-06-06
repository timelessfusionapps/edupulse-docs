# EduPulse Production Project Setup Report

## Overview
This report documents the exact provisioning status of the isolated production Firebase project.

## 1. Provisioning Requirements
The production Firebase project (`edupulse-platform-prod`) must be provisioned with the following strict configurations:
- **Firestore**: Enabled in Native Mode, matching the multi-tenant `schools/{schoolId}` index topography defined in `firestore.indexes.json`.
- **Authentication**: Email/Password disabled for students; Single Sign-On (Google/Microsoft) or strict Email-Link enabled for Administrators.
- **Storage**: Enabled with strict production Security Rules preventing unauthenticated uploads.

## 2. Safety Constraints
- **Emulator Block**: Production security rules must explicitly deny any `X-Firebase-Emulator` bypass requests.
- **API Key Scopes**: The Web API Key generated for `edupulse-platform-prod` must be strictly scoped in the Google Cloud Console to `edupulse.app` domain referrers to prevent quota hijacking.

## Conclusion
The client application is fully prepared to digest the production environment variables (`.env.prod`). Operational deployment can commence immediately upon the physical creation of the Firebase Project matching the defined parameters.
