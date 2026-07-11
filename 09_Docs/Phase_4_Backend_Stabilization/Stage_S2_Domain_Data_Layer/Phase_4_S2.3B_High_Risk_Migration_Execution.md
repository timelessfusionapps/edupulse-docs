# Phase 4 — Stage S2.3B
# High-Risk Domain & Data Layer Migration
## Execution Instructions

---

# Objective

Execute the approved high-risk Domain & Data Layer migrations defined in the approved Stage S2 documentation.

This stage completes the canonical Domain Layer before Firestore Architecture Stabilization (Stage S3).

---

# Read First

Before implementation review:

- Phase_4_S1_Backend_Readiness_Assessment.md
- Phase_4_S1_Backend_Stabilization_Roadmap.md
- Phase_4_S2_Domain_Data_Layer_Execution_Architecture.md
- Phase_4_S2_Domain_Data_Layer_Technical_Specification.md
- Phase_4_S2.2_Canonical_Domain_Proposal.md
- Phase_4_S2.3A_Certification.md

These documents form the implementation contract.

Do not regenerate or summarize them.

---

# Scope

Implement ONLY:

- Approved canonical model migrations
- Repository contract normalization
- Approved DTO migrations
- Approved mapper migrations
- Import migration
- Deprecation annotations

Do NOT implement:

- Firestore
- Security Rules
- Cloud Functions
- Event Pipeline
- Recovery
- UI
- Business Logic

---

# Token Efficiency Rules

- Do not regenerate existing inventories.
- Reuse approved documentation.
- Do not create duplicate reports.
- Consolidate implementation details into one Implementation Report.
- Update existing Deferred Register instead of creating a new one.
- Update the Master Deferred Register if new deferred work is identified.
- Generate documentation only after implementation checkpoints.

---

# Execution Order

## Checkpoint 1

Canonical Model Migration

↓

Compile

↓

Continue only if successful.

---

## Checkpoint 2

Repository Contract Migration

↓

Compile

↓

Continue only if successful.

---

## Checkpoint 3

DTO & Mapper Migration

↓

Compile

↓

Continue only if successful.

---

## Checkpoint 4

Import Cleanup

↓

flutter analyze

↓

Fix issues

↓

Generate reports.

---

# Migration Rules

Every migration must include:

- Architectural Benefit
- Breaking Risk
- Migration Complexity
- Migration Confidence Score
- Pilot Priority

If Migration Confidence Score < 80

STOP

Move the item to:

Deferred After TEMS Pilot

Update:

EduPulse_Master_Deferred_Register.md

Continue with remaining work.

---

# Mandatory Compile Gate

Compile after every checkpoint.

If compilation fails:

STOP

Fix only the issue introduced in the current checkpoint.

Do not continue until compilation succeeds.

---

# Reports

Generate only:

- Phase_4_S2.3B_Implementation_Report.md
- Phase_4_S2.3B_Certification.md

Update:

- EduPulse_Master_Deferred_Register.md

Do not generate additional inventories unless new entities are introduced.

---

# Verification

Before certification verify:

✓ All packages compile

✓ flutter analyze passes

✓ No deprecated component removed

✓ Repository contracts compile

✓ DTOs compile

✓ Mappers compile

✓ Pilot Priority maintained

✓ Deferred Register updated

---

# Stop Rule

After certification:

STOP.

Wait for architectural review before beginning Stage S3.