# EduPulse Query Cost Optimization Report

## Overview
This report examines Firestore usage patterns to identify unnecessary document fetches, large payload downloads, and overall optimization of billable operations.

## 1. Pagination & Limits
- **Feed**: Hard limits are applied (`limit(params.limit)` defaults to a conservative batch size).
- **Notifications**: Capped dynamically based on user context. Unread queries are highly specific.
- **Leaderboards**: Limited rigidly to the top ranks (e.g. `limit(10)` or `limit(50)`).
- **Conclusion**: There are zero unbounded `.get()` queries or unbounded `.snapshots()` across the entire dashboard architecture. Every multi-document query employs a hard limit.

## 2. Overfetching Prevention
- **Singleton Analytics**: Instead of fetching 1000 daily transaction documents to sum total points, the UI fetches exactly **1 document** (the KPI snapshot).
- **Subcollections vs Global Scans**: Using localized `schools/{schoolId}/*` collections prevents full database scans across different tenants.

## 3. Realtime Payload Constraints
- Stream limits restrict the payload size of initial connections. When a user logs in, they do not download the entire historical activity ledger. They only download the first page, keeping the document read cost directly proportional to the screen size.

## Conclusion
EduPulse operates at an incredibly lean cost margin. By combining strict query limits with pre-aggregated singleton documents, the dashboard generates $O(1)$ read costs for metrics and highly predictable, capped $O(N)$ read costs for feeds and leaderboards, regardless of how large the underlying database grows.
