# Typebot Golang SDK Reference

Complete API reference for the Typebot Golang SDK.


## TypebotSDK

### Constructor

```go
func NewTypebotSDK(options map[string]any) *TypebotSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *TypebotSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *TypebotSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Analytics(data map[string]any) TypebotEntity`

Create a new `Analytics` entity instance. Pass `nil` for no initial data.

#### `Billing(data map[string]any) TypebotEntity`

Create a new `Billing` entity instance. Pass `nil` for no initial data.

#### `Folder(data map[string]any) TypebotEntity`

Create a new `Folder` entity instance. Pass `nil` for no initial data.

#### `Result(data map[string]any) TypebotEntity`

Create a new `Result` entity instance. Pass `nil` for no initial data.

#### `Typebot(data map[string]any) TypebotEntity`

Create a new `Typebot` entity instance. Pass `nil` for no initial data.

#### `Workspace(data map[string]any) TypebotEntity`

Create a new `Workspace` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AnalyticsEntity

```go
analytics := client.Analytics(nil)
fmt.Println(analytics.GetName()) // "analytics"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `totalCompleted` | `float64` | Yes |  |
| `totalStarts` | `float64` | Yes |  |
| `totalViews` | `float64` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Analytics(nil).Load(map[string]any{"typebot_id": "typebot_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AnalyticsEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## BillingEntity

```go
billing := client.Billing(nil)
fmt.Println(billing.GetName()) // "billing"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float64` | Yes |  |
| `currency` | `string` | Yes |  |
| `date` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `resetsAt` | `string` | Yes |  |
| `totalChatsUsed` | `float64` | Yes |  |
| `url` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Billing(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Billing(nil).Load(map[string]any{"workspace_id": "workspace_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BillingEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## FolderEntity

```go
folder := client.Folder(nil)
fmt.Println(folder.GetName()) // "folder"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | Yes |  |
| `folder` | `map[string]any` | Yes |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Folder(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Folder(nil).Load(map[string]any{"id": "folder_id", "workspace_id": "workspace_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Folder(nil).Create(map[string]any{
    "createdAt": "example_createdAt",
    "folder": map[string]any{},
    "id": "example_id",
    "name": "example_name",
    "parentFolderId": "example_parentFolderId",
    "updatedAt": "example_updatedAt",
    "workspaceId": "example_workspaceId",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Folder(nil).Update(map[string]any{
    "id": "folder_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Folder(nil).Remove(map[string]any{"id": "folder_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FolderEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ResultEntity

```go
result := client.Result(nil)
fmt.Println(result.GetName()) // "result"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `answers` | `[]any` | Yes |  |
| `context` | `any` | Yes |  |
| `createdAt` | `string` | Yes |  |
| `description` | `string` | Yes |  |
| `details` | `any` | Yes |  |
| `hasStarted` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `isArchived` | `any` | Yes |  |
| `isCompleted` | `bool` | Yes |  |
| `lastChatSessionId` | `any` | Yes |  |
| `resultId` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `typebotId` | `string` | Yes |  |
| `variables` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Result(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Result(nil).Load(map[string]any{"id": "result_id", "typebot_id": "typebot_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Result(nil).Remove(map[string]any{"typebot_id": "typebot_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ResultEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TypebotEntity

```go
typebot := client.Typebot(nil)
fmt.Println(typebot.GetName()) // "typebot"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accessRight` | `string` | Yes |  |
| `createdAt` | `string` | Yes |  |
| `customDomain` | `any` | Yes |  |
| `edges` | `[]any` | Yes |  |
| `enableSafetyFlags` | `bool` | No |  |
| `events` | `[]any` | Yes |  |
| `folderId` | `any` | Yes |  |
| `fromTemplate` | `string` | No |  |
| `groups` | `[]any` | Yes |  |
| `icon` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `isArchived` | `bool` | Yes |  |
| `isClosed` | `bool` | Yes |  |
| `message` | `any` | Yes |  |
| `name` | `string` | Yes |  |
| `overwrite` | `bool` | No | If true, even if we detect a conflict, we will overwrite push the updates to the typebot |
| `publicId` | `any` | Yes |  |
| `publishedTypebot` | `any` | Yes |  |
| `publishedTypebotId` | `string` | No |  |
| `resultsTablePreferences` | `any` | Yes |  |
| `riskLevel` | `any` | Yes |  |
| `selectedThemeTemplateId` | `any` | Yes |  |
| `settings` | `map[string]any` | Yes |  |
| `spaceId` | `any` | Yes |  |
| `theme` | `map[string]any` | Yes |  |
| `typebot` | `map[string]any` | Yes |  |
| `updatedAt` | `string` | Yes |  |
| `variables` | `[]any` | Yes |  |
| `version` | `any` | No | Provides the version the published bot was migrated from if `migrateToLatestVersion` is set to `true`. |
| `warnings` | `[]any` | No |  |
| `whatsAppCredentialsId` | `any` | Yes |  |
| `workspaceId` | `string` | Yes | [Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid) |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Typebot(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Typebot(nil).Load(map[string]any{"id": "typebot_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Typebot(nil).Create(map[string]any{
    "accessRight": "example_accessRight",
    "createdAt": "example_createdAt",
    "customDomain": "example_customDomain",
    "edges": []any{},
    "events": []any{},
    "folderId": "example_folderId",
    "groups": []any{},
    "icon": "example_icon",
    "id": "example_id",
    "isArchived": true,
    "isClosed": true,
    "message": "example_message",
    "name": "example_name",
    "publicId": "example_publicId",
    "publishedTypebot": "example_publishedTypebot",
    "resultsTablePreferences": "example_resultsTablePreferences",
    "riskLevel": "example_riskLevel",
    "selectedThemeTemplateId": "example_selectedThemeTemplateId",
    "settings": map[string]any{},
    "spaceId": "example_spaceId",
    "theme": map[string]any{},
    "typebot": map[string]any{},
    "updatedAt": "example_updatedAt",
    "variables": []any{},
    "whatsAppCredentialsId": "example_whatsAppCredentialsId",
    "workspaceId": "example_workspaceId",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Typebot(nil).Update(map[string]any{
    "id": "typebot_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Typebot(nil).Remove(map[string]any{"id": "typebot_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TypebotEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## WorkspaceEntity

```go
workspace := client.Workspace(nil)
fmt.Println(workspace.GetName()) // "workspace"
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
| `isPastDue` | `bool` | Yes |  |
| `isSuspended` | `bool` | Yes |  |
| `isVerified` | `any` | Yes |  |
| `lastActivityAt` | `any` | Yes |  |
| `name` | `string` | Yes |  |
| `plan` | `string` | Yes |  |
| `role` | `string` | Yes |  |
| `settings` | `any` | Yes |  |
| `stripeId` | `any` | Yes |  |
| `updatedAt` | `string` | Yes |  |
| `user` | `map[string]any` | Yes |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Workspace(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Workspace(nil).Load(map[string]any{"id": "workspace_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Workspace(nil).Create(map[string]any{
    "chatsHardLimit": "example_chatsHardLimit",
    "createdAt": "example_createdAt",
    "customChatsLimit": "example_customChatsLimit",
    "customSeatsLimit": "example_customSeatsLimit",
    "icon": "example_icon",
    "id": "example_id",
    "inactiveFirstEmailSentAt": "example_inactiveFirstEmailSentAt",
    "inactiveSecondEmailSentAt": "example_inactiveSecondEmailSentAt",
    "isPastDue": true,
    "isSuspended": true,
    "isVerified": "example_isVerified",
    "lastActivityAt": "example_lastActivityAt",
    "name": "example_name",
    "plan": "example_plan",
    "role": "example_role",
    "settings": "example_settings",
    "stripeId": "example_stripeId",
    "updatedAt": "example_updatedAt",
    "user": map[string]any{},
    "userId": "example_userId",
    "workspaceId": "example_workspaceId",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Workspace(nil).Update(map[string]any{
    "id": "workspace_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Workspace(nil).Remove(map[string]any{"id": "workspace_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WorkspaceEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewTypebotSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

