# Antigravity Master Prompt System V2
## EduPulse Backend Foundation & Production Implementation System

---

# PURPOSE

This master prompt system governs the implementation phase of EduPulse after the completion of:
- frontend architecture
- dashboard foundation
- Firebase architecture blueprints
- multi-tenant architecture
- analytics architecture
- gamification architecture

This phase transitions from:
architecture planning
to:
production-grade implementation execution.

---

# CORE EXECUTION PHILOSOPHY

You are NOT building:
- random CRUD screens
- disconnected widgets
- prototype-level code

You ARE building:
a scalable multi-tenant SaaS platform.

Every implementation decision must prioritize:
- scalability
- maintainability
- modularity
- offline resilience
- tenant safety
- responsive stability
- backend correctness
- production readiness

---

# MANDATORY EXECUTION RULES

Before implementing ANY feature:

1. Read all relevant blueprint documents
2. Read all relevant engineering checklist sections
3. Analyze existing architecture carefully
4. Analyze dependencies and affected modules
5. Create implementation plan
6. Create implementation checklist
7. Identify risks and architectural impacts
8. Ask for approval BEFORE coding

DO NOT begin implementation immediately.

---

# IMPLEMENTATION PRIORITY

Follow ONLY this implementation order:

1. Firebase Backend Foundation
2. Security Rules Foundation
3. Repository & Datasource Architecture
4. Student Management Foundation
5. Activities & Points Engine
6. House & Leaderboard Systems
7. Events & Competition Engine
8. Rewards & Badge Systems
9. Notifications & Automation
10. Analytics Foundation
11. Offline & Sync Hardening
12. QA & Production Hardening

Do NOT skip ahead.

---

# FIREBASE IMPLEMENTATION RULES

All Firebase integration MUST:
- support multi-tenancy
- support offline-first workflows
- support scalable queries
- support security rule enforcement
- avoid client-authoritative logic

Never:
- query collections globally
- bypass schoolId filtering
- directly couple UI to Firestore
- perform heavy client aggregation

---

# REPOSITORY ARCHITECTURE RULES

All business logic must follow:

UI
→ BLoC
→ Repository
→ Datasource
→ Firebase

Strict separation is mandatory.

Never:
- call Firestore directly from UI
- embed query logic inside widgets
- mix repository and datasource responsibilities

---

# RESPONSIVE SAFETY RULES

All implementations MUST:
- preserve responsive layouts
- validate tablet layouts
- validate mobile layouts
- validate desktop layouts
- prevent overflow issues

Mandatory responsive testing widths:
- 1440px
- 1280px
- 1024px
- 900px
- 768px
- 600px
- 430px
- 390px

After every implementation:
manually test:
- overflow issues
- clipping
- layout collapse
- scroll behavior
- hover behavior

ZERO RenderFlex overflow errors are acceptable.

---

# OFFLINE-FIRST RULES

All systems must support:
- optimistic updates
- queued writes
- reconnect recovery
- offline cache compatibility

Never assume:
stable internet.

Especially support:
- event scoring
- point awards
- activity creation
- dashboard rendering

---

# FIRESTORE RULES

All Firestore documents MUST contain:
- schoolId
- createdAt
- updatedAt
- isArchived

All queries MUST filter by:
schoolId

Never allow:
cross-tenant querying.

---

# SECURITY RULES

All implementations must respect:
- RBAC architecture
- tenant isolation
- immutable transactions
- protected fields
- server-authoritative calculations

Never trust:
frontend validation alone.

---

# CLOUD FUNCTION RULES

Cloud Functions are responsible for:
- leaderboard recalculation
- badge automation
- streak processing
- analytics aggregation
- notifications
- scheduled jobs

Frontend must NEVER:
authoritatively calculate:
- rankings
- rewards
- streaks
- analytics

---

# UI IMPLEMENTATION RULES

Maintain:
- EduPulse Design System
- Inter typography
- spacing system
- token architecture
- responsive architecture

Avoid:
- hardcoded values
- giant widgets
- duplicated layouts
- inconsistent spacing

---

# PERFORMANCE RULES

Prioritize:
- lightweight rebuilds
- BlocSelector optimization
- pagination
- Firestore read minimization
- efficient listeners
- snapshot caching

Avoid:
- heavy rebuilds
- global streams
- giant collections
- unbounded listeners

---

# TESTING RULES

After every implementation:
- run flutter analyze
- run flutter test
- validate responsiveness
- validate overflow safety
- validate tenant isolation
- validate Firestore queries
- validate offline workflows

---

# DOCUMENTATION RULES

After completing each implementation phase:

Generate:
1. Technical walkthrough
2. Architecture summary
3. Validation report
4. File structure summary
5. Testing summary

Save all documentation in:
09_Docs/

---

# GIT RULES

After every stable milestone:
- create meaningful commit
- summarize architectural changes
- summarize validation status

Never leave:
large uncommitted architecture changes.

---

# IMPLEMENTATION STYLE

All code must feel:
- production-grade
- modular
- scalable
- maintainable
- SaaS-quality
- enterprise-ready

Avoid:
prototype shortcuts.

---

# FINAL EXECUTION OBJECTIVE

Build EduPulse as:
a scalable educational engagement SaaS platform with:

- multi-tenant architecture
- realtime systems
- offline resilience
- intelligent analytics
- gamified engagement
- secure backend systems
- production-grade scalability

while preserving:
- responsive stability
- architectural discipline
- maintainability
- backend correctness
- UX quality
