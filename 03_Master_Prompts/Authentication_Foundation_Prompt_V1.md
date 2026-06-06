# EduPulse — Authentication Foundation Prompt V1

You are the AI Engineering Assistant for EduPulse.

You now have full workspace access to the EduPulse project.

Your responsibility is to architect and implement:
# EduPulse Authentication Foundation

This phase establishes the:
- Firebase initialization layer
- authentication architecture
- session management system
- protected routing system
- authentication state management
- login/logout flows
- tenant-aware authentication preparation
- role-aware authentication preparation

This phase is responsible for transforming EduPulse into:
# a real authenticated SaaS platform.

You MUST follow all engineering rules, architectural constraints, and implementation workflows defined in the EduPulse documentation system.

---

# STEP 1 — READ RELEVANT DOCUMENTS

Before implementation:
read and analyze ONLY the documents relevant to Authentication Foundation.

Mandatory documents:
- index.md
- README.md
- 03_Master_Prompts/Antigravity_Master_Prompt_V1.md
- 02_Checklists/Engineering_Checklist_V1.md
- 01_Blueprints/Blueprint_V1.docx
- 01_Blueprints/Blueprint_V2.docx
- 01_Blueprints/Blueprint_V14.docx
- 01_Blueprints/Blueprint_V19.docx
- 09_Docs/Design_System/Design_System_Foundation_V1.md
- 09_Docs/Architecture/App_Shell_Foundation_V1.md
- 09_Docs/Architecture/App_Infrastructure_Foundation_V1.md

Additionally:
inspect and analyze the current implementation state.

You MUST inspect:
- existing folder structure
- existing bootstrap architecture
- dependency injection setup
- routing architecture
- shell routing setup
- current BLoC setup
- environment configuration
- initialization flow

DO NOT load unrelated blueprint documents unless absolutely necessary.

---

# STEP 2 — SUMMARIZE UNDERSTANDING

After reading the documents:
provide a detailed architectural understanding summary.

Explain:
- EduPulse authentication philosophy
- why authentication comes after infrastructure
- Firebase Auth architecture strategy
- session persistence strategy
- protected route architecture
- authentication state management strategy
- role-aware preparation strategy
- tenant-aware preparation strategy
- SaaS authentication scalability expectations
- future school isolation expectations

Additionally explain:
- how authentication impacts all future modules
- how authentication affects routing architecture
- how authentication affects multi-tenant SaaS architecture
- how authentication affects future permissions

You MUST explain architectural reasoning clearly.

---

# STEP 3 — ANALYZE CURRENT PROJECT STATE

Analyze:
- current infrastructure readiness
- current shell routing readiness
- dependency injection readiness
- environment readiness
- Firebase readiness
- session architecture readiness

Then explain:
- what currently exists
- what is missing
- what assumptions are safe
- what assumptions are unsafe

DO NOT hallucinate project state.

---

# STEP 4 — CREATE IMPLEMENTATION PLAN

Create a detailed implementation plan for:
# EduPulse Authentication Foundation

The implementation plan MUST include:

## Objective
## Scope
## Authentication Responsibilities
## Firebase Initialization Strategy
## Firebase Auth Strategy
## Authentication Repository Strategy
## Datasource Strategy
## Authentication BLoC Strategy
## Session Persistence Strategy
## Protected Routing Strategy
## Route Guard Strategy
## Tenant-Aware Architecture Strategy
## Role-Aware Architecture Strategy
## User Session Architecture
## Authentication State Flow
## Login Screen Architecture
## Logout Flow Strategy
## Dependency Injection Integration
## Bootstrap Integration
## Scalability Considerations
## Folder Structure
## Files To Create
## Files To Modify
## Risks
## Validation Strategy
## Testing Strategy
## Future Scalability Impact
## Execution Order

The implementation plan MUST prioritize:
- scalability
- security
- modularity
- maintainability
- SaaS readiness
- clean architecture

---

# STEP 5 — CREATE DETAILED TASK CHECKLIST

Generate a highly detailed implementation checklist.

Checklist MUST include:

[ ] Firebase project initialization
[ ] Firebase Core integration
[ ] Firebase Auth integration
[ ] Firebase configuration setup
[ ] Authentication datasource creation
[ ] Authentication repository creation
[ ] Authentication models
[ ] Authentication entity definitions
[ ] Session model creation
[ ] Auth BLoC creation
[ ] Auth events creation
[ ] Auth states creation
[ ] Session persistence architecture
[ ] Protected route architecture
[ ] Route guard implementation
[ ] Auth-aware routing integration
[ ] Login screen implementation
[ ] Logout flow implementation
[ ] Authentication loading states
[ ] Authentication error states
[ ] App bootstrap auth integration
[ ] Dependency injection integration
[ ] Tenant-aware auth preparation
[ ] Role-aware auth preparation
[ ] Future permission preparation
[ ] Firebase initialization validation
[ ] Auth state testing
[ ] Route protection testing
[ ] Session persistence testing
[ ] flutter analyze
[ ] flutter test

Every checklist item must be:
- actionable
- measurable
- implementation-ready

---

# STEP 6 — ASK FOR APPROVAL

After presenting:
- architecture understanding
- project analysis
- implementation plan
- detailed checklist

STOP.

Do NOT generate implementation yet.

Wait for explicit approval before coding.

---

# AUTHENTICATION REQUIREMENTS

The authentication layer MUST include:

- Firebase initialization
- Firebase Auth integration
- login flow
- logout flow
- session persistence
- auth state management
- protected routes
- route guards
- authentication-aware navigation
- auth loading states
- auth failure handling

The architecture MUST remain:
- scalable
- modular
- testable
- SaaS-ready

---

# FIREBASE REQUIREMENTS

You MUST use:
- Firebase Core
- Firebase Auth

You MUST prepare architecture for future:
- Firestore
- Firebase Messaging
- Firebase Functions
- Firebase Storage

You MUST NOT tightly couple:
- Firebase UI
- Firebase repositories
- Firebase business logic

Use proper:
- datasource abstraction
- repository abstraction

---

# TENANT-AWARE REQUIREMENTS

Authentication architecture MUST prepare for:
# multi-tenant SaaS isolation.

Future authenticated users will belong to:
- schoolId
- role
- permissions

Even if not fully implemented yet,
the architecture MUST prepare for it correctly now.

You MUST design the authentication system to support future:
- school isolation
- school-based routing
- school-based data access
- tenant-aware services

---

# ROLE-AWARE REQUIREMENTS

The architecture MUST prepare for future:
- Principal roles
- Teacher roles
- Parent roles
- School Admin roles
- Platform Owner roles

DO NOT fully implement permissions yet.

ONLY:
prepare architecture correctly.

---

# ROUTING REQUIREMENTS

Authentication MUST integrate correctly with:
# go_router

Routing architecture MUST support:
- protected routes
- public routes
- redirect logic
- auth-aware navigation
- future role-aware navigation

The routing system MUST remain:
- scalable
- modular
- maintainable

---

# SESSION REQUIREMENTS

Authentication MUST support:
- session persistence
- automatic session restoration
- logout cleanup
- auth state restoration

The architecture MUST prepare for future:
- secure token handling
- offline session awareness
- session expiration handling

---

# LOGIN SCREEN REQUIREMENTS

Implement:
- clean responsive login screen
- loading states
- validation states
- error states
- reusable auth UI components

The UI MUST:
- follow Design System
- reuse shared widgets
- avoid hardcoded values

---

# STATE MANAGEMENT RULES

Use:
# BLoC ONLY

You MUST NOT:
- introduce Riverpod
- introduce Provider
- introduce GetX

Auth state management should handle:
- authenticated state
- unauthenticated state
- loading state
- error state
- session restoration state

---

# TESTING REQUIREMENTS

You MUST validate:
- Firebase initialization
- authentication state transitions
- session persistence
- protected route behavior
- login flow
- logout flow
- auth restoration flow

You MUST run:
- flutter analyze
- flutter test

before marking implementation complete.

---

# DEMO REQUIREMENT

After implementation:
generate a lightweight authentication demo flow showing:

- login screen
- loading states
- authenticated state
- protected route redirect
- logout flow
- session restoration behavior

This exists ONLY to validate:
# authentication architecture quality.

---

# IMPORTANT EXECUTION RULES

You MUST:
- explain authentication decisions
- explain Firebase decisions
- explain routing decisions
- explain session architecture
- maintain scalability
- maintain modularity
- maintain clean architecture

You MUST NEVER:
- tightly couple Firebase
- bypass repositories
- bypass dependency injection
- hardcode auth logic
- create architectural drift
- skip validation

---

# IMPLEMENTATION PRIORITY

This phase exists BEFORE:
- Dashboard Foundation
- Student Management
- Reward Engine
- Competition Modules

because:
# authentication becomes the security foundation of EduPulse.

The quality of this architecture will directly affect:
- SaaS scalability
- school isolation
- permissions
- protected data access
- future enterprise readiness

throughout the entire product lifecycle.

Wait for approval before implementation.