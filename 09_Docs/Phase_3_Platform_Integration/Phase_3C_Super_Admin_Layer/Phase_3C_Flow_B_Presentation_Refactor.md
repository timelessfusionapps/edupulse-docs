# Phase_3C_Flow_B_Presentation_Refactor.md

# EduPulse
## Phase 3C — Flow B Presentation Refactor

Version: 1.0

Status:

APPROVED

Purpose:

Refactor Flow B UI screens to remove inline dynamic placeholders and replace them with presentation-layer ViewModels.

This phase creates the data contract for future runtime binding.

This phase does NOT connect backend data.

---

# Why this phase exists

Current Flow B implementation contains:

inline:

- application IDs
- school names
- dates
- trial windows
- email previews
- capacity summaries
- wizard progress states

These must not remain inside widgets.

They must be extracted into ViewModels.

---

# Scope

Only:

1. Application Queue
2. Application Detail Drawer
3. Create School Wizard
4. Approve Application Modal
5. Clarification Request Modal

No UI redesign.

No routing changes.

No backend binding.

---

# Not Included

Reject Application Modal:

No refactor required.

Its warning text is static.

Leave as-is.

---

# Refactor Rules

Allowed:

Presentation abstraction only.

Forbidden:

UI layout changes

spacing changes

theme changes

routing changes

repository calls

Firestore calls

DI changes

business logic changes

---

# Required Folder Structure

Create:

apps/super_admin_app/lib/features/onboarding/presentation/models/

---

# Required ViewModels

Create:

---

## ApplicationQueueItemVM

Purpose:

Represents one application row.

Fields:

- applicationId
- schoolName
- applicantName
- schoolEmail
- emailVerified
- submittedDate
- status
- region
- requestedCapacity

Must support:

mockList()

---

## ApplicationRiskFlagVM

Purpose:

Risk panel cards.

Fields:

- title
- count
- severity

Must support:

mockList()

---

## ApplicationDetailVM

Purpose:

Application drawer.

Fields:

- applicationId
- schoolName
- schoolType
- board
- country
- city
- adminName
- adminEmail
- mobileNumber
- requestedCapacity
- submittedDate
- status
- trialDuration
- trialEndDate
- featureFlags

Must support:

mock()

---

## WizardDraftStateVM

Purpose:

Wizard draft state.

Fields:

- isSaved
- label
- lastSavedAt

Must support:

mock()

---

## WizardProgressVM

Purpose:

Progress tracker.

Fields:

- completedFields
- totalFields
- progressPercent

Must support:

mock()

---

## ApprovalPreviewVM

Purpose:

Approval modal.

Fields:

- trialDuration
- trialStartDate
- trialEndDate
- capacityOverride
- sendWelcomeEmail

Must support:

mock()

---

## ClarificationPreviewVM

Purpose:

Clarification modal.

Fields:

- emailSubject
- messageBody
- selectedTemplates

Must support:

mock()

---

# Screen Refactors

---

# ApplicationQueueScreen

Replace:

Inline application rows

Use:

List<ApplicationQueueItemVM>

Replace:

Inline risk cards

Use:

List<ApplicationRiskFlagVM>

---

# ApplicationDetailDrawer

Replace:

Inline:

school name

application ID

trial window

feature flags

capacity

Use:

ApplicationDetailVM

---

# CreateSchoolWizardScreen

Replace:

Inline:

Draft Saved

Unsaved Changes

Progress:

2/8 Required Fields Complete

Use:

WizardDraftStateVM

WizardProgressVM

---

# ApproveApplicationModal

Replace:

Inline:

Trial End Preview

Capacity Override

Welcome Email toggle state

Use:

ApprovalPreviewVM

---

# ClarificationRequestModal

Replace:

Inline:

Email subject

Email preview

Template selection state

Use:

ClarificationPreviewVM

---

# Mock Factory Rule

Each VM must support:

.mock()

or:

.mockList()

Mandatory.

No repositories.

No domain entities.

Presentation-only.

---

# Naming Rules

Use:

VM suffix only.

Forbidden:

Entity

DTO

RepositoryModel

DomainModel

---

# Future Runtime Contract

Later:

Repository
→ Domain Entity
→ Mapper
→ ViewModel
→ UI

This phase creates:

ViewModel
→ UI

only.

---

# Validation

Run:

flutter analyze

flutter test

---

# Deliverables

Generate:

1. Phase_3C_Flow_B_Presentation_Refactor_Report.md
2. Phase_3C_Flow_B_VM_Inventory.md
3. Phase_3C_Flow_B_Test_Report.md
4. Phase_3C_Flow_B_Refactor_Certification.md

Save under:

09_Docs/Phase_3_Platform_Integration/Phase_3C_Super_Admin_Layer/

---

# Stop Rule

After refactor:

STOP.

Do not start Flow C.

Do not bind repositories.

Await review.