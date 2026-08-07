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
| `total_completed` | `float64` | Yes |  |
| `total_start` | `float64` | Yes |  |
| `total_view` | `float64` | Yes |  |

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
| `resets_at` | `string` | Yes |  |
| `total_chats_used` | `float64` | Yes |  |
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
result, err := client.Billing(nil).Load(map[string]any{"id": "billing_id"}, nil)
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
| `created_at` | `string` | Yes |  |
| `folder` | `map[string]any` | Yes |  |
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
result, err := client.Folder(nil).Load(map[string]any{"id": "folder_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Folder(nil).Create(map[string]any{
    "created_at": "example_created_at",
    "folder": map[string]any{},
    "id": "example_id",
    "name": "example_name",
    "parent_folder_id": "example_parent_folder_id",
    "updated_at": "example_updated_at",
    "workspace_id": "example_workspace_id",
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
| `answer` | `[]any` | Yes |  |
| `context` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `description` | `string` | Yes |  |
| `detail` | `any` | Yes |  |
| `has_started` | `bool` | Yes |  |
| `id` | `string` | Yes |  |
| `is_archived` | `bool` | Yes |  |
| `is_completed` | `bool` | Yes |  |
| `last_chat_session_id` | `string` | Yes |  |
| `result_id` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `typebot_id` | `string` | Yes |  |
| `variable` | `[]any` | Yes |  |

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
| `access_right` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `current_user_mode` | `string` | Yes |  |
| `custom_domain` | `any` | Yes |  |
| `edge` | `[]any` | Yes |  |
| `enable_safety_flag` | `bool` | No |  |
| `event` | `[]any` | Yes |  |
| `folder_id` | `string` | Yes |  |
| `from_template` | `string` | No |  |
| `group` | `[]any` | Yes |  |
| `icon` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `is_archived` | `bool` | Yes |  |
| `is_closed` | `bool` | Yes |  |
| `message` | `any` | Yes |  |
| `name` | `string` | Yes |  |
| `overwrite` | `bool` | No |  |
| `public_id` | `string` | Yes |  |
| `published_typebot` | `any` | Yes |  |
| `published_typebot_id` | `string` | No |  |
| `results_table_preference` | `any` | Yes |  |
| `risk_level` | `any` | Yes |  |
| `selected_theme_template_id` | `string` | Yes |  |
| `setting` | `map[string]any` | Yes |  |
| `space_id` | `string` | Yes |  |
| `theme` | `map[string]any` | Yes |  |
| `typebot` | `any` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `variable` | `[]any` | Yes |  |
| `version` | `any` | No |  |
| `warning` | `[]any` | No |  |
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
    "access_right": "example_access_right",
    "created_at": "example_created_at",
    "current_user_mode": "example_current_user_mode",
    "custom_domain": "example_custom_domain",
    "edge": []any{},
    "event": []any{},
    "folder_id": "example_folder_id",
    "group": []any{},
    "icon": "example_icon",
    "id": "example_id",
    "is_archived": true,
    "is_closed": true,
    "message": "example_message",
    "name": "example_name",
    "public_id": "example_public_id",
    "published_typebot": "example_published_typebot",
    "results_table_preference": "example_results_table_preference",
    "risk_level": "example_risk_level",
    "selected_theme_template_id": "example_selected_theme_template_id",
    "setting": map[string]any{},
    "space_id": "example_space_id",
    "theme": map[string]any{},
    "typebot": "example_typebot",
    "updated_at": "example_updated_at",
    "variable": []any{},
    "whats_app_credentials_id": "example_whats_app_credentials_id",
    "workspace_id": "example_workspace_id",
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
| `chats_hard_limit` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `current_user_mode` | `string` | Yes |  |
| `icon` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `inactive_first_email_sent_at` | `any` | Yes |  |
| `inactive_second_email_sent_at` | `any` | Yes |  |
| `is_past_due` | `bool` | Yes |  |
| `is_suspended` | `bool` | Yes |  |
| `is_verified` | `bool` | Yes |  |
| `last_activity_at` | `any` | Yes |  |
| `name` | `string` | Yes |  |
| `plan` | `string` | Yes |  |
| `role` | `string` | Yes |  |
| `setting` | `any` | Yes |  |
| `stripe_id` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `user` | `map[string]any` | Yes |  |
| `user_id` | `string` | Yes |  |
| `workspace` | `map[string]any` | Yes |  |
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
    "chats_hard_limit": "example_chats_hard_limit",
    "created_at": "example_created_at",
    "current_user_mode": "example_current_user_mode",
    "icon": "example_icon",
    "id": "example_id",
    "inactive_first_email_sent_at": "example_inactive_first_email_sent_at",
    "inactive_second_email_sent_at": "example_inactive_second_email_sent_at",
    "is_past_due": true,
    "is_suspended": true,
    "is_verified": true,
    "last_activity_at": "example_last_activity_at",
    "name": "example_name",
    "plan": "example_plan",
    "role": "example_role",
    "setting": "example_setting",
    "stripe_id": "example_stripe_id",
    "updated_at": "example_updated_at",
    "user": map[string]any{},
    "user_id": "example_user_id",
    "workspace": map[string]any{},
    "workspace_id": "example_workspace_id",
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

