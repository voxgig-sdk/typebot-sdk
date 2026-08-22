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

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `totalCompleted` | `float` | Yes |  |
| `totalStarts` | `float` | Yes |  |
| `totalViews` | `float` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

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

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float` | Yes |  |
| `currency` | `str` | Yes |  |
| `date` | `Any` | Yes |  |
| `id` | `str` | Yes |  |
| `resetsAt` | `str` | Yes |  |
| `totalChatsUsed` | `float` | Yes |  |
| `url` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Billing().list()
for billing in results:
    print(billing)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Billing().load({"id": "billing_id"})
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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

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

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Folder().list()
for folder in results:
    print(folder)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Folder().load({"id": "folder_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Folder().remove({"id": "folder_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

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
| `context` | `Any` | Yes |  |
| `createdAt` | `str` | Yes |  |
| `description` | `str` | Yes |  |
| `details` | `Any` | Yes |  |
| `hasStarted` | `Any` | Yes |  |
| `id` | `str` | Yes |  |
| `isArchived` | `Any` | Yes |  |
| `isCompleted` | `bool` | Yes |  |
| `lastChatSessionId` | `Any` | Yes |  |
| `resultId` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `typebotId` | `str` | Yes |  |
| `variables` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Result().list({"typebot_id": "example"})
for result in results:
    print(result)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Result().load({"id": "result_id", "typebot_id": "typebot_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

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
| `customDomain` | `Any` | Yes |  |
| `edges` | `list` | Yes |  |
| `enableSafetyFlags` | `bool` | No |  |
| `events` | `list` | Yes |  |
| `folderId` | `Any` | Yes |  |
| `fromTemplate` | `str` | No |  |
| `groups` | `list` | Yes |  |
| `icon` | `Any` | Yes |  |
| `id` | `str` | Yes |  |
| `isArchived` | `bool` | Yes |  |
| `isClosed` | `bool` | Yes |  |
| `message` | `Any` | Yes |  |
| `name` | `str` | Yes |  |
| `overwrite` | `bool` | No | If true, even if we detect a conflict, we will overwrite push the updates to the typebot |
| `publicId` | `Any` | Yes |  |
| `publishedTypebot` | `Any` | Yes |  |
| `publishedTypebotId` | `str` | No |  |
| `resultsTablePreferences` | `Any` | Yes |  |
| `riskLevel` | `Any` | Yes |  |
| `selectedThemeTemplateId` | `Any` | Yes |  |
| `settings` | `dict` | Yes |  |
| `spaceId` | `Any` | Yes |  |
| `theme` | `dict` | Yes |  |
| `typebot` | `dict` | Yes |  |
| `updatedAt` | `str` | Yes |  |
| `variables` | `list` | Yes |  |
| `version` | `Any` | No | Provides the version the published bot was migrated from if `migrateToLatestVersion` is set to `true`. |
| `warnings` | `list` | No |  |
| `whatsAppCredentialsId` | `Any` | Yes |  |
| `workspaceId` | `str` | Yes | [Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid) |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Typebot().create({
    "accessRight": "example_accessRight",  # str
    "createdAt": "example_createdAt",  # str
    "customDomain": "example_customDomain",  # Any
    "edges": [],  # list
    "events": [],  # list
    "folderId": "example_folderId",  # Any
    "groups": [],  # list
    "icon": "example_icon",  # Any
    "id": "example_id",  # str
    "isArchived": True,  # bool
    "isClosed": True,  # bool
    "message": "example_message",  # Any
    "name": "example_name",  # str
    "publicId": "example_publicId",  # Any
    "publishedTypebot": "example_publishedTypebot",  # Any
    "resultsTablePreferences": "example_resultsTablePreferences",  # Any
    "riskLevel": "example_riskLevel",  # Any
    "selectedThemeTemplateId": "example_selectedThemeTemplateId",  # Any
    "settings": {},  # dict
    "spaceId": "example_spaceId",  # Any
    "theme": {},  # dict
    "typebot": {},  # dict
    "updatedAt": "example_updatedAt",  # str
    "variables": [],  # list
    "whatsAppCredentialsId": "example_whatsAppCredentialsId",  # Any
    "workspaceId": "example_workspaceId",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Typebot().list()
for typebot in results:
    print(typebot)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Typebot().load({"id": "typebot_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Typebot().remove({"id": "typebot_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

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
| `customChatsLimit` | `Any` | Yes |  |
| `customSeatsLimit` | `Any` | Yes |  |
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
| `role` | `str` | Yes |  |
| `settings` | `Any` | Yes |  |
| `stripeId` | `Any` | Yes |  |
| `updatedAt` | `str` | Yes |  |
| `user` | `dict` | Yes |  |
| `userId` | `str` | Yes |  |
| `workspaceId` | `str` | Yes |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Workspace().create({
    "chatsHardLimit": "example_chatsHardLimit",  # Any
    "createdAt": "example_createdAt",  # str
    "customChatsLimit": "example_customChatsLimit",  # Any
    "customSeatsLimit": "example_customSeatsLimit",  # Any
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
    "role": "example_role",  # str
    "settings": "example_settings",  # Any
    "stripeId": "example_stripeId",  # Any
    "updatedAt": "example_updatedAt",  # str
    "user": {},  # dict
    "userId": "example_userId",  # str
    "workspaceId": "example_workspaceId",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Workspace().list()
for workspace in results:
    print(workspace)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Workspace().load({"id": "workspace_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Workspace().remove({"id": "workspace_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

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
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = TypebotSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

