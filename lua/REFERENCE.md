# Typebot Lua SDK Reference

Complete API reference for the Typebot Lua SDK.


## TypebotSDK

### Constructor

```lua
local sdk = require("typebot_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Analytics(data)`

Create a new `Analytics` entity instance. Pass `nil` for no initial data.

#### `Billing(data)`

Create a new `Billing` entity instance. Pass `nil` for no initial data.

#### `Folder(data)`

Create a new `Folder` entity instance. Pass `nil` for no initial data.

#### `Result(data)`

Create a new `Result` entity instance. Pass `nil` for no initial data.

#### `Typebot(data)`

Create a new `Typebot` entity instance. Pass `nil` for no initial data.

#### `Workspace(data)`

Create a new `Workspace` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AnalyticsEntity

```lua
local analytics = client:Analytics(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `total_completed` | `number` | Yes |  |
| `total_start` | `number` | Yes |  |
| `total_view` | `number` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Analytics():load({ typebot_id = "typebot_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AnalyticsEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BillingEntity

```lua
local billing = client:Billing(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `number` | Yes |  |
| `currency` | `string` | Yes |  |
| `date` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `resets_at` | `string` | Yes |  |
| `total_chats_used` | `number` | Yes |  |
| `url` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Billing():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Billing():load({ id = "billing_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BillingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FolderEntity

```lua
local folder = client:Folder(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `folder` | `table` | Yes |  |
| `folder_name` | `string` | No |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `parent_folder_id` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `workspace_id` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - |
| `folder` | - | - | - | - | - |
| `folder_name` | - | - | - | - | - |
| `id` | - | - | Yes | - | - |
| `name` | - | - | - | - | - |
| `parent_folder_id` | - | - | Yes | - | - |
| `updated_at` | - | - | - | - | - |
| `workspace_id` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Folder():create({
  created_at = --[[ string ]],
  folder = --[[ table ]],
  id = --[[ string ]],
  name = --[[ string ]],
  parent_folder_id = --[[ string ]],
  updated_at = --[[ string ]],
  workspace_id = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Folder():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Folder():load({ id = "folder_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Folder():remove({ id = "folder_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Folder():update({
  id = "folder_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FolderEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ResultEntity

```lua
local result = client:Result(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `answer` | `table` | Yes |  |
| `context` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `description` | `string` | Yes |  |
| `detail` | `any` | Yes |  |
| `has_started` | `boolean` | Yes |  |
| `id` | `string` | Yes |  |
| `is_archived` | `boolean` | Yes |  |
| `is_completed` | `boolean` | Yes |  |
| `last_chat_session_id` | `string` | Yes |  |
| `result_id` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `typebot_id` | `string` | Yes |  |
| `variable` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Result():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Result():load({ id = "result_id", typebot_id = "typebot_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Result():remove({ typebot_id = "typebot_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResultEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TypebotEntity

```lua
local typebot = client:Typebot(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_right` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `current_user_mode` | `string` | Yes |  |
| `custom_domain` | `any` | Yes |  |
| `edge` | `table` | Yes |  |
| `enable_safety_flag` | `boolean` | No |  |
| `event` | `table` | Yes |  |
| `folder_id` | `string` | Yes |  |
| `from_template` | `string` | No |  |
| `group` | `table` | Yes |  |
| `icon` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `is_archived` | `boolean` | Yes |  |
| `is_closed` | `boolean` | Yes |  |
| `message` | `any` | Yes |  |
| `name` | `string` | Yes |  |
| `overwrite` | `boolean` | No |  |
| `public_id` | `string` | Yes |  |
| `published_typebot` | `any` | Yes |  |
| `published_typebot_id` | `string` | No |  |
| `results_table_preference` | `any` | Yes |  |
| `risk_level` | `any` | Yes |  |
| `selected_theme_template_id` | `string` | Yes |  |
| `setting` | `table` | Yes |  |
| `space_id` | `string` | Yes |  |
| `theme` | `table` | Yes |  |
| `typebot` | `any` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `variable` | `table` | Yes |  |
| `version` | `any` | No |  |
| `warning` | `table` | No |  |
| `whats_app_credentials_id` | `string` | Yes |  |
| `workspace_id` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `access_right` | - | - | - | - | - |
| `created_at` | - | - | - | - | - |
| `current_user_mode` | - | - | - | - | - |
| `custom_domain` | - | - | - | - | - |
| `edge` | - | - | - | - | - |
| `enable_safety_flag` | - | - | - | - | - |
| `event` | - | - | - | - | - |
| `folder_id` | - | - | - | - | - |
| `from_template` | - | - | - | - | - |
| `group` | - | - | - | - | - |
| `icon` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `is_archived` | - | - | - | - | - |
| `is_closed` | - | - | - | - | - |
| `message` | - | - | - | - | - |
| `name` | - | - | - | - | - |
| `overwrite` | - | - | - | - | - |
| `public_id` | - | - | - | - | - |
| `published_typebot` | - | - | - | - | - |
| `published_typebot_id` | - | - | - | - | - |
| `results_table_preference` | - | - | - | - | - |
| `risk_level` | - | - | - | - | - |
| `selected_theme_template_id` | - | - | - | - | - |
| `setting` | - | - | - | - | - |
| `space_id` | - | - | - | - | - |
| `theme` | - | - | - | - | - |
| `typebot` | - | - | - | - | - |
| `updated_at` | - | - | - | - | - |
| `variable` | - | - | - | - | - |
| `version` | - | - | Yes | Yes | - |
| `warning` | - | - | - | - | - |
| `whats_app_credentials_id` | - | - | - | - | - |
| `workspace_id` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Typebot():create({
  access_right = --[[ string ]],
  created_at = --[[ string ]],
  current_user_mode = --[[ string ]],
  custom_domain = --[[ any ]],
  edge = --[[ table ]],
  event = --[[ table ]],
  folder_id = --[[ string ]],
  group = --[[ table ]],
  icon = --[[ any ]],
  id = --[[ string ]],
  is_archived = --[[ boolean ]],
  is_closed = --[[ boolean ]],
  message = --[[ any ]],
  name = --[[ string ]],
  public_id = --[[ string ]],
  published_typebot = --[[ any ]],
  results_table_preference = --[[ any ]],
  risk_level = --[[ any ]],
  selected_theme_template_id = --[[ string ]],
  setting = --[[ table ]],
  space_id = --[[ string ]],
  theme = --[[ table ]],
  typebot = --[[ any ]],
  updated_at = --[[ string ]],
  variable = --[[ table ]],
  whats_app_credentials_id = --[[ string ]],
  workspace_id = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Typebot():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Typebot():load({ id = "typebot_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Typebot():remove({ id = "typebot_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Typebot():update({
  id = "typebot_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TypebotEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WorkspaceEntity

```lua
local workspace = client:Workspace(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chats_hard_limit` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `current_user_mode` | `string` | Yes |  |
| `icon` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `inactive_first_email_sent_at` | `any` | Yes |  |
| `inactive_second_email_sent_at` | `any` | Yes |  |
| `is_past_due` | `boolean` | Yes |  |
| `is_suspended` | `boolean` | Yes |  |
| `is_verified` | `boolean` | Yes |  |
| `last_activity_at` | `any` | Yes |  |
| `name` | `string` | Yes |  |
| `plan` | `string` | Yes |  |
| `role` | `string` | Yes |  |
| `setting` | `any` | Yes |  |
| `stripe_id` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `user` | `table` | Yes |  |
| `user_id` | `string` | Yes |  |
| `workspace` | `table` | Yes |  |
| `workspace_id` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `chats_hard_limit` | - | - | - | - | - |
| `created_at` | - | - | - | - | - |
| `current_user_mode` | - | - | - | - | - |
| `icon` | - | - | Yes | Yes | - |
| `id` | - | - | - | - | - |
| `inactive_first_email_sent_at` | - | - | - | - | - |
| `inactive_second_email_sent_at` | - | - | - | - | - |
| `is_past_due` | - | - | - | - | - |
| `is_suspended` | - | - | - | - | - |
| `is_verified` | - | - | - | - | - |
| `last_activity_at` | - | - | - | - | - |
| `name` | - | - | - | Yes | - |
| `plan` | - | - | - | - | - |
| `role` | - | - | - | - | - |
| `setting` | - | - | - | - | - |
| `stripe_id` | - | - | - | - | - |
| `updated_at` | - | - | - | - | - |
| `user` | - | - | - | - | - |
| `user_id` | - | - | - | - | - |
| `workspace` | - | - | - | - | - |
| `workspace_id` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Workspace():create({
  chats_hard_limit = --[[ any ]],
  created_at = --[[ string ]],
  current_user_mode = --[[ string ]],
  icon = --[[ any ]],
  id = --[[ string ]],
  inactive_first_email_sent_at = --[[ any ]],
  inactive_second_email_sent_at = --[[ any ]],
  is_past_due = --[[ boolean ]],
  is_suspended = --[[ boolean ]],
  is_verified = --[[ boolean ]],
  last_activity_at = --[[ any ]],
  name = --[[ string ]],
  plan = --[[ string ]],
  role = --[[ string ]],
  setting = --[[ any ]],
  stripe_id = --[[ string ]],
  updated_at = --[[ string ]],
  user = --[[ table ]],
  user_id = --[[ string ]],
  workspace = --[[ table ]],
  workspace_id = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Workspace():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Workspace():load({ id = "workspace_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Workspace():remove({ id = "workspace_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Workspace():update({
  id = "workspace_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WorkspaceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

