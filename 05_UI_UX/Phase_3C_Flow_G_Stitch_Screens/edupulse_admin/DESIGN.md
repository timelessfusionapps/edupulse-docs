---
name: EduPulse Admin
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#464555'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
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
  tertiary: '#3a495f'
  on-tertiary: '#ffffff'
  tertiary-container: '#516177'
  on-tertiary-container: '#ccdcf7'
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
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  section-gap: 32px
  container-padding: 24px
  stack-space: 16px
  inline-space: 12px
  sidebar-width: 260px
  max-content-width: 1440px
---

## Brand & Style

The design system is engineered for high-density administrative workflows within the education sector. It balances institutional reliability with the modern efficiency of an enterprise SaaS platform. The aesthetic is rooted in **Minimalism** and **Corporate Modernism**, prioritizing information architecture over decorative elements.

The interface evokes a sense of calm authority and precision. It utilizes a structured "Card-on-Surface" model to categorize complex data sets into digestible modules. The key differentiator is the use of high-contrast structural anchors—specifically the dark navigation rail—to provide a stable orientation point for users managing high volumes of academic and operational data.

## Colors

The palette is functional and tiered to support a complex information hierarchy. 
- **Primary (Indigo):** Reserved for primary actions, active states, and semantic accents. It signifies progress and interaction.
- **Sidebar-Background (Dark Navy):** Provides a heavy visual anchor, separating global navigation from workspace content.
- **Surface & Container:** A two-tier light system. The `#f8fafc` surface acts as the canvas, while the `#ffffff` containers (cards) elevate content to the foreground.
- **Typography:** Uses a high-contrast Slate for primary readability and a muted blue-grey for metadata and secondary labels to reduce visual noise in data-heavy views.

## Typography

This design system utilizes **Inter** exclusively to maintain a systematic and utilitarian feel. The type scale is optimized for screen-based density. 

- **Weight Usage:** Medium (500) is used for labels and buttons to ensure legibility against colored backgrounds. Semibold (600) is preferred for section headers.
- **Scale Strategy:** On desktop, the system leans into `body-md` (14px) as the workhorse for data tables and form fields to maximize information density without sacrificing clarity.
- **Letter Spacing:** Subtle negative tracking is applied to larger headlines to keep the letterforms cohesive at scale.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. The sidebar remains fixed at 260px, while the main content area expands to a maximum of 1440px to ensure line lengths for text remain readable.

- **Grid:** A 12-column grid is used for dashboard layouts.
- **The 32/24 Rule:** Major layout sections (e.g., between the header and a data table) are separated by 32px. Internal padding within cards and containers is strictly 24px.
- **Responsive Behavior:** 
  - **Desktop:** Full sidebar visibility with multi-column card layouts.
  - **Tablet:** Sidebar collapses to an icon-only rail; cards stack into two columns.
  - **Mobile:** Sidebar moves to a bottom sheet or hamburger menu; 16px horizontal margins; single-column card stacking.

## Elevation & Depth

This design system rejects heavy shadows in favor of **Tonal Layering** and **Structural Outlines**.

- **Level 0 (Surface):** The `#f8fafc` background.
- **Level 1 (Cards):** `#ffffff` surfaces with a 1px border in `#e2e8f0`. No shadow is used for standard cards to maintain a flat, professional density.
- **Level 2 (Dropdowns/Modals):** Small, diffused shadows (`0px 4px 12px rgba(0,0,0,0.05)`) are used only when elements physically overlap and require temporary focus.
- **Semantic Accent:** Active cards or focused states utilize a 4px solid vertical stroke of Primary Indigo on the left edge. This provides a clear visual signal that bypasses the need for high-contrast fills or heavy shadows.

## Shapes

The shape language is "Softly Geometric." While the grid is rigid, the corners are rounded to make the administrative environment feel more approachable.

- **Standard Cards:** 12px radius provides a modern, balanced look for high-density layouts.
- **Empty States/Large Prompts:** 16px radius is used to differentiate "static" or "passive" containers from active data containers.
- **Interactive Elements:** Buttons and Input fields use a tighter 8px radius to maintain a precise, "clickable" appearance within the 12px containers.

## Components

### Buttons
Primary buttons use a solid Indigo fill with white text. Secondary buttons use a white fill with a 1px `#e2e8f0` border and Slate text. Height is standardized at 40px for primary actions and 32px for in-table actions.

### Cards
Cards are the primary container. They must include the 24px internal padding. Dashboard cards often feature a "Header" section with a 1px bottom border to separate titles from content.

### Inputs & Form Fields
Fields use an 8px radius, a `#ffffff` fill, and a 1px `#e2e8f0` border. On focus, the border transitions to Indigo with a 2px outer glow (ring). Labels are always positioned above the field using `label-md`.

### Semantic Accents
For "Active" navigation items or "Selected" list items, apply a 4px left-border using the Primary color. This is the hallmark of the design system's navigation.

### Data Tables
Tables are borderless between columns, using 1px horizontal dividers only. Header rows use a light grey tint (`#f1f5f9`) and `label-sm` in all-caps for distinct categorization.

### Chips/Tags
Used for status (e.g., "Active", "Pending"). These use a "Soft-Fill" approach: a 10% opacity version of the semantic color (e.g., 10% Indigo) with full-color text for maximum readability without visual weight.