# EduPulse Phase 2 Final Remediation Register

## Overview
This register tracks all unresolved architectural, functional, and compilation issues blocking the final certification of Phase 2.

## Category A: Compilation Failures (Missing Entities)

| ID | Issue | Location | Recommended Fix | Severity |
| :--- | :--- | :--- | :--- | :--- |
| **A-1** | Missing `user_entity.dart` | `lib/features/user_management/domain/repositories/` | Restore or recreate the `UserEntity` definition. Ensure the path matches the imports within `user_repository.dart`. | Critical |
| **A-2** | Missing `user_lifecycle_state.dart` | `lib/features/user_management/domain/repositories/` | Restore or recreate the `UserLifecycleState` enum/class definition. | Critical |
| **A-3** | Missing `academic_year_status.dart` | `lib/features/school_administration/domain/entities/` | Restore the `AcademicYearStatus` definition to unblock the `academic_year_validator_test.dart` compilation. | Critical |

## Category B: Unimplemented Repositories (Phase 2D & 2G)

| ID | Issue | Location | Recommended Fix | Severity |
| :--- | :--- | :--- | :--- | :--- |
| **B-1** | `throw UnimplementedError()` in Team retrieval | `lib/features/events/data/repositories_impl/team_repository_impl.dart:20` | Provide a valid Firebase fetch implementation returning `TeamEntity`. | Critical |
| **B-2** | `throw UnimplementedError()` in Template retrieval | `lib/features/events/data/repositories_impl/event_template_repository_impl.dart:20` | Provide a valid Firebase fetch implementation returning `EventTemplateEntity`. | Critical |
| **B-3** | `throw UnimplementedError()` in Event Ownership | `lib/features/events/data/repositories_impl/event_ownership_repository_impl.dart:15` | Provide a valid Firebase fetch implementation returning `EventOwnershipEntity`. | Critical |

## Category C: Broken Test Contracts

| ID | Issue | Location | Recommended Fix | Severity |
| :--- | :--- | :--- | :--- | :--- |
| **C-1** | Invalid Override: `FakeAuthRepository.authStateChanges` | `test/core/router/app_router_test.dart:15` | Update the generic return type from `Stream<UserSession?>` to match `AuthRepository`'s expected `Stream<AuthUserEntity?>`. | Medium |
| **C-2** | Invalid Override: `FakeAuthRepository.signInWithEmailAndPassword` | `test/core/router/app_router_test.dart:19` | Update the return type from `UserSession` to match `AuthRepository`'s expected `AuthUserEntity`. | Medium |
| **C-3** | Undefined Method: `MockUserRepository.updateUserRole` | `test/features/security/security_validation_test.dart` | The mocked repository is missing the `updateUserRole` method. Implement the mock method. | Medium |

## Category D: Placeholder UI & Stubs

| ID | Issue | Location | Recommended Fix | Severity |
| :--- | :--- | :--- | :--- | :--- |
| **D-1** | Placeholder Text UI | `lib/features/school_administration/presentation/screens/academic_year_list_screen.dart` | Replace placeholder text with proper `BlocBuilder` and `ListView` implementation. | Medium |
| **D-2** | Placeholder Text UI | `lib/features/students/presentation/widgets/adaptive/adaptive_filters.dart` | Replace Dropdown text placeholders with functional Dropdown widgets handling domain data. | Medium |
| **D-3** | Placeholder Data Insertion | `lib/features/events/data/repositories_impl/event_attendance_repository_impl.dart:28` | Replace `'placeholder_event_id'` with the actual event ID propagated through the domain layer. | Medium |

## Next Steps
Authorization is required to execute this Remediation Register. Once authorized, we will process Category A and B items as priority zero to restore build pipeline health.
