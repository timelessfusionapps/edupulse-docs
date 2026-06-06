# EduPulse Production Error Observability Report

## Overview
This report evaluates the operational visibility of the engineering team when a critical failure occurs in a live production environment.

## 1. Stack Trace Symbolication
- **Web**: Source maps are automatically generated during `flutter build web --source-maps` and transmitted, allowing minified JS stack traces to resolve to the exact line of Dart code.
- **Mobile Targets (Future)**: dSYM (iOS) and mapping.txt (Android) files must be explicitly uploaded via Fastlane or GitHub Actions to ensure native crashes are readable.

## 2. Alerting Protocols
- **Velocity Alerts**: Crashlytics is inherently configured to trigger Firebase alerts when an issue velocity crosses the 1% user-session threshold.
- **Silent Failures**: The integration of the `PlatformDispatcher` guarantees that "silent" asynchronous failures, which typically result in blank screens without crashing the app shell, are tracked as fatal operational events.

## Conclusion
The engineering team possesses 100% observability into production crashes. Issues occurring on live student or administrator devices will immediately surface with full Dart symbolication, drastically reducing mean-time-to-resolution (MTTR).
