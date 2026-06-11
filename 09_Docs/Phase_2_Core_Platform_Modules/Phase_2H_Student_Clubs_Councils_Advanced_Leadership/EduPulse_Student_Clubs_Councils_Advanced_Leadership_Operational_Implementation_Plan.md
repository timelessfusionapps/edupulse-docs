# Phase 2H: Student Clubs, Councils & Advanced Leadership
# OPERATIONAL IMPLEMENTATION PLAN

## MANDATORY IMPLEMENTATION BOUNDARIES

> [!WARNING]
> **ALL implementation shall be created ONLY within:**
> - `apps/admin_app/lib/features/student_leadership/`
> - `apps/admin_app/test/features/student_leadership/`

**STRICT PROHIBITION:**
No files may be generated outside of the above directories.
Creation of `apps/admin_app/apps/admin_app/` or any nested duplicate structures is EXPLICITLY PROHIBITED to ensure the Phase 2F path duplication incident never recurs.

---

## 1. Physical Folder Structure

The target directory `apps/admin_app/lib/features/student_leadership/` must strictly adhere to the following architecture:
- `domain/`
  - `entities/`
  - `repositories/`
  - `services/`
  - `validators/`
- `data/`
  - `datasources/`
  - `models/`
  - `repositories/`
- `presentation/`
  - `blocs/`
  - `screens/`
  - `widgets/`
- `apps/admin_app/test/features/student_leadership/`

---

## 2. Entity Implementation Plan

**Inventory of Domain Entities to Implement:**
1. `ClubEntity`
2. `ClubMembershipEntity`
3. `ClubMembershipHistoryEntity` (Immutable strategy for preserving Join, Leave, Rejoin history)
4. `ClubCoordinatorEntity`
5. `StudentCouncilEntity`
6. `CouncilMembershipEntity`
7. `CouncilMembershipHistoryEntity` (Immutable preservation of Assignment, Removal, Academic-Year history)
8. `LeadershipAssignmentEntity` (Head Boy, Head Girl, Sports Captain)
9. `HousePrefectEntity`

---

## 3. Repository Contract Plan

**Inventory of Domain Repository Interfaces:**
1. `ClubRepository`
2. `ClubMembershipRepository`
3. `ClubMembershipHistoryRepository`
4. `ClubCoordinatorRepository`
5. `StudentCouncilRepository`
6. `CouncilMembershipRepository`
7. `CouncilMembershipHistoryRepository`
8. `LeadershipRepository`
9. `HousePrefectRepository`

---

## 4. Datasource Plan

**Inventory of Data Layer Firestore Datasources:**
1. `FirebaseClubDatasource`
2. `FirebaseClubMembershipDatasource`
3. `FirebaseClubMembershipHistoryDatasource`
4. `FirebaseClubCoordinatorDatasource`
5. `FirebaseStudentCouncilDatasource`
6. `FirebaseCouncilMembershipDatasource`
7. `FirebaseCouncilMembershipHistoryDatasource`
8. `FirebaseLeadershipDatasource`
9. `FirebaseHousePrefectDatasource`

---

## 5. Service Plan

**Inventory of Domain Services:**
1. `ClubService`: Handles club creation, archiving, coordinator, and membership assignments. Ensures membership history is permanently preserved using `ClubMembershipHistoryEntity`.
2. `CouncilService`: Handles council records, member assignments, and removals. Ensures council history remains permanently queryable.
3. `LeadershipService`: Handles advanced leadership assignments. Executes automatic expiry workflows upon Academic Year closure, terminating active assignments while preserving history.
4. `PrefectService`: Handles assignment of house prefects. Executes automatic expiry workflows upon Academic Year closure, terminating active assignments while preserving history.

---

## 6. Validator Plan

**Inventory of Domain Validators:**
1. `ClubValidator`: Validates club naming uniqueness and active school context.
2. `MembershipValidator`: Prevents duplicate active memberships within the same club/academic year.
3. `LeadershipCapacityValidator`: Enforces strict singleton caps for Head Boy, Head Girl, and Sports Captain. **Explicitly locks supported positions.** Explicitly prohibits automatic expansion into School Captain, Discipline Captain, Academic Captain, or any other leadership role unless approved by future architecture revisions.
4. `PrefectValidator`: Ensures valid house references and student existence. **There is NO capacity limit for House Prefects. Validation logic must not enforce singleton assignment.**

---

## 7. BLoC Plan

**Inventory of BLoC Implementations (Must be Triads: bloc/event/state):**
1. `ClubBloc`
2. `CouncilBloc`
3. `LeadershipBloc`
4. `HousePrefectBloc`

---

## 8. Screen Plan

**Inventory of UI Presentation Screens:**
1. `club_list_screen.dart`
2. `club_details_screen.dart`
3. `club_membership_management_screen.dart`
4. `council_overview_screen.dart`
5. `council_membership_management_screen.dart`
6. `leadership_dashboard_screen.dart`
7. `leadership_assignment_screen.dart`
8. `house_prefect_management_screen.dart`

---

## 9. Firestore Collection Plan

**Structure strictly bounded by tenant:**
- `schools/{schoolId}/clubs`
- `schools/{schoolId}/club_memberships`
- `schools/{schoolId}/club_membership_history`
- `schools/{schoolId}/club_coordinators`
- `schools/{schoolId}/student_council`
- `schools/{schoolId}/council_memberships`
- `schools/{schoolId}/council_membership_history`
- `schools/{schoolId}/leadership_assignments`
- `schools/{schoolId}/house_prefects`

---

## 10. Test Strategy

1. **Validator Tests:** Ensure duplicate protections, valid school contexts, and capacity limits correctly reject invalid inputs. Verify no limit is placed on house prefects.
2. **Service Tests:** Validate that services enforce academic year expiries, historical preserving edits, and successful delegations.
3. **Repository Tests:** Mock repositories to confirm data layer abstractions correctly return entity models.
4. **Datasource Tests:** Utilize `fake_cloud_firestore` to guarantee multi-tenant paths (`schools/{schoolId}`) and batch atomic operations execute safely.
5. **Bloc Tests:** Ensure predictable state transitions during data fetch, submission, and validation failure scenarios.

---

## 11. Compliance Strategy

- **Architecture Compliance:** Strict multi-tenant isolation via `schoolId` injection into every datasource operation.
- **Governance Compliance:** All update routines must omit hard deletion and apply `Soft Delete + Archive`. 

---

## 12. Implementation Sequencing

1. **Phase 1: Domain Foundation** (Entities, Repository Contracts, Validators).
2. **Phase 2: Business Logic** (Services mapping validations to repositories, including historical event capture).
3. **Phase 3: Data Layer** (Firebase Datasources and Repository Implementations).
4. **Phase 4: Automated Testing** (Datasources, Services, Validators).
5. **Phase 5: Presentation** (BLoCs and Flutter UI Screens).

---

## 13. Risk Controls

> [!CAUTION]
> **Explicit Protections against Identified Risks:**
> - **Duplicate Leadership:** `LeadershipCapacityValidator` performs exact match checks per `academicYearId` and role before writing.
> - **Duplicate Active Memberships:** Validated at the `MembershipValidator` level before reaching the repository.
> - **Historical Data Corruption:** Protected by omitting `.delete()` capability in all datasources. History entities provide immutable audit logs.
> - **Hard Deletes:** Excluded from the platform.
> - **Multi-Tenant Leakage:** Path enforcement applied strictly at the start of every datasource method (`schools/{schoolId}`).

---

## 14. Academic Year Expiry Automation

Automatic expiry workflows must be implemented within domain services (e.g. `LeadershipService`, `PrefectService`, `CouncilService`) for:
- Student Council Memberships
- Head Boy
- Head Girl
- Sports Captain
- House Prefects

Upon Academic Year closure, these workflows automatically terminate active assignments while permanently preserving the historical records.

---

## 15. Club Category Governance

Club Categories are organizational metadata only. Categories SHALL NOT affect:
- Permissions
- Governance
- Points
- Rankings
- Achievements

Categories exist solely for organization and filtering.

---

## 16. PHASE 3A INTEGRATION PROTECTION

Phase 2H SHALL NOT implement:
- Event Participation Integration
- Notification Delivery Integration
- Points Integration
- Rankings Integration
- Recognition Integration

Phase 2H may only establish structural references required for future integration. Actual integrations remain the responsibility of future Platform Integration work (Phase 3A).

---

## CRITICAL REVIEW SECTION

**Self-Review Findings:**
1. **Club Membership History preserved:** Verified. `ClubMembershipHistoryEntity` explicitly added to preserve join/leave history.
2. **Leadership positions locked:** Verified. Locked to Head Boy, Head Girl, Sports Captain via `LeadershipCapacityValidator`.
3. **House Prefect capacity rule preserved:** Verified. `PrefectValidator` explicitly states NO capacity limits.
4. **Council history preserved:** Verified. `CouncilMembershipHistoryEntity` explicitly added for immutable assignment/removal records.
5. **Academic-year expiry defined:** Verified. Explicit workflows defined in Section 14 and service implementations.
6. **Club categories correctly governed:** Verified. Section 15 restricts categories to organizational metadata only.
7. **Future integration boundaries protected:** Verified. Section 16 explicitly limits Phase 2H to structural references and defers actual integration to Phase 3A.
8. **No duplication of Phase 2C functionality:** Verified. 
9. **No intrusion into Phase 2E, 2F, 2G:** Verified.
10. **Soft Delete + Archive enforced:** Verified.

---

## FINAL OUTPUT

1. **Compatibility Assessment Verdict:** PASS
2. **List of Refinements:** Refinements 1-7 incorporated successfully.
3. **Operational Implementation Plan Verdict:** APPROVED
4. **Readiness Status:** **READY FOR IMPLEMENTATION REVIEW**
