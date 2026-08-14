# Typebot SDK configuration


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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "active": True,
            "name": "totalCompleted",
            "req": True,
            "type": "`$NUMBER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "totalStarts",
            "req": True,
            "type": "`$NUMBER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "totalViews",
            "req": True,
            "type": "`$NUMBER`",
            "index$": 2,
          },
        ],
        "name": "analytics",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "typebot_id",
                      "orig": "typebot_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "example": "last7Days",
                      "kind": "query",
                      "name": "time_filter",
                      "orig": "time_filter",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "time_zone",
                      "orig": "time_zone",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/typebots/{typebotId}/analytics/stats",
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
                "index$": 0,
              },
            ],
            "key$": "load",
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
            "active": True,
            "name": "amount",
            "req": True,
            "type": "`$NUMBER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "currency",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "date",
            "req": True,
            "type": "`$ANY`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "id",
            "req": True,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "resetsAt",
            "req": True,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "totalChatsUsed",
            "req": True,
            "type": "`$NUMBER`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "url",
            "req": True,
            "type": "`$STRING`",
            "index$": 6,
          },
        ],
        "name": "billing",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
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
                "parts": [
                  "v1",
                  "billing",
                  "invoices",
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
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
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
                "parts": [
                  "v1",
                  "billing",
                  "usage",
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
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "folder": {
        "fields": [
          {
            "active": True,
            "name": "createdAt",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "folder",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "folderName",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "id",
            "op": {
              "create": {
                "req": False,
                "type": "`$STRING`",
              },
            },
            "req": True,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "name",
            "req": True,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "parentFolderId",
            "op": {
              "create": {
                "req": False,
                "type": "`$STRING`",
              },
            },
            "req": True,
            "type": "`$ANY`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "updatedAt",
            "req": True,
            "type": "`$STRING`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "workspaceId",
            "req": True,
            "type": "`$STRING`",
            "index$": 7,
          },
        ],
        "name": "folder",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/v1/folders",
                "parts": [
                  "v1",
                  "folders",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.folder`",
                },
                "index$": 0,
              },
            ],
            "key$": "create",
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "parent_folder_id",
                      "orig": "parent_folder_id",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
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
                "parts": [
                  "v1",
                  "folders",
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
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "folder_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
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
                "index$": 0,
              },
            ],
            "key$": "load",
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "folder_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/v1/folders/{folderId}",
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.folder`",
                },
                "index$": 0,
              },
            ],
            "key$": "remove",
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "folder_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "PATCH",
                "orig": "/v1/folders/{folderId}",
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
                "index$": 0,
              },
            ],
            "key$": "update",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "result": {
        "fields": [
          {
            "active": True,
            "name": "answers",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "context",
            "req": True,
            "type": "`$ANY`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "createdAt",
            "req": True,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "description",
            "req": True,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "details",
            "req": True,
            "type": "`$ANY`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "hasStarted",
            "req": True,
            "type": "`$ANY`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "id",
            "req": True,
            "type": "`$STRING`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "isArchived",
            "req": True,
            "type": "`$ANY`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "isCompleted",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "lastChatSessionId",
            "req": True,
            "type": "`$ANY`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "resultId",
            "req": True,
            "type": "`$STRING`",
            "index$": 10,
          },
          {
            "active": True,
            "name": "status",
            "req": True,
            "type": "`$STRING`",
            "index$": 11,
          },
          {
            "active": True,
            "name": "typebotId",
            "req": True,
            "type": "`$STRING`",
            "index$": 12,
          },
          {
            "active": True,
            "name": "variables",
            "req": True,
            "type": "`$ARRAY`",
            "union": {
              "branches": 2,
              "count": 1,
              "depth": 3,
            },
            "index$": 13,
          },
        ],
        "name": "result",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "typebot_id",
                      "orig": "typebot_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "cursor",
                      "orig": "cursor",
                      "reqd": False,
                      "type": "`$NUMBER`",
                    },
                    {
                      "active": True,
                      "example": 50,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "reqd": False,
                      "type": "`$NUMBER`",
                    },
                    {
                      "active": True,
                      "example": "last7Days",
                      "kind": "query",
                      "name": "time_filter",
                      "orig": "time_filter",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "time_zone",
                      "orig": "time_zone",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/typebots/{typebotId}/results",
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
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "result_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
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
                "index$": 1,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "result_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                    {
                      "active": True,
                      "kind": "param",
                      "name": "typebot_id",
                      "orig": "typebot_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 1,
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/typebots/{typebotId}/results/{resultId}",
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
                "index$": 0,
              },
            ],
            "key$": "load",
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "typebot_id",
                      "orig": "typebot_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/v1/typebots/{typebotId}/results",
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
                "select": {
                  "exist": [
                    "typebot_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "remove",
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
            "active": True,
            "name": "accessRight",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "createdAt",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "customDomain",
            "req": True,
            "type": "`$ANY`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "edges",
            "req": True,
            "type": "`$ARRAY`",
            "union": {
              "branches": 2,
              "count": 1,
              "depth": 3,
            },
            "index$": 3,
          },
          {
            "active": True,
            "name": "enableSafetyFlags",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "events",
            "req": True,
            "type": "`$ARRAY`",
            "union": {
              "branches": 3,
              "count": 1,
              "depth": 1,
            },
            "index$": 5,
          },
          {
            "active": True,
            "name": "folderId",
            "req": True,
            "type": "`$ANY`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "fromTemplate",
            "req": False,
            "type": "`$STRING`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "groups",
            "req": True,
            "type": "`$ARRAY`",
            "union": {
              "branches": 19,
              "count": 31,
              "depth": 14,
            },
            "index$": 8,
          },
          {
            "active": True,
            "name": "icon",
            "req": True,
            "type": "`$ANY`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "id",
            "req": True,
            "type": "`$STRING`",
            "index$": 10,
          },
          {
            "active": True,
            "name": "isArchived",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 11,
          },
          {
            "active": True,
            "name": "isClosed",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 12,
          },
          {
            "active": True,
            "name": "message",
            "req": True,
            "type": "`$ANY`",
            "index$": 13,
          },
          {
            "active": True,
            "name": "name",
            "req": True,
            "type": "`$STRING`",
            "index$": 14,
          },
          {
            "active": True,
            "name": "overwrite",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 15,
          },
          {
            "active": True,
            "name": "publicId",
            "req": True,
            "type": "`$ANY`",
            "index$": 16,
          },
          {
            "active": True,
            "name": "publishedTypebot",
            "req": True,
            "type": "`$ANY`",
            "union": {
              "branches": 19,
              "count": 51,
              "depth": 20,
            },
            "index$": 17,
          },
          {
            "active": True,
            "name": "publishedTypebotId",
            "req": False,
            "type": "`$STRING`",
            "index$": 18,
          },
          {
            "active": True,
            "name": "resultsTablePreferences",
            "req": True,
            "type": "`$ANY`",
            "index$": 19,
          },
          {
            "active": True,
            "name": "riskLevel",
            "req": True,
            "type": "`$ANY`",
            "index$": 20,
          },
          {
            "active": True,
            "name": "selectedThemeTemplateId",
            "req": True,
            "type": "`$ANY`",
            "index$": 21,
          },
          {
            "active": True,
            "name": "settings",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 22,
          },
          {
            "active": True,
            "name": "spaceId",
            "req": True,
            "type": "`$ANY`",
            "index$": 23,
          },
          {
            "active": True,
            "name": "theme",
            "req": True,
            "type": "`$OBJECT`",
            "union": {
              "branches": 2,
              "count": 2,
              "depth": 6,
            },
            "index$": 24,
          },
          {
            "active": True,
            "name": "typebot",
            "req": True,
            "type": "`$OBJECT`",
            "union": {
              "branches": 19,
              "count": 88,
              "depth": 24,
            },
            "index$": 25,
          },
          {
            "active": True,
            "name": "updatedAt",
            "req": True,
            "type": "`$STRING`",
            "index$": 26,
          },
          {
            "active": True,
            "name": "variables",
            "req": True,
            "type": "`$ARRAY`",
            "union": {
              "branches": 2,
              "count": 1,
              "depth": 5,
            },
            "index$": 27,
          },
          {
            "active": True,
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
            "req": False,
            "type": "`$ANY`",
            "union": {
              "branches": 2,
              "count": 1,
              "depth": 0,
            },
            "index$": 28,
          },
          {
            "active": True,
            "name": "warnings",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 29,
          },
          {
            "active": True,
            "name": "whatsAppCredentialsId",
            "req": True,
            "type": "`$ANY`",
            "index$": 30,
          },
          {
            "active": True,
            "name": "workspaceId",
            "req": True,
            "type": "`$STRING`",
            "index$": 31,
          },
        ],
        "name": "typebot",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "typebot_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/v1/typebots/{typebotId}/publish",
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
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "typebot_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/v1/typebots/{typebotId}/unpublish",
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
                "index$": 1,
              },
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/v1/typebots",
                "parts": [
                  "v1",
                  "typebots",
                ],
                "select": {},
                "transform": {
                  "req": {
                    "typebot": "`reqdata`",
                  },
                  "res": "`body.typebot`",
                },
                "index$": 2,
              },
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/v1/typebots/import",
                "parts": [
                  "v1",
                  "typebots",
                  "import",
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
                "index$": 3,
              },
            ],
            "key$": "create",
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "folder_id",
                      "orig": "folder_id",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
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
                "parts": [
                  "v1",
                  "typebots",
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
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "typebot_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "example": False,
                      "kind": "query",
                      "name": "migrate_to_latest_version",
                      "orig": "migrate_to_latest_version",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/typebots/{typebotId}",
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
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "typebot_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "example": False,
                      "kind": "query",
                      "name": "migrate_to_latest_version",
                      "orig": "migrate_to_latest_version",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/typebots/{typebotId}/publishedTypebot",
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
                "index$": 1,
              },
            ],
            "key$": "load",
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "typebot_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/v1/typebots/{typebotId}",
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "remove",
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "typebot_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "PATCH",
                "orig": "/v1/typebots/{typebotId}",
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
                "index$": 0,
              },
            ],
            "key$": "update",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "workspace": {
        "fields": [
          {
            "active": True,
            "name": "chatsHardLimit",
            "req": True,
            "type": "`$ANY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "createdAt",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "customChatsLimit",
            "req": True,
            "type": "`$ANY`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "customSeatsLimit",
            "req": True,
            "type": "`$ANY`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "icon",
            "op": {
              "create": {
                "req": False,
                "type": "`$STRING`",
              },
              "update": {
                "req": False,
                "type": "`$STRING`",
              },
            },
            "req": True,
            "type": "`$ANY`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "id",
            "req": True,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "inactiveFirstEmailSentAt",
            "req": True,
            "type": "`$ANY`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "inactiveSecondEmailSentAt",
            "req": True,
            "type": "`$ANY`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "isPastDue",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "isSuspended",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "isVerified",
            "req": True,
            "type": "`$ANY`",
            "index$": 10,
          },
          {
            "active": True,
            "name": "lastActivityAt",
            "req": True,
            "type": "`$ANY`",
            "index$": 11,
          },
          {
            "active": True,
            "name": "name",
            "op": {
              "update": {
                "req": False,
                "type": "`$STRING`",
              },
            },
            "req": True,
            "type": "`$STRING`",
            "index$": 12,
          },
          {
            "active": True,
            "name": "plan",
            "req": True,
            "type": "`$STRING`",
            "index$": 13,
          },
          {
            "active": True,
            "name": "role",
            "req": True,
            "type": "`$STRING`",
            "index$": 14,
          },
          {
            "active": True,
            "name": "settings",
            "req": True,
            "type": "`$ANY`",
            "index$": 15,
          },
          {
            "active": True,
            "name": "stripeId",
            "req": True,
            "type": "`$ANY`",
            "index$": 16,
          },
          {
            "active": True,
            "name": "updatedAt",
            "req": True,
            "type": "`$STRING`",
            "index$": 17,
          },
          {
            "active": True,
            "name": "user",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 18,
          },
          {
            "active": True,
            "name": "userId",
            "req": True,
            "type": "`$STRING`",
            "index$": 19,
          },
          {
            "active": True,
            "name": "workspaceId",
            "req": True,
            "type": "`$STRING`",
            "index$": 20,
          },
        ],
        "name": "workspace",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/v1/workspaces",
                "parts": [
                  "v1",
                  "workspaces",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.workspace`",
                },
                "index$": 0,
              },
            ],
            "key$": "create",
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
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
                "index$": 0,
              },
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/v1/workspaces",
                "parts": [
                  "v1",
                  "workspaces",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.workspaces`",
                },
                "index$": 1,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "workspace_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/workspaces/{workspaceId}",
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.workspace`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "workspace_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/v1/workspaces/{workspaceId}",
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "remove",
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "workspace_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "PATCH",
                "orig": "/v1/workspaces/{workspaceId}",
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.workspace`",
                },
                "index$": 0,
              },
            ],
            "key$": "update",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
