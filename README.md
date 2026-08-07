<!-- JOSTRACA_PROTECT
This README is hand-applied on top of the generated one. The marker above
tells jostraca not to overwrite it on regeneration. Delete the marker to go
back to the fully generated README.
-->

# Typebot SDK

Typebot Builder API clients in TypeScript, JavaScript, Go, Python, PHP, and Lua, plus a CLI and
an MCP server for AI agents. All generated from Typebot's public OpenAPI spec, so every
surface stays in sync with the API.

> **Unofficial.** This is an unofficial SDK for the Typebot public API, built by
> [Voxgig](https://voxgig.com/sdk). It is not affiliated with, endorsed by, or sponsored by
> Typebot.

**Why this exists:** Voxgig builds public SDK and MCP examples for APIs we think are
interesting. This is one of those. MIT-licensed, take whatever's useful.

## Try it (TypeScript)

```bash
git clone https://github.com/voxgig-sdk/typebot-sdk
cd typebot-sdk/ts
npm install
npm run build
npm test
```

The test suite runs fully offline. Every SDK ships a test mode that swaps the HTTP transport
for an in-memory mock, so you can try it without credentials or a network.

## Quickstart

Get an API token from the Typebot dashboard, under Settings & Members, My account, API tokens.
The SDK sends it as `Authorization: Bearer <token>` against `https://app.typebot.com/api`.

```ts
import { TypebotSDK } from '@voxgig-sdk/typebot'

const client = new TypebotSDK({
  apikey: process.env.TYPEBOT_APIKEY,
})

// List the workspaces this token can see (returns Workspace[])
const workspaces = await client.Workspace().list()
console.log(workspaces)

// List the typebots in the first one (returns Typebot[])
const typebots = await client.Typebot().list({
  workspace_id: workspaces[0]?.id,
})
console.log(typebots)
```

## What's in the box

| Surface | Use it for | Where |
|---|---|---|
| SDK, 6 languages | App integration | `/ts` `/js` `/go` `/py` `/php` `/lua` |
| CLI | Scripts, CI, exploration (interactive REPL mode included) | `/go-cli` |
| MCP server | AI agents: Claude, Cursor, and friends | `/go-mcp` |
| Agent guide | Points coding agents at all of the above | `AGENTS.md` |

All of it comes from one spec. Change the spec, regenerate, and every surface updates
together. None of them drift.

## Using the MCP server

```bash
cd go-mcp
make build                        # -> dist/<os>-<arch>/typebot-mcp
export TYPEBOT_APIKEY=your-api-token
```

Register it with any MCP client. For Claude Code:

```bash
claude mcp add --scope user typebot \
  -- "$PWD"/dist/linux-amd64/typebot-mcp -transport stdio
```

Or, for a client that reads a JSON config (Claude Desktop, Cursor):

```json
{
  "mcpServers": {
    "typebot": {
      "command": "/abs/path/to/typebot-mcp",
      "args": ["-transport", "stdio"],
      "env": { "TYPEBOT_APIKEY": "your-api-token" }
    }
  }
}
```

The server exposes two tools, `typebot_list` and `typebot_load`, each taking an `entity`
argument (one of the six below) and an optional `query` match map. Your customers' AI agents
can call the Typebot API through this today.

## Honest state

Generated from Typebot's public Builder API OpenAPI spec on 2026-08-07. Not production-tuned.

Known rough edge: **the typebot definition itself is not typed**. The block schema is an
untagged union of 1,796 `const` variants across 335 `oneOf` and 880 `anyOf` branches, nested
32 levels deep, with no `discriminator` keyword anywhere. No generator can pick a variant out
of that, so the SDK models `group`, `event`, `edge`, `variable`, `theme` and `setting` as open
arrays and maps rather than pretend to type them. Everything around the definition (ids,
names, timestamps, workspace and folder fields, results, analytics, billing) is typed
normally. A second, smaller edge: four different POSTs under `/v1/typebots` (create, import,
publish, unpublish) collapse onto one `create` operation with four endpoints, because publish
and unpublish are actions rather than resource creations.

Use it as a starting point or a reference.

When teams want SDKs like these production-grade, idiomatic per language, tested, documented,
and released through a real pipeline, Voxgig does that work as a consulting engagement. The
toolkit also generates Java and C# if your customers need them.

## Scope

This SDK covers the **17 paths, 27 operations** that Typebot document in the
[docs.typebot.com/api-reference](https://docs.typebot.com/api-reference) navigation. The
served spec also contains internal endpoints (`/mock/*`, `/stripe/webhook`, `/resend/webhook`,
`/s3/private/{rest}`, the WhatsApp media hooks) that are not part of the public API, and those
are excluded. The exact spec used is vendored at
[`.sdk/def/typebot-builder.json`](.sdk/def/typebot-builder.json), with a note on the two
mechanical changes made to it in [`.sdk/def/README.md`](.sdk/def/README.md).

For anything outside that set, every client also has `direct()` and `prepare()`, see
[Direct and prepare](#direct-and-prepare).

## Entities

The API exposes 6 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Analytics** | The Analytics entity (load). | `/v1/typebots/{typebotId}/analytics/stats` |
| **Billing** | The Billing entity (list, load). | `/v1/billing/invoices` |
| **Folder** | The Folder entity (create, list, load, remove, update). | `/v1/folders` |
| **Result** | The Result entity (list, load, remove). | `/v1/typebots/{typebotId}/results` |
| **Typebot** | The Typebot entity (create, list, load, remove, update). | `/v1/typebots/{typebotId}/publish` |
| **Workspace** | The Workspace entity (create, list, load, remove, update). | `/v1/workspaces` |

The operations available across these entities are **load**, **list**, **create**, **update**,
**remove**, see each entity's own list above for exactly which it supports.

None of the spec's 94 named schemas carries a `description`, so the Description column is
derived from the operation set rather than from the spec. Result logs are folded into **Result**, workspace
members into **Workspace**, and invoices plus usage into **Billing**, because each shares a
path prefix with its parent.

## Entities, not endpoints

This SDK exposes the API as a small set of **semantic entities**, Analytics, Billing, Folder,
Result, Typebot and Workspace, that you call directly, instead of assembling URL paths and
query strings. Entities are **Capitalised** to mark them as the primary surface, each with the
operations they support (`list`, `load`, `create`, `update`, `remove`).

Thinking in entities keeps the mental model small, for people and AI agents alike, rather than
reasoning about raw HTTP routes and query parameters.

## Offline unit testing

Every SDK ships a built-in **test mode** that swaps the HTTP transport for
an in-memory mock, so your unit tests run fully offline, no server, no
network, and no credentials:

```ts
const client = TypebotSDK.test()
const workspaces = await client.Workspace().list()
// workspaces is an array of bare Workspace records populated with mock data
console.log(workspaces)
```

## The same call in other languages

### Python

```python
import os
from typebot_sdk import TypebotSDK

client = TypebotSDK({
    "apikey": os.environ.get("TYPEBOT_APIKEY"),
})


# List the workspaces this token can see (returns a list of records)
workspaces = client.Workspace().list()
print(workspaces)
```

### PHP

```php
<?php
require_once 'typebot_sdk.php';

$client = new TypebotSDK([
    "apikey" => getenv("TYPEBOT_APIKEY"),
]);


// List the workspaces this token can see (returns bare records)
$workspaces = $client->Workspace()->list();
print_r($workspaces);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/typebot-sdk/go"

client := sdk.NewTypebotSDK(map[string]any{
    "apikey": os.Getenv("TYPEBOT_APIKEY"),
})


// List the workspaces this token can see
workspaces, err := client.Workspace(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(workspaces)
```

### Lua

```lua
local sdk = require("typebot_sdk")

local client = sdk.new({
  apikey = os.getenv("TYPEBOT_APIKEY"),
})


-- List the workspaces this token can see
local workspaces, err = client:Workspace():list()
print(workspaces)
```

### JavaScript

```js
const { TypebotSDK } = require('@voxgig-sdk/typebot-js')

const client = new TypebotSDK({
  apikey: process.env.TYPEBOT_APIKEY,
})


// List the workspaces this token can see (returns bare records)
const workspaces = await client.Workspace().list()
console.log(workspaces)
```

## Using the CLI

```bash
cd go-cli
make build                        # -> dist/<os>-<arch>/typebot-cli
export TYPEBOT_APIKEY=your-api-token

./dist/linux-amd64/typebot-cli list workspace
./dist/linux-amd64/typebot-cli load '{id:"tb01"}' typebot
./dist/linux-amd64/typebot-cli                    # no args: interactive REPL
```

Or install it straight from the module:

```bash
go install github.com/voxgig-sdk/typebot-sdk/go-cli@latest
```

## Install from source

None of these packages are published to npm, PyPI, Packagist or LuaRocks. This is a
demonstration repository, so install is clone-based: clone it, then work in the language
directory you want. The Go modules can be fetched directly:

```bash
go get github.com/voxgig-sdk/typebot-sdk/go@latest
```

## Direct and prepare

For endpoints the entity model doesn't cover, including the Typebot operations outside the
documented set, use the low-level methods:

- **`direct(fetchargs)`**, build and send an HTTP request in one step.
- **`prepare(fetchargs)`**, build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`, `headers`, and `body`.

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
if (result instanceof Error) {
  throw result
}
console.log(result.data)
```

**Python:**
```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}
fmt.Println(result)
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

**JavaScript:**
```js
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
if (result instanceof Error) {
  throw result
}
console.log(result.data)
```

## How it works

> Everyday use only needs the sections above. This explains the internals
> behind every call, relevant when writing custom features.

Every SDK call runs the same five-stage pipeline:

1. **Point**, resolve the API endpoint from the operation definition.
2. **Spec**, build the HTTP specification (URL, method, headers, body).
3. **Request**, send the HTTP request.
4. **Response**, receive and parse the response.
5. **Result**, extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Lua](lua/README.md)
- [JavaScript](js/README.md)
- [Go CLI](go-cli/README.md)
- [Go MCP server](go-mcp/README.md)

## Security

Please report security issues to security@voxgig.com. See [SECURITY.md](SECURITY.md).
Do not open public issues for suspected vulnerabilities.

---

Generated by the [Voxgig SDK Generator](https://voxgig.com/sdk), MIT-licensed. Browse 600+
generated SDKs at [github.com/voxgig-sdk](https://github.com/voxgig-sdk).

Questions, or want these production-grade? Email richard@voxgig.com.

If you are from Typebot and would like this repository removed, or transferred to your
own GitHub organisation, email richard@voxgig.com and it will be done within two business
days, no questions asked.
