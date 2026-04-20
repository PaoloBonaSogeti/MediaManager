# Sprint 3 - User Library Flow and Web UX

## Goal
Deliver the end-to-end user flow for adding owned media by barcode or manual input, with user overrides stored separately.

## Scope
- Build user-owned library entity flow.
- Support external lookup assisted create and manual-only create.
- Add web UI for profile, lookup, add/edit media, and list owned items.
- Enforce per-user ownership in all library operations.

## Concrete Tasks

### 1. User Library Domain
- Add UserMediaItem entity linked to ApplicationUser.
- Add UserMediaOverride entity for title/artist/media type overrides.
- Link UserMediaItem to ExternalCatalogItem when lookup exists.
- Support null ExternalCatalogItem link for manual-only entries.

### 2. Library API
- Implement POST /api/library/items with two modes:
  - lookup-assisted create
  - manual create
- Implement GET list/detail endpoints scoped to current user.
- Implement PUT update endpoint for user edits/overrides.
- Implement DELETE endpoint with ownership validation.

### 3. Merge and Display Logic
- Create rule engine/service for effective metadata:
  - user override first
  - fallback to external source value
- Return both effective values and provenance indicators to UI.

### 4. Angular Features
- Create pages/components:
  - login/register
  - profile
  - add media (barcode + manual)
  - my library list/detail
- Add forms with validation and user-friendly error states.
- Integrate auth guard and API services for all new endpoints.

### 5. Security and Data Isolation
- Apply ownership checks in query and command handlers.
- Add negative tests for cross-user access attempts.
- Validate no endpoint leaks another user's items.

### 6. Verification
- Integration tests for full add-media flow.
- Frontend unit tests for form validation and service behavior.
- Smoke test script for login -> lookup -> create -> list flow.

## Deliverables
- Users can add owned media by barcode lookup or manual input.
- User metadata overrides are stored separately from external data.
- Users can manage profile and personal library from web UI.

## Definition of Done
- Authenticated user can complete full media add flow.
- Library list only shows current user's items.
- Override precedence works correctly in API responses.
- Frontend build and test suite pass.

## Suggested Owners
- Backend Engineer: tasks 1-3 and 5
- Frontend Engineer: task 4
- QA Engineer: task 6
