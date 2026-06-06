# Repository Boundary Rules

## Immutable Rules
1. **Zero UI Interaction**: The Repository does not format strings, assign colors, or translate text.
2. **Zero Framework Dependency**: The Repository does not import `flutter/material.dart` or `BuildContext`.
3. **Zero Firebase Types**: `DocumentSnapshot`, `FirebaseException`, and `Query` are strictly forbidden inside the Repository.
4. **Stateless Execution**: The Repository must not store Lists of entities or active cursors as class properties. It must remain a stateless pipe.

Violating these boundaries degrades the application into a monolithic, untestable mess.
