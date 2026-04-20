# MediaManager Implementation Plan

## Vision
Build a multi-user media management platform where users can authenticate, create profiles, add owned media by barcode/EAN (scan or type), and enrich entries using external catalog data from Allmusicz while keeping source data separated from user-provided data.

## Core Product Requirements
- Users must authenticate and access only their own data.
- Users can create and manage a profile.
- Users can add owned media by product/EAN code.
- System attempts metadata lookup against Allmusicz based on code.
- Users can manually add or override metadata such as title, artist, and media type.
- External-source metadata is stored separately from user-owned media records.
- Architecture must support future mobile barcode camera scanning.
- Architecture must support additional metadata sources beyond Allmusicz.

## Proposed Architecture

### Domain Separation
1. Identity and Profile
- ApplicationUser
- UserProfile

2. External Catalog Data (source-owned)
- ExternalCatalogItem
- ExternalCatalogIdentifier
- CatalogSource (Allmusicz, future sources)
- ExternalRawPayload (optional for audit/debug)

3. User Library (user-owned)
- UserMediaItem
- UserMediaOverride (user title/artist/media type edits)
- MediaType (existing lookup)

### Integration Pattern
- Introduce provider abstraction:
  - ICatalogMetadataProvider
  - AllmusiczCatalogProvider
- Add provider registry/factory to support future sources.
- Normalize barcode/EAN before querying providers.

### Security and Access
- JWT bearer authentication.
- Role model (User now, Admin/Reviewer later).
- Row-level ownership checks in all user-media endpoints.

## API Surface (Target)

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- GET /api/auth/me

### Profile
- GET /api/profile
- PUT /api/profile

### Catalog Lookup
- POST /api/catalog/lookup-by-barcode

### User Library
- POST /api/library/items
- GET /api/library/items
- GET /api/library/items/{id}
- PUT /api/library/items/{id}
- DELETE /api/library/items/{id}

## Data and Governance Rules
- External metadata must never overwrite user overrides silently.
- User-owned media items must be queryable only by their owner.
- Provider payload/response mapping must be traceable (source, timestamp, external id).
- Manual entry path must work even when external lookup fails.

## Non-Functional Baseline
- Persistent database instead of in-memory for all environments except optional local test profile.
- Logging around provider calls and failures.
- Timeout and retry policy for external metadata calls.
- Initial validation for barcode format and required fields.

## Delivery Phases
- Sprint 1: Persistence foundation, auth, and profile.
- Sprint 2: Catalog provider abstraction + Allmusicz integration.
- Sprint 3: User library flow, UI wiring, and ownership constraints.
- Sprint 4: Quality hardening, mobile readiness, and source extensibility.

## Sprint Documents
- SPRINT_1_FOUNDATION.md
- SPRINT_2_CATALOG_INTEGRATION.md
- SPRINT_3_LIBRARY_AND_UX.md
- SPRINT_4_HARDENING_AND_FUTURE_READY.md
