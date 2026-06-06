# Student Realtime UI Rendering Architecture

## Overview
This document specifies how the UI handles realtime updates emitted by the `StudentBloc` without compromising UX stability or scroll positions.

## Core Architectural Rules
1. **Scroll Stability**: Realtime stream updates must NEVER reset the `ListView` scroll position or jump the viewport.
2. **Flicker Prevention**: Avoid full-screen loading spinners when new data arrives. Loading spinners are reserved for initial loads only.
3. **List Reconciliation**: The UI relies on the Bloc and Repository to accurately reconcile lists using `diffing` principles, ensuring only modified rows are updated visually.
4. **Offline Resilience**: Realtime updates must degrade gracefully into offline mode, rendering cached state without clearing the screen.

## Implementation Guidelines
- Use `ListView.separated` and `ListView.builder` with `physics: NeverScrollableScrollPhysics` inside a stable scrollable parent (`SingleChildScrollView`).
- Identify entities by `studentId` explicitly to ensure Flutter element tree stability.
- Handle `StudentViewStatus.loading` distinctly from `StudentViewStatus.loaded` to prevent wiping the UI during background syncs.