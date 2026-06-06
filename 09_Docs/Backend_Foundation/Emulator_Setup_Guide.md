# Emulator Setup Guide

## Purpose
This guide explains how local development is executed using the Firebase Emulator Suite. This guarantees that developers can work offline, run tests safely without risking production data, and save cloud infrastructure costs.

## Architectural Decisions
- **Environment Driven Switch**: The Flutter application dynamically redirects all Firebase SDK traffic to localhost whenever `EnvConfig.environment == Environment.dev`.

## Implementation Details
1. **Config File (`firebase.json`)**:
   Ports are standardized to avoid conflicts:
   - Auth: 9099
   - Functions: 5001
   - Firestore: 8080
   - UI: 4000
2. **App Injection (`firebase_emulator_config.dart`)**:
   Checks `Platform.isAndroid` to safely resolve `10.0.2.2` instead of `localhost` for Android emulators, avoiding `SocketException` errors.

## Running the Emulators
To launch the backend locally:
```bash
cd 08_Firebase/functions
npm run build
cd ..
firebase emulators:start
```

## Offline-First Considerations
- Developers can code on airplanes or in poor connectivity. The emulator mimics the exact latency and offline queuing behavior of the live Firestore database.

## Validation Strategy
- Successfully booted the emulator suite and verified the UI is accessible at `localhost:4000`.
- Verified that the Flutter app console logs `Connecting to Firebase Emulators at localhost...` during bootstrap.

## Multi-Tenant Testing
The emulator allows us to rapidly wipe data and create simulated users with various custom claims to test our tenant isolation rules safely.
