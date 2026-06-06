# Firestore Security Foundation Summary

## Purpose
To detail the security posture of the EduPulse database. Security rules are the first and last line of defense against unauthorized access and tenant data bleeding.

## Architectural Decisions
- **Default Closed Strategy**: The default state of the database is to deny all reads and writes unless explicitly permitted.
- **Tenant Isolation (`isTenantUser`)**: Security rules validate the custom `schoolId` claim embedded in the user's Auth token against the wildcard `{schoolId}` path parameter.
- **Hierarchical Protection**: Data for a school is completely contained within `/schools/{schoolId}/...`. Protecting the root path protects all subcollections inherently.

## Implementation Details
The `firestore.rules` file in `08_Firebase` contains the following logic:
```javascript
function isAuthenticated() {
  return request.auth != null;
}
function isTenantUser(schoolId) {
  return isAuthenticated() && request.auth.token.schoolId == schoolId;
}
```
Reads and writes to any document inside `/schools/{schoolId}/{document=**}` require `isTenantUser(schoolId)` to evaluate to true.

## Risks Mitigated
- **Cross-Tenant Reads**: If a frontend client maliciously modifies their request to query `schoolId = "competitor_school"`, Firestore will reject the request outright with a `PERMISSION_DENIED` error.
- **Unauthenticated Access**: Guest users cannot read any documents.

## Validation Strategy
- Emulators are heavily utilized. The `firebase-functions-test` SDK will be used in future phases to generate mock tokens (with and without the `schoolId` claim) and assert that Firestore denies reads properly.

## Future Expansion Readiness
- As we introduce Role-Based Access Control (RBAC), we will expand the rules to include `isAdmin()` or `isTeacher()` functions based on custom claims, further restricting writes to sensitive collections like `leaderboards`.
