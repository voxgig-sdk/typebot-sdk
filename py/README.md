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
`load()` returns the bare record (a `dict`) and raises on error.

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

# Entity ops return the bare record and raise on error.
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

Entity operations return the bare result data (a `dict` for single-entity
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

Create an instance: `analytics = client.Analytics()`

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
| `resets_at` | `str` |  |
| `total_chats_used` | `float` |  |
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
| `created_at` | `str` |  |
| `folder` | `dict` |  |
| `folder_name` | `str` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `parent_folder_id` | `str` |  |
| `updated_at` | `str` |  |
| `workspace_id` | `str` |  |

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
    "created_at": "example_created_at",  # str
    "folder": {},  # dict
    "id": "example_id",  # str
    "name": "example_name",  # str
    "parent_folder_id": "example_parent_folder_id",  # str
    "updated_at": "example_updated_at",  # str
    "workspace_id": "example_workspace_id",  # str
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
| `answer` | `list` |  |
| `context` | `Any` |  |
| `created_at` | `str` |  |
| `description` | `str` |  |
| `detail` | `Any` |  |
| `has_started` | `bool` |  |
| `id` | `str` |  |
| `is_archived` | `bool` |  |
| `is_completed` | `bool` |  |
| `last_chat_session_id` | `str` |  |
| `result_id` | `str` |  |
| `status` | `str` |  |
| `typebot_id` | `str` |  |
| `variable` | `list` |  |

#### Example: Load

```python
result = client.Result().load({"id": "result_id", "typebot_id": "typebot_id"})
```

#### Example: List

```python
results = client.Result().list()
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
| `access_right` | `str` |  |
| `created_at` | `str` |  |
| `current_user_mode` | `str` |  |
| `custom_domain` | `Any` |  |
| `edge` | `list` |  |
| `enable_safety_flag` | `bool` |  |
| `event` | `list` |  |
| `folder_id` | `str` |  |
| `from_template` | `str` |  |
| `group` | `list` |  |
| `icon` | `Any` |  |
| `id` | `str` |  |
| `is_archived` | `bool` |  |
| `is_closed` | `bool` |  |
| `message` | `Any` |  |
| `name` | `str` |  |
| `overwrite` | `bool` |  |
| `public_id` | `str` |  |
| `published_typebot` | `Any` |  |
| `published_typebot_id` | `str` |  |
| `results_table_preference` | `Any` |  |
| `risk_level` | `Any` |  |
| `selected_theme_template_id` | `str` |  |
| `setting` | `dict` |  |
| `space_id` | `str` |  |
| `theme` | `dict` |  |
| `typebot` | `Any` |  |
| `updated_at` | `str` |  |
| `variable` | `list` |  |
| `version` | `Any` |  |
| `warning` | `list` |  |
| `whats_app_credentials_id` | `str` |  |
| `workspace_id` | `str` |  |

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
    "access_right": "example_access_right",  # str
    "created_at": "example_created_at",  # str
    "current_user_mode": "example_current_user_mode",  # str
    "custom_domain": "example_custom_domain",  # Any
    "edge": [],  # list
    "event": [],  # list
    "folder_id": "example_folder_id",  # str
    "group": [],  # list
    "icon": "example_icon",  # Any
    "id": "example_id",  # str
    "is_archived": True,  # bool
    "is_closed": True,  # bool
    "message": "example_message",  # Any
    "name": "example_name",  # str
    "public_id": "example_public_id",  # str
    "published_typebot": "example_published_typebot",  # Any
    "results_table_preference": "example_results_table_preference",  # Any
    "risk_level": "example_risk_level",  # Any
    "selected_theme_template_id": "example_selected_theme_template_id",  # str
    "setting": {},  # dict
    "space_id": "example_space_id",  # str
    "theme": {},  # dict
    "typebot": "example_typebot",  # Any
    "updated_at": "example_updated_at",  # str
    "variable": [],  # list
    "whats_app_credentials_id": "example_whats_app_credentials_id",  # str
    "workspace_id": "example_workspace_id",  # str
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
| `chats_hard_limit` | `Any` |  |
| `created_at` | `str` |  |
| `current_user_mode` | `str` |  |
| `icon` | `Any` |  |
| `id` | `str` |  |
| `inactive_first_email_sent_at` | `Any` |  |
| `inactive_second_email_sent_at` | `Any` |  |
| `is_past_due` | `bool` |  |
| `is_suspended` | `bool` |  |
| `is_verified` | `bool` |  |
| `last_activity_at` | `Any` |  |
| `name` | `str` |  |
| `plan` | `str` |  |
| `role` | `str` |  |
| `setting` | `Any` |  |
| `stripe_id` | `str` |  |
| `updated_at` | `str` |  |
| `user` | `dict` |  |
| `user_id` | `str` |  |
| `workspace` | `dict` |  |
| `workspace_id` | `str` |  |

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
    "chats_hard_limit": "example_chats_hard_limit",  # Any
    "created_at": "example_created_at",  # str
    "current_user_mode": "example_current_user_mode",  # str
    "icon": "example_icon",  # Any
    "id": "example_id",  # str
    "inactive_first_email_sent_at": "example_inactive_first_email_sent_at",  # Any
    "inactive_second_email_sent_at": "example_inactive_second_email_sent_at",  # Any
    "is_past_due": True,  # bool
    "is_suspended": True,  # bool
    "is_verified": True,  # bool
    "last_activity_at": "example_last_activity_at",  # Any
    "name": "example_name",  # str
    "plan": "example_plan",  # str
    "role": "example_role",  # str
    "setting": "example_setting",  # Any
    "stripe_id": "example_stripe_id",  # str
    "updated_at": "example_updated_at",  # str
    "user": {},  # dict
    "user_id": "example_user_id",  # str
    "workspace": {},  # dict
    "workspace_id": "example_workspace_id",  # str
})
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
