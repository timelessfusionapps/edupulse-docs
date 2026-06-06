# EduPulse Environment Configuration Guide

## Overview
This guide provides developers and DevOps engineers with the standardized procedures for managing environment configurations for EduPulse.

## 1. Directory Structure
The application consumes configuration from the following root-level files in `apps/admin_app/`:
- `.env.dev` (Local Development / Emulators)
- `.env.staging` (Remote Staging / QA testing)
- `.env.prod` (Live Production data)

## 2. Compilation Targets
To build the application for a specific environment, utilize the `--dart-define` flag:

**Development Mode (Default):**
```bash
flutter run
```

**Staging Mode:**
```bash
flutter run --dart-define=FLAVOR=staging
flutter build web --dart-define=FLAVOR=staging
```

**Production Mode:**
```bash
flutter run --dart-define=FLAVOR=prod
flutter build web --dart-define=FLAVOR=prod
```

## 3. Firebase Options Generation
Prior to deploying Mobile Application bundles, the FlutterFire CLI must be run for each environment to generate distinct routing files.

```bash
# Example for Prod
flutterfire configure --project=edupulse-platform-prod --out=lib/firebase_options_prod.dart
```

*Note: You must manually extend `main.dart` to conditionally select the generated `FirebaseOptions` mapping depending on the active flavor if you wish to swap Firebase projects entirely at runtime rather than build time.*
