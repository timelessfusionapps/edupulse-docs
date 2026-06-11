# EduPulse Student Clubs, Councils & Advanced Leadership Remediation Plan

## Document Information

| Field | Value |
|---------|---------|
| Module | Phase 2H – Student Clubs, Councils & Advanced Leadership |
| Document Type | Remediation Plan |
| Status | Mandatory Remediation Required |
| Trigger Source | Execution Audit Failure |
| Audit Verdict | FAIL |

---

# 1. Purpose

This document defines all remediation work required before Phase 2H may proceed to Certification Readiness Review.

The purpose is to eliminate:

- Build failures
- Analyzer failures
- Test failures
- Placeholder implementations
- Mock logic
- Incomplete UI implementations

No certification activities may proceed until every remediation item in this document has been completed and independently verified.

---

# 2. Root Cause Summary

The Execution Audit identified three categories of failure:

## Category A – Build Generation Failure

Symptoms:

- Missing *.freezed.dart files
- Missing generated implementations
- Undefined getters
- Missing copyWith methods

Impact:

- flutter analyze = FAIL
- flutter test = FAIL

Severity:

CRITICAL

---

## Category B – Mock Business Logic

Symptoms:

- ClubBloc contains mock loading logic
- Repository-backed workflows not connected

Impact:

- Feature not operational
- Violates implementation requirements

Severity:

CRITICAL

---

## Category C – Placeholder Screens

Symptoms:

- 8 screens exist only as placeholder scaffolds
- Center(Text(...)) placeholders
- No repository interaction
- No Bloc integration

Impact:

- Feature not usable

Severity:

CRITICAL

---

# 3. Build Generation Remediation

## Objective

Achieve:

flutter analyze = PASS

flutter test = PASS

---

## Required Actions

### Step 1

Audit all files using:

- freezed
- json_serializable
- build_runner

---

### Step 2

Identify every missing generated file:

Examples:

- *.freezed.dart
- *.g.dart

---

### Step 3

Execute:

dart run build_runner build --delete-conflicting-outputs

---

### Step 4

Verify generated files physically exist.

---

### Success Criteria

All generated files exist.

No undefined getter errors remain.

No copyWith errors remain.

---

# 4. ClubBloc Remediation

## Current Failure

ClubBloc contains:

Mock loading logic

Placeholder state transitions

No datasource integration

---

## Required Remediation

ClubBloc must:

### Read Clubs

Retrieve club list from repository.

---

### Create Clubs

Create club through service layer.

---

### Archive Clubs

Archive club through repository.

---

### Load Memberships

Load memberships through repository.

---

### Error Handling

Implement:

- Loading
- Success
- Failure

states.

---

### Success Criteria

No mock data.

No hardcoded loading.

No fake state transitions.

Repository-backed functionality only.

---

# 5. Screen Remediation

The following screens must be audited individually.

---

## Club List Screen

Current State:

Placeholder

Required:

- Load clubs
- Search clubs
- Filter by category
- Navigate to details

---

## Club Details Screen

Current State:

Placeholder

Required:

Display:

- Club Name
- Category
- Coordinators
- Active Members
- Status

---

## Club Membership Management Screen

Current State:

Placeholder

Required:

- Add Member
- Remove Member
- View Membership History

---

## Council Overview Screen

Current State:

Placeholder

Required:

Display:

- Academic Year
- Active Council Members
- Historical Members

---

## Council Membership Management Screen

Current State:

Placeholder

Required:

- Add Member
- Remove Member
- View History

---

## Leadership Dashboard Screen

Current State:

Placeholder

Required:

Display:

- Head Boy
- Head Girl
- Sports Captain

for selected academic year.

---

## Leadership Assignment Screen

Current State:

Placeholder

Required:

- Assign Leadership
- Replace Leadership
- View History

---

## House Prefect Management Screen

Current State:

Placeholder

Required:

- View House Prefects
- Assign Prefects
- Remove Prefects
- View Historical Assignments

---

# 6. History Preservation Verification

Must verify:

## Club Membership History

Supports:

- Join
- Leave
- Rejoin

Records must be immutable.

---

## Council Membership History

Supports:

- Assignment
- Removal

Records must be immutable.

---

## Leadership History

Supports:

- Assignment
- Replacement
- Expiry

Records must be immutable.

---

## House Prefect History

Supports:

- Assignment
- Removal
- Academic Year Expiry

Records must be immutable.

---

# 7. Academic Year Expiry Verification

Verify implementation exists for:

### Head Boy

Automatic expiry.

---

### Head Girl

Automatic expiry.

---

### Sports Captain

Automatic expiry.

---

### House Prefects

Automatic expiry.

---

### Council Memberships

Automatic expiry.

---

### Success Criteria

Active assignments close.

Historical records remain intact.

---

# 8. Validation Verification

Verify validators enforce:

### Leadership Capacity

Exactly:

- 1 Head Boy
- 1 Head Girl
- 1 Sports Captain

per Academic Year.

---

### House Prefects

Unlimited capacity.

No singleton enforcement.

---

### Club Membership

Prevent duplicate active memberships.

Allow historical rejoin.

---

# 9. Analyzer Remediation

Execute:

flutter analyze

after all remediation.

---

### Success Criteria

PASS

0 Errors

0 Warnings

---

# 10. Test Remediation

Execute:

flutter test

after all remediation.

---

### Success Criteria

PASS

All tests passing.

No skipped failures.

No compilation failures.

---

# 11. Re-Audit Gate

No Certification Readiness Review may begin until:

- Build Generation PASS
- Analyzer PASS
- Tests PASS
- Placeholder Screens Removed
- Mock Logic Removed
- History Verified
- Expiry Logic Verified

---

# 12. Remediation Completion Verdict

Phase 2H may only proceed to Re-Audit when every item in this document has been physically implemented and verified.