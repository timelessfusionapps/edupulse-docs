# EduPulse Parent Linking Governance Report

## Overview
This document outlines the strict rules and workflows surrounding Parent creation, matching, linking, and data merging, as enforced by `ParentRepositoryImpl`.

## 1. Parent Matching Rules
Automatic parent linking is strictly prohibited to prevent data leakage from shared email addresses or recycled mobile numbers.
- **Search Boundaries**: The system runs `findPotentialMatches` scanning uniquely for `email` and `mobileNumber` within `userType: 'Parent'`.
- **Review Layer**: The matching results are presented to the School Admin. They serve as recommendations, not auto-commits. 

## 2. Parent Linking Rules
- **Explicit Confirmation**: The link is only written via `linkStudent` after the Admin confirms the identity.
- **Data Model**: The schema enforces a `childStudentIds` array within the `ParentEntity`, supporting one Parent referencing multiple Children seamlessly.
- **Future Expansion**: The structure allows multiple parent profiles to harbor the same `studentId`, laying the groundwork for a Future Multi-Parent Support UI without requiring a schema migration.

## 3. Parent Merge Rules & Rollback Auditing
When duplicate Parent accounts occur, they can be merged.
- **Operation**: `mergeParents(primary, secondary)`. The `childStudentIds` from the secondary parent are merged uniquely into the primary parent.
- **Archival**: The secondary parent is immediately marked `isArchived: true`.
- **Merge Audit Record**: A highly specialized `ParentMerged` audit event is dispatched targeting `entityType: 'MergeHistory'`. It permanently stores the `oldValue` (secondary IDs, original children lists) and `newValue` (merged children). This ensures that a rollback process can be safely programmed in the future if a merge was performed in error.
