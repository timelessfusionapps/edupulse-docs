# Phase 2D Orphaned Feature Assessment

## Document Information
| Field | Value |
|----------|----------|
| Target Scope | Phase 2D Orphaned Data Repositories |
| Document Type | Feature Assessment |
| Target Path | `09_Docs/Phase_2D_Orphaned_Feature_Assessment.md` |

---

## 1. Feature Assessments

### 1.1 Event Types
- **Repository Name:** `event_type_repository_impl.dart`
- **Original Purpose:** Allow schools to configure custom event types (e.g., Competition, Activity, Assembly).
- **Evidence Found:** Explicitly required by Phase 2D Architecture (Section 5: Event Type Architecture). Defined as "School-configurable" with "No hardcoded restrictions."
- **Current Ownership:** Phase 2D
- **Strategic Value:** Essential. Required to establish the foundational hierarchy of events within the platform.
- **Classification:** **ACTIVE**
- **Recommended Action:** Implementation required.

### 1.2 Event Categories
- **Repository Name:** `event_category_repository_impl.dart`
- **Original Purpose:** Classify events independently from their types (e.g., Academic, Sports, Cultural).
- **Evidence Found:** Required by Phase 2D Architecture (Section 6: Event Category Architecture).
- **Current Ownership:** Phase 2D
- **Strategic Value:** Essential. Critical for downstream analytics, dashboards, and advanced filtering.
- **Classification:** **ACTIVE**
- **Recommended Action:** Implementation required.

### 1.3 Ranking Templates
- **Repository Name:** `ranking_template_repository_impl.dart`
- **Original Purpose:** Define configurable ranking structures (e.g., 1st/2nd/3rd vs Gold/Silver/Bronze).
- **Evidence Found:** Required by Phase 2D Architecture (Section 15: Ranking Architecture). The architecture strictly forbids a "fixed ranking model."
- **Current Ownership:** Phase 2D
- **Strategic Value:** Essential. Required to record and publish variable event results.
- **Classification:** **ACTIVE**
- **Recommended Action:** Implementation required.

### 1.4 Teams
- **Repository Name:** `team_repository_impl.dart`
- **Original Purpose:** Support custom groupings of students from multiple classes for team-based competitions (e.g., Debate Team).
- **Evidence Found:** Documented in Phase 2D Architecture (Section 12: Team Architecture).
- **Current Ownership:** Phase 2D
- **Strategic Value:** High future value. Team-based events are a primary driver of student engagement, but not strictly required for MVP individual-based events.
- **Classification:** **FUTURE**
- **Recommended Action:** Move to Deferred Feature Register. Do NOT delete.

### 1.5 Event Templates
- **Repository Name:** `event_template_repository_impl.dart`
- **Original Purpose:** Provide reusable blueprints to automate the creation of recurring events (e.g., Weekly Assembly).
- **Evidence Found:** Documented in Phase 2D Architecture (Section 9: Event Templates).
- **Current Ownership:** Phase 2D
- **Strategic Value:** Medium future value. Represents useful future event automation, but is an administrative convenience rather than a core platform primitive.
- **Classification:** **FUTURE**
- **Recommended Action:** Move to Deferred Feature Register. Do NOT delete.

### 1.6 Event Ownership
- **Repository Name:** `event_ownership_repository_impl.dart`
- **Original Purpose:** Assign primary and supporting teachers to events for operational accountability.
- **Evidence Found:** Phase 2D Architecture (Section 7). However, Phase 2G (Teacher Participation & Event Governance) introduced the "Event Manager Architecture" and "Delegated Event Rights" specifically to handle this workflow.
- **Current Ownership:** Phase 2G (Teacher Governance)
- **Strategic Value:** Obsolete in the Phase 2D context. The feature has been completely superseded by the dedicated Phase 2G governance module.
- **Classification:** **RETIRED**
- **Recommended Action:** Safe deletion permitted.

---

## 2. Feature Classification Matrix

| Feature | Classification | Target Action |
|---------|----------------|---------------|
| Event Types | ACTIVE | Implement |
| Event Categories | ACTIVE | Implement |
| Ranking Templates | ACTIVE | Implement |
| Teams | FUTURE | Defer |
| Event Templates | FUTURE | Defer |
| Event Ownership | RETIRED | Delete |

---

## 3. Safe Deletion Candidates
- `event_ownership_repository_impl.dart` (and its associated domain interface/service). Fully replaced by Phase 2G.

## 4. Deferred Feature Candidates
- `team_repository_impl.dart`
- `event_template_repository_impl.dart`

## 5. Active Feature Candidates
- `event_type_repository_impl.dart`
- `event_category_repository_impl.dart`
- `ranking_template_repository_impl.dart`

---

## 6. Risks
- **Over-Deletion Risk:** Blanket deletion of all orphaned repositories would destroy the foundational configuration architecture (Types, Categories, Rankings) required by Phase 2D.
- **Redundancy Risk:** Retaining Event Ownership in Phase 2D while Phase 2G manages the identical concern violates single-source-of-truth principles and could cause integration conflicts.

## 7. Recommendations
- Implement the 3 ACTIVE repositories immediately to unblock Phase 3A integration.
- Archive the 2 FUTURE repositories to a Deferred Feature Register to avoid cluttering the current codebase with unused interfaces.
- Safely delete the 1 RETIRED repository.

---

## 8. Final Verdict

- **Number of ACTIVE Features:** 3
- **Number of FUTURE Features:** 2
- **Number of RETIRED Features:** 1

**RECOMMENDATION:** PARTIAL DELETION ONLY
