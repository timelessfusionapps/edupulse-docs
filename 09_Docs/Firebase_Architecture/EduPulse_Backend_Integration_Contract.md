# EduPulse Backend Integration Contract
Version: 1.0  
Authority Level: Global System Contract  
Applies To: Entire EduPulse Platform  
Status: Mandatory

---

# 1. Purpose

This document defines the mandatory backend integration architecture for EduPulse.

It establishes:

- UI to backend communication rules
- ViewModel boundaries
- Repository contracts
- DTO standards
- Mapper policies
- Firestore access rules
- Cloud Function invocation rules
- Error handling structure
- Stream vs Future decision logic
- Caching standards

This contract is mandatory for:

- all Flutter modules
- all backend integrations
- all Firestore reads/writes
- all Cloud Functions
- all analytics pipelines

No feature may bypass this architecture.

---

# 2. Global Layer Architecture

EduPulse follows strict layered architecture.

Mandatory:

UI Layer  
↓  
ViewModel Layer  
↓  
Repository Layer  
↓  
Service Layer  
↓  
Backend Layer

---

## Layer Responsibilities

---

### UI Layer

Allowed:

- rendering widgets
- handling gestures
- displaying state
- local animations

Forbidden:

- Firestore queries
- business logic
- DTO mapping
- validation logic
- permission logic

Rule:

UI must remain presentation-only.

---

### ViewModel Layer

Allowed:

- state orchestration
- loading state
- error state
- transformation for UI
- pagination state
- filter state

Forbidden:

- direct Firestore calls
- raw JSON parsing
- Cloud Function calls

Rule:

ViewModels coordinate, not fetch.

---

### Repository Layer

Allowed:

- data fetching
- data writing
- DTO transformation
- backend abstraction

Responsibilities:

- hide backend source
- unify Firestore + Functions
- enforce caching strategy

Rule:

Repositories are the only entry point to data.

---

### Service Layer

Allowed:

- raw Firestore access
- Cloud Function access
- API requests
- storage uploads

Forbidden:

- UI logic
- domain transformations

Rule:

Services speak raw backend.

---

# 3. Firestore Access Contract

Mandatory:

All Firestore calls must go through:

Service Layer only.

Forbidden:

UI → Firestore

Forbidden:

ViewModel → Firestore

Forbidden:

Repository → Firestore directly without Service abstraction

Correct:

UI → ViewModel → Repository → Service → Firestore

---

# 4. ViewModel Naming Standard

Mandatory naming:

ScreenNameVM

Examples:

DashboardVM  
SchoolRegistryVM  
AdmissionsQueueVM  
TrialLifecycleVM  
RecoveryCenterVM  
PlatformAdminRegistryVM  
AuditCenterVM  
ComplianceQueueVM  
AnomalyTrackerVM

Forbidden:

Generic names:

DataVM  
MainVM  
TempVM

Rule:

ViewModel names must map 1:1 to screen ownership.

---

# 5. Repository Naming Standard

Mandatory:

FeatureRepository

Examples:

StudentRepository  
FeeRepository  
AttendanceRepository  
AuditRepository  
AdminRepository  
TrialRepository

Rule:

Repository must reflect business domain.

Not screen.

---

# 6. DTO Contract

DTO = backend transport object

Rule:

Firestore documents must never directly enter UI.

Mandatory:

Firestore Doc
→ DTO
→ Domain Model
→ ViewModel

---

## DTO Naming Standard

Examples:

StudentDto  
FeePaymentDto  
AdminRoleDto  
AuditEventDto  
TrialLifecycleDto

---

## DTO Rules

Must contain:

fromMap()  
toMap()

Must not contain:

UI formatting  
widget references  
colors  
display text

DTOs are transport only.

---

# 7. Domain Model Rules

Domain models represent business entities.

Examples:

Student  
Teacher  
Invoice  
Admin  
AuditEvent

Rule:

Domain models are backend-agnostic.

No Firestore fields directly exposed.

---

# 8. Mapper Contract

Mandatory.

DTO → Domain

Domain → DTO

Never skip mapping.

Required:

StudentMapper  
AuditMapper  
FeeMapper

Forbidden:

Inline mapping inside widgets.

Forbidden:

Inline mapping inside repositories.

Reason:

reduces architecture leaks.

---

# 9. Stream vs Future Policy

Critical for Firestore cost.

---

## Use Future When:

- dashboard load
- reports
- tables
- history
- audit pages
- fees
- exam records
- admin registries

Default:

Future

---

## Use Stream Only When:

- chat
- notifications
- live classroom presence
- active session monitoring
- approval waiting states

Rule:

Streams must be justified.

Default deny.

---

# 10. Cloud Function Contract

Mandatory for:

- fee payment processing
- audit archival
- role assignment escalation
- platform suspension
- recovery execution
- notification broadcasting
- financial summaries
- anomaly detection

Forbidden:

client-side sensitive logic

Rule:

Security-critical logic belongs server-side.

---

# 11. Error Handling Contract

All repository responses must use Result Wrapper.

Mandatory structure:

Success<T>

Failure<T>

Example:

Result<Student>

---

## Failure Types

Required:

ValidationFailure  
NetworkFailure  
PermissionFailure  
ServerFailure  
CacheFailure  
UnknownFailure

Rule:

No raw exceptions reaching UI.

---

# 12. Loading State Contract

Every ViewModel must expose:

isLoading

Optional:

isRefreshing  
isPaginating  
hasMore

Forbidden:

loading logic inside widgets

---

# 13. Pagination Contract

Mandatory for all large collections.

Required:

cursor-based

Use:

startAfterDocument

Never:

offset simulation

---

# 14. Caching Contract

Use Hive for:

- user profile
- school config
- permissions
- dashboard summaries
- static metadata

Use Firestore cache for:

- paginated collections
- lightweight recent data

Rule:

cache first where possible.

---

# 15. Security Boundary Contract

Never expose:

internal IDs  
system hashes  
role matrices  
financial internals  
risk algorithms  
forensic signatures

Always sanitize.

Use:

PublicDTO

Example:

AdminPublicDto

---

# 16. State Mutation Contract

Every mutation must follow:

Validate  
Authorize  
Execute  
Audit  
Update Cache  
Refresh State

Order cannot change.

---

# 17. Backend Integration Examples

---

## Correct Flow

Student Admission:

UI
→ AdmissionsVM
→ StudentRepository
→ StudentService
→ Firestore

---

Fee Payment:

UI
→ FeesVM
→ FeeRepository
→ PaymentService
→ Cloud Function
→ Firestore

---

Audit Escalation:

UI
→ AuditCenterVM
→ AuditRepository
→ AuditFunctionService
→ Cloud Function
→ Firestore

---

# 18. Forbidden Patterns

Forbidden:

Widget directly calls repository

Forbidden:

Widget directly calls Firestore

Forbidden:

ViewModel contains Firestore query

Forbidden:

Repository returns raw map

Forbidden:

Service returns UI models

Forbidden:

Inline DTO parsing in UI

Forbidden:

Business logic in widgets

Forbidden:

Cloud Function logic in client

---

# 19. Testing Contract

Mandatory:

Repositories must be testable.

Services must be mockable.

ViewModels must be isolated.

Required:

mock repositories

Forbidden:

testing against live Firestore by default

---

# 20. Verification Checklist

Before backend integration:

[ ] UI has no backend calls  
[ ] ViewModel only orchestrates  
[ ] Repository abstracts backend  
[ ] Service owns Firestore access  
[ ] DTOs exist  
[ ] Mappers exist  
[ ] Domain models exist  
[ ] Error wrappers exist  
[ ] Pagination exists  
[ ] Cache strategy exists  
[ ] Stream justification documented  
[ ] Cloud Functions isolated  
[ ] Sensitive logic server-side  
[ ] Audit logging integrated  

If any item fails:

Implementation blocked.

---

# 21. Enforcement Rule

This contract overrides:

- local shortcuts
- feature-level convenience
- temporary architecture hacks

Violations require architecture review.

This document is the backend communication authority for EduPulse.