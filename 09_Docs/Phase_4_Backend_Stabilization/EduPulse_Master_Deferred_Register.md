# EduPulse Master Deferred Register

This document tracks all capabilities, features, and refactors that have been explicitly deferred during Phase 4 Backend Stabilization to accelerate the single-school TEMS pilot.

| Feature | Current Stage | Target Stage | Reason | Production Requirement | Risk | Status |
|---|---|---|---|---|---|---|
| AuthUserDto & AuthUserMapper Extraction | Phase 4 - Stage S2.3B | Phase 4 - Stage S6 | High coupling with Firebase auth data source logic. Migration Confidence Score < 80. | Mandatory for canonical isolation. | High | Deferred |
| RoleDto & RoleMapper Extraction | Phase 4 - Stage S2.3B | Phase 4 - Stage S6 | Requires refactoring RBAC data source serialization. Migration Confidence Score < 80. | Mandatory for canonical isolation. | High | Deferred |
| PermissionDto & PermissionMapper Extraction | Phase 4 - Stage S2.3B | Phase 4 - Stage S6 | Requires refactoring RBAC data source serialization. Migration Confidence Score < 80. | Mandatory for canonical isolation. | High | Deferred |
| TenantContextDto & TenantContextMapper | Phase 4 - Stage S2.3B | Phase 4 - Stage S6 | Deeply coupled with session management exception handling. Migration Confidence Score < 80. | Mandatory for canonical isolation. | High | Deferred |
| Firestore Batch Writes | Phase 4 - Stage S3 | Phase 4 - Stage S6 | Deferring atomic batch optimizations until production concurrency loads are established. | Recommended for scaling. | Low | Deferred |
| Firestore Transactions | Phase 4 - Stage S3 | Phase 4 - Stage S6 | Deferring cross-document transaction normalization until platform metrics highlight consistency risks. | Recommended for data integrity at scale. | Low | Deferred |
| Centralized Event Pipeline (RbacAuditEvent) | Phase 4 - Stage S2 | Phase 4 - Stage S5 | Advanced audit logs are not strictly required for the single-school pilot deployment. | Mandatory for platform-wide security audits. | Low | Deferred |
| Centralized Event Pipeline (AuthAuditEvent) | Phase 4 - Stage S2 | Phase 4 - Stage S5 | Advanced auth auditing is deferrable for the pilot. | Mandatory for compliance and security forensics. | Low | Deferred |
| Cross-Tenant Notifications | Phase 4 - Stage S2 | Phase 4 - Stage S6 | Advanced cross-tenant notification orchestration is deferred. | Core requirement for the full platform. | Medium | Deferred |
| Platform Announcements | Phase 4 - Stage S2 | Phase 4 - Stage S6 | Platform announcements are deferred. | Required for Platform Admins. | Medium | Deferred |
| Cross-Tenant Broadcasts | Phase 4 - Stage S2 | Phase 4 - Stage S6 | Cross-tenant broadcasts are deferred. | Required for Platform Admins. | Medium | Deferred |
| Notification Categories | Phase 4 - Stage S2 | Phase 4 - Stage S6 | Not required for pilot. | Required for full platform functionality. | Low | Deferred |
| Notification Scheduling Triggers | Phase 4 - Stage S2 | Phase 4 - Stage S6 | Scheduling triggers not required for pilot. | Mandatory for full platform launch. | Low | Deferred |
| Communication Infrastructure (Receipts, Logs, Preferences, WhatsApp) | Phase 4 - Stage S2 | Phase 4 - Stage S6 | Communication infrastructure backend orchestration is deferred. | Required for full product completeness. | Medium | Deferred |
| Centralized Event Pipeline (NotificationAudit) | Phase 4 - Stage S2 | Phase 4 - Stage S5 | Central event pipelines are deferred. | Mandatory for compliance. | Low | Deferred |
| Collection Rename: `categorys` to `categories` | Phase 4 - Stage S3 | Phase 4 - Stage S6 | High breaking risk and data migration required. Migration Confidence Score 70. | Mandatory for canonical isolation. | High | Deferred |
| Collection Rename: `deliverys` to `deliveries` | Phase 4 - Stage S3 | Phase 4 - Stage S6 | High breaking risk and data migration required. Migration Confidence Score 70. | Mandatory for canonical isolation. | High | Deferred |
| Firestore Converter: `FirebaseAuthDatasourceImpl` | Phase 4 - Stage S3 | Phase 4 - Stage S6 | Migration Confidence Score < 80. | Recommended for data integrity. | Medium | Deferred |
| Firestore Converter: `FirebaseRoleDatasourceImpl` | Phase 4 - Stage S3 | Phase 4 - Stage S6 | Migration Confidence Score < 80. | Recommended for data integrity. | Medium | Deferred |
| Firestore Converter: Notification Datasources (x10) | Phase 4 - Stage S3 | Phase 4 - Stage S6 | Migration Confidence Score 70. | Recommended for data integrity. | Medium | Deferred |
| Security Rules: `audits` & `auditLogs` | Phase 4 - Stage S4 | Phase 4 - Stage S5 | Audit infrastructure and event pipelines are deferred. | Mandatory for compliance. | Low | Deferred |
| Security Rules: Analytics & Dashboard Metrics | Phase 4 - Stage S4 | Phase 4 - Stage S6 | Fine-grained roles for analytics are deferred. | Recommended for operational scale. | Low | Deferred |
