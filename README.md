# ASP.NET Core / React SPA
The front is the template from react-scripts

## Stack
- Server
  - ASP.NET Core 2.0
  - SQLServer
  - Entity Framework Core w/ EF Migrations
- Client
  - React 15.6
  - Webpack 2 for asset bundling and HMR (Hot Module Replacement)
  - CSS Modules
  - Fetch backend for REST requests
- Testing
  - xUnit for .NET Core
## Setup

1. Install the following:
   - [.NET Core 2.0](https://www.microsoft.com/net/core)
   - [Node.js >= v8](https://nodejs.org/en/download/)
2. Run `npm install && npm start`
3. Open browser and navigate to [http://localhost:5000](http://localhost:5000).

## Scripts

### `npm install`

When first cloning the repo or adding new dependencies, run this command.  This will:

- Install Node dependencies from package.json
- Install .NET Core dependencies from backend/backend.csproj and backend.test/backend.test.csproj (using dotnet restore)

### `npm start`

To start the app for development, run this command.  This will:

- Run `docker-compose up` to ensure the PostgreSQL and MailCatcher Docker images are up and running
- Run `dotnet watch run` which will build the app (if changed), watch for changes and start the web server on http://localhost:5000
- Run Webpack dev middleware with HMR via [ASP.NET JavaScriptServices](https://github.com/aspnet/JavaScriptServices)


### `npm test`

This will run the xUnit tests in backend.test