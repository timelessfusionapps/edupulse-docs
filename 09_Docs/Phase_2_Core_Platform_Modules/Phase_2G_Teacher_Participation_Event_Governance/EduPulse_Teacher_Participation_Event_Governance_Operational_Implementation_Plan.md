# EduPulse Teacher Participation & Event Governance Operational Implementation Plan

## Document Information

**Phase:** 2G  
**Module:** Teacher Participation & Event Governance  
**Status:** Operational Planning Refined  
**Version:** 1.1

---

## 1. Executive Summary

This Operational Implementation Plan translates the Phase 2G Architecture and Governance rules into actionable execution strategies. This plan ensures that the Teacher Participation and Event Governance module is implemented securely, maintainably, and compatibly with existing core modules. It includes critical refinements for lifecycle protection, snapshotting, and strict delegation limits.

---

## 2. Implementation Boundaries

**CRITICAL DIRECTIVE:** 
Future implementation MUST occur ONLY within the approved monorepo paths:

- **Production Code:** `/Users/murtazasulaihi/Developer/EduPulse/apps/admin_app/lib/features/teacher_governance/`
- **Test Code:** `/Users/murtazasulaihi/Developer/EduPulse/apps/admin_app/test/features/teacher_governance/`

*The previous Phase 2F mistake where code was generated inside `apps/admin_app/apps/admin_app/` MUST NEVER be repeated.* Code placed outside the approved paths will result in immediate certification failure.

---

## 3. Data & Storage Strategy

### 3.1 Firestore Structure
All operations must respect the tenant boundary. Collections will exist as subcollections under the school document:
```text
schools/{schoolId}/
├── teacher_groups/{groupId}
├── event_governance/{assignmentId}
├── event_team_templates/{templateId}
└── governance_audits/{auditId}
```
*Note: Event Manager allocations map tightly to `eventId`, likely stored within the `event_governance` collection or directly on the event document as a referenced field.*

### 3.2 Datasource Strategy
Implement distinct Firebase datasources strictly bounded to `schools/{schoolId}`:
- `firebase_teacher_group_datasource.dart`
- `firebase_event_governance_datasource.dart`
- `firebase_event_manager_datasource.dart`
- `firebase_event_template_datasource.dart`
- `firebase_governance_audit_datasource.dart`

### 3.3 Repository Strategy
Abstract datasources behind strongly typed repositories implementing explicit contracts. No empty methods are permitted.
- `teacher_group_repository_impl.dart`
- `event_governance_repository_impl.dart`
- `event_manager_repository_impl.dart`
- `event_team_template_repository_impl.dart`
- `governance_audit_repository_impl.dart`

---

## 4. Lifecycle & Workflows

### 4.1 Teacher Group Lifecycle
- **Creation:** Tied specifically to an `academicYearId`. Supports multiple concurrent memberships for a single teacher.
- **Modification:** Teachers can be dynamically added or removed.
- **Deletion:** Groups use **Soft Delete + Archive**. Hard deletions are strictly prohibited.
- **Year-End Closure:** Active groups transition automatically to Archived status during Academic Year Closure, preserving historical visibility permanently.

### 4.2 Event Manager Lifecycle & Assignment Flow
- **Creation:** Every event MUST be initialized with exactly one Event Manager.
- **Rights:** The Event Manager automatically and implicitly receives all event-level rights upon assignment.
- **Accountability:** The Event Manager remains fully accountable for all event operations.

### 4.3 Event Manager Replacement Strategy
A dedicated workflow must be implemented for replacing an existing Event Manager.
**Flow:**
`Current Manager` → `Replacement Initiated` → `Previous Assignment Archived` → `New Assignment Activated` → `Audit Record Generated`
**Requirements:**
- Historical accountability must be preserved. The historical Event Manager must remain visible forever in audit logs and past records.
- The audit trail must remain immutable.
- Existing delegations granted by the previous manager must be reviewed and explicitly handled (either transferred, revoked, or manually reassigned).
- No history may be lost during the replacement.

### 4.4 Acting Event Manager Strategy
A dedicated workflow for temporary delegation of primary responsibilities.
**Requirements:**
- Temporary assignment only.
- Must include a `Start Date` and `End Date`.
- Automatic expiry at the `End Date`.
- Automatic restoration of original manager authority upon expiry.
- **Clarification:** The Acting Event Manager is NOT a permanent role. Accountability permanently remains with the Primary Event Manager.
- Audit records are required for both the assignment and the expiry/restoration of the role.

### 4.5 Event Lifecycle Protection Strategy
Events strictly follow an immutable state machine to prevent data loss.
**Lifecycle Flow:**
`Draft` → `Active` → `Closed` → `Archived`
**Requirements:**
- Hard deletion is strictly prohibited.
- The system must explicitly preserve:
  - Governance Assignments
  - Event Teams
  - Attendance References
  - Notification References
  - Point References
  - Governance Audits
- Historical events must remain accessible in a read-only state.

### 4.6 Teacher Group Snapshot Strategy
To prevent dynamic group modifications from corrupting historical context, the following snapshot strategy must be implemented.
**Workflow:**
`Teacher Group` → `Assigned To Event` → `Member Snapshot Created` → `Stored With Event`
**Requirements:**
- Future membership changes to the original Teacher Group must never alter:
  - Historical Event Teams
  - Historical Governance Records
  - Historical Assignments
- This point-in-time snapshot becomes the permanent historical record for that specific event.

### 4.7 Delegation Governance Protection
Strict rules govern how event rights are distributed by the Event Manager.
**Rules:**
- Only the Event Manager may delegate rights.
**Delegated users:**
- Cannot re-delegate their rights.
- Cannot transfer their authority.
- Cannot create sub-delegations.
- Cannot grant permissions to other teachers.
**Conclusion:** Delegation remains single-level only. This rule is mandatory.

### 4.8 Governance Audit Workflow
- **Trigger:** Any governance action (creation, modification, delegation, point awards, closure) immediately triggers an audit log.
- **Immutability:** Audit records are written once. Modification and deletion are strictly prohibited at the datasource and security rules levels.
- **Visibility:** Records are permanently retained for historical compliance reporting.

### 4.9 Approval Workflow
- Multi-level approval workflows (e.g., Teacher → Coordinator → Admin) for actions like Point Deductions or Event Closure remain configurable by the School.

### 4.10 Event Closure & Archival Workflow
- When an event transitions to Closed:
  - All Event Rights immediately expire.
  - Delegations are archived.
  - The Event Team composition is frozen to ensure historical Event Teams remain permanently visible.

---

## 5. Security & Validation Strategy

### 5.1 Validation Strategy
Robust validators must enforce governance rules before hitting repositories:
- `teacher_group_validator.dart`
- `event_assignment_validator.dart`
- `event_rights_validator.dart`
- `event_template_validator.dart`
- `governance_audit_validator.dart`

### 5.2 Security Strategy & Phase 2E Preservation
- **Contextual Isolation:** Phase 2G event-specific point permissions apply ONLY within event boundaries. They do not leak into global permissions.
- **Phase 2E Supremacy:** Phase 2G may NOT override Phase 2E permissions. Global Point permissions remain governed exclusively by Phase 2E. All governance logic must defer to Phase 2E as the authoritative source for point categories and recognition rules.

---

## 6. Testing Strategy

Comprehensive testing must utilize `fake_cloud_firestore`. Stub tests, placeholders, or tautological assertions (`expect(true, true)`) are grounds for immediate rejection.
- Enforce 100% test coverage across Validators, Services, Repositories, and Datasources.
- Ensure zero errors from `flutter analyze` against the `features/teacher_governance` path.

---

## 7. Mandatory Operational Refinements Verification

The implementation must explicitly satisfy the following refinements:

1. **Exactly one Event Manager per Event:** Enforced at event creation and modification.
2. **Event Manager automatically receives all event rights:** System implicit grant based on `EventManager` status.
3. **Event Manager may delegate rights:** Managed via `DelegationService`.
4. **Delegation never transfers accountability:** Event Manager retains ultimate responsibility.
5. **Delegation creates audit records:** Enforced within the service layer transaction.
6. **Rights automatically expire when Event closes:** Handled during Event Closure Workflow.
7. **Teacher Groups are Academic-Year based:** `academicYearId` is a required field.
8. **Teacher Groups support multiple memberships:** Data model supports array inclusions.
9. **Teacher Groups use Soft Delete + Archive:** `status` flags manage state; records are never deleted.
10. **Template changes never affect existing Events:** Templates are copied/instantiated upon event creation.
11. **Governance Audit Records are immutable:** Enforced by service logic and database rules.
12. **Governance Audit Records are never deleted:** No delete methods exposed in repositories.
13. **Historical Event Teams remain permanently visible:** Referencing archived data and snapshot records.
14. **Historical Teacher Groups remain permanently visible:** Archival status removes them from active lists but retains them for reporting.
15. **Historical Delegations remain permanently visible:** Archived along with the event.
16. **Phase 2G may not override Phase 2E permissions:** Strict domain boundary enforced in points services.
17. **Global Point permissions remain governed by Phase 2E:** Validated globally.
18. **Event-specific Point permissions apply only within Event boundaries:** Validated via `eventId` match.
19. **All governance actions generate audit records:** Mandatory interceptor/service flow.
20. **Multi-level approval workflows remain configurable by School:** Utilizes existing workflow configurations.
21. **Event Manager Replacement Workflow defined:** Yes, preserves historical accountability and audits.
22. **Acting Event Manager Strategy defined:** Yes, temporary assignment with auto-expiry.
23. **Event Lifecycle Protection Strategy defined:** Yes, prohibits hard deletion and preserves linked history.
24. **Teacher Group Snapshot Strategy defined:** Yes, freezes event team context.
25. **Delegation Loop Prevention defined:** Yes, restricts delegation to a single level.

---

This plan represents the executable blueprint for Phase 2G. Adherence to these operational directives will ensure a successful execution audit and final certification.
