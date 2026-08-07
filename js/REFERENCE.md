# Typebot JavaScript SDK Reference

Complete API reference for the Typebot JavaScript SDK.


## TypebotSDK

### Constructor

```ts
new TypebotSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TypebotSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = TypebotSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `TypebotSDK` instance in test mode.


### Instance Methods

#### `Analytics(data?: object)`

Create a new `Analytics` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AnalyticsEntity` instance.

#### `Billing(data?: object)`

Create a new `Billing` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BillingEntity` instance.

#### `Folder(data?: object)`

Create a new `Folder` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FolderEntity` instance.

#### `Result(data?: object)`

Create a new `Result` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ResultEntity` instance.

#### `Typebot(data?: object)`

Create a new `Typebot` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TypebotEntity` instance.

#### `Workspace(data?: object)`

Create a new `Workspace` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WorkspaceEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `TypebotSDK.test()`.

**Returns:** `TypebotSDK` instance in test mode.


---

## AnalyticsEntity

```ts
const analytics = client.Analytics()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `total_completed` | `number` | Yes |  |
| `total_start` | `number` | Yes |  |
| `total_view` | `number` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Analytics().load({ typebot_id: 'typebot_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AnalyticsEntity` instance with the same client and
options.

#### `client()`

Return the parent `TypebotSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BillingEntity

```ts
const billing = client.Billing()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `number` | Yes |  |
| `currency` | `string` | Yes |  |
| `date` | `*` | Yes |  |
| `id` | `string` | Yes |  |
| `resets_at` | `string` | Yes |  |
| `total_chats_used` | `number` | Yes |  |
| `url` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Billing().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Billing().load({ id: 'billing_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BillingEntity` instance with the same client and
options.

#### `client()`

Return the parent `TypebotSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FolderEntity

```ts
const folder = client.Folder()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `folder` | `Object` | Yes |  |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Folder().create({
  created_at: 'example_created_at',
  folder: {},
  id: 'example_id',
  name: 'example_name',
  parent_folder_id: 'example_parent_folder_id',
  updated_at: 'example_updated_at',
  workspace_id: 'example_workspace_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Folder().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Folder().load({ id: 'folder_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Folder().remove({ id: 'folder_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Folder().update({
  id: 'folder_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FolderEntity` instance with the same client and
options.

#### `client()`

Return the parent `TypebotSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ResultEntity

```ts
const result = client.Result()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `answer` | `Array` | Yes |  |
| `context` | `*` | Yes |  |
| `created_at` | `string` | Yes |  |
| `description` | `string` | Yes |  |
| `detail` | `*` | Yes |  |
| `has_started` | `boolean` | Yes |  |
| `id` | `string` | Yes |  |
| `is_archived` | `boolean` | Yes |  |
| `is_completed` | `boolean` | Yes |  |
| `last_chat_session_id` | `string` | Yes |  |
| `result_id` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `typebot_id` | `string` | Yes |  |
| `variable` | `Array` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Result().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Result().load({ id: 'result_id', typebot_id: 'typebot_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Result().remove({ typebot_id: 'typebot_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ResultEntity` instance with the same client and
options.

#### `client()`

Return the parent `TypebotSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TypebotEntity

```ts
const typebot = client.Typebot()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_right` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `current_user_mode` | `string` | Yes |  |
| `custom_domain` | `*` | Yes |  |
| `edge` | `Array` | Yes |  |
| `enable_safety_flag` | `boolean` | No |  |
| `event` | `Array` | Yes |  |
| `folder_id` | `string` | Yes |  |
| `from_template` | `string` | No |  |
| `group` | `Array` | Yes |  |
| `icon` | `*` | Yes |  |
| `id` | `string` | Yes |  |
| `is_archived` | `boolean` | Yes |  |
| `is_closed` | `boolean` | Yes |  |
| `message` | `*` | Yes |  |
| `name` | `string` | Yes |  |
| `overwrite` | `boolean` | No |  |
| `public_id` | `string` | Yes |  |
| `published_typebot` | `*` | Yes |  |
| `published_typebot_id` | `string` | No |  |
| `results_table_preference` | `*` | Yes |  |
| `risk_level` | `*` | Yes |  |
| `selected_theme_template_id` | `string` | Yes |  |
| `setting` | `Object` | Yes |  |
| `space_id` | `string` | Yes |  |
| `theme` | `Object` | Yes |  |
| `typebot` | `*` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `variable` | `Array` | Yes |  |
| `version` | `*` | No |  |
| `warning` | `Array` | No |  |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Typebot().create({
  access_right: 'example_access_right',
  created_at: 'example_created_at',
  current_user_mode: 'example_current_user_mode',
  custom_domain: 'example_custom_domain',
  edge: [],
  event: [],
  folder_id: 'example_folder_id',
  group: [],
  icon: 'example_icon',
  id: 'example_id',
  is_archived: true,
  is_closed: true,
  message: 'example_message',
  name: 'example_name',
  public_id: 'example_public_id',
  published_typebot: 'example_published_typebot',
  results_table_preference: 'example_results_table_preference',
  risk_level: 'example_risk_level',
  selected_theme_template_id: 'example_selected_theme_template_id',
  setting: {},
  space_id: 'example_space_id',
  theme: {},
  typebot: 'example_typebot',
  updated_at: 'example_updated_at',
  variable: [],
  whats_app_credentials_id: 'example_whats_app_credentials_id',
  workspace_id: 'example_workspace_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Typebot().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Typebot().load({ id: 'typebot_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Typebot().remove({ id: 'typebot_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Typebot().update({
  id: 'typebot_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TypebotEntity` instance with the same client and
options.

#### `client()`

Return the parent `TypebotSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WorkspaceEntity

```ts
const workspace = client.Workspace()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chats_hard_limit` | `*` | Yes |  |
| `created_at` | `string` | Yes |  |
| `current_user_mode` | `string` | Yes |  |
| `icon` | `*` | Yes |  |
| `id` | `string` | Yes |  |
| `inactive_first_email_sent_at` | `*` | Yes |  |
| `inactive_second_email_sent_at` | `*` | Yes |  |
| `is_past_due` | `boolean` | Yes |  |
| `is_suspended` | `boolean` | Yes |  |
| `is_verified` | `boolean` | Yes |  |
| `last_activity_at` | `*` | Yes |  |
| `name` | `string` | Yes |  |
| `plan` | `string` | Yes |  |
| `role` | `string` | Yes |  |
| `setting` | `*` | Yes |  |
| `stripe_id` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `user` | `Object` | Yes |  |
| `user_id` | `string` | Yes |  |
| `workspace` | `Object` | Yes |  |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Workspace().create({
  chats_hard_limit: 'example_chats_hard_limit',
  created_at: 'example_created_at',
  current_user_mode: 'example_current_user_mode',
  icon: 'example_icon',
  id: 'example_id',
  inactive_first_email_sent_at: 'example_inactive_first_email_sent_at',
  inactive_second_email_sent_at: 'example_inactive_second_email_sent_at',
  is_past_due: true,
  is_suspended: true,
  is_verified: true,
  last_activity_at: 'example_last_activity_at',
  name: 'example_name',
  plan: 'example_plan',
  role: 'example_role',
  setting: 'example_setting',
  stripe_id: 'example_stripe_id',
  updated_at: 'example_updated_at',
  user: {},
  user_id: 'example_user_id',
  workspace: {},
  workspace_id: 'example_workspace_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Workspace().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Workspace().load({ id: 'workspace_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Workspace().remove({ id: 'workspace_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Workspace().update({
  id: 'workspace_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WorkspaceEntity` instance with the same client and
options.

#### `client()`

Return the parent `TypebotSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new TypebotSDK({
  feature: {
    test: { active: true },
  }
})
```

