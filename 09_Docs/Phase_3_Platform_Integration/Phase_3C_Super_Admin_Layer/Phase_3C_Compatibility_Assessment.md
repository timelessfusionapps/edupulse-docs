# EduPulse
## Phase 3C — Super Admin Layer
### Compatibility Assessment

Version: 1.0
Status: APPROVED
Scope: Platform Control Layer Compatibility Analysis

---

## 1. Compatibility Matrix

| Feature | Backend Support | Existing UI/Logic | Action |
| --- | --- | --- | --- |
| Multi-Tenancy (School Isolation) | ✅ Yes (Phase 2, 3A) | ❌ Missing Admin View | Additive UI & Cubit |
| Authentication | ✅ Yes (Phase 2) | ❌ Missing Super Admin Auth | Additive Presentation |
| RBAC | ✅ Yes (Phase 2) | ❌ Missing Super Admin Roles | Additive DB Population |
| School Registration & Lifecycle | ⚠️ Partial (`active`, `suspended`, `archived`) | ❌ Missing (`pending`, `onboarding`, `trial`) | Additive Extension |
| User Management | ✅ Yes (Single Tenant) | ❌ Missing Multi-School Owner | Additive Entity Extension |
| Notifications / Broadcasts | ✅ Yes (Phase 3B) | ❌ Missing Admin Trigger UI | Additive Admin Cubit |
| Analytics / Platform Metrics | ❌ Missing Global Metrics | ❌ Missing | Additive Domain & UI |

---

## 2. Reusable Components

The following modules from the current repository are fully reusable for Phase 3C without modification:

- **Multi-Tenant Core (`lib/core/tenant`)**: Safely enforces `schoolId` resolution at runtime.
- **Authentication (`lib/features/auth`)**: Standard email/password flows are reusable for Super Admin login.
- **RBAC Foundation (`lib/features/rbac`)**: The permission evaluation logic is reusable; only new roles need to be defined.
- **School Administration (`lib/features/schools`)**: Base `SchoolEntity` and repositories exist and are reusable for the registry.
- **Notifications Core (`lib/features/notifications`)**: Base entities (`broadcast_entity`, `announcement_entity`) and schemas are reusable for platform-wide broadcasts.

---

## 3. Missing Components

The following entities and domains do not currently exist and must be built:

- **Super Admin Entities**: No representation of a platform owner or master user.
- **Multi-School Ownership Model**: Current `UserEntity` implementations (`SchoolAdminEntity`, `TeacherEntity`) only map to a single `schoolId`.
- **School Onboarding Wizard**: Guided UI logic for setting up academic years, classes, and teachers.
- **Tenant Limits Manager**: Entities and configuration for enforcing per-tenant quotas (max students, max teachers).
- **Super Admin Audit Layer**: Dedicated tracking for platform-level actions (approvals, suspensions, limit changes).
- **Tiered Platform Admin RBAC**: Pre-defined roles for `Owner` vs `Platform Admin`.

---

## 4. Additive Extension Plan

No existing code will be restructured. The following additive changes will be implemented:

1. **School Status Extension**:
   - *Target*: `lib/features/schools/domain/entities/school_status.dart`
   - *Change*: Add `pending`, `onboarding`, and `trial` enum values. (Minor Additive)

2. **Master User Entity Creation**:
   - *Target*: `lib/features/user_management/domain/entities/`
   - *Change*: Create `MasterUserEntity` inheriting from `UserEntity` or as a new standalone entity, containing `List<String> schoolMemberships` and `activeSchoolId`. (New Additive)

3. **Tenant Limits Extension**:
   - *Target*: `lib/features/schools/domain/entities/school_entity.dart`
   - *Change*: Add a `TenantLimits` sub-object or create a separate `SchoolLimitsEntity`. (Minor Additive)

4. **Phase 3C Feature Modules**:
   - *Target*: `lib/features/super_admin/`
   - *Change*: Create a brand-new top-level feature module encapsulating the Super Admin Dashboard, Registration Flow, Approval Queue, Limits Manager, and Audit Layer. (New Additive)

---

## 5. Certified Domain Risk Analysis

- **Risk Level**: **LOW**
- **Justification**: 
  - Phase 3C does not mutate school-level academic logic (House Impact Engine, Contribution Engine, Events). 
  - The introduction of a `MasterUserEntity` operates safely above the `schoolId` tenant boundary. By allowing a master user to dynamically inject an `activeSchoolId` into the `TenantContext`, they remain subject to the certified multi-tenant safety mechanisms already proven in Phase 3A.
  - Adding Super Admin roles to RBAC is an additive database population task and does not require rewriting the RBAC evaluator.
  - **Explicit Verification**: No certified backend domain (Phase 2, Phase 3A, Phase 3B) requires restructuring or breaking changes to support Phase 3C.

---

## 6. Firebase Compatibility Verdict

- **Database Rules**: Current Firestore security rules enforce strict `schoolId` boundaries. Additive rules will be required to permit users with `SuperAdmin` claims to read global `schools` collections and multi-tenant data. 
- **Collections**: New collections (e.g., `super_admin_audits`, `platform_metrics`) can be added without disrupting existing tenant-isolated collections.
- **Verdict**: **Compatible with Minor Security Rule Additions.**

---

## 7. Final Compatibility Verdict

Phase 3C is **FULLY COMPATIBLE** with the existing repository as a strictly additive operational experience layer. 

No architectural breaking changes are required. The certified Phase 2, 3A, and 3B backend foundations safely support the introduction of a platform ownership layer. Implementation may proceed using the Additive Extension Plan.
