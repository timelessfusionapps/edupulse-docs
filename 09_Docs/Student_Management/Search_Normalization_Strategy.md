# Search Normalization Strategy

## Problem
Firestore does not natively support robust fuzzy string matching (like "LIKE %query%") without third-party integrations (Algolia/Elasticsearch) which increase operational complexity and cost.

## Strategy
EduPulse implements a tokenized search strategy directly inside the `StudentEntity`.

### Implementation
- `searchKeywords`: A `List<String>` attached to the `StudentEntity` and `StudentModel`.
- **Write Path**: Cloud Functions (or the Repository write logic) will intercept student creation/updates, strip whitespace, lowercase all words (fullName, admissionNumber), and generate string fragments.
- **Read Path**: The frontend `StudentFilterParams` passes `searchQuery`. The repository applies an `arrayContains` or `arrayContainsAny` filter against the `searchKeywords` array.

### Future Expansion
This normalized array sets the foundation for more advanced fuzzy-search compatibility in the future without requiring major schema migrations.
