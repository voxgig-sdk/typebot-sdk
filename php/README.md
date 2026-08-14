# Typebot PHP SDK



The PHP SDK for the Typebot API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Analytics()` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/typebot-sdk/releases](https://github.com/voxgig-sdk/typebot-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'typebot_sdk.php';

$client = new TypebotSDK([
    "apikey" => getenv("TYPEBOT_APIKEY"),
]);
```

### 3. Load an analytics

Analytics is nested under typebot, so provide the `typebot_id`.

```php
try {
    // load() returns the ENTITY — call data_get() for the Analytics record (throws on error).
    $analytics = $client->Analytics()->load(["typebot_id" => "example_typebot_id"]);
    print_r($analytics);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $billings = $client->Billing()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = TypebotSDK::test([
    "entity" => ["billing" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$billing = $client->Billing()->list();
print_r($billing);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new TypebotSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
TYPEBOT_TEST_LIVE=TRUE
TYPEBOT_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### TypebotSDK

```php
require_once 'typebot_sdk.php';
$client = new TypebotSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = TypebotSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### TypebotSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Analytics` | `($data): AnalyticsEntity` | Create an Analytics entity instance. |
| `Billing` | `($data): BillingEntity` | Create a Billing entity instance. |
| `Folder` | `($data): FolderEntity` | Create a Folder entity instance. |
| `Result` | `($data): ResultEntity` | Create a Result entity instance. |
| `Typebot` | `($data): TypebotEntity` | Create a Typebot entity instance. |
| `Workspace` | `($data): WorkspaceEntity` | Create a Workspace entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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
| `overwrite` |  |
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
| `version` |  |
| `warnings` |  |
| `whatsAppCredentialsId` |  |
| `workspaceId` |  |

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

Create an instance: `$analytics = $client->Analytics();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `totalCompleted` | `float` |  |
| `totalStarts` | `float` |  |
| `totalViews` | `float` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Analytics record (throws on error).
$analytics = $client->Analytics()->load(["typebot_id" => "typebot_id"]);
```


### Billing

Create an instance: `$billing = $client->Billing();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `float` |  |
| `currency` | `string` |  |
| `date` | `mixed` |  |
| `id` | `string` |  |
| `resetsAt` | `string` |  |
| `totalChatsUsed` | `float` |  |
| `url` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Billing record (throws on error).
$billing = $client->Billing()->load(["id" => "billing_id"]);
```

#### Example: List

```php
// list() returns an array of Billing records (throws on error).
$billings = $client->Billing()->list();
```


### Folder

Create an instance: `$folder = $client->Folder();`

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
| `folder` | `array` |  |
| `folderName` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `parentFolderId` | `mixed` |  |
| `updatedAt` | `string` |  |
| `workspaceId` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Folder record (throws on error).
$folder = $client->Folder()->load(["id" => "folder_id"]);
```

#### Example: List

```php
// list() returns an array of Folder records (throws on error).
$folders = $client->Folder()->list();
```

#### Example: Create

```php
$folder = $client->Folder()->create([
    "createdAt" => null, // string
    "folder" => null, // array
    "id" => null, // string
    "name" => null, // string
    "parentFolderId" => null, // mixed
    "updatedAt" => null, // string
    "workspaceId" => null, // string
]);
```


### Result

Create an instance: `$result = $client->Result();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `answers` | `array` |  |
| `context` | `mixed` |  |
| `createdAt` | `string` |  |
| `description` | `string` |  |
| `details` | `mixed` |  |
| `hasStarted` | `mixed` |  |
| `id` | `string` |  |
| `isArchived` | `mixed` |  |
| `isCompleted` | `bool` |  |
| `lastChatSessionId` | `mixed` |  |
| `resultId` | `string` |  |
| `status` | `string` |  |
| `typebotId` | `string` |  |
| `variables` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Result record (throws on error).
$result = $client->Result()->load(["id" => "result_id", "typebot_id" => "typebot_id"]);
```

#### Example: List

```php
// list() returns an array of Result records (throws on error).
$results = $client->Result()->list();
```


### Typebot

Create an instance: `$typebot = $client->Typebot();`

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
| `customDomain` | `mixed` |  |
| `edges` | `array` |  |
| `enableSafetyFlags` | `bool` |  |
| `events` | `array` |  |
| `folderId` | `mixed` |  |
| `fromTemplate` | `string` |  |
| `groups` | `array` |  |
| `icon` | `mixed` |  |
| `id` | `string` |  |
| `isArchived` | `bool` |  |
| `isClosed` | `bool` |  |
| `message` | `mixed` |  |
| `name` | `string` |  |
| `overwrite` | `bool` |  |
| `publicId` | `mixed` |  |
| `publishedTypebot` | `mixed` |  |
| `publishedTypebotId` | `string` |  |
| `resultsTablePreferences` | `mixed` |  |
| `riskLevel` | `mixed` |  |
| `selectedThemeTemplateId` | `mixed` |  |
| `settings` | `array` |  |
| `spaceId` | `mixed` |  |
| `theme` | `array` |  |
| `typebot` | `array` |  |
| `updatedAt` | `string` |  |
| `variables` | `array` |  |
| `version` | `mixed` |  |
| `warnings` | `array` |  |
| `whatsAppCredentialsId` | `mixed` |  |
| `workspaceId` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Typebot record (throws on error).
$typebot = $client->Typebot()->load(["id" => "typebot_id"]);
```

#### Example: List

```php
// list() returns an array of Typebot records (throws on error).
$typebots = $client->Typebot()->list();
```

#### Example: Create

```php
$typebot = $client->Typebot()->create([
    "accessRight" => null, // string
    "createdAt" => null, // string
    "customDomain" => null, // mixed
    "edges" => null, // array
    "events" => null, // array
    "folderId" => null, // mixed
    "groups" => null, // array
    "icon" => null, // mixed
    "id" => null, // string
    "isArchived" => null, // bool
    "isClosed" => null, // bool
    "message" => null, // mixed
    "name" => null, // string
    "publicId" => null, // mixed
    "publishedTypebot" => null, // mixed
    "resultsTablePreferences" => null, // mixed
    "riskLevel" => null, // mixed
    "selectedThemeTemplateId" => null, // mixed
    "settings" => null, // array
    "spaceId" => null, // mixed
    "theme" => null, // array
    "typebot" => null, // array
    "updatedAt" => null, // string
    "variables" => null, // array
    "whatsAppCredentialsId" => null, // mixed
    "workspaceId" => null, // string
]);
```


### Workspace

Create an instance: `$workspace = $client->Workspace();`

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
| `chatsHardLimit` | `mixed` |  |
| `createdAt` | `string` |  |
| `customChatsLimit` | `mixed` |  |
| `customSeatsLimit` | `mixed` |  |
| `icon` | `mixed` |  |
| `id` | `string` |  |
| `inactiveFirstEmailSentAt` | `mixed` |  |
| `inactiveSecondEmailSentAt` | `mixed` |  |
| `isPastDue` | `bool` |  |
| `isSuspended` | `bool` |  |
| `isVerified` | `mixed` |  |
| `lastActivityAt` | `mixed` |  |
| `name` | `string` |  |
| `plan` | `string` |  |
| `role` | `string` |  |
| `settings` | `mixed` |  |
| `stripeId` | `mixed` |  |
| `updatedAt` | `string` |  |
| `user` | `array` |  |
| `userId` | `string` |  |
| `workspaceId` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Workspace record (throws on error).
$workspace = $client->Workspace()->load(["id" => "workspace_id"]);
```

#### Example: List

```php
// list() returns an array of Workspace records (throws on error).
$workspaces = $client->Workspace()->list();
```

#### Example: Create

```php
$workspace = $client->Workspace()->create([
    "chatsHardLimit" => null, // mixed
    "createdAt" => null, // string
    "customChatsLimit" => null, // mixed
    "customSeatsLimit" => null, // mixed
    "icon" => null, // mixed
    "id" => null, // string
    "inactiveFirstEmailSentAt" => null, // mixed
    "inactiveSecondEmailSentAt" => null, // mixed
    "isPastDue" => null, // bool
    "isSuspended" => null, // bool
    "isVerified" => null, // mixed
    "lastActivityAt" => null, // mixed
    "name" => null, // string
    "plan" => null, // string
    "role" => null, // string
    "settings" => null, // mixed
    "stripeId" => null, // mixed
    "updatedAt" => null, // string
    "user" => null, // array
    "userId" => null, // string
    "workspaceId" => null, // string
]);
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── typebot_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`typebot_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$billing = $client->Billing();
$billing->list();

// $billing->data_get() now returns the billing data from the last list
// $billing->match_get() returns the last match criteria
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
