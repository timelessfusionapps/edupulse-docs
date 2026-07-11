---
name: Operational Excellence
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
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-h1-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  sidebar-width: 240px
  topbar-height: 64px
  gutter: 24px
  margin-page: 32px
  card-padding: 20px
  stack-gap: 16px
---

## Brand & Style

This design system is built for high-density administrative environments where clarity, speed of recognition, and structural integrity are paramount. The aesthetic is **Corporate Modern** with a lean toward **Minimalism**, stripping away decorative depth (shadows) in favor of rigorous grid alignment and clear semantic signaling.

The target audience consists of educators and administrators who require a tool that feels like a precision instrument. The UI evokes a sense of calm control through its "flat" but highly structured architecture. Every element serves a functional purpose, utilizing color not as decoration, but as a systematic indicator of status and priority.

## Colors

The color palette is engineered for professional focus. 
- **Surface Strategy:** The main workspace uses a clean Slate-50 (#f8fafc) to reduce eye strain, while the navigation shell utilizes a deep Indigo-950 (#0f172a) to provide a strong visual anchor on the left axis.
- **Semantic Implementation:** Status-driven surfaces are utilized for data-heavy cards. These background tints must always be paired with their darker functional counterparts for text and icons to ensure AA accessibility.
- **Borders:** A consistent 1px stroke (#e2e8f0) replaces shadows as the primary method of element separation.

## Typography

This design system utilizes **Inter** exclusively to leverage its exceptional legibility in data-heavy interfaces. 
- **Hierarchy:** H1 is reserved for page titles. H2 and H3 should be used for section headers and card titles respectively.
- **Body:** The standard 14px body size optimizes for information density, allowing for complex dashboards without overwhelming the viewport.
- **Emphasis:** Use medium (500) or semi-bold (600) weights for interactive labels and table headers to distinguish them from static body text.

## Layout & Spacing

The layout follows a **Fixed-Fluid** hybrid model:
- **Navigation Shell:** A 240px fixed-width sidebar houses the primary application navigation. The topbar (64px) remains persistent for global search and profile actions.
- **Content Area:** The main stage is a fluid container with a minimum margin of 32px. 
- **Grid:** Use a 12-column grid for dashboard layouts. Spacing between elements (gutters) is strictly 24px.
- **Mobile Adaptivity:** On devices smaller than 768px, the sidebar transitions to a hidden drawer, and the page margins reduce to 16px.

## Elevation & Depth

This design system rejects the use of box-shadows. Depth is communicated through **structural containment and tonal layering**:
- **Level 0 (Background):** #f8fafc.
- **Level 1 (Cards/Containers):** White (#ffffff) background with a 1px #e2e8f0 border.
- **Semantic Priority:** Vertical 4px accent bars on the far-left edge of cards are the primary method for communicating urgency or status, ensuring the user's eye can "scan" down the left rail of the content area to find critical information.
- **Active States:** Subtle shifts in background color (e.g., from White to Slate-50) indicate hover or selection.

## Shapes

The shape language balances modern approachability with professional structure.
- **Cards:** Utilize a generous 16px radius to soften the high-density layout and distinguish large content blocks.
- **Interactive Elements:** Buttons use a 12px radius, providing a distinct "clicky" appearance that differs from the containing cards.
- **Small Components:** Checkboxes and inputs use a tighter 8px radius to maintain precision at smaller scales.
- **Semantic Accents:** The 4px accent bars on cards should have their outer corners match the card's 16px radius, while internal corners remain sharp.

## Components

- **Primary Buttons:** Fixed 48px height. Solid #4f46e5 background with White text. No shadow; 12px border-radius.
- **Cards:** 16px radius, 1px #e2e8f0 border, White background. Must feature a 4px solid color bar on the left edge corresponding to the semantic state (e.g., Danger, Success).
- **Inputs:** 40px height, 8px radius, 1px #e2e8f0 border. On focus, the border shifts to Primary #4f46e5 with a 1px inner stroke.
- **Sidebar Items:** High contrast (White text on #0f172a). Active state uses a #4f46e5 left-border indicator or a subtle background tint (Slate-800).
- **Chips/Badges:** 24px height, 100px (pill) radius. Used for tags and status within tables. Background should be the light semantic tint with dark text.
- **Data Tables:** No vertical borders. 1px horizontal #e2e8f0 dividers only. 14px Inter Regular for row data; 12px Inter Semi-Bold for headers.