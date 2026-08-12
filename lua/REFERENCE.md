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
| `totalCompleted` | `number` | Yes |  |
| `totalStarts` | `number` | Yes |  |
| `totalViews` | `number` | Yes |  |

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
| `resetsAt` | `string` | Yes |  |
| `totalChatsUsed` | `number` | Yes |  |
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
| `createdAt` | `string` | Yes |  |
| `folder` | `table` | Yes |  |
| `folderName` | `string` | No |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `parentFolderId` | `any` | Yes |  |
| `updatedAt` | `string` | Yes |  |
| `workspaceId` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `createdAt` | - | - | - | - | - |
| `folder` | - | - | - | - | - |
| `folderName` | - | - | - | - | - |
| `id` | - | - | Yes | - | - |
| `name` | - | - | - | - | - |
| `parentFolderId` | - | - | Yes | - | - |
| `updatedAt` | - | - | - | - | - |
| `workspaceId` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Folder():create({
  createdAt = --[[ string ]],
  folder = --[[ table ]],
  id = --[[ string ]],
  name = --[[ string ]],
  parentFolderId = --[[ any ]],
  updatedAt = --[[ string ]],
  workspaceId = --[[ string ]],
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
| `answers` | `table` | Yes |  |
| `context` | `any` | Yes |  |
| `createdAt` | `string` | Yes |  |
| `description` | `string` | Yes |  |
| `details` | `any` | Yes |  |
| `hasStarted` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `isArchived` | `any` | Yes |  |
| `isCompleted` | `boolean` | Yes |  |
| `lastChatSessionId` | `any` | Yes |  |
| `resultId` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `typebotId` | `string` | Yes |  |
| `variables` | `table` | Yes |  |

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
| `accessRight` | `string` | Yes |  |
| `createdAt` | `string` | Yes |  |
| `customDomain` | `any` | Yes |  |
| `edges` | `table` | Yes |  |
| `enableSafetyFlags` | `boolean` | No |  |
| `events` | `table` | Yes |  |
| `folderId` | `any` | Yes |  |
| `fromTemplate` | `string` | No |  |
| `groups` | `table` | Yes |  |
| `icon` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `isArchived` | `boolean` | Yes |  |
| `isClosed` | `boolean` | Yes |  |
| `message` | `any` | Yes |  |
| `name` | `string` | Yes |  |
| `overwrite` | `boolean` | No |  |
| `publicId` | `any` | Yes |  |
| `publishedTypebot` | `any` | Yes |  |
| `publishedTypebotId` | `string` | No |  |
| `resultsTablePreferences` | `any` | Yes |  |
| `riskLevel` | `any` | Yes |  |
| `selectedThemeTemplateId` | `any` | Yes |  |
| `settings` | `table` | Yes |  |
| `spaceId` | `any` | Yes |  |
| `theme` | `table` | Yes |  |
| `typebot` | `table` | Yes |  |
| `updatedAt` | `string` | Yes |  |
| `variables` | `table` | Yes |  |
| `version` | `any` | No |  |
| `warnings` | `table` | No |  |
| `whatsAppCredentialsId` | `any` | Yes |  |
| `workspaceId` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `accessRight` | - | - | - | - | - |
| `createdAt` | - | - | - | - | - |
| `customDomain` | - | - | - | - | - |
| `edges` | - | - | - | - | - |
| `enableSafetyFlags` | - | - | - | - | - |
| `events` | - | - | - | - | - |
| `folderId` | - | - | - | - | - |
| `fromTemplate` | - | - | - | - | - |
| `groups` | - | - | - | - | - |
| `icon` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `isArchived` | - | - | - | - | - |
| `isClosed` | - | - | - | - | - |
| `message` | - | - | - | - | - |
| `name` | - | - | - | - | - |
| `overwrite` | - | - | - | - | - |
| `publicId` | - | - | - | - | - |
| `publishedTypebot` | - | - | - | - | - |
| `publishedTypebotId` | - | - | - | - | - |
| `resultsTablePreferences` | - | - | - | - | - |
| `riskLevel` | - | - | - | - | - |
| `selectedThemeTemplateId` | - | - | - | - | - |
| `settings` | - | - | - | - | - |
| `spaceId` | - | - | - | - | - |
| `theme` | - | - | - | - | - |
| `typebot` | - | - | - | - | - |
| `updatedAt` | - | - | - | - | - |
| `variables` | - | - | - | - | - |
| `version` | - | - | Yes | Yes | - |
| `warnings` | - | - | - | - | - |
| `whatsAppCredentialsId` | - | - | - | - | - |
| `workspaceId` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Typebot():create({
  accessRight = --[[ string ]],
  createdAt = --[[ string ]],
  customDomain = --[[ any ]],
  edges = --[[ table ]],
  events = --[[ table ]],
  folderId = --[[ any ]],
  groups = --[[ table ]],
  icon = --[[ any ]],
  id = --[[ string ]],
  isArchived = --[[ boolean ]],
  isClosed = --[[ boolean ]],
  message = --[[ any ]],
  name = --[[ string ]],
  publicId = --[[ any ]],
  publishedTypebot = --[[ any ]],
  resultsTablePreferences = --[[ any ]],
  riskLevel = --[[ any ]],
  selectedThemeTemplateId = --[[ any ]],
  settings = --[[ table ]],
  spaceId = --[[ any ]],
  theme = --[[ table ]],
  typebot = --[[ table ]],
  updatedAt = --[[ string ]],
  variables = --[[ table ]],
  whatsAppCredentialsId = --[[ any ]],
  workspaceId = --[[ string ]],
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
| `chatsHardLimit` | `any` | Yes |  |
| `createdAt` | `string` | Yes |  |
| `customChatsLimit` | `any` | Yes |  |
| `customSeatsLimit` | `any` | Yes |  |
| `icon` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `inactiveFirstEmailSentAt` | `any` | Yes |  |
| `inactiveSecondEmailSentAt` | `any` | Yes |  |
| `isPastDue` | `boolean` | Yes |  |
| `isSuspended` | `boolean` | Yes |  |
| `isVerified` | `any` | Yes |  |
| `lastActivityAt` | `any` | Yes |  |
| `name` | `string` | Yes |  |
| `plan` | `string` | Yes |  |
| `role` | `string` | Yes |  |
| `settings` | `any` | Yes |  |
| `stripeId` | `any` | Yes |  |
| `updatedAt` | `string` | Yes |  |
| `user` | `table` | Yes |  |
| `userId` | `string` | Yes |  |
| `workspaceId` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `chatsHardLimit` | - | - | - | - | - |
| `createdAt` | - | - | - | - | - |
| `customChatsLimit` | - | - | - | - | - |
| `customSeatsLimit` | - | - | - | - | - |
| `icon` | - | - | Yes | Yes | - |
| `id` | - | - | - | - | - |
| `inactiveFirstEmailSentAt` | - | - | - | - | - |
| `inactiveSecondEmailSentAt` | - | - | - | - | - |
| `isPastDue` | - | - | - | - | - |
| `isSuspended` | - | - | - | - | - |
| `isVerified` | - | - | - | - | - |
| `lastActivityAt` | - | - | - | - | - |
| `name` | - | - | - | Yes | - |
| `plan` | - | - | - | - | - |
| `role` | - | - | - | - | - |
| `settings` | - | - | - | - | - |
| `stripeId` | - | - | - | - | - |
| `updatedAt` | - | - | - | - | - |
| `user` | - | - | - | - | - |
| `userId` | - | - | - | - | - |
| `workspaceId` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Workspace():create({
  chatsHardLimit = --[[ any ]],
  createdAt = --[[ string ]],
  customChatsLimit = --[[ any ]],
  customSeatsLimit = --[[ any ]],
  icon = --[[ any ]],
  id = --[[ string ]],
  inactiveFirstEmailSentAt = --[[ any ]],
  inactiveSecondEmailSentAt = --[[ any ]],
  isPastDue = --[[ boolean ]],
  isSuspended = --[[ boolean ]],
  isVerified = --[[ any ]],
  lastActivityAt = --[[ any ]],
  name = --[[ string ]],
  plan = --[[ string ]],
  role = --[[ string ]],
  settings = --[[ any ]],
  stripeId = --[[ any ]],
  updatedAt = --[[ string ]],
  user = --[[ table ]],
  userId = --[[ string ]],
  workspaceId = --[[ string ]],
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

