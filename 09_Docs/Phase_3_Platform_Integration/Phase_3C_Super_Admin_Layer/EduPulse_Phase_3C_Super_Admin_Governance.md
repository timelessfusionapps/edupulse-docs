# EduPulse_Phase_3C_Super_Admin_Governance.md

# EduPulse
## Phase 3C — Super Admin Governance

Version: 1.0

Status:

APPROVED

Scope:

Super Admin Layer

---

# Governance Purpose

This phase controls tenant creation.

Any failure here affects the whole SaaS system.

This phase must preserve:

- tenant isolation
- RBAC integrity
- certified backend logic

---

# Rule 1 — Tenant Safety First

All school operations must preserve:

schoolId isolation.

No shared tenant data.

Mandatory.

---

# Rule 2 — Read-Only School Oversight

Super Admin may inspect.

Super Admin may not mutate school operations.

School autonomy preserved.

---

# Rule 3 — School Creation Must Be Traceable

Every tenant creation must record:

- creator
- timestamp
- approval source
- assigned admin

---

# Rule 4 — Approval Must Require Verification

No school can be approved without:

✓ email verification

Optional:

website verification.

---

# Rule 5 — School Archival Is Non-Destructive

Archived means:

read-only only.

No deletion.

No data loss.

---

# Rule 6 — Trial Must Be Controlled

Default:

30 days.

Only Super Admin may extend.

---

# Rule 7 — Limit Changes Must Be Audited

Every limit mutation must log:

- who changed
- what changed
- old value
- new value
- reason

---

# Rule 8 — Platform Admin RBAC Must Be Owner-Controlled

Only Owner can:

- create platform admins
- assign permissions
- revoke permissions

No self-escalation.

---

# Rule 9 — Recovery Requires Review

No auto-recovery.

Every recovery:

must be reviewed.

---

# Rule 10 — Communication Must Be Official

Only approved channels:

- email
- in-app notifications
- broadcasts

No unofficial channels.

---

# Rule 11 — Multi-School Ownership Must Preserve Isolation

A master user may own multiple schools.

But active runtime:

must always resolve:

activeSchoolId

before access.

---

# Rule 12 — No Backend Restructuring

Phase 3C may only add:

presentation layer
super admin entities
super admin services

No breaking certified domains.

---

# Rule 13 — Super Admin Audit Is Mandatory

All Super Admin actions:

must remain auditable.

No hidden state.

---

# Certification Requirements

Before certification:

✓ School registration tested

✓ Approval tested

✓ Verification tested

✓ Onboarding tested

✓ Trial tested

✓ Suspension tested

✓ Recovery tested

✓ Audit tested

✓ RBAC tested

✓ Tenant isolation validated