-- Typebot SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Typebot",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://app.typebot.com/api",
      auth = {
        prefix = "Bearer",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["analytics"] = {},
        ["billing"] = {},
        ["folder"] = {},
        ["result"] = {},
        ["typebot"] = {},
        ["workspace"] = {},
      },
    },
    entity = {
      ["analytics"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "totalCompleted",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "totalStarts",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "totalViews",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
            ["index$"] = 2,
          },
        },
        ["name"] = "analytics",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "typebot_id",
                      ["orig"] = "typebot_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
                    },
                  },
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["example"] = "last7Days",
                      ["kind"] = "query",
                      ["name"] = "time_filter",
                      ["orig"] = "time_filter",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "time_zone",
                      ["orig"] = "time_zone",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/typebots/{typebotId}/analytics/stats",
                ["parts"] = {
                  "v1",
                  "typebots",
                  "{typebot_id}",
                  "analytics",
                  "stats",
                },
                ["rename"] = {
                  ["param"] = {
                    ["typebotId"] = "typebot_id",
                  },
                },
                ["select"] = {
                  ["$action"] = "stat",
                  ["exist"] = {
                    "time_filter",
                    "time_zone",
                    "typebot_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.stats`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "typebot",
            },
          },
        },
      },
      ["billing"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "amount",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "currency",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "date",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "id",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "resetsAt",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "totalChatsUsed",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "url",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 6,
          },
        },
        ["name"] = "billing",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "workspace_id",
                      ["orig"] = "workspace_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/billing/invoices",
                ["parts"] = {
                  "v1",
                  "billing",
                  "invoices",
                },
                ["select"] = {
                  ["$action"] = "invoice",
                  ["exist"] = {
                    "workspace_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.invoices`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "list",
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "workspace_id",
                      ["orig"] = "workspace_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/billing/usage",
                ["parts"] = {
                  "v1",
                  "billing",
                  "usage",
                },
                ["select"] = {
                  ["$action"] = "usage",
                  ["exist"] = {
                    "workspace_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["folder"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "createdAt",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "folder",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "folderName",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "id",
            ["op"] = {
              ["create"] = {
                ["req"] = false,
                ["type"] = "`$STRING`",
              },
            },
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "name",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "parentFolderId",
            ["op"] = {
              ["create"] = {
                ["req"] = false,
                ["type"] = "`$STRING`",
              },
            },
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "updatedAt",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 6,
          },
          {
            ["active"] = true,
            ["name"] = "workspaceId",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 7,
          },
        },
        ["name"] = "folder",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/v1/folders",
                ["parts"] = {
                  "v1",
                  "folders",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.folder`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "create",
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "parent_folder_id",
                      ["orig"] = "parent_folder_id",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "workspace_id",
                      ["orig"] = "workspace_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/folders",
                ["parts"] = {
                  "v1",
                  "folders",
                },
                ["select"] = {
                  ["exist"] = {
                    "parent_folder_id",
                    "workspace_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.folders`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "list",
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "folder_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
                    },
                  },
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "workspace_id",
                      ["orig"] = "workspace_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/folders/{folderId}",
                ["parts"] = {
                  "v1",
                  "folders",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["folderId"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "workspace_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.folder`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "folder_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/v1/folders/{folderId}",
                ["parts"] = {
                  "v1",
                  "folders",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["folderId"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.folder`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "remove",
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "folder_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/v1/folders/{folderId}",
                ["parts"] = {
                  "v1",
                  "folders",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["folderId"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = {
                    ["folder"] = "`reqdata`",
                  },
                  ["res"] = "`body.folder`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "update",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["result"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "answers",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "context",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "createdAt",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "description",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "details",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "hasStarted",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "id",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 6,
          },
          {
            ["active"] = true,
            ["name"] = "isArchived",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 7,
          },
          {
            ["active"] = true,
            ["name"] = "isCompleted",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 8,
          },
          {
            ["active"] = true,
            ["name"] = "lastChatSessionId",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 9,
          },
          {
            ["active"] = true,
            ["name"] = "resultId",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 10,
          },
          {
            ["active"] = true,
            ["name"] = "status",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 11,
          },
          {
            ["active"] = true,
            ["name"] = "typebotId",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 12,
          },
          {
            ["active"] = true,
            ["name"] = "variables",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
            ["union"] = {
              ["branches"] = 2,
              ["count"] = 1,
              ["depth"] = 3,
            },
            ["index$"] = 13,
          },
        },
        ["name"] = "result",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "typebot_id",
                      ["orig"] = "typebot_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
                    },
                  },
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "cursor",
                      ["orig"] = "cursor",
                      ["reqd"] = false,
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = 50,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["reqd"] = false,
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = "last7Days",
                      ["kind"] = "query",
                      ["name"] = "time_filter",
                      ["orig"] = "time_filter",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "time_zone",
                      ["orig"] = "time_zone",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/typebots/{typebotId}/results",
                ["parts"] = {
                  "v1",
                  "typebots",
                  "{typebot_id}",
                  "results",
                },
                ["rename"] = {
                  ["param"] = {
                    ["typebotId"] = "typebot_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "cursor",
                    "limit",
                    "time_filter",
                    "time_zone",
                    "typebot_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "result_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "typebot_id",
                      ["orig"] = "typebot_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/typebots/{typebotId}/results/{resultId}/logs",
                ["parts"] = {
                  "v1",
                  "typebots",
                  "{typebot_id}",
                  "results",
                  "{id}",
                  "logs",
                },
                ["rename"] = {
                  ["param"] = {
                    ["resultId"] = "id",
                    ["typebotId"] = "typebot_id",
                  },
                },
                ["select"] = {
                  ["$action"] = "log",
                  ["exist"] = {
                    "id",
                    "typebot_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.logs`",
                },
                ["index$"] = 1,
              },
            },
            ["key$"] = "list",
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "result_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "typebot_id",
                      ["orig"] = "typebot_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 1,
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/typebots/{typebotId}/results/{resultId}",
                ["parts"] = {
                  "v1",
                  "typebots",
                  "{typebot_id}",
                  "results",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["resultId"] = "id",
                    ["typebotId"] = "typebot_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "typebot_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.result`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "typebot_id",
                      ["orig"] = "typebot_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/v1/typebots/{typebotId}/results",
                ["parts"] = {
                  "v1",
                  "typebots",
                  "{typebot_id}",
                  "results",
                },
                ["rename"] = {
                  ["param"] = {
                    ["typebotId"] = "typebot_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "typebot_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "remove",
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "typebot",
            },
          },
        },
      },
      ["typebot"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "accessRight",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "createdAt",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "customDomain",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "edges",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
            ["union"] = {
              ["branches"] = 2,
              ["count"] = 1,
              ["depth"] = 3,
            },
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "enableSafetyFlags",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "events",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
            ["union"] = {
              ["branches"] = 3,
              ["count"] = 1,
              ["depth"] = 1,
            },
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "folderId",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 6,
          },
          {
            ["active"] = true,
            ["name"] = "fromTemplate",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 7,
          },
          {
            ["active"] = true,
            ["name"] = "groups",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
            ["union"] = {
              ["branches"] = 19,
              ["count"] = 31,
              ["depth"] = 14,
            },
            ["index$"] = 8,
          },
          {
            ["active"] = true,
            ["name"] = "icon",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 9,
          },
          {
            ["active"] = true,
            ["name"] = "id",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 10,
          },
          {
            ["active"] = true,
            ["name"] = "isArchived",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 11,
          },
          {
            ["active"] = true,
            ["name"] = "isClosed",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 12,
          },
          {
            ["active"] = true,
            ["name"] = "message",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 13,
          },
          {
            ["active"] = true,
            ["name"] = "name",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 14,
          },
          {
            ["active"] = true,
            ["name"] = "overwrite",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 15,
          },
          {
            ["active"] = true,
            ["name"] = "publicId",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 16,
          },
          {
            ["active"] = true,
            ["name"] = "publishedTypebot",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["union"] = {
              ["branches"] = 19,
              ["count"] = 51,
              ["depth"] = 20,
            },
            ["index$"] = 17,
          },
          {
            ["active"] = true,
            ["name"] = "publishedTypebotId",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 18,
          },
          {
            ["active"] = true,
            ["name"] = "resultsTablePreferences",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 19,
          },
          {
            ["active"] = true,
            ["name"] = "riskLevel",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 20,
          },
          {
            ["active"] = true,
            ["name"] = "selectedThemeTemplateId",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 21,
          },
          {
            ["active"] = true,
            ["name"] = "settings",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
            ["index$"] = 22,
          },
          {
            ["active"] = true,
            ["name"] = "spaceId",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 23,
          },
          {
            ["active"] = true,
            ["name"] = "theme",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
            ["union"] = {
              ["branches"] = 2,
              ["count"] = 2,
              ["depth"] = 6,
            },
            ["index$"] = 24,
          },
          {
            ["active"] = true,
            ["name"] = "typebot",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
            ["union"] = {
              ["branches"] = 19,
              ["count"] = 88,
              ["depth"] = 24,
            },
            ["index$"] = 25,
          },
          {
            ["active"] = true,
            ["name"] = "updatedAt",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 26,
          },
          {
            ["active"] = true,
            ["name"] = "variables",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
            ["union"] = {
              ["branches"] = 2,
              ["count"] = 1,
              ["depth"] = 5,
            },
            ["index$"] = 27,
          },
          {
            ["active"] = true,
            ["name"] = "version",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
              ["update"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["req"] = false,
            ["type"] = "`$ANY`",
            ["union"] = {
              ["branches"] = 2,
              ["count"] = 1,
              ["depth"] = 0,
            },
            ["index$"] = 28,
          },
          {
            ["active"] = true,
            ["name"] = "warnings",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 29,
          },
          {
            ["active"] = true,
            ["name"] = "whatsAppCredentialsId",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 30,
          },
          {
            ["active"] = true,
            ["name"] = "workspaceId",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 31,
          },
        },
        ["name"] = "typebot",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "typebot_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/v1/typebots/{typebotId}/publish",
                ["parts"] = {
                  "v1",
                  "typebots",
                  "{id}",
                  "publish",
                },
                ["rename"] = {
                  ["param"] = {
                    ["typebotId"] = "id",
                  },
                },
                ["select"] = {
                  ["$action"] = "publish",
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "typebot_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/v1/typebots/{typebotId}/unpublish",
                ["parts"] = {
                  "v1",
                  "typebots",
                  "{id}",
                  "unpublish",
                },
                ["rename"] = {
                  ["param"] = {
                    ["typebotId"] = "id",
                  },
                },
                ["select"] = {
                  ["$action"] = "unpublish",
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 1,
              },
              {
                ["active"] = true,
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/v1/typebots",
                ["parts"] = {
                  "v1",
                  "typebots",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = {
                    ["typebot"] = "`reqdata`",
                  },
                  ["res"] = "`body.typebot`",
                },
                ["index$"] = 2,
              },
              {
                ["active"] = true,
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/v1/typebots/import",
                ["parts"] = {
                  "v1",
                  "typebots",
                  "import",
                },
                ["select"] = {
                  ["$action"] = "import",
                },
                ["transform"] = {
                  ["req"] = {
                    ["typebot"] = "`reqdata`",
                  },
                  ["res"] = "`body.typebot`",
                },
                ["index$"] = 3,
              },
            },
            ["key$"] = "create",
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "folder_id",
                      ["orig"] = "folder_id",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "workspace_id",
                      ["orig"] = "workspace_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/typebots",
                ["parts"] = {
                  "v1",
                  "typebots",
                },
                ["select"] = {
                  ["exist"] = {
                    "folder_id",
                    "workspace_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.typebots`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "list",
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "typebot_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
                    },
                  },
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["example"] = false,
                      ["kind"] = "query",
                      ["name"] = "migrate_to_latest_version",
                      ["orig"] = "migrate_to_latest_version",
                      ["reqd"] = false,
                      ["type"] = "`$BOOLEAN`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/typebots/{typebotId}",
                ["parts"] = {
                  "v1",
                  "typebots",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["typebotId"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "migrate_to_latest_version",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.typebot`",
                },
                ["index$"] = 0,
              },
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "typebot_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["example"] = false,
                      ["kind"] = "query",
                      ["name"] = "migrate_to_latest_version",
                      ["orig"] = "migrate_to_latest_version",
                      ["reqd"] = false,
                      ["type"] = "`$BOOLEAN`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/typebots/{typebotId}/publishedTypebot",
                ["parts"] = {
                  "v1",
                  "typebots",
                  "{id}",
                  "publishedTypebot",
                },
                ["rename"] = {
                  ["param"] = {
                    ["typebotId"] = "id",
                  },
                },
                ["select"] = {
                  ["$action"] = "published_typebot",
                  ["exist"] = {
                    "id",
                    "migrate_to_latest_version",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 1,
              },
            },
            ["key$"] = "load",
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "typebot_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/v1/typebots/{typebotId}",
                ["parts"] = {
                  "v1",
                  "typebots",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["typebotId"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "remove",
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "typebot_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/v1/typebots/{typebotId}",
                ["parts"] = {
                  "v1",
                  "typebots",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["typebotId"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = {
                    ["typebot"] = "`reqdata`",
                  },
                  ["res"] = "`body.typebot`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "update",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["workspace"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "chatsHardLimit",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "createdAt",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "customChatsLimit",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "customSeatsLimit",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "icon",
            ["op"] = {
              ["create"] = {
                ["req"] = false,
                ["type"] = "`$STRING`",
              },
              ["update"] = {
                ["req"] = false,
                ["type"] = "`$STRING`",
              },
            },
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "id",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "inactiveFirstEmailSentAt",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 6,
          },
          {
            ["active"] = true,
            ["name"] = "inactiveSecondEmailSentAt",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 7,
          },
          {
            ["active"] = true,
            ["name"] = "isPastDue",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 8,
          },
          {
            ["active"] = true,
            ["name"] = "isSuspended",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 9,
          },
          {
            ["active"] = true,
            ["name"] = "isVerified",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 10,
          },
          {
            ["active"] = true,
            ["name"] = "lastActivityAt",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 11,
          },
          {
            ["active"] = true,
            ["name"] = "name",
            ["op"] = {
              ["update"] = {
                ["req"] = false,
                ["type"] = "`$STRING`",
              },
            },
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 12,
          },
          {
            ["active"] = true,
            ["name"] = "plan",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 13,
          },
          {
            ["active"] = true,
            ["name"] = "role",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 14,
          },
          {
            ["active"] = true,
            ["name"] = "settings",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 15,
          },
          {
            ["active"] = true,
            ["name"] = "stripeId",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["index$"] = 16,
          },
          {
            ["active"] = true,
            ["name"] = "updatedAt",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 17,
          },
          {
            ["active"] = true,
            ["name"] = "user",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
            ["index$"] = 18,
          },
          {
            ["active"] = true,
            ["name"] = "userId",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 19,
          },
          {
            ["active"] = true,
            ["name"] = "workspaceId",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 20,
          },
        },
        ["name"] = "workspace",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/v1/workspaces",
                ["parts"] = {
                  "v1",
                  "workspaces",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.workspace`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "create",
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "workspace_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/workspaces/{workspaceId}/members",
                ["parts"] = {
                  "v1",
                  "workspaces",
                  "{id}",
                  "members",
                },
                ["rename"] = {
                  ["param"] = {
                    ["workspaceId"] = "id",
                  },
                },
                ["select"] = {
                  ["$action"] = "member",
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.members`",
                },
                ["index$"] = 0,
              },
              {
                ["active"] = true,
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/workspaces",
                ["parts"] = {
                  "v1",
                  "workspaces",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.workspaces`",
                },
                ["index$"] = 1,
              },
            },
            ["key$"] = "list",
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "workspace_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/workspaces/{workspaceId}",
                ["parts"] = {
                  "v1",
                  "workspaces",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["workspaceId"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.workspace`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "workspace_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/v1/workspaces/{workspaceId}",
                ["parts"] = {
                  "v1",
                  "workspaces",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["workspaceId"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "remove",
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "workspace_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/v1/workspaces/{workspaceId}",
                ["parts"] = {
                  "v1",
                  "workspaces",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["workspaceId"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.workspace`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "update",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
