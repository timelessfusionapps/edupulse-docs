# Phase 1C — School Configuration Execution Plan

## Objective
This execution plan details the domain, data, runtime, and UI integration strategies for School Configuration in EduPulse. This plan aligns with the `Access_Tenant_Foundation_Master_Architecture.md` and `School_Configuration_Architecture.md`, ensuring all configurations reside strictly within the tenant isolation boundaries (`schools/{schoolId}`).

Execution authority is NOT granted. This plan is designed for architecture review and approval.

---

## 1. School Configuration Domain Architecture

The School Configuration domain encapsulates the settings required to personalize a school's tenant while keeping the data model standard.

```dart
class SchoolConfigurationEntity {
  final String schoolId;
  final SchoolBrandingEntity branding;
  final AcademicConfigurationEntity academic;
  
  // Custom preferences
  final Map<String, dynamic> preferences;
}

class SchoolBrandingEntity {
  final String schoolName;
  final String logoUrl;
  final String primaryColorHex;
  final String secondaryColorHex;
}

class HouseConfigurationEntity {
  final String houseId;
  final String name;
  final String colorHex;
  final String houseIconKey;
  final int displayOrder;
}

class AcademicConfigurationEntity {
  final String academicYearName;
  final DateTime startDate;
  final DateTime endDate;
  final String periodLabel; // Fully custom string, e.g., "Term", "Semester", "Cycle"
  final List<AcademicPeriodEntity> periods;
}

class AcademicPeriodEntity {
  final String periodId;
  final String name; // e.g., "Term 1", "Semester 1", "Phase 1"
  final DateTime startDate;
  final DateTime endDate;
}
```

---

## 2. School Branding

**Implementation Plan:**
- **School Name**: Text string utilized in application headers, sidebars, and parent/teacher portal entry points.
- **Primary & Secondary Colors**: Configurable as hex codes (`#1A73E8`). The runtime Theme configuration will interpret these hex codes to dynamically generate standard app colors.
- **Logo**: Hosted URL pointing to Firebase Storage.

*Note: Realtime theme updates are excluded from this phase. Branding mutations require the user to trigger a page refresh or re-navigation to apply fully.*

---

## 3. Dynamic House Configuration

**Implementation Plan:**
- **Dynamic Definition**: Houses are stored as individual documents in a dedicated collection.
- **No Hardcoded Values**: Application logic relies exclusively on fetched `HouseConfigurationEntity` records.
- **House Icon Governance**: The `houseIconKey` maps to an **Approved House Icon Registry** to prevent invalid icon references. 
  - Approved Registry Example Keys: `falcon`, `eagle`, `lion`, `tiger`, `phoenix`, `wolf`, `dragon`.
- **Ordering**: The `displayOrder` integer enforces UI sorting when plotting the Leaderboard or assigning students.

---

## 4. Academic Configuration

**Implementation Plan:**
- **Fully Custom Academic Labels**: Schools define their preferred period labeling via a free-form string (`periodLabel`). No predefined dropdowns or hardcoded terminology are enforced (e.g., `Term`, `Semester`, `Quarter`, `Cycle`, `Phase`, `Session`, `Module`).
- **Data Model Simplicity**: Internally, the platform will track these as generic "Periods". The presentation layer injects the custom `periodLabel`.
- **Academic Year**: Enforces operational constraints (start and end dates) ensuring that points, attendance, and events fall within active academic periods.

---

## 5. Firestore Architecture

**Configuration Path Structure:**
```text
Document: schools/{schoolId}/configuration
Fields:
- branding: { schoolName, logoUrl, primaryColorHex, secondaryColorHex }
- academic: { academicYearName, startDate, endDate, periodLabel, periods: [...] }
```

**House Collection Path Structure:**
```text
Collection: schools/{schoolId}/houses
Documents: {houseId}
Fields: { name, colorHex, houseIconKey, displayOrder }
```

*Reasoning: Storing houses in a dedicated collection enables future scalability for House CRUD, House Membership, House Analytics, House Reports, and House Leaderboards without document size restrictions.*

---

## 6. Runtime Integration

- **Dashboard**: Uses Primary/Secondary branding colors for main headers and widgets.
- **Leaderboard**: Derives its columns, rows, colors, and icons dynamically from the `schools/{schoolId}/houses` collection.
- **House Cards**: Visual components use `HouseConfigurationEntity` hex strings and the approved `houseIconKey` registry.
- **Data Flow**: 
  - Configuration Updated → Saved → Success Message → User Refreshes Screen.
  - *No Live Theme Updates or Realtime Branding Mutation during Phase 1C.*

---

## 7. UI Architecture

These screens belong exclusively to the **School Admin** role. 

**Structure:**
- **School Configuration Screen (Root)**: A hub containing navigation tiles to sub-configuration domains.
- **Branding Screen**: Form inputs for Name, Color Pickers (Primary/Secondary), and a Logo upload widget.
- **House Management Screen**: A list view of active houses with drag-and-drop sorting (mapping to `displayOrder`). Modal/Dialog forms for Add/Edit/Delete House operations.
- **Academic Configuration Screen**: Form for setting the Academic Year bounds, a text field for `periodLabel`, and a dynamic list generator for start/end dates of each period.

*(No implementation planned for this phase. UI artifacts strictly for documentation and mapping.)*

---

## 8. Validation Strategy

Validation checkpoints to be executed during the implementation phase:

1. **Branding Updates**: Verify that updating branding elements correctly saves to Firestore.
2. **House Updates**: Verify adding/editing/deleting a House updates the `schools/{schoolId}/houses` collection appropriately.
3. **House Icon Updates**: Verify that `houseIconKey` strictly maps to the approved registry and fails securely otherwise.
4. **House Ordering Test**: Verify that modifying the `displayOrder` correctly updates the sorting logic inside House lists and leaderboards.
5. **Branding Isolation Test**: Verify `School A Branding ≠ School B Branding`. Ensure strict multi-tenant boundaries without cross-tenant branding leakage.
6. **Academic Label Test**: Verify rendering of diverse custom labels (`Term`, `Semester`, `Quarter`, `Cycle`, `Phase`, `Session`, `Module`) safely propagates into the custom label UI architecture.

---

## 9. Future Compatibility & RBAC Definitions

### Future Compatibility
- **Teacher & Parent Portals**: These portals will consume the identical configuration read from the tenant partition.
- **Mobile Applications**: Configuration logic remains platform-agnostic for seamless iOS/Android transitions.
- **Future White-Label Requirements**: Standardized branding extraction remains intact.

### Future RBAC Permissions Boundary
Phase 1D RBAC will utilize the following architecture definitions to enforce configuration access (Note: Implementation is deferred to Phase 1D):
```text
SchoolConfiguration.View
SchoolConfiguration.Edit

Houses.View
Houses.Create
Houses.Edit
Houses.Delete

AcademicConfiguration.View
AcademicConfiguration.Edit
```

---

## 10. Documentation Deliverables

Upon completion of the Phase 1C execution, the following artifacts must be generated:

1. `EduPulse_School_Configuration_Implementation_Report.md`
2. `EduPulse_School_Configuration_Runtime_Report.md`
3. `EduPulse_School_Configuration_Test_Report.md`
4. `EduPulse_School_Configuration_Certification.md`
5. `EduPulse_House_Configuration_Architecture_Report.md`

---
*End of Plan.*
