# EduPulse App Infrastructure Foundation (V1)

EduPulse follows a Configuration-over-Customization philosophy.

Schools may configure terminology, branding, roles, permissions, houses, and academic structures, but core platform workflows remain standardized to preserve usability, supportability, and operational simplicity.

## Overview
This document outlines the architecture, philosophy, and technical implementation details of the EduPulse App Infrastructure Foundation. This layer serves as the operational backbone of the application, managing global cross-cutting concerns independently of feature-level business logic.

---

## 1. Core Concepts and Philosophy

### Infrastructure Architecture Philosophy
The infrastructure architecture is built on the principles of modularity, centralized configuration, and loose coupling. It establishes global systems (dependency injection, logging, error handling, network monitoring, lifecycle awareness) that can be reliably consumed by any feature module without tight coupling.

### Why Infrastructure Before Authentication?
Infrastructure must precede Authentication because Authentication itself relies on stable operational systems:
- It needs environment configuration to target the correct auth backend.
- It needs structured logging for auth events and failures.
- It needs dependency injection to register its repositories and services.
- It needs the global error handler to safely catch async token refresh failures.
Building infrastructure first ensures that all subsequent business modules—including Auth—inherit a predictable, production-ready environment.

### App-Wide Infrastructure Responsibilities
The infrastructure layer acts as a resilient buffer between the Flutter framework and business logic, providing:
- Guaranteed synchronous/asynchronous startup sequencing.
- Single-source-of-truth service location.
- Environment-aware behavior scaling.
- Passive background monitoring (connectivity, lifecycle).
- Graceful degradation through global error interception.

### Global Infrastructure Services
Global services are instantiated once and persist throughout the application lifecycle. They are stateless or manage primitive global states (like connectivity status), avoiding business logic entirely.

---

## 2. Component Architectures

### Bootstrap Architecture & Initialization Sequencing
Bootstrap architecture replaces direct `runApp` execution with an orchestrated startup flow. 
- **`InitializationManager`**: Manages the sequence of async and sync operations (e.g., binding initialization, logger setup, DI registration) before the UI is permitted to render.
- **`app_bootstrap.dart`**: Wraps the root `EduPulseApp` widget with necessary providers (e.g., `ConnectivityBloc`) and kicks off the `runApp` command only when dependencies are guaranteed to be ready.

### Dependency Injection Strategy
EduPulse relies on `get_it` as a centralized service locator to achieve Inversion of Control (IoC).
- **`service_locator.dart`**: Acts as the global registry. Services are primarily registered as `LazySingleton` to optimize startup time, ensuring instantiation only occurs on first use. BLoCs are registered as `Factory` to ensure fresh state when instantiated.

### Environment Configuration Architecture
Configuration is abstracted away from the code execution via strictly typed models.
- **`EnvConfig`**: An immutable class defining specific environment parameters (e.g., `apiBaseUrl`, `appName`, `Environment` enum).
- **`AppConfig`**: A static singleton-like accessor that holds the initialized `EnvConfig`, allowing deep nested widgets or services to synchronously query the current environment (e.g., `AppConfig.isDev`).

### Logging Architecture
A centralized, environment-aware logging mechanism built on top of the `logger` package.
- **`AppLogger`**: Wraps the external package. It dynamically configures its verbosity and formatting based on `EnvConfig`. In `dev`, it outputs rich stack traces and method counts; in `prod`, it restricts output to concise `info` or `error` severities to prevent log flooding.

### Global Error Handling Architecture
Global error handling ensures the app fails gracefully and logs structured contextual data instead of crashing silently or freezing.
- **FlutterError Interception**: `FlutterError.onError` intercepts synchronous framework-level rendering or state errors.
- **Async Exception Interception**: `PlatformDispatcher.instance.onError` intercepts asynchronous, unhandled Dart exceptions. Both streams pipe into `AppLogger.fatal` or `AppLogger.error` for eventual transmission to crash analytics.

### Connectivity Monitoring Architecture
- **`ConnectivityService`**: Subscribes to device network interfaces via `connectivity_plus`. It abstracts native connectivity streams into a simple `NetworkStatus` enum.
- **`ConnectivityBloc`**: Bridges the `ConnectivityService` to the Flutter widget tree. It listens to the service stream and emits reactive states (`isOnline`, `isOffline`), allowing any UI component to rebuild based on network availability.

### Lifecycle Observer Architecture
- **`AppLifecycleObserver`**: Implements `WidgetsBindingObserver` to monitor when the app transitions between foreground, background, and inactive states. This is critical for pausing heavy operations or triggering background syncs.

---

## 3. Forward-Looking Readiness Strategies

### Infrastructure Scalability Philosophy
The infrastructure is designed horizontally. Adding a new global service (like Analytics or Crashlytics) simply requires adding an initialization line in `InitializationManager` and a registration line in `service_locator.dart`, requiring zero changes to existing UI or business logic.

### Offline-First Preparation Strategy
By implementing the `ConnectivityService` and `ConnectivityBloc` early, the infrastructure is prepared to support Hive offline queues. Future repositories will listen to `ConnectivityBloc` state to decide whether to push data to Firebase or cache it in Hive.

### Firebase Preparation Strategy
`InitializationManager` provides an explicit, sequenced hook for `Firebase.initializeApp()`. The asynchronous nature of the manager ensures Firebase is fully booted before any Firebase-dependent repository is instantiated via `get_it`.

### Multi-Tenant Readiness Preparation
The `EnvConfig` establishes the pattern for dynamic configuration. As SaaS requirements grow, `AppConfig` can be expanded to hold tenant-specific configuration fetched during bootstrap.

---

## 4. Workflows & Execution Paths

### Bootstrap Flow
1. `main()` calls `bootstrap()`.
2. `bootstrap()` delegates to `InitializationManager.initializeApp()`.
3. `WidgetsFlutterBinding.ensureInitialized()` is executed.
4. `GlobalErrorHandler` is bound to the platform dispatcher.
5. `AppLogger` is configured based on `EnvConfig`.
6. `AppConfig` stores the active environment variables.
7. `service_locator` registers global services.
8. (Future) `Firebase` and `Hive` execute their async setups.
9. `bootstrap()` calls `runApp()`, wrapping the root widget with global providers.

### Connectivity Flow
1. `ConnectivityService` is instantiated lazily via `get_it`.
2. It polls current network state and attaches a stream listener.
3. `ConnectivityBloc` is created and injects `ConnectivityService`.
4. The BLoC subscribes to the service stream.
5. Upon network change, service updates status -> BLoC emits new state -> UI widgets wrapped in `BlocBuilder<ConnectivityBloc>` rebuild dynamically.

### Error Handling Flow
1. Unhandled exception occurs (sync or async).
2. Intercepted by `GlobalErrorHandler`.
3. Stack trace and context formatted.
4. Passed to `AppLogger.error`.
5. Printed to console (and eventually sent to Crashlytics).

### Logging Flow
1. Developer calls `AppLogger.debug('User tapped login')`.
2. `AppLogger` checks current `Level` threshold configured via `AppConfig.isDev`.
3. Message is formatted with emojis, timestamps, and stack traces.
4. Output is generated to standard console.

---

## 5. Architectural Decisions and Tradeoffs

- **Tradeoff: Static `AppConfig` vs Injected Config.** We opted for a static `AppConfig` over injecting configuration via `get_it`. *Decision:* Configuration is read-heavy and globally ubiquitous. Static access prevents cluttering constructors with configuration dependencies, keeping BLoC and service signatures clean.
- **Tradeoff: Wrapping third-party packages.** We wrapped `logger` in `AppLogger` and `connectivity_plus` in `ConnectivityService`. *Decision:* This strict abstraction prevents vendor lock-in. If we swap `connectivity_plus` for another package, only the service changes; the BLoC and UI remain untouched.

---

## 6. File Manifest

### Folder Structure
```text
lib/
├── bootstrap/               # Orchestrates app startup sequence
├── core/
│   ├── config/              # Environment and global configuration
│   ├── di/                  # get_it service locator setup
│   ├── errors/              # Global error handling and custom exception models
│   └── services/
│       ├── connectivity/    # Network monitoring service and BLoC
│       ├── lifecycle/       # App foreground/background observer
│       └── logging/         # Centralized logger wrapper
```

### Files Created
- **`lib/bootstrap/app_bootstrap.dart`**: Replaces standard `runApp` execution.
- **`lib/bootstrap/initialization_manager.dart`**: Sequences async startup processes.
- **`lib/core/config/env_config.dart`**: Data model defining environment structures.
- **`lib/core/config/app_config.dart`**: Global accessor for environment variables.
- **`lib/core/di/service_locator.dart`**: `get_it` dependency injection registry.
- **`lib/core/errors/app_exceptions.dart`**: Base domain exception classes.
- **`lib/core/errors/global_error_handler.dart`**: Hooks into Flutter framework error streams.
- **`lib/core/services/logging/app_logger.dart`**: Centralized structured logging utility.
- **`lib/core/services/connectivity/connectivity_service.dart`**: Native network interface listener.
- **`lib/core/services/connectivity/bloc/connectivity_bloc.dart`**: Reactive state manager for network status.
- **`lib/core/services/lifecycle/app_lifecycle_observer.dart`**: Hooks into OS application state transitions.
- **`lib/features/app_shell/presentation/infrastructure_demo_screen.dart`**: UI for validating connectivity infrastructure.

### Files Modified
- **`lib/main.dart`**: Updated to utilize `bootstrap()` and inject `EnvConfig`.
- **`lib/core/router/app_router.dart`**: Registered the infrastructure demo route.
- **`lib/core/router/route_names.dart`**: Added `/infrastructure-demo` string constant.

---

## 7. Validation & Testing

- **Flutter Analyze**: `flutter analyze` completed with 0 issues after resolving unnecessary imports.
- **Flutter Test**: Default and routing tests pass with 100% success rate.
- **Connectivity Validation**: Successfully verified offline/online state propagation from the OS down to the `InfrastructureDemoScreen` using Wi-Fi toggling.
- **Initialization Validation**: Confirmed async sequenced startup; console logs prove logger boots before DI, which boots before runApp.
- **Lifecycle Validation**: Confirmed `AppLogger` records correct OS state transitions (`Resumed`, `Paused`, `Inactive`) when app is backgrounded.

---

## 8. Future Scalability Considerations

This infrastructure enables immediate scaling for:
- **Authentication**: Can safely inject `AuthRepository` via `get_it` and utilize global exceptions for unauthenticated errors.
- **Firebase Integration**: `InitializationManager` is prepped to await `Firebase.initializeApp()`.
- **Offline-First Systems**: `ConnectivityBloc` provides the real-time boolean required to route database writes to Hive queues vs Firestore.
- **Analytics & Crashlytics**: Can be seamlessly bound to `AppLogger` and `GlobalErrorHandler` for enterprise observability.
- **Future SaaS Scaling**: Provides the isolated dependency injection necessary to swap tenant configurations dynamically at runtime.
