# MediaManager

Starter solution scaffold with backend, shared database assets, and three frontend applications.

## Solution Tree

```text
MediaManager.slnx
src/
	backend/
		MediaManager.Api/                # .NET Web API starter
	database/
		MediaManager.Database/           # Shared database project assets
			Schemas/Common/001_create_schema.sql
			Migrations/001_initial.sql
	frontend/
		web/
			media-manager-web/             # Angular starter app
		mobile/
			MediaManager.Mobile.Android/   # .NET MAUI Android starter app
			MediaManager.Mobile.iPhone/    # .NET MAUI iPhone starter app
```

## Getting Started

### Backend API

```powershell
dotnet run --project src/backend/MediaManager.Api
```

### Angular Web App

```powershell
cd src/frontend/web/media-manager-web
npm start
```

### MAUI Android App

```powershell
dotnet build src/frontend/mobile/MediaManager.Mobile.Android
```

### MAUI iPhone App

```powershell
dotnet build src/frontend/mobile/MediaManager.Mobile.iPhone
```