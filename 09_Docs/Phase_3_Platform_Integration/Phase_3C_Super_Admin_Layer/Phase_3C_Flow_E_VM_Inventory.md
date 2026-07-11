# Phase 3C Flow E: ViewModel (VM) Inventory

This document tracks all ViewModels provisioned during the execution of Flow E. All VMs are currently localized to the `presentation/models` directory and contain static `.mock()` interfaces for visual testing.

## 1. AuditCenterVM
- **Purpose**: High-level statistical aggregation for the Global Audit Center dashboard.
- **Fields**: 
  - `totalEvents` (int)
  - `highRiskEvents` (int)
  - `failedEvents` (int)
  - `criticalIncidents` (int)
  - `pendingReviews` (int)

## 2. AuditEventVM
- **Purpose**: Unified structure for individual forensic system logs and user actions.
- **Fields**: 
  - `eventId`, `timestamp`, `actorName`, `actorRole`, `category`, `eventName`, `severity`, `outcome`, `resource`, `payloadJson`, `ipAddress`, `deviceFingerprint` (String)

## 3. ComplianceQueueVM
- **Purpose**: SLA management and case tracking representation.
- **Fields**: 
  - `eventId`, `actorName`, `riskReason`, `severity`, `triggeredAt`, `assignedTo`, `status` (String)
- **Companion**: `ComplianceMetricsVM` for high-level queue metrics.

## 4. AnomalyTrackerVM
- **Purpose**: Individual representations of live predictive anomaly feeds.
- **Fields**: 
  - `source`, `severity`, `resources`, `timestamp`, `description` (String)
- **Companion**: `AnomalyMetricsVM` for aggregating feed health.

## 5. RiskClusterVM
- **Purpose**: Represents behavioral clusters for the Risk Intelligence sidebar.
- **Fields**: 
  - `title`, `description`, `severity` (String)
  - `score` (int)
