# Typebot JavaScript SDK



The JavaScript SDK for the Typebot API — an entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Analytics()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```js
npm install typebot
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.


### Create a Client

```js
const { TypebotSDK } = require('@voxgig-sdk/typebot-js')

const client = new TypebotSDK({
  apikey: process.env.TYPEBOT_APIKEY,
})
```

### Load an Analytics

```js
const analytics = await client.Analytics().load({ typebot_id: 'example_typebot_id' })
console.log(analytics)
```

### Direct API Access

Use `client.direct()` to call any API endpoint directly:

```js
const result = await client.direct({
  path: '/custom/endpoint/{id}',
  method: 'GET',
  params: { id: 'abc123' },
})

if (result.ok) {
  console.log(result.data)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const billings = await client.Billing().list()
  console.log(billings)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```js
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```js
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```js
const client = TypebotSDK.test()

const billing = await client.Billing().list()
// billing is a bare entity populated with mock response data
console.log(billing)
```

You can also use the instance method:

```js
const client = new TypebotSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```js
const entity = client.Billing()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```js
const logger = {
  hooks: {
    PreRequest: (ctx) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new TypebotSDK({
  apikey: '...',
  extend: [logger],
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
cd js && npm test
```


## Reference

### TypebotSDK

#### Constructor

```js
new TypebotSDK(options?)
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Analytics(data?)` | `AnalyticsEntity` | Create an Analytics entity instance. |
| `Billing(data?)` | `BillingEntity` | Create a Billing entity instance. |
| `Folder(data?)` | `FolderEntity` | Create a Folder entity instance. |
| `Result(data?)` | `ResultEntity` | Create a Result entity instance. |
| `Typebot(data?)` | `TypebotEntity` | Create a Typebot entity instance. |
| `Workspace(data?)` | `WorkspaceEntity` | Create a Workspace entity instance. |
| `tester(testopts?, sdkopts?)` | `TypebotSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `TypebotSDK.test(testopts?, sdkopts?)` | `TypebotSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): TypebotSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `undefined`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```js
{
  ok: true,
  status: 200,
  headers: {},
  data: {}
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```js
{
  url: 'string',
  method: 'string',
  headers: {},
  body: undefined
}
```

### Entities

#### Analytics

| Field | Description |
| --- | --- |
| `total_completed` |  |
| `total_start` |  |
| `total_view` |  |

Operations: load.

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

Operations: list, load.

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

Operations: create, list, load, remove, update.

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

Operations: list, load, remove.

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

Operations: create, list, load, remove, update.

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

Operations: create, list, load, remove, update.

API path: `/v1/workspaces`



## Entities


### Analytics

Create an instance: `const analytics = client.Analytics()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `total_completed` | `number` |  |
| `total_start` | `number` |  |
| `total_view` | `number` |  |

#### Example: Load

```ts
const analytics = await client.Analytics().load({ typebot_id: 'typebot_id' })
```


### Billing

Create an instance: `const billing = client.Billing()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `number` |  |
| `currency` | `string` |  |
| `date` | `*` |  |
| `id` | `string` |  |
| `resets_at` | `string` |  |
| `total_chats_used` | `number` |  |
| `url` | `string` |  |

#### Example: Load

```ts
const billing = await client.Billing().load({ id: 'billing_id' })
```

#### Example: List

```ts
const billings = await client.Billing().list()
```


### Folder

Create an instance: `const folder = client.Folder()`

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
| `folder` | `Object` |  |
| `folder_name` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `parent_folder_id` | `string` |  |
| `updated_at` | `string` |  |
| `workspace_id` | `string` |  |

#### Example: Load

```ts
const folder = await client.Folder().load({ id: 'folder_id' })
```

#### Example: List

```ts
const folders = await client.Folder().list()
```

#### Example: Create

```ts
const folder = await client.Folder().create({
  created_at: 'example_created_at',
  folder: {},
  id: 'example_id',
  name: 'example_name',
  parent_folder_id: 'example_parent_folder_id',
  updated_at: 'example_updated_at',
  workspace_id: 'example_workspace_id',
})
```


### Result

Create an instance: `const result = client.Result()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `answer` | `Array` |  |
| `context` | `*` |  |
| `created_at` | `string` |  |
| `description` | `string` |  |
| `detail` | `*` |  |
| `has_started` | `boolean` |  |
| `id` | `string` |  |
| `is_archived` | `boolean` |  |
| `is_completed` | `boolean` |  |
| `last_chat_session_id` | `string` |  |
| `result_id` | `string` |  |
| `status` | `string` |  |
| `typebot_id` | `string` |  |
| `variable` | `Array` |  |

#### Example: Load

```ts
const result = await client.Result().load({ id: 'result_id', typebot_id: 'typebot_id' })
```

#### Example: List

```ts
const results = await client.Result().list()
```


### Typebot

Create an instance: `const typebot = client.Typebot()`

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
| `custom_domain` | `*` |  |
| `edge` | `Array` |  |
| `enable_safety_flag` | `boolean` |  |
| `event` | `Array` |  |
| `folder_id` | `string` |  |
| `from_template` | `string` |  |
| `group` | `Array` |  |
| `icon` | `*` |  |
| `id` | `string` |  |
| `is_archived` | `boolean` |  |
| `is_closed` | `boolean` |  |
| `message` | `*` |  |
| `name` | `string` |  |
| `overwrite` | `boolean` |  |
| `public_id` | `string` |  |
| `published_typebot` | `*` |  |
| `published_typebot_id` | `string` |  |
| `results_table_preference` | `*` |  |
| `risk_level` | `*` |  |
| `selected_theme_template_id` | `string` |  |
| `setting` | `Object` |  |
| `space_id` | `string` |  |
| `theme` | `Object` |  |
| `typebot` | `*` |  |
| `updated_at` | `string` |  |
| `variable` | `Array` |  |
| `version` | `*` |  |
| `warning` | `Array` |  |
| `whats_app_credentials_id` | `string` |  |
| `workspace_id` | `string` |  |

#### Example: Load

```ts
const typebot = await client.Typebot().load({ id: 'typebot_id' })
```

#### Example: List

```ts
const typebots = await client.Typebot().list()
```

#### Example: Create

```ts
const typebot = await client.Typebot().create({
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


### Workspace

Create an instance: `const workspace = client.Workspace()`

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
| `chats_hard_limit` | `*` |  |
| `created_at` | `string` |  |
| `current_user_mode` | `string` |  |
| `icon` | `*` |  |
| `id` | `string` |  |
| `inactive_first_email_sent_at` | `*` |  |
| `inactive_second_email_sent_at` | `*` |  |
| `is_past_due` | `boolean` |  |
| `is_suspended` | `boolean` |  |
| `is_verified` | `boolean` |  |
| `last_activity_at` | `*` |  |
| `name` | `string` |  |
| `plan` | `string` |  |
| `role` | `string` |  |
| `setting` | `*` |  |
| `stripe_id` | `string` |  |
| `updated_at` | `string` |  |
| `user` | `Object` |  |
| `user_id` | `string` |  |
| `workspace` | `Object` |  |
| `workspace_id` | `string` |  |

#### Example: Load

```ts
const workspace = await client.Workspace().load({ id: 'workspace_id' })
```

#### Example: List

```ts
const workspaces = await client.Workspace().list()
```

#### Example: Create

```ts
const workspace = await client.Workspace().create({
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
typebot/
├── src/
│   ├── TypebotSDK.js        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
└── test/                   # Test suites
```

Import the SDK from the package root:

```js
const { TypebotSDK } = require('@voxgig-sdk/typebot-js')
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const billing = client.Billing()
await billing.list()

// billing.data() now returns the billing data from the last `list`
// billing.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
