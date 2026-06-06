# EduPulse Runtime Monitoring Report

## Overview
This report analyzes the specific categories of runtime events that are actively tracked and forwarded to the operational dashboards.

## 1. Event Tracking Scope
- **Firestore Query Failures**: Handled natively by BLoC state emissions (`ErrorState`) which are traced by `AppLogger`.
- **Reconnect Failures**: Network disconnect logic actively monitors Stream cancellations and reports unrecoverable sockets.
- **Stream Failures**: Snapshot listener timeouts are logged automatically as non-fatal errors to Crashlytics.
- **Analytics Rendering Failures**: Charting anomalies log explicitly to the global dispatcher.
- **Release-Mode Crashes**: Hard native crashes (OOM, segmentation faults, unexpected null operators in Dart) are intercepted via the FlutterError hook.

## 2. Logging Hygiene
- **Debug Logs Excluded**: By gating standard `AppLogger.debug()` calls behind `kDebugMode` and `envConfig.isDev`, there is zero risk of debug stdout bloat consuming memory in release mode.
- **Sensitive Data Exclusion**: Standard crashlytics records stack traces and exception strings, but explicitly avoids logging payload data (e.g. passwords, authentication tokens).

## Conclusion
EduPulse meets enterprise runtime monitoring standards, providing high-fidelity stack traces for critical failures while maintaining strict data hygiene and performance limits.
