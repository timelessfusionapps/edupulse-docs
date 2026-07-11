# EduPulse Security Rules Contract
Version: 1.0  
Authority Level: Global Security Governance  
Applies To: Entire EduPulse Platform  
Status: Mandatory

---

# 1. Purpose

This document defines the mandatory Firestore Security Rules architecture for EduPulse.

Its purpose is to:

- enforce tenant isolation
- protect sensitive records
- prevent unauthorized reads
- prevent unauthorized writes
- control role escalation
- secure audit trails
- secure financial operations
- secure admin operations
- standardize access policies

This contract must be followed before any Firestore rules deployment.

No collection may exist without rule ownership.

---

# 2. Core Security Principles

EduPulse follows:

---

## Principle 1: Deny by Default

Global rule:

Everything is denied unless explicitly allowed.

Mandatory.

Default:

```javascript
allow read, write: if false;
```

Never allow broad access.

---

## Principle 2: Tenant Isolation First

Every school is an isolated tenant.

Rule:

Users may only access data belonging to their school.

Mandatory check:

```javascript
request.auth.token.school_id == resource.data.school_id
```

Required.

---

## Principle 3: Role-Based Access

Access is role-controlled.

Roles:

- super_admin
- school_admin
- teacher
- student
- parent

Every rule must validate role.

---

## Principle 4: Least Privilege

Users only receive the minimum access needed.

Never broad read.

Never broad write.

---

# 3. Auth Token Contract

Custom claims required:

Mandatory:

```text id="3j7xgv"
uid
role
school_id
permissions
is_active
```

Used in every rule.

No rule should trust client-submitted role fields.

Only token claims.

---

# 4. Role Matrix

---

## Super Admin

Access:

Global.

Can:

- read all schools
- manage all schools
- read audit logs
- manage platform admins
- access compliance queue
- access anomaly flags

Cannot:

- directly mutate immutable audit logs

---

## School Admin

Access:

Own school only.

Can:

- manage students
- manage teachers
- manage classes
- manage fees
- manage attendance

Cannot:

- access other schools
- access platform governance

---

## Teacher

Access:

Restricted.

Can:

- view assigned classes
- mark attendance
- update results

Cannot:

- edit fees
- delete students
- change admin roles

---

## Student

Can:

- read own profile
- read own attendance
- read own results

Cannot:

- modify records

---

## Parent

Can:

- read linked student records

Cannot:

- modify academic or financial data

---

# 5. Global Rule Functions

Mandatory helper functions.

---

## isAuthenticated()

```javascript
return request.auth != null;
```

---

## isSuperAdmin()

```javascript
return request.auth.token.role == "super_admin";
```

---

## belongsToSchool(schoolId)

```javascript
return request.auth.token.school_id == schoolId;
```

---

## isSchoolAdmin()

```javascript
return request.auth.token.role == "school_admin";
```

---

## isTeacher()

```javascript
return request.auth.token.role == "teacher";
```

---

## isStudent()

```javascript
return request.auth.token.role == "student";
```

---

## isParent()

```javascript
return request.auth.token.role == "parent";
```

---

## isActive()

```javascript
return request.auth.token.is_active == true;
```

Mandatory in all write operations.

---

# 6. School Collection Rules

Path:

```text id="gkr37l"
schools/{schoolId}
```

Rules:

Read:

Super Admin OR belongsToSchool()

Write:

Super Admin only

School profile updates:

School Admin only for allowed fields

Forbidden:

full unrestricted writes

---

# 7. Student Rules

Path:

```text id="zlk58e"
schools/{schoolId}/students/{studentId}
```

Read:

- Super Admin
- School Admin (same school)
- Teacher (assigned)
- Student (self)
- Parent (linked)

Write:

- School Admin
- Limited Teacher fields

Delete:

Super Admin only

Hard delete forbidden by School Admin.

---

# 8. Teacher Rules

Path:

```text id="u4f6l5"
schools/{schoolId}/teachers/{teacherId}
```

Read:

Same tenant only

Write:

School Admin

Self-profile:

limited self-update

Forbidden:

salary modification by self

---

# 9. Attendance Rules

Path:

```text id="vm7m0v"
students/{studentId}/attendance/{date}
```

Write:

Teacher (assigned)

Read:

- Teacher
- School Admin
- Student (self)
- Parent (linked)

No delete allowed.

Only archive.

---

# 10. Financial Rules

Critical.

Path:

```text id="6g0c8v"
students/{studentId}/fee_history/{paymentId}
```

Read:

School Admin

Parent (own child)

Super Admin

Write:

Cloud Functions only

Forbidden:

client-side fee writes

Mandatory.

---

# 11. Audit Rules

Path:

```text id="l7m0w2"
audit_logs/{eventId}
```

Read:

Super Admin only

Platform Admin with:

view_audit_logs

Write:

Cloud Functions only

Update:

Forbidden

Delete:

Forbidden

Immutable.

Mandatory.

---

# 12. Compliance Queue Rules

Path:

```text id="8r4vax"
compliance_queue/{incidentId}
```

Read:

Super Admin

Platform Admin:

review_compliance_cases

Write:

Super Admin

Assigned reviewers

Delete:

Forbidden

---

# 13. Anomaly Flags Rules

Path:

```text id="r8uzyl"
anomaly_flags/{anomalyId}
```

Read:

Super Admin

Platform Admin

Write:

Cloud Functions only

Update:

System only

---

# 14. Platform Admin Rules

Path:

```text id="08e0h1"
platform_admins/{adminId}
```

Read:

Super Admin

Platform Admin (self)

Write:

Super Admin only

Role changes:

Super Admin only

Suspension:

Super Admin only

Revoke:

Super Admin only

---

# 15. Notification Rules

Path:

```text id="qzk2dx"
notifications/{userId}/items/{notificationId}
```

Read:

Owner only

Write:

Cloud Functions

Delete:

Owner allowed

TTL recommended.

---

# 16. Sensitive Field Protection

Never client-write:

salary

permissions

role

audit_score

risk_score

financial_status

verification_flags

system_flags

These fields must be server-owned.

---

# 17. Immutable Collections

Collections:

audit_logs

fee_history

salary_records

compliance_queue history

results_finalized

Forbidden:

edit/delete after finalization

Only archive.

---

# 18. Soft Delete Policy

Mandatory for:

students

teachers

schools

Use:

```text id="g0pn7r"
is_deleted
deleted_at
deleted_by
```

Hard delete forbidden except Super Admin.

---

# 19. Query Scope Restrictions

Rules must validate query ownership.

Example:

Teacher must only query assigned classes.

School Admin must only query own school.

Never global query access.

---

# 20. Cloud Function Authority

Mandatory server-side ownership:

- fee processing
- refunds
- salary release
- audit creation
- compliance escalation
- anomaly detection
- permission updates
- admin suspension

Client cannot directly execute these writes.

---

# 21. Testing Contract

Mandatory:

Every rule must have tests.

Required:

allow tests

deny tests

tenant isolation tests

role escalation tests

financial mutation tests

audit immutability tests

No deployment without test coverage.

---

# 22. Verification Checklist

Before deployment:

[ ] deny-by-default enabled
[ ] tenant isolation enforced
[ ] role checks implemented
[ ] auth token claims validated
[ ] immutable collections protected
[ ] sensitive fields server-owned
[ ] Cloud Functions enforced
[ ] cross-school leakage blocked
[ ] financial writes blocked from client
[ ] audit writes blocked from client
[ ] security rule tests written

If any fail:

Deployment blocked.

---

# 23. Enforcement Rule

This contract overrides:

- temporary dev shortcuts
- convenience-based access
- frontend assumptions

Violations require security review.

This document is the Firestore security authority for EduPulse.