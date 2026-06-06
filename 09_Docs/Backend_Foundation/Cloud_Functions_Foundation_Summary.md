# Cloud Functions Foundation Summary

## Purpose
To document the architecture of the serverless backend. Cloud Functions act as the authoritative backend for EduPulse, executing logic that cannot be trusted to the frontend client (e.g., leaderboard calculation, point verification, notifications).

## Architectural Decisions
- **TypeScript**: Strictly typed backend code prevents runtime null errors and aligns perfectly with our typed Dart frontend.
- **Modular Exports**: Instead of a monolithic `index.ts` file, triggers and callables are separated into folders (`triggers/`, `callables/`, `utils/`) to ensure high maintainability.
- **Node 20**: Targeting the latest stable LTS runtime for Google Cloud Functions.

## Folder Structure
```text
08_Firebase/functions/
 ├── package.json
 ├── tsconfig.json
 └── src/
      ├── index.ts           # Barrel file exporting all functions
      ├── triggers/          # Firestore onCreate/onUpdate hooks
      ├── callables/         # HTTPS onCall functions invoked by Flutter
      └── models/            # Shared interfaces matching Dart entities
```

## Implementation Details
- Initialized `firebase-admin` natively inside `src/index.ts`.
- Scripts in `package.json` are pre-configured to `build`, `serve` (against the emulator), and `deploy`.

## Security Considerations
- The frontend will NEVER write directly to leaderboards. Instead, an `onUpdate` trigger on the `activities` collection will securely aggregate points.
- Functions execute via the Firebase Admin SDK, meaning they bypass security rules. It is critical that business logic within functions rigorously validates inputs before manipulating data.

## Scalability Considerations
- Cloud Functions automatically scale horizontally. However, to minimize "cold start" latency, dependencies have been kept extremely lightweight (only `firebase-admin` and `firebase-functions`).

## Future Expansion Readiness
- When the Analytics and Notifications engines are built in later phases, they will drop cleanly into this structure.
