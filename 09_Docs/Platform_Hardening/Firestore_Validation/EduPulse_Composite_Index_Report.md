# EduPulse Composite Index Report

## Overview
This report documents the composite index requirements derived from the actual architecture, preventing index bloat while satisfying the query planner for all complex paginated and filtered queries.

## 1. Notification Indexes

The Notifications module supports filtering by `isRead` status and `severity`, combined with chronological `createdAt` sorting.

- **Collection**: `notifications` (Collection Scope)
- **Filters & Sorting**:
  1. `isRead` ASC, `createdAt` DESC
  2. `severity` ASC, `createdAt` DESC
  3. `isRead` ASC, `severity` ASC, `createdAt` DESC
- **Query Purpose**: To power the multi-filtered notification feed for administrators.
- **Index Necessity**: Essential. `where` clauses combined with range `orderBy` fields explicitly demand composite indexes in Firestore.

## 2. Student Indexes

The Students module supports extensive filtering combined with multiple sorting mechanisms.

- **Collection**: `students` (Collection Scope)
- **Filters & Sorting**:
  1. `archiveState` ASC, `createdAt` DESC
  2. `archiveState` ASC, `grade` ASC, `firstName` ASC
- **Query Purpose**: Directory listing, student management, filtering out archived profiles by default.
- **Index Necessity**: Essential. Filtering on `archiveState` combined with chronological or alphabetical sorting requires explicit composite indexes.

## 3. Feed, Leaderboards & Analytics

- **Feed Indexes**: Not required. The feed relies solely on `orderBy('updatedAt', DESC)` and `orderBy('__name__', DESC)`. Both fields align in direction, which is supported by default single-field indexes.
- **Leaderboard Indexes**: Not required. Leaderboards query `orderBy('rank', ASC)` and `orderBy('__name__', ASC)`, supported out of the box.
- **Analytics Indexes**: Not required. Analytics are fetched via direct document reads (`doc('kpis')` or `doc('daily')`).

## Generated Configuration
All necessary indexes have been codified directly into the `firestore.indexes.json` at the root of the Firebase project directory, ensuring deterministic local and production deployment. No unnecessary auto-generated bloat has been included.
