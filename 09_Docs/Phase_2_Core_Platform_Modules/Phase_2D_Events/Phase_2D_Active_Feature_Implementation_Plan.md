# Phase 2D Active Feature Implementation Plan

## Document Name

Phase_2D_Active_Feature_Implementation_Plan.md

## Purpose

This document defines the implementation scope required to complete the three ACTIVE Phase 2D Event Architecture features identified during the Orphaned Feature Assessment.

These features remain part of the approved Event Architecture and must be implemented before Phase 3A Integration begins.

The scope is limited to:

1. Event Types
2. Event Categories
3. Ranking Templates

No additional Event features shall be introduced.

---

# Feature 1
## Event Types

### Purpose

Provide configurable classification of event types.

Examples:

- Academic
- Sports
- Cultural
- Community Service
- House Event
- Club Event

### Ownership

Phase 2D Event Management

### Requirements

Event Types must:

- Be school-specific
- Support activation/deactivation
- Support ordering
- Support display names
- Support audit history

### Domain Layer

Required Entity:

EventTypeEntity

Required Repository:

EventTypeRepository

### Data Layer

Datasource:

FirebaseEventTypeDatasource

Collection:

schools/{schoolId}/event_types/

### Presentation Layer

Screens:

- Event Type List Screen
- Event Type Management Dialog

### Governance

Event Types cannot be hard deleted.

Soft Delete only.

---

# Feature 2
## Event Categories

### Purpose

Provide secondary classification structure.

Examples:

Academic Event

- Examination
- Competition
- Olympiad

Sports Event

- Athletics
- Indoor Sports
- Outdoor Sports

### Ownership

Phase 2D Event Management

### Requirements

Categories must:

- Belong to Event Types
- Support activation/deactivation
- Support ordering
- Support audit history

### Domain Layer

Required Entity:

EventCategoryEntity

Required Repository:

EventCategoryRepository

### Data Layer

Datasource:

FirebaseEventCategoryDatasource

Collection:

schools/{schoolId}/event_categories/

### Presentation Layer

Screens:

- Event Category List Screen
- Event Category Management Dialog

### Governance

Categories cannot be hard deleted.

Soft Delete only.

---

# Feature 3
## Ranking Templates

### Purpose

Provide reusable ranking definitions.

Examples:

- Individual Ranking
- House Ranking
- Participation Ranking
- Competition Ranking

### Ownership

Phase 2D Event Management

Analytics calculations remain owned by Phase 2I.

Ranking Templates define configuration only.

### Requirements

Templates must support:

- Name
- Description
- Ranking Scope
- Active Status
- Audit History

### Domain Layer

Required Entity:

RankingTemplateEntity

Required Repository:

RankingTemplateRepository

### Data Layer

Datasource:

FirebaseRankingTemplateDatasource

Collection:

schools/{schoolId}/ranking_templates/

### Presentation Layer

Screens:

- Ranking Template List Screen
- Ranking Template Management Dialog

### Governance

Templates cannot perform calculations.

Templates only define ranking structures.

Calculations remain owned by Phase 2I.

---

# Phase Protection Rules

### Phase 2D Owns

- Event Types
- Event Categories
- Ranking Templates

### Phase 2I Owns

- Rankings
- Analytics
- Aggregations
- Dashboard Data

### Phase 2G Owns

- Event Governance
- Event Managers
- Delegation

### Phase 2H Owns

- Leadership
- Clubs
- Councils

---

# Excluded Scope

The following are excluded:

### Future Features

- Event Templates
- Teams

Move to Deferred Feature Register.

---

### Retired Features

- Event Ownership

Superseded by Phase 2G.

Retirement permitted after verification.

---

# Required Deliverables

Implementation Report

Runtime Report

Test Report

Architecture Compliance Report

Governance Compliance Report

Execution Audit

Post-Implementation Verification

---

# Success Criteria

1. Event Types implemented.
2. Event Categories implemented.
3. Ranking Templates implemented.
4. Analyzer passes.
5. Tests pass.
6. Governance rules enforced.
7. No overlap with Phase 2G.
8. No overlap with Phase 2I.

## Final Verdict

READY FOR IMPLEMENTATION