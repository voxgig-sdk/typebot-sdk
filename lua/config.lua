-- Typebot SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Typebot",
      slug = "typebot",
      version = "0.1.1",
      target = "lua",
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
            ["name"] = "totalCompleted",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "totalStarts",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "totalViews",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
          },
        },
        ["name"] = "analytics",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "typebot_id",
                      ["orig"] = "typebot_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = "last7Days",
                      ["kind"] = "query",
                      ["name"] = "time_filter",
                      ["orig"] = "time_filter",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "time_zone",
                      ["orig"] = "time_zone",
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
              },
            },
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
            ["name"] = "amount",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "currency",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "date",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "id",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "resetsAt",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "totalChatsUsed",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "url",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "billing",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
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
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
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
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["folder"] = {
        ["fields"] = {
          {
            ["name"] = "createdAt",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "folder",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "folderName",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["op"] = {
              ["create"] = {
                ["type"] = "`$STRING`",
              },
            },
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "parentFolderId",
            ["op"] = {
              ["create"] = {
                ["type"] = "`$STRING`",
              },
            },
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "updatedAt",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "workspaceId",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "folder",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
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
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "parent_folder_id",
                      ["orig"] = "parent_folder_id",
                      ["type"] = "`$STRING`",
                    },
                    {
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
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "folder_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
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
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "folder_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
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
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "folder_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
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
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["result"] = {
        ["fields"] = {
          {
            ["name"] = "answers",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "context",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "createdAt",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "description",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "details",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "hasStarted",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "id",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "isArchived",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "isCompleted",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "lastChatSessionId",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "resultId",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "status",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "typebotId",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "variables",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
            ["union"] = {
              ["branches"] = 2,
              ["count"] = 1,
              ["depth"] = 3,
            },
          },
        },
        ["name"] = "result",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "typebot_id",
                      ["orig"] = "typebot_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "cursor",
                      ["orig"] = "cursor",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["example"] = 50,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["example"] = "last7Days",
                      ["kind"] = "query",
                      ["name"] = "time_filter",
                      ["orig"] = "time_filter",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "time_zone",
                      ["orig"] = "time_zone",
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
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "result_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
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
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "result_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
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
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "typebot_id",
                      ["orig"] = "typebot_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
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
              },
            },
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
            ["name"] = "accessRight",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "createdAt",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "customDomain",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "edges",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
            ["union"] = {
              ["branches"] = 2,
              ["count"] = 1,
              ["depth"] = 3,
            },
          },
          {
            ["name"] = "enableSafetyFlags",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "events",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
            ["union"] = {
              ["branches"] = 3,
              ["count"] = 1,
              ["depth"] = 1,
            },
          },
          {
            ["name"] = "folderId",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "fromTemplate",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "groups",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
            ["union"] = {
              ["branches"] = 19,
              ["count"] = 31,
              ["depth"] = 14,
            },
          },
          {
            ["name"] = "icon",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "id",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "isArchived",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "isClosed",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "message",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "overwrite",
            ["short"] = "If true, even if we detect a conflict, we will overwrite push the updates to the typebot",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "publicId",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "publishedTypebot",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["union"] = {
              ["branches"] = 19,
              ["count"] = 51,
              ["depth"] = 20,
            },
          },
          {
            ["name"] = "publishedTypebotId",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "resultsTablePreferences",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "riskLevel",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "selectedThemeTemplateId",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "settings",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "spaceId",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "theme",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
            ["union"] = {
              ["branches"] = 2,
              ["count"] = 2,
              ["depth"] = 6,
            },
          },
          {
            ["name"] = "typebot",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
            ["union"] = {
              ["branches"] = 19,
              ["count"] = 88,
              ["depth"] = 24,
            },
          },
          {
            ["name"] = "updatedAt",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "variables",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
            ["union"] = {
              ["branches"] = 2,
              ["count"] = 1,
              ["depth"] = 5,
            },
          },
          {
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
            ["short"] = "Provides the version the published bot was migrated from if `migrateToLatestVersion` is set to `true`.",
            ["type"] = "`$ANY`",
            ["union"] = {
              ["branches"] = 2,
              ["count"] = 1,
              ["depth"] = 0,
            },
          },
          {
            ["name"] = "warnings",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "whatsAppCredentialsId",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "workspaceId",
            ["req"] = true,
            ["short"] = "[Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid)",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "typebot",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "typebot_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
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
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "typebot_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
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
              },
              {
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
              },
              {
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
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "folder_id",
                      ["orig"] = "folder_id",
                      ["type"] = "`$STRING`",
                    },
                    {
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
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "typebot_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = false,
                      ["kind"] = "query",
                      ["name"] = "migrate_to_latest_version",
                      ["orig"] = "migrate_to_latest_version",
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
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "typebot_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = false,
                      ["kind"] = "query",
                      ["name"] = "migrate_to_latest_version",
                      ["orig"] = "migrate_to_latest_version",
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
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "typebot_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
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
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "typebot_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
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
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["workspace"] = {
        ["fields"] = {
          {
            ["name"] = "chatsHardLimit",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "createdAt",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "customChatsLimit",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "customSeatsLimit",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "icon",
            ["op"] = {
              ["create"] = {
                ["type"] = "`$STRING`",
              },
              ["update"] = {
                ["type"] = "`$STRING`",
              },
            },
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "id",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "inactiveFirstEmailSentAt",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "inactiveSecondEmailSentAt",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "isPastDue",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "isSuspended",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "isVerified",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "lastActivityAt",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "name",
            ["op"] = {
              ["update"] = {
                ["type"] = "`$STRING`",
              },
            },
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "plan",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "role",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "settings",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "stripeId",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "updatedAt",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "user",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "userId",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "workspaceId",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "workspace",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
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
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
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
              },
              {
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
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
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
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "workspace_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
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
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "workspace_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
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
              },
            },
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
