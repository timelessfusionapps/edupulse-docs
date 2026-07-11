# Phase_3C_Flow_E_UI_Refinement.md

## Objective

Normalize and strengthen Flow E before Flutter generation.

This is a Stitch refinement pass.

No Flutter yet.

No backend.

No ViewModels.

Only visual corrections.

---

# Refinement Layer A — Card Accent Enforcement

Mandatory.

All cards must obey:

Permanent Global Card Accent Rule.

Current issue:

Some cards in:
- Audit Center
- Compliance Queue
- Anomaly Tracker

have weak or inconsistent accent bars.

Fix:

Every card must have:

Width:
4px

Flush left

Full height

Semantic mapping required.

---

# Refinement Layer B — Global Audit Center

## B1. Metric Density

Current:

Cards feel slightly oversized.

Fix:

Reduce height by 12–16%.

Target:

120px max height.

More compact.

More enterprise.

---

## B2. Table Density

Current:

Rows slightly too loose.

Fix:

Header:
52px

Rows:
72px

Cell padding:
24px

Mandatory.

---

## B3. Risk Intelligence Panel

Current:

Good structure.

Fix:

Increase contrast hierarchy:

Card title stronger.

Meta text lighter.

Risk score larger.

Make it feel more urgent.

---

# Refinement Layer C — Audit Detail Viewer

## C1. Payload Block

Current:

Good.

Refine:

Increase visible lines.

Target:

minimum 12 visible lines.

Make scrollable.

---

## C2. Timeline

Current:

Timeline too light.

Fix:

Increase node contrast.

Use semantic color progression.

Example:

Info → Warning → Danger

---

# Refinement Layer D — System Event Explorer

## D1. Search Dominance

Current:

Good but slightly passive.

Fix:

Increase search bar height to 56px.

Wider.

This is the primary feature.

---

## D2. Tabs

Current:

Tabs blend too much.

Fix:

Active tab:

Indigo fill.

White text.

Inactive:

Neutral text.

Clear contrast.

---

# Refinement Layer E — Compliance Queue

## E1. Queue Urgency

Current:

Good.

Fix:

Make SLA breach cards more visually urgent.

Use stronger red semantic accent.

---

## E2. Status Hierarchy

Lock:

Pending → Amber  
Reviewing → Blue  
Escalated → Violet  
Closed → Green

Do not vary.

---

# Refinement Layer F — Anomaly Tracker

## F1. Heatmap Contrast

Current:

Good concept.

Needs stronger severity separation.

Fix:

Low → pale  
Medium → amber  
High → red  
Critical → violet

Must be obvious.

---

## F2. Pattern Graph

Current:

Feels decorative.

Fix:

Increase structure:

show clusters

show trend direction

show anomaly spikes

Make it investigative.

---

# Refinement Layer G — Shell Continuity

Verify:

Sidebar:
240px

Topbar:
unchanged

No CTA inside topbar.

Mandatory.

---

# Final Rule

After refinement:

STOP.

Next step:

Phase_3C_Flow_E_Execution_Plan.md