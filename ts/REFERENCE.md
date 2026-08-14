# Typebot TypeScript SDK Reference

Complete API reference for the Typebot TypeScript SDK.


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
| `totalCompleted` | `number` | Yes |  |
| `totalStarts` | `number` | Yes |  |
| `totalViews` | `number` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `stat` | `/v1/typebots/{typebotId}/analytics/stats` | `client.Analytics().load({ $action: 'stat', ... })` |

An action returns that action's OWN response, which is not necessarily a
Analytics record — check the API definition for its shape.

```ts
const result = await client.Analytics().load({
  $action: 'stat',
  /* ...the action's own arguments */
})
```

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
| `date` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `resetsAt` | `string` | Yes |  |
| `totalChatsUsed` | `number` | Yes |  |
| `url` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `invoice` | `/v1/billing/invoices` | `client.Billing().list({ $action: 'invoice', ... })` |
| `usage` | `/v1/billing/usage` | `client.Billing().load({ $action: 'usage', ... })` |

An action returns that action's OWN response, which is not necessarily a
Billing record — check the API definition for its shape.

```ts
const result = await client.Billing().list({
  $action: 'invoice',
  /* ...the action's own arguments */
})
```

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
| `createdAt` | `string` | Yes |  |
| `folder` | `Record<string, any>` | Yes |  |
| `folderName` | `string` | No |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `parentFolderId` | `any` | Yes |  |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Folder().create({
  createdAt: 'example_createdAt',
  folder: {},
  id: 'example_id',
  name: 'example_name',
  parentFolderId: 'example_parentFolderId',
  updatedAt: 'example_updatedAt',
  workspaceId: 'example_workspaceId',
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
| `answers` | `any[]` | Yes |  |
| `context` | `any` | Yes |  |
| `createdAt` | `string` | Yes |  |
| `description` | `string` | Yes |  |
| `details` | `any` | Yes |  |
| `hasStarted` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `isArchived` | `any` | Yes |  |
| `isCompleted` | `boolean` | Yes |  |
| `lastChatSessionId` | `any` | Yes |  |
| `resultId` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `typebotId` | `string` | Yes |  |
| `variables` | `any[]` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `log` | `/v1/typebots/{typebotId}/results/{resultId}/logs` | `client.Result().list({ $action: 'log', ... })` |

An action returns that action's OWN response, which is not necessarily a
Result record — check the API definition for its shape.

```ts
const result = await client.Result().list({
  $action: 'log',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Result().list({ typebot_id: "example" })
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
| `accessRight` | `string` | Yes |  |
| `createdAt` | `string` | Yes |  |
| `customDomain` | `any` | Yes |  |
| `edges` | `any[]` | Yes |  |
| `enableSafetyFlags` | `boolean` | No |  |
| `events` | `any[]` | Yes |  |
| `folderId` | `any` | Yes |  |
| `fromTemplate` | `string` | No |  |
| `groups` | `any[]` | Yes |  |
| `icon` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `isArchived` | `boolean` | Yes |  |
| `isClosed` | `boolean` | Yes |  |
| `message` | `any` | Yes |  |
| `name` | `string` | Yes |  |
| `overwrite` | `boolean` | No |  |
| `publicId` | `any` | Yes |  |
| `publishedTypebot` | `any` | Yes |  |
| `publishedTypebotId` | `string` | No |  |
| `resultsTablePreferences` | `any` | Yes |  |
| `riskLevel` | `any` | Yes |  |
| `selectedThemeTemplateId` | `any` | Yes |  |
| `settings` | `Record<string, any>` | Yes |  |
| `spaceId` | `any` | Yes |  |
| `theme` | `Record<string, any>` | Yes |  |
| `typebot` | `Record<string, any>` | Yes |  |
| `updatedAt` | `string` | Yes |  |
| `variables` | `any[]` | Yes |  |
| `version` | `any` | No |  |
| `warnings` | `any[]` | No |  |
| `whatsAppCredentialsId` | `any` | Yes |  |
| `workspaceId` | `string` | Yes |  |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `import` | `/v1/typebots/import` | `client.Typebot().create({ $action: 'import', ... })` |
| `publish` | `/v1/typebots/{typebotId}/publish` | `client.Typebot().create({ $action: 'publish', ... })` |
| `unpublish` | `/v1/typebots/{typebotId}/unpublish` | `client.Typebot().create({ $action: 'unpublish', ... })` |
| `published_typebot` | `/v1/typebots/{typebotId}/publishedTypebot` | `client.Typebot().load({ $action: 'published_typebot', ... })` |

An action returns that action's OWN response, which is not necessarily a
Typebot record — check the API definition for its shape.

```ts
const result = await client.Typebot().create({
  $action: 'import',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Typebot().create({
  accessRight: 'example_accessRight',
  createdAt: 'example_createdAt',
  customDomain: 'example_customDomain',
  edges: [],
  events: [],
  folderId: 'example_folderId',
  groups: [],
  icon: 'example_icon',
  id: 'example_id',
  isArchived: true,
  isClosed: true,
  message: 'example_message',
  name: 'example_name',
  publicId: 'example_publicId',
  publishedTypebot: 'example_publishedTypebot',
  resultsTablePreferences: 'example_resultsTablePreferences',
  riskLevel: 'example_riskLevel',
  selectedThemeTemplateId: 'example_selectedThemeTemplateId',
  settings: {},
  spaceId: 'example_spaceId',
  theme: {},
  typebot: {},
  updatedAt: 'example_updatedAt',
  variables: [],
  whatsAppCredentialsId: 'example_whatsAppCredentialsId',
  workspaceId: 'example_workspaceId',
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
| `chatsHardLimit` | `any` | Yes |  |
| `createdAt` | `string` | Yes |  |
| `customChatsLimit` | `any` | Yes |  |
| `customSeatsLimit` | `any` | Yes |  |
| `icon` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `inactiveFirstEmailSentAt` | `any` | Yes |  |
| `inactiveSecondEmailSentAt` | `any` | Yes |  |
| `isPastDue` | `boolean` | Yes |  |
| `isSuspended` | `boolean` | Yes |  |
| `isVerified` | `any` | Yes |  |
| `lastActivityAt` | `any` | Yes |  |
| `name` | `string` | Yes |  |
| `plan` | `string` | Yes |  |
| `role` | `string` | Yes |  |
| `settings` | `any` | Yes |  |
| `stripeId` | `any` | Yes |  |
| `updatedAt` | `string` | Yes |  |
| `user` | `Record<string, any>` | Yes |  |
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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `member` | `/v1/workspaces/{workspaceId}/members` | `client.Workspace().list({ $action: 'member', ... })` |

An action returns that action's OWN response, which is not necessarily a
Workspace record — check the API definition for its shape.

```ts
const result = await client.Workspace().list({
  $action: 'member',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Workspace().create({
  chatsHardLimit: 'example_chatsHardLimit',
  createdAt: 'example_createdAt',
  customChatsLimit: 'example_customChatsLimit',
  customSeatsLimit: 'example_customSeatsLimit',
  icon: 'example_icon',
  id: 'example_id',
  inactiveFirstEmailSentAt: 'example_inactiveFirstEmailSentAt',
  inactiveSecondEmailSentAt: 'example_inactiveSecondEmailSentAt',
  isPastDue: true,
  isSuspended: true,
  isVerified: 'example_isVerified',
  lastActivityAt: 'example_lastActivityAt',
  name: 'example_name',
  plan: 'example_plan',
  role: 'example_role',
  settings: 'example_settings',
  stripeId: 'example_stripeId',
  updatedAt: 'example_updatedAt',
  user: {},
  userId: 'example_userId',
  workspaceId: 'example_workspaceId',
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

