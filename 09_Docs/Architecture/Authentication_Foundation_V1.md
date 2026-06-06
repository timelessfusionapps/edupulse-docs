# EduPulse Authentication Foundation

## 1. Architecture Philosophy & Strategy
The EduPulse authentication foundation is designed with a **scalable, decoupled, and state-driven** philosophy. We treat the authentication state as the single source of truth for application accessibility. By abstracting the authentication provider (Firebase) behind domain-level repositories and interfaces, the presentation layer remains completely agnostic of the underlying backend technology.

### Why Authentication After Infrastructure?
Implementing authentication *after* core infrastructure was a deliberate architectural decision. Authentication requires robust error handling, logging, environment configuration, and dependency injection to function reliably. By establishing the infrastructure first, the `AuthBloc` and authentication repositories can seamlessly leverage the global `AppLogger` for debugging, `GlobalErrorHandler` for standardized exceptions, and `GetIt` for resolving dependencies across the application.

---

## 2. Firebase Integration Architecture
Firebase serves as the backbone of the identity provider system, with integration meticulously structured to respect the application's lifecycle.

- **Initialization Sequencing:** Firebase is initialized early in the application bootstrap process inside `InitializationManager.initializeApp`. Crucially, this happens *before* the Dependency Injection (`setupServiceLocator`) phase, because the DI container needs to register the initialized `FirebaseAuth.instance`.
- **Environment Integration:** We utilize `Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform)` to dynamically apply the correct Firebase configuration based on the environment and platform, allowing a seamless build across iOS, Android, and Web.

---

## 3. Repository & Data Abstraction Strategy
The architecture heavily relies on abstraction to isolate third-party dependencies.

- **Datasource Abstraction:** The `AuthRemoteDataSource` interface establishes the contract for authentication operations, keeping the implementation details hidden.
- **Firebase Auth Integration:** The concrete implementation, `FirebaseAuthDataSourceImpl`, handles communication with the Firebase SDK. It is responsible for mapping raw Firebase `User` objects into our domain-specific `UserSession` entities, and catching/translating `FirebaseAuthException` errors into our custom `ServerException` types.
- **Repository Architecture:** The `AuthRepositoryImpl` acts as an orchestrator between the datasource and the domain. It exposes streams and futures to the `AuthBloc`, ensuring a clear separation of concerns.

---

## 4. Domain & State Management
### UserSession Model Responsibilities
The `UserSession` entity is the core representation of an authenticated user. Its responsibilities extend beyond basic identity (`uid`, `email`): it acts as the data carrier for SaaS routing, proactively defining fields for `schoolId` and `role`. While initially null, these fields prepare the entire application to become context-aware of the user's tenant and permissions in future iterations.

### AuthBloc Architecture
The `AuthBloc` orchestrates global authentication state.
- **Responsibilities:** It listens to the `AuthRepository` streams, manages login/logout requests, and emits states that drive the router and UI.
- **Events:** `AuthUserChanged` (triggered by stream), `LoginRequested`, `LogoutRequested`.
- **States:** `AuthInitial`, `AuthLoading`, `Authenticated`, `Unauthenticated`, `AuthError`.
- **Transitions:** Upon instantiation, `AuthBloc` subscribes to the `authStateChanges` stream. It emits `AuthLoading` during explicit requests, transitioning to `Authenticated` on success or `AuthError` on failure.

---

## 5. Session Restoration Flow
Session persistence leverages Firebase Auth's built-in token management combined with reactive streams.
1. **App Startup:** The application launches and Firebase initializes.
2. **Stream Subscription:** `AuthBloc` initializes and immediately subscribes to `AuthRepository.authStateChanges`.
3. **Token Evaluation:** The Firebase SDK evaluates local storage/keychain for valid tokens.
4. **State Emission:** The stream emits a valid `UserSession` or `null`. `AuthBloc` intercepts this, logs the status, and updates the global state to `Authenticated` or `Unauthenticated` without requiring user intervention.

---

## 6. Routing & Navigation Architecture
Authentication directly drives the navigation architecture, ensuring complete security across all modules.

- **Authentication-Aware Navigation:** The `go_router` configuration uses a `GoRouterRefreshStream` tied directly to the `AuthBloc`'s state stream. Whenever the auth state changes (e.g., token expiration, manual logout), the router automatically re-evaluates the current route.
- **Auth Guard Strategy:** A global `redirect` handler acts as the security guard.
    - If the state is `Unauthenticated`, `AuthInitial`, or `AuthLoading`, the user is forcefully redirected to the `/login` route.
    - If the state is `Authenticated` and the user attempts to access `/login` or the root `/`, they are routed to the `/dashboard`.

---

## 7. Tenant & Role-Aware SaaS Preparation
To support a multi-tenant SaaS architecture (multiple schools, multiple roles like Parent/Teacher/Admin), the foundation has been pre-configured:
- **School Isolation:** The `UserSession` model prepares for a `schoolId` mapping. Future Firestore integrations will inject this ID during the mapping phase of `FirebaseAuthDataSourceImpl`, ensuring that all subsequent data queries are strictly scoped to the tenant.
- **Role-Aware Permissions:** The inclusion of the `role` property in the session allows the router to expand its auth guard logic. Future routes can implement permission-based redirects (e.g., blocking a 'student' role from accessing an 'admin' route).

---

## 8. UI Architecture
- **Login Screen Structure:** The `LoginScreen` uses a `BlocConsumer` to reactively update the UI based on `AuthBloc` states. It utilizes a width-constrained container (400px maximum) to maintain aesthetic consistency across mobile, tablet, and desktop views.
- **Loading & Error Handling:** The UI disables inputs and buttons while state is `AuthLoading`, displaying an inline `CircularProgressIndicator`. Errors emitted as `AuthError` are caught by the `listener` and elegantly displayed via a `SnackBar`.

---

## 9. Folder Structure
The implementation follows a clean, feature-first architecture under `lib/features/auth/`:
```text
lib/features/auth/
 ├── bloc/                 # State management (events, states, bloc)
 ├── data/
 │   ├── datasources/      # Remote data interaction (Firebase implementation & interface)
 │   └── repositories/     # Concrete repository implementations
 ├── domain/
 │   ├── entities/         # Core business models (UserSession)
 │   └── repositories/     # Abstract repository contracts
 └── presentation/         # UI layer (Screens, widgets)
```

---

## 10. Files Overview
### Files Created
- `domain/entities/user_session.dart`: Defines the core user model.
- `domain/repositories/auth_repository.dart`: Contract for auth data operations.
- `data/datasources/auth_remote_datasource.dart`: Contract for remote provider interactions.
- `data/datasources/firebase_auth_datasource_impl.dart`: Concrete Firebase Auth implementation mapping Firebase User to `UserSession`.
- `data/repositories/auth_repository_impl.dart`: Connects the datasource to the domain layer.
- `bloc/auth_bloc.dart` (along with `_event.dart` and `_state.dart`): Manages authentication lifecycle states.
- `presentation/login_screen.dart`: The UI for user authentication.

### Files Modified
- `lib/bootstrap/initialization_manager.dart`: Initialized `Firebase.initializeApp` and registered Auth services in the DI container.
- `lib/core/di/service_locator.dart`: Added lazy singletons for `FirebaseAuth`, `AuthRemoteDataSource`, `AuthRepository`, and `AuthBloc`.
- `lib/core/router/app_router.dart`: Implemented global redirection logic and the `GoRouterRefreshStream`.

---

## 11. Validation & Testing
The authentication flow has been verified through execution constraints:
- **Session Restoration:** Logs confirm automatic state resolution (`💡 Auth Status: Authenticated as ...`) across hot restarts and app lifecycles.
- **Route Protection:** Manual navigation attempts to protected routes (`/dashboard`) while unauthenticated are successfully blocked and redirected to `/login`.
- **Error Handling:** Invalid credentials properly trigger the `ServerException` mapping, displaying the underlying Firebase error to the user via the `AuthError` state.

---

## 12. Future Scalability Considerations
This architecture guarantees that EduPulse is prepared for scale:
- **Firestore Integration:** The datasource mapping function `_mapFirebaseUser` acts as a future injection point to query a `users` collection in Firestore, enriching the session with metadata without altering the Bloc or UI.
- **Multi-School Scaling:** Tenant isolation is achievable seamlessly by appending the `schoolId` to all downstream repository requests.
- **Enterprise Features:** The foundation supports SSO integration or external providers, as new datasources can simply implement the `AuthRemoteDataSource` contract without rewriting the core `AuthBloc` logic.
