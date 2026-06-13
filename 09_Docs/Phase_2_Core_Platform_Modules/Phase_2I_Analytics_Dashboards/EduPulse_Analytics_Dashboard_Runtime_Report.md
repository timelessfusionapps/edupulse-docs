# EduPulse Analytics & Dashboard Runtime Report

## Document Information
| Field | Value |
|----------|----------|
| Module | Phase 2I – Analytics & Dashboards |
| Target Path | `09_Docs/Phase_2_Core_Platform_Modules/Phase_2I_Analytics_Dashboards/EduPulse_Analytics_Dashboard_Runtime_Report.md` |

## 1. Cost Governance Enforcement
The runtime architecture strictly enforces the Hybrid Refresh Strategy. 
- The UI layer reads exclusively from `schools/{schoolId}/analytics/dashboards`.
- Full population scans on dashboard load are actively prohibited by design (UI does not query operational collections).
- Historical recalculations are isolated to the `AnalyticsRebuildService` and `SnapshotGenerationService`.

## 2. Multi-Tenant Operation
All Firebase datasources demand a `schoolId` during instantiation. This string is physically prepended to all document and collection paths, ensuring that no cross-tenant read or write operations can occur at runtime.

## 3. Immutability
Snapshots and Audit Logs are designed to be append-only. The `SnapshotValidator` actively blocks attempts to mutate finalized snapshots. Rebuilds generate explicit new versions.
