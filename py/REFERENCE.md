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
| `total_completed` | `float` | Yes |  |
| `total_start` | `float` | Yes |  |
| `total_view` | `float` | Yes |  |

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
| `resets_at` | `str` | Yes |  |
| `total_chats_used` | `float` | Yes |  |
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
| `created_at` | `str` | Yes |  |
| `folder` | `dict` | Yes |  |
| `folder_name` | `str` | No |  |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `parent_folder_id` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `workspace_id` | `str` | Yes |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Folder().create({
    "created_at": "example_created_at",  # str
    "folder": {},  # dict
    "id": "example_id",  # str
    "name": "example_name",  # str
    "parent_folder_id": "example_parent_folder_id",  # str
    "updated_at": "example_updated_at",  # str
    "workspace_id": "example_workspace_id",  # str
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
| `answer` | `list` | Yes |  |
| `context` | `Any` | Yes |  |
| `created_at` | `str` | Yes |  |
| `description` | `str` | Yes |  |
| `detail` | `Any` | Yes |  |
| `has_started` | `bool` | Yes |  |
| `id` | `str` | Yes |  |
| `is_archived` | `bool` | Yes |  |
| `is_completed` | `bool` | Yes |  |
| `last_chat_session_id` | `str` | Yes |  |
| `result_id` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `typebot_id` | `str` | Yes |  |
| `variable` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Result().list()
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
| `access_right` | `str` | Yes |  |
| `created_at` | `str` | Yes |  |
| `current_user_mode` | `str` | Yes |  |
| `custom_domain` | `Any` | Yes |  |
| `edge` | `list` | Yes |  |
| `enable_safety_flag` | `bool` | No |  |
| `event` | `list` | Yes |  |
| `folder_id` | `str` | Yes |  |
| `from_template` | `str` | No |  |
| `group` | `list` | Yes |  |
| `icon` | `Any` | Yes |  |
| `id` | `str` | Yes |  |
| `is_archived` | `bool` | Yes |  |
| `is_closed` | `bool` | Yes |  |
| `message` | `Any` | Yes |  |
| `name` | `str` | Yes |  |
| `overwrite` | `bool` | No |  |
| `public_id` | `str` | Yes |  |
| `published_typebot` | `Any` | Yes |  |
| `published_typebot_id` | `str` | No |  |
| `results_table_preference` | `Any` | Yes |  |
| `risk_level` | `Any` | Yes |  |
| `selected_theme_template_id` | `str` | Yes |  |
| `setting` | `dict` | Yes |  |
| `space_id` | `str` | Yes |  |
| `theme` | `dict` | Yes |  |
| `typebot` | `Any` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `variable` | `list` | Yes |  |
| `version` | `Any` | No |  |
| `warning` | `list` | No |  |
| `whats_app_credentials_id` | `str` | Yes |  |
| `workspace_id` | `str` | Yes |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Typebot().create({
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
| `chats_hard_limit` | `Any` | Yes |  |
| `created_at` | `str` | Yes |  |
| `current_user_mode` | `str` | Yes |  |
| `icon` | `Any` | Yes |  |
| `id` | `str` | Yes |  |
| `inactive_first_email_sent_at` | `Any` | Yes |  |
| `inactive_second_email_sent_at` | `Any` | Yes |  |
| `is_past_due` | `bool` | Yes |  |
| `is_suspended` | `bool` | Yes |  |
| `is_verified` | `bool` | Yes |  |
| `last_activity_at` | `Any` | Yes |  |
| `name` | `str` | Yes |  |
| `plan` | `str` | Yes |  |
| `role` | `str` | Yes |  |
| `setting` | `Any` | Yes |  |
| `stripe_id` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `user` | `dict` | Yes |  |
| `user_id` | `str` | Yes |  |
| `workspace` | `dict` | Yes |  |
| `workspace_id` | `str` | Yes |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Workspace().create({
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

