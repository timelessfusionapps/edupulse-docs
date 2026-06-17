# Legacy_Freezed_Compatibility_Assessment_Prompt.md

# EduPulse
## Legacy Freezed Compatibility Assessment

Version: 1.0

Status:

ASSESSMENT ONLY

---

# Purpose

The Build System Stabilization workstream has successfully completed.

Findings confirmed:

- Build cache corruption resolved
- build_runner functioning correctly
- Generated files successfully regenerated

However:

- Analyzer failures persist
- Test compilation failures persist

Preliminary evidence suggests the root cause is compatibility between legacy Freezed model patterns and the current Dart SDK.

This assessment must determine whether the remaining failures are:

A. A mechanical Freezed compatibility issue

or

B. Multiple unrelated code defects

---

# Authorized Actions

You MAY:

- Inspect source code
- Inspect generated code
- Inspect analyzer output
- Inspect test output
- Inspect Freezed entities
- Classify failures

---

# Prohibited Actions

You MUST NOT:

- Modify source code
- Modify generated code
- Refactor entities
- Execute migrations
- Apply fixes
- Generate remediation code

Assessment only.

---

# Assessment Output

Generate:

09_Docs/Technical_Debt_and_Stabilization/Legacy_Freezed_Compatibility/Legacy_Freezed_Compatibility_Assessment.md

---

# Mandatory Reconciliation

Review:

- Build_System_Stabilization_Assessment.md
- Build_System_Analyzer_Verification_Report.md
- Build_System_Test_Verification_Report.md
- Repository_Health_Validation_Report.md
- Repository_Stabilization_Certification.md

Also reconcile against:

- Phase 2 Certification
- Phase 3A Certification
- Phase 3B Certification

---

# Assessment Area 1

## Error Inventory

Analyze all remaining analyzer errors.

Determine:

- Total errors
- Total warnings
- Total infos

Group by:

- Error Type
- Module
- Root Cause

Produce classification matrix.

---

# Assessment Area 2

## Freezed Pattern Analysis

Inspect affected entities.

Identify usage patterns such as:

```dart
@freezed
class StudentEntity with _$StudentEntity
```

vs

```dart
@freezed
abstract class StudentEntity with _$StudentEntity
```

or

```dart
@freezed
sealed class StudentEntity with _$StudentEntity
```

Determine which pattern is causing failures.

---

# Assessment Area 3

## Root Cause Analysis

Determine:

How many unique root causes exist?

Example:

- Legacy Freezed Syntax
- Missing Mixins
- Invalid Constructors
- Missing Generated Members
- Other

Provide exact counts.

---

# Assessment Area 4

## Module Impact Matrix

Identify affected modules.

Classify:

- Phase 2 Certified
- Phase 3A Certified
- Phase 3B Certified
- Legacy

For each module provide:

- Error Count
- Risk Level
- Compatibility Risk

---

# Assessment Area 5

## Mechanical Migration Feasibility

Determine:

Can remediation be executed mechanically?

Questions:

1. Can changes be automated?
2. Can regex migration be used?
3. Can IDE-assisted migration be used?
4. Are manual changes required?

Classify:

- Fully Automated
- Mostly Automated
- Semi Automated
- Manual

---

# Assessment Area 6

## Runtime Risk Assessment

Determine whether changing:

```dart
class Entity
```

to

```dart
abstract class Entity
```

or

```dart
sealed class Entity
```

would:

- Change runtime behavior
- Change business logic
- Change serialization
- Change Firebase payloads
- Change domain ownership

Provide evidence.

---

# Assessment Area 7

## Certified Domain Impact

Determine:

Will remediation affect:

- Phase 2 Certification
- Phase 3A Certification
- Phase 3B Certification

Classify:

- No Impact
- Low Impact
- Medium Impact
- High Impact

---

# Assessment Area 8

## Rollback Assessment

Determine:

If remediation fails:

- Can rollback be automated?
- Can rollback be performed through Git?
- Is data risk present?

Provide recommendation.

---

# Assessment Area 9

## Remediation Scope Estimation

Estimate:

- Files affected
- Modules affected
- Expected remediation effort
- Expected validation effort

Do NOT provide fixes.

Estimate only.

---

# Mandatory Deliverables

The report MUST contain:

## Executive Summary

## Analyzer Error Classification Matrix

## Freezed Pattern Analysis

## Root Cause Analysis

## Module Impact Matrix

## Mechanical Migration Feasibility

## Runtime Risk Assessment

## Certified Domain Impact Assessment

## Rollback Assessment

## Remediation Scope Estimate

## Risk Matrix

## Recommendation

---

# Final Verdict

Choose one:

### A

SAFE AUTOMATED REMEDIATION

### B

SAFE SEMI-AUTOMATED REMEDIATION

### C

HIGH-RISK REMEDIATION

### D

REQUIRES ARCHITECTURAL REVIEW

---

# Governance Rule

Do NOT fix anything.

Do NOT modify code.

Do NOT generate remediation code.

Generate only:

Legacy_Freezed_Compatibility_Assessment.md

Then stop and await review.