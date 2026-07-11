Here’s the refinement documentation you can create and hand over to Antigravity.

⸻

Phase_3C_Flow_F_Flutter_Refinement_Protocol.md

Purpose

This document defines the mandatory refinement pass for Flow F Flutter generation after the first implementation deviated from approved Stitch screens.

This is not a feature addition phase.

This is a:

Visual Fidelity Recovery Phase

Goal:

Bring Flutter implementation to ≥90% Stitch parity.

⸻

Scope

Flow F = Recovery Center

Includes:

1. Recovery Requests Center
2. Incident Resolution Pipeline
3. Rollback Approval Center
4. Emergency Lockdown Control
5. Restoration Timeline
6. Integrity Verification Center

⸻

Core Problem Statement

Current Flutter generation:

Correct:

* Route structure exists
* Core screens exist
* Widget hierarchy exists
* Basic backend hooks exist

Incorrect:

* Visual hierarchy diverges from Stitch
* Layout ratios broken
* Operational density missing
* Semantic severity rendering weak
* Internal tabs incorrectly introduced
* Critical right rails incomplete
* Metric cards flattened
* Incident cards simplified

This refinement corrects those deviations.

⸻

Refinement Rules

⸻

Rule 1 — Remove Internal Tab Architecture

Current:

Recovery Center contains horizontal top tabs.

This is invalid.

Remove:

* Intake Queue
* Incidents
* Approvals
* Lockdown
* Restoration
* Integrity

Top tab strip.

Replace with:

Dedicated route-driven navigation only.

Required:

/recovery-center
/recovery-center/incidents
/recovery-center/approvals
/recovery-center/lockdown
/recovery-center/restoration
/recovery-center/integrity

No nested tabs.

⸻

Rule 2 — Sidebar is Top-Level Entity

Recovery Center must remain:

Top-level sidebar module

Not nested under Audit Center.

Keep:

Dashboard
Schools
Applications
Trials
Platform Admins
Audit Center
Recovery Center
Settings

Order locked.

⸻

Rule 3 — Topbar Fidelity Normalization

Standard:

Height:

72px

Search:

420px width

Spacing:

20px

Required elements:

* Global Search
* System Status badge
* Notifications
* Help
* Profile avatar

Status badge:

green semantic pill

⸻

Rule 4 — Metric Card Reconstruction

Replace all metric cards.

Required structure:

4px left accent
Title
Primary metric
Secondary metadata
Optional icon anchor

Sizes:

minHeight: 120
padding: 24
borderRadius: 16

Semantic accents:

Green → healthy

Red → critical

Orange → warning

Purple → pending

Blue → active

⸻

Rule 5 — Layout Ratios

Mandatory:

Recovery Requests:

7:3

Approvals:

7:3

Integrity:

7:3

Restoration:

8:4

Incident grid:

3-column desktop
2-column tablet
1-column mobile

Do not compress.

⸻

Rule 6 — Incident Pipeline Reconstruction

Current implementation is too shallow.

Each incident card must include:

* Incident ID
* Severity badge
* Owner
* Resource
* Time active
* SLA status
* Action buttons

Buttons:

Open Case
Escalate
Lock
Verify Resolution

Include:

SLA countdown chip

Mandatory.

⸻

Rule 7 — Approval Center Reconstruction

Must include:

Left:

Approval Queue table

Columns:

* Rollback ID
* Module
* Required Level
* Status
* Actions

Actions:

Approve
Reject
Inspect

⸻

Right:

Governance Ladder

Must show:

L1 Auto
L2 Admin
L3 Super Admin
L4 Legal Override

Plus:

Rollback Activity Matrix.

Plus:

Historical Rollback Trend.

⸻

Rule 8 — Lockdown Screen Reconstruction

Emergency Lockdown Control 1:

DELETE

Keep only:

Emergency Lockdown Control 2

Each infrastructure card must include:

* Lock state
* Description
* Affected modules
* Risk cascade

Buttons:

Soft Lock
Hard Lock
Release
View Details

Mandatory.

⸻

Rule 9 — Restoration Timeline Reconstruction

Must feel like:

forensic operational timeline

Required:

* Vertical connector line
* Semantic event nodes
* Heavy event cards
* Actor metadata
* Action metadata
* Resource metadata
* Timestamps

Right drawer fixed:

Sections:

* Recovery Payload
* Snapshot Comparison
* Execution Metrics
* Recovery Source
* Export Full Recovery Report

⸻

Rule 10 — Integrity Screen Reconstruction

Right rail currently weak.

Must include:

Integrity Risk Summary

Cards:

* Missing Links
* Billing Mismatches
* Permission Drift
* Data Loss Risk

⸻

System Node Integrity Matrix

Show:

* Node health
* Sync state
* Verification parity

⸻

CTA block

Generate Integrity Report

Sticky bottom.

⸻

Rule 11 — Typography Recovery

Enforce:

Primary heading:

32 / 700

Section:

22 / 600

Card title:

18 / 600

Body:

14 / 500

Meta:

12 / 500

Do not use raw Material defaults.

⸻

Rule 12 — Spacing Recovery

Global:

screenPadding = 32
sectionGap = 24
cardGap = 20
innerPadding = 24

Strict.

⸻

Rule 13 — Operational Tone Enforcement

Flow F must visually communicate:

Infrastructure
Risk
Control
Recovery
Auditability
High-stakes operations

Avoid:

Generic SaaS dashboard

