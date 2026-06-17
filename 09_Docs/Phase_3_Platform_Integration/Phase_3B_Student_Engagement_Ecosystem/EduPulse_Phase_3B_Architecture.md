Based on the approved Phase 3B clarification decisions, the certified Phase 3A state, and the EduPulse blueprint vision, the Phase 3B Architecture should establish the engagement ecosystem as a formal platform layer rather than a collection of standalone features.

EduPulse_Phase_3B_Architecture.md

Phase 3B

Student Engagement Ecosystem Architecture

Version: 1.0

Status:

PROPOSED

Prerequisite:

Phase 3A Certified

⸻

Purpose

Phase 3B transforms the certified Phase 3A integration layer into a complete Student Engagement Ecosystem.

The objective is not to build a traditional School ERP.

The objective is not to implement:

* Attendance
* Assessments
* Timetables
* Gradebooks
* LMS Features
* Examination Systems

Instead, Phase 3B operationalizes:

* House System
* Recognition
* Leadership
* Participation
* Contribution
* Student Engagement

as a unified platform capability.

⸻

Architectural Objective

Create a complete engagement ecosystem where:

Events
↓
Participation
↓
Contribution
↓
Recognition
↓
Leadership
↓
Impact

continuously strengthens:

Student Identity
+
House Identity

through measurable participation and contribution.

⸻

Core Architectural Model

Phase 3B adopts a:

DUAL ANCHOR MODEL

Student Profile
        ↔
House Profile

Both entities are first-class platform citizens.

Neither dominates the other.

Every engagement activity contributes to both.

⸻

Primary Domains

Phase 3B consists of:

Student Profile

Authoritative owner:

Student Management

Responsibilities:

* Student Identity
* Participation History
* Recognition History
* Leadership History
* Contribution Metrics
* House Membership

⸻

House Profile

Authoritative owner:

House System

Responsibilities:

* House Identity
* House Membership
* House Leadership
* House Points
* House Impact
* House Analytics

⸻

Recognition

Authoritative owner:

Recognition Domain

Responsibilities:

* Recognition Awards
* Recognition Categories
* Recognition History
* Contribution Attribution

⸻

Leadership

Authoritative owner:

Leadership Domain

Responsibilities:

* Leadership Roles
* Leadership Appointments
* Leadership History
* Leadership Analytics

⸻

Events

Authoritative owner:

Events Domain

Responsibilities:

* Participation Opportunities
* Event Results
* Event Outcomes
* Engagement Triggers

Events become the operational activity engine.

⸻

Student Engagement Flow

Phase 3B establishes the following engagement flow:

Event
↓
Participation
↓
Student Contribution
↓
Recognition
↓
Leadership
↓
House Impact
↓
Analytics
↓
Notifications

Every engagement action must enter the ecosystem through one of:

Participation
Recognition
Leadership

⸻

Recognition Architecture

Phase 3B adopts:

UNIFIED RECOGNITION MODEL

Recognition affects:

Student
+
House

simultaneously.

Example:

Teacher Recognition
↓
Student Recognition
↓
House Recognition

or

Event Achievement
↓
Student Recognition
↓
House Recognition

Recognition may originate from:

* Events
* Teachers
* School Administrators

Recognition is not restricted to event participation.

⸻

Leadership Architecture

Phase 3B adopts:

DUAL LEADERSHIP MODEL

Leadership exists on:

Student Profile
+
House Profile

simultaneously.

Example:

Student View:

House Captain

House View:

Current Captain

Both perspectives remain authoritative.

Leadership history is permanently preserved.

⸻

Participation Architecture

Participation becomes a first-class engagement concept.

Participation creates:

Student Contribution

which propagates to:

Class Contribution

and

House Impact

Participation itself does not equal recognition.

Recognition remains an intentional action.

⸻

Contribution Architecture

Contribution becomes the central engagement metric.

Contribution may be generated from:

* Event Participation
* Event Outcomes
* Recognition
* Leadership Activity

Contribution drives:

Student Contribution Score

which contributes to:

Class Contribution Score

and

House Impact Score

⸻

Class Contribution Layer

Phase 3B introduces:

CLASS CONTRIBUTION

Purpose:

Measure collective student engagement.

Class Contribution is an aggregation layer.

It is not an academic performance layer.

Class Contribution receives engagement signals from:

Students
↓
Participation
↓
Contribution

Schools may choose whether Class rankings are visible.

⸻

House Metrics Architecture

Phase 3B adopts:

DUAL METRIC MODEL

⸻

House Points

Purpose:

Competition

Examples:

* Sports
* Debates
* Competitions
* Event Outcomes

House Points determine:

Competition Leader

⸻

House Impact Score

Purpose:

Engagement

Derived from:

Participation
+
Recognition
+
Leadership
+
Contribution

House Impact determines:

Impact Leader

⸻

Dashboard Architecture

Student Dashboard

Displays:

* Contribution Score
* Participation Activity
* Recognition History
* Leadership Journey
* House Membership
* Engagement Trends

⸻

Parent Dashboard

Displays:

* Child Participation
* Child Contribution
* Recognition History
* Leadership History
* Engagement Trends

Purpose:

Provide visibility into student engagement.

⸻

House Dashboard

Displays:

* House Points
* House Impact Score
* Participation Analytics
* Recognition Analytics
* Leadership Analytics

⸻

School Dashboard

Displays:

* Competition Leader
* Impact Leader
* Participation Trends
* Recognition Trends
* Leadership Trends

⸻

Visibility Architecture

Default Visibility Policy:

Students:

Own Score
Own Growth
Own Participation

Parents:

Child Engagement

Teachers:

Full Visibility

Public:

Class Rankings
House Rankings

No public student rankings by default.

Schools may override visibility policies.

⸻

Notification Architecture

All notifications must pass through:

NotificationIntegrationService

No module may create notifications directly.

System-generated notifications are permitted for:

* Participation Milestones
* Recognition Awards
* Leadership Appointments
* House Achievements

⸻

Analytics Architecture

Phase 3B does not introduce new analytics engines.

Phase 3B consumes:

Participation
Recognition
Leadership
Contribution
House Impact

and feeds existing analytics infrastructure.

⸻

Historical Record Architecture

Recognition:

Permanent.

Archived after academic year closure.

Never deleted.

⸻

Leadership:

Permanent.

Never deleted.

Historical leadership records remain visible.

⸻

Participation:

Permanent.

Used for longitudinal engagement analysis.

⸻

School Governance Integration

Schools may configure:

* Visibility Policies
* Contribution Weighting
* Class Ranking Visibility
* House Impact Visibility

EduPulse provides default values.

Schools may override them.

⸻

Architectural Boundaries

Phase 3B SHALL NOT implement:

* Attendance Systems
* Timetable Systems
* Subject Management
* LMS Features
* Assessments
* Gradebooks
* Examination Systems

These remain permanently out of scope.

⸻

Success Criteria

Phase 3B is considered architecturally complete when:

✓ Student Profiles display engagement history

✓ House Profiles display impact history

✓ Participation contributes to engagement metrics

✓ Recognition updates Student and House records

✓ Leadership updates Student and House records

✓ House Impact Score functions independently of House Points

✓ Parent Dashboards display engagement visibility

✓ Notification Integration remains centralized

✓ Governance controls visibility and weighting

⸻

Final Architectural Statement

Phase 3B establishes EduPulse as a Student Engagement Platform.

The platform measures:

Participation
+
Recognition
+
Leadership
+
Contribution

rather than merely academic outcomes.

Student identity and House identity become interconnected through measurable engagement, enabling schools to promote belonging, contribution, leadership, recognition, and impact at scale.

This architecture is now stable enough that the next artifact should be EduPulse_Phase_3B_Governance.md, which will define scoring rules, weighting rules, visibility controls, milestone behavior, approval workflows, anti-gaming protections, and administrative controls. That governance document will be what ultimately constrains Antigravity’s implementation during Phase 3B.