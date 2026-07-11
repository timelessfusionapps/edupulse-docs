# Phase_3C_Global_UI_Normalization.md

## Objective

Normalize all existing Super Admin UI flows under one unified visual system before continuing with further feature flows.

This pass is mandatory.

This is **not a redesign**.

This is a **visual consistency retrofit**.

The goal is to make all completed flows feel like one coherent product.

---

# Scope

Normalize these completed flows:

### Flow A
- Super Admin Dashboard
- School Registry
- School Detail

### Flow B
- Application Queue
- Application Detail Drawer
- School Registration Wizard
- Approval Modal
- Clarification Modal

### Flow C
- Trial Manager
- Trial Detail Drawer
- Resource Limits
- Recovery Queue
- Recovery Detail Drawer

---

# Global Source of Truth

Use:

```text
09_Docs/Design_System/EduPulse_Global_Design_System.md
```

This file is now the single source of truth.

No visual decisions should be made outside this file.

---

# Normalization Rules

---

# 1. Card Surface Standardization

## Problem

Different card backgrounds exist across screens:

- Dashboard uses tinted surfaces
- School Registry uses different tint
- Applications use cleaner white
- Flow C uses proper white cards

This creates inconsistency.

---

## Fix

Standardize ALL neutral cards:

```yaml
Card Background: #FFFFFF
Border: #E2E8F0
Radius: 16px
Elevation: none
Shadow: none
```

Apply to:

- Metric cards
- Tables
- Right-side panels
- Drawers
- Modals
- Quick action blocks
- Stats panels

---

## Exception

Semantic cards may use soft tint:

Success:
```yaml
#ECFDF5
```

Warning:
```yaml
#FFFBEB
```

Danger:
```yaml
#FEF2F2
```

Info:
```yaml
#EEF2FF
```

Only for state communication.

Never for neutral content.

---

# 2. Sidebar Width Lock

## Problem

Sidebar width drifts between screens.

---

## Fix

Lock:

```yaml
Width: 240px
```

All screens.

No deviation.

---

# 3. Sidebar Navigation Color Lock

Must strictly follow:

## Sidebar Background

```yaml
#0F172A
```

---

## Active Navigation Item

Background:
```yaml
#4F46E5
```

Text:
```yaml
#FFFFFF
```

Icon:
```yaml
#FFFFFF
```

---

## Inactive Navigation Item

Text:
```yaml
#94A3B8
```

Icon:
```yaml
#94A3B8
```

---

## Hover State

Background:
```yaml
#334155
```

---

Mandatory.

No light navbars.

No alternate dark shades.

---

# 4. Topbar Normalization

Global topbar must follow:

Left:
- Search bar

Right:
- Notifications
- Settings (optional)
- Profile avatar

---

Screen CTAs must NOT be inside topbar.

Move CTAs below page title.

Example:

Correct:

Page Header
↓
CTA Row
↓
Metrics
↓
Filters
↓
Content

---

# 5. Page Spacing System

Lock:

```yaml
Page Padding Horizontal: 24px
Page Padding Vertical: 24px
Section Gap: 32px
Card Gap: 16px
Table Gap: 24px
```

Apply globally.

---

# 6. Typography Lock

## Page Title

```yaml
Font Size: 32px
Weight: 700
Letter Spacing: -0.5
Color: #0F172A
```

---

## Section Title

```yaml
Font Size: 20px
Weight: 600
Color: #0F172A
```

---

## Card Title

```yaml
Font Size: 14px
Weight: 500
Color: #64748B
```

---

## Table Body

```yaml
Font Size: 14px
Weight: 500
Color: #334155
```

---

# 7. Table Standardization

Apply globally:

Header Height:
```yaml
52px
```

Row Height:
```yaml
72px
```

Cell Padding:
```yaml
24px
```

Table Radius:
```yaml
16px
```

---

Pagination:

Use same structure everywhere.

---

# 8. CTA Hierarchy Lock

## Primary

Filled:

```yaml
Background: #4F46E5
Text: White
```

---

## Secondary

Outlined:

```yaml
Border: #CBD5E1
Text: #334155
```

---

## Tertiary

Text only:

```yaml
Text: #4F46E5
```

---

No random button styles.

---

# 9. Dashboard Alignment Retrofit

Dashboard must match Flow B/C spacing.

Fix:

- increase section gaps
- normalize metric spacing
- align quick actions panel
- align trial alert cards to Flow C style

---

# 10. School Registry Density Fix

Current registry feels under-populated.

Fix:

- minimum 5 rows visible
- improve snapshot card spacing
- keep active pagination
- better filter alignment

No structural redesign.

---

# 11. Alert Panel Standardization

Use Flow C alert style as master:

- stronger title
- semantic left border
- smaller support text
- clear CTA

Apply to:

- Trial Alerts
- Risk Alerts
- Capacity Alerts
- Recovery Alerts

---

# Strict Rules

Do NOT:

- change business logic
- change routing
- change architecture
- change data models
- change widget tree hierarchy unless required for visual consistency
- redesign screens

Only normalize visuals.

---

# Deliverables

Generate:

```text
Phase_3C_Global_UI_Normalization_Report.md
Phase_3C_Global_UI_Consistency_Audit.md
Phase_3C_Global_UI_Certification.md
```

---

# Validation

Run:

```bash
flutter analyze
flutter test
```

Must pass.

---

# Stop Rule

Stop after normalization.

Do not proceed to next flows until reviewed.