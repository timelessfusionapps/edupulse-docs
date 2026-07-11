# Phase 4 — Stage S2
# Domain & Data Layer Stabilization
## Execution Instructions

---

# Stage

Phase 4

Stage S2

---

# Objective

Execute the Domain & Data Layer Stabilization according to the approved Execution Architecture and Technical Specification.

This stage establishes the canonical data layer for the entire EduPulse platform.

The objective is **standardization**, **normalization**, and **certification**.

It is **NOT** a feature development stage.

---

# Mandatory Documents

Before writing or modifying any code, review:

1. Phase_4_S1_Backend_Readiness_Assessment.md
2. Phase_4_S1_Backend_Defect_Register.md
3. Phase_4_S1_Backend_Stabilization_Roadmap.md
4. Phase_4_S2_Domain_Data_Layer_Execution_Architecture.md
5. Phase_4_S2_Domain_Data_Layer_Technical_Specification.md

Do not begin implementation until all documents have been reviewed.

---

# Implementation Scope

Allowed:

- Domain Models
- DTOs
- Mappers
- Repository Interfaces
- Repository Contracts
- Serialization
- Deserialization
- Folder normalization
- Naming normalization

---

# Out of Scope

Do NOT modify:

- Firestore collections
- Firestore indexes
- Security Rules
- Cloud Functions
- Event Pipeline
- Audit Pipeline
- Recovery Engine
- UI
- Flutter Screens
- Business Logic
- Authentication
- Notifications

If any issue is discovered outside the Stage S2 scope, document it and assign it to the appropriate future stage.

---

# Implementation Rules

## Rule 1

One Business Concept = One Canonical Model.

Duplicate models are prohibited.

---

## Rule 2

Repositories expose Domain Models only.

Never return:

- Map<String, dynamic>
- Firestore snapshots
- Raw JSON

---

## Rule 3

DTOs contain only transport logic.

No business logic.

---

## Rule 4

Mappers perform all conversions.

Repositories must never manually map objects.

---

## Rule 5

No Firestore access outside the Repository layer.

---

## Rule 6

No undocumented breaking changes.

Every breaking change must include:

- Previous implementation
- New implementation
- Reason
- Impact
- Migration strategy

---

## Rule 7

Maintain backward compatibility wherever possible.

If impossible, document the migration path.

---

# Pilot Implementation Classification

Every implementation task must be classified.

## 🟢 Pilot Priority

Required before TEMS deployment.

## 🔵 Deferred After Pilot

Still mandatory.

Must remain documented.

Must be added to:

EduPulse_Master_Deferred_Register.md

Deferred items are never deleted.

---

# Progress Reporting

Implementation must be performed in logical batches.

Suggested order:

1. Domain Models
2. DTOs
3. Mappers
4. Repository Interfaces
5. Repository Implementations
6. Serialization
7. Deserialization
8. Folder normalization
9. Naming normalization

After each batch:

STOP

Generate a progress report.

Wait for review if requested.

---

# Deliverables

Generate:

- Phase_4_S2_Implementation_Report.md
- Phase_4_S2_Model_Inventory.md
- Phase_4_S2_DTO_Inventory.md
- Phase_4_S2_Mapper_Inventory.md
- Phase_4_S2_Repository_Inventory.md
- Phase_4_S2_Breaking_Changes_Register.md
- Phase_4_S2_Deferred_Register.md
- Phase_4_S2_Certification.md

Save all documents in:

09_Docs/
Phase_4_Backend_Stabilization/
Stage_S2_Domain_Data_Layer/

---

# Verification

Before certification, verify:

✓ One canonical model per entity.

✓ One DTO per entity.

✓ One mapper per entity.

✓ Repository contracts standardized.

✓ No raw maps leaked.

✓ No duplicate models.

✓ Naming standards satisfied.

✓ Folder structure normalized.

✓ Pilot Priority assigned.

✓ Deferred Register updated.

✓ Breaking Changes Register complete.

---

# Stop Rule

After implementation:

STOP.

Do not begin Stage S3.

Wait for verification and architectural review.