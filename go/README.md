# Typebot Golang SDK



The Golang SDK for the Typebot API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Analytics(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `js`, `lua`, `php`, `py`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/typebot-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/voxgig-sdk/typebot-sdk/tags) for the available versions.

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
Each operation returns `(value, error)` — the value is the entity, and for
`List` a `[]any` of entities, one per record (there is no `{ok, data}`
wrapper), so check `err` and read a record through the entity's
`Data()`.

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

    // Load a single analytics — the value is the entity; Data() reads its record.
    analytics, err := client.Analytics(nil).Load(map[string]any{"typebot_id": "example_typebot_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(analytics.(sdk.Entity).Data())
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
folders, err := client.Folder(nil).List(map[string]any{"workspace_id": "example"}, nil)
if err != nil {
    // handle err
    return
}
_ = folders
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

folders, err := client.Folder(nil).List(
    map[string]any{"workspace_id": "example"}, nil,
)
if err != nil {
    panic(err)
}
// A []any of entities, one per mock record.
for _, item := range folders.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria, and return it. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria, one per record. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity, and return it. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity, and return it. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity, and return it marked as deleted. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity, whose `Data()` reads its record (`map[string]any`) |
| `List` | a `[]any` of entities, one per record |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    analytics, err := client.Analytics(nil).Load(nil, nil)
    if err != nil { /* handle */ }
    // analytics is the entity; analytics.(sdk.Entity).Data() reads its record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Analytics

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/v1/typebots/{typebotId}/analytics/stats`

#### Billing

| Field | Description |
| --- | --- |

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
| `"createdAt"` |  |
| `"hasStarted"` |  |
| `"id"` |  |
| `"isArchived"` |  |
| `"isCompleted"` |  |
| `"lastChatSessionId"` |  |
| `"typebotId"` |  |
| `"variables"` |  |

Operations: List, Load, Remove.

API path: `/v1/typebots/{typebotId}/results/{resultId}/logs`

#### Typebot

| Field | Description |
| --- | --- |
| `"accessRight"` |  |
| `"createdAt"` |  |
| `"currentUserMode"` |  |
| `"customDomain"` |  |
| `"edges"` |  |
| `"events"` |  |
| `"folderId"` |  |
| `"groups"` |  |
| `"icon"` |  |
| `"id"` |  |
| `"isArchived"` |  |
| `"isClosed"` |  |
| `"name"` |  |
| `"overwrite"` | If true, even if we detect a conflict, we will overwrite push the updates to the typebot |
| `"publicId"` |  |
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
| `"whatsAppCredentialsId"` |  |
| `"workspaceId"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/v1/typebots/{typebotId}/publish`

#### Workspace

| Field | Description |
| --- | --- |
| `"chatsHardLimit"` |  |
| `"createdAt"` |  |
| `"currentUserMode"` |  |
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
| `"settings"` |  |
| `"stripeId"` |  |
| `"updatedAt"` |  |
| `"workspace"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/v1/workspaces`



## Entities


### Analytics

Create an instance: `analytics := client.Analytics(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
analytics, err := client.Analytics(nil).Load(map[string]any{"typebot_id": "typebot_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(analytics.(sdk.Entity).Data()) // the loaded entity's record
```


### Billing

Create an instance: `billing := client.Billing(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
billing, err := client.Billing(nil).Load(map[string]any{"workspace_id": "workspace_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(billing.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
billings, err := client.Billing(nil).List(map[string]any{"workspace_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range billings.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
folder, err := client.Folder(nil).Load(map[string]any{"id": "folder_id", "workspace_id": "workspace_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(folder.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
folders, err := client.Folder(nil).List(map[string]any{"workspace_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range folders.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
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
| `createdAt` | `string` |  |
| `hasStarted` | `any` |  |
| `id` | `string` |  |
| `isArchived` | `any` |  |
| `isCompleted` | `bool` |  |
| `lastChatSessionId` | `any` |  |
| `typebotId` | `string` |  |
| `variables` | `[]any` |  |

#### Example: Load

```go
result, err := client.Result(nil).Load(map[string]any{"id": "result_id", "typebot_id": "typebot_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
results, err := client.Result(nil).List(map[string]any{"typebot_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `currentUserMode` | `string` |  |
| `customDomain` | `any` |  |
| `edges` | `[]any` |  |
| `events` | `[]any` |  |
| `folderId` | `any` |  |
| `groups` | `[]any` |  |
| `icon` | `any` |  |
| `id` | `string` |  |
| `isArchived` | `bool` |  |
| `isClosed` | `bool` |  |
| `name` | `string` |  |
| `overwrite` | `bool` | If true, even if we detect a conflict, we will overwrite push the updates to the typebot |
| `publicId` | `any` |  |
| `publishedTypebotId` | `string` |  |
| `resultsTablePreferences` | `any` |  |
| `riskLevel` | `any` |  |
| `selectedThemeTemplateId` | `any` |  |
| `settings` | `map[string]any` |  |
| `spaceId` | `any` |  |
| `theme` | `map[string]any` |  |
| `typebot` | `any` |  |
| `updatedAt` | `string` |  |
| `variables` | `[]any` |  |
| `version` | `string` |  |
| `whatsAppCredentialsId` | `any` |  |
| `workspaceId` | `string` |  |

#### Example: Load

```go
typebot, err := client.Typebot(nil).Load(map[string]any{"id": "typebot_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(typebot.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
typebots, err := client.Typebot(nil).List(map[string]any{"workspace_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range typebots.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Typebot(nil).Create(map[string]any{
    "accessRight": "example_accessRight",
    "createdAt": "example_createdAt",
    "currentUserMode": "example_currentUserMode",
    "customDomain": "example_customDomain",
    "edges": []any{},
    "events": []any{},
    "folderId": "example_folderId",
    "groups": []any{},
    "icon": "example_icon",
    "id": "example_id",
    "isArchived": true,
    "isClosed": true,
    "name": "example_name",
    "publicId": "example_publicId",
    "resultsTablePreferences": "example_resultsTablePreferences",
    "riskLevel": "example_riskLevel",
    "selectedThemeTemplateId": "example_selectedThemeTemplateId",
    "settings": map[string]any{},
    "spaceId": "example_spaceId",
    "theme": map[string]any{},
    "typebot": "example_typebot",
    "updatedAt": "example_updatedAt",
    "variables": []any{},
    "version": "example_version",
    "whatsAppCredentialsId": "example_whatsAppCredentialsId",
    "workspaceId": "example_workspaceId",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
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
| `currentUserMode` | `string` |  |
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
| `settings` | `any` |  |
| `stripeId` | `any` |  |
| `updatedAt` | `string` |  |
| `workspace` | `map[string]any` |  |

#### Example: Load

```go
workspace, err := client.Workspace(nil).Load(map[string]any{"id": "workspace_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(workspace.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
workspaces, err := client.Workspace(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range workspaces.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Workspace(nil).Create(map[string]any{
    "chatsHardLimit": "example_chatsHardLimit",
    "createdAt": "example_createdAt",
    "currentUserMode": "example_currentUserMode",
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
    "settings": "example_settings",
    "stripeId": "example_stripeId",
    "updatedAt": "example_updatedAt",
    "workspace": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```

## Features

This SDK ships 8 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Debug capture |
| [`idempotency`](#idempotency) | Idempotency |
| [`metrics`](#metrics) | Metrics |
| [`paging`](#paging) | Paging |
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Debug capture.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Metrics.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Paging.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Open types

3 fields are carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes them with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `typebot` | `groups` | 19 | 14 levels |
| `typebot` | `typebot` | 19 | 18 levels |
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **DebugFeature**: Debug capture
- **IdempotencyFeature**: Idempotency
- **MetricsFeature**: Metrics
- **PagingFeature**: Paging
- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

An operation returns the entity, and its `Data()` returns the record. Use
`core.ToMapAny()` to safely cast that record, or data nested in it, to
`map[string]any`: it returns `nil` for anything else, an entity included.

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
folder := client.Folder(nil)
folder.List(map[string]any{"workspace_id": "example"}, nil)

// folder.Data() now returns the folder data from the last list
// folder.Match() returns the last match criteria
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
