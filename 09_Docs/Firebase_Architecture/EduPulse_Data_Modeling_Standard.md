# EduPulse Data Modeling Standard
Version: 1.0  
Authority Level: Global Data Architecture  
Applies To: Entire EduPulse Platform  
Status: Mandatory

---

# 1. Purpose

This document defines the Firestore data modeling standards for EduPulse.

Its purpose is to:

- standardize collection design
- prevent oversized documents
- reduce read amplification
- improve query performance
- maintain tenant isolation
- reduce duplication risks
- improve backend maintainability
- prepare for scale

This document governs:

- Firestore collections
- subcollections
- document schemas
- references
- archival patterns
- index strategy

No module may violate this standard.

---

# 2. Core Principles

EduPulse follows:

---

## Principle 1: Tenant Isolation First

Every school is a tenant.

Rule:

No school data may exist outside its tenant scope.

Required:

```text
schools/{schoolId}/...
```

Forbidden:

global_students  
global_attendance  
global_fees

Reason:

prevents cross-tenant leakage.

---

## Principle 2: Query by Ownership

Data must live closest to its owner.

Examples:

Student attendance belongs under student.

Fee history belongs under student.

Admin audit belongs under admin.

---

## Principle 3: Read Cheap, Write Smart

Prefer:

small duplicated summary data

Avoid:

heavy cross-collection joins

Firestore is read-expensive.

Optimize for reads.

---

# 3. Global Collection Naming Standard

Rules:

- lowercase only
- plural nouns only
- snake_case allowed
- no camelCase collections

Correct:

schools  
students  
teachers  
audit_logs  
fee_payments

Forbidden:

SchoolData  
StudentList  
AuditLogsData

---

# 4. Top-Level Collections

Allowed top-level:

schools  
platform_admins  
audit_logs  
global_metrics  
notifications  
system_configs  
compliance_queue  
anomaly_flags

Rule:

Only platform-wide entities may exist at root.

Everything else belongs under schools.

---

# 5. School Tenant Structure

Mandatory:

schools/{schoolId}

Contains:

school_profile  
academic_years  
students  
teachers  
classes  
sections  
attendance  
fees  
exams  
results  
inventory  
communications

Standard:

```text
schools/{schoolId}/students/{studentId}
schools/{schoolId}/teachers/{teacherId}
schools/{schoolId}/classes/{classId}
```

All school data must stay inside tenant boundary.

---

# 6. Subcollection Rules

Use subcollections only when:

- child data grows independently
- child needs independent pagination
- child is frequently queried separately

Allowed:

students/{id}/attendance

students/{id}/fee_history

students/{id}/remarks

teachers/{id}/salary_records

Forbidden:

massive embedded arrays

Reason:

array growth increases document size.

---

# 7. Document Size Limits

Firestore hard limit:

1MB

EduPulse soft limit:

100KB

Mandatory warning:

If document > 50KB

Review required.

Forbidden:

large embedded histories

large embedded audit arrays

large embedded fee arrays

large embedded attendance arrays

Move into subcollections.

---

# 8. Denormalization Rules

Allowed when:

improves read speed

Examples:

Student document:

class_name  
section_name  
school_name

Store snapshots of frequently displayed data.

Forbidden:

deep chained lookups

Rule:

controlled duplication is allowed.

Uncontrolled duplication is forbidden.

---

# 9. Parent-Child Modeling Rules

Parent owns child lifecycle.

Examples:

Student owns:

attendance  
fee_history  
discipline_records

Teacher owns:

salary_records  
performance_reviews

Admin owns:

role_history  
access_logs

Rule:

Deleting parent must consider child cleanup.

Prefer archive before delete.

---

# 10. Reference Rules

Use references only for:

cross-module links

Examples:

class_id  
teacher_id  
invoice_id

Avoid:

deep nested references

Maximum chain:

2 levels

Forbidden:

multi-hop reference trees.

---

# 11. Summary Document Pattern

Required for:

dashboard metrics

Examples:

schools/{id}/metrics/current

audit_metrics/current

fees_summary/current

attendance_summary/today

Purpose:

avoid collection scans.

Mandatory.

---

# 12. Historical Data Pattern

Split:

active + archive

Example:

students/{id}/attendance_active

students/{id}/attendance_archive

Fees:

fee_history_active

fee_history_archive

Reason:

prevents expensive active reads.

---

# 13. Audit Data Model

Global only.

Root collection:

audit_logs

Structure:

audit_logs/{eventId}

Fields:

actor_id  
actor_role  
event_type  
severity  
resource_type  
resource_id  
timestamp  
school_id  
status

Rule:

audit logs are immutable.

No edits allowed.

---

# 14. Compliance Queue Model

Root:

compliance_queue/{incidentId}

Contains:

audit_ref  
assigned_to  
priority  
status  
deadline  
resolution_notes

Short-lived operational queue.

---

# 15. Anomaly Flags Model

Root:

anomaly_flags/{anomalyId}

Contains:

source  
pattern_type  
severity  
affected_entities  
created_at  
resolved_at

Purpose:

derived intelligence only.

Never raw logs.

---

# 16. User Profile Model

Separate collections:

students  
teachers  
admins

Never mix user types.

Forbidden:

single users collection for all.

Reason:

security and query simplicity.

---

# 17. Financial Modeling Rules

Fees:

students/{id}/fee_history/{paymentId}

Invoices:

students/{id}/invoices/{invoiceId}

Scholarships:

students/{id}/scholarships/{scholarshipId}

Mandatory:

immutable payment history

Never overwrite payment records.

---

# 18. Attendance Modeling Rules

Daily pattern:

students/{id}/attendance/{date}

Document ID:

YYYY-MM-DD

Reason:

fast direct access.

Forbidden:

single giant attendance document.

---

# 19. Exam Modeling Rules

Structure:

schools/{schoolId}/exams/{examId}

results:

exams/{examId}/results/{studentId}

Reason:

queryable per exam.

---

# 20. Notification Modeling Rules

Root:

notifications/{userId}/items/{notificationId}

Short retention.

TTL:

30 days

---

# 21. Archive Rules

Must archive:

audit_logs > 90 days

fees > 2 years

attendance > academic closure

old notifications > 30 days

Use:

Cloud Storage  
BigQuery

Not Firestore.

---

# 22. Indexing Standards

Required indexes:

school_id + created_at

student_id + academic_year

severity + timestamp

status + deadline

class_id + section_id

fee_status + due_date

Rule:

all compound filters must have indexes pre-planned.

---

# 23. Forbidden Patterns

Forbidden:

deep nesting > 3 levels

massive arrays

mixed user collections

global tenant data leakage

document blobs

full historical embedding

unbounded subcollections

cross-school references

duplicated audit histories

---

# 24. Multi-Tenant Security Rules

Every document must include:

school_id

Mandatory for:

students  
teachers  
fees  
attendance  
results  
communications

Security rules must validate:

request.auth.school_id == resource.school_id

Required.

---

# 25. Verification Checklist

Before creating a collection:

[ ] Is it inside correct tenant?
[ ] Is root collection justified?
[ ] Can it exceed 100KB?
[ ] Should it be subcollection?
[ ] Does it need pagination?
[ ] Is summary doc needed?
[ ] Is archive strategy defined?
[ ] Are indexes defined?
[ ] Is tenant isolation enforced?
[ ] Is parent-child ownership clear?

If any answer is NO:

Design blocked.

---

# 26. Enforcement Rule

This standard overrides:

- developer shortcuts
- temporary schema hacks
- convenience-based collection design

Violations require architecture review.

This document is the Firestore data structure authority for EduPulse.