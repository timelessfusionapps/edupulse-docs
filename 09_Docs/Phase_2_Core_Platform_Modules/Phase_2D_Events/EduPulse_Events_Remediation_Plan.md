# EduPulse Events Remediation Plan

This plan maps every missing item identified in the Phase 2D Execution Audit and outlines the required logic to close the gaps.

## 1. Missing Firebase Datasources (7)

| File Name | File Path | Reason Missing | Required Logic | Dependency Impact |
|---|---|---|---|---|
| `firebase_event_type_datasource.dart` | `data/datasources/firebase/` | Skipped in initial run | CRUD for event types under `schools/{schoolId}/eventTypes` | `EventTypeRepositoryImpl` |
| `firebase_event_category_datasource.dart` | `data/datasources/firebase/` | Skipped in initial run | CRUD for event categories under `schools/{schoolId}/eventCategories` | `EventCategoryRepositoryImpl` |
| `firebase_event_template_datasource.dart` | `data/datasources/firebase/` | Skipped in initial run | CRUD for event templates under `schools/{schoolId}/eventTemplates` | `EventTemplateRepositoryImpl` |
| `firebase_participant_datasource.dart` | `data/datasources/firebase/` | Skipped in initial run | CRUD for participants under `schools/{schoolId}/events/{eventId}/participants` | `EventParticipantRepositoryImpl` |
| `firebase_team_datasource.dart` | `data/datasources/firebase/` | Skipped in initial run | CRUD for teams under `schools/{schoolId}/events/{eventId}/teams` | `TeamRepositoryImpl` |
| `firebase_ownership_datasource.dart` | `data/datasources/firebase/` | Skipped in initial run | CRUD for owners under `schools/{schoolId}/events/{eventId}/owners` | `EventOwnershipRepositoryImpl` |
| `firebase_ranking_template_datasource.dart` | `data/datasources/firebase/` | Skipped in initial run | CRUD for ranking templates under `schools/{schoolId}/rankingTemplates` | `RankingTemplateRepositoryImpl` |

## 2. Missing Repository Implementations (8)

| File Name | File Path | Reason Missing | Required Logic | Dependency Impact |
|---|---|---|---|---|
| `event_type_repository_impl.dart` | `data/repositories_impl/` | Skipped in initial run | Implements `EventTypeRepository` using `FirebaseEventTypeDatasource` | `EventConfigurationBloc` |
| `event_category_repository_impl.dart` | `data/repositories_impl/` | Skipped in initial run | Implements `EventCategoryRepository` using `FirebaseEventCategoryDatasource` | `EventConfigurationBloc` |
| `event_template_repository_impl.dart` | `data/repositories_impl/` | Skipped in initial run | Implements `EventTemplateRepository` using `FirebaseEventTemplateDatasource` | `EventTemplateBloc` |
| `event_result_repository_impl.dart` | `data/repositories_impl/` | Skipped in initial run | Implements `EventResultRepository` using `FirebaseResultDatasource` | `EventResultBloc` |
| `event_participant_repository_impl.dart` | `data/repositories_impl/` | Skipped in initial run | Implements `EventParticipantRepository` using `FirebaseParticipantDatasource` | `EventParticipantBloc` |
| `team_repository_impl.dart` | `data/repositories_impl/` | Skipped in initial run | Implements `TeamRepository` using `FirebaseTeamDatasource` | `TeamBloc` |
| `event_ownership_repository_impl.dart` | `data/repositories_impl/` | Skipped in initial run | Implements `EventOwnershipRepository` using `FirebaseOwnershipDatasource` | `EventOwnershipBloc` |
| `ranking_template_repository_impl.dart` | `data/repositories_impl/` | Skipped in initial run | Implements `RankingTemplateRepository` using `FirebaseRankingTemplateDatasource` | `RankingTemplateBloc` |

## 3. Repair Missing Logic (1)

| File Name | File Path | Reason Missing | Required Logic | Dependency Impact |
|---|---|---|---|---|
| `event_attendance_repository_impl.dart` | `data/repositories_impl/` | Contains stub logic | Implement actual call to `_datasource.updateAttendanceStatus` | `EventAttendanceBloc` |

## 4. Missing Blocs (8)

| File Name | File Path | Reason Missing | Required Logic | Dependency Impact |
|---|---|---|---|---|
| `event_template_bloc.dart` | `presentation/bloc/` | Skipped in initial run | States (Initial, Loading, Loaded, Error), Events (Load, Create, Update), uses `EventTemplateRepository` | `EventTemplateListScreen` |
| `event_attendance_bloc.dart` | `presentation/bloc/` | Skipped in initial run | States & Events for recording attendance | `AttendanceScreen` |
| `event_result_bloc.dart` | `presentation/bloc/` | Skipped in initial run | States & Events for recording and locking results | `ResultsScreen` |
| `event_participant_bloc.dart` | `presentation/bloc/` | Skipped in initial run | States & Events for managing participants | `EventCreationWizardScreen` |
| `event_ownership_bloc.dart` | `presentation/bloc/` | Skipped in initial run | States & Events for managing event owners | `EventCreationWizardScreen` |
| `team_bloc.dart` | `presentation/bloc/` | Skipped in initial run | States & Events for team management | `TeamManagementScreen` |
| `event_configuration_bloc.dart` | `presentation/bloc/` | Skipped in initial run | States & Events for categories and types | `EventConfigurationScreen` |
| `ranking_template_bloc.dart` | `presentation/bloc/` | Skipped in initial run | States & Events for ranking templates | `RankingTemplateManagementScreen` |

## 5. Missing Screens (6)

| File Name | File Path | Reason Missing | Required Logic | Dependency Impact |
|---|---|---|---|---|
| `event_template_list_screen.dart` | `presentation/screens/` | Skipped in initial run | UI structure mapping to `EventTemplateBloc` state | Navigation Router |
| `team_management_screen.dart` | `presentation/screens/` | Skipped in initial run | UI structure mapping to `TeamBloc` state | Navigation Router |
| `attendance_screen.dart` | `presentation/screens/` | Skipped in initial run | UI structure mapping to `EventAttendanceBloc` state | Navigation Router |
| `results_screen.dart` | `presentation/screens/` | Skipped in initial run | UI structure mapping to `EventResultBloc` state | Navigation Router |
| `event_configuration_screen.dart` | `presentation/screens/` | Skipped in initial run | UI structure mapping to `EventConfigurationBloc` state | Navigation Router |
| `ranking_template_management_screen.dart` | `presentation/screens/` | Skipped in initial run | UI structure mapping to `RankingTemplateBloc` state | Navigation Router |

## 6. Missing Tests (17)

| File Name | File Path | Reason Missing | Required Logic | Dependency Impact |
|---|---|---|---|---|
| `capacity_validator_test.dart` | `test/.../validators/` | Skipped in initial run | Test validation rules | CI/CD |
| `registration_validator_test.dart` | `test/.../validators/` | Skipped in initial run | Test validation rules | CI/CD |
| `event_lifecycle_service_test.dart` | `test/.../services/` | Skipped in initial run | Test state transitions | CI/CD |
| `event_ownership_service_test.dart` | `test/.../services/` | Skipped in initial run | Test ownership limits | CI/CD |
| `event_archive_service_test.dart` | `test/.../services/` | Skipped in initial run | Test archive logic | CI/CD |
| `event_outcome_service_test.dart` | `test/.../services/` | Skipped in initial run | Test outcome generation | CI/CD |
| `ranking_template_service_test.dart` | `test/.../services/` | Skipped in initial run | Test template processing | CI/CD |
| `[10 Repo Tests]` | `test/.../repositories_impl/` | Skipped in initial run | Test mapping from entity to model and datasource calls | CI/CD |

---
*End of Remediation Plan*
