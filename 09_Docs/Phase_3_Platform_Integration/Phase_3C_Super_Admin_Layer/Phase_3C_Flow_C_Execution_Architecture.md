# Phase_3C_Flow_C_Execution_Architecture.md

# EduPulse
## Phase 3C — Flow C Execution Architecture

Version: 1.0

Status:

APPROVED

Purpose:

Defines the operational control architecture for live schools after onboarding.

This flow governs:

- Trial Management
- Resource Limits
- School Recovery

This is the operational backbone of the Super Admin layer.

---

# Flow C Scope

Includes:

1. Trial Manager
2. Limits Screen
3. Recovery Queue

This phase remains:

UI + UX stabilization

No runtime repository binding.

---

# Core Operational Flow

School Active
↓
Trial Running
↓
Trial Near Expiry
↓
Extend Trial / Convert
↓
Limit Monitoring
↓
Limit Violations
↓
Suspend / Archive
↓
Recovery Request
↓
Restore / Reject

---

# Flow C Screens

Must build:

1. Trial Manager
2. Limits Screen
3. Recovery Queue

---

# Screen 1 — Trial Manager

Purpose:

Manage active and expiring school trials.

Used by:

Super Admin.

---

# Top Header

Title:

Trial Manager

Subtitle:

Track, extend, and convert school trials.

Actions:

Primary:

Extend Trial

Secondary:

Export Trials

---

# Metrics Row

Cards:

- Active Trials
- Expiring in 7 Days
- Expired Trials
- Converted Schools
- Trial Extensions

---

# Filter Bar

Required:

- Search School
- Trial Status
- End Date
- Region
- School Size
- Conversion Status

Reset Filters mandatory.

Sticky.

---

# Main Trial Table

Columns:

1. School Name
2. Trial Start
3. Trial End
4. Days Remaining
5. Status
6. Current Plan
7. Capacity Used
8. Actions

---

# Actions Menu

Required:

- View School
- Extend Trial
- Convert to Paid
- Suspend
- Archive

Mandatory.

---

# Right Panel

Trial Risk Alerts

Must show:

- expiring in 3 days
- expired without action
- over-capacity trials
- inactive trial schools

---

# Trial Detail Drawer

Sections:

- School Overview
- Trial Timeline
- Usage Snapshot
- Capacity Snapshot
- Conversion Readiness

Actions:

- Extend
- Convert
- Suspend

---

# Screen 2 — Limits Screen

Purpose:

Control school capacity limits.

Used by:

Super Admin.

---

# Top Header

Title:

Resource Limits

Subtitle:

Monitor and control tenant allocations.

Actions:

Primary:

Adjust Limits

Secondary:

Bulk Export

---

# Metrics Row

Cards:

- Total Capacity Allocated
- Capacity Utilized
- Over-Limit Schools
- Near-Limit Schools
- Available Capacity

---

# Filter Bar

Required:

- Search School
- Resource Type
- Limit Status
- Region
- Usage %

Reset Filters required.

---

# Main Limits Table

Columns:

1. School Name
2. Students
3. Teachers
4. Parents
5. Classes
6. Houses
7. Events
8. Storage
9. Usage %
10. Actions

---

# Actions Menu

Required:

- View Limits
- Increase Limits
- Reduce Limits
- Suspend

---

# Right Panel

Capacity Alerts

Cards:

- Student Overload
- Storage Critical
- Event Limit Reached
- Parent Capacity Full

---

# Limits Detail Drawer

Sections:

- Current Allocation
- Current Usage
- Growth Rate
- Upgrade Recommendation

Actions:

- Adjust Limits
- Save Changes

---

# Screen 3 — Recovery Queue

Purpose:

Handle suspended or archived schools requesting restoration.

Used by:

Super Admin.

---

# Top Header

Title:

Recovery Queue

Subtitle:

Review restoration requests.

Actions:

Primary:

Review Requests

Secondary:

Export Queue

---

# Metrics Row

Cards:

- Pending Recoveries
- Approved Recoveries
- Rejected Recoveries
- Restored Schools
- High Risk Recoveries

---

# Filter Bar

Required:

- Search School
- Recovery Status
- Suspension Reason
- Submitted Date
- Region

Reset Filters required.

---

# Main Recovery Table

Columns:

1. School Name
2. Previous Status
3. Suspension Reason
4. Recovery Requested
5. Submitted Date
6. Risk Level
7. Status
8. Actions

---

# Actions Menu

Required:

- View Request
- Approve Recovery
- Reject Recovery
- Restore School

---

# Right Panel

Recovery Risk Flags

Must show:

- unpaid schools
- repeated violations
- suspicious recoveries
- incomplete appeals

---

# Recovery Detail Drawer

Sections:

- School Summary
- Suspension History
- Recovery Reason
- Audit History
- Risk Assessment

Actions:

- Approve
- Reject
- Restore

---

# Shared Package Dependencies

Allowed:

package:tenant/
package:schools/
package:notifications/
package:shared_core/
package:shared_ui/

No admin_app imports.

Strict.

---

# Navigation Rules

Must preserve:

Flow A + Flow B continuity.

Global sidebar.

Global topbar.

Navigation color lock remains mandatory.

---

# Output of Flow C

After Flow C:

EduPulse can operate live tenant lifecycle.

This unlocks:

Phase 3D School Admin Experience

because operational management becomes stable.

---

# Stop Rule

After Flow C architecture:

STOP.

Next:

Flow C UI Specification.