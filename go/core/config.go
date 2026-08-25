package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Typebot",
			"slug": "typebot",
			"version": "0.1.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://app.typebot.com/api",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"analytics": map[string]any{},
				"billing": map[string]any{},
				"folder": map[string]any{},
				"result": map[string]any{},
				"typebot": map[string]any{},
				"workspace": map[string]any{},
			},
		},
		"entity": map[string]any{
			"analytics": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "totalCompleted",
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "totalStarts",
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "totalViews",
						"req": true,
						"type": "`$NUMBER`",
					},
				},
				"name": "analytics",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "typebot_id",
											"orig": "typebot_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "last7Days",
											"kind": "query",
											"name": "time_filter",
											"orig": "time_filter",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "time_zone",
											"orig": "time_zone",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/typebots/{typebotId}/analytics/stats",
								"parts": []any{
									"v1",
									"typebots",
									"{typebot_id}",
									"analytics",
									"stats",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"typebotId": "typebot_id",
									},
								},
								"select": map[string]any{
									"$action": "stat",
									"exist": []any{
										"time_filter",
										"time_zone",
										"typebot_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.stats`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"typebot",
						},
					},
				},
			},
			"billing": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "amount",
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "currency",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "resetsAt",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "totalChatsUsed",
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "url",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "billing",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "workspace_id",
											"orig": "workspace_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/billing/invoices",
								"parts": []any{
									"v1",
									"billing",
									"invoices",
								},
								"select": map[string]any{
									"$action": "invoice",
									"exist": []any{
										"workspace_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.invoices`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "workspace_id",
											"orig": "workspace_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/billing/usage",
								"parts": []any{
									"v1",
									"billing",
									"usage",
								},
								"select": map[string]any{
									"$action": "usage",
									"exist": []any{
										"workspace_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"folder": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "createdAt",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "folder",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "folderName",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "parentFolderId",
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "updatedAt",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "workspaceId",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "folder",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/v1/folders",
								"parts": []any{
									"v1",
									"folders",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.folder`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "parent_folder_id",
											"orig": "parent_folder_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "workspace_id",
											"orig": "workspace_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/folders",
								"parts": []any{
									"v1",
									"folders",
								},
								"select": map[string]any{
									"exist": []any{
										"parent_folder_id",
										"workspace_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.folders`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "folder_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "workspace_id",
											"orig": "workspace_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/folders/{folderId}",
								"parts": []any{
									"v1",
									"folders",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"folderId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"workspace_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.folder`",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "folder_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/v1/folders/{folderId}",
								"parts": []any{
									"v1",
									"folders",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"folderId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.folder`",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "folder_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PATCH",
								"orig": "/v1/folders/{folderId}",
								"parts": []any{
									"v1",
									"folders",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"folderId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": map[string]any{
										"folder": "`reqdata`",
									},
									"res": "`body.folder`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"result": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "answers",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "context",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "createdAt",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "details",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "hasStarted",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "isArchived",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "isCompleted",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "lastChatSessionId",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "resultId",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "typebotId",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "variables",
						"req": true,
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 2,
							"count": 1,
							"depth": 3,
						},
					},
				},
				"name": "result",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "typebot_id",
											"orig": "typebot_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "cursor",
											"orig": "cursor",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": "last7Days",
											"kind": "query",
											"name": "time_filter",
											"orig": "time_filter",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "time_zone",
											"orig": "time_zone",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/typebots/{typebotId}/results",
								"parts": []any{
									"v1",
									"typebots",
									"{typebot_id}",
									"results",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"typebotId": "typebot_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cursor",
										"limit",
										"time_filter",
										"time_zone",
										"typebot_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "result_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "typebot_id",
											"orig": "typebot_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/typebots/{typebotId}/results/{resultId}/logs",
								"parts": []any{
									"v1",
									"typebots",
									"{typebot_id}",
									"results",
									"{id}",
									"logs",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"resultId": "id",
										"typebotId": "typebot_id",
									},
								},
								"select": map[string]any{
									"$action": "log",
									"exist": []any{
										"id",
										"typebot_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.logs`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "result_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "typebot_id",
											"orig": "typebot_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/typebots/{typebotId}/results/{resultId}",
								"parts": []any{
									"v1",
									"typebots",
									"{typebot_id}",
									"results",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"resultId": "id",
										"typebotId": "typebot_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"typebot_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.result`",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "typebot_id",
											"orig": "typebot_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/v1/typebots/{typebotId}/results",
								"parts": []any{
									"v1",
									"typebots",
									"{typebot_id}",
									"results",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"typebotId": "typebot_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"typebot_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"typebot",
						},
					},
				},
			},
			"typebot": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "accessRight",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "createdAt",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "customDomain",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "edges",
						"req": true,
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 2,
							"count": 1,
							"depth": 3,
						},
					},
					map[string]any{
						"name": "enableSafetyFlags",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "events",
						"req": true,
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 3,
							"count": 1,
							"depth": 1,
						},
					},
					map[string]any{
						"name": "folderId",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "fromTemplate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "groups",
						"req": true,
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 19,
							"count": 31,
							"depth": 14,
						},
					},
					map[string]any{
						"name": "icon",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "isArchived",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "isClosed",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "message",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "overwrite",
						"short": "If true, even if we detect a conflict, we will overwrite push the updates to the typebot",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "publicId",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "publishedTypebot",
						"req": true,
						"type": "`$ANY`",
						"union": map[string]any{
							"branches": 19,
							"count": 51,
							"depth": 20,
						},
					},
					map[string]any{
						"name": "publishedTypebotId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "resultsTablePreferences",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "riskLevel",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "selectedThemeTemplateId",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "settings",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "spaceId",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "theme",
						"req": true,
						"type": "`$OBJECT`",
						"union": map[string]any{
							"branches": 2,
							"count": 2,
							"depth": 6,
						},
					},
					map[string]any{
						"name": "typebot",
						"req": true,
						"type": "`$OBJECT`",
						"union": map[string]any{
							"branches": 19,
							"count": 88,
							"depth": 24,
						},
					},
					map[string]any{
						"name": "updatedAt",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "variables",
						"req": true,
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 2,
							"count": 1,
							"depth": 5,
						},
					},
					map[string]any{
						"name": "version",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "Provides the version the published bot was migrated from if `migrateToLatestVersion` is set to `true`.",
						"type": "`$ANY`",
						"union": map[string]any{
							"branches": 2,
							"count": 1,
							"depth": 0,
						},
					},
					map[string]any{
						"name": "warnings",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "whatsAppCredentialsId",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "workspaceId",
						"req": true,
						"short": "[Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid)",
						"type": "`$STRING`",
					},
				},
				"name": "typebot",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "typebot_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/v1/typebots/{typebotId}/publish",
								"parts": []any{
									"v1",
									"typebots",
									"{id}",
									"publish",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"typebotId": "id",
									},
								},
								"select": map[string]any{
									"$action": "publish",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "typebot_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/v1/typebots/{typebotId}/unpublish",
								"parts": []any{
									"v1",
									"typebots",
									"{id}",
									"unpublish",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"typebotId": "id",
									},
								},
								"select": map[string]any{
									"$action": "unpublish",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/v1/typebots",
								"parts": []any{
									"v1",
									"typebots",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": map[string]any{
										"typebot": "`reqdata`",
									},
									"res": "`body.typebot`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/v1/typebots/import",
								"parts": []any{
									"v1",
									"typebots",
									"import",
								},
								"select": map[string]any{
									"$action": "import",
								},
								"transform": map[string]any{
									"req": map[string]any{
										"typebot": "`reqdata`",
									},
									"res": "`body.typebot`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "folder_id",
											"orig": "folder_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "workspace_id",
											"orig": "workspace_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/typebots",
								"parts": []any{
									"v1",
									"typebots",
								},
								"select": map[string]any{
									"exist": []any{
										"folder_id",
										"workspace_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.typebots`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "typebot_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "migrate_to_latest_version",
											"orig": "migrate_to_latest_version",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/typebots/{typebotId}",
								"parts": []any{
									"v1",
									"typebots",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"typebotId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"migrate_to_latest_version",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.typebot`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "typebot_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "migrate_to_latest_version",
											"orig": "migrate_to_latest_version",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/typebots/{typebotId}/publishedTypebot",
								"parts": []any{
									"v1",
									"typebots",
									"{id}",
									"publishedTypebot",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"typebotId": "id",
									},
								},
								"select": map[string]any{
									"$action": "published_typebot",
									"exist": []any{
										"id",
										"migrate_to_latest_version",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "typebot_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/v1/typebots/{typebotId}",
								"parts": []any{
									"v1",
									"typebots",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"typebotId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "typebot_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PATCH",
								"orig": "/v1/typebots/{typebotId}",
								"parts": []any{
									"v1",
									"typebots",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"typebotId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": map[string]any{
										"typebot": "`reqdata`",
									},
									"res": "`body.typebot`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"workspace": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "chatsHardLimit",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "createdAt",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "customChatsLimit",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "customSeatsLimit",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "icon",
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "inactiveFirstEmailSentAt",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "inactiveSecondEmailSentAt",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "isPastDue",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "isSuspended",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "isVerified",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "lastActivityAt",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "name",
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "plan",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "role",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "settings",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "stripeId",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "updatedAt",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "user",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "userId",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "workspaceId",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "workspace",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/v1/workspaces",
								"parts": []any{
									"v1",
									"workspaces",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.workspace`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "workspace_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/workspaces/{workspaceId}/members",
								"parts": []any{
									"v1",
									"workspaces",
									"{id}",
									"members",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"workspaceId": "id",
									},
								},
								"select": map[string]any{
									"$action": "member",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.members`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/workspaces",
								"parts": []any{
									"v1",
									"workspaces",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.workspaces`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "workspace_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/workspaces/{workspaceId}",
								"parts": []any{
									"v1",
									"workspaces",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"workspaceId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.workspace`",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "workspace_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/v1/workspaces/{workspaceId}",
								"parts": []any{
									"v1",
									"workspaces",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"workspaceId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "workspace_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PATCH",
								"orig": "/v1/workspaces/{workspaceId}",
								"parts": []any{
									"v1",
									"workspaces",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"workspaceId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.workspace`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
