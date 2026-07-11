# Phase 3C — Flow H UI Specification
## Executive Command Center
### EduPulse Super Admin Platform

---

# Document Information

| Item | Value |
|------|-------|
| Phase | Phase 3C |
| Flow | H |
| Module | Executive Command Center |
| Design System | EduPulse Global Design System |
| Status | UI Specification |
| Stitch Project | EduPulse Phase 3C |

---

# UI Philosophy

Flow H is **not another operational module**.

Unlike Flows A–G, this flow is designed to provide executive visibility across the platform.

The UI should answer one question:

> **"Where does the Super Admin need to focus right now?"**

Every card, alert, and watchlist item must guide the user into an existing operational flow.

Flow H never replaces operational screens.

---

# Global Design Rules

Use the existing Phase 3C design system without deviation.

Mandatory:

- Existing Sidebar
- Existing Topbar
- Existing Metric Cards
- Existing Semantic Status Colors
- Existing Drawers
- Existing Tables
- Existing Typography
- Existing 4px Left Accent Rule
- Existing Card Radius
- Existing Elevation
- Existing Padding System

No new visual language may be introduced.

---

# Screen 1 — Executive Command Center

## Purpose

Provides a single executive overview of the EduPulse platform.

This becomes the default landing page for the Super Admin.

---

## Header

Title:

Executive Command Center

Subtitle:

Platform-wide governance, operational health, and executive priorities.

Primary Action:

Export Executive Snapshot

Secondary Action:

Refresh Overview

---

# Section 1 — Executive Health Overview

Display a responsive row of executive health cards.

Cards:

- Platform Health
- School Lifecycle
- Governance
- Audit & Compliance
- Recovery Operations
- Communications

Each card displays:

- Current Status
- One-line summary
- Status badge
- Primary action

Example:

```
Governance

3 Suspended Administrators

Requires Review

Open Governance →
```

Click:

Navigate to Flow D.

---

# Section 2 — Strategic Watchlist

Purpose:

Highlight the highest-priority items requiring executive attention.

Display as a compact table.

Columns:

Priority

Category

Summary

Origin Flow

Age

Action

Examples:

Critical

Audit

18 High-Risk Events Pending

Flow E

2h

Review

---

High

Recovery

2 Rollback Requests Pending

Flow F

18m

Open

---

Medium

Lifecycle

12 Schools Awaiting Approval

Flow B

6h

Approve

---

Each row must navigate directly into the originating module.

---

# Section 3 — Platform Health Grid

Display six compact health panels.

Panels:

Platform

Schools

Governance

Audit

Recovery

Communications

Each panel includes:

- Status indicator
- Short summary
- Trend arrow
- Quick navigation

Purpose:

Provide a high-level snapshot only.

No operational detail.

---

# Section 4 — Executive Alerts

Display active executive alerts.

Card layout.

Priority order:

Critical

High

Medium

Information

Each alert contains:

Title

Description

Origin Flow

Action Button

Example:

```
Emergency Broadcast Failure

Two districts failed delivery.

Origin:

Flow G

Open Communications →
```

---

# Section 5 — Quick Navigation

Grid of navigation cards.

Cards:

Platform Foundation

School Lifecycle

Trial Governance

Platform Governance

Audit Intelligence

Recovery Center

Communication Center

Each card:

- icon
- title
- one-line description
- navigation button

Purpose:

Allow executives to jump directly into operational flows.

---

# Section 6 — Executive Activity Timeline

Compact timeline.

Display:

Latest platform-level activities.

Examples:

School Approved

Admin Suspended

Recovery Completed

Broadcast Failed

Audit Investigation Started

Timeline remains informational.

Clicking opens the corresponding flow.

---

# Layout Structure

```
Header

↓

Executive Health Cards

↓

Strategic Watchlist

↓

Platform Health Grid

↓

Executive Alerts

↓

Quick Navigation

↓

Executive Activity Timeline
```

All sections remain vertically scrollable.

---

# Screen 2 — Strategic Watchlist

## Purpose

Dedicated workspace for platform-wide executive attention items.

Unlike Flow E or Flow F, this screen combines issues across every operational module.

---

# Header

Title:

Strategic Watchlist

Subtitle:

Cross-platform issues requiring executive attention.

Primary Action:

Export Watchlist

Secondary Action:

Filter

---

# Filter Bar

Filters:

Priority

Origin Flow

Category

Age

Assigned

Status

---

# Watchlist Table

Columns:

Priority

Origin Flow

Entity

Issue

Age

Owner

Status

Action

Examples:

Critical

Flow E

School A

Audit Investigation Pending

3h

Audit Team

Pending

Review

---

High

Flow F

Rollback Request

Approval Required

20m

Platform Admin

Waiting

Approve

---

Medium

Flow G

Broadcast Failure

SMS Gateway Timeout

1h

Communications

Open

Investigate

---

# Summary Rail

Right-side executive summary.

Cards:

Critical Issues

High Priority

Awaiting Action

Resolved Today

Each card links to filtered watchlist results.

---

# Executive Recommendation Panel

Static informational panel.

Examples:

"Review pending recovery approvals."

"Audit investigation backlog increasing."

"Communication failures detected."

These are presentation-only summaries.

No AI logic.

---

# Activity Feed

Compact chronological feed.

Displays:

Newest executive events.

Grouped by day.

Clicking an item opens the originating flow.

---

# Layout Structure

```
Header

↓

Filter Bar

↓

Watchlist Table

↓

Summary Rail

↓

Recommendation Panel

↓

Activity Feed
```

---

# Optional Screen (Future)

Executive Snapshot

Status:

Deferred.

Purpose:

Generate printable executive summaries after backend integration.

This screen is NOT part of Phase 3C implementation unless specifically approved later.

---

# Navigation Rules

Every interaction must navigate into an operational flow.

Never duplicate management functionality.

Examples:

Governance

↓

Flow D

Audit

↓

Flow E

Recovery

↓

Flow F

Communications

↓

Flow G

Lifecycle

↓

Flow B

Platform

↓

Flow A

---

# Drawers

Allowed:

Executive Summary Drawer

Platform Health Drawer

Watchlist Detail Drawer

Drawers remain informational only.

No editing.

No approvals.

Operational actions belong in the originating module.

---

# Modals

Only lightweight modals permitted.

Examples:

Export Executive Snapshot

Export Watchlist

Filter Configuration

No destructive actions.

---

# Empty States

Use the existing Phase 3C empty-state design.

Examples:

"No executive alerts."

"Platform operating normally."

"No strategic watchlist items."

---

# Loading States

Reuse:

Existing skeleton loaders.

No custom loading animations.

---

# Permanent UI Rule

Every card, metric, alert, recommendation, watchlist item, and activity displayed inside Flow H must be traceable to one originating operational flow (A–G).

Flow H summarizes.

Flow H prioritizes.

Flow H navigates.

Flow H never duplicates operational management.

---

# Completion Criteria

Flow H UI is complete when:

- Executive Command Center implemented
- Strategic Watchlist implemented
- Global design compliance maintained
- Stitch parity achieved
- Navigation into Flows A–G operational
- No operational duplication introduced

---

**Document Status:** APPROVED  
**Phase:** Phase 3C — Super Admin Layer  
**Flow:** H — Executive Command Center  
**UI Status:** LOCKED