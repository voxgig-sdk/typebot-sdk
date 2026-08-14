# Typebot Python SDK



The Python SDK for the Typebot API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Analytics()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/typebot-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from typebot_sdk import TypebotSDK

client = TypebotSDK({
    "apikey": os.environ.get("TYPEBOT_APIKEY"),
})
```

### 3. Load an analytics

Analytics is nested under typebot, so provide the `typebot_id`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    analytics = client.Analytics().load({"typebot_id": "example_typebot_id"})
    print(analytics)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    billings = client.Billing().list()
    print(billings)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = TypebotSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
billing = client.Billing().list()
# billing contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = TypebotSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### TypebotSDK

```python
from typebot_sdk import TypebotSDK

client = TypebotSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = TypebotSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### TypebotSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `Analytics` | `(data) -> AnalyticsEntity` | Create an Analytics entity instance. |
| `Billing` | `(data) -> BillingEntity` | Create a Billing entity instance. |
| `Folder` | `(data) -> FolderEntity` | Create a Folder entity instance. |
| `Result` | `(data) -> ResultEntity` | Create a Result entity instance. |
| `Typebot` | `(data) -> TypebotEntity` | Create a Typebot entity instance. |
| `Workspace` | `(data) -> WorkspaceEntity` | Create a Workspace entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `analytics = client.Analytics()`

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

```python
analytics = client.Analytics().load({"typebot_id": "typebot_id"})
```


### Billing

Create an instance: `billing = client.Billing()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `float` |  |
| `currency` | `str` |  |
| `date` | `Any` |  |
| `id` | `str` |  |
| `resetsAt` | `str` |  |
| `totalChatsUsed` | `float` |  |
| `url` | `str` |  |

#### Example: Load

```python
billing = client.Billing().load({"id": "billing_id"})
```

#### Example: List

```python
billings = client.Billing().list()
```


### Folder

Create an instance: `folder = client.Folder()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `str` |  |
| `folder` | `dict` |  |
| `folderName` | `str` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `parentFolderId` | `Any` |  |
| `updatedAt` | `str` |  |
| `workspaceId` | `str` |  |

#### Example: Load

```python
folder = client.Folder().load({"id": "folder_id"})
```

#### Example: List

```python
folders = client.Folder().list()
```

#### Example: Create

```python
folder = client.Folder().create({
    "createdAt": "example_createdAt",  # str
    "folder": {},  # dict
    "id": "example_id",  # str
    "name": "example_name",  # str
    "parentFolderId": "example_parentFolderId",  # Any
    "updatedAt": "example_updatedAt",  # str
    "workspaceId": "example_workspaceId",  # str
})
```


### Result

Create an instance: `result = client.Result()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `answers` | `list` |  |
| `context` | `Any` |  |
| `createdAt` | `str` |  |
| `description` | `str` |  |
| `details` | `Any` |  |
| `hasStarted` | `Any` |  |
| `id` | `str` |  |
| `isArchived` | `Any` |  |
| `isCompleted` | `bool` |  |
| `lastChatSessionId` | `Any` |  |
| `resultId` | `str` |  |
| `status` | `str` |  |
| `typebotId` | `str` |  |
| `variables` | `list` |  |

#### Example: Load

```python
result = client.Result().load({"id": "result_id", "typebot_id": "typebot_id"})
```

#### Example: List

```python
results = client.Result().list({"typebot_id": "example"})
```


### Typebot

Create an instance: `typebot = client.Typebot()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accessRight` | `str` |  |
| `createdAt` | `str` |  |
| `customDomain` | `Any` |  |
| `edges` | `list` |  |
| `enableSafetyFlags` | `bool` |  |
| `events` | `list` |  |
| `folderId` | `Any` |  |
| `fromTemplate` | `str` |  |
| `groups` | `list` |  |
| `icon` | `Any` |  |
| `id` | `str` |  |
| `isArchived` | `bool` |  |
| `isClosed` | `bool` |  |
| `message` | `Any` |  |
| `name` | `str` |  |
| `overwrite` | `bool` |  |
| `publicId` | `Any` |  |
| `publishedTypebot` | `Any` |  |
| `publishedTypebotId` | `str` |  |
| `resultsTablePreferences` | `Any` |  |
| `riskLevel` | `Any` |  |
| `selectedThemeTemplateId` | `Any` |  |
| `settings` | `dict` |  |
| `spaceId` | `Any` |  |
| `theme` | `dict` |  |
| `typebot` | `dict` |  |
| `updatedAt` | `str` |  |
| `variables` | `list` |  |
| `version` | `Any` |  |
| `warnings` | `list` |  |
| `whatsAppCredentialsId` | `Any` |  |
| `workspaceId` | `str` |  |

#### Example: Load

```python
typebot = client.Typebot().load({"id": "typebot_id"})
```

#### Example: List

```python
typebots = client.Typebot().list()
```

#### Example: Create

```python
typebot = client.Typebot().create({
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


### Workspace

Create an instance: `workspace = client.Workspace()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `chatsHardLimit` | `Any` |  |
| `createdAt` | `str` |  |
| `customChatsLimit` | `Any` |  |
| `customSeatsLimit` | `Any` |  |
| `icon` | `Any` |  |
| `id` | `str` |  |
| `inactiveFirstEmailSentAt` | `Any` |  |
| `inactiveSecondEmailSentAt` | `Any` |  |
| `isPastDue` | `bool` |  |
| `isSuspended` | `bool` |  |
| `isVerified` | `Any` |  |
| `lastActivityAt` | `Any` |  |
| `name` | `str` |  |
| `plan` | `str` |  |
| `role` | `str` |  |
| `settings` | `Any` |  |
| `stripeId` | `Any` |  |
| `updatedAt` | `str` |  |
| `user` | `dict` |  |
| `userId` | `str` |  |
| `workspaceId` | `str` |  |

#### Example: Load

```python
workspace = client.Workspace().load({"id": "workspace_id"})
```

#### Example: List

```python
workspaces = client.Workspace().list()
```

#### Example: Create

```python
workspace = client.Workspace().create({
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── typebot_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`typebot_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
billing = client.Billing()
billing.list()

# billing.data_get() now returns the billing data from the last list
# billing.match_get() returns the last match criteria
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
