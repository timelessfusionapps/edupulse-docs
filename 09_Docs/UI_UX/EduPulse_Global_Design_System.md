# EduPulse_Global_Design_System.md

# EduPulse
## Global Design System

Version: 2.0

Status:

MASTER VISUAL AUTHORITY

Purpose:

Defines the complete global UI system for EduPulse.

This document is the highest design authority.

All future:

- Stitch generations
- Flutter implementations
- Shared UI package builds

must follow this system.

No visual inference allowed.

No visual improvisation allowed.

---

# Design Hierarchy

Strict priority order:

1. EduPulse_Global_Design_System.md
2. Flow-specific UI Specification
3. Flow-specific UI Refinement
4. Stitch Generation
5. Flutter Implementation

If conflict occurs:

Global Design System overrides all.

---

# Core Design Philosophy

EduPulse must feel:

- modern
- intelligent
- operational
- structured
- calm
- authoritative

It must balance:

Educational warmth

with

Enterprise-grade control.

---

# Typography System

Font Family:

Inter

Global.

No alternatives.

---

# Type Scale

## H1

Size:

32px

Weight:

700

Line Height:

40px

Use:

Page titles

---

## H2

Size:

24px

Weight:

700

Line Height:

32px

Use:

Section titles

---

## H3

Size:

20px

Weight:

600

Line Height:

28px

Use:

Cards / Drawers

---

## Body Large

Size:

16px

Weight:

400

Line Height:

24px

Use:

Primary content

---

## Body Medium

Size:

14px

Weight:

400

Line Height:

20px

Use:

Tables / Secondary content

---

## Label

Size:

12px

Weight:

500

Line Height:

16px

Use:

Inputs / Badges / Status

---

# Color System

---

# Primary Brand

Primary:

#4f46e5

Indigo 600

Use:

Primary CTAs

Active Navigation

Focus states

---

Primary Hover:

#4338ca

Indigo 700

---

Primary Light:

#eef2ff

Indigo 50

Use:

Highlights

Info surfaces

---

# Surface System

---

## Surface Primary

#ffffff

Default cards

---

## Surface Secondary

#f8fafc

Table backgrounds

Light panels

---

## Surface Tertiary

#f1f5f9

Nested containers

---

## Surface Overlay

#ffffff

Drawer panels

Modals

---

## Surface Critical

#fef2f2

Critical alerts

---

# Background System

Page Background:

#f8fafc

Global.

---

# Navigation System

This is locked globally.

---

# Sidebar Background

#0f172a

Dark navy.

Mandatory.

Never light.

Never white.

Never inferred.

---

# Sidebar Divider

#1e293b

---

# Active Navigation Item

Background:

#4f46e5

Text/Icon:

#ffffff

Mandatory.

---

# Inactive Navigation Item

Text/Icon:

#94a3b8

Mandatory.

---

# Hover Navigation Item

Background:

#334155

Text/Icon:

#ffffff

Mandatory.

---

# Navigation Brand Text

Primary:

#ffffff

Secondary:

#cbd5e1

Mandatory.

---

# Semantic Colors

---

Success:

#10b981

Emerald 500

---

Warning:

#f59e0b

Amber 500

---

Danger:

#ef4444

Red 500

---

Info:

#3b82f6

Blue 500

---

Critical:

#7c3aed

Violet 600

---

# Status Badge System

Global.

---

Pending:

Background:

#fef3c7

Text:

#92400e

---

Approved:

Background:

#d1fae5

Text:

#065f46

---

Rejected:

Background:

#fee2e2

Text:

#991b1b

---

Trial:

Background:

#ede9fe

Text:

#5b21b6

---

Active:

Background:

#dcfce7

Text:

#166534

---

Suspended:

Background:

#fef2f2

Text:

#991b1b

---

Archived:

Background:

#e2e8f0

Text:

#475569

---

Critical:

Background:

#ede9fe

Text:

#5b21b6

---

# Spacing System

XS:

4px

SM:

8px

MD:

16px

LG:

24px

XL:

32px

XXL:

48px

Global.

---

# Radius System

Small:

8px

Medium:

12px

Large:

16px

XL:

20px

Full:

999px

Global.

---

# Shadow System

Card:

0 1px 3px rgba(0,0,0,0.08)

Drawer:

0 8px 24px rgba(0,0,0,0.12)

Modal:

0 12px 32px rgba(0,0,0,0.16)

Global.

---

# Table System

Mandatory.

---

Header Height:

52px

Row Height:

64px

Cell Padding:

16px

Header Background:

#f8fafc

Border:

#e2e8f0

Hover:

#f1f5f9

Selected:

#eef2ff

Zebra:

optional.

---

# Drawer System

Mandatory.

---

Width:

420px

Padding:

24px

Background:

#ffffff

Border:

#e2e8f0

Footer Sticky:

yes

Shadow:

Drawer shadow token

---

# Metrics Card System

Mandatory.

---

Min Height:

120px

Padding:

20px

Icon Size:

20px

Metric Number:

H2

Label:

Label

Trend:

Body Medium

---

# Alert Card System

Mandatory.

---

Low:

Info surface

Medium:

Warning surface

High:

Danger surface

Critical:

Critical surface

Each must include:

icon
title
summary
action

---

# Form System

Input Height:

52px

Input Radius:

12px

Input Border:

#cbd5e1

Focus Border:

#4f46e5

Error Border:

#ef4444

Label spacing:

8px

Section spacing:

24px

---

# Button System

Primary:

Background:

#4f46e5

Text:

#ffffff

Radius:

12px

Height:

48px

---

Secondary:

Background:

#ffffff

Border:

#cbd5e1

Text:

#334155

---

Danger:

Background:

#ef4444

Text:

#ffffff

---

# Role Accent System

For app identity only.

Not theme replacement.

---

Super Admin:

#4f46e5

---

School Admin:

#10b981

---

Teacher:

#3b82f6

---

Student:

#f59e0b

---

Parent:

#f43f5e

---

# Global Screen Rules

All screens must:

Use dark sidebar.

Use consistent topbar.

Use same spacing rhythm.

Use same table density.

Use same drawer width.

Use same button hierarchy.

Use same badge system.

No visual drift allowed.

## Permanent Global Card Accent Rule (Mandatory)

This rule is now permanently added to the EduPulse Global Design System.

Applies to:

ALL cards across ALL flows.

No exceptions.

---

### Rule

Every card must have a **left semantic accent bar**.

Mandatory.

No card may exist without this.

This applies to:

- metric cards
- alert cards
- intelligence cards
- summary cards
- risk cards
- drawer cards
- identity cards
- audit cards
- anomaly cards
- compliance cards
- governance cards

Global.

Permanent.

---

### Implementation Specification

Position:

Left edge of card

Width:

4px–6px

Height:

100% of card height

Must respect border radius.

Must feel embedded into the card.

Not floating.

Not inset.

Flush aligned.

---

### Accent Color Mapping

Primary / Informational:

#4F46E5

Success / Positive:

#22C55E

Warning / Attention:

#F59E0B

Danger / Critical:

#DC2626

High Risk / Audit Critical:

#7C3AED

Neutral / Info:

#2563EB

---

### Examples

Metric Cards:

Must always use semantic accent.

Examples:

Total Events → Primary (#4F46E5)

Successful Actions → Success (#22C55E)

Failed Actions → Warning (#F59E0B)

High Risk Actions → Danger (#DC2626)

Critical Incidents → Audit Critical (#7C3AED)

Unauthorized Attempts → Neutral (#2563EB)

---

### Strict Rules

Do NOT:

- remove left accent bars
- use plain white cards without accents
- replace accents with borders
- replace accents with icons only
- create floating accent strips

The accent bar is part of the card identity.

Permanent.

Non-negotiable.

Applies to all current and future flows.

This now becomes part of:

EduPulse_Global_Design_System.md
---

# Stitch Rules

Before every generation:

Must read:

EduPulse_Global_Design_System.md

Mandatory.

No exceptions.

---

# Flutter Rules

All theme tokens must map to:

packages/shared_ui/

Global source.

No local duplication.

No per-app token drift.

---

# Final Lock

This file is now the permanent visual authority of EduPulse.

All future UI generations must inherit from this file first.