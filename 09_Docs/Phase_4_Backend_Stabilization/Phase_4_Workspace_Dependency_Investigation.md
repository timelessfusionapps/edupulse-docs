# Phase 4 — Workspace Dependency Investigation
**Date:** 2026-07-10

## Objective
Identify why `flutter analyze` fails across the workspace and document the root causes.

---

## Findings

### 1. Root Cause: Broken Package Boundaries
The individual packages in `packages/*` (such as `edupulse_schools`, `edupulse_tenant`, `edupulse_rbac`) are acting as raw code folders rather than fully formed Dart packages. 
- Their `pubspec.yaml` files do not declare any dependencies. 
- For example, `packages/schools` actively imports `cloud_firestore` and `edupulse_shared_core`, but fails to list them under a `dependencies:` block. 
- As a result, the Dart Analyzer throws `Target of URI doesn't exist` whenever an isolated package analysis is executed.

### 2. Workspace & Melos Configuration
- **Melos Failure:** `melos bootstrap` fails because the workspace root lacks a `pubspec.yaml`. Modern configurations of Melos (and Dart 3.5 native workspaces) require a root `pubspec.yaml` declaring the workspace bounds.
- **Dart Workspace Resolution:** Global `pub get` loops are intercepting third-party package examples inside the `apps/admin_app/build/` directory (e.g., `apps/admin_app/build/macos/SourcePackages/cloud_firestore-*/example/pubspec.yaml`). These examples use Dart 3.5's `resolution: workspace` but fail because there is no root workspace defined in the project, breaking dependency resolution.

### 3. Shared Packages
- **Status:** `edupulse_shared_core` exists and contains the expected source files (e.g., `lib/errors/app_exceptions.dart`). 
- **Issue:** It is simply unlinked from dependent packages at the `pubspec.yaml` level.

---

## Recommended Fix

1. **Standardize `pubspec.yaml` files:** Inject the correct `dependencies:` (such as `cloud_firestore` and path references to `edupulse_shared_core`) into every package's `pubspec.yaml`.
2. **Create Root `pubspec.yaml`:** Introduce a root `pubspec.yaml` with `resolution: workspace` and a `workspace:` list to formally establish a Dart 3.5+ workspace, enabling both Dart tooling and Melos to function.
3. **Clean Build Artifacts:** Run `flutter clean` in `apps/admin_app` to purge the iOS/macOS build artifacts (`SourcePackages`) that are currently confusing the dependency resolver.

---

## Assessment

- **Scope:** Workspace-wide Dependency Configuration.
- **Risk:** **Low** (Configuration only, no application logic changes).
- **Pilot Priority:** **High (🟢)** (Mandatory to unblock Phase 4 S3/S4 implementations and CI pipelines).

---
*Status: Investigation Complete. Awaiting architectural approval to execute the recommended fixes.*
