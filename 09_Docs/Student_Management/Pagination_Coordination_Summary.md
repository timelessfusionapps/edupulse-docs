# Pagination Coordination Summary

## Seamless Pass-through
The Repository itself does NOT store pagination state (cursors or limits). Storing state in the Repository creates extreme complexity during multi-stream or multi-bloc scenarios.

## Flow
1. Bloc manages `StudentPaginationParams` state.
2. Bloc passes `params` to the Repository.
3. Repository passes `params` to the Datasource.
4. Datasource executes cursor boundaries.
5. Repository catches the paginated result, maps it to Entities, and returns it.

This guarantees that the Repository remains stateless, making it infinitely scalable for multiple simultaneous listeners.
