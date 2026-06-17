# EduPulse Phase 3B Implementation Design

## Version: 1.0
## Status: PROPOSED

This document provides the implementation design for the Phase 3B Student Engagement Ecosystem, strictly adhering to the additive architecture constraints defined in the Phase 3B Compatibility Refinement Report and Execution Plan.

⸻

## 1. Existing Files to Reuse
The following existing implementations will be reused without restructuring or changing ownership:
*   `features/integration/domain/services/notification_integration_service.dart`
*   `features/events/` (Source of Event Participation)
*   `features/points/` (Source of existing House Points and Recognition foundation)
*   `features/student_leadership/` (Source of Leadership appointments)
*   `features/school_administration/` (School, Class, and House hierarchy foundations)
*   `features/analytics_dashboard/` (Analytics infrastructure)

## 2. Existing Files to Extend
The following entities and configurations will receive additive fields:
*   **Student Profile (`features/student_management/domain/entities/student_entity.dart`):** Add `contributionScore`, `participationHistory` (references), and `contributionAnalytics`. *(Note: If immutability/separation is preferred, this may be achieved via a linked `StudentContributionEntity` extension).*
*   **House Profile (`features/school_administration/domain/entities/house_assignment_entity.dart`):** Add `houseImpactScore` and `impactAnalytics`.
*   **Recognition Entities (`features/points/domain/entities/recognition_entities.dart`):** Add dual-anchor attribution fields (`studentId` AND `houseId`).
*   **Leadership Entities (`features/student_leadership/domain/entities/leadership_assignment_entity.dart`):** Add dual-anchor attribution fields (`studentId` AND `houseId`).
*   **School Configuration (`features/configuration/`):** Extend to include `VisibilityPolicy` and `WeightingPolicy`.

## 3. New Files Required
A new bounded context will be created for Contribution and House Impact.
*   **Contribution Engine:**
    *   `features/contribution/domain/entities/contribution_entity.dart`
    *   `features/contribution/domain/services/contribution_calculation_service.dart`
    *   `features/contribution/data/repositories/contribution_repository_impl.dart`
*   **House Impact Engine:**
    *   `features/house_impact/domain/entities/house_impact_entity.dart`
    *   `features/house_impact/domain/services/house_impact_calculation_service.dart`
    *   `features/house_impact/data/repositories/house_impact_repository_impl.dart`
*   **Dashboards:**
    *   `features/dashboard/presentation/screens/parent_engagement_dashboard.dart`
    *   `features/dashboard/presentation/widgets/contribution_score_card.dart`
    *   `features/dashboard/presentation/widgets/house_impact_card.dart`

## 4. New Entities Required
*   `StudentContributionEntity`: Tracks a student's aggregate contribution score and referenced participation activities.
*   `ClassContributionEntity`: Aggregates contribution scores at the class level.
*   `HouseImpactEntity`: Tracks a House's aggregate impact score derived from all engagement signals.
*   `EngagementWeightingPolicy`: Defines the numerical weights for Participation, Recognition, Leadership, and Outcomes.
*   `EngagementVisibilityPolicy`: Defines the visibility mode (A, B, C, D) for rankings and scores.

## 5. New Repositories Required
*   `ContributionRepository`: Handles CRUD for Student and Class contributions.
*   `HouseImpactRepository`: Handles CRUD for House Impact scores and historical snapshots.

## 6. New Services Required
*   `ContributionCalculationService`: Consumes Participation, Recognition, and Leadership events, applies `EngagementWeightingPolicy`, and calculates the `StudentContributionScore` and `ClassContributionScore`.
*   `HouseImpactCalculationService`: Consumes Participation, Recognition, Leadership, and Contribution, applies weights, and calculates the `HouseImpactScore`.
*   `ParticipationIntegrationService`: Bridges the Events domain output to the Contribution Engine.

## 7. Firestore Additions Required
**Strictly Additive Changes:**
*   `schools/{schoolId}/contributions/{studentId}`: New collection storing `StudentContributionEntity`.
*   `schools/{schoolId}/class_contributions/{classId}`: New collection storing `ClassContributionEntity`.
*   `schools/{schoolId}/house_impacts/{houseId}`: New collection storing `HouseImpactEntity`.
*   `schools/{schoolId}/configuration/engagement_policy`: New document for `EngagementWeightingPolicy` and `EngagementVisibilityPolicy`.
*   Extend `schools/{schoolId}/recognitions/{id}`: Add `houseId` for dual attribution.
*   Extend `schools/{schoolId}/leadership_assignments/{id}`: Add `houseId` for dual attribution.

## 8. Dashboard Modifications Required
*   **Student Dashboard:** Introduce the Contribution Score widget. Add tabs/views for Participation History, Recognition History, and Leadership Journey. Apply Visibility Policies to hide peer rankings if Mode B/C/D is active.
*   **Parent Engagement Dashboard (NEW):** Create a dedicated view displaying the child's Participation, Recognition, Leadership, Contribution, and engagement trends. Ensure this dashboard isolates data to the assigned child only.
*   **House Dashboard:** Introduce the House Impact Score and Analytics widget. Explicitly separate this visually from the House Points (Competition) widget.
*   **School Dashboard:** Introduce the Impact Leader alongside the existing Competition Leader.

## 9. Notification Modifications Required
No changes to the architecture of `NotificationIntegrationService`.
**New Triggers to be added:**
*   Participation Milestones (e.g., "Reached 10 Participations!").
*   Recognition Awards (Triggers to Student and House).
*   Leadership Appointments.
*   House Impact Milestones.

## 10. Integration Points Required
*   **Event Outcome -> Participation:** When an Event is marked completed/approved, it fires an integration event to `ParticipationIntegrationService`.
*   **Participation -> Contribution:** `ParticipationIntegrationService` feeds `ContributionCalculationService`.
*   **Recognition/Leadership -> Contribution & Impact:** Issuing a Recognition or Leadership role triggers both the `ContributionCalculationService` and the `HouseImpactCalculationService` via the Integration layer.

## 11. Testing Strategy
*   **Unit Testing:** Validate `ContributionCalculationService` and `HouseImpactCalculationService` against various `EngagementWeightingPolicy` configurations to ensure correct score aggregation. Validate the Dual-Anchor Model logic.
*   **Integration Testing:** Test the end-to-end flow: Event Approval -> Participation Record -> Contribution Score Update -> House Impact Update.
*   **Security & Isolation Testing:** Validate that Firestore Security Rules enforce tenant isolation on the new `contributions` and `house_impacts` collections. Verify Parent Dashboard queries cannot access unauthorized student data. Verify Visibility Policies (e.g., Class Rankings hidden) are respected at the data-access layer.

## 12. Migration Strategy
*   **Zero-Downtime Additive Migration:** Since Phase 3B introduces entirely new bounded contexts (Contribution and Impact), no existing data needs to be modified or restructured. 
*   **Initialization:** School Configurations will be initialized with EduPulse default Engagement Weighting and Visibility Policies.
*   **Historical Data (Optional):** A backend script may be provided to backfill House Impact and Contribution scores based on previously recorded Phase 2 Recognitions and Leadership assignments, though the system will function securely without it.
