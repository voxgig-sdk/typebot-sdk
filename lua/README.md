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
| `total_completed` |  |
| `total_start` |  |
| `total_view` |  |

Operations: Load.

API path: `/v1/typebots/{typebotId}/analytics/stats`

#### Billing

| Field | Description |
| --- | --- |
| `amount` |  |
| `currency` |  |
| `date` |  |
| `id` |  |
| `resets_at` |  |
| `total_chats_used` |  |
| `url` |  |

Operations: List, Load.

API path: `/v1/billing/invoices`

#### Folder

| Field | Description |
| --- | --- |
| `created_at` |  |
| `folder` |  |
| `folder_name` |  |
| `id` |  |
| `name` |  |
| `parent_folder_id` |  |
| `updated_at` |  |
| `workspace_id` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/v1/folders`

#### Result

| Field | Description |
| --- | --- |
| `answer` |  |
| `context` |  |
| `created_at` |  |
| `description` |  |
| `detail` |  |
| `has_started` |  |
| `id` |  |
| `is_archived` |  |
| `is_completed` |  |
| `last_chat_session_id` |  |
| `result_id` |  |
| `status` |  |
| `typebot_id` |  |
| `variable` |  |

Operations: List, Load, Remove.

API path: `/v1/typebots/{typebotId}/results`

#### Typebot

| Field | Description |
| --- | --- |
| `access_right` |  |
| `created_at` |  |
| `current_user_mode` |  |
| `custom_domain` |  |
| `edge` |  |
| `enable_safety_flag` |  |
| `event` |  |
| `folder_id` |  |
| `from_template` |  |
| `group` |  |
| `icon` |  |
| `id` |  |
| `is_archived` |  |
| `is_closed` |  |
| `message` |  |
| `name` |  |
| `overwrite` |  |
| `public_id` |  |
| `published_typebot` |  |
| `published_typebot_id` |  |
| `results_table_preference` |  |
| `risk_level` |  |
| `selected_theme_template_id` |  |
| `setting` |  |
| `space_id` |  |
| `theme` |  |
| `typebot` |  |
| `updated_at` |  |
| `variable` |  |
| `version` |  |
| `warning` |  |
| `whats_app_credentials_id` |  |
| `workspace_id` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/v1/typebots/{typebotId}/publish`

#### Workspace

| Field | Description |
| --- | --- |
| `chats_hard_limit` |  |
| `created_at` |  |
| `current_user_mode` |  |
| `icon` |  |
| `id` |  |
| `inactive_first_email_sent_at` |  |
| `inactive_second_email_sent_at` |  |
| `is_past_due` |  |
| `is_suspended` |  |
| `is_verified` |  |
| `last_activity_at` |  |
| `name` |  |
| `plan` |  |
| `role` |  |
| `setting` |  |
| `stripe_id` |  |
| `updated_at` |  |
| `user` |  |
| `user_id` |  |
| `workspace` |  |
| `workspace_id` |  |

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
| `total_completed` | `number` |  |
| `total_start` | `number` |  |
| `total_view` | `number` |  |

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
| `resets_at` | `string` |  |
| `total_chats_used` | `number` |  |
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
| `created_at` | `string` |  |
| `folder` | `table` |  |
| `folder_name` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `parent_folder_id` | `string` |  |
| `updated_at` | `string` |  |
| `workspace_id` | `string` |  |

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
  created_at = "example_created_at", -- string
  folder = {}, -- table
  id = "example_id", -- string
  name = "example_name", -- string
  parent_folder_id = "example_parent_folder_id", -- string
  updated_at = "example_updated_at", -- string
  workspace_id = "example_workspace_id", -- string
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
| `answer` | `table` |  |
| `context` | `any` |  |
| `created_at` | `string` |  |
| `description` | `string` |  |
| `detail` | `any` |  |
| `has_started` | `boolean` |  |
| `id` | `string` |  |
| `is_archived` | `boolean` |  |
| `is_completed` | `boolean` |  |
| `last_chat_session_id` | `string` |  |
| `result_id` | `string` |  |
| `status` | `string` |  |
| `typebot_id` | `string` |  |
| `variable` | `table` |  |

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
| `access_right` | `string` |  |
| `created_at` | `string` |  |
| `current_user_mode` | `string` |  |
| `custom_domain` | `any` |  |
| `edge` | `table` |  |
| `enable_safety_flag` | `boolean` |  |
| `event` | `table` |  |
| `folder_id` | `string` |  |
| `from_template` | `string` |  |
| `group` | `table` |  |
| `icon` | `any` |  |
| `id` | `string` |  |
| `is_archived` | `boolean` |  |
| `is_closed` | `boolean` |  |
| `message` | `any` |  |
| `name` | `string` |  |
| `overwrite` | `boolean` |  |
| `public_id` | `string` |  |
| `published_typebot` | `any` |  |
| `published_typebot_id` | `string` |  |
| `results_table_preference` | `any` |  |
| `risk_level` | `any` |  |
| `selected_theme_template_id` | `string` |  |
| `setting` | `table` |  |
| `space_id` | `string` |  |
| `theme` | `table` |  |
| `typebot` | `any` |  |
| `updated_at` | `string` |  |
| `variable` | `table` |  |
| `version` | `any` |  |
| `warning` | `table` |  |
| `whats_app_credentials_id` | `string` |  |
| `workspace_id` | `string` |  |

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
  access_right = "example_access_right", -- string
  created_at = "example_created_at", -- string
  current_user_mode = "example_current_user_mode", -- string
  custom_domain = "example_custom_domain", -- any
  edge = {}, -- table
  event = {}, -- table
  folder_id = "example_folder_id", -- string
  group = {}, -- table
  icon = "example_icon", -- any
  id = "example_id", -- string
  is_archived = true, -- boolean
  is_closed = true, -- boolean
  message = "example_message", -- any
  name = "example_name", -- string
  public_id = "example_public_id", -- string
  published_typebot = "example_published_typebot", -- any
  results_table_preference = "example_results_table_preference", -- any
  risk_level = "example_risk_level", -- any
  selected_theme_template_id = "example_selected_theme_template_id", -- string
  setting = {}, -- table
  space_id = "example_space_id", -- string
  theme = {}, -- table
  typebot = "example_typebot", -- any
  updated_at = "example_updated_at", -- string
  variable = {}, -- table
  whats_app_credentials_id = "example_whats_app_credentials_id", -- string
  workspace_id = "example_workspace_id", -- string
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
| `chats_hard_limit` | `any` |  |
| `created_at` | `string` |  |
| `current_user_mode` | `string` |  |
| `icon` | `any` |  |
| `id` | `string` |  |
| `inactive_first_email_sent_at` | `any` |  |
| `inactive_second_email_sent_at` | `any` |  |
| `is_past_due` | `boolean` |  |
| `is_suspended` | `boolean` |  |
| `is_verified` | `boolean` |  |
| `last_activity_at` | `any` |  |
| `name` | `string` |  |
| `plan` | `string` |  |
| `role` | `string` |  |
| `setting` | `any` |  |
| `stripe_id` | `string` |  |
| `updated_at` | `string` |  |
| `user` | `table` |  |
| `user_id` | `string` |  |
| `workspace` | `table` |  |
| `workspace_id` | `string` |  |

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
  chats_hard_limit = "example_chats_hard_limit", -- any
  created_at = "example_created_at", -- string
  current_user_mode = "example_current_user_mode", -- string
  icon = "example_icon", -- any
  id = "example_id", -- string
  inactive_first_email_sent_at = "example_inactive_first_email_sent_at", -- any
  inactive_second_email_sent_at = "example_inactive_second_email_sent_at", -- any
  is_past_due = true, -- boolean
  is_suspended = true, -- boolean
  is_verified = true, -- boolean
  last_activity_at = "example_last_activity_at", -- any
  name = "example_name", -- string
  plan = "example_plan", -- string
  role = "example_role", -- string
  setting = "example_setting", -- any
  stripe_id = "example_stripe_id", -- string
  updated_at = "example_updated_at", -- string
  user = {}, -- table
  user_id = "example_user_id", -- string
  workspace = {}, -- table
  workspace_id = "example_workspace_id", -- string
})
```


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
