# EduPulse — App Infrastructure Foundation Prompt V1

You are the AI Engineering Assistant for EduPulse.

You now have full workspace access to the EduPulse project.

Your responsibility is to architect and implement:
# EduPulse App Infrastructure Foundation

This phase establishes the:
- application bootstrap system
- dependency injection architecture
- service registration system
- environment configuration
- global error handling
- logging system
- connectivity monitoring
- app lifecycle management
- initialization flow
- app-wide infrastructure services

This infrastructure layer will become:
# the operational backbone of EduPulse.

You MUST follow all engineering rules, architectural constraints, and implementation workflows defined in the EduPulse documentation system.

---

# STEP 1 — READ RELEVANT DOCUMENTS

Before implementation:
read and analyze ONLY the documents relevant to App Infrastructure Foundation.

Mandatory documents:
- index.md
- README.md
- 03_Master_Prompts/Antigravity_Master_Prompt_V1.md
- 02_Checklists/Engineering_Checklist_V1.md
- 01_Blueprints/Blueprint_V14.docx
- 01_Blueprints/Blueprint_V16.docx
- 01_Blueprints/Blueprint_V19.docx
- 09_Docs/Design_System/Design_System_Foundation_V1.md
- 09_Docs/Architecture/App_Shell_Foundation_V1.md

Additionally:
inspect and analyze the current implementation state.

You MUST inspect:
- existing folder structure
- current BLoC setup
- current routing setup
- current shared widgets
- current shell architecture
- current theme setup
- package dependencies

DO NOT load unrelated blueprint documents unless absolutely necessary.

---

# STEP 2 — SUMMARIZE UNDERSTANDING

After reading the documents:
provide a detailed architectural understanding summary.

Explain:
- EduPulse infrastructure philosophy
- why infrastructure must exist before Authentication
- dependency injection strategy
- service lifecycle expectations
- bootstrap architecture expectations
- connectivity monitoring expectations
- global service architecture
- offline-first preparation requirements
- future Firebase integration impact
- future SaaS scalability impact

Additionally explain:
- how infrastructure impacts all future modules
- how infrastructure reduces architectural coupling
- why this phase is critical for long-term scalability

You MUST explain architectural reasoning clearly.

---

# STEP 3 — ANALYZE CURRENT PROJECT STATE

Analyze:
- current project structure
- current shell implementation
- routing readiness
- package setup
- initialization readiness
- service architecture readiness
- environment readiness

Then explain:
- what currently exists
- what is missing
- what assumptions are safe
- what assumptions are unsafe

DO NOT hallucinate project state.

---

# STEP 4 — CREATE IMPLEMENTATION PLAN

Create a detailed implementation plan for:
# EduPulse App Infrastructure Foundation

The implementation plan MUST include:

## Objective
## Scope
## Infrastructure Responsibilities
## Bootstrap Strategy
## Dependency Injection Strategy
## Service Registration Strategy
## Environment Configuration Strategy
## Connectivity Monitoring Strategy
## Logging Strategy
## Global Error Handling Strategy
## App Lifecycle Strategy
## Initialization Flow Strategy
## Offline-First Preparation Strategy
## Firebase Preparation Strategy
## Multi-tenant Readiness Strategy
## Shared Infrastructure Strategy
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
- maintainability
- loose coupling
- operational reliability
- modularity
- future SaaS readiness

---

# STEP 5 — CREATE DETAILED TASK CHECKLIST

Generate a highly detailed implementation checklist.

Checklist MUST include:

[ ] Bootstrap folder architecture
[ ] App initialization flow
[ ] Dependency injection setup
[ ] get_it configuration
[ ] Global service registry
[ ] Environment configuration system
[ ] App configuration model
[ ] Logging infrastructure
[ ] Connectivity monitoring service
[ ] Connectivity BLoC
[ ] App lifecycle observer
[ ] Global error handling
[ ] Global exception interception
[ ] Startup initialization manager
[ ] App readiness state handling
[ ] Global loading infrastructure
[ ] Service abstraction layer
[ ] Infrastructure-level repositories
[ ] Offline-first preparation hooks
[ ] Firebase initialization preparation
[ ] Environment separation preparation
[ ] Multi-tenant preparation hooks
[ ] Shared infrastructure utilities
[ ] Bootstrap testing
[ ] Service registration validation
[ ] Lifecycle validation
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

# INFRASTRUCTURE REQUIREMENTS

The infrastructure layer MUST establish:

- application bootstrap system
- dependency injection
- service registration
- global infrastructure services
- connectivity monitoring
- lifecycle management
- initialization sequencing
- error handling
- logging
- startup orchestration

This infrastructure MUST remain:
- scalable
- modular
- loosely coupled
- reusable
- testable

---

# DEPENDENCY INJECTION REQUIREMENTS

Use:
# get_it

Dependency injection MUST support:
- singleton services
- lazy singletons
- feature module registration
- future Firebase services
- future repository injection
- future offline services
- testability

The DI architecture MUST remain:
- centralized
- scalable
- maintainable

---

# BOOTSTRAP REQUIREMENTS

The bootstrap architecture MUST support:

- environment initialization
- service initialization
- Firebase initialization later
- async startup sequencing
- startup validation
- global initialization handling
- initialization failure recovery

The bootstrap flow MUST remain:
- predictable
- testable
- modular

---

# CONNECTIVITY REQUIREMENTS

Infrastructure MUST include:
- connectivity monitoring
- online/offline state detection
- future offline sync readiness
- app-wide connectivity awareness

This is REQUIRED because EduPulse follows:
# offline-first architecture.

---

# LOGGING REQUIREMENTS

Implement:
- centralized logging system
- debug logging
- structured logging
- future crash reporting readiness

Logging MUST remain:
- reusable
- configurable
- environment-aware

---

# ERROR HANDLING REQUIREMENTS

Implement:
- global Flutter error handling
- async exception interception
- app-level failure handling
- future crash analytics preparation

The application MUST fail gracefully.

---

# APP LIFECYCLE REQUIREMENTS

Implement:
- lifecycle observer
- foreground/background awareness
- future sync triggers
- future notification readiness

Lifecycle management MUST remain:
- centralized
- reusable
- observable

---

# OFFLINE-FIRST PREPARATION

This phase MUST prepare architecture for:
- Hive integration later
- sync queue systems later
- connectivity-aware services later
- retry mechanisms later

DO NOT fully implement offline sync yet.

ONLY:
prepare infrastructure hooks correctly.

---

# FIREBASE PREPARATION

Prepare architecture for future:
- Firebase Auth
- Firestore
- Firebase Messaging
- Firebase Functions
- Firebase Storage

DO NOT fully integrate Firebase business features yet.

ONLY:
prepare initialization architecture properly.

---

# FOLDER STRUCTURE REQUIREMENTS

Infrastructure architecture should introduce scalable folders such as:

lib/
│
├── bootstrap/
├── core/
│   ├── config/
│   ├── services/
│   ├── infrastructure/
│   ├── connectivity/
│   ├── logging/
│   ├── errors/
│   ├── lifecycle/
│   └── utilities/

You MUST maintain:
- feature-first architecture
- infrastructure separation
- modular organization

---

# STATE MANAGEMENT RULES

Use:
# BLoC ONLY

You MUST NOT:
- introduce Riverpod
- introduce Provider
- introduce GetX

Infrastructure state should manage:
- connectivity state
- app readiness state
- initialization state
- lifecycle awareness

---

# TESTING REQUIREMENTS

You MUST validate:
- dependency injection
- bootstrap sequencing
- connectivity monitoring
- lifecycle handling
- error interception
- infrastructure initialization

You MUST run:
- flutter analyze
- flutter test

before marking implementation complete.

---

# DEMO REQUIREMENT

After implementation:
generate a lightweight infrastructure demo screen showing:

- connectivity state
- initialization state
- lifecycle awareness
- global loading overlay
- infrastructure readiness indicators

This exists ONLY to validate:
# infrastructure quality.

---

# IMPORTANT EXECUTION RULES

You MUST:
- explain infrastructure decisions
- explain DI decisions
- explain bootstrap decisions
- explain lifecycle decisions
- maintain scalability
- maintain modularity
- maintain clean architecture

You MUST NEVER:
- tightly couple infrastructure
- hardcode environments
- bypass dependency injection
- introduce business logic
- create architectural drift
- skip validation

---

# IMPLEMENTATION PRIORITY

This phase exists BEFORE:
- Authentication
- Firebase business logic
- Student Management
- Reward Engine

because:
# infrastructure becomes the operational backbone of EduPulse.

The quality of this architecture will directly affect:
- scalability
- stability
- maintainability
- offline support
- Firebase integration
- future SaaS growth

throughout the entire product lifecycle.

Wait for approval before implementation.