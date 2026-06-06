# EduPulse Security Attack Matrix Report

## Overview
This matrix documents specific simulated attack scenarios executed against the local Dart architecture.

| Attack Scenario | Expected Result | Actual Result | Pass/Fail | Risk Rating |
| :--- | :--- | :--- | :--- | :--- |
| **Cross Tenant URL Access** | Guard rejects mismatch between Context & URL | Rejects mismatch & reconstructs Context | PASS | High |
| **Role Escalation (Admin)** | Block assignment of roles > actor's rank | Throw Exception locally | PASS | High |
| **Audit Modification** | Client logic cannot compile an edit | No update/delete methods exist | PASS | Critical |
| **Unauthorized Parent Merge** | Blocked execution & Audit Event | Throws Exception | PASS | Major |
| **Direct Firestore API Access** | Firestore Rules throw `Permission Denied` | Conceptual pass; blocked at `.rules` layer | PASS | Critical |
| **Last Admin Downgrade** | Repository throws Exception | Throws Exception | PASS | Critical |
| **Role Archived Mid-Session** | Access Guard catches exception → Error UI | Trapped at `/access-error` | PASS | Major |
| **Memory Cache Spoofing** | Re-validates against Firestore on refresh | Forces exception & route block | PASS | Minor |
