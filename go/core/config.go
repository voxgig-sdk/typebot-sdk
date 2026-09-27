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
			"debug": map[string]any{
				"options": map[string]any{
					"active": false,
					"max": 100,
					"redact": []any{
						"authorization",
						"cookie",
						"set-cookie",
						"api-key",
						"apikey",
						"x-api-key",
						"idempotency-key",
					},
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"onEntry": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"idempotency": map[string]any{
				"options": map[string]any{
					"active": false,
					"header": "Idempotency-Key",
					"methods": []any{
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					},
					"ops": []any{
						"create",
						"update",
						"remove",
					},
				},
				"optspec": map[string]any{
					"keygen": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"metrics": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"paging": map[string]any{
				"options": map[string]any{
					"active": false,
					"afterVar": "after",
					"cursorParam": "cursor",
					"firstVar": "first",
					"limitParam": "limit",
					"pageParam": "page",
					"startPage": 1,
				},
				"optspec": map[string]any{
					"limit": "`$NUMBER`",
					"ops": "`$LIST`",
				},
				"strict": false,
				"transport": "none",
			},
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
				"fields": []any{},
				"name": "analytics",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/typebots/{typebotId}/analytics/stats",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "typebots",
									},
									map[string]any{
										"var": "typebot_id",
									},
									map[string]any{
										"lit": "analytics",
									},
									map[string]any{
										"lit": "stats",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.stats`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "typebot_id",
											"orig": "typebot_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "time_filter",
											"orig": "time_filter",
											"type": "`$STRING`",
											"kind": "query",
											"example": "last7Days",
										},
										map[string]any{
											"name": "time_zone",
											"orig": "time_zone",
											"type": "`$STRING`",
											"kind": "query",
										},
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
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.typebot",
						},
					},
				},
			},
			"billing": map[string]any{
				"fields": []any{},
				"name": "billing",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/billing/invoices",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "billing",
									},
									map[string]any{
										"lit": "invoices",
									},
								},
								"parts": []any{
									"v1",
									"billing",
									"invoices",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.invoices`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "invoice",
									"exist": []any{
										"workspace_id",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/billing/usage",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "billing",
									},
									map[string]any{
										"lit": "usage",
									},
								},
								"parts": []any{
									"v1",
									"billing",
									"usage",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "usage",
									"exist": []any{
										"workspace_id",
									},
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
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "folder",
						"title": "Folder",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "folderName",
						"title": "Folder Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "parentFolderId",
						"title": "Parent Folder Id",
						"type": "`$ANY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "updatedAt",
						"title": "Updated At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "workspaceId",
						"title": "Workspace Id",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "folder",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/v1/folders",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "folders",
									},
								},
								"parts": []any{
									"v1",
									"folders",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.folder`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/folders",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "folders",
									},
								},
								"parts": []any{
									"v1",
									"folders",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.folders`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "parent_folder_id",
											"orig": "parent_folder_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"parent_folder_id",
										"workspace_id",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/folders/{folderId}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "folders",
									},
									map[string]any{
										"var": "id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.folder`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "folder_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"workspace_id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/v1/folders/{folderId}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "folders",
									},
									map[string]any{
										"var": "id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.folder`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "folder_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/v1/folders/{folderId}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "folders",
									},
									map[string]any{
										"var": "id",
									},
								},
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
								"transform": map[string]any{
									"req": map[string]any{
										"folder": "`reqdata`",
									},
									"res": "`body.folder`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "folder_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Answers",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "hasStarted",
						"title": "Has Started",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "isArchived",
						"title": "Is Archived",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "isCompleted",
						"title": "Is Completed",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "lastChatSessionId",
						"title": "Last Chat Session Id",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "typebotId",
						"title": "Typebot Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "variables",
						"title": "Variables",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "result",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/typebots/{typebotId}/results",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "typebots",
									},
									map[string]any{
										"var": "typebot_id",
									},
									map[string]any{
										"lit": "results",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "typebot_id",
											"orig": "typebot_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$NUMBER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "time_filter",
											"orig": "time_filter",
											"type": "`$STRING`",
											"kind": "query",
											"example": "last7Days",
										},
										map[string]any{
											"name": "time_zone",
											"orig": "time_zone",
											"type": "`$STRING`",
											"kind": "query",
										},
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
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/typebots/{typebotId}/results/{resultId}/logs",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "typebots",
									},
									map[string]any{
										"var": "typebot_id",
									},
									map[string]any{
										"lit": "results",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "logs",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.logs`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "result_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "typebot_id",
											"orig": "typebot_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "log",
									"exist": []any{
										"id",
										"typebot_id",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/typebots/{typebotId}/results/{resultId}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "typebots",
									},
									map[string]any{
										"var": "typebot_id",
									},
									map[string]any{
										"lit": "results",
									},
									map[string]any{
										"var": "id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.result`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "result_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "typebot_id",
											"orig": "typebot_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"typebot_id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/v1/typebots/{typebotId}/results",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "typebots",
									},
									map[string]any{
										"var": "typebot_id",
									},
									map[string]any{
										"lit": "results",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "typebot_id",
											"orig": "typebot_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"typebot_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.typebot",
						},
					},
				},
			},
			"typebot": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "accessRight",
						"title": "Access Right",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "customDomain",
						"title": "Custom Domain",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "edges",
						"title": "Edges",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "events",
						"title": "Events",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "folderId",
						"title": "Folder Id",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "groups",
						"title": "Groups",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "icon",
						"title": "Icon",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "isArchived",
						"title": "Is Archived",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "isClosed",
						"title": "Is Closed",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "overwrite",
						"title": "Overwrite",
						"type": "`$BOOLEAN`",
						"short": "If true, even if we detect a conflict, we will overwrite push the updates to the typebot",
					},
					map[string]any{
						"name": "publicId",
						"title": "Public Id",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "publishedTypebotId",
						"title": "Published Typebot Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "resultsTablePreferences",
						"title": "Results Table Preferences",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "riskLevel",
						"title": "Risk Level",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "selectedThemeTemplateId",
						"title": "Selected Theme Template Id",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "settings",
						"title": "Settings",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "spaceId",
						"title": "Space Id",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "theme",
						"title": "Theme",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "typebot",
						"title": "Typebot",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "updatedAt",
						"title": "Updated At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "variables",
						"title": "Variables",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "whatsAppCredentialsId",
						"title": "Whats App Credentials Id",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "workspaceId",
						"title": "Workspace Id",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "typebot",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/v1/typebots/{typebotId}/publish",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "typebots",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "publish",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "typebot_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "publish",
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/v1/typebots/{typebotId}/unpublish",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "typebots",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "unpublish",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "typebot_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "unpublish",
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/v1/typebots",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "typebots",
									},
								},
								"parts": []any{
									"v1",
									"typebots",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": map[string]any{
										"typebot": "`reqdata`",
									},
									"res": "`body.typebot`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/v1/typebots/import",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "typebots",
									},
									map[string]any{
										"lit": "import",
									},
								},
								"parts": []any{
									"v1",
									"typebots",
									"import",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": map[string]any{
										"typebot": "`reqdata`",
									},
									"res": "`body.typebot`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "import",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/typebots",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "typebots",
									},
								},
								"parts": []any{
									"v1",
									"typebots",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.typebots`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "folder_id",
											"orig": "folder_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"folder_id",
										"workspace_id",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/typebots/{typebotId}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "typebots",
									},
									map[string]any{
										"var": "id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.typebot`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "typebot_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "migrate_to_latest_version",
											"orig": "migrate_to_latest_version",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"migrate_to_latest_version",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/typebots/{typebotId}/publishedTypebot",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "typebots",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "publishedTypebot",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "typebot_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "migrate_to_latest_version",
											"orig": "migrate_to_latest_version",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
									},
								},
								"select": map[string]any{
									"$action": "published_typebot",
									"exist": []any{
										"id",
										"migrate_to_latest_version",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/v1/typebots/{typebotId}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "typebots",
									},
									map[string]any{
										"var": "id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "typebot_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/v1/typebots/{typebotId}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "typebots",
									},
									map[string]any{
										"var": "id",
									},
								},
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
								"transform": map[string]any{
									"req": map[string]any{
										"typebot": "`reqdata`",
									},
									"res": "`body.typebot`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "typebot_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Chats Hard Limit",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "customChatsLimit",
						"title": "Custom Chats Limit",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "customSeatsLimit",
						"title": "Custom Seats Limit",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "icon",
						"title": "Icon",
						"type": "`$ANY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "inactiveFirstEmailSentAt",
						"title": "Inactive First Email Sent At",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "inactiveSecondEmailSentAt",
						"title": "Inactive Second Email Sent At",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "isPastDue",
						"title": "Is Past Due",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "isSuspended",
						"title": "Is Suspended",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "isVerified",
						"title": "Is Verified",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "lastActivityAt",
						"title": "Last Activity At",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "plan",
						"title": "Plan",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "settings",
						"title": "Settings",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "stripeId",
						"title": "Stripe Id",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "updatedAt",
						"title": "Updated At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "workspace",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/v1/workspaces",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "workspaces",
									},
								},
								"parts": []any{
									"v1",
									"workspaces",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.workspace`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/workspaces/{workspaceId}/members",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "members",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.members`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "workspace_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "member",
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/workspaces",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "workspaces",
									},
								},
								"parts": []any{
									"v1",
									"workspaces",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.workspaces`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/workspaces/{workspaceId}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"var": "id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.workspace`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "workspace_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/v1/workspaces/{workspaceId}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"var": "id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "workspace_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/v1/workspaces/{workspaceId}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"var": "id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.workspace`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "workspace_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "debug":
		if NewDebugFeatureFunc != nil {
			return NewDebugFeatureFunc()
		}
	case "idempotency":
		if NewIdempotencyFeatureFunc != nil {
			return NewIdempotencyFeatureFunc()
		}
	case "metrics":
		if NewMetricsFeatureFunc != nil {
			return NewMetricsFeatureFunc()
		}
	case "paging":
		if NewPagingFeatureFunc != nil {
			return NewPagingFeatureFunc()
		}
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
