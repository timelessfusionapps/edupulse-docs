# EduPulse Notifications & Communication Operational Implementation Plan
**Phase:** 2F
**Status:** APPROVED FOR IMPLEMENTATION
**Date:** 2026-06-08

## Purpose
This document converts the approved architecture into an executable implementation blueprint. It acts as the authoritative reference for Phase 2F to eliminate ambiguity and prevent empty scaffolds, placeholder methods, incomplete repositories, missing datasources, missing tests, and incorrect structural assumptions.

---

## Part I: Mandatory Strategy Refinements

### 1. Canonical Notification Ledger Strategy
A single source of truth is strictly enforced. All notifications, announcements, broadcasts, delivery records, and read receipts resolve back to a canonical `NotificationEntity` stored under `schools/{schoolId}/notifications/{notificationId}`.
- **Fields:** `NotificationId`, `Recipient Snapshot`, `Delivery State`, `Read State`, `Audit State`.
- **Constraint:** Zero duplicated notification storage patterns.

### 2. Broadcast Chunking Strategy
Mandatory chunking mitigates Firestore write-limit risks.
- **Maximum Batch Size:** 500 writes.
- **Example:** A 2000 recipient broadcast chunks into exactly 4 batches of 500. No execution may exceed Firestore write limits.

### 3. Delivery Tracking Strategy
Aggregate counters avoid expensive recalculation queries.
- **Tracked Aggregate Counters:** `sentCount`, `deliveredCount`, `readCount`, `failedCount`.
- **Maintenance & Recovery:** Maintained natively upon state changes. A secure diagnostic script recalculates and reconciles counters from underlying delivery logs if corruption occurs.

### 4. Read Receipt Strategy
Read tracking is strictly automatic and transparent. Opening a communication creates a `readAt` timestamp generating a `ReadReceiptEntity` inside `readReceipts`. No acknowledgement workflow or "I have read this" buttons. Analytics calculate totals natively from receipts.

### 5. Dynamic Group Resolution Strategy
Dynamic groups (e.g., `Blue House Students`) must resolve entirely at send time.
- **Flow:** Resolve Recipients → Create Recipient Snapshot → Dispatch Notification.
- **Constraint:** Future group membership changes must never alter the historical recipient snapshot of dispatched notifications.

### 6. Academic Year Archival Strategy
Hard deletions are prohibited. At Academic Year Closure:
- **Archive:** Notifications, Announcements, Broadcasts, Delivery Logs, Read Receipts.
- **Preserve:** Audit Records and Historical Communication History.

### 7. WhatsApp Delivery Architecture
Must explicitly define: `WhatsApp Template Resolution`, `Delivery Queue`, `Retry Logic`, `Failure Handling`, and `Delivery Status Updates`. The architecture remains provider-independent, preventing any hardcoded vendor API assumptions.

### 8. Offline Synchronization Strategy
A local queue-based engine accommodates unstable connections by defining: `Local Queue`, `Sync Process`, `Retry Process`, and `Conflict Handling`.

### 9. Notification Rule Engine Strategy
Integrations with Phase 2C (Student), 2D (Events), and 2E (Points) require defined triggers:
- `Event Reminder`, `Event Result Published`, `Achievement Earned`, `Badge Earned`, `Recognition Awarded`, `Student Lifecycle Events`.
- **Rules:** Must be school configurable.

### 10. Template Lifecycle Governance
Lifecycle strictly enforced: `Draft` → `Active` → `Archived`.
- No inactive state. No deleted state. Historical template versions must be preserved and remain immutable once active/archived.

### 11. Multi-Language Strategy
Supports `English`, `Arabic`, `Gujarati`, and `Hindi`. Ensures strict storage separation, correct template resolution at dispatch, and default fallback to English.

### 12. Parent Communication Strategy
For V1, routing targets the `Primary Contact Only`. No multi-contact logic in Phase 2F.

### 13. Future Push Notification Readiness
Architectural hooks (services, payload structures) are reserved for Mobile Push Notifications, Parent App, and Teacher App without implementing them.

---

## Part II: Inventory Refinements

### 1. Required Entity Inventory
The following entities must be created. No optional omissions.
- `NotificationEntity`
- `AnnouncementEntity`
- `BroadcastEntity`
- `NotificationTemplateEntity`
- `WhatsAppTemplateEntity`
- `NotificationCategoryEntity`
- `CommunicationGroupEntity`
- `CommunicationPreferenceEntity`
- `DeliveryLogEntity`
- `ReadReceiptEntity`
- `NotificationAuditEntity`
- `ScheduledNotificationEntity`
- `NotificationRecipientEntity`
- `NotificationRuleEntity`

### 2. Repository Contract Inventory
Mandatory Repository Contracts:
- `NotificationRepository`
- `AnnouncementRepository`
- `BroadcastRepository`
- `TemplateRepository`
- `WhatsAppTemplateRepository`
- `CategoryRepository`
- `CommunicationGroupRepository`
- `PreferenceRepository`
- `DeliveryRepository`
- `AuditRepository`
- `SchedulingRepository`

### 3. Repository Implementation Inventory
Mandatory Implementations (No empty implementations permitted; every implementation must contain executable logic):
- `NotificationRepositoryImpl`
- `AnnouncementRepositoryImpl`
- `BroadcastRepositoryImpl`
- `TemplateRepositoryImpl`
- `WhatsAppTemplateRepositoryImpl`
- `CategoryRepositoryImpl`
- `CommunicationGroupRepositoryImpl`
- `PreferenceRepositoryImpl`
- `DeliveryRepositoryImpl`
- `AuditRepositoryImpl`
- `SchedulingRepositoryImpl`

### 4. Firebase Datasource Inventory
Mandatory Datasources (Must enforce `schools/{schoolId}` tenant isolation):
- `FirebaseNotificationDatasource`
- `FirebaseAnnouncementDatasource`
- `FirebaseBroadcastDatasource`
- `FirebaseTemplateDatasource`
- `FirebaseWhatsAppTemplateDatasource`
- `FirebaseGroupDatasource`
- `FirebasePreferenceDatasource`
- `FirebaseDeliveryDatasource`
- `FirebaseAuditDatasource`
- `FirebaseSchedulingDatasource`

### 5. Service Inventory
Mandatory Services with clearly defined responsibilities:
- `NotificationDispatchService`
- `AnnouncementService`
- `BroadcastService`
- `TemplateService`
- `WhatsAppTemplateService`
- `CommunicationGroupService`
- `NotificationPreferenceService`
- `SchedulingService`
- `DeliveryTrackingService`
- `ReadTrackingService`
- `CommunicationAuditService`
- `OfflineQueueService`
- `NotificationRuleEngine`

### 6. Validator Inventory
Mandatory Validators (No placeholders permitted):
- `NotificationValidator`
- `AnnouncementValidator`
- `BroadcastValidator`
- `TemplateValidator`
- `WhatsAppTemplateValidator`
- `GroupValidator`
- `PreferenceValidator`
- `ScheduleValidator`
- `DeliveryValidator`
- `AuditValidator`

### 7. BLoC Architecture
Mandatory BLoCs:
- `NotificationBloc`
- `AnnouncementBloc`
- `BroadcastBloc`
- `TemplateBloc`
- `GroupBloc`
- `PreferenceBloc`
- `SchedulingBloc`
- `DeliveryTrackingBloc`

**Mandatory Rule:** Do NOT embed events and states inside the bloc file. Every BLoC must contain separate files (`Bloc`, `Event File`, `State File`).

### 8. Screen & Wizard Inventory
Mandatory Screens:
- `NotificationDashboardScreen`
- `NotificationCenterScreen`
- `AnnouncementManagementScreen`
- `BroadcastManagementScreen`
- `NotificationTemplateScreen`
- `WhatsAppTemplateScreen`
- `CommunicationGroupScreen`
- `CommunicationPreferenceScreen`
- `DeliveryTrackingScreen`
- `CommunicationAuditScreen`
- `SchedulingManagementScreen`

Mandatory Wizards:
- `NotificationCreationWizardScreen`
- `BroadcastCreationWizardScreen`
- `TemplateCreationWizardScreen`

### 9. Testing Inventory
Mandatory Test Categories required for every implemented component:
- `Validator Tests`
- `Service Tests`
- `Repository Tests`
- `Datasource Tests`
- `Bloc Tests`

**Constraint:** No simulated test coverage claims permitted. No placeholder tests permitted. Every file requires corresponding tests with executable logic.

---

## Part III: Architectural Preservations & Compliance

### 10. Router & Dashboard Preservation
**Router Preservation:**
- Existing routes must not be modified.
- Authentication redirects must remain unchanged.
- Authorization flows must remain unchanged.
- Only additive route registration is permitted.

**Dashboard Preservation:**
- Dashboard widgets must remain untouched.
- Dashboard repositories must remain untouched.
- Dashboard business logic must remain untouched.

### 11. Monorepo Compliance Requirements
> [!CRITICAL]
> All implementation files MUST be generated only inside:
> `apps/admin_app/lib/features/notifications`
> and
> `apps/admin_app/test/features/notifications`
>
> The following locations are strictly **PROHIBITED**:
> - `lib/features/notifications`
> - `test/features/notifications`
> - `packages/*`
> - root-level folders
> - any directory outside `apps/admin_app`
>
> Any generated implementation outside `apps/admin_app` shall be considered implementation failure.

---

## Part IV: Final Verification & Certification

### Final Verification Section
Upon completion, the implementation completion reports must provide:
- Files Created
- Files Modified
- Analyzer Results
- Test Results
- Dashboard Preservation Verification
- Router Preservation Verification
- Monorepo Compliance Verification

### Certification Strategy
Required Reports lifecycle for certification completion:
- Implementation Report
- Runtime Report
- Test Report
- Architecture Compliance Report
- Governance Compliance Report
- Execution Audit
- Certification Readiness Report
- Remediation Plan (if needed)
- Remediation Report (if needed)
- Re-Audit (if needed)
- Certification
- Governance Certification
- Closure Report
