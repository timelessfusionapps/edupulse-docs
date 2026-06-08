# EduPulse Notifications & Communication Remediation Plan
**Phase:** 2F
**Status:** READY FOR REMEDIATION
**Date:** 2026-06-08

## Background
The Execution Audit for Phase 2F resulted in a **FAIL** verdict. Although tenant isolation boundaries were successfully implemented across the module, all 11 Firebase Datasources rely on empty placeholder stubs (`return null;`) within their `fetch()` methods. This violates the `No Empty Scaffolds` and `No Placeholder Logic` governance rules.

---

## 1. Stub Inventory
The following 11 Firebase Datasource files contain the non-executable stub `return null;` within their `fetch()` method:

1. `apps/admin_app/lib/features/notifications/data/datasources/firebase/firebase_announcement_datasource.dart`
2. `apps/admin_app/lib/features/notifications/data/datasources/firebase/firebase_audit_datasource.dart`
3. `apps/admin_app/lib/features/notifications/data/datasources/firebase/firebase_broadcast_datasource.dart`
4. `apps/admin_app/lib/features/notifications/data/datasources/firebase/firebase_category_datasource.dart`
5. `apps/admin_app/lib/features/notifications/data/datasources/firebase/firebase_communicationgroup_datasource.dart`
6. `apps/admin_app/lib/features/notifications/data/datasources/firebase/firebase_delivery_datasource.dart`
7. `apps/admin_app/lib/features/notifications/data/datasources/firebase/firebase_notification_datasource.dart`
8. `apps/admin_app/lib/features/notifications/data/datasources/firebase/firebase_preference_datasource.dart`
9. `apps/admin_app/lib/features/notifications/data/datasources/firebase/firebase_scheduling_datasource.dart`
10. `apps/admin_app/lib/features/notifications/data/datasources/firebase/firebase_template_datasource.dart`
11. `apps/admin_app/lib/features/notifications/data/datasources/firebase/firebase_whatsapptemplate_datasource.dart`

**Detected Logic:**
```dart
  Future<Entity?> fetch(String schoolId, String id) async {
    if (schoolId.isEmpty) throw Exception('Tenant isolation requires schoolId');
    return null; // <-- STUB DETECTED
  }
```

---

## 2. Remediation Actions
**Datasource Repairs:**
- Remove the `return null;` placeholder from all 11 files.
- Inject concrete, executable Firestore retrieval logic (`FirebaseFirestore.instance.collection('schools').doc(schoolId).collection('...').doc(id).get()`).
- Implement proper document-to-entity mapping parsing for each respective domain entity.

## 3. Repository Impact
- **Verification:** All 11 Repository implementations correctly invoke `datasource.fetch()`. However, because they blindly return the result of the datasource, their outputs are presently corrupted. 
- **Action:** No direct changes to repositories are required, but their integration behavior will drastically change once the datasource yields concrete entities instead of `null`.

## 4. Service Impact
- **Verification:** Services consuming the output of the repositories (e.g., `TemplateService`, `BroadcastService`) currently face critical downstream risks. Receiving a persistent `null` value will cause dynamic group resolution and payload generation workflows to crash.
- **Action:** Post-remediation, services must be verified to ensure they properly handle the newly hydrated entity objects.

## 5. Testing Impact
- **Existing Tests:** Current datasource tests only validate the thrown exception on empty `schoolId`. They must be expanded.
- **New Tests Required:** Tests must be updated to mock or simulate the internal fetching logic to validate that a successful read maps to the correct Entity structure.

## 6. Validation Plan
After executing the remediations, the monorepo must be validated.
**Mandatory Steps:**
```bash
cd /Users/murtazasulaihi/Developer/EduPulse/apps/admin_app
flutter analyze lib/features/notifications test/features/notifications
flutter test test/features/notifications
```

## 7. Certification Impact
Following successful implementation of this Remediation Plan, the system must undergo:
- **Phase 2F Re-Audit:** To verify that all stubs have been permanently erased and executable logic exists.
- **Certification Authorization:** Once the Re-Audit passes cleanly without stubs, the full Certification and Governance Certification reports can finally be drafted.

---

**FINAL VERDICT:**
**READY FOR REMEDIATION**
