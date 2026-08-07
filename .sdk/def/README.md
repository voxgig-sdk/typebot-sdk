# API Definition

`typebot-builder.json` is the Typebot **Builder API** OpenAPI 3.1.1 document,
fetched unauthenticated from

    https://app.typebot.com/api/openapi.json

on 2026-08-07, then processed in exactly two ways before generation. Both are
mechanical and both are disclosed here so the file can be diffed against
upstream:

1. **Pretty-printed.** Upstream serves the document minified onto a single
   line. It contains the string `"... Unicode Technical Standard #35"`, and a
   space-hash sequence inside a quoted string is read as a start-of-comment by
   YAML-tolerant parsers, which then swallow the rest of the (single-line)
   document. Re-serializing with `json.dump(..., indent=2)` fixes it without
   changing a single value.

2. **Cut to the documented surface.** Upstream publishes 53 paths / 67
   operations, including internal endpoints that are not part of the public API
   (`/mock/fail`, `/mock/mirror-body`, `/stripe/webhook`, `/resend/webhook`,
   `/s3/private/{rest}`, `/emails/unsubscribe`,
   `/credentials/google-sheets/callback`, `/{blockType}/oauth/authorize`, the
   WhatsApp media/webhook endpoints). This copy keeps the **17 paths / 27
   operations** that Typebot themselves document in the
   `docs.typebot.com/api-reference` navigation — Typebot, Results, Analytics,
   Folder, Workspace, Billing — and prunes `components.schemas` to the 94
   schemas still reachable from them.

Nothing else was edited. `info`, `servers`, `securitySchemes`, and every
retained operation and schema are byte-for-byte upstream's.
