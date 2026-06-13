# EduPulse Phase 3A Roadmap

## 1. Strategic Objective

With Phase 2 successfully closing the core infrastructure, multi-tenancy, and security foundation of EduPulse, Phase 3 pivots towards **Operational Academics and Workflow Orchestration**.

Phase 3A will specifically focus on integrating the `Academic Structure Architecture` with actionable daily operations. 

## 2. Phase 3A Scope & Deliverables

### Workstream 1: Academic Calendar & Term Scheduling
- **Objective:** Allow School Admins to provision Academic Years, Terms, and localized grading periods.
- **Milestone:** Implement the `AcademicYearStatus` transitions across the dashboard, ensuring terms can only advance according to strict sequential logic.

### Workstream 2: Class & Subject Architecture
- **Objective:** Provision Class Groups (e.g., Grade 9) and attach Subject nodes (e.g., Mathematics).
- **Milestone:** Establish `Teacher-Subject-Class` assignment linkages to enforce proper read/write authorization on grades and attendance.

### Workstream 3: Attendance Engine V1
- **Objective:** Implement daily and period-based attendance capture flows for Teachers.
- **Milestone:** Validate the backend aggregation of attendance metrics up to the Multi-Tenant Analytics Dashboard.

## 3. Governance and Execution Rules

- **No Dependency Drift:** All new modules must strictly adhere to the `bloc_test: 10.0.0` and `freezed: 3.2.5` standards locked in Phase 2.
- **Security First:** The `RuntimeAccessGuard` deployed in Phase 2 must wrap all new Phase 3 route nodes.
- **Test-Driven:** 100% logic test coverage is mandatory for all new Academic Scheduling and Attendance domains before integration into the `platform_shell`.

## 4. Immediate Next Steps

1. Review and approve the Phase 3A blueprint.
2. Initialize the `academic_scheduling` domain layer within `apps/admin_app/lib/features/`.
3. Draft database schema models for `Term`, `Subject`, and `AttendanceRecord`.
