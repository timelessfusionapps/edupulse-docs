# EduPulse Platform Shell Architecture

## Purpose
This document defines the architectural blueprint for the EduPulse Platform Shell (Phase 2A). The Shell serves as the outer container, navigation framework, and foundational UI layer that hosts all independent business modules (Students, Points, Events, etc.). 

This architecture guarantees a consistent, responsive, and highly secure user experience driven strictly by the Access & Tenant Foundation (Phase 1).

---

## 1. Navigation Model
The Platform Shell utilizes a **Hybrid Navigation Architecture** designed for indefinite scalability as new modules are introduced. Bottom navigation is prohibited.

- **Desktop**: Fixed expanded Sidebar + Persistent Header.
- **Tablet**: Collapsible icon-only Sidebar + Persistent Header.
- **Mobile**: Hidden Hamburger Drawer + Persistent Header.

---

## 2. Dashboard Position
The Dashboard acts as the absolute **Home Screen**.
- **Routing**: Successful `Login` strictly routes directly to `/dashboard`.
- **Menu Visibility**: The Dashboard persists as a permanently selectable, top-level item within the navigation menu.

---

## 3. Module & Route Registry Architecture
The Shell explicitly decouples module discovery from route injection to maintain strict boundaries.

**Module Registry**: Responsible for defining module metadata and sidebar appearance.
**Route Registry**: Responsible for defining the internal deep-link paths.

Example:
```text
Students Module (Module Registry)
    ↓
/students (Route Registry)
/students/create
/students/:id
/students/:id/edit
```

### Module Registration Lifecycle
To ensure future modules can be added without modifying the Shell core, the platform follows this lifecycle:
```text
Module Created
      ↓
Register Module (Metadata)
      ↓
Register Routes (Paths)
      ↓
Shell Discovers Module
      ↓
Menu Appears
      ↓
Routes Become Available
```

---

## 4. Sidebar Structure
The Sidebar relies on an organized categorization system to support scale:
- **Core Access**: Dashboard, Favorites, Recently Visited.
- **Categorized Sections (Collapsible)**:
  - *Academics*: Students, Events, Points.
  - *Communication*: Announcements.
  - *Administration*: Users, Roles, Reports, Configuration.

---

## 5. Breadcrumb Strategy
The Shell provides a formalized, hierarchical breadcrumb trail rendered within the persistent top header (visible on Desktop and Tablet layouts).
- **Format**: `Dashboard > Module > Category > Specific Item`
- **Example**: `Dashboard > Students > Grade 8 > Student Profile`

---

## 6. Responsive Layout & Breakpoint Standards
EduPulse maintains a single, unified architecture across all form factors governed by strict CSS breakpoint standards.

- **Desktop (≥ 1200px)**: Expanded Sidebar.
- **Tablet (768px – 1199px)**: Icon Sidebar (tooltips on hover).
- **Mobile (< 768px)**: Hamburger Drawer (hidden by default).

---

## 7. Header Architecture
The persistent top Header acts as the command center for the user.
- **Required Elements (V1)**: Global Search, Notifications, Profile Menu, Logout.
- **Future Ready**: Theme Selector.
- **Prohibited**: School Switcher. (EduPulse enforces a strict *One School, One Login* multi-tenant model).

---

## 8. Global Search & Permission Security
A unified Global Search bar exists within the Header.
- **V1 Searchable Entities**: Students, Teachers, Parents, Events, Users.
- **Excluded in V1**: Reports, Announcements.

**Permission-Aware Global Search Rule:**
Search results MUST respect the user's `AccessContext`. If a search indexes a student, but the user lacks `Students.View`, that result is explicitly hidden. No search result may expose inaccessible data.

---

## 9. Notification Read Model
The Shell architecture integrates a persistent Notification Tray (Bell Icon).
- **Supported Notification Types**: Announcements, Pending Approvals, Point Approvals, Events, System Notifications.
- **V1 Lifecycle States**: `Unread`, `Read`. 
- *(Note: `Archived` and `Deleted` states are intentionally omitted from V1).*

---

## 10. Quick Actions Framework
A global "Create" / "Quick Action" capability (e.g., a persistent `+` FAB or Header Button) allows rapid data entry from anywhere in the platform.
- **Supported Actions**: Add Student, Create Event, Assign Points, Create Announcement.
- **Governance**: Every individual Quick Action strictly evaluates the `AccessContext` before rendering.

---

## 11. Empty State Framework
The Shell defines a standardized, platform-wide Empty State component pattern.
- All modules must inherit this design when querying empty collections.
- **Standardized Elements**: Illustration/Icon, Clear Messaging (e.g., "No Students Found"), Primary Call-to-Action button (e.g., `[ Add Student ]`).

---

## 12. Permission Driven UI (Global Rule)
**Everything in EduPulse is permission-driven.**
The `AccessContext` (from Phase 1F) operates in multiple enforcement layers:
- **Menu Permissions**: Controls sidebar visibility.
- **Widget Permissions**: Controls role-based dashboard widgets (e.g., `Upcoming Events Widget` only renders if `Events.View` exists).
- **Action Permissions**: Controls Quick Actions, Buttons, and Inline edit/delete interactions.

---

## 13. Multi-Tenant Branding
The platform allows tenant-specific aesthetic theming governed by the School Configuration (Phase 1C).
- **Permitted Customization Targets**: Login Screen, Sidebar, Header, Primary Buttons, Charts, House Colors.
- **Prohibited Targets**: Layouts, Navigation Structure, User Experience Flows, Platform Architecture.
- *Rule: Schools may theme EduPulse; they may not redesign EduPulse.*

---

## 14. Dashboard Layout Strategy
The platform utilizes **Option B — Role-Based Dashboards**.
- Dashboards are dynamically composed based on the user's primary role (e.g., School Admin Dashboard, Teacher Dashboard, House Master Dashboard).
- Dashboard widgets are pre-optimized by role.
- User-customizable/drag-and-drop dashboards are explicitly excluded from V1 to balance usability with simplicity.

---

## 15. Future Readiness
The Shell Architecture establishes foundational roots capable of scaling beyond the immediate scope.
- **Immediate Scope (Phase 2)**: Admin Portal, Teacher Portal.
- **Architectural Readiness**: Parent Portal, Mobile Applications, Future Modules.
