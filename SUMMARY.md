# Builder API

The Builder API.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 6 entities and 27 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [Analytics](docs/api/analytics.html)

Results: OK.

SDK operations: `load`.

### [Billing](docs/api/billing.html)

Results: OK.

SDK operations: `list`, `load`.

### [Folder](docs/api/folder.html)

Results: OK.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### [Result](docs/api/result.html)

Results: OK.

SDK operations: `list`, `load`, `remove`.

### [Typebot](docs/api/typebot.html)

Results: OK.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `overwrite`: If true, even if we detect a conflict, we will overwrite push the updates to the typebot
- `version`: Provides the version the published bot was migrated from if `migrateToLatestVersion` is set to `true`.

### [Workspace](docs/api/workspace.html)

Results: OK.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [Analytics](docs/api/analytics.html) | `load` | `GET /v1/typebots/{typebotId}/analytics/stats` | Required |
| [Billing](docs/api/billing.html) | `list` | `GET /v1/billing/invoices` | Required |
| [Billing](docs/api/billing.html) | `load` | `GET /v1/billing/usage` | Required |
| [Folder](docs/api/folder.html) | `create` | `POST /v1/folders` | Required |
| [Folder](docs/api/folder.html) | `list` | `GET /v1/folders` | Required |
| [Folder](docs/api/folder.html) | `load` | `GET /v1/folders/{folderId}` | Required |
| [Folder](docs/api/folder.html) | `remove` | `DELETE /v1/folders/{folderId}` | Required |
| [Folder](docs/api/folder.html) | `update` | `PATCH /v1/folders/{folderId}` | Required |
| [Result](docs/api/result.html) | `list` | `GET /v1/typebots/{typebotId}/results` | Required |
| [Result](docs/api/result.html) | `list` | `GET /v1/typebots/{typebotId}/results/{resultId}/logs` | Required |
| [Result](docs/api/result.html) | `load` | `GET /v1/typebots/{typebotId}/results/{resultId}` | Required |
| [Result](docs/api/result.html) | `remove` | `DELETE /v1/typebots/{typebotId}/results` | Required |
| [Typebot](docs/api/typebot.html) | `create` | `POST /v1/typebots/{typebotId}/publish` | Required |
| [Typebot](docs/api/typebot.html) | `create` | `POST /v1/typebots/{typebotId}/unpublish` | Required |
| [Typebot](docs/api/typebot.html) | `create` | `POST /v1/typebots` | Required |
| [Typebot](docs/api/typebot.html) | `create` | `POST /v1/typebots/import` | Required |
| [Typebot](docs/api/typebot.html) | `list` | `GET /v1/typebots` | Required |
| [Typebot](docs/api/typebot.html) | `load` | `GET /v1/typebots/{typebotId}` | See reference |
| [Typebot](docs/api/typebot.html) | `load` | `GET /v1/typebots/{typebotId}/publishedTypebot` | Required |
| [Typebot](docs/api/typebot.html) | `remove` | `DELETE /v1/typebots/{typebotId}` | Required |
| [Typebot](docs/api/typebot.html) | `update` | `PATCH /v1/typebots/{typebotId}` | Required |
| [Workspace](docs/api/workspace.html) | `create` | `POST /v1/workspaces` | Required |
| [Workspace](docs/api/workspace.html) | `list` | `GET /v1/workspaces/{workspaceId}/members` | Required |
| [Workspace](docs/api/workspace.html) | `list` | `GET /v1/workspaces` | Required |
| [Workspace](docs/api/workspace.html) | `load` | `GET /v1/workspaces/{workspaceId}` | Required |
| [Workspace](docs/api/workspace.html) | `remove` | `DELETE /v1/workspaces/{workspaceId}` | Required |
| [Workspace](docs/api/workspace.html) | `update` | `PATCH /v1/workspaces/{workspaceId}` | Required |

## Connect to the API

- API server: `https://app.typebot.com/api`

The default credential is sent in the `Authorization` header with the `Bearer` prefix.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [JavaScript](docs/sdks/js.html) | `js/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `typebot_list`: List records for an entity. Supported entities: `billing`, `folder`, `result`, `typebot`, `workspace`.
- `typebot_load`: Load one record for an entity. Supported entities: `analytics`, `billing`, `folder`, `result`, `typebot`, `workspace`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

