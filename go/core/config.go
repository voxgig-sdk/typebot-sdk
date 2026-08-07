package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Typebot",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"active": true,
						"name": "total_completed",
						"req": true,
						"type": "`$NUMBER`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "total_start",
						"req": true,
						"type": "`$NUMBER`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "total_view",
						"req": true,
						"type": "`$NUMBER`",
						"index$": 2,
					},
				},
				"name": "analytics",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "typebot_id",
											"orig": "typebot_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"example": "last7Days",
											"kind": "query",
											"name": "time_filter",
											"orig": "time_filter",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "time_zone",
											"orig": "time_zone",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
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
						"active": true,
						"name": "amount",
						"req": true,
						"type": "`$NUMBER`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "currency",
						"req": true,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "date",
						"req": true,
						"type": "`$ANY`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "id",
						"req": true,
						"type": "`$STRING`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "resets_at",
						"req": true,
						"type": "`$STRING`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "total_chats_used",
						"req": true,
						"type": "`$NUMBER`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "url",
						"req": true,
						"type": "`$STRING`",
						"index$": 6,
					},
				},
				"name": "billing",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "workspace_id",
											"orig": "workspace_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "list",
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "workspace_id",
											"orig": "workspace_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"folder": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "created_at",
						"req": true,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "folder",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "folder_name",
						"req": false,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "id",
						"op": map[string]any{
							"create": map[string]any{
								"req": false,
								"type": "`$STRING`",
							},
						},
						"req": true,
						"type": "`$STRING`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "name",
						"req": true,
						"type": "`$STRING`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "parent_folder_id",
						"op": map[string]any{
							"create": map[string]any{
								"req": false,
								"type": "`$STRING`",
							},
						},
						"req": true,
						"type": "`$STRING`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "updated_at",
						"req": true,
						"type": "`$STRING`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "workspace_id",
						"req": true,
						"type": "`$STRING`",
						"index$": 7,
					},
				},
				"name": "folder",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
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
								"index$": 0,
							},
						},
						"key$": "create",
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "parent_folder_id",
											"orig": "parent_folder_id",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "workspace_id",
											"orig": "workspace_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "list",
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "folder_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "workspace_id",
											"orig": "workspace_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "folder_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "remove",
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "folder_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "update",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"result": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "answer",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "context",
						"req": true,
						"type": "`$ANY`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "created_at",
						"req": true,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "description",
						"req": true,
						"type": "`$STRING`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "detail",
						"req": true,
						"type": "`$ANY`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "has_started",
						"req": true,
						"type": "`$BOOLEAN`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "id",
						"req": true,
						"type": "`$STRING`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "is_archived",
						"req": true,
						"type": "`$BOOLEAN`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "is_completed",
						"req": true,
						"type": "`$BOOLEAN`",
						"index$": 8,
					},
					map[string]any{
						"active": true,
						"name": "last_chat_session_id",
						"req": true,
						"type": "`$STRING`",
						"index$": 9,
					},
					map[string]any{
						"active": true,
						"name": "result_id",
						"req": true,
						"type": "`$STRING`",
						"index$": 10,
					},
					map[string]any{
						"active": true,
						"name": "status",
						"req": true,
						"type": "`$STRING`",
						"index$": 11,
					},
					map[string]any{
						"active": true,
						"name": "typebot_id",
						"req": true,
						"type": "`$STRING`",
						"index$": 12,
					},
					map[string]any{
						"active": true,
						"name": "variable",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 13,
					},
				},
				"name": "result",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "typebot_id",
											"orig": "typebot_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "cursor",
											"orig": "cursor",
											"reqd": false,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"active": true,
											"example": 50,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"active": true,
											"example": "last7Days",
											"kind": "query",
											"name": "time_filter",
											"orig": "time_filter",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "time_zone",
											"orig": "time_zone",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "result_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "typebot_id",
											"orig": "typebot_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 1,
							},
						},
						"key$": "list",
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "result_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "typebot_id",
											"orig": "typebot_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 1,
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "typebot_id",
											"orig": "typebot_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "remove",
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
						"active": true,
						"name": "access_right",
						"req": true,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "created_at",
						"req": true,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "current_user_mode",
						"req": true,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "custom_domain",
						"req": true,
						"type": "`$ANY`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "edge",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "enable_safety_flag",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "event",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "folder_id",
						"req": true,
						"type": "`$STRING`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "from_template",
						"req": false,
						"type": "`$STRING`",
						"index$": 8,
					},
					map[string]any{
						"active": true,
						"name": "group",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 9,
					},
					map[string]any{
						"active": true,
						"name": "icon",
						"req": true,
						"type": "`$ANY`",
						"index$": 10,
					},
					map[string]any{
						"active": true,
						"name": "id",
						"req": true,
						"type": "`$STRING`",
						"index$": 11,
					},
					map[string]any{
						"active": true,
						"name": "is_archived",
						"req": true,
						"type": "`$BOOLEAN`",
						"index$": 12,
					},
					map[string]any{
						"active": true,
						"name": "is_closed",
						"req": true,
						"type": "`$BOOLEAN`",
						"index$": 13,
					},
					map[string]any{
						"active": true,
						"name": "message",
						"req": true,
						"type": "`$ANY`",
						"index$": 14,
					},
					map[string]any{
						"active": true,
						"name": "name",
						"req": true,
						"type": "`$STRING`",
						"index$": 15,
					},
					map[string]any{
						"active": true,
						"name": "overwrite",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 16,
					},
					map[string]any{
						"active": true,
						"name": "public_id",
						"req": true,
						"type": "`$STRING`",
						"index$": 17,
					},
					map[string]any{
						"active": true,
						"name": "published_typebot",
						"req": true,
						"type": "`$ANY`",
						"index$": 18,
					},
					map[string]any{
						"active": true,
						"name": "published_typebot_id",
						"req": false,
						"type": "`$STRING`",
						"index$": 19,
					},
					map[string]any{
						"active": true,
						"name": "results_table_preference",
						"req": true,
						"type": "`$ANY`",
						"index$": 20,
					},
					map[string]any{
						"active": true,
						"name": "risk_level",
						"req": true,
						"type": "`$ANY`",
						"index$": 21,
					},
					map[string]any{
						"active": true,
						"name": "selected_theme_template_id",
						"req": true,
						"type": "`$STRING`",
						"index$": 22,
					},
					map[string]any{
						"active": true,
						"name": "setting",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 23,
					},
					map[string]any{
						"active": true,
						"name": "space_id",
						"req": true,
						"type": "`$STRING`",
						"index$": 24,
					},
					map[string]any{
						"active": true,
						"name": "theme",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 25,
					},
					map[string]any{
						"active": true,
						"name": "typebot",
						"req": true,
						"type": "`$ANY`",
						"index$": 26,
					},
					map[string]any{
						"active": true,
						"name": "updated_at",
						"req": true,
						"type": "`$STRING`",
						"index$": 27,
					},
					map[string]any{
						"active": true,
						"name": "variable",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 28,
					},
					map[string]any{
						"active": true,
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
						"req": false,
						"type": "`$ANY`",
						"index$": 29,
					},
					map[string]any{
						"active": true,
						"name": "warning",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 30,
					},
					map[string]any{
						"active": true,
						"name": "whats_app_credentials_id",
						"req": true,
						"type": "`$STRING`",
						"index$": 31,
					},
					map[string]any{
						"active": true,
						"name": "workspace_id",
						"req": true,
						"type": "`$STRING`",
						"index$": 32,
					},
				},
				"name": "typebot",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "typebot_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "typebot_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 1,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{},
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
								"index$": 2,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{},
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
								"index$": 3,
							},
						},
						"key$": "create",
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "folder_id",
											"orig": "folder_id",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "workspace_id",
											"orig": "workspace_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "list",
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "typebot_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"example": false,
											"kind": "query",
											"name": "migrate_to_latest_version",
											"orig": "migrate_to_latest_version",
											"reqd": false,
											"type": "`$BOOLEAN`",
										},
									},
								},
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "typebot_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"example": false,
											"kind": "query",
											"name": "migrate_to_latest_version",
											"orig": "migrate_to_latest_version",
											"reqd": false,
											"type": "`$BOOLEAN`",
										},
									},
								},
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
								"index$": 1,
							},
						},
						"key$": "load",
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "typebot_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "remove",
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "typebot_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "update",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"workspace": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "chats_hard_limit",
						"req": true,
						"type": "`$ANY`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "created_at",
						"req": true,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "current_user_mode",
						"req": true,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "icon",
						"op": map[string]any{
							"create": map[string]any{
								"req": false,
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"req": false,
								"type": "`$STRING`",
							},
						},
						"req": true,
						"type": "`$ANY`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "id",
						"req": true,
						"type": "`$STRING`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "inactive_first_email_sent_at",
						"req": true,
						"type": "`$ANY`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "inactive_second_email_sent_at",
						"req": true,
						"type": "`$ANY`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "is_past_due",
						"req": true,
						"type": "`$BOOLEAN`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "is_suspended",
						"req": true,
						"type": "`$BOOLEAN`",
						"index$": 8,
					},
					map[string]any{
						"active": true,
						"name": "is_verified",
						"req": true,
						"type": "`$BOOLEAN`",
						"index$": 9,
					},
					map[string]any{
						"active": true,
						"name": "last_activity_at",
						"req": true,
						"type": "`$ANY`",
						"index$": 10,
					},
					map[string]any{
						"active": true,
						"name": "name",
						"op": map[string]any{
							"update": map[string]any{
								"req": false,
								"type": "`$STRING`",
							},
						},
						"req": true,
						"type": "`$STRING`",
						"index$": 11,
					},
					map[string]any{
						"active": true,
						"name": "plan",
						"req": true,
						"type": "`$STRING`",
						"index$": 12,
					},
					map[string]any{
						"active": true,
						"name": "role",
						"req": true,
						"type": "`$STRING`",
						"index$": 13,
					},
					map[string]any{
						"active": true,
						"name": "setting",
						"req": true,
						"type": "`$ANY`",
						"index$": 14,
					},
					map[string]any{
						"active": true,
						"name": "stripe_id",
						"req": true,
						"type": "`$STRING`",
						"index$": 15,
					},
					map[string]any{
						"active": true,
						"name": "updated_at",
						"req": true,
						"type": "`$STRING`",
						"index$": 16,
					},
					map[string]any{
						"active": true,
						"name": "user",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 17,
					},
					map[string]any{
						"active": true,
						"name": "user_id",
						"req": true,
						"type": "`$STRING`",
						"index$": 18,
					},
					map[string]any{
						"active": true,
						"name": "workspace",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 19,
					},
					map[string]any{
						"active": true,
						"name": "workspace_id",
						"req": true,
						"type": "`$STRING`",
						"index$": 20,
					},
				},
				"name": "workspace",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
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
								"index$": 0,
							},
						},
						"key$": "create",
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "workspace_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{},
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
								"index$": 1,
							},
						},
						"key$": "list",
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "workspace_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "workspace_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "remove",
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "workspace_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "update",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
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
