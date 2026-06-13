# EduPulse Phase 2 Remaining Blockers Assessment

## 1. Executive Summary
This assessment investigates the lingering build, analyzer, and test failures observed after the completion of the Phase 2 Final Remediation Execution (Workstream 4B). The targeted remediation items were successfully implemented and are free of errors; however, the pipeline remains blocked by out-of-scope legacy code. All blockers have been traced to their root causes and classified to inform the final Phase 3 cleanup strategy.

---

## 2. Blocker Matrix

| Blocker | Root Cause | Classification | Evidence | Recommended Action |
| :--- | :--- | :--- | :--- | :--- |
| `bloc_test` dependency | Package not declared in `pubspec.yaml` | **Missing Dependency** | `Target of URI doesn't exist: 'package:bloc_test/bloc_test.dart'` | Add `bloc_test` to `dev_dependencies` |
| `FakeAuthRepository` | Test double missing new domain methods | **Interface Drift** | Analyzer: Missing concrete implementations of `checkRequiresPasswordChange`, `checkUserExistsInTenant` | Mock missing domain methods |
| `academic_structure_repository_impl.dart` | Incorrect relative paths `../../../` instead of `../../` | **Import Drift** | Analyzer: `TermEntity` isn't a type. (Import fails to resolve) | Correct relative import paths |
| `academic_year_repository_impl.dart` | Incorrect relative paths `../../../` instead of `../../` | **Import Drift** | Analyzer: Target of URI doesn't exist for `academic_year_repository.dart` | Correct relative import paths |
| `runtime_permission_resolver.dart` | Expected `PermissionEntity`, received `String` | **Interface Drift** | Analyzer: The getter `groupName` isn't defined for the type `String`. | Update mapping logic to handle Strings |
| `service_locator.dart` | `FirebaseDatasourceImpl` classes fail to implement base interfaces due to internal broken imports | **Import Drift** | Analyzer: `FirebaseUserDatasourceImpl` can't be returned from a function with return type `UserDatasource` | Fix datasource local imports |
| `firebase_user_datasource_impl.dart` | Uses `import 'user_datasource.dart'` instead of `import '../user_datasource.dart'` | **Import Drift** | Analyzer: Target of URI doesn't exist | Correct relative import path |

---

## 3. Missing Dependency Findings
- **`bloc_test`**: The `auth_bloc_test.dart` file depends on `bloc_test`, but this package is entirely missing from the `pubspec.yaml` manifest.

## 4. Import Drift Findings
- **Structural Shifts:** The `repositories_impl` and `firebase` datasource directories appear to have shifted. Files like `academic_structure_repository_impl.dart`, `academic_year_repository_impl.dart`, and `firebase_user_datasource_impl.dart` are suffering from relative imports that are off by exactly one directory level (e.g., using `../../../` when they should use `../../`). This causes cascading "Type not found" and "Does not implement interface" errors across the codebase.

## 5. Interface Drift Findings
- **Auth Repository:** The `AuthRepository` interface was expanded with new tenant and password validation methods (`checkRequiresPasswordChange`, `checkUserExistsInTenant`). The test double `FakeAuthRepository` was never updated to honor this new contract.
- **Permission Repository:** `resolveEffectivePermissions` was updated to return a flattened `List<String>` of permission strings, but the `RuntimePermissionResolver` still attempts to access `.groupName` and `.actionName` as if it were receiving a `List<PermissionEntity>`.

## 6. Architectural Drift Findings
- No core architectural drift (e.g., bypassing clean architecture layers) was detected among the remaining blockers. The issues are strictly import paths and interface contracts.

## 7. Deprecated Code Findings
- The usage of `GoogleSignIn().signIn()` in `firebase_auth_datasource_impl.dart` is throwing analyzer errors indicating method not found or missing constructors, which may point to deprecated API usage or missing dependency configurations for the `google_sign_in` package.

## 8. False Positive Findings
- No false positives detected. Every reported blocker is a genuine compilation or test failure.

---

## 9. Repository Health Summary
The architecture is solid and the Phase 2 targeted remediation successfully stabilized the core components. However, the repository is fragile due to widespread **Import Drift** caused by folder restructuring, and **Interface Drift** caused by evolving domain contracts that were not synced with their test doubles.

## 10. Risks
- **Pipeline Paralysis:** No code can be merged or certified until these peripheral blockers are cleared, as they prevent `flutter build` and `flutter test` from succeeding.
- **Scope Creep:** Fixing these issues technically crosses into Phase 3 territory or unauthorized files, risking governance violations if executed without approval.

---

## 11. Final Verdict

- **Total Remaining Blockers:** 7
- **Critical Blockers:** 6 (Compilation preventing)
- **Medium Blockers:** 1 (Test preventing)
- **Cosmetic Blockers:** 0

**Recommendation:** **FURTHER ANALYSIS REQUIRED** (The repository requires an explicit authorization mandate to execute a Phase 3 "Cleanup Workstream" to resolve these out-of-scope blockers).
