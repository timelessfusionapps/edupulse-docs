# Cursor Pagination Safety Summary

## Problem
Passing raw `DocumentSnapshot` objects from the Datasource layer to the UI violates repository abstraction purity and breaks offline-first workflows (snapshots cannot be reliably serialized to JSON for local caching).

## Solution
EduPulse uses **Cursor Arrays** within `StudentPaginationParams`.

### Architecture
- A cursor is a standard Dart `List<dynamic>`.
- **Format**: `[sortFieldValue, documentId]` (e.g. `[1678829123000, "student_abc123"]`).
- **Safety**: `StudentPaginationParams` enforces an internal getter `hasValidCursor` ensuring the array has exactly 2 elements.

### Offline Readiness
Because the cursor is a primitive array, it serializes perfectly to JSON. This allows pagination states to be saved to local storage, supporting seamless offline caching and reconnect-safe list restoration without relying on proprietary Firebase snapshot objects.
