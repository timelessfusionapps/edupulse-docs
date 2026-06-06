# Student Bloc Architecture Implementation

## Overview
This document details the internal design and responsibility scope of the `StudentBloc` serving the Student Management module.

## Responsibilities
- **Orchestrator**: Dispatches actions to the `StudentRepository`.
- **State Emitter**: Normalizes domain models into UI-consumable `StudentState` objects.
- **Event Handler**: Maps UI actions (`LoadStudentsRequested`, `StudentsSearchChanged`, `StudentsFilterChanged`, `StudentArchived`, etc.) to specific operations.
- **Stream Subscriber**: Maintains active subscriptions to Firestore snapshots via the Repository.

## Architecture Guidelines
- **Event Isolation**: Each distinct UI action must map to a unique `StudentEvent` to ensure clear auditability of state changes.
- **Immutable State**: `StudentState` must be implemented using `freezed` or `equatable` to enforce immutability.
- **Debouncing**: `StudentsSearchChanged` events should be debounced internally (using libraries like `rxdart`) to prevent excessive read requests.
- **Error Mapping**: Raw Repository errors must be mapped into user-friendly UI error statuses inside the Bloc.