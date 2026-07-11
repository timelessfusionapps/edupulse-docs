# Phase 4 — Stage S2.2
## Canonical Domain Proposal
**Date:** 2026-07-10

This document proposes the standardization of all discovered domain models to align with the Phase 4 Technical Specification.

### 1. Tenant Module

**Current Name:** `TenantContext`
- **Proposed Name:** `TenantContext` (No change)
- **Reason Type:** Naming Standardization
- **Reason:** Already compliant with naming standards.
- **Architectural Benefit:** Cosmetic
- **Dependencies:** TenantProvider, Core repositories.
- **Pilot Priority:** 🟢 Pilot Priority
- **Deferred Status:** Active
- **Breaking Change Risk:** Low
- **Migration Complexity:** Low

### 2. RBAC Module

**Current Name:** `RoleEntity`
- **Proposed Name:** `Role`
- **Reason Type:** Naming Standardization
- **Reason:** Adhere to Technical Specification (No suffixes for Domain Models).
- **Architectural Benefit:** Cosmetic
- **Dependencies:** `role_repository`, authentication services.
- **Pilot Priority:** 🟢 Pilot Priority
- **Deferred Status:** Active
- **Breaking Change Risk:** High
- **Migration Complexity:** Medium
- **Current Usage:**
  - **Imported By:** `role_repository_impl.dart`, `role_repository.dart`
  - **Number of References:** 13

**Current Name:** `RoleInheritanceEntity`
- **Proposed Name:** `RoleInheritance`
- **Reason Type:** Naming Standardization
- **Reason:** Adhere to Technical Specification.
- **Architectural Benefit:** Cosmetic
- **Dependencies:** `Role`.
- **Pilot Priority:** 🟢 Pilot Priority
- **Deferred Status:** Active
- **Breaking Change Risk:** Medium
- **Migration Complexity:** Low

**Current Name:** `PermissionEntity`
- **Proposed Name:** `Permission`
- **Reason Type:** Naming Standardization
- **Reason:** Adhere to Technical Specification.
- **Architectural Benefit:** Cosmetic
- **Dependencies:** `Role`, `permission_repository`.
- **Pilot Priority:** 🟢 Pilot Priority
- **Deferred Status:** Active
- **Breaking Change Risk:** High
- **Migration Complexity:** Medium
- **Current Usage:**
  - **Imported By:** `permission_repository_impl.dart`, `permission_repository.dart`
  - **Number of References:** 5

**Current Name:** `PermissionGroupEntity`
- **Proposed Name:** `PermissionGroup`
- **Reason Type:** Naming Standardization
- **Reason:** Adhere to Technical Specification.
- **Architectural Benefit:** Cosmetic
- **Dependencies:** `Permission`.
- **Pilot Priority:** 🟢 Pilot Priority
- **Deferred Status:** Active
- **Breaking Change Risk:** Medium
- **Migration Complexity:** Low

**Current Name:** `RbacAuditEvent`
- **Proposed Name:** Deprecated
- **Replacement:** Central Event Pipeline Models
- **Migration Stage:** Phase 4 - Stage S5
- **Removal Stage:** Phase 4 - Stage S5
- **Reason Type:** Engineering Change
- **Reason:** Audit events belong in the central event pipeline, not isolated within RBAC.
- **Architectural Benefit:** Required
- **Dependencies:** RBAC audit logging.
- **Pilot Priority:** 🔵 Deferred After TEMS Pilot
- **Deferred Status:** 
  - **Target Stage:** Phase 4 - Stage S5
  - **Reason:** Advanced audit logs are not strictly required for the single-school pilot deployment.
  - **Production Requirement:** Mandatory for platform-wide security audits.
- **Breaking Change Risk:** Low
- **Migration Complexity:** Low

### 3. Auth Module

**Current Name:** `AuthUserEntity`
- **Proposed Name:** `AuthUser`
- **Reason Type:** Naming Standardization
- **Reason:** Adhere to Technical Specification.
- **Architectural Benefit:** Cosmetic
- **Dependencies:** `auth_repository`, Session management.
- **Pilot Priority:** 🟢 Pilot Priority
- **Deferred Status:** Active
- **Breaking Change Risk:** High
- **Migration Complexity:** Medium
- **Current Usage:**
  - **Imported By:** `firebase_auth_datasource_impl.dart`, `authentication_datasource.dart`, `auth_repository_impl.dart`, `auth_repository.dart`
  - **Number of References:** 17

**Current Name:** `UserSession`
- **Proposed Name:** `UserSession` (No change)
- **Reason Type:** Naming Standardization
- **Reason:** Compliant with standards.
- **Architectural Benefit:** Cosmetic
- **Dependencies:** `auth_repository`.
- **Pilot Priority:** 🟢 Pilot Priority
- **Deferred Status:** Active
- **Breaking Change Risk:** Low
- **Migration Complexity:** Low

**Current Name:** `AuthAuditEvent`
- **Proposed Name:** Deprecated
- **Replacement:** Central Event Pipeline Models
- **Migration Stage:** Phase 4 - Stage S5
- **Removal Stage:** Phase 4 - Stage S5
- **Reason Type:** Engineering Change
- **Reason:** Centralize audit infrastructure.
- **Architectural Benefit:** Required
- **Dependencies:** Auth logging.
- **Pilot Priority:** 🔵 Deferred After TEMS Pilot
- **Deferred Status:**
  - **Target Stage:** Phase 4 - Stage S5
  - **Reason:** Advanced auth auditing is deferrable for the pilot.
  - **Production Requirement:** Mandatory for compliance and security forensics.
- **Breaking Change Risk:** Low
- **Migration Complexity:** Low

### 4. Schools Module

**Current Name:** `SchoolEntity`
- **Proposed Name:** `School`
- **Reason Type:** Naming Standardization
- **Reason:** Adhere to Technical Specification.
- **Architectural Benefit:** Cosmetic
- **Dependencies:** `school_repository`, TenantContext.
- **Pilot Priority:** 🟢 Pilot Priority
- **Deferred Status:** Active
- **Breaking Change Risk:** High
- **Migration Complexity:** Medium
- **Current Usage:**
  - **Imported By:** `school_repository_impl.dart`, `school_model.dart`, `school_repository.dart`
  - **Number of References:** 7

**Current Name:** `SchoolModel` (Data Layer)
- **Proposed Name:** Deprecated
- **Classification:** Candidate DTO
- **Replacement:** `SchoolDto`
- **Migration Stage:** Phase 4 - Stage S2.3 (Batch 2)
- **Removal Stage:** Phase 4 - Stage S2.3 (Batch 8)
- **Reason Type:** Engineering Change
- **Reason:** Eliminate duplicate models and align with transport/DTO layer standards. Do not automatically convert Model -> DTO without mapping layer investigation.
- **Architectural Benefit:** Pending Investigation
- **Dependencies:** `school_repository_impl`.
- **Pilot Priority:** 🟢 Pilot Priority
- **Deferred Status:** Active
- **Breaking Change Risk:** High
- **Migration Complexity:** High
- **Current Usage:**
  - **Imported By:** `firebase_school_datasource_impl.dart`, `school_datasource.dart`
  - **Number of References:** 7

### 5. Notifications Module

*Note: The entire Notifications subsystem is largely deferred for initial pilot operations, but its canonical models must still be standardized.*

**Current Name:** `NotificationEntity`
- **Proposed Name:** `Notification`
- **Reason Type:** Naming Standardization
- **Reason:** Adhere to Technical Specification.
- **Architectural Benefit:** Cosmetic
- **Dependencies:** `notification_repository`.
- **Pilot Priority:** 🔵 Deferred After TEMS Pilot
- **Deferred Status:**
  - **Target Stage:** Phase 4 - Stage S6
  - **Reason:** Advanced cross-tenant notification orchestration is deferred.
  - **Production Requirement:** Core requirement for the full platform.
- **Breaking Change Risk:** Medium
- **Migration Complexity:** Low

**Current Name:** `AnnouncementEntity`
- **Proposed Name:** `Announcement`
- **Reason Type:** Naming Standardization
- **Reason:** Adhere to Technical Specification.
- **Architectural Benefit:** Cosmetic
- **Dependencies:** `announcement_repository`.
- **Pilot Priority:** 🔵 Deferred After TEMS Pilot
- **Deferred Status:**
  - **Target Stage:** Phase 4 - Stage S6
  - **Reason:** Platform announcements are deferred.
  - **Production Requirement:** Required for Platform Admins.
- **Breaking Change Risk:** Medium
- **Migration Complexity:** Low

**Current Name:** `BroadcastEntity`
- **Proposed Name:** `Broadcast`
- **Reason Type:** Naming Standardization
- **Reason:** Adhere to Technical Specification.
- **Architectural Benefit:** Cosmetic
- **Dependencies:** `broadcast_repository`.
- **Pilot Priority:** 🔵 Deferred After TEMS Pilot
- **Deferred Status:**
  - **Target Stage:** Phase 4 - Stage S6
  - **Reason:** Cross-tenant broadcasts are deferred.
  - **Production Requirement:** Required for Platform Admins.
- **Breaking Change Risk:** Medium
- **Migration Complexity:** Low

**Current Name:** `NotificationCategoryEntity`
- **Proposed Name:** `NotificationCategory`
- **Reason Type:** Naming Standardization
- **Reason:** Adhere to Technical Specification.
- **Architectural Benefit:** Cosmetic
- **Dependencies:** `category_repository`.
- **Pilot Priority:** 🔵 Deferred After TEMS Pilot
- **Deferred Status:**
  - **Target Stage:** Phase 4 - Stage S6
  - **Reason:** Not required for pilot.
  - **Production Requirement:** Required for full platform functionality.
- **Breaking Change Risk:** Low
- **Migration Complexity:** Low

**Current Name:** `ScheduledNotificationEntity`
- **Proposed Name:** `ScheduledNotification`
- **Reason Type:** Naming Standardization
- **Reason:** Adhere to Technical Specification.
- **Architectural Benefit:** Cosmetic
- **Dependencies:** `scheduling_repository`.
- **Pilot Priority:** 🔵 Deferred After TEMS Pilot
- **Deferred Status:**
  - **Target Stage:** Phase 4 - Stage S6
  - **Reason:** Scheduling triggers not required for pilot.
  - **Production Requirement:** Mandatory for full platform launch.
- **Breaking Change Risk:** Low
- **Migration Complexity:** Low

**Current Name:** `ReadReceiptEntity`, `DeliveryLogEntity`, `CommunicationPreferenceEntity`, `WhatsappTemplateEntity`, `NotificationRuleEntity`, `NotificationTemplateEntity`, `CommunicationGroupEntity`, `NotificationRecipientEntity`
- **Proposed Name:** Remove `Entity` suffix for all (e.g., `ReadReceipt`, `DeliveryLog`, etc.)
- **Reason Type:** Naming Standardization
- **Reason:** System-wide domain standardization.
- **Architectural Benefit:** Cosmetic
- **Dependencies:** Corresponding repositories in the notifications module.
- **Pilot Priority:** 🔵 Deferred After TEMS Pilot
- **Deferred Status:**
  - **Target Stage:** Phase 4 - Stage S6
  - **Reason:** Communication infrastructure backend orchestration is deferred.
  - **Production Requirement:** Required for full product completeness.
- **Breaking Change Risk:** Medium
- **Migration Complexity:** Low

**Current Name:** `NotificationAuditEntity`
- **Proposed Name:** Deprecated
- **Replacement:** Central Event Pipeline Models
- **Migration Stage:** Phase 4 - Stage S5
- **Removal Stage:** Phase 4 - Stage S5
- **Reason Type:** Engineering Change
- **Reason:** Audit objects belong in central pipeline.
- **Architectural Benefit:** Required
- **Dependencies:** Notification auditing.
- **Pilot Priority:** 🔵 Deferred After TEMS Pilot
- **Deferred Status:**
  - **Target Stage:** Phase 4 - Stage S5
  - **Reason:** Central event pipelines are deferred.
  - **Production Requirement:** Mandatory for compliance.
- **Breaking Change Risk:** Low
- **Migration Complexity:** Low
