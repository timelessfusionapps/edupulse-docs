# EduPulse Platform Navigation Governance

## Purpose
This document serves as the authoritative navigation standard for the EduPulse Platform. It defines the strict rules governing how modules are registered, how the sidebar behaves, and how individual preferences like Favorites and Recent Items are stored and rotated.

---

## 1. Module Registry Governance
The **Module Registry** serves as the central directory for application capabilities.
- **Registration**: Future modules (e.g., Attendance, Grading) must declare themselves in the registry rather than hardcoding UI blocks into the core shell.
- **Metadata**: Each module must define its icon, title, target route path, and the primary `Permission` required to render its menu item.

## 2. Route Registry Governance
The **Route Registry** isolates all deep-link paths from visual metadata.
- **Decoupling**: The Shell router builds its navigation tree strictly from the Route Registry.
- **Nested Routing**: Modules must own their sub-routes (e.g., `/students/create`). The Shell must not dictate the internal routing logic of a mounted module.

---

## 3. Sidebar Governance
- **Strict Permission Mapping**: A module's sidebar entry must only appear if the `RuntimePermissionResolver` confirms the user possesses the exact permission mapped in the Module Registry.
- **Hierarchy Limits**: Sidebar sections are limited to one level of nesting (e.g., `Academics -> Students`) to preserve navigation clarity on mobile viewports. Deep navigation relies on in-page routing and breadcrumbs.

---

## 4. Favorites Governance
Favorites allow users to pin specific records or modules to their sidebar for rapid access.
- **Isolation**: Favorites are exclusively **User-Specific**. They are never shared globally across roles or tenants.
- **Storage Location**: `schools/{schoolId}/users/{uid}/preferences`
- **Integrity**: When an entity is deleted (e.g., a student profile), the backend must broadcast an event to scrub the orphan reference from user favorites.

---

## 5. Recent Items Governance
Recently Visited items track user history to facilitate fast multi-tasking.
- **Capacity**: Strictly limited to the **Last 10 Screens** per user.
- **Isolation**: Strictly user-specific and not shared.
- **Rotation Strategy**: This is an automatic FIFO (First-In, First-Out) queue. It is not a permanent record and cycles out old entries as the user navigates.
- **Storage**: May be cached locally or stored alongside preferences depending on Phase 2 implementation specs.

---

## 6. Breadcrumb Governance
Breadcrumbs provide contextual awareness and backward traversal.
- **Visibility**: Rendered strictly on Desktop (≥ 1200px) and Tablet (768px – 1199px) layouts. Hidden on Mobile to preserve vertical screen real estate.
- **Dynamic Data**: Deep links must dynamically render the entity name (e.g., `Dashboard > Students > Grade 8 > John Doe` instead of `... > :id`).

---

## 7. Navigation Permissions
Routing intercepts defined in Phase 1F (`RuntimeAccessGuard`) are the ultimate source of truth.
- If a user somehow manipulates local state to force a Sidebar menu to appear, the underlying Route Registry access policy will instantly bounce them to the `/unauthorized` fallback screen upon click.
- **Search Governance**: Navigation initiated via Global Search is identically restricted; search indexing queries must filter out entities the user lacks permission to view.
