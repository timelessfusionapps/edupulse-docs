# Phase 3C Flow B ViewModel Inventory

The following ViewModels have been implemented under `apps/super_admin_app/lib/features/onboarding/presentation/models/`:

1. **`ApplicationQueueItemVM`**
   - **Purpose:** Represents one application row in the Application Queue screen.
   - **Fields:** `applicationId`, `schoolName`, `applicantName`, `schoolEmail`, `emailVerified`, `submittedDate`, `status`, `region`, `requestedCapacity`
   - **Mock Factory:** `mockList()`

2. **`ApplicationRiskFlagVM`**
   - **Purpose:** Represents the risk panel metric cards.
   - **Fields:** `title`, `count`, `severity`
   - **Mock Factory:** `mockList()`

3. **`ApplicationDetailVM`**
   - **Purpose:** Backs the application detail drawer.
   - **Fields:** `applicationId`, `schoolName`, `schoolType`, `board`, `country`, `city`, `adminName`, `adminEmail`, `mobileNumber`, `requestedCapacity`, `submittedDate`, `status`, `trialDuration`, `trialEndDate`, `featureFlags`
   - **Mock Factory:** `mock()`

4. **`WizardDraftStateVM`**
   - **Purpose:** Represents the save draft state in the create school wizard.
   - **Fields:** `isSaved`, `label`, `lastSavedAt`
   - **Mock Factory:** `mock()`

5. **`WizardProgressVM`**
   - **Purpose:** Represents the progress tracker in the wizard.
   - **Fields:** `completedFields`, `totalFields`, `progressPercent`
   - **Mock Factory:** `mock()`

6. **`ApprovalPreviewVM`**
   - **Purpose:** Provides preview data for the approve application modal.
   - **Fields:** `trialDuration`, `trialStartDate`, `trialEndDate`, `capacityOverride`, `sendWelcomeEmail`
   - **Mock Factory:** `mock()`

7. **`ClarificationPreviewVM`**
   - **Purpose:** Provides preview data and template lists for the clarification request modal.
   - **Fields:** `emailSubject`, `messageBody`, `selectedTemplates`
   - **Mock Factory:** `mock()`
