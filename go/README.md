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
| `"totalCompleted"` |  |
| `"totalStarts"` |  |
| `"totalViews"` |  |

Operations: Load.

API path: `/v1/typebots/{typebotId}/analytics/stats`

#### Billing

| Field | Description |
| --- | --- |
| `"amount"` |  |
| `"currency"` |  |
| `"date"` |  |
| `"id"` |  |
| `"resetsAt"` |  |
| `"totalChatsUsed"` |  |
| `"url"` |  |

Operations: List, Load.

API path: `/v1/billing/invoices`

#### Folder

| Field | Description |
| --- | --- |
| `"createdAt"` |  |
| `"folder"` |  |
| `"folderName"` |  |
| `"id"` |  |
| `"name"` |  |
| `"parentFolderId"` |  |
| `"updatedAt"` |  |
| `"workspaceId"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/v1/folders`

#### Result

| Field | Description |
| --- | --- |
| `"answers"` |  |
| `"context"` |  |
| `"createdAt"` |  |
| `"description"` |  |
| `"details"` |  |
| `"hasStarted"` |  |
| `"id"` |  |
| `"isArchived"` |  |
| `"isCompleted"` |  |
| `"lastChatSessionId"` |  |
| `"resultId"` |  |
| `"status"` |  |
| `"typebotId"` |  |
| `"variables"` |  |

Operations: List, Load, Remove.

API path: `/v1/typebots/{typebotId}/results`

#### Typebot

| Field | Description |
| --- | --- |
| `"accessRight"` |  |
| `"createdAt"` |  |
| `"customDomain"` |  |
| `"edges"` |  |
| `"enableSafetyFlags"` |  |
| `"events"` |  |
| `"folderId"` |  |
| `"fromTemplate"` |  |
| `"groups"` |  |
| `"icon"` |  |
| `"id"` |  |
| `"isArchived"` |  |
| `"isClosed"` |  |
| `"message"` |  |
| `"name"` |  |
| `"overwrite"` |  |
| `"publicId"` |  |
| `"publishedTypebot"` |  |
| `"publishedTypebotId"` |  |
| `"resultsTablePreferences"` |  |
| `"riskLevel"` |  |
| `"selectedThemeTemplateId"` |  |
| `"settings"` |  |
| `"spaceId"` |  |
| `"theme"` |  |
| `"typebot"` |  |
| `"updatedAt"` |  |
| `"variables"` |  |
| `"version"` |  |
| `"warnings"` |  |
| `"whatsAppCredentialsId"` |  |
| `"workspaceId"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/v1/typebots/{typebotId}/publish`

#### Workspace

| Field | Description |
| --- | --- |
| `"chatsHardLimit"` |  |
| `"createdAt"` |  |
| `"customChatsLimit"` |  |
| `"customSeatsLimit"` |  |
| `"icon"` |  |
| `"id"` |  |
| `"inactiveFirstEmailSentAt"` |  |
| `"inactiveSecondEmailSentAt"` |  |
| `"isPastDue"` |  |
| `"isSuspended"` |  |
| `"isVerified"` |  |
| `"lastActivityAt"` |  |
| `"name"` |  |
| `"plan"` |  |
| `"role"` |  |
| `"settings"` |  |
| `"stripeId"` |  |
| `"updatedAt"` |  |
| `"user"` |  |
| `"userId"` |  |
| `"workspaceId"` |  |

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
| `totalCompleted` | `float64` |  |
| `totalStarts` | `float64` |  |
| `totalViews` | `float64` |  |

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
| `resetsAt` | `string` |  |
| `totalChatsUsed` | `float64` |  |
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
| `createdAt` | `string` |  |
| `folder` | `map[string]any` |  |
| `folderName` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `parentFolderId` | `any` |  |
| `updatedAt` | `string` |  |
| `workspaceId` | `string` |  |

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
| `answers` | `[]any` |  |
| `context` | `any` |  |
| `createdAt` | `string` |  |
| `description` | `string` |  |
| `details` | `any` |  |
| `hasStarted` | `any` |  |
| `id` | `string` |  |
| `isArchived` | `any` |  |
| `isCompleted` | `bool` |  |
| `lastChatSessionId` | `any` |  |
| `resultId` | `string` |  |
| `status` | `string` |  |
| `typebotId` | `string` |  |
| `variables` | `[]any` |  |

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
| `accessRight` | `string` |  |
| `createdAt` | `string` |  |
| `customDomain` | `any` |  |
| `edges` | `[]any` |  |
| `enableSafetyFlags` | `bool` |  |
| `events` | `[]any` |  |
| `folderId` | `any` |  |
| `fromTemplate` | `string` |  |
| `groups` | `[]any` |  |
| `icon` | `any` |  |
| `id` | `string` |  |
| `isArchived` | `bool` |  |
| `isClosed` | `bool` |  |
| `message` | `any` |  |
| `name` | `string` |  |
| `overwrite` | `bool` |  |
| `publicId` | `any` |  |
| `publishedTypebot` | `any` |  |
| `publishedTypebotId` | `string` |  |
| `resultsTablePreferences` | `any` |  |
| `riskLevel` | `any` |  |
| `selectedThemeTemplateId` | `any` |  |
| `settings` | `map[string]any` |  |
| `spaceId` | `any` |  |
| `theme` | `map[string]any` |  |
| `typebot` | `map[string]any` |  |
| `updatedAt` | `string` |  |
| `variables` | `[]any` |  |
| `version` | `any` |  |
| `warnings` | `[]any` |  |
| `whatsAppCredentialsId` | `any` |  |
| `workspaceId` | `string` |  |

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
| `chatsHardLimit` | `any` |  |
| `createdAt` | `string` |  |
| `customChatsLimit` | `any` |  |
| `customSeatsLimit` | `any` |  |
| `icon` | `any` |  |
| `id` | `string` |  |
| `inactiveFirstEmailSentAt` | `any` |  |
| `inactiveSecondEmailSentAt` | `any` |  |
| `isPastDue` | `bool` |  |
| `isSuspended` | `bool` |  |
| `isVerified` | `any` |  |
| `lastActivityAt` | `any` |  |
| `name` | `string` |  |
| `plan` | `string` |  |
| `role` | `string` |  |
| `settings` | `any` |  |
| `stripeId` | `any` |  |
| `updatedAt` | `string` |  |
| `user` | `map[string]any` |  |
| `userId` | `string` |  |
| `workspaceId` | `string` |  |

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
