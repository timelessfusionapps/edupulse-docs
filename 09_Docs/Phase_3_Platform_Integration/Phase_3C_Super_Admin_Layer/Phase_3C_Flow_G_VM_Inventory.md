# Phase 3C Flow G VM Inventory

## Overview
This inventory lists the ViewModels (VM) and Mock Models created to support Flow G: Communication & Broadcast Governance.

### 1. BroadcastModel (`broadcast_model.dart`)
- **Fields:** `id`, `type`, `audience`, `channel`, `initiatedBy`, `status`, `scheduledAt`
- **Purpose:** Backs the Broadcast Command Center table and detail drawer.

### 2. AnnouncementModel (`announcement_model.dart`)
- **Fields:** `id`, `schoolOrRegion`, `type`, `channel`, `priority`, `createdBy`, `status`
- **Purpose:** Supports the School Announcement Governance tracking.

### 3. EmergencyAlertModel (`emergency_alert_model.dart`)
- **Fields:** `id`, `severity`, `region`, `channel`, `triggeredBy`, `status`
- **Purpose:** Backs the Emergency Alert Engine dispatch log and tracking queue.

### 4. ComplianceRuleModel (`compliance_rule_model.dart`)
- **Fields:** `id`, `name`, `description`, `enforcementLevel`, `isActive`
- **Purpose:** Represents throttling and compliance rules mapped in the Compliance Center.

### 5. AdminMessageModel (`admin_message_model.dart`)
- **Fields:** `id`, `threadId`, `senderId`, `senderName`, `content`, `timestamp`
- **Purpose:** Used in Internal Admin Messaging for populating chat logs.

### 6. DeliveryEventModel (`delivery_event_model.dart`)
- **Fields:** `id`, `timestamp`, `channel`, `recipient`, `status`, `rawPayload`
- **Purpose:** Feeds the Live Event Stream, metrics row, latency graph, and deep Delivery Inspection Drawer in the Delivery Intelligence Center.

## Integration Notes
All models currently use hard-coded `.mockList()` factory methods. They are fully structured for direct JSON serialization when integrating with backend endpoints.
