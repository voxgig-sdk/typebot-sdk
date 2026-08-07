# Typebot Golang SDK



The Golang SDK for the Typebot API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Analytics(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/typebot-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/typebot-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/typebot-sdk/go=../typebot-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/typebot-sdk/go"
)

func main() {
    client := sdk.NewTypebotSDK(map[string]any{
        "apikey": os.Getenv("TYPEBOT_APIKEY"),
    })

    // Load a single analytics — the value is the loaded record.
    analytics, err := client.Analytics(nil).Load(map[string]any{"typebot_id": "example_typebot_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(analytics)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
billings, err := client.Billing(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = billings
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

billing, err := client.Billing(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(billing) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewTypebotSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewTypebotSDK

```go
func NewTypebotSDK(options map[string]any) *TypebotSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *TypebotSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### TypebotSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Analytics` | `(data map[string]any) TypebotEntity` | Create an Analytics entity instance. |
| `Billing` | `(data map[string]any) TypebotEntity` | Create a Billing entity instance. |
| `Folder` | `(data map[string]any) TypebotEntity` | Create a Folder entity instance. |
| `Result` | `(data map[string]any) TypebotEntity` | Create a Result entity instance. |
| `Typebot` | `(data map[string]any) TypebotEntity` | Create a Typebot entity instance. |
| `Workspace` | `(data map[string]any) TypebotEntity` | Create a Workspace entity instance. |

### Entity interface (TypebotEntity)

All entities implement the `TypebotEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    analytics, err := client.Analytics(nil).Load(nil, nil)
    if err != nil { /* handle */ }
    // analytics is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Analytics

| Field | Description |
| --- | --- |
| `"total_completed"` |  |
| `"total_start"` |  |
| `"total_view"` |  |

Operations: Load.

API path: `/v1/typebots/{typebotId}/analytics/stats`

#### Billing

| Field | Description |
| --- | --- |
| `"amount"` |  |
| `"currency"` |  |
| `"date"` |  |
| `"id"` |  |
| `"resets_at"` |  |
| `"total_chats_used"` |  |
| `"url"` |  |

Operations: List, Load.

API path: `/v1/billing/invoices`

#### Folder

| Field | Description |
| --- | --- |
| `"created_at"` |  |
| `"folder"` |  |
| `"folder_name"` |  |
| `"id"` |  |
| `"name"` |  |
| `"parent_folder_id"` |  |
| `"updated_at"` |  |
| `"workspace_id"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/v1/folders`

#### Result

| Field | Description |
| --- | --- |
| `"answer"` |  |
| `"context"` |  |
| `"created_at"` |  |
| `"description"` |  |
| `"detail"` |  |
| `"has_started"` |  |
| `"id"` |  |
| `"is_archived"` |  |
| `"is_completed"` |  |
| `"last_chat_session_id"` |  |
| `"result_id"` |  |
| `"status"` |  |
| `"typebot_id"` |  |
| `"variable"` |  |

Operations: List, Load, Remove.

API path: `/v1/typebots/{typebotId}/results`

#### Typebot

| Field | Description |
| --- | --- |
| `"access_right"` |  |
| `"created_at"` |  |
| `"current_user_mode"` |  |
| `"custom_domain"` |  |
| `"edge"` |  |
| `"enable_safety_flag"` |  |
| `"event"` |  |
| `"folder_id"` |  |
| `"from_template"` |  |
| `"group"` |  |
| `"icon"` |  |
| `"id"` |  |
| `"is_archived"` |  |
| `"is_closed"` |  |
| `"message"` |  |
| `"name"` |  |
| `"overwrite"` |  |
| `"public_id"` |  |
| `"published_typebot"` |  |
| `"published_typebot_id"` |  |
| `"results_table_preference"` |  |
| `"risk_level"` |  |
| `"selected_theme_template_id"` |  |
| `"setting"` |  |
| `"space_id"` |  |
| `"theme"` |  |
| `"typebot"` |  |
| `"updated_at"` |  |
| `"variable"` |  |
| `"version"` |  |
| `"warning"` |  |
| `"whats_app_credentials_id"` |  |
| `"workspace_id"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/v1/typebots/{typebotId}/publish`

#### Workspace

| Field | Description |
| --- | --- |
| `"chats_hard_limit"` |  |
| `"created_at"` |  |
| `"current_user_mode"` |  |
| `"icon"` |  |
| `"id"` |  |
| `"inactive_first_email_sent_at"` |  |
| `"inactive_second_email_sent_at"` |  |
| `"is_past_due"` |  |
| `"is_suspended"` |  |
| `"is_verified"` |  |
| `"last_activity_at"` |  |
| `"name"` |  |
| `"plan"` |  |
| `"role"` |  |
| `"setting"` |  |
| `"stripe_id"` |  |
| `"updated_at"` |  |
| `"user"` |  |
| `"user_id"` |  |
| `"workspace"` |  |
| `"workspace_id"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/v1/workspaces`



## Entities


### Analytics

Create an instance: `analytics := client.Analytics(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `total_completed` | `float64` |  |
| `total_start` | `float64` |  |
| `total_view` | `float64` |  |

#### Example: Load

```go
analytics, err := client.Analytics(nil).Load(map[string]any{"typebot_id": "typebot_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(analytics) // the loaded record
```


### Billing

Create an instance: `billing := client.Billing(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `float64` |  |
| `currency` | `string` |  |
| `date` | `any` |  |
| `id` | `string` |  |
| `resets_at` | `string` |  |
| `total_chats_used` | `float64` |  |
| `url` | `string` |  |

#### Example: Load

```go
billing, err := client.Billing(nil).Load(map[string]any{"id": "billing_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(billing) // the loaded record
```

#### Example: List

```go
billings, err := client.Billing(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(billings) // the array of records
```


### Folder

Create an instance: `folder := client.Folder(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `folder` | `map[string]any` |  |
| `folder_name` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `parent_folder_id` | `string` |  |
| `updated_at` | `string` |  |
| `workspace_id` | `string` |  |

#### Example: Load

```go
folder, err := client.Folder(nil).Load(map[string]any{"id": "folder_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(folder) // the loaded record
```

#### Example: List

```go
folders, err := client.Folder(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(folders) // the array of records
```

#### Example: Create

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


### Result

Create an instance: `result := client.Result(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `answer` | `[]any` |  |
| `context` | `any` |  |
| `created_at` | `string` |  |
| `description` | `string` |  |
| `detail` | `any` |  |
| `has_started` | `bool` |  |
| `id` | `string` |  |
| `is_archived` | `bool` |  |
| `is_completed` | `bool` |  |
| `last_chat_session_id` | `string` |  |
| `result_id` | `string` |  |
| `status` | `string` |  |
| `typebot_id` | `string` |  |
| `variable` | `[]any` |  |

#### Example: Load

```go
result, err := client.Result(nil).Load(map[string]any{"id": "result_id", "typebot_id": "typebot_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result) // the loaded record
```

#### Example: List

```go
results, err := client.Result(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results) // the array of records
```


### Typebot

Create an instance: `typebot := client.Typebot(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_right` | `string` |  |
| `created_at` | `string` |  |
| `current_user_mode` | `string` |  |
| `custom_domain` | `any` |  |
| `edge` | `[]any` |  |
| `enable_safety_flag` | `bool` |  |
| `event` | `[]any` |  |
| `folder_id` | `string` |  |
| `from_template` | `string` |  |
| `group` | `[]any` |  |
| `icon` | `any` |  |
| `id` | `string` |  |
| `is_archived` | `bool` |  |
| `is_closed` | `bool` |  |
| `message` | `any` |  |
| `name` | `string` |  |
| `overwrite` | `bool` |  |
| `public_id` | `string` |  |
| `published_typebot` | `any` |  |
| `published_typebot_id` | `string` |  |
| `results_table_preference` | `any` |  |
| `risk_level` | `any` |  |
| `selected_theme_template_id` | `string` |  |
| `setting` | `map[string]any` |  |
| `space_id` | `string` |  |
| `theme` | `map[string]any` |  |
| `typebot` | `any` |  |
| `updated_at` | `string` |  |
| `variable` | `[]any` |  |
| `version` | `any` |  |
| `warning` | `[]any` |  |
| `whats_app_credentials_id` | `string` |  |
| `workspace_id` | `string` |  |

#### Example: Load

```go
typebot, err := client.Typebot(nil).Load(map[string]any{"id": "typebot_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(typebot) // the loaded record
```

#### Example: List

```go
typebots, err := client.Typebot(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(typebots) // the array of records
```

#### Example: Create

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


### Workspace

Create an instance: `workspace := client.Workspace(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

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
| `is_past_due` | `bool` |  |
| `is_suspended` | `bool` |  |
| `is_verified` | `bool` |  |
| `last_activity_at` | `any` |  |
| `name` | `string` |  |
| `plan` | `string` |  |
| `role` | `string` |  |
| `setting` | `any` |  |
| `stripe_id` | `string` |  |
| `updated_at` | `string` |  |
| `user` | `map[string]any` |  |
| `user_id` | `string` |  |
| `workspace` | `map[string]any` |  |
| `workspace_id` | `string` |  |

#### Example: Load

```go
workspace, err := client.Workspace(nil).Load(map[string]any{"id": "workspace_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(workspace) // the loaded record
```

#### Example: List

```go
workspaces, err := client.Workspace(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(workspaces) // the array of records
```

#### Example: Create

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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/typebot-sdk/go/
├── typebot.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/typebot-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
billing := client.Billing(nil)
billing.List(nil, nil)

// billing.Data() now returns the billing data from the last list
// billing.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
