# Flow A ViewModel Inventory

## Dashboard ViewModels
- `DashboardMetricsVM`: Holds aggregate metric values for total platform scale.
- `DashboardApplicationVM`: Defines the contract for an individual application row.
- `DashboardAlertVM`: Represents an expiring trial instance.
- `DashboardActivityVM`: Represents a timeline audit trail entry.

## Schools ViewModels
- `SchoolRegistryItemVM`: Single row data mapping for the main registry table.
- `SchoolRegistryStatsVM`: Quick stats payload for the registry right-hand pane.
- `SchoolDetailVM`: Aggregate root VM containing all sub-VMs for a specific school.
  - `SchoolUsageVM`: Core metrics related to platform adoption.
  - `SchoolLimitsVM`: Subscription bounding variables.
  - `SchoolAuditVM`: Granular history elements.
  - `SchoolLifecycleVM` & `SchoolLifecycleEventVM`: Progression states.
  - `SchoolAdminAccessVM`: Session and health validation for the core admin.

All ViewModels include a `.mock()` or `.mockList()` factory constructor as mandated.
