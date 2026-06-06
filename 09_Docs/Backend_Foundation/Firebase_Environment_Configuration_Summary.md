# Firebase Environment Configuration Summary

## Purpose
To outline how environments (Development, Staging, Production) are isolated safely from one another to prevent accidental data leaks or corruptions during active development.

## Architectural Decisions
- **Emulator First**: Rather than having a separate Firebase project for "dev", we run entirely locally via the Firebase Emulator Suite. This guarantees 0ms latency for rapid development and zero cost.
- **Dependency Injection Order**: Firebase must be initialized *before* the Service Locator attempts to inject `FirebaseAuth` or `FirebaseFirestore` into datasources.

## Implementation Details
Located in `lib/bootstrap/initialization_manager.dart`:
```dart
// 4. Initialize Firebase
await Firebase.initializeApp(
  options: DefaultFirebaseOptions.currentPlatform,
);

// Connect to local emulators in development environment
if (envConfig.isDev) {
  await FirebaseEmulatorConfig.connectEmulators();
}
```
This is checked immediately using `envConfig.isDev` (derived from the Flutter build flavor). If true, it overrides the global instances of Auth, Firestore, and Functions to point to localhost ports.

## Risks Mitigated
- **Testing on Production**: It is now mechanically impossible to write mock data to the production database when running the app locally in debug mode.

## Future Expansion Readiness
- When the Staging environment is introduced, `.firebaserc` will be updated to include `default: edupulse-prod` and `staging: edupulse-staging`. CI/CD pipelines will inject the proper environment variables automatically based on branch pushes.
