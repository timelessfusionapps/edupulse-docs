# Build_System_Stabilization_Assessment_Prompt.md

# EduPulse
## Build System Stabilization Assessment

Version: 1.0

Status:

ASSESSMENT ONLY

---

# Purpose

Phase 2, Phase 3A and Phase 3B have been certified functionally.

However, repository health is not currently certified due to:

- Build Runner failures
- Missing generated files
- Analyzer failures
- Test compilation failures

The purpose of this assessment is to determine the exact scope of stabilization work required before repository-wide certification.

This is NOT a remediation exercise.

This is NOT an implementation exercise.

This is an assessment and classification exercise only.

---

# Authorized Actions

You MAY:

- Inspect code
- Inspect generated files
- Run analysis tools
- Run build tools
- Inspect dependency trees
- Inspect generated code configuration

---

# Prohibited Actions

You MUST NOT:

- Modify code
- Create code
- Delete files
- Refactor files
- Fix issues
- Generate remediation code
- Regenerate files as a permanent change

Assessment only.

---

# Assessment Output

Generate:

09_Docs/Technical_Debt_and_Stabilization/Build_System_Stabilization/Build_System_Stabilization_Assessment.md

---

# Mandatory Reconciliation

Review:

## Phase 2

- Architecture
- Governance
- Certification

---

## Phase 3A

- Architecture
- Governance
- Certification

---

## Phase 3B

- Architecture
- Governance
- Certification
- Runtime Integration Reports
- Live Workflow Validation Reports

---

## Project State

- EduPulse_Project_State_After_Phase_3A.md
- Phase 3B Certification Reports

---

# Assessment Area 1

## Build Runner Health

Execute diagnostic assessment for:

```bash
flutter pub get
flutter pub run build_runner build --delete-conflicting-outputs
```

Capture:

- Success
- Failure
- Warnings

Identify:

- Missing generators
- Conflicting outputs
- Invalid build.yaml configurations
- Package conflicts

---

# Assessment Area 2

## Generated File Inventory

Inventory:

### Freezed Files

```text
*.freezed.dart
```

### Json Serializable Files

```text
*.g.dart
```

Verify:

For every source file:

```dart
part 'xxx.freezed.dart';
part 'xxx.g.dart';
```

determine:

- Present
- Missing
- Stale
- Invalid

Produce a module-by-module inventory.

---

# Assessment Area 3

## Analyzer Assessment

Execute:

```bash
flutter analyze
```

Classify findings into:

### Category A

Generated File Failures

Examples:

- Missing freezed files
- Missing g.dart files

---

### Category B

Unused Imports

---

### Category C

Deprecated APIs

---

### Category D

Code Quality Warnings

---

### Category E

Actual Code Defects

Examples:

- Type mismatches
- Missing methods
- Invalid references

Provide counts per category.

---

# Assessment Area 4

## Test Suite Assessment

Execute:

```bash
flutter test
```

Classify failures into:

### Compile Failures

---

### Runtime Failures

---

### Assertion Failures

---

### Missing Generated File Failures

Provide counts.

---

# Assessment Area 5

## Dependency Assessment

Inspect:

```yaml
pubspec.yaml
pubspec.lock
```

Identify:

- Version conflicts
- Deprecated packages
- Generator incompatibilities
- Freezed version mismatches
- Json Serializable mismatches

---

# Assessment Area 6

## Module Impact Assessment

Identify affected modules.

For each module classify:

### Phase 2 Certified

### Phase 3A Certified

### Phase 3B Certified

### Legacy / Uncertified

Determine:

- Risk Level
- Stabilization Complexity

---

# Assessment Area 7

## Generated Code Ownership

Determine:

Which domains depend on:

- Freezed
- Json Serializable
- Build Runner

Create ownership matrix.

Example:

| Module | Freezed | Json Serializable | Build Runner |
|----------|----------|----------|----------|

---

# Assessment Area 8

## Repository Health Assessment

Determine:

### Build Health

- Healthy
- Degraded
- Critical

---

### Analyzer Health

- Healthy
- Degraded
- Critical

---

### Test Health

- Healthy
- Degraded
- Critical

---

### Repository Health

- Healthy
- Degraded
- Critical

---

# Assessment Area 9

## Stabilization Risk Assessment

Determine whether stabilization can be performed:

### Option A

Without touching certified domains

---

### Option B

With minor non-breaking changes

---

### Option C

Requires certified domain modifications

Provide recommendation.

---

# Mandatory Deliverables

The report MUST contain:

## Executive Summary

---

## Build Runner Findings

---

## Generated File Inventory

---

## Analyzer Classification Matrix

---

## Test Failure Classification Matrix

---

## Dependency Assessment

---

## Module Impact Matrix

---

## Generated Code Ownership Matrix

---

## Repository Health Verdict

---

## Stabilization Risk Assessment

---

## Recommended Stabilization Strategy

High-level only.

No fixes.

No code.

No implementation steps.

---

# Final Verdict

Choose one:

### A

MINOR STABILIZATION REQUIRED

---

### B

MODERATE STABILIZATION REQUIRED

---

### C

MAJOR STABILIZATION REQUIRED

---

### D

CRITICAL REPOSITORY STABILIZATION REQUIRED

---

# Governance Rule

This assessment must remain diagnostic.

Do NOT create fixes.

Do NOT modify code.

Do NOT generate remediation plans.

Generate only:

Build_System_Stabilization_Assessment.md

Then stop and await review.