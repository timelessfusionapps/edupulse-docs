# EduPulse Access Runtime Architecture

## Purpose

This document defines the runtime access architecture of the EduPulse platform.

It connects:

- Authentication
- Tenant Isolation
- User Management
- RBAC
- Permission Matrix
- Session Management
- Repositories
- BLoCs
- UI Access Control

into a unified runtime execution model.

This architecture serves as the definitive runtime access blueprint for all EduPulse applications.

---

# Design Principles

EduPulse Runtime Access Architecture is built upon:

1. Security First
2. Tenant Isolation
3. Offline Resilience
4. Real-Time Permission Enforcement
5. Centralized Authorization
6. Auditability
7. Cross-Platform Consistency

---

# Runtime Access Flow

Every authenticated session follows:

```text
Firebase Authentication
        ↓
User Profile Resolution
        ↓
Role Resolution
        ↓
Permission Resolution
        ↓
TenantContext Creation
        ↓
Repository Initialization
        ↓
Bloc Initialization
        ↓
UI Rendering
```

No business module may initialize before TenantContext has been successfully established.

---

# Authentication Runtime

Primary Authentication Provider:

```text
Firebase Authentication
```

Supported Methods:

```text
Email + Password
Google Sign-In
```

Future:

```text
Phone Authentication
Apple Sign-In
Microsoft Sign-In
```

The runtime architecture must support future providers without structural changes.

---

# Session Persistence

## Mobile Applications

Session persistence is enabled.

Users remain authenticated until:

```text
Logout
Password Reset
Account Suspension
Account Archival
School Suspension
```

---

## Web Dashboard

Web sessions use idle timeout enforcement.

Current Runtime Policy:

```text
60 Minute Idle Timeout
```

After 60 minutes of inactivity:

```text
Session Expired
    ↓
Reauthentication Required
```

---

## Future Configuration

Future versions may allow:

```text
15 Minutes
30 Minutes
60 Minutes
Never
```

configured at the school level.

---

# Session Lifecycle

```text
Login
    ↓
Active Session
    ↓
Permission Updates
    ↓
Session Refresh
    ↓
Logout / Forced Logout
```

---

# TenantContext Architecture

Every authenticated session generates a TenantContext.

---

# TenantContext Structure

```text
schoolId
schoolCode
userId
roleId
permissions
```

Future Extensions:

```text
subscriptionTier
featureFlags
region
```

---

# TenantContext Creation Flow

```text
Authentication
      ↓
User Lookup
      ↓
Role Lookup
      ↓
Permission Lookup
      ↓
TenantContext Creation
```

TenantContext becomes the runtime identity object for the entire application.

---

# TenantContext Caching

TenantContext is cached locally.

Benefits:

```text
Faster Startup
Offline Support
Reduced Reads
```

---

# TenantContext Refresh

TenantContext refreshes automatically when:

```text
Role Changes
Permission Changes
School Status Changes
User Status Changes
```

---

# Runtime Zones

EduPulse separates runtime responsibilities into dedicated zones.

---

## Authentication Zone

Responsible for:

```text
Login
Logout
Token Refresh
Authentication State
```

---

## Tenant Zone

Responsible for:

```text
TenantContext
School Resolution
Subscription Status
```

---

## User Zone

Responsible for:

```text
Profile Data
User State
User Preferences
```

---

## Role Zone

Responsible for:

```text
Role Resolution
Role Updates
Inheritance Evaluation
```

---

## Permission Zone

Responsible for:

```text
Permission Resolution
Permission Refresh
Access Validation
```

---

## Session Zone

Responsible for:

```text
Session Expiry
Idle Tracking
Forced Logout
```

---

# Repository Runtime Architecture

Repositories enforce access control.

Architecture:

```text
TenantContext
      ↓
Datasource
      ↓
Repository
      ↓
Bloc
      ↓
UI
```

---

# Repository Responsibilities

Repositories must enforce:

```text
schoolId
permissions
scope restrictions
```

before performing operations.

---

# Repository Security Rules

Repositories must never trust UI input.

All authorization decisions occur inside repositories.

Examples:

```text
Students.View
Events.Create
Points.Assign
```

validated before execution.

---

# Bloc Runtime Architecture

Blocs remain authorization-agnostic.

Blocs receive:

```text
Tenant Filtered Data
Permission Approved Data
```

only.

---

# Bloc Responsibilities

Blocs manage:

```text
State
Streams
UI Synchronization
Offline Cache
```

Blocs do not enforce security.

---

# UI Access Guards

Every protected screen requires explicit permission validation.

Example:

```text
StudentsScreen
```

requires:

```text
Students.View
```

before rendering.

---

# Access Guard Flow

```text
Screen Request
      ↓
Permission Check
      ↓
Access Granted
      ↓
Render UI
```

OR

```text
Screen Request
      ↓
Permission Check
      ↓
Access Denied
      ↓
Unauthorized Screen
```

---

# Runtime Permission Enforcement

Permission checks occur at multiple layers.

---

## UI Layer

Controls:

```text
Navigation
Buttons
Actions
Menus
```

---

## Repository Layer

Controls:

```text
Reads
Writes
Updates
Deletes
Streams
```

---

## Firestore Rules

Controls:

```text
Database Access
```

Final security boundary.

---

# Permission Refresh Architecture

Role and permission updates apply immediately.

---

# Runtime Permission Refresh Flow

```text
School Admin Changes Role
            ↓
Permission Stream Updates
            ↓
Notification Sent
            ↓
TenantContext Rebuilt
            ↓
UI Refresh
```

No logout required.

No application restart required.

---

# User Notification

Examples:

```text
Your permissions have been updated.

Your role has been changed.

Additional features are now available.
```

---

# Forced Logout Events

Immediate session invalidation occurs when:

```text
Password Reset
User Suspended
User Archived
Role Removed
School Suspended
```

---

# Forced Logout Flow

```text
Event Detected
      ↓
Session Invalidated
      ↓
User Notification
      ↓
Login Screen
```

---

# Forced Logout Messaging

Users receive the actual reason.

Examples:

```text
Your account has been suspended.

Your school's subscription has been suspended.

Your password was changed. Please sign in again.
```

Generic messages are prohibited.

---

# School Suspension Runtime

Authentication may still succeed.

However:

```text
TenantContext Validation
        ↓
Subscription Check
        ↓
Suspended School
        ↓
Suspension Screen
```

---

# Suspension Screen

Displays:

```text
School Name
Subscription Status
Support Contact
Renewal Instructions
```

---

# Multi-Device Session Support

Users may remain logged in across:

```text
Desktop
Mobile
Tablet
```

simultaneously.

---

# Session Synchronization

Critical events synchronize across devices.

Examples:

```text
Password Reset
Account Suspension
Account Archival
```

All active sessions terminate.

---

# Offline Runtime Architecture

EduPulse follows an offline-first strategy.

---

# Cached Runtime Data

Available offline:

```text
Session
TenantContext
Permissions
User Profile
```

---

# Offline User Experience

Users continue operating with:

```text
Cached Access
Cached Screens
Cached Data
```

until connectivity returns.

---

# Reconnect Flow

```text
Connectivity Restored
        ↓
TenantContext Refresh
        ↓
Permission Refresh
        ↓
Data Synchronization
```

---

# Runtime Audit Events

The following events must be logged:

```text
Login
Logout
Failed Login
Forced Logout
Permission Refresh
Role Change
```

---

# Audit Event Structure

```text
Timestamp
SchoolId
UserId
Action
Result
Device
```

Future:

```text
IP Address
Location
```

---

# Shared Runtime Architecture

The runtime access architecture is shared by:

```text
Admin Application
Teacher Application
Parent Application
Future Mobile Applications
```

---

# Single Source of Truth

All applications use:

```text
Authentication Architecture
TenantContext Architecture
RBAC Architecture
Permission Matrix
User Management Architecture
```

without duplication.

---

# Runtime Security Principles

The runtime layer must guarantee:

```text
Tenant Isolation
Permission Enforcement
Session Integrity
Auditability
Real-Time Updates
Offline Resilience
```

at all times.

---

# Success Criteria

The EduPulse Access Runtime Architecture must support:

- Multi-Tenant Operation
- Real-Time Permission Updates
- Offline-First Usage
- Session Persistence
- Cross-Platform Authentication
- Tenant-Aware Repositories
- Secure UI Access Control
- Immediate Role Refresh
- Multi-Device Sessions
- Complete Auditability

without requiring future architectural redesign.

This document serves as the definitive runtime access blueprint for the EduPulse platform.