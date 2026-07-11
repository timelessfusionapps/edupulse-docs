# Phase_3C_Prework_Wave_1_Extraction_Plan.md

# EduPulse
## Phase 3C Prework — Wave 1 Shared Package Extraction Plan

Version: 1.0

Status:

APPROVED

Purpose:

Extract core reusable backend modules from `apps/admin_app` into `packages/` so they can be reused by:

- super_admin_app
- school_admin_app
- user_app

This is the first controlled domain extraction.

No business logic changes allowed.

Only ownership migration.

---

# Why Wave 1

Phase 3C requires these immediately:

- auth
- tenant
- rbac
- schools
- notifications

These are foundational.

All future apps depend on them.

---

# Source

Current:

apps/admin_app/lib/features/

---

# Target Packages

packages/
├── auth/
├── tenant/
├── rbac/
├── schools/
├── notifications/
├── shared_core/
└── shared_ui/

---

# Extraction Scope

---

## Module 1 — Auth

Move:

apps/admin_app/lib/features/auth/

To:

packages/auth/lib/

Must preserve:

- domain
- data
- entities
- repositories
- services

Do NOT move:

UI screens.

---

## Module 2 — Tenant

Move:

apps/admin_app/lib/features/tenant/

To:

packages/tenant/lib/

Must preserve:

- entities
- repositories
- services

---

## Module 3 — RBAC

Move:

apps/admin_app/lib/features/rbac/

To:

packages/rbac/lib/

Must preserve:

- role entities
- permission entities
- repositories
- services

---

## Module 4 — Schools

Move:

apps/admin_app/lib/features/schools/

To:

packages/schools/lib/

Must preserve:

- school entities
- school repositories
- school services
- school status

---

## Module 5 — Notifications

Move:

apps/admin_app/lib/features/notifications/

To:

packages/notifications/lib/

Must preserve:

- notification entities
- notification repositories
- integration services

---

## Module 6 — Shared Core

Extract reusable:

apps/admin_app/lib/core/

To:

packages/shared_core/lib/

Includes:

- constants
- utilities
- validators
- exceptions
- base abstractions

Exclude:

router

theme

UI widgets

---

## Module 7 — Shared UI

Extract reusable:

apps/admin_app/lib/shared/

To:

packages/shared_ui/lib/

Includes:

- reusable widgets
- tables
- cards
- buttons
- badges

Exclude:

screen-specific widgets

---

# Mandatory Migration Rules

---

# Rule 1

Preserve internal folder hierarchy exactly.

No flattening.

---

# Rule 2

Update imports:

FROM:

relative imports

TO:

package imports

Example:

import 'package:auth/...';

---

# Rule 3

Update pubspec.yaml:

Only for:

admin_app

Add package references.

Do not remove existing dependencies.

---

# Rule 4

Update build_runner references if needed.

---

# Rule 5

Update service locator registrations.

Must point to package imports.

No logic changes.

---

# Rule 6

Do NOT modify:

business logic

validation logic

Firebase logic

RBAC rules

tenant rules

---

# Validation Checklist

After extraction:

Run:

flutter pub get

Run:

flutter pub run build_runner build --delete-conflicting-outputs

Run:

flutter analyze

Run:

flutter test

---

# Success Criteria

Wave 1 is complete only if:

✓ all modules moved

✓ imports updated

✓ admin_app compiles

✓ tests pass

✓ no domain behavior changes

✓ packages compile independently

---

# Deliverables

Generate:

1. Wave_1_Extraction_Report.md
2. Wave_1_Import_Migration_Report.md
3. Wave_1_Build_Verification_Report.md
4. Wave_1_Test_Verification_Report.md
5. Wave_1_Certification_Report.md

Save under:

09_Docs/Phase_3_Platform_Integration/Phase_3C_Super_Admin_Layer/

---

# Next Phase

After certification:

Resume:

Phase 3C UI Build

Starting:

Super Admin Dashboard
School Registry
School Detail