# EduPulse School Configuration Runtime Report

## Overview
This document specifies the runtime execution flow established for reading and updating tenant configuration.

## Data Retrieval Flow
The `ConfigurationBloc` manages the runtime state array for configuration:
1. `ConfigurationLoadRequested`: Given a valid `schoolId` context, triggers parallel fetching of branding/academic boundaries and the external house list.
2. `ConfigurationLoaded`: Materializes all entity elements. The runtime uses this single state to seed dependencies.

## Write Operations & Safe Mutation
The implementation deliberately omits live realtime theme syncing as explicitly mandated by Phase 1C limits:
- Configuration mutation events (e.g. `ConfigurationUpdateBrandingRequested`) post payload states cleanly to Firestore.
- An explicit state (`ConfigurationActionSuccess`) forces the UI layer to acknowledge the successful remote transmission.
- Post-transmission, the bloc fires a standard load request, forcing the user UI to absorb fresh boundaries deterministically without cascading race conditions across widgets.
