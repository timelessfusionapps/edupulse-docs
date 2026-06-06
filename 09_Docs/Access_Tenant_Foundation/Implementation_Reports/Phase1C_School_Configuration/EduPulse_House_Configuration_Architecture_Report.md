# EduPulse House Configuration Architecture Report

## Overview
This report validates the House Configuration structure against scalable runtime needs.

## 1. House Structure
By decoupling Houses from `schools/{schoolId}/configuration` into a fully separated `schools/{schoolId}/houses` collection, the platform successfully neutralizes document-size limitation risks for large academies running heavy intra-house event logic.

## 2. House Lifecycle
CRUD operations inside `FirebaseConfigurationDatasourceImpl` target discrete house identifiers. Modifications to a house (such as updating its primary color) safely modify an individual JSON payload without blocking other writes happening simultaneously inside the `academic` configuration.

## 3. House Icon Governance
The system architecture mandates the usage of `houseIconKey`. While rendering is mocked in Phase 1C, the UI limits inputs to a strict string map registry mapping securely to valid semantic definitions (e.g. `falcon`, `tiger`) instead of arbitrary binary objects or unstable native glyph dependencies.

## 4. House Ordering
The `getHouses` stream orders internally by `displayOrder`, guaranteeing stable layout across dashboards entirely free from UI array iteration logic.

## 5. Runtime Compatibility
Houses extracted uniformly as `List<HouseConfigurationEntity>` guarantee simple map iterations across Dropdowns and Leaderboards in upcoming Phase 1D implementations.
