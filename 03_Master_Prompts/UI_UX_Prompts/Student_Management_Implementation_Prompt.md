Read and fully analyze:

1. Antigravity_Master_Prompt_System_V2.md
2. EduPulse_Design_System_V1.md
3. Student_Management_Foundation_Implementation.md
4. Student_Management_UI_Design_Prompt.md
5. Uploaded Student Management Desktop UI screenshots
6. Uploaded Student Management Mobile UI screenshots
7. Existing Dashboard architecture
8. Existing App Shell
9. Existing responsive layout system
10. Existing design token system
11. Existing theme architecture

IMPORTANT:
The UI/UX phase is now finalized and approved.

Your task is:
implement the Student Management UI foundation EXACTLY matching the approved designs.

--------------------------------------------------
IMPLEMENTATION PHASE RULES
--------------------------------------------------

This phase is:
UI FOUNDATION IMPLEMENTATION ONLY.

DO NOT:
- connect Firebase yet
- implement realtime streams yet
- implement repositories yet
- implement backend integration yet
- implement Cloud Functions yet

Use:
temporary mock/demo data ONLY.

The goal:
perfect responsive UI implementation.

--------------------------------------------------
MANDATORY GOALS
--------------------------------------------------

1. Pixel-accurate UI implementation
2. Responsive stability
3. Zero overflow errors
4. Component-driven architecture
5. Design system compliance
6. Tablet/mobile operational UX correctness
7. Future backend integration readiness

--------------------------------------------------
IMPLEMENTATION STRUCTURE
--------------------------------------------------

Implement:

Desktop Components:
- StudentTable
- KPIStrip
- SearchBar
- FilterBar
- PaginationBar
- StudentTableRow
- EmptyStates
- SkeletonRows

Mobile Components:
- StudentCard
- MobileStudentList
- MobileHeader
- MobileFilterSheet
- BottomNavigation
- DrawerNavigation
- MobilePagination

Tablet Components:
- Responsive condensed table layout
- Reduced sidebar width

--------------------------------------------------
IMPORTANT RESPONSIVE RULES
--------------------------------------------------

DO NOT shrink desktop layouts onto mobile.

Desktop:
table-based UX

Mobile:
card-based UX

These MUST be implemented separately.

--------------------------------------------------
RESPONSIVE BREAKPOINTS
--------------------------------------------------

Desktop:
>= 1024px

Tablet:
768px–1023px

Mobile:
<= 767px

MANDATORY VALIDATION:
- 1440px
- 1280px
- 1024px
- 900px
- 768px
- 600px
- 430px
- 390px

--------------------------------------------------
OVERFLOW SAFETY
--------------------------------------------------

CRITICAL REQUIREMENT:

You MUST test:
- RenderFlex overflow
- horizontal clipping
- pagination overflow
- filter overflow
- table overflow
- drawer overlap
- bottom nav overlap

ZERO overflow tolerance.

--------------------------------------------------
DESIGN SYSTEM REQUIREMENTS
--------------------------------------------------

Preserve:
- dark sidebar
- light workspace
- Inter typography
- compact operational density
- grouped filters
- compact KPI strip
- subtle shadows
- compact pagination
- premium SaaS styling

DO NOT:
- increase spacing excessively
- enlarge cards
- add gradients
- redesign layouts
- change operational density

--------------------------------------------------
MOBILE IMPLEMENTATION REQUIREMENTS
--------------------------------------------------

Mobile implementation MUST:
- feel purpose-built
- not auto-scaled
- support touch-friendly actions
- maintain compact density

The mobile drawer should:
match the approved dark navigation design.

Bottom navigation:
must remain compact and operational.

--------------------------------------------------
IMPLEMENTATION ORDER
--------------------------------------------------

Phase A:
Responsive Layout Shell

Phase B:
Desktop Table Components

Phase C:
Mobile Card Components

Phase D:
Tablet Responsive Adjustments

Phase E:
Skeleton / Empty / Error States

Phase F:
Interaction Polish

--------------------------------------------------
MANDATORY TESTING
--------------------------------------------------

Before completion:
run and validate:
- flutter analyze
- flutter test

AND manually verify:
- all breakpoints
- responsive transitions
- overflow safety
- scroll behavior
- drawer behavior
- pagination behavior

--------------------------------------------------
DELIVERABLES REQUIRED
--------------------------------------------------

After implementation:
generate:

1. Student Management UI Walkthrough
2. Responsive Validation Report
3. Overflow Safety Report
4. Component Architecture Summary
5. Mobile UX Summary
6. Tablet UX Summary
7. Design System Compliance Summary

IMPORTANT:
Wait for approval before beginning:
Repository + Firebase integration phase.