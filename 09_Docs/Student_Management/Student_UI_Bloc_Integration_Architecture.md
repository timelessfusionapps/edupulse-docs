# Student UI Bloc Integration Architecture

## Overview
This document outlines the strict separation of concerns and integration strategy between the UI components and the `StudentBloc` in the EduPulse application.

## Core Architectural Rules
1. **Unidirectional Data Flow**: UI -> Bloc -> Repository -> Datasource -> Firebase.
2. **Isolation**: UI widgets MUST NEVER directly call Repository or Datasource methods.
3. **Delegation**: All actions (mutations, pagination, filtering, searching) must be dispatched as events to the `StudentBloc`.
4. **State Derivation**: The UI must derive its entire presentation state strictly from the `StudentState` yielded by the `StudentBloc`.

## Component Responsibilities
- **UI Widgets**: Responsible solely for rendering data and capturing user interactions.
- **StudentBloc**: Responsible for orchestrating realtime streams, caching, pagination logic, offline retries, and optimistic UI updates.
- **Repository**: Responsible for resolving cross-datasource concerns and handling stream lifecycles.

## Implementation Guidelines
- Use `BlocProvider` to inject the `StudentBloc` at the route/screen level (`student_management_screen.dart`).
- Pass the Bloc down the widget tree implicitly via `context.read<StudentBloc>()`.
- Dispatch events strictly using the defined `StudentEvent` classes.