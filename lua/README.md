# Typebot Lua SDK



The Lua SDK for the Typebot API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Analytics()` — each with the same small set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/typebot-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("typebot_sdk")

local client = sdk.new({
  apikey = os.getenv("TYPEBOT_APIKEY"),
})
```

### 3. Load an analytics

Analytics is nested under typebot, so provide the `typebot_id`.

```lua
local analytics, err = client:Analytics():load({ typebot_id = "example_typebot_id" })
if err then error(err) end
print(analytics)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local billings, err = client:Billing():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Billing():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
TYPEBOT_TEST_LIVE=TRUE
TYPEBOT_APIKEY=<your-key>
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### TypebotSDK

```lua
local sdk = require("typebot_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### TypebotSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Analytics` | `(data) -> AnalyticsEntity` | Create an Analytics entity instance. |
| `Billing` | `(data) -> BillingEntity` | Create a Billing entity instance. |
| `Folder` | `(data) -> FolderEntity` | Create a Folder entity instance. |
| `Result` | `(data) -> ResultEntity` | Create a Result entity instance. |
| `Typebot` | `(data) -> TypebotEntity` | Create a Typebot entity instance. |
| `Workspace` | `(data) -> WorkspaceEntity` | Create a Workspace entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` / `remove` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local analytics, err = client:Analytics():load()
    if err then error(err) end
    -- analytics is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Analytics

| Field | Description |
| --- | --- |
| `totalCompleted` |  |
| `totalStarts` |  |
| `totalViews` |  |

Operations: Load.

API path: `/v1/typebots/{typebotId}/analytics/stats`

#### Billing

| Field | Description |
| --- | --- |
| `amount` |  |
| `currency` |  |
| `date` |  |
| `id` |  |
| `resetsAt` |  |
| `totalChatsUsed` |  |
| `url` |  |

Operations: List, Load.

API path: `/v1/billing/invoices`

#### Folder

| Field | Description |
| --- | --- |
| `createdAt` |  |
| `folder` |  |
| `folderName` |  |
| `id` |  |
| `name` |  |
| `parentFolderId` |  |
| `updatedAt` |  |
| `workspaceId` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/v1/folders`

#### Result

| Field | Description |
| --- | --- |
| `answers` |  |
| `context` |  |
| `createdAt` |  |
| `description` |  |
| `details` |  |
| `hasStarted` |  |
| `id` |  |
| `isArchived` |  |
| `isCompleted` |  |
| `lastChatSessionId` |  |
| `resultId` |  |
| `status` |  |
| `typebotId` |  |
| `variables` |  |

Operations: List, Load, Remove.

API path: `/v1/typebots/{typebotId}/results`

#### Typebot

| Field | Description |
| --- | --- |
| `accessRight` |  |
| `createdAt` |  |
| `customDomain` |  |
| `edges` |  |
| `enableSafetyFlags` |  |
| `events` |  |
| `folderId` |  |
| `fromTemplate` |  |
| `groups` |  |
| `icon` |  |
| `id` |  |
| `isArchived` |  |
| `isClosed` |  |
| `message` |  |
| `name` |  |
| `overwrite` | If true, even if we detect a conflict, we will overwrite push the updates to the typebot |
| `publicId` |  |
| `publishedTypebot` |  |
| `publishedTypebotId` |  |
| `resultsTablePreferences` |  |
| `riskLevel` |  |
| `selectedThemeTemplateId` |  |
| `settings` |  |
| `spaceId` |  |
| `theme` |  |
| `typebot` |  |
| `updatedAt` |  |
| `variables` |  |
| `version` | Provides the version the published bot was migrated from if `migrateToLatestVersion` is set to `true`. |
| `warnings` |  |
| `whatsAppCredentialsId` |  |
| `workspaceId` | [Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid) |

Operations: Create, List, Load, Remove, Update.

API path: `/v1/typebots/{typebotId}/publish`

#### Workspace

| Field | Description |
| --- | --- |
| `chatsHardLimit` |  |
| `createdAt` |  |
| `customChatsLimit` |  |
| `customSeatsLimit` |  |
| `icon` |  |
| `id` |  |
| `inactiveFirstEmailSentAt` |  |
| `inactiveSecondEmailSentAt` |  |
| `isPastDue` |  |
| `isSuspended` |  |
| `isVerified` |  |
| `lastActivityAt` |  |
| `name` |  |
| `plan` |  |
| `role` |  |
| `settings` |  |
| `stripeId` |  |
| `updatedAt` |  |
| `user` |  |
| `userId` |  |
| `workspaceId` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/v1/workspaces`



## Entities


### Analytics

Create an instance: `local analytics = client:Analytics(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `totalCompleted` | `number` |  |
| `totalStarts` | `number` |  |
| `totalViews` | `number` |  |

#### Example: Load

```lua
local analytics, err = client:Analytics():load({ typebot_id = "typebot_id" })
```


### Billing

Create an instance: `local billing = client:Billing(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `number` |  |
| `currency` | `string` |  |
| `date` | `any` |  |
| `id` | `string` |  |
| `resetsAt` | `string` |  |
| `totalChatsUsed` | `number` |  |
| `url` | `string` |  |

#### Example: Load

```lua
local billing, err = client:Billing():load({ id = "billing_id" })
```

#### Example: List

```lua
local billings, err = client:Billing():list()
```


### Folder

Create an instance: `local folder = client:Folder(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` |  |
| `folder` | `table` |  |
| `folderName` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `parentFolderId` | `any` |  |
| `updatedAt` | `string` |  |
| `workspaceId` | `string` |  |

#### Example: Load

```lua
local folder, err = client:Folder():load({ id = "folder_id" })
```

#### Example: List

```lua
local folders, err = client:Folder():list()
```

#### Example: Create

```lua
local folder, err = client:Folder():create({
  createdAt = "example_createdAt", -- string
  folder = {}, -- table
  id = "example_id", -- string
  name = "example_name", -- string
  parentFolderId = "example_parentFolderId", -- any
  updatedAt = "example_updatedAt", -- string
  workspaceId = "example_workspaceId", -- string
})
```


### Result

Create an instance: `local result = client:Result(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `answers` | `table` |  |
| `context` | `any` |  |
| `createdAt` | `string` |  |
| `description` | `string` |  |
| `details` | `any` |  |
| `hasStarted` | `any` |  |
| `id` | `string` |  |
| `isArchived` | `any` |  |
| `isCompleted` | `boolean` |  |
| `lastChatSessionId` | `any` |  |
| `resultId` | `string` |  |
| `status` | `string` |  |
| `typebotId` | `string` |  |
| `variables` | `table` |  |

#### Example: Load

```lua
local result, err = client:Result():load({ id = "result_id", typebot_id = "typebot_id" })
```

#### Example: List

```lua
local results, err = client:Result():list()
```


### Typebot

Create an instance: `local typebot = client:Typebot(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accessRight` | `string` |  |
| `createdAt` | `string` |  |
| `customDomain` | `any` |  |
| `edges` | `table` |  |
| `enableSafetyFlags` | `boolean` |  |
| `events` | `table` |  |
| `folderId` | `any` |  |
| `fromTemplate` | `string` |  |
| `groups` | `table` |  |
| `icon` | `any` |  |
| `id` | `string` |  |
| `isArchived` | `boolean` |  |
| `isClosed` | `boolean` |  |
| `message` | `any` |  |
| `name` | `string` |  |
| `overwrite` | `boolean` | If true, even if we detect a conflict, we will overwrite push the updates to the typebot |
| `publicId` | `any` |  |
| `publishedTypebot` | `any` |  |
| `publishedTypebotId` | `string` |  |
| `resultsTablePreferences` | `any` |  |
| `riskLevel` | `any` |  |
| `selectedThemeTemplateId` | `any` |  |
| `settings` | `table` |  |
| `spaceId` | `any` |  |
| `theme` | `table` |  |
| `typebot` | `table` |  |
| `updatedAt` | `string` |  |
| `variables` | `table` |  |
| `version` | `any` | Provides the version the published bot was migrated from if `migrateToLatestVersion` is set to `true`. |
| `warnings` | `table` |  |
| `whatsAppCredentialsId` | `any` |  |
| `workspaceId` | `string` | [Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid) |

#### Example: Load

```lua
local typebot, err = client:Typebot():load({ id = "typebot_id" })
```

#### Example: List

```lua
local typebots, err = client:Typebot():list()
```

#### Example: Create

```lua
local typebot, err = client:Typebot():create({
  accessRight = "example_accessRight", -- string
  createdAt = "example_createdAt", -- string
  customDomain = "example_customDomain", -- any
  edges = {}, -- table
  events = {}, -- table
  folderId = "example_folderId", -- any
  groups = {}, -- table
  icon = "example_icon", -- any
  id = "example_id", -- string
  isArchived = true, -- boolean
  isClosed = true, -- boolean
  message = "example_message", -- any
  name = "example_name", -- string
  publicId = "example_publicId", -- any
  publishedTypebot = "example_publishedTypebot", -- any
  resultsTablePreferences = "example_resultsTablePreferences", -- any
  riskLevel = "example_riskLevel", -- any
  selectedThemeTemplateId = "example_selectedThemeTemplateId", -- any
  settings = {}, -- table
  spaceId = "example_spaceId", -- any
  theme = {}, -- table
  typebot = {}, -- table
  updatedAt = "example_updatedAt", -- string
  variables = {}, -- table
  whatsAppCredentialsId = "example_whatsAppCredentialsId", -- any
  workspaceId = "example_workspaceId", -- string
})
```


### Workspace

Create an instance: `local workspace = client:Workspace(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `chatsHardLimit` | `any` |  |
| `createdAt` | `string` |  |
| `customChatsLimit` | `any` |  |
| `customSeatsLimit` | `any` |  |
| `icon` | `any` |  |
| `id` | `string` |  |
| `inactiveFirstEmailSentAt` | `any` |  |
| `inactiveSecondEmailSentAt` | `any` |  |
| `isPastDue` | `boolean` |  |
| `isSuspended` | `boolean` |  |
| `isVerified` | `any` |  |
| `lastActivityAt` | `any` |  |
| `name` | `string` |  |
| `plan` | `string` |  |
| `role` | `string` |  |
| `settings` | `any` |  |
| `stripeId` | `any` |  |
| `updatedAt` | `string` |  |
| `user` | `table` |  |
| `userId` | `string` |  |
| `workspaceId` | `string` |  |

#### Example: Load

```lua
local workspace, err = client:Workspace():load({ id = "workspace_id" })
```

#### Example: List

```lua
local workspaces, err = client:Workspace():list()
```

#### Example: Create

```lua
local workspace, err = client:Workspace():create({
  chatsHardLimit = "example_chatsHardLimit", -- any
  createdAt = "example_createdAt", -- string
  customChatsLimit = "example_customChatsLimit", -- any
  customSeatsLimit = "example_customSeatsLimit", -- any
  icon = "example_icon", -- any
  id = "example_id", -- string
  inactiveFirstEmailSentAt = "example_inactiveFirstEmailSentAt", -- any
  inactiveSecondEmailSentAt = "example_inactiveSecondEmailSentAt", -- any
  isPastDue = true, -- boolean
  isSuspended = true, -- boolean
  isVerified = "example_isVerified", -- any
  lastActivityAt = "example_lastActivityAt", -- any
  name = "example_name", -- string
  plan = "example_plan", -- string
  role = "example_role", -- string
  settings = "example_settings", -- any
  stripeId = "example_stripeId", -- any
  updatedAt = "example_updatedAt", -- string
  user = {}, -- table
  userId = "example_userId", -- string
  workspaceId = "example_workspaceId", -- string
})
```


## Open types

4 fields are carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes them with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `typebot` | `groups` | 19 | 14 levels |
| `typebot` | `publishedTypebot` | 19 | 20 levels |
| `typebot` | `typebot` | 19 | 24 levels |
| `typebot` | `events` | 3 | 1 level |

These values round-trip unchanged — read them, modify them, send them back. If
the API adds a `discriminator` to the definition, regenerating will type them.
Every other field is typed normally.

## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── typebot_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`typebot_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local billing = client:Billing()
billing:list()

-- billing:data_get() now returns the billing data from the last list
-- billing:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
