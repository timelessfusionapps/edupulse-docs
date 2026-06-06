# Student Management Foundation Implementation
## EduPulse First Business Module Architecture Prompt

---

# OBJECTIVE

Implement the complete Student Management Foundation for EduPulse.

This becomes:
# the first true operational business module

built on top of:
- Firebase Backend Foundation
- Repository Architecture
- Firestore Security
- Cloud Functions Foundation

This phase establishes:
- student identity architecture
- student repository systems
- student Firestore integration
- student search architecture
- student filtering systems
- student profile foundation
- grade/section architecture
- realtime student systems
- offline-safe student workflows
- integration with the finalized UI system

This phase is:
STRICTLY Student Management Foundation.

Do NOT implement:
- rewards systems
- competitions
- analytics dashboards
- activities engine
- badges
- notifications

---

# BEFORE IMPLEMENTATION

Before writing ANY code:

1. Read Blueprint V29 — Student Management & Identity Architecture
2. Read Engineering Checklist V2
3. Read Antigravity_Master_Prompt_System_V2.md
4. Analyze current Firebase Backend Foundation
5. Analyze current Repository Architecture
6. Analyze current Firestore Security implementation
7. Analyze current Cloud Functions Foundation
8. Analyze current App Shell architecture
9. Analyze current Design System architecture
10. Analyze finalized Student UI architecture

Then:

1. Create COMPLETE implementation plan
2. Create detailed implementation checklist
3. Create proposed Student module architecture
4. Create Firestore collection strategy
5. Create student search strategy
6. Create pagination strategy
7. Create realtime updates strategy
8. Create archive strategy
9. Create offline-first workflow strategy
10. Create role-aware permissions strategy
11. Identify all dependency impacts
12. Ask for approval BEFORE coding

IMPORTANT:
Do NOT implement anything yet.

Wait for approval before coding.

---

# IMPLEMENTATION REQUIREMENTS

The Student Management Foundation MUST support:

✅ multi-tenant architecture  
✅ offline-first workflows  
✅ realtime updates  
✅ scalable pagination  
✅ responsive layouts  
✅ role-aware permissions  
✅ soft-delete architecture  
✅ archive workflows  
✅ realtime search  
✅ repository architecture  
✅ datasource separation  
✅ strict RBAC compatibility  
✅ emulator-safe testing  

---

# CRITICAL ARCHITECTURE REFINEMENTS (LOCKED)

The Student Management UI architecture is now FINAL and LOCKED.
This implementation phase must integrate backend architecture INTO the finalized UI system.

DO NOT:
- redesign layouts
- redesign responsive behavior
- redesign mobile UX
- redesign tablet UX
- replace adaptive widgets
- modify responsive orchestration

## Stream Partial Update Strategy
Realtime streams must support:
- partial row updates
- efficient reconciliation
- pagination-safe merging
- reconnect-safe streams
Avoid full-table rebuilds.

## Query Parameter Abstractions
Implement:
- `StudentQueryParams`
- `StudentFilterParams`
- `StudentPaginationParams`
Prevent query duplication.

## Standardize Cursor Pagination
Use cursor arrays, NOT DocumentSnapshot exposure.
Standard cursor: `[lastUpdatedAt, documentId]`

## Search Debounce
Implement 250ms–350ms debounce handling.

## Stream + Pagination Safety
Prevent:
- duplicate rows
- ordering corruption
- pagination instability
during realtime updates.

## Archive Workflow Standardization
Archived students must:
- instantly disappear from active lists
- remain accessible in archive filters
- preserve pagination stability

## Bloc Event Safety
StudentBloc must support:
- cancellable searches
- cancellable streams
- stale request prevention
- pagination request locking

## Expand UI State Architecture
Support:
- initial loading
- partial loading
- pagination loading
- stream refresh loading
- offline cached state
- sync pending state
- recoverable errors

## Performance Safety
Support:
- rebuild isolation
- lazy rendering
- stream-safe rendering
- hover-safe rendering
Avoid full widget rebuilds.

## Preserve Responsive Architecture
Backend integration MUST preserve:
- mobile card architecture
- tablet condensed layouts
- adaptive widgets
- overflow-safe behavior

## Expand Offline-First Strategy
Support:
- cached pagination
- reconnect-safe streams
- stale cache handling
- optimistic updates
- pending writes

---

# STRICT IMPLEMENTATION PHASES

Proceed with implementation in STRICT PHASES.
DO NOT implement everything simultaneously.

## Phase 1: Student Data Models + Query Params
Implement `StudentEntity`, `StudentModel`, `StudentQueryParams`, `StudentFilterParams`, and `StudentPaginationParams`.
Models must be freezed, json_serializable, immutable, Equatable, and Firebase-agnostic domain entities.
Required fields: studentId, schoolId, admissionNumber, fullName, grade, section, houseId, status, createdAt, updatedAt, isArchived.

## Phase 2: Datasource Layer
Implement `StudentDatasource` and `StudentDatasourceImpl`.
All student queries MUST filter by schoolId and respect tenant isolation.
Do not expose DocumentSnapshot beyond this layer.

## Phase 3: Repository Layer
Implement `StudentRepository` and `StudentRepositoryImpl`.
Support pagination, filtering, search, archive workflows, and offline-safe caching.

## Phase 4: Bloc Layer
Implement `StudentBloc`, `StudentEvent`, and `StudentState`.
Must support realtime-safe, stream-safe, cancellation-safe, and pagination-safe states.
Incorporate extended UI states (partial loading, stream refresh loading, etc.) and debounce logic.

## Phase 5: Firestore Integration
Wire the datasource layer to Firestore collections: `schools/{schoolId}/students/{studentId}`.
Ensure indexes, pagination cursors, and archive-safe queries are functional.

## Phase 6: Realtime Streams
Implement partial row updates, efficient reconciliation, and pagination-safe merging.
Ensure reconnect-safe streams.

## Phase 7: Pagination + Search
Implement cursor arrays (`[lastUpdatedAt, documentId]`) for pagination.
Implement 250ms-350ms debounce for search.
Ensure pagination stability during realtime updates (no duplicate rows, no ordering corruption).

## Phase 8: Offline-First Workflows
Implement cached pagination, reconnect-safe streams, stale cache handling, optimistic updates, and pending writes.

## Phase 9: RBAC Integration
Ensure student workflows respect teacher, principal, and school_admin permissions.
Prevent unauthorized edits, cross-tenant access, and hard deletes.

## Phase 10: Student UI Integration Layer
*Note: The responsive UI Foundation already exists.*
Integrate the Bloc layer into the existing `StudentListScreen` and related views.
Use `BlocSelector` where appropriate to prevent full-table rebuilds.
Preserve the existing UI logic, mobile cards, adaptive widgets, and skeletons.

## Phase 11: Testing + Validation
Mandatory validation at exact widths:
- 1440px, 1280px, 1024px, 900px, 768px, 600px, 430px, 390px.
ZERO overflow tolerance.
Perform flutter analyze, flutter test, repository tests, stream tests, offline validation, and RBAC validation.

---

# FINAL DELIVERABLES

After implementation generate:

1. Walkthrough Documentation
2. Validation Documentation
3. Backend Integration Summary
4. Realtime Architecture Summary
5. Offline Workflow Summary
6. Pagination Architecture Summary
7. RBAC Integration Summary
8. Final Student Module Architecture Summary

Save ALL docs inside:
`09_Docs/Student_Management/`

Proceed carefully and phase-by-phase.