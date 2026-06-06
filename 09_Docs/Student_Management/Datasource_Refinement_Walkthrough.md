# Datasource Refinement Walkthrough

This document highlights the Phase 2 production-grade hardening applied to the Student Management Datasource Layer.

## 1. Extracted Architecture
- `StudentQueryBuilder`: Extracted all `.where()`, `.orderBy()`, and `.startAfter()` chaining into a pure function.
- `StudentFirestoreConverter`: Centralized `fromFirestore`/`toFirestore` serialization logic.
- `StudentQueryValidator`: Centralized runtime validation of pagination cursors and inequality constraints.

## 2. Stream Reconciliation
Implemented `Map<String, StudentModel>` internally within `watchStudents`. This automatically collapses duplicate stream emissions and forces deterministic ordering while preventing full-table rebuilds.

## 3. Offline & Pending States
Created `DatasourceResponse<T>` and `DatasourceMetadata` wrappers. This successfully bubbles up `hasPendingWrites` and `isFromCache` states to the UI layer without leaking the `DocumentSnapshot` or proprietary Firebase internals.

## 4. Tenant Safety
Validated via `student_emulator_attack_test.dart` that cross-tenant access is structurally impossible since `schoolId` injection occurs entirely outside the Datasource's control.
