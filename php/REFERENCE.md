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
| `totalCompleted` | `float` | Yes |  |
| `totalStarts` | `float` | Yes |  |
| `totalViews` | `float` | Yes |  |

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
| `resetsAt` | `string` | Yes |  |
| `totalChatsUsed` | `float` | Yes |  |
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
| `createdAt` | `string` | Yes |  |
| `folder` | `array` | Yes |  |
| `folderName` | `string` | No |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `parentFolderId` | `mixed` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Folder()->create([
  "createdAt" => null, // string
  "folder" => null, // array
  "id" => null, // string
  "name" => null, // string
  "parentFolderId" => null, // mixed
  "updatedAt" => null, // string
  "workspaceId" => null, // string
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
| `answers` | `array` | Yes |  |
| `context` | `mixed` | Yes |  |
| `createdAt` | `string` | Yes |  |
| `description` | `string` | Yes |  |
| `details` | `mixed` | Yes |  |
| `hasStarted` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `isArchived` | `mixed` | Yes |  |
| `isCompleted` | `bool` | Yes |  |
| `lastChatSessionId` | `mixed` | Yes |  |
| `resultId` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `typebotId` | `string` | Yes |  |
| `variables` | `array` | Yes |  |

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
| `accessRight` | `string` | Yes |  |
| `createdAt` | `string` | Yes |  |
| `customDomain` | `mixed` | Yes |  |
| `edges` | `array` | Yes |  |
| `enableSafetyFlags` | `bool` | No |  |
| `events` | `array` | Yes |  |
| `folderId` | `mixed` | Yes |  |
| `fromTemplate` | `string` | No |  |
| `groups` | `array` | Yes |  |
| `icon` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `isArchived` | `bool` | Yes |  |
| `isClosed` | `bool` | Yes |  |
| `message` | `mixed` | Yes |  |
| `name` | `string` | Yes |  |
| `overwrite` | `bool` | No | If true, even if we detect a conflict, we will overwrite push the updates to the typebot |
| `publicId` | `mixed` | Yes |  |
| `publishedTypebot` | `mixed` | Yes |  |
| `publishedTypebotId` | `string` | No |  |
| `resultsTablePreferences` | `mixed` | Yes |  |
| `riskLevel` | `mixed` | Yes |  |
| `selectedThemeTemplateId` | `mixed` | Yes |  |
| `settings` | `array` | Yes |  |
| `spaceId` | `mixed` | Yes |  |
| `theme` | `array` | Yes |  |
| `typebot` | `array` | Yes |  |
| `updatedAt` | `string` | Yes |  |
| `variables` | `array` | Yes |  |
| `version` | `mixed` | No | Provides the version the published bot was migrated from if `migrateToLatestVersion` is set to `true`. |
| `warnings` | `array` | No |  |
| `whatsAppCredentialsId` | `mixed` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Typebot()->create([
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
| `chatsHardLimit` | `mixed` | Yes |  |
| `createdAt` | `string` | Yes |  |
| `customChatsLimit` | `mixed` | Yes |  |
| `customSeatsLimit` | `mixed` | Yes |  |
| `icon` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `inactiveFirstEmailSentAt` | `mixed` | Yes |  |
| `inactiveSecondEmailSentAt` | `mixed` | Yes |  |
| `isPastDue` | `bool` | Yes |  |
| `isSuspended` | `bool` | Yes |  |
| `isVerified` | `mixed` | Yes |  |
| `lastActivityAt` | `mixed` | Yes |  |
| `name` | `string` | Yes |  |
| `plan` | `string` | Yes |  |
| `role` | `string` | Yes |  |
| `settings` | `mixed` | Yes |  |
| `stripeId` | `mixed` | Yes |  |
| `updatedAt` | `string` | Yes |  |
| `user` | `array` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Workspace()->create([
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

