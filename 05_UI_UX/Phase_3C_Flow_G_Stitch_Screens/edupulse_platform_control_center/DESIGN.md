---
name: EduPulse Platform Control Center
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf2'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef4ff'
  surface-container: '#e5efff'
  surface-container-high: '#dbe9ff'
  surface-container-highest: '#d4e4fa'
  on-surface: '#0d1c2d'
  on-surface-variant: '#464555'
  inverse-surface: '#233143'
  inverse-on-surface: '#e9f1ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#7e3000'
  on-tertiary: '#ffffff'
  tertiary-container: '#a44100'
  on-tertiary-container: '#ffd2be'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb695'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7b2f00'
  background: '#f8f9ff'
  on-background: '#0d1c2d'
  surface-variant: '#d4e4fa'
typography:
  page-title:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  section-title:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  table-header:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  body-main:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  table-cell:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  mono-data:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  grid_columns: '12'
  max_width: 1440px
  gutter: 24px
  margin: 32px
  table_header_height: 52px
  table_row_height: 72px
  drawer_width: 420px
  sidebar_width: 280px
---

## Brand & Style
The design system is engineered for high-stakes platform governance and administrative oversight. The brand personality is **authoritative, precise, and utilitarian**, designed to instill confidence in Super Admins managing complex educational infrastructures. 

The aesthetic follows a **Corporate / Modern** direction with a focus on high-density information display. It prioritizes clarity over decoration, utilizing a structured layout, a restrained color palette, and a "Flat-Plus" depth model that uses borders rather than shadows to define boundaries. The goal is to minimize cognitive load while maximizing the visibility of critical data points and system statuses.

## Colors
The palette is rooted in a professional "Dark Navy" for structural navigation, providing high contrast against the "Very Light Gray" workspace. 

- **Primary & Navigation:** Indigo 600 serves as the primary action color and active state indicator. 
- **Surface & Borders:** Pure white surfaces are contained by a subtle slate border (#e2e8f0) to create a clean, architectural feel.
- **Semantic Feedback:** A robust status system is used for governance monitoring:
  - **Success (Active):** Green tones for healthy system states.
  - **Warning (Pending):** Orange tones for items requiring review.
  - **High Risk:** Violet tones to distinguish critical security or compliance risks from standard errors.
  - **Danger:** Red 500 for destructive actions or critical system failures.

## Typography
This design system utilizes **Inter** exclusively to ensure maximum legibility at small sizes, which is critical for data-heavy administrative interfaces. 

- **Hierarchy:** Dramatic contrast between Page Titles (32px) and Table Cells (14px) helps orient the user quickly. 
- **Data Tables:** Column headers use a smaller, uppercase, semi-bold style to differentiate from the data itself.
- **Scale:** On mobile/tablet views, the `page-title` should scale down to 24px, while `table-cell` typography remains constant at 14px to maintain readability.

## Layout & Spacing
The layout is **Desktop-first**, optimized for a 1440px width with a fixed-width sidebar and a fluid content area.

- **Grid System:** A 12-column grid with 24px gutters. Content cards should span 3, 4, 6, or 12 columns.
- **Split-View:** For resource management, use a 1/3 to 2/3 split.
- **Drawers:** Contextual details for system logs or user profiles appear in a right-aligned slide-in drawer (420px width), allowing the admin to maintain context of the underlying list.
- **Density:** Spacing is generous within cards (24px padding) but tight between components to ensure high information density.

## Elevation & Depth
This design system avoids shadows to maintain a clean, "digital-paper" feel. Depth is communicated through:
- **Layering:** The background is #f8fafc; surfaces are #ffffff. 
- **Outlines:** All cards and interactive elements use a 1px solid border (#e2e8f0). 
- **Sidebar Depth:** The sidebar uses a deep navy (#0f172a) to visually recede, pushing the content cards forward.
- **Active States:** Active cards or focused inputs use a 2px border of Indigo 600 rather than an elevation change.

## Shapes
The shape language combines structured containers with organic status indicators:
- **Containers:** Content cards and drawers use a 16px (1rem) radius to soften the high-density layout.
- **Controls:** Inputs and buttons follow the 8px (0.5rem) standard radius.
- **Badges/Chips:** Status indicators (Active, Pending, High Risk) must be **Pill-shaped** (full radius) to immediately distinguish them from buttons and other square UI elements.

## Components
- **Data Tables:** Headers must have a #f8fafc background. Rows are 72px tall with 24px horizontal padding to ensure touch/click targets are clear for rapid auditing.
- **Buttons:** Primary buttons are Indigo 600 with white text. Secondary buttons use a slate border and ghost background.
- **Toggle Cards:** Used for permission sets. These are cards containing a label, description, and a right-aligned switch. When the switch is active, the card border changes to Indigo 600.
- **Pill Badges:** Used for status. Text should be uppercase and semi-bold, centered within the pill.
- **Search & Filters:** Positioned globally above tables. Search bars should be full-width or a minimum of 320px, featuring an inset magnifying glass icon.
- **Side Navigation:** Links use #94a3b8 for inactive states. The active state features an Indigo 600 left-accent bar (4px) and white text.