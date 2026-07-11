# Phase 4 — Stage S2.1
## Current Domain Discovery: Domain Model Inventory
**Date:** 2026-07-10

### 1. Tenant Module (`packages/tenant`)
- `tenant_context.dart` (TenantContext)

### 2. RBAC Module (`packages/rbac`)
- `role_entity.dart` (RoleEntity)
- `role_inheritance_entity.dart` (RoleInheritanceEntity)
- `rbac_audit_event.dart` (RbacAuditEvent)
- `permission_entity.dart` (PermissionEntity)
- `permission_group_entity.dart` (PermissionGroupEntity)

### 3. Auth Module (`packages/auth`)
- `auth_audit_event.dart` (AuthAuditEvent)
- `auth_user_entity.dart` (AuthUserEntity)
- `user_session.dart` (UserSession)

### 4. Shared Core Module (`packages/shared_core`)
- `paginated_result.dart` (PaginatedResult)

### 5. Schools Module (`packages/schools`)
- `school_entity.dart` (SchoolEntity)
- `school_model.dart` (SchoolModel) *[Found in data/models]*
- `school_status.dart` (SchoolStatus)
- `school_subscription_status.dart` (SchoolSubscriptionStatus)
- `school_subscription_tier.dart` (SchoolSubscriptionTier)

### 6. Notifications Module (`packages/notifications`)
- `notification_entity.dart` (NotificationEntity)
- `announcement_entity.dart` (AnnouncementEntity)
- `broadcast_entity.dart` (BroadcastEntity)
- `notificationcategory_entity.dart` (NotificationCategoryEntity)
- `schedulednotification_entity.dart` (ScheduledNotificationEntity)
- `readreceipt_entity.dart` (ReadReceiptEntity)
- `deliverylog_entity.dart` (DeliveryLogEntity)
- `communicationpreference_entity.dart` (CommunicationPreferenceEntity)
- `whatsapptemplate_entity.dart` (WhatsappTemplateEntity)
- `notificationrule_entity.dart` (NotificationRuleEntity)
- `notificationtemplate_entity.dart` (NotificationTemplateEntity)
- `communicationgroup_entity.dart` (CommunicationGroupEntity)
- `notificationrecipient_entity.dart` (NotificationRecipientEntity)
- `notificationaudit_entity.dart` (NotificationAuditEntity)
- `notification_enums.dart` (Various Enums)

---
*Note: This is a read-only discovery inventory. No code has been modified.*
