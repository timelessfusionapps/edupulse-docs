# Phase 3C — Flow H Stitch Execution
## Executive Command Center
### EduPulse Super Admin Platform

---

# Phase

Phase 3C — Super Admin Layer

## Flow

Flow H — Executive Command Center

## Execution Type

Stitch UI Generation

## Project

**EduPulse Phase 3C**

---

# Objective

Generate the Executive Command Center screens inside the existing Stitch project.

This is a **UI generation only** phase.

Do NOT generate:

- Flutter
- Backend
- Firestore
- ViewModels
- APIs
- Business Logic

The objective is to create visually approved screens that will later be replicated in Flutter.

---

# Required Documents

Before generating any screen, review:

- Phase_3C_Flow_H_Execution_Architecture.md
- Phase_3C_Flow_H_UI_Specification.md
- EduPulse_Global_Design_System.md
- Phase_3C_Global_UI_Normalization.md

All Flow H screens must comply with these documents.

---

# Stitch Project

Generate every screen inside:

**Project Name**

```text
EduPulse Phase 3C
```

Do NOT create a new Stitch project.

Flow H is the final flow within the existing Phase 3C project.

---

# Global Design Rules

Reuse the existing Phase 3C design language.

Mandatory:

- Existing Sidebar
- Existing Topbar
- Existing Metric Cards
- Existing Table Style
- Existing Right Rail Cards
- Existing Drawer Style
- Existing Modal Style
- Existing Typography
- Existing Semantic Badges

---

# Permanent Card Rule

Every card must follow the approved global card system.

Mandatory:

- 16px border radius
- Existing elevation token
- 24px internal padding
- 4px left semantic accent bar
- Existing hover state
- Existing typography

Do NOT introduce any new card style.

---

# Screen 1

## Executive Command Center

Purpose:

Executive overview of the entire EduPulse platform.

---

### Header

Title:

Executive Command Center

Subtitle:

Platform-wide governance, operational health, and executive priorities.

Actions:

- Export Executive Snapshot
- Refresh Overview

---

### Section 1

Executive Health Cards

Cards:

- Platform Health
- School Lifecycle
- Governance
- Audit & Compliance
- Recovery Operations
- Communications

Each card contains:

- Status
- Short insight
- Status badge
- Primary navigation button

---

### Section 2

Strategic Watchlist

Compact executive table.

Columns:

- Priority
- Category
- Summary
- Origin Flow
- Age
- Action

---

### Section 3

Platform Health Grid

Panels:

- Platform
- Schools
- Governance
- Audit
- Recovery
- Communications

Compact health summaries only.

---

### Section 4

Executive Alerts

Alert cards ordered by severity.

Priority:

Critical

High

Medium

Information

---

### Section 5

Quick Navigation

Navigation cards linking to:

- Flow A
- Flow B
- Flow C
- Flow D
- Flow E
- Flow F
- Flow G

---

### Section 6

Executive Activity Timeline

Chronological activity feed.

Latest platform events.

Navigation only.

---

# Screen 2

## Strategic Watchlist

Purpose:

Centralized executive workspace for high-priority platform issues.

---

### Header

Title:

Strategic Watchlist

Subtitle:

Cross-platform issues requiring executive attention.

Actions:

- Export Watchlist
- Filter

---

### Filter Bar

Filters:

- Priority
- Origin Flow
- Category
- Age
- Assigned
- Status

---

### Watchlist Table

Columns:

- Priority
- Origin Flow
- Entity
- Issue
- Age
- Owner
- Status
- Action

---

### Right Rail

Executive Summary Cards

Cards:

- Critical Issues
- High Priority
- Awaiting Action
- Resolved Today

---

### Executive Recommendation Panel

Presentation-only recommendations.

Examples:

- Review pending recovery approvals.
- Audit investigation backlog increasing.
- Communication failures detected.

These are static UI placeholders only.

No AI.

---

### Executive Activity Feed

Chronological list.

Grouped by day.

Each item links to its originating flow.

---

# Drawers

Allowed:

- Executive Summary Drawer
- Platform Health Drawer
- Watchlist Detail Drawer

Purpose:

Summarize information.

Do NOT reproduce operational screens.

---

# Modals

Allowed:

- Export Executive Snapshot
- Export Watchlist
- Filter Configuration

No destructive actions.

---

# Permanent Rule

Every card, metric, alert, watchlist item, activity, and navigation element must clearly map back to one of:

- Flow A
- Flow B
- Flow C
- Flow D
- Flow E
- Flow F
- Flow G

Flow H summarizes.

Flow H prioritizes.

Flow H navigates.

Flow H never duplicates operational functionality.

---

# Deliverables

After screen generation, generate:

- Phase_3C_Flow_H_Stitch_Report.md
- Phase_3C_Flow_H_Visual_Audit.md
- Phase_3C_Flow_H_Certification.md

Save in:

09_Docs/Phase_3_Platform_Integration/Phase_3C_Super_Admin_Layer/

---

# Stop Rule

After Stitch generation:

STOP.

Do NOT generate Flutter.

Do NOT create backend.

Wait for user review of the generated Stitch screens.

---

Document Status: APPROVED
Flow: H
Execution: Stitch
Status: Ready