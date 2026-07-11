# EduPulse Design System Documentation

This document serves as the foundational guide for the EduPulse UI architecture. It defines the token system, widget system, naming conventions, theme architecture, responsive strategy, and usage guidelines for building consistent, gamified, and scalable user interfaces.

## 1. Token System

The token system centralizes all raw design values to ensure consistency across the platform.

### AppColors (`lib/theme/tokens/app_colors.dart`)
- **Brand Colors**: `primary`, `primaryLight`, `primaryDark` (Indigo palette).
- **Backgrounds**: `background`, `surface`, `darkBackground`, `darkSurface`.
- **Semantics**: `success`, `danger`, `warning`, `info`.
- **Text**: `textPrimary`, `textSecondary`, `textInverse`.
- **Borders**: `border`.

### AppTypography (`lib/theme/tokens/app_typography.dart`)
Mapped exclusively to the **Inter** Google Font.
- **Headings**: `h1` (32px), `h2` (24px), `h3` (20px).
- **Body**: `bodyLarge` (16px), `bodyMedium` (14px), `bodySmall` (12px).
- **Labels**: `labelLarge` (14px), `labelSmall` (12px).

### AppSpacing (`lib/theme/tokens/app_spacing.dart`)
Used for all padding, margin, and gaps.
- `xs` (4.0), `sm` (8.0), `md` (16.0), `lg` (24.0), `xl` (32.0), `xxl` (48.0).

### AppRadius (`lib/theme/tokens/app_radius.dart`)
Standardizes border radii for cards, buttons, and dialogs.
- `sm` (8.0), `md` (12.0), `lg` (16.0), `xl` (24.0).
- Includes `Radius` and `BorderRadius` constants (e.g., `circularMd`, `borderMd`, `borderPill`).

## 2. Theme Architecture

EduPulse uses Flutter's native `ThemeData` to apply tokens globally.
- **Files**: `light_theme.dart`, `dark_theme.dart`, `app_theme.dart`.
- **Implementation**: We define components like `CardThemeData`, `ElevatedButtonThemeData`, `DialogThemeData`, and `InputDecorationTheme` directly within the `ThemeData` objects.
- **Why**: This ensures that standard Flutter widgets (e.g., `AlertDialog`, `TextFormField`) automatically inherit our design system without requiring custom wrapper widgets for every single element.

## 3. Widget System

Shared widgets are located in `lib/shared/widgets/`. They compose tokens into functional components.

- **Buttons (`AppButton`)**: Supports `primary`, `secondary`, `ghost`, and `danger` types. Includes built-in loading states (`isLoading`) and icon support.
- **Forms (`AppTextField`, `SearchField`)**: Consistent inputs with integrated labels, hint text, and validation. `SearchField` includes an automatic search icon prefix.
- **Layouts (`AppCard`, `AppDialog`)**: Reusable structural surfaces. `AppCard` supports tap actions with proper splash effects, while `AppDialog` standardizes alert popups.
- **Indicators (`SyncChip`, `AppShimmer`)**: High-visibility state indicators for offline-first workflows and loading states.
- **Sheets (`RewardSheetBase`)**: Base layout for drag-to-dismiss bottom sheets.

## 4. Naming Conventions

- **Tokens**: Prefixed with `App` (e.g., `AppColors`, `AppSpacing`).
- **Widgets**: Prefixed with `App` to distinguish them from standard Flutter widgets (e.g., `AppButton`, `AppCard`).
- **Files**: `snake_case` (e.g., `app_button.dart`).
- **Classes**: `PascalCase` (e.g., `AppButton`).
- **Variables**: `camelCase` (e.g., `isLoading`).

## 5. Responsive Strategy

The design system uses breakpoints defined in `AppBreakpoints` (`lib/theme/tokens/app_breakpoints.dart`).
- **Mobile**: `< 600px` (Default stacked layouts).
- **Tablet**: `>= 600px` (Two-column layouts, expanded dialogs).
- **Desktop**: `>= 1200px` (Grid layouts, sidebar navigation).

**Core Rules**:
- Do not build separate widgets for mobile vs. desktop unless drastically different.
- Use `LayoutBuilder` and `MediaQuery` to adapt properties (e.g., cross-axis counts in grids) dynamically.
- `AppButton` supports an `isExpanded` flag to adapt from wrap-content to full-width depending on the screen container.

## 6. Usage Guidelines

> [!IMPORTANT]
> **No Hardcoded Values**: You must NEVER use raw colors (e.g., `Colors.red`), raw padding (e.g., `EdgeInsets.all(15)`), or raw border radii in feature screens. Always use `AppColors`, `AppSpacing`, and `AppRadius`.

> [!WARNING]
> **Component Reusability**: If you need a new button style, modify `AppButton` to support the new variant instead of creating a `SpecialFeatureButton` from scratch.

> [!TIP]
> **Theming vs Wrappers**: Rely on `Theme.of(context)` where possible. For example, use standard `Card()` if you just need a surface—our `light_theme.dart` already forces it to use `AppColors.surface` and `AppRadius.borderLg`. Use `AppCard` only when you need the extra tap-handling logic.

> [!NOTE]
> **Operational Speed First**: Ensure all interactive elements have at least a `48x48` tap target. The UI must facilitate fast, low-friction interactions for teachers.
