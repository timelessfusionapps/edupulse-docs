# EduPulse Role Governance Report

## Overview
This document outlines the strict lifecycle constraints and dependency rules established for EduPulse Roles.

## 1. Protected Roles
The platform currently provisions the following System Roles: `School Admin`, `Principal`, `Vice Principal`, `Coordinator`, `Head Teacher`, `Teacher`, and `House Master`.
- **Constraint**: These roles possess `isSystemRole: true`.
- **Enforcement**: Under no circumstances can they be Renamed, Archived, or Deleted. The repository layer strictly throws exceptions if changes against these properties are requested on these exact entity IDs.

## 2. Role Lifecycle & Archival
Permanent destruction of Role documents is strictly banned to preserve historical data linkage (e.g. Audit Logs referencing a specific role).
Instead, Custom Roles may be marked as `isArchived: true`. Once archived, they are hidden from assignment user-interfaces.

## 3. Inheritance Rules
To preserve conceptual simplicity for school administrators:
- **Maximum Parents**: 1.
- **Multiple Inheritance**: Blocked by architectural constraint (the domain model uses a single `String? parentRoleId`).

## 4. Role Dependencies
Roles are protected against broken configurations through runtime validation mapping:
- Point Approval (`Points.ApprovePointChanges`) strictly maps dependency to `Points.ViewPointHistory`.
- Export features (`Reports.Export`) depend directly on visibility (`Reports.View`).
These constraints prevent administrators from creating functionally useless roles that generate UI errors.
