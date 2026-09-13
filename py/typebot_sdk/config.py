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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
        "fields": [
          {
            "name": "totalCompleted",
            "req": True,
            "type": "`$NUMBER`",
          },
          {
            "name": "totalStarts",
            "req": True,
            "type": "`$NUMBER`",
          },
          {
            "name": "totalViews",
            "req": True,
            "type": "`$NUMBER`",
          },
        ],
        "name": "analytics",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "typebot_id",
                      "orig": "typebot_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": "last7Days",
                      "kind": "query",
                      "name": "time_filter",
                      "orig": "time_filter",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "time_zone",
                      "orig": "time_zone",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/typebots/{typebotId}/analytics/stats",
                "rename": {
                  "param": {
                    "typebotId": "typebot_id",
                  },
                },
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
                "select": {
                  "$action": "stat",
                  "exist": [
                    "time_filter",
                    "time_zone",
                    "typebot_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.stats`",
                },
                "parts": [
                  "v1",
                  "typebots",
                  "{typebot_id}",
                  "analytics",
                  "stats",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "typebot",
            ],
          ],
        },
      },
      "billing": {
        "fields": [
          {
            "name": "amount",
            "req": True,
            "type": "`$NUMBER`",
          },
          {
            "name": "currency",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "date",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "resetsAt",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "totalChatsUsed",
            "req": True,
            "type": "`$NUMBER`",
          },
          {
            "name": "url",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "billing",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "workspace_id",
                      "orig": "workspace_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "select": {
                  "$action": "invoice",
                  "exist": [
                    "workspace_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.invoices`",
                },
                "parts": [
                  "v1",
                  "billing",
                  "invoices",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "workspace_id",
                      "orig": "workspace_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "select": {
                  "$action": "usage",
                  "exist": [
                    "workspace_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "v1",
                  "billing",
                  "usage",
                ],
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
            "format": "date-time",
            "name": "createdAt",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "folder",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "folderName",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "op": {
              "create": {
                "type": "`$STRING`",
              },
            },
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "parentFolderId",
            "op": {
              "create": {
                "type": "`$STRING`",
              },
            },
            "req": True,
            "type": "`$ANY`",
          },
          {
            "format": "date-time",
            "name": "updatedAt",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "workspaceId",
            "req": True,
            "type": "`$STRING`",
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
                "args": {},
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
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.folder`",
                },
                "parts": [
                  "v1",
                  "folders",
                ],
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "parent_folder_id",
                      "orig": "parent_folder_id",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "workspace_id",
                      "orig": "workspace_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "parent_folder_id",
                    "workspace_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.folders`",
                },
                "parts": [
                  "v1",
                  "folders",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "folder_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "workspace_id",
                      "orig": "workspace_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/folders/{folderId}",
                "rename": {
                  "param": {
                    "folderId": "id",
                  },
                },
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
                "select": {
                  "exist": [
                    "id",
                    "workspace_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.folder`",
                },
                "parts": [
                  "v1",
                  "folders",
                  "{id}",
                ],
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "folder_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/v1/folders/{folderId}",
                "rename": {
                  "param": {
                    "folderId": "id",
                  },
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.folder`",
                },
                "parts": [
                  "v1",
                  "folders",
                  "{id}",
                ],
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "folder_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PATCH",
                "orig": "/v1/folders/{folderId}",
                "rename": {
                  "param": {
                    "folderId": "id",
                  },
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": {
                    "folder": "`reqdata`",
                  },
                  "res": "`body.folder`",
                },
                "parts": [
                  "v1",
                  "folders",
                  "{id}",
                ],
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
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "name": "context",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "format": "date-time",
            "name": "createdAt",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "details",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "hasStarted",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "isArchived",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "isCompleted",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "lastChatSessionId",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "resultId",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "typebotId",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "variables",
            "req": True,
            "type": "`$ARRAY`",
            "union": {
              "branches": 2,
              "count": 1,
              "depth": 3,
            },
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
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "typebot_id",
                      "orig": "typebot_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "cursor",
                      "orig": "cursor",
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": 50,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": "last7Days",
                      "kind": "query",
                      "name": "time_filter",
                      "orig": "time_filter",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "time_zone",
                      "orig": "time_zone",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/typebots/{typebotId}/results",
                "rename": {
                  "param": {
                    "typebotId": "typebot_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "cursor",
                    "limit",
                    "time_filter",
                    "time_zone",
                    "typebot_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "v1",
                  "typebots",
                  "{typebot_id}",
                  "results",
                ],
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "result_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "typebot_id",
                      "orig": "typebot_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/typebots/{typebotId}/results/{resultId}/logs",
                "rename": {
                  "param": {
                    "resultId": "id",
                    "typebotId": "typebot_id",
                  },
                },
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
                "select": {
                  "$action": "log",
                  "exist": [
                    "id",
                    "typebot_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.logs`",
                },
                "parts": [
                  "v1",
                  "typebots",
                  "{typebot_id}",
                  "results",
                  "{id}",
                  "logs",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "result_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "typebot_id",
                      "orig": "typebot_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/typebots/{typebotId}/results/{resultId}",
                "rename": {
                  "param": {
                    "resultId": "id",
                    "typebotId": "typebot_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "id",
                    "typebot_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.result`",
                },
                "parts": [
                  "v1",
                  "typebots",
                  "{typebot_id}",
                  "results",
                  "{id}",
                ],
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "typebot_id",
                      "orig": "typebot_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/v1/typebots/{typebotId}/results",
                "rename": {
                  "param": {
                    "typebotId": "typebot_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "typebot_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "v1",
                  "typebots",
                  "{typebot_id}",
                  "results",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "typebot",
            ],
          ],
        },
      },
      "typebot": {
        "fields": [
          {
            "name": "accessRight",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "createdAt",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "customDomain",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "edges",
            "req": True,
            "type": "`$ARRAY`",
            "union": {
              "branches": 2,
              "count": 1,
              "depth": 3,
            },
          },
          {
            "name": "enableSafetyFlags",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "events",
            "req": True,
            "type": "`$ARRAY`",
            "union": {
              "branches": 3,
              "count": 1,
              "depth": 1,
            },
          },
          {
            "name": "folderId",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "fromTemplate",
            "type": "`$STRING`",
          },
          {
            "name": "groups",
            "req": True,
            "type": "`$ARRAY`",
            "union": {
              "branches": 19,
              "count": 31,
              "depth": 14,
            },
          },
          {
            "name": "icon",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "isArchived",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "isClosed",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "message",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "overwrite",
            "short": "If true, even if we detect a conflict, we will overwrite push the updates to the typebot",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "publicId",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "publishedTypebot",
            "req": True,
            "type": "`$ANY`",
            "union": {
              "branches": 19,
              "count": 51,
              "depth": 20,
            },
          },
          {
            "name": "publishedTypebotId",
            "type": "`$STRING`",
          },
          {
            "name": "resultsTablePreferences",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "riskLevel",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "selectedThemeTemplateId",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "settings",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "spaceId",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "theme",
            "req": True,
            "type": "`$OBJECT`",
            "union": {
              "branches": 2,
              "count": 2,
              "depth": 6,
            },
          },
          {
            "name": "typebot",
            "req": True,
            "type": "`$OBJECT`",
            "union": {
              "branches": 19,
              "count": 88,
              "depth": 24,
            },
          },
          {
            "format": "date-time",
            "name": "updatedAt",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "variables",
            "req": True,
            "type": "`$ARRAY`",
            "union": {
              "branches": 2,
              "count": 1,
              "depth": 5,
            },
          },
          {
            "name": "version",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
              "update": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Provides the version the published bot was migrated from if `migrateToLatestVersion` is set to `true`.",
            "type": "`$ANY`",
            "union": {
              "branches": 2,
              "count": 1,
              "depth": 0,
            },
          },
          {
            "name": "warnings",
            "type": "`$ARRAY`",
          },
          {
            "name": "whatsAppCredentialsId",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "workspaceId",
            "req": True,
            "short": "[Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid)",
            "type": "`$STRING`",
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
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "typebot_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/v1/typebots/{typebotId}/publish",
                "rename": {
                  "param": {
                    "typebotId": "id",
                  },
                },
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
                "select": {
                  "$action": "publish",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "v1",
                  "typebots",
                  "{id}",
                  "publish",
                ],
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "typebot_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/v1/typebots/{typebotId}/unpublish",
                "rename": {
                  "param": {
                    "typebotId": "id",
                  },
                },
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
                "select": {
                  "$action": "unpublish",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "v1",
                  "typebots",
                  "{id}",
                  "unpublish",
                ],
              },
              {
                "args": {},
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
                "select": {},
                "transform": {
                  "req": {
                    "typebot": "`reqdata`",
                  },
                  "res": "`body.typebot`",
                },
                "parts": [
                  "v1",
                  "typebots",
                ],
              },
              {
                "args": {},
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
                "select": {
                  "$action": "import",
                },
                "transform": {
                  "req": {
                    "typebot": "`reqdata`",
                  },
                  "res": "`body.typebot`",
                },
                "parts": [
                  "v1",
                  "typebots",
                  "import",
                ],
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "folder_id",
                      "orig": "folder_id",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "workspace_id",
                      "orig": "workspace_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "folder_id",
                    "workspace_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.typebots`",
                },
                "parts": [
                  "v1",
                  "typebots",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "typebot_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": False,
                      "kind": "query",
                      "name": "migrate_to_latest_version",
                      "orig": "migrate_to_latest_version",
                      "type": "`$BOOLEAN`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/typebots/{typebotId}",
                "rename": {
                  "param": {
                    "typebotId": "id",
                  },
                },
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
                "select": {
                  "exist": [
                    "id",
                    "migrate_to_latest_version",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.typebot`",
                },
                "parts": [
                  "v1",
                  "typebots",
                  "{id}",
                ],
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "typebot_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": False,
                      "kind": "query",
                      "name": "migrate_to_latest_version",
                      "orig": "migrate_to_latest_version",
                      "type": "`$BOOLEAN`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/typebots/{typebotId}/publishedTypebot",
                "rename": {
                  "param": {
                    "typebotId": "id",
                  },
                },
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
                "select": {
                  "$action": "published_typebot",
                  "exist": [
                    "id",
                    "migrate_to_latest_version",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "v1",
                  "typebots",
                  "{id}",
                  "publishedTypebot",
                ],
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "typebot_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/v1/typebots/{typebotId}",
                "rename": {
                  "param": {
                    "typebotId": "id",
                  },
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "v1",
                  "typebots",
                  "{id}",
                ],
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "typebot_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PATCH",
                "orig": "/v1/typebots/{typebotId}",
                "rename": {
                  "param": {
                    "typebotId": "id",
                  },
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": {
                    "typebot": "`reqdata`",
                  },
                  "res": "`body.typebot`",
                },
                "parts": [
                  "v1",
                  "typebots",
                  "{id}",
                ],
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
            "req": True,
            "type": "`$ANY`",
          },
          {
            "format": "date-time",
            "name": "createdAt",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "customChatsLimit",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "customSeatsLimit",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "icon",
            "op": {
              "create": {
                "type": "`$STRING`",
              },
              "update": {
                "type": "`$STRING`",
              },
            },
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "inactiveFirstEmailSentAt",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "inactiveSecondEmailSentAt",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "isPastDue",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "isSuspended",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "isVerified",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "lastActivityAt",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "name",
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "plan",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "role",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "settings",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "stripeId",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "format": "date-time",
            "name": "updatedAt",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "user",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "userId",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "workspaceId",
            "req": True,
            "type": "`$STRING`",
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
                "args": {},
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
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.workspace`",
                },
                "parts": [
                  "v1",
                  "workspaces",
                ],
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "workspace_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/workspaces/{workspaceId}/members",
                "rename": {
                  "param": {
                    "workspaceId": "id",
                  },
                },
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
                "select": {
                  "$action": "member",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.members`",
                },
                "parts": [
                  "v1",
                  "workspaces",
                  "{id}",
                  "members",
                ],
              },
              {
                "args": {},
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
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.workspaces`",
                },
                "parts": [
                  "v1",
                  "workspaces",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "workspace_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/workspaces/{workspaceId}",
                "rename": {
                  "param": {
                    "workspaceId": "id",
                  },
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.workspace`",
                },
                "parts": [
                  "v1",
                  "workspaces",
                  "{id}",
                ],
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "workspace_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/v1/workspaces/{workspaceId}",
                "rename": {
                  "param": {
                    "workspaceId": "id",
                  },
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "v1",
                  "workspaces",
                  "{id}",
                ],
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "workspace_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PATCH",
                "orig": "/v1/workspaces/{workspaceId}",
                "rename": {
                  "param": {
                    "workspaceId": "id",
                  },
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.workspace`",
                },
                "parts": [
                  "v1",
                  "workspaces",
                  "{id}",
                ],
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
