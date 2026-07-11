---
name: Kinetic Admin
colors:
  surface: '#fcf8ff'
  surface-dim: '#dcd8e5'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f2ff'
  surface-container: '#f0ecf9'
  surface-container-high: '#eae6f4'
  surface-container-highest: '#e4e1ee'
  on-surface: '#1b1b24'
  on-surface-variant: '#464555'
  inverse-surface: '#302f39'
  inverse-on-surface: '#f3effc'
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
  background: '#fcf8ff'
  on-background: '#1b1b24'
  surface-variant: '#e4e1ee'
typography:
  h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  h1-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
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
  label-caps:
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
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
  sidebar-width: 280px
---

## Brand & Style
The design system for this administrative platform focuses on operational clarity and structured efficiency. The brand personality is authoritative yet modern, designed to support high-density data management without overwhelming the user. 

The aesthetic draws from **Corporate Modernism** with a heavy emphasis on structural hierarchy. It utilizes a sophisticated contrast between a deep, professional sidebar and a high-key, airy workspace. The emotional response is one of reliability and "calm productivity"—where complex educational data feels manageable and organized through clear semantic signaling and generous whitespace.

## Colors
The palette is engineered for operational status tracking. The primary indigo serves as the main action color, while the deep navy secondary color provides a grounding structural anchor for navigation. 

The semantic colors are light-wash tints designed to fill large surface areas (like table rows or card backgrounds) without causing visual fatigue. 
- **Primary (#4f46e5):** Focus, primary actions, and active states.
- **Secondary (#0f172a):** Persistent navigation and high-level structural containment.
- **Surface (#f8fafc):** Global background to reduce glare.
- **Semantic Accents:** Used primarily for status-based backgrounds and left-hand accent bars to provide immediate categorical recognition.

## Typography
This design system utilizes **Inter** exclusively to leverage its exceptional legibility in data-heavy environments. The typographic scale is optimized for information density. 

Headlines use a tighter letter-spacing and heavier weights to create a strong visual anchor for page sections. Body text is tiered: 16px for primary reading content and 14px for functional UI elements, metadata, and table cell content. Captions and small labels should utilize the `label-caps` style to differentiate meta-information from actionable data.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a fixed left-hand navigation rail. 

- **Sidebar:** Fixed at 280px. Content within the sidebar uses a 16px internal padding.
- **Main Canvas:** A fluid container with a minimum side margin of 32px on desktop and 16px on mobile.
- **Vertical Rhythm:** A 4px base unit governs all spacing. Components like cards and tables should be separated by 24px (6 units) to maintain clear distinction between data modules.
- **Table Layout:** Tables occupy the full width of their containers.

## Elevation & Depth
The system uses **Tonal Layers** rather than heavy shadows to signify depth, maintaining a clean, "flat-plus" aesthetic.

- **Level 0 (Background):** #f8fafc.
- **Level 1 (Cards/Tables):** Pure white (#ffffff) with a 1px border in a slightly darker neutral (#e2e8f0).
- **Interactive Depth:** Only primary buttons and active dropdowns receive a subtle, diffused shadow (0px 4px 6px -1px rgba(0, 0, 0, 0.1)) to indicate "lift" and "press-ability."
- **Sidebar:** Sits on the lowest visual plane through color contrast rather than elevation, acting as a structural frame.

## Shapes
The shape language is friendly yet professional, characterized by generous radii that soften the administrative nature of the platform.

A 16px radius is the standard for large containers (Cards, Tables), creating a distinct "capsule" feel for data modules. Buttons utilize a 12px radius to appear modern and approachable, while smaller UI elements like input fields use an 8px radius to maintain a crisp look within the larger containers.

## Components
- **Cards:** White background, 16px border radius. Every card must include a 4px wide vertical accent bar on the far left edge. The color of this bar corresponds to the semantic mapping (e.g., a "Critical" alert card has a #ede9fe background and a solid violet accent bar).
- **Tables:** Row height is strictly 72px to allow for multi-line cell content or avatars. Table containers have a 16px corner radius and overflow-hidden. Use zebra-striping with semantic colors for status-specific rows.
- **Buttons:** Primary buttons are 48px in height with a 12px radius. Typography inside buttons is 14px Semi-bold.
- **Input Fields:** 44px height, 8px radius, with a 1px border. Focus state uses a 2px primary color ring with 2px offset.
- **Chips/Badges:** Small, 24px height, fully rounded (pill-shaped). Used for status indicators within table rows, mapping to the semantic color palette.
- **Sidebar Nav:** High contrast links (white text on #0f172a) with a primary color vertical indicator on the left for the active state.