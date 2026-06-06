# EduPulse Realtime Query Determinism Report

## Overview
This report formally certifies that no query within the EduPulse dashboard ecosystem relies on implicit or unstable sorting mechanisms. 

## 1. The Timestamp Collision Problem
A common failure in realtime feeds occurs when multiple documents are created in the exact same millisecond. If ordered merely by `.orderBy('createdAt')`, Firestore's return order becomes ambiguous, often causing the UI pagination cursors to skip documents or loop infinitely.

## 2. EduPulse Mitigation
- **Feed & Notifications**: Hardcoded enforcement of `.orderBy(FieldPath.documentId, descending: params.descending)` immediately following the chronological sort.
- **Leaderboards**: Hardcoded enforcement of `.orderBy(FieldPath.documentId, descending: false)` immediately following the rank sort.
- **Student Directories**: Abstracted via `StudentQueryBuilder` which forces document ID sorting on every query.

## Conclusion
All list-based components in EduPulse are strictly deterministic. It is mathematically impossible for pagination cursors to slip or duplicate documents due to identical chronological timestamps or identical leaderboard ranks.
