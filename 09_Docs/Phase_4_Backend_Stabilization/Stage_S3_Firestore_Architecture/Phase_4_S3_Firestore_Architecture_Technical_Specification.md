# Phase 4 — Stage S3
# Firestore Architecture Stabilization
## Technical Specification

---

# Phase

Phase 4

---

# Stage

S3

---

# Purpose

This document establishes the permanent engineering standards governing the Firestore architecture of the EduPulse platform.

It defines how data shall be stored, accessed, updated and organized throughout the platform.

This specification applies to every package using Firestore.

---

# Applies To

- Super Admin
- School Admin
- Teacher
- Student
- Parent
- Shared Packages
- Platform Services
- Future Mobile Applications

---

# Guiding Philosophy

Firestore is the persistence layer.

It must remain independent from:

- Business Logic
- Presentation
- Authentication
- Security Rules
- Cloud Functions

Repositories remain the only access point to Firestore.

---

# Firestore Architecture

The architecture follows:

```
UI

↓

Application Services

↓

Repositories

↓

Firestore Converter

↓

Firestore
```

No layer may bypass another.

---

# Collection Ownership

Every collection has exactly one owning repository.

Examples

Schools

↓

SchoolRepository

Students

↓

StudentRepository

Teachers

↓

TeacherRepository

Recognition

↓

RecognitionRepository

Activities

↓

ActivityRepository

No collection may have multiple owners.

---

# Collection Naming

Use

lowercase_snake_case

Examples

schools

students

teachers

recognitions

activities

attendance

notifications

Never use:

camelCase

PascalCase

Abbreviations

---

# Document IDs

Every document shall use one strategy.

Allowed:

- Firestore Auto ID
- UUID
- Canonical Business ID

Do not mix strategies within the same collection.

---

# DTO Storage

Firestore stores DTOs only.

Never:

Domain Models

Entities

Business Services

Widgets

---

# Firestore Converters

Every collection must use Firestore converters.

Repositories must never manually serialize:

Map<String, dynamic>

inside business logic.

Converters must rely on DTOs.

---

# Repository Responsibilities

Repositories define:

- Collection
- Converter
- Read
- Write
- Update
- Delete
- Transactions
- Batch Writes

Repositories must never expose:

Firestore snapshots

Maps

JSON

---

# Read Strategy

Queries must:

- fetch only required documents
- use indexed fields
- avoid full scans
- support pagination where appropriate

Avoid:

client-side filtering

---

# Write Strategy

Writes should use:

- single document writes
- batch writes
- transactions

Choose the smallest valid operation.

---

# Transaction Standard

Use transactions only when:

multiple documents require atomic consistency.

Avoid transactions for independent writes.

---

# Batch Write Standard

Use batch writes for:

- attendance imports
- recognition assignment
- house score updates
- bulk notifications

Avoid multiple sequential writes.

---

# Timestamp Standard

Every persisted entity should define:

createdAt

updatedAt

Optional

deletedAt

archivedAt

Use server timestamps where practical.

---

# Soft Delete

Collections supporting deletion shall prefer:

soft delete

before permanent removal.

Deletion policy:

Active

↓

Deleted

↓

Archived

↓

Purged

Purging belongs to later maintenance stages.

---

# Archive Policy

Historical data should remain accessible.

Examples

Recognition History

Attendance History

Contribution History

Platform Events

Archives remain read-only.

---

# Multi-Tenant Standard

Collections are classified as:

## Platform Collections

Shared globally.

Examples

platform_settings

audit_events

system_notifications

---

## Tenant Collections

schools/{schoolId}/...

Examples

students

teachers

houses

activities

recognition

attendance

---

## User Collections

Scoped to users.

Examples

preferences

device_tokens

drafts

---

# Query Standards

Queries shall:

- use indexes
- avoid collection scans
- support pagination
- limit returned fields

---

# Firestore Index Policy

Every compound query must be documented.

Index requirements shall be maintained in the Firestore Index Plan.

---

# Pilot Implementation Classification

Every finding shall include:

## 🟢 Pilot Priority

Required before TEMS deployment.

Examples

Schools

Students

Teachers

Recognition

Activities

Attendance

Houses

---

## 🔵 Deferred After TEMS Pilot

Examples

Analytics

Executive dashboards

AI collections

Historical archives

Cross-school reporting

Deferred items remain mandatory.

Update:

EduPulse_Master_Deferred_Register.md

---

# Migration Confidence

Every Firestore modification must include:

Migration Confidence Score

95–100

Safe

80–94

Review

60–79

Pause

Below 60

Defer

---

# Token Efficiency

Do not regenerate inventories.

Reuse existing documentation.

Only create documentation when architectural changes occur.

Consolidate findings into existing reports.

---

# Quality Gates

Before certification verify:

✓ Collection ownership defined

✓ Repository ownership verified

✓ DTO converters verified

✓ Tenant boundaries verified

✓ Read patterns standardized

✓ Write patterns standardized

✓ Transactions documented

✓ Batch writes documented

✓ Index requirements documented

✓ Deferred Register updated

---

# Stage Freeze

Stage S2 remains frozen.

Stage S3 may not modify Domain Models, DTOs, Mappers or Repository Contracts.

The persistence layer must adapt to the certified Domain Layer.

---

# Certification Requirements

Stage S3 is certified only when:

✓ Firestore architecture is standardized.

✓ Repository ownership is verified.

✓ Collection hierarchy is documented.

✓ Multi-tenant boundaries verified.

✓ Index plan completed.

✓ Pilot Priority work complete.

✓ Deferred work documented.

---

# Stop Rule

This document defines engineering standards only.

Implementation may begin only after:

- Execution Architecture approved
- Technical Specification approved
- Execution Instructions approved