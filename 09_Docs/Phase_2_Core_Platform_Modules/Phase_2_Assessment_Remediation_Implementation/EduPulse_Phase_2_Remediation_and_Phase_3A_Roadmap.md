# EduPulse Phase 2 Remediation & Phase 3A Roadmap

## Document Information
| Field | Value |
|----------|----------|
| Target Scope | Phase 2 Core Platform Remediation |
| Document Type | Implementation Roadmap |
| Target Path | `09_Docs/EduPulse_Phase_2_Remediation_and_Phase_3A_Roadmap.md` |

---

## 1. Outstanding Findings
- **[CRITICAL]** Incomplete data layer implementations containing `UnimplementedError` in core repositories (Phase 2B, Phase 2D).
- **[HIGH]** Parallel, un-deprecated legacy `app_shell/` directory conflicting with `platform_shell/` governance.
- **[MEDIUM]** Missing governance and certification artifacts for legacy modules (Phase 2A through 2F).

---

## 2. Missing Certification Artifacts
- **[MEDIUM]** `EduPulse_Platform_Shell_Implementation_Report.md` (and 6 associated reports for Phase 2A).
- **[LOW]** Retrospective certification documentation for Phase 2B, 2C, 2D, 2E, 2F.

---

## 3. Missing Implementations
- **[CRITICAL]** `event_type_repository_impl.dart`
- **[CRITICAL]** `event_template_repository_impl.dart`
- **[CRITICAL]** `ranking_template_repository_impl.dart`
- **[CRITICAL]** `event_category_repository_impl.dart`
- **[CRITICAL]** `event_ownership_repository_impl.dart`
- **[CRITICAL]** `team_repository_impl.dart`
- **[HIGH]** `academic_assignment_repository_impl.dart`

---

## 4. Structural Risks
- **[CRITICAL]** **Downstream Data Bottleneck:** Phase 3A Integration relies on populated entities from Phase 2. The stubbed repositories in Phase 2D prevent event categories, teams, and ownership from resolving, which will cause runtime failures in Phase 2I Analytics and Dashboards.

---

## 5. Duplicate System Risks
- **[HIGH]** **Routing Conflict:** Incoming modules attempt to register routes via the shell. The presence of both `app_shell/` and `platform_shell/` fragments the routing ecosystem. Failure to deprecate `app_shell/` will lead to orphaned navigation trees during Phase 3A.

---

## 6. Review Priority Matrix

| Component | Risk Level | Rationale |
|-----------|------------|-----------|
| **Phase 2D Data Layer** | **Critical** | Prevents core event infrastructure from functioning. |
| **Phase 2A Shell Architecture** | **High** | Dictates global navigation for all integrated modules. |
| **Phase 2B Data Layer** | **High** | Needed for fundamental school structure hierarchy. |
| **Phase 2A-2F Certifications** | **Medium** | Procedural debt, but does not block physical code execution. |

---

## 7. Remediation Priority Matrix

| Remediation Task | Effort | Impact | Status |
|------------------|--------|--------|--------|
| Implement `events` repository stubs | High | Critical | Pending |
| Deprecate and remove `app_shell/` | Low | High | Pending |
| Implement `academic_assignment` stubs | Medium | High | Pending |
| Generate formal Certification docs | Medium | Medium | Pending |

---

## 8. Phase 3A Readiness Gates
To officially unlock Phase 3A Integration, the following gates must be passed:
1. **The Cleanup Gate:** `app_shell/` is fully removed, and `platform_shell/` is the sole certified shell.
2. **The Completeness Gate:** 0 instances of `throw UnimplementedError()` exist within `apps/admin_app/lib/features/`.
3. **The Certification Gate:** All Phase 2 modules possess signed closure documents.

---

## 9. Recommended Execution Order
1. **Execute Shell Consolidation:** Safely delete `app_shell/` and verify `platform_shell/` functionality.
2. **Execute Data Layer Remediation:** Wire the 7 stubbed repositories in 2B and 2D to their respective datasources.
3. **Execute Formal Certification:** Generate retrospective completion reports.
4. **Authorize Phase 3A Integration.**
