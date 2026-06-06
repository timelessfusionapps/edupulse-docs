# Student Runtime Bug Log

This document tracks all runtime issues, inconsistencies, and observations discovered during the operational validation phase.

## 1. Active Issues

**Bug-001: Avatar Image Flicker during Rapid Pagination**
- **Description:** When scrolling extremely fast to trigger multiple pagination fetches consecutively, the cached network images for student avatars occasionally flicker briefly as the list shifts.
- **Severity:** Minor (UX only)
- **Affected Area:** `StudentList` -> `StudentAvatar`
- **Reproduction:** Yank the scrollbar to the bottom of the list continuously.
- **Recommended Fix:** Ensure `NetworkImage` or `CachedNetworkImage` retains state properly during list recycling (e.g., using a stable `Key`).
- **Status:** Open

**Bug-002: Offline Banner Animation Delay**
- **Description:** When the network connection drops, the "Offline Mode" banner takes approximately 1.5 seconds to slide down, causing a slight disconnect between the UI state and the actual network state.
- **Severity:** Minor
- **Affected Area:** Main Layout -> Connectivity Listener
- **Reproduction:** Disconnect Wi-Fi while on the student list screen.
- **Recommended Fix:** Reduce the debounce duration in the connectivity state listener to provide more immediate feedback.
- **Status:** Open

## 2. Resolved Issues (Fixed during Validation)

**Bug-003: Unused Imports in UI Widgets**
- **Description:** `student_status.dart` was imported but unused in `student_table_row.dart` and `student_mobile_card.dart`.
- **Severity:** Trivial (Linter Warning)
- **Affected Area:** Desktop & Mobile Widgets
- **Fix Applied:** Removed unused imports to ensure clean `flutter analyze` results.
- **Status:** Closed

## 3. General Observations (Not Bugs)
- **Observation-001:** Initial load of the 1,500 record dataset takes ~0.8s on the emulator. This is well within acceptable limits but should be monitored when scaling to 10k+ records. Pagination chunks of 20 items keep the initial payload light.
- **Observation-002:** The `Hero` animation for navigating to the Student Details page is highly performant, but we should ensure the source and destination image bounds match exactly to avoid layout stretching.
