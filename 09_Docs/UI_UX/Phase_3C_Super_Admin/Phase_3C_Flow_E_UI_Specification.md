# Phase_3C_Flow_E_UI_Specification.md

# EduPulse
## Phase 3C — Flow E UI Specification

Version: 1.0

Status:

APPROVED

Purpose:

Defines the Stitch-ready visual specification for the Audit Center Layer.

Flow E governs:

1. Global Audit Center
2. Audit Detail Viewer
3. System Event Explorer
4. Compliance Queue
5. Anomaly Tracker

This is the platform’s forensic intelligence layer.

---

# Authority Order

Read in exact order:

1. EduPulse_Global_Design_System.md
2. Phase_3C_Flow_E_Execution_Architecture.md
3. Phase_3C_Flow_E_UI_Specification.md

Mandatory.

Global Design System remains the visual authority.

---

# Stitch Utility Rules

Must use:

1. Enhance Prompt Skill
2. Stitch Loop Skill

Mandatory.

Generate all screens in one continuity pass.

Do not generate separately.

---

# Visual Tone

Flow E must feel:

- forensic
- analytical
- immutable
- investigative
- enterprise-grade

This is NOT operations.

This is NOT governance.

This is evidence.

UI must feel heavier than Flow D.

---

# Screen 1 — Global Audit Center

Screen ID:

global_audit_center

Purpose:

Main audit intelligence dashboard.

---

# Layout

Three-zone layout:

Top Header
Main Table
Right Risk Intelligence Panel

Same shell continuity as Flow D.

---

# Header

Title:

Global Audit Center

Subtitle:

Search, trace, and investigate every platform event

Actions:

Primary:

Export Audit Logs

Secondary:

Create Compliance Review

---

# Metrics Row

Cards:

- Total Events
- High Risk Events
- Failed Events
- Critical Incidents
- Pending Reviews

---

# Filters

Sticky.

Required:

- Actor Filter
- Category Filter
- Severity Filter
- Outcome Filter
- Date Range

---

# Main Table

Columns:

1. Timestamp
2. Actor
3. Category
4. Event
5. Severity
6. Outcome
7. Resource
8. Actions

---

# Severity Badges

Low = Blue

Medium = Amber

High = Red

Critical = Violet

Mandatory.

---

# Right Panel

Panel Title:

Risk Intelligence

Cards:

- Abnormal Event Spikes
- Repeated Failures
- Suspicious Admin Actions
- High-Severity Clusters

---

# Screen 2 — Audit Detail Viewer

Screen ID:

audit_detail_viewer

Purpose:

Deep forensic investigation.

---

# Layout

Drawer-based.

Same width continuity as Flow D:

420px

Mandatory.

---

# Sections

- Event Summary
- Actor Identity
- Resource Snapshot
- Full Payload
- Metadata
- IP Address
- Device Fingerprint
- Event Timeline

---

# Payload Block

Must use:

Monospace font

Dark surface:

Background:
#0F172A

Text:
#E2E8F0

Scrollable.

Copy button required.

---

# Footer Actions

Primary:

Export Event

Secondary:

Copy Payload

Danger:

Escalate Investigation

---

# Screen 3 — System Event Explorer

Screen ID:

system_event_explorer

Purpose:

Advanced search over all historical events.

---

# Header

Title:

System Event Explorer

Subtitle:

Trace any action, actor, or resource across the platform

Actions:

Primary:

Save Search

Secondary:

Export Results

---

# Search Layer

Large global search bar.

Supports:

- actor names
- event IDs
- resource IDs
- category terms

---

# Advanced Filters

Accordion panel:

- Actor Type
- Event Type
- Category
- Severity
- Resource Type
- Outcome
- Time Window

---

# Views

Tabs:

- Table View
- Timeline View
- Cluster View

Mandatory.

---

# Screen 4 — Compliance Queue

Screen ID:

compliance_queue

Purpose:

Events requiring human review.

---

# Header

Title:

Compliance Queue

Subtitle:

Review high-risk and unresolved incidents

Actions:

Primary:

Assign Review

Secondary:

Export Queue

---

# Metrics Row

Cards:

- Pending Cases
- Escalated Cases
- Critical Cases
- SLA Breaches

---

# Main Table

Columns:

1. Event ID
2. Actor
3. Risk Reason
4. Severity
5. Triggered At
6. Assigned To
7. Status

---

# Status Badges

Pending = Amber

Reviewing = Blue

Escalated = Violet

Closed = Green

Mandatory.

---

# Right Panel

Panel Title:

Compliance Risk Summary

Cards:

- Pending Escalations
- SLA Breaches
- Repeat Offenders
- Unauthorized Attempts

---

# Screen 5 — Anomaly Tracker

Screen ID:

anomaly_tracker

Purpose:

Track irregular platform patterns.

---

# Header

Title:

Anomaly Tracker

Subtitle:

Detect abnormal patterns across schools, admins, and resources

Actions:

Primary:

Escalate Pattern

Secondary:

Export Anomalies

---

# Metrics Row

Cards:

- Active Anomalies
- Escalated
- Resolved
- Critical Patterns

---

# Sections

---

## Anomaly Feed

Live list of anomalies.

Includes:

- source
- severity
- affected resources
- timestamp

---

## Pattern Graph

Cluster behavior chart.

Visual only.

No real data.

---

## Risk Heatmap

Severity heatmap grid.

Visual only.

No real data.

---

# UX Rules

Flow E must emphasize:

immutability

traceability

evidence hierarchy

risk concentration

search density

timeline clarity

---

# Global UI Rules

Must inherit:

- dark sidebar
- standard topbar
- standardized cards
- standardized table density
- standardized drawers
- standardized CTA hierarchy

No visual drift.

---

# Table Rules

Header Height:

52px

Row Height:

72px

Cell Padding:

24px

Radius:

16px

Mandatory.

---

# Drawer Rules

Width:

420px

Fixed.

Header fixed.

Footer fixed.

Body scrollable.

Mandatory.

---

# Stitch Output Rules

Generate only visuals.

Do NOT:

- generate Flutter
- build repositories
- create ViewModels
- create backend contracts
- implement search logic
- connect logs

Visual generation only.

Stop after generation.