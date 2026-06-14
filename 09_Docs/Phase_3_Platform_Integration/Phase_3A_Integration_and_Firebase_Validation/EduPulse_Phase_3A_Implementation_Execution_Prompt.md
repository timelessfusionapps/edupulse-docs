# EduPulse_Phase_3A_Implementation_Execution_Prompt.md

## EXECUTION AUTHORIZATION

You are authorized to execute Phase 3A:

Integration & Firebase Operational Validation

Execution shall strictly follow:

1. EduPulse_Phase_3A_Architecture.md
2. EduPulse_Phase_3A_Governance.md
3. EduPulse_Phase_3A_Compatibility_Assessment.md
4. EduPulse_Phase_3A_Compatibility_Refinement_Report.md
5. EduPulse_Phase_3A_Execution_Plan.md
6. EduPulse Blueprints V1–V38

The approved Architecture and Governance are authoritative.

Do not redesign them.

Do not reinterpret them.

Do not introduce new architectural patterns.

---

# CRITICAL EXECUTION RULES

## Rule 1

Do not create:

- Attendance
- Assessments
- Timetables
- Subject Management
- Gradebooks
- Homework Systems
- LMS Features
- Examination Systems
- Classroom Scheduling

These domains are permanently excluded.

---

## Rule 2

Do not introduce new business modules.

Phase 3A is an integration phase.

---

## Rule 3

Do not change ownership.

Ownership remains:

- School Administration
- Student Management
- Events
- House System
- Recognition
- Leadership
- Notifications
- Analytics

as defined in Governance.

---

## Rule 4

Integration logic shall only exist inside:

```text
features/integration/
```

Business modules may not directly orchestrate each other.

---

## Rule 5

Platform Shell shall not contain business logic.

---

## Rule 6

If any architectural conflict is discovered:

STOP

Generate:

```text
Phase_3A_Architecture_Conflict_Report.md
```

Await approval.

---

## Rule 7

If any governance conflict is discovered:

STOP

Generate:

```text
Phase_3A_Governance_Conflict_Report.md
```

Await approval.

---

# MANDATORY PRE-FLIGHT PHASE

No implementation is permitted before all verification reports are generated.

---

## PRE-FLIGHT 1

Router Registration Verification

Verify:

- Student Management
- Events
- Houses
- Recognition
- Leadership
- Notifications
- Analytics

Generate:

```text
Phase_3A_Router_Verification_Report.md
```

Decision Gate:

If routing assumptions differ from previous assessments:

STOP

Await approval.

---

## PRE-FLIGHT 2

Notification Module Verification

Verify:

- Entities
- Repositories
- Datasources
- BLoCs
- Screens
- Router registrations

Generate:

```text
Phase_3A_Notification_Verification_Report.md
```

Decision Gate:

If Notification Architecture differs materially from approved architecture:

STOP

Await approval.

---

## PRE-FLIGHT 3

Firebase Environment Verification

Verify:

- Firebase Project
- Firestore
- Authentication
- Storage
- Environment Configuration

Generate:

```text
Phase_3A_Firebase_Verification_Report.md
```

---

## PRE-FLIGHT 4

Emulator Verification

Verify:

- Firestore Emulator
- Auth Emulator
- Existing Data
- Connectivity

Generate:

```text
Phase_3A_Emulator_Verification_Report.md
```

---

## PRE-FLIGHT 5

Development School Verification

Determine whether:

```text
EduPulse Development School
```

already exists.

Generate:

```text
Phase_3A_Development_School_Verification_Report.md
```

---

## PRE-FLIGHT 6

Security Rules Verification

Verify:

- Tenant Isolation
- Role Enforcement
- Notification Access
- Analytics Access

Generate:

```text
Phase_3A_Security_Rules_Verification_Report.md
```

Decision Gate:

If tenant isolation cannot be verified:

STOP

Await approval.

---

# WORKSTREAM 1

Development School Setup

Objective:

Create:

```text
EduPulse Development School
```

Dataset:

- 1 Academic Year
- 2 Terms
- 5 Classes
- 5 Sections
- 4 Houses
- 5 Teachers
- 30 Students
- 5 Events
- 15 Recognitions
- 8 Leadership Assignments

Generate:

```text
Phase_3A_Development_School_Setup_Report.md
```

---

# WORKSTREAM 2

Integration Module Creation

Create:

```text
features/integration/
```

Approved Services:

- StudentIntegrationService
- EventIntegrationService
- NotificationIntegrationService
- FirebaseValidationService

Generate:

```text
Phase_3A_Integration_Module_Report.md
```

---

# WORKSTREAM 3

Student Lifecycle Integration

Integrate:

```text
School Administration
↓
Student Management
↓
Events
↓
Recognition
↓
Leadership
```

Validate:

- Identity propagation
- Tenant consistency
- Assignment consistency

Generate:

```text
Phase_3A_Student_Lifecycle_Integration_Report.md
```

---

# WORKSTREAM 4

Event Approval Workflow

Implement:

```text
Event Result
↓
Pending Approval
↓
Approved
↓
Recognition
↓
House Points
↓
Notifications
```

Mandatory States:

- pending_approval
- approved
- rejected

Generate:

```text
Phase_3A_Event_Approval_Workflow_Report.md
```

Decision Gate:

If approval workflow requires ownership changes:

STOP

Await approval.

---

# WORKSTREAM 5

Notification Integration

Integrate:

```text
Events
↓
Notifications

Recognition
↓
Notifications

Leadership
↓
Notifications
```

Notification Ownership Rule:

No module may directly create notifications.

Approved Flow:

```text
Module
↓
Integration Service
↓
NotificationIntegrationService
↓
Notification
```

Notification Model:

Store only:

- notificationId
- type
- referenceId
- recipientId
- timestamp
- readStatus

Generate:

```text
Phase_3A_Notification_Integration_Report.md
```

---

# WORKSTREAM 6

Student Profile Integration

Owner:

Student Management

Integrate:

- Academic Placement
- House Membership
- Event Participation
- Recognition
- Leadership

Generate:

```text
Phase_3A_Student_Profile_Report.md
```

---

# WORKSTREAM 7

House Profile Integration

Owner:

House System

Integrate:

- Members
- House Points
- Events
- Recognition
- Leadership

Generate:

```text
Phase_3A_House_Profile_Report.md
```

---

# WORKSTREAM 8

Platform Shell Integration

Deliver:

- Notification Center
- Student Profile Navigation
- House Profile Navigation
- Integrated Workflow Navigation

Generate:

```text
Phase_3A_Platform_Shell_Report.md
```

Decision Gate:

If Platform Shell requires business logic:

STOP

Await approval.

---

# WORKSTREAM 9

Firebase Validation

Validation Sequence:

```text
Emulator
↓
Development School
↓
Live Firebase
```

Validate:

- Authentication
- Firestore
- Security Rules
- Tenant Isolation
- Notification Access
- Integration Services

Generate:

```text
Phase_3A_Firebase_Validation_Report.md
```

Decision Gate:

If Firebase validation fails:

STOP

Generate:

```text
Phase_3A_Firebase_Blocker_Report.md
```

Await approval.

---

# WORKSTREAM 10

Real User Validation

Mandatory Users:

- School Head
- Admin
- Teacher

Validate:

Authentication

- Login
- Logout
- Session Persistence

Authorization

- Role Enforcement
- Permission Boundaries

Workflow Access

Generate:

```text
Phase_3A_Real_User_Validation_Report.md
```

---

# WORKSTREAM 11

Analytics Validation

Validate only:

- Existing analytics ingestion
- Existing dashboard visibility
- Existing analytics permissions

Do not expand analytics.

Generate:

```text
Phase_3A_Analytics_Validation_Report.md
```

Decision Gate:

If analytics expansion is required:

STOP

Await approval.

---

# WORKSTREAM 12

Certification

Generate:

1. EduPulse_Phase_3A_Implementation_Report.md
2. EduPulse_Phase_3A_Runtime_Report.md
3. EduPulse_Phase_3A_Test_Report.md
4. EduPulse_Phase_3A_Architecture_Compliance_Report.md
5. EduPulse_Phase_3A_Governance_Compliance_Report.md
6. EduPulse_Phase_3A_Firebase_Validation_Report.md
7. EduPulse_Phase_3A_Integration_Validation_Report.md
8. EduPulse_Phase_3A_Certification_Report.md

---

# MANDATORY TESTING

Execute:

```bash
flutter analyze
```

and

```bash
flutter test
```

Provide:

- Total Errors
- Total Warnings
- Total Tests
- Passed Tests
- Failed Tests

---

# FINAL CERTIFICATION CRITERIA

Certification may only be granted if:

✓ Integration Services operational

✓ Student Lifecycle Integration operational

✓ Event Approval Workflow operational

✓ Notification Integration operational

✓ Student Profile operational

✓ House Profile operational

✓ Platform Shell Integration operational

✓ Firebase Validation successful

✓ Real User Validation successful

✓ Analytics Validation successful

✓ Architecture Compliance successful

✓ Governance Compliance successful

---

# FINAL EXECUTION RULE

If any workstream discovers:

- Architectural conflict
- Governance conflict
- Tenant isolation failure
- Security rules failure
- Ownership violation
- Firebase validation failure

Execution must stop immediately.

Generate the appropriate blocker report.

Await approval.

Do not implement workarounds.

Do not continue execution beyond the decision gate.