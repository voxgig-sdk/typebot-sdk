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
    // load() returns the bare Analytics record (throws on error).
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

// Entity ops return the bare mock record (throws on error).
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

Entity operations return the bare result data (an `array` for single-entity
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

Create an instance: `$analytics = $client->Analytics();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `total_completed` | `float` |  |
| `total_start` | `float` |  |
| `total_view` | `float` |  |

#### Example: Load

```php
// load() returns the bare Analytics record (throws on error).
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
| `resets_at` | `string` |  |
| `total_chats_used` | `float` |  |
| `url` | `string` |  |

#### Example: Load

```php
// load() returns the bare Billing record (throws on error).
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
| `created_at` | `string` |  |
| `folder` | `array` |  |
| `folder_name` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `parent_folder_id` | `string` |  |
| `updated_at` | `string` |  |
| `workspace_id` | `string` |  |

#### Example: Load

```php
// load() returns the bare Folder record (throws on error).
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
    "created_at" => null, // string
    "folder" => null, // array
    "id" => null, // string
    "name" => null, // string
    "parent_folder_id" => null, // string
    "updated_at" => null, // string
    "workspace_id" => null, // string
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
| `answer` | `array` |  |
| `context` | `mixed` |  |
| `created_at` | `string` |  |
| `description` | `string` |  |
| `detail` | `mixed` |  |
| `has_started` | `bool` |  |
| `id` | `string` |  |
| `is_archived` | `bool` |  |
| `is_completed` | `bool` |  |
| `last_chat_session_id` | `string` |  |
| `result_id` | `string` |  |
| `status` | `string` |  |
| `typebot_id` | `string` |  |
| `variable` | `array` |  |

#### Example: Load

```php
// load() returns the bare Result record (throws on error).
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
| `access_right` | `string` |  |
| `created_at` | `string` |  |
| `current_user_mode` | `string` |  |
| `custom_domain` | `mixed` |  |
| `edge` | `array` |  |
| `enable_safety_flag` | `bool` |  |
| `event` | `array` |  |
| `folder_id` | `string` |  |
| `from_template` | `string` |  |
| `group` | `array` |  |
| `icon` | `mixed` |  |
| `id` | `string` |  |
| `is_archived` | `bool` |  |
| `is_closed` | `bool` |  |
| `message` | `mixed` |  |
| `name` | `string` |  |
| `overwrite` | `bool` |  |
| `public_id` | `string` |  |
| `published_typebot` | `mixed` |  |
| `published_typebot_id` | `string` |  |
| `results_table_preference` | `mixed` |  |
| `risk_level` | `mixed` |  |
| `selected_theme_template_id` | `string` |  |
| `setting` | `array` |  |
| `space_id` | `string` |  |
| `theme` | `array` |  |
| `typebot` | `mixed` |  |
| `updated_at` | `string` |  |
| `variable` | `array` |  |
| `version` | `mixed` |  |
| `warning` | `array` |  |
| `whats_app_credentials_id` | `string` |  |
| `workspace_id` | `string` |  |

#### Example: Load

```php
// load() returns the bare Typebot record (throws on error).
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
    "access_right" => null, // string
    "created_at" => null, // string
    "current_user_mode" => null, // string
    "custom_domain" => null, // mixed
    "edge" => null, // array
    "event" => null, // array
    "folder_id" => null, // string
    "group" => null, // array
    "icon" => null, // mixed
    "id" => null, // string
    "is_archived" => null, // bool
    "is_closed" => null, // bool
    "message" => null, // mixed
    "name" => null, // string
    "public_id" => null, // string
    "published_typebot" => null, // mixed
    "results_table_preference" => null, // mixed
    "risk_level" => null, // mixed
    "selected_theme_template_id" => null, // string
    "setting" => null, // array
    "space_id" => null, // string
    "theme" => null, // array
    "typebot" => null, // mixed
    "updated_at" => null, // string
    "variable" => null, // array
    "whats_app_credentials_id" => null, // string
    "workspace_id" => null, // string
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
| `chats_hard_limit` | `mixed` |  |
| `created_at` | `string` |  |
| `current_user_mode` | `string` |  |
| `icon` | `mixed` |  |
| `id` | `string` |  |
| `inactive_first_email_sent_at` | `mixed` |  |
| `inactive_second_email_sent_at` | `mixed` |  |
| `is_past_due` | `bool` |  |
| `is_suspended` | `bool` |  |
| `is_verified` | `bool` |  |
| `last_activity_at` | `mixed` |  |
| `name` | `string` |  |
| `plan` | `string` |  |
| `role` | `string` |  |
| `setting` | `mixed` |  |
| `stripe_id` | `string` |  |
| `updated_at` | `string` |  |
| `user` | `array` |  |
| `user_id` | `string` |  |
| `workspace` | `array` |  |
| `workspace_id` | `string` |  |

#### Example: Load

```php
// load() returns the bare Workspace record (throws on error).
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
    "chats_hard_limit" => null, // mixed
    "created_at" => null, // string
    "current_user_mode" => null, // string
    "icon" => null, // mixed
    "id" => null, // string
    "inactive_first_email_sent_at" => null, // mixed
    "inactive_second_email_sent_at" => null, // mixed
    "is_past_due" => null, // bool
    "is_suspended" => null, // bool
    "is_verified" => null, // bool
    "last_activity_at" => null, // mixed
    "name" => null, // string
    "plan" => null, // string
    "role" => null, // string
    "setting" => null, // mixed
    "stripe_id" => null, // string
    "updated_at" => null, // string
    "user" => null, // array
    "user_id" => null, // string
    "workspace" => null, // array
    "workspace_id" => null, // string
]);
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
