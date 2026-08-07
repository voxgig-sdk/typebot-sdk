# Typebot PHP SDK Reference

Complete API reference for the Typebot PHP SDK.


## TypebotSDK

### Constructor

```php
require_once __DIR__ . '/typebot_sdk.php';

$client = new TypebotSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TypebotSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = TypebotSDK::test();
```


### Instance Methods

#### `Analytics($data = null)`

Create a new `AnalyticsEntity` instance. Pass `null` for no initial data.

#### `Billing($data = null)`

Create a new `BillingEntity` instance. Pass `null` for no initial data.

#### `Folder($data = null)`

Create a new `FolderEntity` instance. Pass `null` for no initial data.

#### `Result($data = null)`

Create a new `ResultEntity` instance. Pass `null` for no initial data.

#### `Typebot($data = null)`

Create a new `TypebotEntity` instance. Pass `null` for no initial data.

#### `Workspace($data = null)`

Create a new `WorkspaceEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): TypebotUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AnalyticsEntity

```php
$analytics = $client->Analytics();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `total_completed` | `float` | Yes |  |
| `total_start` | `float` | Yes |  |
| `total_view` | `float` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Analytics()->load(["typebot_id" => "typebot_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AnalyticsEntity`

Create a new `AnalyticsEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BillingEntity

```php
$billing = $client->Billing();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float` | Yes |  |
| `currency` | `string` | Yes |  |
| `date` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `resets_at` | `string` | Yes |  |
| `total_chats_used` | `float` | Yes |  |
| `url` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Billing()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Billing()->load(["id" => "billing_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BillingEntity`

Create a new `BillingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FolderEntity

```php
$folder = $client->Folder();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `folder` | `array` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Folder()->create([
  "created_at" => null, // string
  "folder" => null, // array
  "id" => null, // string
  "name" => null, // string
  "parent_folder_id" => null, // string
  "updated_at" => null, // string
  "workspace_id" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Folder()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Folder()->load(["id" => "folder_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Folder()->remove(["id" => "folder_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Folder()->update([
  "id" => "folder_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FolderEntity`

Create a new `FolderEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ResultEntity

```php
$result = $client->Result();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `answer` | `array` | Yes |  |
| `context` | `mixed` | Yes |  |
| `created_at` | `string` | Yes |  |
| `description` | `string` | Yes |  |
| `detail` | `mixed` | Yes |  |
| `has_started` | `bool` | Yes |  |
| `id` | `string` | Yes |  |
| `is_archived` | `bool` | Yes |  |
| `is_completed` | `bool` | Yes |  |
| `last_chat_session_id` | `string` | Yes |  |
| `result_id` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `typebot_id` | `string` | Yes |  |
| `variable` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Result()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Result()->load(["id" => "result_id", "typebot_id" => "typebot_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Result()->remove(["typebot_id" => "typebot_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ResultEntity`

Create a new `ResultEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TypebotEntity

```php
$typebot = $client->Typebot();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_right` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `current_user_mode` | `string` | Yes |  |
| `custom_domain` | `mixed` | Yes |  |
| `edge` | `array` | Yes |  |
| `enable_safety_flag` | `bool` | No |  |
| `event` | `array` | Yes |  |
| `folder_id` | `string` | Yes |  |
| `from_template` | `string` | No |  |
| `group` | `array` | Yes |  |
| `icon` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `is_archived` | `bool` | Yes |  |
| `is_closed` | `bool` | Yes |  |
| `message` | `mixed` | Yes |  |
| `name` | `string` | Yes |  |
| `overwrite` | `bool` | No |  |
| `public_id` | `string` | Yes |  |
| `published_typebot` | `mixed` | Yes |  |
| `published_typebot_id` | `string` | No |  |
| `results_table_preference` | `mixed` | Yes |  |
| `risk_level` | `mixed` | Yes |  |
| `selected_theme_template_id` | `string` | Yes |  |
| `setting` | `array` | Yes |  |
| `space_id` | `string` | Yes |  |
| `theme` | `array` | Yes |  |
| `typebot` | `mixed` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `variable` | `array` | Yes |  |
| `version` | `mixed` | No |  |
| `warning` | `array` | No |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Typebot()->create([
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Typebot()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Typebot()->load(["id" => "typebot_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Typebot()->remove(["id" => "typebot_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Typebot()->update([
  "id" => "typebot_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TypebotEntity`

Create a new `TypebotEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WorkspaceEntity

```php
$workspace = $client->Workspace();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chats_hard_limit` | `mixed` | Yes |  |
| `created_at` | `string` | Yes |  |
| `current_user_mode` | `string` | Yes |  |
| `icon` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `inactive_first_email_sent_at` | `mixed` | Yes |  |
| `inactive_second_email_sent_at` | `mixed` | Yes |  |
| `is_past_due` | `bool` | Yes |  |
| `is_suspended` | `bool` | Yes |  |
| `is_verified` | `bool` | Yes |  |
| `last_activity_at` | `mixed` | Yes |  |
| `name` | `string` | Yes |  |
| `plan` | `string` | Yes |  |
| `role` | `string` | Yes |  |
| `setting` | `mixed` | Yes |  |
| `stripe_id` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `user` | `array` | Yes |  |
| `user_id` | `string` | Yes |  |
| `workspace` | `array` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Workspace()->create([
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Workspace()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Workspace()->load(["id" => "workspace_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Workspace()->remove(["id" => "workspace_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Workspace()->update([
  "id" => "workspace_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WorkspaceEntity`

Create a new `WorkspaceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new TypebotSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

