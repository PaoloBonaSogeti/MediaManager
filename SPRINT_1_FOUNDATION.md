# Sprint 1 - Foundation (Auth, Profile, Persistence)

## Goal
Establish a production-ready backend foundation with persistent storage, authentication, and profile management.

## Scope
- Replace in-memory data usage with persistent DB configuration.
- Introduce identity model and JWT auth.
- Add profile management endpoints.
- Protect API routes requiring authenticated access.

## Concrete Tasks

### 1. Database and Schema
- Create migration scripts for identity and profile tables.
- Add migration scripts for baseline user-owned entities and foreign keys.
- Add indexes and constraints (email uniqueness, ownership indexes).
- Update configuration for environment-based connection strings.

### 2. Backend Authentication
- Add auth service for register/login/token generation.
- Implement password hashing and validation using framework identity components.
- Implement token refresh flow and token expiration policy.
- Add auth controller endpoints.

### 3. User Profile
- Create profile entity linked 1:1 to user.
- Implement GET and PUT profile endpoints.
- Add request/response DTOs and validation rules.

### 4. Security and Middleware
- Configure JWT bearer authentication and authorization policies.
- Add [Authorize] to protected controllers/endpoints.
- Add ownership claim extraction helper for current user context.

### 5. Frontend Foundation (Angular)
- Add auth service with login/register methods.
- Add auth state storage and logout handling.
- Add HTTP interceptor to append bearer tokens.
- Add route guards for protected pages.

### 6. Verification
- Add unit tests for auth token generation/validation.
- Add integration tests for register/login/profile flow.
- Validate unauthorized requests are rejected on protected routes.

## Deliverables
- Working user registration and login.
- Working profile create/update/read.
- Persistent DB-backed API baseline.
- Basic Angular auth flow and protected routes.

## Definition of Done
- Local run uses persistent DB connection without manual code edits.
- User can register, login, and edit profile from UI.
- Protected endpoints reject unauthenticated calls.
- CI tests for auth/profile pass.

## Suggested Owners
- Backend Engineer: tasks 1-4
- Frontend Engineer: task 5
- QA Engineer: task 6
