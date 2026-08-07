# Typebot SDK configuration


def make_config():
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
            "name": "total_completed",
            "req": True,
            "type": "`$NUMBER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "total_start",
            "req": True,
            "type": "`$NUMBER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "total_view",
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
            "name": "resets_at",
            "req": True,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "total_chats_used",
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
            "name": "created_at",
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
            "name": "folder_name",
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
            "name": "parent_folder_id",
            "op": {
              "create": {
                "req": False,
                "type": "`$STRING`",
              },
            },
            "req": True,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "updated_at",
            "req": True,
            "type": "`$STRING`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "workspace_id",
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
            "name": "answer",
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
            "name": "created_at",
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
            "name": "detail",
            "req": True,
            "type": "`$ANY`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "has_started",
            "req": True,
            "type": "`$BOOLEAN`",
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
            "name": "is_archived",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "is_completed",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "last_chat_session_id",
            "req": True,
            "type": "`$STRING`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "result_id",
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
            "name": "typebot_id",
            "req": True,
            "type": "`$STRING`",
            "index$": 12,
          },
          {
            "active": True,
            "name": "variable",
            "req": True,
            "type": "`$ARRAY`",
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
            "name": "access_right",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "created_at",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "current_user_mode",
            "req": True,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "custom_domain",
            "req": True,
            "type": "`$ANY`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "edge",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "enable_safety_flag",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "event",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "folder_id",
            "req": True,
            "type": "`$STRING`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "from_template",
            "req": False,
            "type": "`$STRING`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "group",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "icon",
            "req": True,
            "type": "`$ANY`",
            "index$": 10,
          },
          {
            "active": True,
            "name": "id",
            "req": True,
            "type": "`$STRING`",
            "index$": 11,
          },
          {
            "active": True,
            "name": "is_archived",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 12,
          },
          {
            "active": True,
            "name": "is_closed",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 13,
          },
          {
            "active": True,
            "name": "message",
            "req": True,
            "type": "`$ANY`",
            "index$": 14,
          },
          {
            "active": True,
            "name": "name",
            "req": True,
            "type": "`$STRING`",
            "index$": 15,
          },
          {
            "active": True,
            "name": "overwrite",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 16,
          },
          {
            "active": True,
            "name": "public_id",
            "req": True,
            "type": "`$STRING`",
            "index$": 17,
          },
          {
            "active": True,
            "name": "published_typebot",
            "req": True,
            "type": "`$ANY`",
            "index$": 18,
          },
          {
            "active": True,
            "name": "published_typebot_id",
            "req": False,
            "type": "`$STRING`",
            "index$": 19,
          },
          {
            "active": True,
            "name": "results_table_preference",
            "req": True,
            "type": "`$ANY`",
            "index$": 20,
          },
          {
            "active": True,
            "name": "risk_level",
            "req": True,
            "type": "`$ANY`",
            "index$": 21,
          },
          {
            "active": True,
            "name": "selected_theme_template_id",
            "req": True,
            "type": "`$STRING`",
            "index$": 22,
          },
          {
            "active": True,
            "name": "setting",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 23,
          },
          {
            "active": True,
            "name": "space_id",
            "req": True,
            "type": "`$STRING`",
            "index$": 24,
          },
          {
            "active": True,
            "name": "theme",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 25,
          },
          {
            "active": True,
            "name": "typebot",
            "req": True,
            "type": "`$ANY`",
            "index$": 26,
          },
          {
            "active": True,
            "name": "updated_at",
            "req": True,
            "type": "`$STRING`",
            "index$": 27,
          },
          {
            "active": True,
            "name": "variable",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 28,
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
            "index$": 29,
          },
          {
            "active": True,
            "name": "warning",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 30,
          },
          {
            "active": True,
            "name": "whats_app_credentials_id",
            "req": True,
            "type": "`$STRING`",
            "index$": 31,
          },
          {
            "active": True,
            "name": "workspace_id",
            "req": True,
            "type": "`$STRING`",
            "index$": 32,
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
            "name": "chats_hard_limit",
            "req": True,
            "type": "`$ANY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "created_at",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "current_user_mode",
            "req": True,
            "type": "`$STRING`",
            "index$": 2,
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
            "index$": 3,
          },
          {
            "active": True,
            "name": "id",
            "req": True,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "inactive_first_email_sent_at",
            "req": True,
            "type": "`$ANY`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "inactive_second_email_sent_at",
            "req": True,
            "type": "`$ANY`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "is_past_due",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "is_suspended",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "is_verified",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "last_activity_at",
            "req": True,
            "type": "`$ANY`",
            "index$": 10,
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
            "index$": 11,
          },
          {
            "active": True,
            "name": "plan",
            "req": True,
            "type": "`$STRING`",
            "index$": 12,
          },
          {
            "active": True,
            "name": "role",
            "req": True,
            "type": "`$STRING`",
            "index$": 13,
          },
          {
            "active": True,
            "name": "setting",
            "req": True,
            "type": "`$ANY`",
            "index$": 14,
          },
          {
            "active": True,
            "name": "stripe_id",
            "req": True,
            "type": "`$STRING`",
            "index$": 15,
          },
          {
            "active": True,
            "name": "updated_at",
            "req": True,
            "type": "`$STRING`",
            "index$": 16,
          },
          {
            "active": True,
            "name": "user",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 17,
          },
          {
            "active": True,
            "name": "user_id",
            "req": True,
            "type": "`$STRING`",
            "index$": 18,
          },
          {
            "active": True,
            "name": "workspace",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 19,
          },
          {
            "active": True,
            "name": "workspace_id",
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
