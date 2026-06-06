# EduPulse — App Shell Foundation Prompt V1

You are the AI Engineering Assistant for EduPulse.

You now have full workspace access to the EduPulse project.

Your responsibility is to architect and implement:
# EduPulse App Shell Foundation

This phase establishes the:
- navigation architecture
- responsive layout system
- routing infrastructure
- shell scaffolding
- application skeleton

for the entire EduPulse platform.

This is one of the MOST important architectural phases of the project.

You MUST follow all engineering rules, architectural constraints, and implementation workflows defined in the EduPulse documentation system.

---

# STEP 1 — READ RELEVANT DOCUMENTS

Before implementation:
read and analyze ONLY the documents relevant to App Shell Foundation.

Mandatory documents:
- index.md
- README.md
- 03_Master_Prompts/Antigravity_Master_Prompt_V1.md
- 02_Checklists/Engineering_Checklist_V1.md
- 01_Blueprints/Blueprint_V15.docx
- 09_Docs/Design_System/Design_System_Foundation_V1.md

Additionally:
analyze the current Design System implementation already generated.

You MUST inspect:
- theme architecture
- design tokens
- shared widgets
- current folder structure
- package setup
- go_router setup
- responsive utilities

DO NOT load unrelated blueprints unless absolutely required.

---

# STEP 2 — SUMMARIZE UNDERSTANDING

After reading the documents:
provide a detailed architectural understanding summary.

Explain:
- EduPulse UI philosophy
- design system strategy
- responsive architecture expectations
- app shell responsibilities
- future scalability requirements
- navigation architecture requirements
- go_router strategy
- layout architecture expectations

Additionally explain:
- why App Shell must exist before Authentication
- how App Shell impacts all future modules
- how App Shell affects future role-based architecture

You MUST explain all architectural reasoning clearly.

---

# STEP 3 — ANALYZE CURRENT PROJECT STATE

Analyze:
- current folder structure
- current Flutter project structure
- theme implementation
- reusable widgets
- package dependencies
- navigation readiness
- responsive readiness

Then explain:
- what currently exists
- what is missing
- what assumptions are safe
- what assumptions are unsafe

DO NOT hallucinate project state.

---

# STEP 4 — CREATE IMPLEMENTATION PLAN

Create a detailed implementation plan for:
# EduPulse App Shell Foundation

The implementation plan MUST include:

## Objective
## Scope
## Responsibilities of App Shell
## Architecture Strategy
## Routing Strategy
## Responsive Strategy
## Layout Strategy
## Navigation Strategy
## Sidebar Strategy
## Mobile Navigation Strategy
## Tablet Navigation Strategy
## Desktop Navigation Strategy
## Breadcrumb Strategy
## State Management Strategy
## Shell Routing Strategy
## Reusability Strategy
## Accessibility Strategy
## Folder Structure
## Files To Create
## Files To Modify
## Shared Components Strategy
## Risks
## Validation Strategy
## Testing Strategy
## Future Scalability Impact
## Execution Order

The implementation plan MUST prioritize:
- scalability
- maintainability
- modularity
- responsiveness
- navigation consistency

---

# STEP 5 — CREATE DETAILED TASK CHECKLIST

Generate a highly detailed implementation checklist.

Checklist MUST include:

[ ] Shell architecture setup
[ ] go_router shell route configuration
[ ] Responsive layout system
[ ] Desktop sidebar navigation
[ ] Tablet adaptive navigation
[ ] Mobile drawer navigation
[ ] Top navigation bar
[ ] Navigation item system
[ ] Navigation state management
[ ] Route-aware navigation
[ ] Breadcrumb architecture
[ ] Page container architecture
[ ] Responsive shell scaffolding
[ ] Shell wrapper widgets
[ ] Loading overlays
[ ] Empty states
[ ] App-level scaffold system
[ ] Shared navigation widgets
[ ] Responsive breakpoints integration
[ ] Accessibility validation
[ ] Widget tests
[ ] Routing tests
[ ] Responsive validation
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

# APP SHELL REQUIREMENTS

The App Shell Foundation MUST include:

- responsive layout system
- shell routing architecture
- sidebar navigation
- top navigation bar
- route-aware navigation
- desktop layout system
- tablet adaptive layout
- mobile drawer navigation
- navigation state system
- breadcrumb system
- page container architecture
- loading overlay support
- empty state support
- shell scaffold structure
- reusable navigation components

---

# NAVIGATION ARCHITECTURE REQUIREMENTS

Navigation architecture MUST support:
- future role-based navigation
- dynamic sidebar items
- authenticated routing
- nested routing
- scalable module registration
- mobile drawer behavior
- desktop persistent sidebar
- tablet adaptive navigation
- breadcrumb expansion
- future permission-based visibility

The navigation system MUST remain:
- scalable
- modular
- reusable
- business-agnostic

---

# CRITICAL ARCHITECTURE RULES

The App Shell MUST remain:
# business-agnostic.

DO NOT implement:
- student logic
- rewards logic
- dashboard business logic
- Firebase business features
- authentication business rules

This phase is ONLY:
# shell infrastructure.

---

# DESIGN SYSTEM REQUIREMENTS

The App Shell MUST:
- reuse design tokens
- reuse shared widgets
- avoid hardcoded values
- use centralized spacing
- use centralized typography
- use centralized colors
- maintain visual consistency

You MUST NOT:
- hardcode spacing
- hardcode colors
- duplicate components
- bypass theme system

---

# RESPONSIVE REQUIREMENTS

The App Shell MUST support:
- desktop
- tablet
- mobile

Responsive behavior MUST feel:
- modern
- adaptive
- premium
- dashboard-oriented

Desktop:
persistent sidebar

Tablet:
adaptive sidebar behavior

Mobile:
drawer navigation

---

# ROUTING REQUIREMENTS

You MUST use:
# go_router

Architecture MUST support:
- shell routing
- nested routes
- future authenticated routes
- role-aware routing
- future deep linking

Routing architecture MUST remain:
- modular
- scalable
- testable

---

# STATE MANAGEMENT RULES

Use:
# BLoC ONLY

You MUST NOT:
- introduce Riverpod
- introduce Provider
- introduce GetX

App Shell state management should handle:
- navigation state
- sidebar expansion
- responsive state
- active route tracking

---

# TESTING REQUIREMENTS

You MUST validate:
- responsive behavior
- navigation consistency
- routing correctness
- shell rendering
- sidebar responsiveness
- drawer behavior

You MUST run:
- flutter analyze
- flutter test

before marking implementation complete.

---

# DEMO REQUIREMENT

After implementation:
generate a shell demo screen showing:

- sidebar
- topbar
- responsive layout behavior
- page container usage
- breadcrumb example
- loading overlay example
- empty state example

This demo exists ONLY to validate:
# shell architecture quality.

---

# IMPORTANT EXECUTION RULES

You MUST:
- explain architecture decisions
- explain routing decisions
- explain responsive decisions
- maintain scalability
- maintain modularity
- maintain clean folder structure

You MUST NEVER:
- skip explanation
- skip testing
- skip architecture validation
- generate unrelated business modules
- create architectural drift

---

# IMPLEMENTATION PRIORITY

This phase exists BEFORE:
- Authentication
- Dashboard
- Student Management
- Reward Engine

because:
# the App Shell becomes the permanent skeleton of EduPulse.

The quality of this architecture will directly affect:
- scalability
- maintainability
- development speed
- future feature expansion

throughout the entire product lifecycle.

Wait for approval before implementation.