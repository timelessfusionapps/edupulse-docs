# Phase 3C Flow F VM Inventory

## Overview
This document inventories the ViewModels (VMs) generated during the Flow F Flutter UI replication phase. These VMs provide static, mock data exclusively, facilitating presentation layer testing without backend coupling.

## ViewModels

### 1. `RecoveryRequestVm`
- **Path**: `lib/features/recovery_center/presentation/models/recovery_request_vm.dart`
- **Fields**: `id`, `sourceSystem`, `requestedBy`, `reason`, `status`, `requestedAt`
- **Enforcements**: Mock list spans multiple statuses ('Awaiting Review', 'Validating', 'Failed Audit', 'Approved').

### 2. `IncidentCaseVm`
- **Path**: `lib/features/recovery_center/presentation/models/incident_case_vm.dart`
- **Fields**: `id`, `title`, `description`, `severity`, `ownerName`, `ownerColor`, `slaCountdown`, `state`
- **Enforcements**: Strict state exclusivity via factory constructor validation. An incident cannot have `state: 'Resolved'` and `slaCountdown: 'BREACHED'` concurrently.

### 3. `RollbackRequestVm`
- **Path**: `lib/features/recovery_center/presentation/models/rollback_request_vm.dart`
- **Fields**: `id`, `module`, `requiredLevel`, `status`, `requestedAt`
- **Enforcements**: L1-L4 governance levels reflected in mock datasets.

### 4. `LockdownTargetVm`
- **Path**: `lib/features/recovery_center/presentation/models/lockdown_target_vm.dart`
- **Fields**: `id`, `targetName`, `status`, `affectedModules`, `riskCascade`
- **Enforcements**: Differentiates between 'Unlocked', 'Soft Locked', and 'Hard Locked'.

### 5. `RecoveryTimelineVm`
- **Path**: `lib/features/recovery_center/presentation/models/recovery_timeline_vm.dart`
- **Fields**: `id`, `eventType`, `timestamp`, `actor`, `action`, `resource`
- **Enforcements**: Time-sequential mocked timeline events for visual chronologies.

### 6. `IntegrityCheckVm`
- **Path**: `lib/features/recovery_center/presentation/models/integrity_check_vm.dart`
- **Fields**: `id`, `checkId`, `module`, `type`, `status`, `affectedResource`, `severity`
- **Enforcements**: Includes both 'Passed' and 'Failed' data states.

### 7. `RollbackActivityVm`
- **Path**: `lib/features/recovery_center/presentation/models/rollback_activity_vm.dart`
- **Fields**: `region`, `activeRollbacks`, `replicationLag`, `conflictZones`
- **Enforcements**: Mock geo-regional cluster states.
