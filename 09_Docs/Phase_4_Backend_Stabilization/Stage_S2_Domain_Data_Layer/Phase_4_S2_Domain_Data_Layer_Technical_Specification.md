# Phase 4 — Stage S2
# Domain & Data Layer Stabilization
## Technical Specification

---

# Phase

Phase 4

---

# Stage

Stage S2

---

# Document Purpose

This document establishes the permanent engineering standards governing the Domain & Data Layer of the EduPulse platform.

It defines the canonical implementation rules for:

- Domain Models
- DTOs
- Mappers
- Repository Contracts
- Serialization
- Deserialization
- Entity Ownership
- Naming Standards

This specification becomes mandatory for all future backend development.

---

# Scope

Applies to every module within EduPulse including:

- Super Admin
- School Admin
- Teacher
- Student
- Parent
- Public Display
- Platform Services
- Cloud Functions
- Event Pipeline
- Recovery Services
- Analytics
- AI (Future)

---

# Engineering Philosophy

EduPulse follows a strict layered architecture.

```
Presentation Layer
        │
Application Layer
        │
Repository Layer
        │
Mapper Layer
        │
DTO Layer
        │
Firestore
```

No layer may bypass another.

---

# Domain Model Standard

The Domain Model represents the business entity.

It is the single source of truth.

A Domain Model:

- contains business meaning
- is immutable where practical
- contains no Firestore code
- contains no serialization logic
- contains no UI logic
- contains no repository logic

Domain Models must never import Firestore libraries.

---

# DTO Standard

DTOs exist only for transporting data.

DTOs:

- represent stored data
- contain serialization
- contain deserialization
- contain no business rules
- contain no validation
- contain no UI logic

Every DTO must support:

- fromJson()
- toJson()

No additional business behaviour.

---

# Mapper Standard

Every Domain Model must have a dedicated Mapper.

Responsibilities:

DTO

↓

Domain

Domain

↓

DTO

Only Mappers perform these conversions.

Repositories may never perform manual mapping.

---

# Repository Standard

Repositories expose Domain Models only.

Repositories must never expose:

Map<String, dynamic>

Firestore Documents

Snapshots

Raw JSON

Repositories abstract the persistence layer.

Consumers must not know whether data originates from:

- Firestore
- Local Cache
- Mock Data
- REST API
- Future AI Service

---

# Firestore Isolation Rule

Firestore must remain isolated.

Only:

DTOs

Repositories

Mappers

may communicate with Firestore.

Presentation Layer must never access Firestore directly.

---

# Serialization Standard

Serialization occurs only inside DTOs.

Never:

Domain Models

Repositories

Widgets

Controllers

---

# Deserialization Standard

Deserialization occurs only inside DTOs.

Never:

Widgets

Repositories

Business Services

---

# Naming Standards

## Domain Models

Suffix

None

Examples

School

Student

Teacher

House

Activity

Award

Notification

---

## DTOs

Suffix

Dto

Examples

SchoolDto

StudentDto

TeacherDto

ActivityDto

---

## Mappers

Suffix

Mapper

Examples

SchoolMapper

TeacherMapper

AwardMapper

---

## Repositories

Suffix

Repository

Examples

SchoolRepository

TeacherRepository

HouseRepository

---

## Repository Interfaces

Prefix

I

Examples

ISchoolRepository

IStudentRepository

ITeacherRepository

---

# Folder Structure Standard

Example

```
school/

domain/

    school.dart

dto/

    school_dto.dart

mapper/

    school_mapper.dart

repository/

    school_repository.dart

```

Every feature follows this structure.

---

# Entity Ownership

Every business concept has one canonical owner.

Example

Student

Owned by

Student Domain

Not duplicated elsewhere.

House

Owned by

House Domain

Never recreated in Activities.

Avoid duplicate entity definitions.

---

# Validation Rules

Validation belongs in:

Application Services

or

Business Services

Never inside DTOs.

Never inside Mappers.

---

# Equality

Every Domain Model must support value equality.

Recommended:

Equatable

or equivalent.

---

# Immutability

Prefer immutable models.

Use:

copyWith()

instead of mutation.

---

# Null Safety

Nullability must be explicit.

Avoid nullable fields unless genuinely optional.

Never use dynamic unless absolutely unavoidable.

---

# Repository Contracts

Every Repository must define:

Create

Read

Update

Delete

Search

List

Watch

Exists

Pagination (where applicable)

Repositories should return typed objects only.

---

# Error Handling

Repositories return:

Result

Either

Failure

or project standard wrapper.

Avoid throwing raw exceptions across layers.

---

# Logging

Repositories do not log business events.

Business Services generate events.

Audit logging belongs to Stage S5.

---

# Performance

Repositories should:

batch reads

batch writes

avoid N+1 queries

avoid duplicate mapping

avoid unnecessary object creation

Performance optimization belongs to Stage S3.

---

# Pilot Implementation Classification

Every implementation item must include:

## 🟢 Pilot Priority

Required before TEMS deployment.

Examples

Student DTO

Teacher DTO

Activity Mapper

House Repository

Authentication Models

---

## 🔵 Deferred After Pilot

Examples

Executive Aggregation DTO

Analytics Models

AI Contracts

Cross-School Reporting

Predictive Models

Deferred items remain mandatory.

They must be added to:

EduPulse_Master_Deferred_Register.md

---

# No Silent Breaking Changes

This rule is mandatory.

If any Model

DTO

Mapper

Repository Contract

changes,

the implementation must document:

- What changed
- Why
- Impacted modules
- Backward compatibility
- Migration strategy

No undocumented breaking changes are permitted.

---

# Dependency Chain

Stage S2 produces the contracts required for:

Stage S3

Firestore

↓

Stage S4

Security Rules

↓

Stage S5

Event Pipeline

↓

Stage S6

Cloud Functions

↓

Stage S7

Recovery

↓

Stage S8

Executive Aggregation

↓

School Admin

↓

Teacher App

↓

Parent App

---

# Certification Requirements

Stage S2 is certified only when:

✓ Every entity has one Domain Model

✓ Every entity has one DTO

✓ Every entity has one Mapper

✓ Every Repository exposes Domain Models only

✓ No raw Firestore Maps leak outside repositories

✓ Naming standards are satisfied

✓ Folder structure is standardized

✓ Pilot Priority assigned

✓ Deferred items documented

✓ No undocumented breaking changes

---

# Deliverables

This specification governs all implementation performed during Stage S2.

Any deviation must be documented and approved before implementation.

---

# Stop Rule

This document defines engineering standards only.

No implementation shall begin until this specification has been reviewed and approved.