# Sprint 2 - Catalog Integration (Allmusicz + Extensible Source Layer)

## Goal
Implement barcode/EAN metadata lookup through Allmusicz with a source abstraction that supports future providers.

## Scope
- Build provider abstraction for external metadata sources.
- Integrate Allmusicz provider with resilient HTTP behavior.
- Persist external metadata separately from user-owned records.
- Expose catalog lookup API for barcode-based discovery.

## User Stories

### US2.1 - Barcode Lookup
As an authenticated user, I want to search by barcode or EAN so that I can quickly find catalog metadata for the media I own.

#### Acceptance Criteria
- The API accepts a supported barcode or EAN input and normalizes it before lookup.
- A successful lookup returns mapped metadata and source attribution.
- A not-found lookup returns a controlled response without creating user library data.

### US2.2 - Resilient Provider Integration
As a platform operator, I want external catalog lookups to fail gracefully so that provider instability does not take down the API.

#### Acceptance Criteria
- Provider calls respect configured timeout and retry rules.
- Provider failures return controlled API errors rather than unhandled exceptions.
- Lookup logs capture enough detail to diagnose provider failures.

### US2.3 - Traceable External Catalog Storage
As a product team member, I want externally sourced metadata stored separately from user-owned data so that source records remain auditable and reusable.

#### Acceptance Criteria
- External catalog records persist independently of user library tables.
- Stored records include source name, external identifier, and retrieval timestamp.
- Duplicate external records are prevented for the same source and external id.

### US2.4 - Extensible Source Layer
As a developer, I want a provider abstraction for metadata sources so that additional catalog providers can be added without redesigning the API.

#### Acceptance Criteria
- A shared provider interface defines the lookup contract.
- Provider selection is handled through a registry or factory rather than hard-coded controller logic.
- Adding a new provider requires a new implementation and configuration, not API redesign.

### US2.5 - Lookup Validation and Observability
As a support engineer, I want lookup requests validated and traced so that bad input and production issues are easy to diagnose.

#### Acceptance Criteria
- Invalid barcode formats are rejected with explicit validation feedback.
- Lookup requests and failures include correlation-friendly logging.
- Tests cover successful, failed, and invalid lookup scenarios.

## Concrete Tasks

### 1. Provider Abstraction
- Define ICatalogMetadataProvider interface (lookup by normalized code).
- Define common provider result model and mapping contract.
- Create provider registry/factory to route by source.

### 2. Allmusicz Provider
- Implement Allmusicz HTTP client integration.
- Add configuration model for endpoint, API key, timeouts.
- Add barcode normalization utility for EAN/UPC input.
- Add retry/timeout/circuit-breaker behavior.

### 3. External Catalog Persistence
- Add tables for ExternalCatalogItem, ExternalIdentifier, CatalogSource.
- Persist source identifier, source payload timestamp, and mapped fields.
- Optionally store raw provider payload for traceability.
- Enforce uniqueness by source + external id.

### 4. API Endpoints
- Implement POST /api/catalog/lookup-by-barcode.
- Return lookup status (found/not found/error) with candidate metadata.
- Include source metadata and confidence/quality fields if available.

### 5. Validation and Observability
- Add request validation for code format.
- Add structured logging for provider requests/responses and failures.
- Add correlation ids to trace lookup requests.

### 6. Verification
- Unit tests for barcode normalization and provider mapping.
- Integration tests for successful and failed provider calls.
- Contract-style tests using provider response fixtures.

## Deliverables
- Working barcode lookup endpoint using Allmusicz.
- External-source metadata persisted independently of user media.
- Provider abstraction ready for additional sources.

## Definition of Done
- Valid code lookup returns mapped metadata when available.
- Failed provider calls do not break API; controlled error response is returned.
- External tables contain source records independent of user library tables.
- Tests for mapping and resilience pass.

## Suggested Owners
- Backend Engineer: tasks 1-4
- Platform Engineer: task 5
- QA Engineer: task 6
