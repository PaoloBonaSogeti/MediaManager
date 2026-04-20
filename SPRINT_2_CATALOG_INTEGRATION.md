# Sprint 2 - Catalog Integration (Allmusicz + Extensible Source Layer)

## Goal
Implement barcode/EAN metadata lookup through Allmusicz with a source abstraction that supports future providers.

## Scope
- Build provider abstraction for external metadata sources.
- Integrate Allmusicz provider with resilient HTTP behavior.
- Persist external metadata separately from user-owned records.
- Expose catalog lookup API for barcode-based discovery.

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
