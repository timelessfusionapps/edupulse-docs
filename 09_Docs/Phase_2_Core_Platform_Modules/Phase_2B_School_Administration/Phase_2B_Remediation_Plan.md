# Phase 2B Remediation Plan

## 1. Objective
To remediate the orphaned and incomplete `AcademicAssignmentRepositoryImpl` identified during the Phase 2B Workstream 2 Verification.

## 2. Target Files
- `lib/features/school_administration/data/repositories_impl/academic_assignment_repository_impl.dart`
- `lib/features/school_administration/domain/repositories/academic_assignment_repository.dart`
- `lib/features/school_administration/domain/services/academic_year_carry_forward_service.dart`
- Related entities and models (e.g., `TeacherAssignmentEntity`, `HouseAssignmentEntity`) if confirmed entirely unused.

## 3. Remediation Actions

### 3.1 Code Removal (Primary Option)
Given that assignment tracking is either deferred to a future phase or absorbed by existing `AcademicYearRepository` logic, the following dead code paths should be removed:
1. **Delete** `academic_assignment_repository_impl.dart`.
2. **Delete** `academic_assignment_repository.dart`.
3. **Refactor** `AcademicYearCarryForwardService` to remove the injected `IAcademicAssignmentRepository` from its constructor.
4. **Audit** `TeacherAssignmentEntity` and `HouseAssignmentEntity` and their respective models. If they are exclusively tied to the removed repository and not used elsewhere (e.g., inside other domains or the carry forward arguments), delete them as well.

### 3.2 Post-Remediation Verification
- Run `flutter analyze` to ensure no orphaned imports remain.
- Run `flutter test` to ensure removal did not break the `AcademicYearCarryForwardService` unit tests (which will need to have their mocks updated to reflect the removed constructor dependency).

## 4. Execution Constraints
- Do not add new features.
- Ensure the removal strictly targets unused components without impacting the active `AcademicYear` or `AcademicStructure` domains.
