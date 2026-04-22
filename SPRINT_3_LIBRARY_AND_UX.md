# Sprint 3 - User Library Flow and Web UX

## Goal
Deliver the end-to-end user flow for adding owned media by barcode or manual input, with user overrides stored separately.

## Scope
- Build user-owned library entity flow.
- Support external lookup assisted create and manual-only create.
- Add web UI for profile, lookup, add/edit media, and list owned items.
- Enforce per-user ownership in all library operations.

## User Stories

### US3.1 - Add Media from Catalog Lookup
As an authenticated user, I want to add an owned media item from lookup results so that I can build my library quickly from barcode data.

#### Acceptance Criteria
- A user can create a library item from a catalog lookup result.
- The created item links to the external catalog record without copying ownership into the catalog tables.
- The new item appears in the user's personal library list after creation.

### US3.2 - Add Media Manually
As an authenticated user, I want to add media manually when lookup fails or the item is missing so that my library does not depend on an external source.

#### Acceptance Criteria
- A user can create a media item without an external catalog link.
- Required manual fields are validated before the item is saved.
- Manual-only items are returned and managed through the same library endpoints as lookup-assisted items.

### US3.3 - Override Catalog Metadata
As an authenticated user, I want to override title, artist, or media type on my copy of an item so that my library reflects how I organize my collection.

#### Acceptance Criteria
- User overrides are stored separately from source metadata.
- API responses expose the effective display values using override-first precedence.
- Provenance between user-entered and source-provided values is available to the UI.

### US3.4 - Manage My Personal Library
As an authenticated user, I want to view, update, and delete my owned items so that I can maintain an accurate personal collection.

#### Acceptance Criteria
- A user can list only their items and retrieve item details.
- A user can update and delete only their own items.
- The web UI supports add, view, edit, and delete flows with validation and clear errors.

### US3.5 - Ownership Isolation
As a system owner, I want strict user-level data isolation so that one user can never access another user's library records.

#### Acceptance Criteria
- All library queries and commands are scoped to the authenticated user.
- Cross-user access attempts are rejected and covered by negative tests.
- No library endpoint leaks another user's data in success or error responses.

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
