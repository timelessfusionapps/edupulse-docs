# Phase 2D Remediation Plan

## Document Information
| Field | Value |
|----------|----------|
| Target Scope | Phase 2D Events Repositories |
| Document Type | Remediation Plan |
| Target Path | `09_Docs/Phase_2D_Remediation_Plan.md` |

---

## 1. Executive Summary
During the Phase 2D Repository Verification, it was conclusively determined that 6 data layer repositories containing `throw UnimplementedError()` stubs are completely orphaned. They are not referenced by any active BLoC, Screen, or active Domain Service in the application.

## 2. Remediation Strategy: Safe Deprecation & Removal
Because these repositories are completely unreferenced by the functional presentation and business layers, they represent abandoned technical debt rather than active bottlenecks. Attempting to implement Firestore logic for orphaned repositories adds no value and introduces untested code.

The safest, fastest, and most architecturally sound remediation is to **delete the orphaned files**.

## 3. Execution Steps
1. **Delete Repository Implementations:**
   - `lib/features/events/data/repositories_impl/event_type_repository_impl.dart`
   - `lib/features/events/data/repositories_impl/event_category_repository_impl.dart`
   - `lib/features/events/data/repositories_impl/team_repository_impl.dart`
   - `lib/features/events/data/repositories_impl/event_template_repository_impl.dart`
   - `lib/features/events/data/repositories_impl/ranking_template_repository_impl.dart`
   - `lib/features/events/data/repositories_impl/event_ownership_repository_impl.dart`
2. **Delete Orphaned Domain Interfaces:**
   - Remove the corresponding abstract classes in `lib/features/events/domain/repositories/`.
3. **Delete Orphaned Domain Services:**
   - `lib/features/events/domain/services/event_template_service.dart`
   - `lib/features/events/domain/services/ranking_template_service.dart`
   - `lib/features/events/domain/services/event_ownership_service.dart`
4. **Run Analyzer:** Execute `flutter analyze` to ensure no hidden dependencies were broken by the removal.
5. **Run Tests:** Execute `flutter test` to verify module integrity.

## 4. Post-Remediation State
Once completed, Phase 2D will contain 0 instances of `UnimplementedError()` stubs. The module will be cleanly aligned with its actual, active feature set, allowing it to pass the Phase 3A Completeness Gate.
