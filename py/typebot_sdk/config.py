# Typebot SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Typebot",
            "slug": "typebot",
            "version": "0.1.1",
            "target": "py",
        },
        "feature": {
            "debug": {
        "options": {
          "active": False,
          "max": 100,
          "redact": [
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          ],
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "onEntry": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "idempotency": {
        "options": {
          "active": False,
          "header": "Idempotency-Key",
          "methods": [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          ],
          "ops": [
            "create",
            "update",
            "remove",
          ],
        },
        "optspec": {
          "keygen": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "metrics": {
        "options": {
          "active": False,
        },
        "optspec": {
          "now": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "paging": {
        "options": {
          "active": False,
          "afterVar": "after",
          "cursorParam": "cursor",
          "firstVar": "first",
          "limitParam": "limit",
          "pageParam": "page",
          "startPage": 1,
        },
        "optspec": {
          "limit": "`$NUMBER`",
          "ops": "`$LIST`",
        },
        "strict": False,
        "transport": "none",
      },
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://app.typebot.com/api",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "analytics": {},
                "billing": {},
                "folder": {},
                "result": {},
                "typebot": {},
                "workspace": {},
            },
        },
        "entity": {
      "analytics": {
        "fields": [],
        "name": "analytics",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/typebots/{typebotId}/analytics/stats",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "typebots",
                  },
                  {
                    "var": "typebot_id",
                  },
                  {
                    "lit": "analytics",
                  },
                  {
                    "lit": "stats",
                  },
                ],
                "parts": [
                  "v1",
                  "typebots",
                  "{typebot_id}",
                  "analytics",
                  "stats",
                ],
                "rename": {
                  "param": {
                    "typebotId": "typebot_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.stats`",
                },
                "args": {
                  "params": [
                    {
                      "name": "typebot_id",
                      "orig": "typebotId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "time_filter",
                      "orig": "timeFilter",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "last7Days",
                    },
                    {
                      "name": "time_zone",
                      "orig": "timeZone",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "$action": "stat",
                  "exist": [
                    "typebot_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.typebot",
            ],
          ],
        },
      },
      "billing": {
        "fields": [],
        "name": "billing",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/billing/invoices",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "billing",
                  },
                  {
                    "lit": "invoices",
                  },
                ],
                "parts": [
                  "v1",
                  "billing",
                  "invoices",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.invoices`",
                },
                "args": {
                  "query": [
                    {
                      "name": "workspace_id",
                      "orig": "workspaceId",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "invoice",
                  "exist": [
                    "workspace_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/billing/usage",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "billing",
                  },
                  {
                    "lit": "usage",
                  },
                ],
                "parts": [
                  "v1",
                  "billing",
                  "usage",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "workspace_id",
                      "orig": "workspaceId",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "usage",
                  "exist": [
                    "workspace_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "folder": {
        "fields": [
          {
            "name": "createdAt",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "folder",
            "title": "Folder",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "folderName",
            "title": "Folder Name",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "create": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "parentFolderId",
            "title": "Parent Folder Id",
            "type": "`$ANY`",
            "req": True,
            "op": {
              "create": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "updatedAt",
            "title": "Updated At",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "workspaceId",
            "title": "Workspace Id",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "folder",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/folders",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "folders",
                  },
                ],
                "parts": [
                  "v1",
                  "folders",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.folder`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/folders",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "folders",
                  },
                ],
                "parts": [
                  "v1",
                  "folders",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.folders`",
                },
                "args": {
                  "query": [
                    {
                      "name": "parent_folder_id",
                      "orig": "parentFolderId",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "workspace_id",
                      "orig": "workspaceId",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "workspace_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/folders/{folderId}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "folders",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "v1",
                  "folders",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "folderId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.folder`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "folderId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "workspace_id",
                      "orig": "workspaceId",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "workspace_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/v1/folders/{folderId}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "folders",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "v1",
                  "folders",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "folderId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.folder`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "folderId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/v1/folders/{folderId}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "folders",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "v1",
                  "folders",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "folderId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.folder`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "folderId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "result": {
        "fields": [
          {
            "name": "answers",
            "title": "Answers",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "createdAt",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "hasStarted",
            "title": "Has Started",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "isArchived",
            "title": "Is Archived",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "isCompleted",
            "title": "Is Completed",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "lastChatSessionId",
            "title": "Last Chat Session Id",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "typebotId",
            "title": "Typebot Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "variables",
            "title": "Variables",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "result",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/typebots/{typebotId}/results/{resultId}/logs",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "typebots",
                  },
                  {
                    "var": "typebot_id",
                  },
                  {
                    "lit": "results",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "logs",
                  },
                ],
                "parts": [
                  "v1",
                  "typebots",
                  "{typebot_id}",
                  "results",
                  "{id}",
                  "logs",
                ],
                "rename": {
                  "param": {
                    "resultId": "id",
                    "typebotId": "typebot_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.logs`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "resultId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "typebot_id",
                      "orig": "typebotId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "log",
                  "exist": [
                    "id",
                    "typebot_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/typebots/{typebotId}/results",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "typebots",
                  },
                  {
                    "var": "typebot_id",
                  },
                  {
                    "lit": "results",
                  },
                ],
                "parts": [
                  "v1",
                  "typebots",
                  "{typebot_id}",
                  "results",
                ],
                "rename": {
                  "param": {
                    "typebotId": "typebot_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "args": {
                  "params": [
                    {
                      "name": "typebot_id",
                      "orig": "typebotId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "cursor",
                      "orig": "cursor",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": 50,
                    },
                    {
                      "name": "time_filter",
                      "orig": "timeFilter",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "last7Days",
                    },
                    {
                      "name": "time_zone",
                      "orig": "timeZone",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "typebot_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/typebots/{typebotId}/results/{resultId}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "typebots",
                  },
                  {
                    "var": "typebot_id",
                  },
                  {
                    "lit": "results",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "v1",
                  "typebots",
                  "{typebot_id}",
                  "results",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "resultId": "id",
                    "typebotId": "typebot_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.result`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "resultId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "typebot_id",
                      "orig": "typebotId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "typebot_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/v1/typebots/{typebotId}/results",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "typebots",
                  },
                  {
                    "var": "typebot_id",
                  },
                  {
                    "lit": "results",
                  },
                ],
                "parts": [
                  "v1",
                  "typebots",
                  "{typebot_id}",
                  "results",
                ],
                "rename": {
                  "param": {
                    "typebotId": "typebot_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "typebot_id",
                      "orig": "typebotId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "typebot_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.typebot",
            ],
          ],
        },
      },
      "typebot": {
        "fields": [
          {
            "name": "accessRight",
            "title": "Access Right",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "createdAt",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "currentUserMode",
            "title": "Current User Mode",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "customDomain",
            "title": "Custom Domain",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "edges",
            "title": "Edges",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "events",
            "title": "Events",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "folderId",
            "title": "Folder Id",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "groups",
            "title": "Groups",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "icon",
            "title": "Icon",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "isArchived",
            "title": "Is Archived",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "isClosed",
            "title": "Is Closed",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "overwrite",
            "title": "Overwrite",
            "type": "`$BOOLEAN`",
            "short": "If true, even if we detect a conflict, we will overwrite push the updates to the typebot",
          },
          {
            "name": "publicId",
            "title": "Public Id",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "publishedTypebotId",
            "title": "Published Typebot Id",
            "type": "`$STRING`",
          },
          {
            "name": "resultsTablePreferences",
            "title": "Results Table Preferences",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "riskLevel",
            "title": "Risk Level",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "selectedThemeTemplateId",
            "title": "Selected Theme Template Id",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "settings",
            "title": "Settings",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "spaceId",
            "title": "Space Id",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "theme",
            "title": "Theme",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "typebot",
            "title": "Typebot",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "updatedAt",
            "title": "Updated At",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "variables",
            "title": "Variables",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "version",
            "title": "Version",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "whatsAppCredentialsId",
            "title": "Whats App Credentials Id",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "workspaceId",
            "title": "Workspace Id",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "typebot",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/typebots/{typebotId}/publish",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "typebots",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "publish",
                  },
                ],
                "parts": [
                  "v1",
                  "typebots",
                  "{id}",
                  "publish",
                ],
                "rename": {
                  "param": {
                    "typebotId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "typebotId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "publish",
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/typebots/{typebotId}/unpublish",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "typebots",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "unpublish",
                  },
                ],
                "parts": [
                  "v1",
                  "typebots",
                  "{id}",
                  "unpublish",
                ],
                "rename": {
                  "param": {
                    "typebotId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "typebotId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "unpublish",
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/typebots",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "typebots",
                  },
                ],
                "parts": [
                  "v1",
                  "typebots",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.typebot`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/typebots/import",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "typebots",
                  },
                  {
                    "lit": "import",
                  },
                ],
                "parts": [
                  "v1",
                  "typebots",
                  "import",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.typebot`",
                },
                "args": {},
                "select": {
                  "$action": "import",
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/typebots",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "typebots",
                  },
                ],
                "parts": [
                  "v1",
                  "typebots",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.typebots`",
                },
                "args": {
                  "query": [
                    {
                      "name": "folder_id",
                      "orig": "folderId",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "workspace_id",
                      "orig": "workspaceId",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "workspace_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/typebots/{typebotId}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "typebots",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "v1",
                  "typebots",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "typebotId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.typebot`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "typebotId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "migrate_to_latest_version",
                      "orig": "migrateToLatestVersion",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/typebots/{typebotId}/publishedTypebot",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "typebots",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "publishedTypebot",
                  },
                ],
                "parts": [
                  "v1",
                  "typebots",
                  "{id}",
                  "publishedTypebot",
                ],
                "rename": {
                  "param": {
                    "typebotId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.publishedTypebot`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "typebotId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "migrate_to_latest_version",
                      "orig": "migrateToLatestVersion",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                  ],
                },
                "select": {
                  "$action": "published_typebot",
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/v1/typebots/{typebotId}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "typebots",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "v1",
                  "typebots",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "typebotId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "typebotId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/v1/typebots/{typebotId}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "typebots",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "v1",
                  "typebots",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "typebotId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.typebot`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "typebotId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "workspace": {
        "fields": [
          {
            "name": "chatsHardLimit",
            "title": "Chats Hard Limit",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "createdAt",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "currentUserMode",
            "title": "Current User Mode",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "icon",
            "title": "Icon",
            "type": "`$ANY`",
            "req": True,
            "op": {
              "create": {
                "type": "`$STRING`",
              },
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "inactiveFirstEmailSentAt",
            "title": "Inactive First Email Sent At",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "inactiveSecondEmailSentAt",
            "title": "Inactive Second Email Sent At",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "isPastDue",
            "title": "Is Past Due",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "isSuspended",
            "title": "Is Suspended",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "isVerified",
            "title": "Is Verified",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "lastActivityAt",
            "title": "Last Activity At",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "plan",
            "title": "Plan",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "settings",
            "title": "Settings",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "stripeId",
            "title": "Stripe Id",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "updatedAt",
            "title": "Updated At",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "workspace",
            "title": "Workspace",
            "type": "`$OBJECT`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "workspace",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/workspaces",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "workspaces",
                  },
                ],
                "parts": [
                  "v1",
                  "workspaces",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.workspace`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/workspaces/{workspaceId}/members",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "workspaces",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "members",
                  },
                ],
                "parts": [
                  "v1",
                  "workspaces",
                  "{id}",
                  "members",
                ],
                "rename": {
                  "param": {
                    "workspaceId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.members`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "workspaceId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "member",
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/workspaces",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "workspaces",
                  },
                ],
                "parts": [
                  "v1",
                  "workspaces",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.workspaces`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/workspaces/{workspaceId}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "workspaces",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "v1",
                  "workspaces",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "workspaceId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.workspace`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "workspaceId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/v1/workspaces/{workspaceId}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "workspaces",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "v1",
                  "workspaces",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "workspaceId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "workspaceId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/v1/workspaces/{workspaceId}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "workspaces",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "v1",
                  "workspaces",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "workspaceId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.workspace`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "workspaceId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
