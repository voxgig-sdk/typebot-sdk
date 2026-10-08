# Typebot Python SDK Reference

Complete API reference for the Typebot Python SDK.


## TypebotSDK

### Constructor

```python
from typebot_sdk import TypebotSDK

client = TypebotSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TypebotSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = TypebotSDK.test()
```


### Instance Methods

#### `Analytics(data=None)`

Create a new `AnalyticsEntity` instance. Pass `None` for no initial data.

#### `Billing(data=None)`

Create a new `BillingEntity` instance. Pass `None` for no initial data.

#### `Folder(data=None)`

Create a new `FolderEntity` instance. Pass `None` for no initial data.

#### `Result(data=None)`

Create a new `ResultEntity` instance. Pass `None` for no initial data.

#### `Typebot(data=None)`

Create a new `TypebotEntity` instance. Pass `None` for no initial data.

#### `Workspace(data=None)`

Create a new `WorkspaceEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AnalyticsEntity

```python
analytics = client.Analytics()
```

### Operations

#### `load(reqmatch, ctrl=None) -> AnalyticsEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Analytics().load({"typebot_id": "typebot_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AnalyticsEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BillingEntity

```python
billing = client.Billing()
```

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[BillingEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Billing().list({"workspace_id": "example"})
for billing in results:
    print(billing.data_get())
```

#### `load(reqmatch, ctrl=None) -> BillingEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Billing().load({"workspace_id": "workspace_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BillingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FolderEntity

```python
folder = client.Folder()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `str` | Yes |  |
| `folder` | `dict` | Yes |  |
| `folderName` | `str` | No |  |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `parentFolderId` | `Any` | Yes |  |
| `updatedAt` | `str` | Yes |  |
| `workspaceId` | `str` | Yes |  |

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

#### `create(reqdata, ctrl=None) -> FolderEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Folder().create({
    "createdAt": "example_createdAt",  # str
    "folder": {},  # dict
    "id": "example_id",  # str
    "name": "example_name",  # str
    "parentFolderId": "example_parentFolderId",  # Any
    "updatedAt": "example_updatedAt",  # str
    "workspaceId": "example_workspaceId",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[FolderEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Folder().list({"workspace_id": "example"})
for folder in results:
    print(folder.data_get())
```

#### `load(reqmatch, ctrl=None) -> FolderEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Folder().load({"id": "folder_id", "workspace_id": "workspace_id"})
```

#### `remove(reqmatch, ctrl=None) -> FolderEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Folder().remove({"id": "folder_id"})
```

#### `update(reqdata, ctrl=None) -> FolderEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Folder().update({
    "id": "folder_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FolderEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ResultEntity

```python
result = client.Result()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `answers` | `list` | Yes |  |
| `createdAt` | `str` | Yes |  |
| `hasStarted` | `Any` | Yes |  |
| `id` | `str` | Yes |  |
| `isArchived` | `Any` | Yes |  |
| `isCompleted` | `bool` | Yes |  |
| `lastChatSessionId` | `Any` | Yes |  |
| `typebotId` | `str` | Yes |  |
| `variables` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ResultEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Result().list({"typebot_id": "example"})
for result in results:
    print(result.data_get())
```

#### `load(reqmatch, ctrl=None) -> ResultEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Result().load({"id": "result_id", "typebot_id": "typebot_id"})
```

#### `remove(reqmatch, ctrl=None) -> ResultEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Result().remove({"typebot_id": "typebot_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResultEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TypebotEntity

```python
typebot = client.Typebot()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accessRight` | `str` | Yes |  |
| `createdAt` | `str` | Yes |  |
| `currentUserMode` | `str` | Yes |  |
| `customDomain` | `Any` | Yes |  |
| `edges` | `list` | Yes |  |
| `events` | `list` | Yes |  |
| `folderId` | `Any` | Yes |  |
| `groups` | `list` | Yes |  |
| `icon` | `Any` | Yes |  |
| `id` | `str` | Yes |  |
| `isArchived` | `bool` | Yes |  |
| `isClosed` | `bool` | Yes |  |
| `name` | `str` | Yes |  |
| `overwrite` | `bool` | No | If true, even if we detect a conflict, we will overwrite push the updates to the typebot |
| `publicId` | `Any` | Yes |  |
| `publishedTypebotId` | `str` | No |  |
| `resultsTablePreferences` | `Any` | Yes |  |
| `riskLevel` | `Any` | Yes |  |
| `selectedThemeTemplateId` | `Any` | Yes |  |
| `settings` | `dict` | Yes |  |
| `spaceId` | `Any` | Yes |  |
| `theme` | `dict` | Yes |  |
| `typebot` | `Any` | Yes |  |
| `updatedAt` | `str` | Yes |  |
| `variables` | `list` | Yes |  |
| `version` | `str` | Yes |  |
| `whatsAppCredentialsId` | `Any` | Yes |  |
| `workspaceId` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> TypebotEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Typebot().create({
    "accessRight": "example_accessRight",  # str
    "createdAt": "example_createdAt",  # str
    "currentUserMode": "example_currentUserMode",  # str
    "customDomain": "example_customDomain",  # Any
    "edges": [],  # list
    "events": [],  # list
    "folderId": "example_folderId",  # Any
    "groups": [],  # list
    "icon": "example_icon",  # Any
    "id": "example_id",  # str
    "isArchived": True,  # bool
    "isClosed": True,  # bool
    "name": "example_name",  # str
    "publicId": "example_publicId",  # Any
    "resultsTablePreferences": "example_resultsTablePreferences",  # Any
    "riskLevel": "example_riskLevel",  # Any
    "selectedThemeTemplateId": "example_selectedThemeTemplateId",  # Any
    "settings": {},  # dict
    "spaceId": "example_spaceId",  # Any
    "theme": {},  # dict
    "typebot": "example_typebot",  # Any
    "updatedAt": "example_updatedAt",  # str
    "variables": [],  # list
    "version": "example_version",  # str
    "whatsAppCredentialsId": "example_whatsAppCredentialsId",  # Any
    "workspaceId": "example_workspaceId",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[TypebotEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Typebot().list({"workspace_id": "example"})
for typebot in results:
    print(typebot.data_get())
```

#### `load(reqmatch, ctrl=None) -> TypebotEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Typebot().load({"id": "typebot_id"})
```

#### `remove(reqmatch, ctrl=None) -> TypebotEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Typebot().remove({"id": "typebot_id"})
```

#### `update(reqdata, ctrl=None) -> TypebotEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Typebot().update({
    "id": "typebot_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TypebotEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WorkspaceEntity

```python
workspace = client.Workspace()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chatsHardLimit` | `Any` | Yes |  |
| `createdAt` | `str` | Yes |  |
| `currentUserMode` | `str` | Yes |  |
| `icon` | `Any` | Yes |  |
| `id` | `str` | Yes |  |
| `inactiveFirstEmailSentAt` | `Any` | Yes |  |
| `inactiveSecondEmailSentAt` | `Any` | Yes |  |
| `isPastDue` | `bool` | Yes |  |
| `isSuspended` | `bool` | Yes |  |
| `isVerified` | `Any` | Yes |  |
| `lastActivityAt` | `Any` | Yes |  |
| `name` | `str` | Yes |  |
| `plan` | `str` | Yes |  |
| `settings` | `Any` | Yes |  |
| `stripeId` | `Any` | Yes |  |
| `updatedAt` | `str` | Yes |  |
| `workspace` | `dict` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `chatsHardLimit` | - | - | - | - | - |
| `createdAt` | - | - | - | - | - |
| `currentUserMode` | - | - | - | - | - |
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
| `settings` | - | - | - | - | - |
| `stripeId` | - | - | - | - | - |
| `updatedAt` | - | - | - | - | - |
| `workspace` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> WorkspaceEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Workspace().create({
    "chatsHardLimit": "example_chatsHardLimit",  # Any
    "createdAt": "example_createdAt",  # str
    "currentUserMode": "example_currentUserMode",  # str
    "icon": "example_icon",  # Any
    "id": "example_id",  # str
    "inactiveFirstEmailSentAt": "example_inactiveFirstEmailSentAt",  # Any
    "inactiveSecondEmailSentAt": "example_inactiveSecondEmailSentAt",  # Any
    "isPastDue": True,  # bool
    "isSuspended": True,  # bool
    "isVerified": "example_isVerified",  # Any
    "lastActivityAt": "example_lastActivityAt",  # Any
    "name": "example_name",  # str
    "plan": "example_plan",  # str
    "settings": "example_settings",  # Any
    "stripeId": "example_stripeId",  # Any
    "updatedAt": "example_updatedAt",  # str
    "workspace": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list[WorkspaceEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Workspace().list()
for workspace in results:
    print(workspace.data_get())
```

#### `load(reqmatch, ctrl=None) -> WorkspaceEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Workspace().load({"id": "workspace_id"})
```

#### `remove(reqmatch, ctrl=None) -> WorkspaceEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Workspace().remove({"id": "workspace_id"})
```

#### `update(reqdata, ctrl=None) -> WorkspaceEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Workspace().update({
    "id": "workspace_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WorkspaceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `debug` | 0.0.1 | Debug capture |
| `idempotency` | 0.0.1 | Idempotency |
| `metrics` | 0.0.1 | Metrics |
| `paging` | 0.0.1 | Paging |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```python
client = TypebotSDK({
    "feature": {
        "debug": {"active": True},
        "idempotency": {"active": True},
        "metrics": {"active": True},
        "paging": {"active": True},
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`debug`, `idempotency`, `metrics`, `paging`, `test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `debug`

Debug capture.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

| Option | Type |
|---|---|
| `now` | function |
| `onEntry` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.debug.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `idempotency`

Idempotency.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

| Option | Type |
|---|---|
| `keygen` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.idempotency.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `metrics`

Metrics.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `now` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.metrics.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `paging`

Paging.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

| Option | Type |
|---|---|
| `limit` | number |
| `ops` | list |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.paging.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

