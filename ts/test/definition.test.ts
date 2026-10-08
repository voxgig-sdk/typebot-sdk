import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "analytics",
    "accessor": "Analytics",
    "op": "load",
    "method": "GET",
    "path": "/v1/typebots/{typebotId}/analytics/stats",
    "action": "stat",
    "args": [
      {
        "name": "typebot_id",
        "wire": "typebotId",
        "value": "p1"
      }
    ],
    "select": {
      "time_filter": "last7Days",
      "time_zone": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "timeFilter",
      "timeZone"
    ],
    "queryArgs": [
      {
        "name": "time_filter",
        "wire": "timeFilter"
      },
      {
        "name": "time_zone",
        "wire": "timeZone"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "stats": {
        "totalViews": 1,
        "totalStarts": 1,
        "totalCompleted": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "billing",
    "accessor": "Billing",
    "op": "list",
    "method": "GET",
    "path": "/v1/billing/invoices",
    "action": "invoice",
    "args": [],
    "select": {
      "workspace_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "workspaceId"
    ],
    "queryArgs": [
      {
        "name": "workspace_id",
        "wire": "workspaceId"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "invoices": [
        {
          "id": "x",
          "url": "x",
          "amount": 1,
          "currency": "x",
          "date": 1
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "billing",
    "accessor": "Billing",
    "op": "load",
    "method": "GET",
    "path": "/v1/billing/usage",
    "action": "usage",
    "args": [],
    "select": {
      "workspace_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "workspaceId"
    ],
    "queryArgs": [
      {
        "name": "workspace_id",
        "wire": "workspaceId"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "totalChatsUsed": 1,
      "resetsAt": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "folder",
    "accessor": "Folder",
    "op": "create",
    "method": "POST",
    "path": "/v1/folders",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "folder": {
        "id": "x",
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "name": "x",
        "parentFolderId": "x",
        "workspaceId": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "folder",
    "accessor": "Folder",
    "op": "list",
    "method": "GET",
    "path": "/v1/folders",
    "args": [],
    "select": {
      "workspace_id": "v1",
      "parent_folder_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "workspaceId",
      "parentFolderId"
    ],
    "queryArgs": [
      {
        "name": "parent_folder_id",
        "wire": "parentFolderId"
      },
      {
        "name": "workspace_id",
        "wire": "workspaceId"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "folders": [
        {
          "id": "x",
          "name": "x",
          "createdAt": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "folder",
    "accessor": "Folder",
    "op": "load",
    "method": "GET",
    "path": "/v1/folders/{folderId}",
    "args": [
      {
        "name": "id",
        "wire": "folderId",
        "value": "p1"
      }
    ],
    "select": {
      "workspace_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "workspaceId"
    ],
    "queryArgs": [
      {
        "name": "workspace_id",
        "wire": "workspaceId"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "folder": {
        "id": "x",
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "name": "x",
        "parentFolderId": "x",
        "workspaceId": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "folder",
    "accessor": "Folder",
    "op": "remove",
    "method": "DELETE",
    "path": "/v1/folders/{folderId}",
    "args": [
      {
        "name": "id",
        "wire": "folderId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "folder": {
        "id": "x",
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "name": "x",
        "parentFolderId": "x",
        "workspaceId": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "folder",
    "accessor": "Folder",
    "op": "update",
    "method": "PATCH",
    "path": "/v1/folders/{folderId}",
    "args": [
      {
        "name": "id",
        "wire": "folderId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "folder": {
        "id": "x",
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "name": "x",
        "parentFolderId": "x",
        "workspaceId": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "result",
    "accessor": "Result",
    "op": "list",
    "method": "GET",
    "path": "/v1/typebots/{typebotId}/results/{resultId}/logs",
    "action": "log",
    "args": [
      {
        "name": "id",
        "wire": "resultId",
        "value": "p1"
      },
      {
        "name": "typebot_id",
        "wire": "typebotId",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "logs": [
        {
          "id": "x",
          "createdAt": "2026-01-01T00:00:00Z",
          "resultId": "x",
          "status": "x",
          "description": "x",
          "details": "x",
          "context": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "result",
    "accessor": "Result",
    "op": "list",
    "method": "GET",
    "path": "/v1/typebots/{typebotId}/results",
    "args": [
      {
        "name": "typebot_id",
        "wire": "typebotId",
        "value": "p1"
      }
    ],
    "select": {
      "cursor": "v1",
      "limit": 50,
      "time_filter": "last7Days",
      "time_zone": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "limit",
      "cursor",
      "timeFilter",
      "timeZone"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "time_filter",
        "wire": "timeFilter"
      },
      {
        "name": "time_zone",
        "wire": "timeZone"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "results": [
        {
          "id": "x",
          "createdAt": "2026-01-01T00:00:00Z",
          "typebotId": "x",
          "variables": [
            {
              "id": "x",
              "name": "x",
              "isSessionVariable": true,
              "value": "x"
            }
          ],
          "isCompleted": true,
          "hasStarted": true,
          "isArchived": true,
          "lastChatSessionId": "x",
          "answers": [
            {
              "blockId": "x",
              "content": "x",
              "attachedFileUrls": [
                "x"
              ]
            }
          ]
        }
      ],
      "nextCursor": 1
    },
    "idField": "id"
  },
  {
    "entity": "result",
    "accessor": "Result",
    "op": "load",
    "method": "GET",
    "path": "/v1/typebots/{typebotId}/results/{resultId}",
    "args": [
      {
        "name": "id",
        "wire": "resultId",
        "value": "p1"
      },
      {
        "name": "typebot_id",
        "wire": "typebotId",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "result": {
        "id": "x",
        "createdAt": "2026-01-01T00:00:00Z",
        "typebotId": "x",
        "variables": [
          {
            "id": "x",
            "name": "x",
            "isSessionVariable": true,
            "value": "x"
          }
        ],
        "isCompleted": true,
        "hasStarted": true,
        "isArchived": true,
        "lastChatSessionId": "x",
        "answers": [
          {
            "blockId": "x",
            "content": "x",
            "attachedFileUrls": [
              "x"
            ]
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "result",
    "accessor": "Result",
    "op": "remove",
    "method": "DELETE",
    "path": "/v1/typebots/{typebotId}/results",
    "args": [
      {
        "name": "typebot_id",
        "wire": "typebotId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "typebot",
    "accessor": "Typebot",
    "op": "create",
    "method": "POST",
    "path": "/v1/typebots/{typebotId}/publish",
    "action": "publish",
    "args": [
      {
        "name": "id",
        "wire": "typebotId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "warnings": [
        {
          "type": "trademarkInfringement",
          "trademark": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "typebot",
    "accessor": "Typebot",
    "op": "create",
    "method": "POST",
    "path": "/v1/typebots/{typebotId}/unpublish",
    "action": "unpublish",
    "args": [
      {
        "name": "id",
        "wire": "typebotId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "typebot",
    "accessor": "Typebot",
    "op": "create",
    "method": "POST",
    "path": "/v1/typebots",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "typebot": {
        "version": "6",
        "id": "x",
        "name": "x",
        "events": [
          {
            "id": "x",
            "outgoingEdgeId": "x",
            "graphCoordinates": {
              "x": 1,
              "y": 1
            },
            "options": {
              "command": "x",
              "resumeAfter": true
            }
          }
        ],
        "groups": [
          {
            "id": "x",
            "title": "x",
            "graphCoordinates": {
              "x": 1,
              "y": 1
            },
            "blocks": [
              {}
            ]
          }
        ],
        "edges": [
          {
            "id": "x",
            "from": {
              "blockId": "x",
              "itemId": "x",
              "pathId": "x"
            },
            "to": {
              "groupId": "x",
              "blockId": "x"
            }
          }
        ],
        "variables": [
          {
            "id": "x",
            "name": "x",
            "isSessionVariable": true,
            "value": "x"
          }
        ],
        "theme": {
          "general": {
            "font": "x",
            "background": {
              "type": "Color",
              "content": "x"
            },
            "progressBar": {
              "isEnabled": true,
              "color": "x",
              "backgroundColor": "x",
              "placement": "Top",
              "thickness": 1,
              "position": "fixed"
            }
          },
          "chat": {
            "container": {
              "maxWidth": "x",
              "maxHeight": "x",
              "backgroundColor": "x",
              "color": "x",
              "blur": 1,
              "opacity": 1,
              "shadow": "none",
              "border": {
                "thickness": 1,
                "color": "x",
                "roundeness": "none",
                "customRoundeness": 1,
                "opacity": 1
              }
            },
            "hostAvatar": {
              "isEnabled": true,
              "url": "x"
            },
            "guestAvatar": {
              "isEnabled": true,
              "url": "x"
            },
            "hostBubbles": {
              "backgroundColor": "x",
              "color": "x",
              "blur": 1,
              "opacity": 1,
              "shadow": "none",
              "border": {
                "thickness": 1,
                "color": "x",
                "roundeness": "none",
                "customRoundeness": 1,
                "opacity": 1
              }
            },
            "guestBubbles": {
              "backgroundColor": "x",
              "color": "x",
              "blur": 1,
              "opacity": 1,
              "shadow": "none",
              "border": {
                "thickness": 1,
                "color": "x",
                "roundeness": "none",
                "customRoundeness": 1,
                "opacity": 1
              }
            },
            "buttons": {
              "backgroundColor": "x",
              "color": "x",
              "blur": 1,
              "opacity": 1,
              "shadow": "none",
              "border": {
                "thickness": 1,
                "color": "x",
                "roundeness": "none",
                "customRoundeness": 1,
                "opacity": 1
              }
            },
            "inputs": {
              "backgroundColor": "x",
              "color": "x",
              "blur": 1,
              "opacity": 1,
              "shadow": "none",
              "border": {
                "thickness": 1,
                "color": "x",
                "roundeness": "none",
                "customRoundeness": 1,
                "opacity": 1
              },
              "placeholderColor": "x"
            },
            "roundness": "none",
            "buttonsInput": {
              "layout": "wrap"
            }
          },
          "customCss": "x"
        },
        "selectedThemeTemplateId": "x",
        "settings": {
          "general": {
            "isBrandingEnabled": true,
            "isTypingEmulationEnabled": true,
            "isInputPrefillEnabled": true,
            "isHideQueryParamsEnabled": true,
            "isNewResultOnRefreshEnabled": true,
            "rememberUser": {
              "isEnabled": true,
              "storage": "session"
            },
            "systemMessages": {
              "invalidMessage": "x",
              "botClosed": "x",
              "networkErrorTitle": "x",
              "networkErrorMessage": "x",
              "popupBlockedTitle": "x",
              "popupBlockedDescription": "x",
              "popupBlockedButtonLabel": "x",
              "fileUploadError": "x",
              "fileUploadSizeError": "x",
              "whatsAppPictureChoiceSelectLabel": "x"
            }
          },
          "typingEmulation": {
            "enabled": true,
            "speed": 1,
            "maxDelay": 1,
            "delayBetweenBubbles": 1,
            "isDisabledOnFirstMessage": true
          },
          "metadata": {
            "title": "x",
            "description": "x",
            "imageUrl": "x",
            "favIconUrl": "x",
            "customHeadCode": "x",
            "googleTagManagerId": "x",
            "allowIndexing": true
          },
          "publicShare": {
            "isEnabled": true
          },
          "security": {
            "allowedOrigins": [
              "x"
            ]
          }
        },
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "icon": "x",
        "folderId": "x",
        "publicId": "x",
        "customDomain": "x",
        "workspaceId": "x",
        "resultsTablePreferences": {
          "columnsOrder": [
            "x"
          ],
          "columnsVisibility": {},
          "columnsWidth": {}
        },
        "isArchived": true,
        "isClosed": true,
        "whatsAppCredentialsId": "x",
        "riskLevel": 1,
        "spaceId": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "typebot",
    "accessor": "Typebot",
    "op": "create",
    "method": "POST",
    "path": "/v1/typebots/import",
    "action": "import",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "typebot": {
        "version": "6",
        "id": "x",
        "name": "x",
        "events": [
          {
            "id": "x",
            "outgoingEdgeId": "x",
            "graphCoordinates": {
              "x": 1,
              "y": 1
            },
            "options": {
              "command": "x",
              "resumeAfter": true
            }
          }
        ],
        "groups": [
          {
            "id": "x",
            "title": "x",
            "graphCoordinates": {
              "x": 1,
              "y": 1
            },
            "blocks": [
              {}
            ]
          }
        ],
        "edges": [
          {
            "id": "x",
            "from": {
              "blockId": "x",
              "itemId": "x",
              "pathId": "x"
            },
            "to": {
              "groupId": "x",
              "blockId": "x"
            }
          }
        ],
        "variables": [
          {
            "id": "x",
            "name": "x",
            "isSessionVariable": true,
            "value": "x"
          }
        ],
        "theme": {
          "general": {
            "font": "x",
            "background": {
              "type": "Color",
              "content": "x"
            },
            "progressBar": {
              "isEnabled": true,
              "color": "x",
              "backgroundColor": "x",
              "placement": "Top",
              "thickness": 1,
              "position": "fixed"
            }
          },
          "chat": {
            "container": {
              "maxWidth": "x",
              "maxHeight": "x",
              "backgroundColor": "x",
              "color": "x",
              "blur": 1,
              "opacity": 1,
              "shadow": "none",
              "border": {
                "thickness": 1,
                "color": "x",
                "roundeness": "none",
                "customRoundeness": 1,
                "opacity": 1
              }
            },
            "hostAvatar": {
              "isEnabled": true,
              "url": "x"
            },
            "guestAvatar": {
              "isEnabled": true,
              "url": "x"
            },
            "hostBubbles": {
              "backgroundColor": "x",
              "color": "x",
              "blur": 1,
              "opacity": 1,
              "shadow": "none",
              "border": {
                "thickness": 1,
                "color": "x",
                "roundeness": "none",
                "customRoundeness": 1,
                "opacity": 1
              }
            },
            "guestBubbles": {
              "backgroundColor": "x",
              "color": "x",
              "blur": 1,
              "opacity": 1,
              "shadow": "none",
              "border": {
                "thickness": 1,
                "color": "x",
                "roundeness": "none",
                "customRoundeness": 1,
                "opacity": 1
              }
            },
            "buttons": {
              "backgroundColor": "x",
              "color": "x",
              "blur": 1,
              "opacity": 1,
              "shadow": "none",
              "border": {
                "thickness": 1,
                "color": "x",
                "roundeness": "none",
                "customRoundeness": 1,
                "opacity": 1
              }
            },
            "inputs": {
              "backgroundColor": "x",
              "color": "x",
              "blur": 1,
              "opacity": 1,
              "shadow": "none",
              "border": {
                "thickness": 1,
                "color": "x",
                "roundeness": "none",
                "customRoundeness": 1,
                "opacity": 1
              },
              "placeholderColor": "x"
            },
            "roundness": "none",
            "buttonsInput": {
              "layout": "wrap"
            }
          },
          "customCss": "x"
        },
        "selectedThemeTemplateId": "x",
        "settings": {
          "general": {
            "isBrandingEnabled": true,
            "isTypingEmulationEnabled": true,
            "isInputPrefillEnabled": true,
            "isHideQueryParamsEnabled": true,
            "isNewResultOnRefreshEnabled": true,
            "rememberUser": {
              "isEnabled": true,
              "storage": "session"
            },
            "systemMessages": {
              "invalidMessage": "x",
              "botClosed": "x",
              "networkErrorTitle": "x",
              "networkErrorMessage": "x",
              "popupBlockedTitle": "x",
              "popupBlockedDescription": "x",
              "popupBlockedButtonLabel": "x",
              "fileUploadError": "x",
              "fileUploadSizeError": "x",
              "whatsAppPictureChoiceSelectLabel": "x"
            }
          },
          "typingEmulation": {
            "enabled": true,
            "speed": 1,
            "maxDelay": 1,
            "delayBetweenBubbles": 1,
            "isDisabledOnFirstMessage": true
          },
          "metadata": {
            "title": "x",
            "description": "x",
            "imageUrl": "x",
            "favIconUrl": "x",
            "customHeadCode": "x",
            "googleTagManagerId": "x",
            "allowIndexing": true
          },
          "publicShare": {
            "isEnabled": true
          },
          "security": {
            "allowedOrigins": [
              "x"
            ]
          }
        },
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "icon": "x",
        "folderId": "x",
        "publicId": "x",
        "customDomain": "x",
        "workspaceId": "x",
        "resultsTablePreferences": {
          "columnsOrder": [
            "x"
          ],
          "columnsVisibility": {},
          "columnsWidth": {}
        },
        "isArchived": true,
        "isClosed": true,
        "whatsAppCredentialsId": "x",
        "riskLevel": 1,
        "spaceId": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "typebot",
    "accessor": "Typebot",
    "op": "list",
    "method": "GET",
    "path": "/v1/typebots",
    "args": [],
    "select": {
      "workspace_id": "v1",
      "folder_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "workspaceId",
      "folderId"
    ],
    "queryArgs": [
      {
        "name": "folder_id",
        "wire": "folderId"
      },
      {
        "name": "workspace_id",
        "wire": "workspaceId"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "typebots": [
        {
          "name": "x",
          "icon": "x",
          "id": "x",
          "spaceId": "x",
          "createdAt": "2026-01-01T00:00:00Z",
          "publishedTypebotId": "x",
          "accessRight": "read"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "typebot",
    "accessor": "Typebot",
    "op": "load",
    "method": "GET",
    "path": "/v1/typebots/{typebotId}",
    "args": [
      {
        "name": "id",
        "wire": "typebotId",
        "value": "p1"
      }
    ],
    "select": {
      "migrate_to_latest_version": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "migrateToLatestVersion"
    ],
    "queryArgs": [
      {
        "name": "migrate_to_latest_version",
        "wire": "migrateToLatestVersion"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "typebot": {
        "version": "6",
        "id": "x",
        "name": "x",
        "events": [
          {
            "id": "x",
            "outgoingEdgeId": "x",
            "graphCoordinates": {},
            "options": {}
          }
        ],
        "groups": [
          {
            "id": "x",
            "title": "x",
            "graphCoordinates": {
              "x": 1,
              "y": 1
            },
            "blocks": []
          }
        ],
        "edges": [
          {
            "id": "x",
            "from": {},
            "to": {
              "groupId": "x",
              "blockId": "x"
            }
          }
        ],
        "variables": [
          {
            "id": "x",
            "name": "x",
            "isSessionVariable": true
          }
        ],
        "theme": {
          "general": {
            "font": "x",
            "background": {
              "type": "Color",
              "content": "x"
            },
            "progressBar": {
              "isEnabled": true,
              "color": "x",
              "backgroundColor": "x",
              "placement": "Top",
              "thickness": 1,
              "position": "fixed"
            }
          },
          "chat": {
            "container": {
              "maxWidth": "x",
              "maxHeight": "x",
              "backgroundColor": "x",
              "color": "x",
              "blur": 1,
              "opacity": 1,
              "shadow": "none",
              "border": {}
            },
            "hostAvatar": {
              "isEnabled": true,
              "url": "x"
            },
            "guestAvatar": {
              "isEnabled": true,
              "url": "x"
            },
            "hostBubbles": {
              "backgroundColor": "x",
              "color": "x",
              "blur": 1,
              "opacity": 1,
              "shadow": "none",
              "border": {}
            },
            "guestBubbles": {
              "backgroundColor": "x",
              "color": "x",
              "blur": 1,
              "opacity": 1,
              "shadow": "none",
              "border": {}
            },
            "buttons": {
              "backgroundColor": "x",
              "color": "x",
              "blur": 1,
              "opacity": 1,
              "shadow": "none",
              "border": {}
            },
            "inputs": {
              "backgroundColor": "x",
              "color": "x",
              "blur": 1,
              "opacity": 1,
              "shadow": "none",
              "border": {},
              "placeholderColor": "x"
            },
            "roundness": "none",
            "buttonsInput": {
              "layout": "wrap"
            }
          },
          "customCss": "x"
        },
        "selectedThemeTemplateId": "x",
        "settings": {
          "general": {
            "isBrandingEnabled": true,
            "isTypingEmulationEnabled": true,
            "isInputPrefillEnabled": true,
            "isHideQueryParamsEnabled": true,
            "isNewResultOnRefreshEnabled": true,
            "rememberUser": {
              "isEnabled": true,
              "storage": "session"
            },
            "systemMessages": {
              "invalidMessage": "x",
              "botClosed": "x",
              "networkErrorTitle": "x",
              "networkErrorMessage": "x",
              "popupBlockedTitle": "x",
              "popupBlockedDescription": "x",
              "popupBlockedButtonLabel": "x",
              "fileUploadError": "x",
              "fileUploadSizeError": "x",
              "whatsAppPictureChoiceSelectLabel": "x"
            }
          },
          "typingEmulation": {
            "enabled": true,
            "speed": 1,
            "maxDelay": 1,
            "delayBetweenBubbles": 1,
            "isDisabledOnFirstMessage": true
          },
          "metadata": {
            "title": "x",
            "description": "x",
            "imageUrl": "x",
            "favIconUrl": "x",
            "customHeadCode": "x",
            "googleTagManagerId": "x",
            "allowIndexing": true
          },
          "publicShare": {
            "isEnabled": true
          },
          "security": {
            "allowedOrigins": [
              "x"
            ]
          }
        },
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "icon": "x",
        "folderId": "x",
        "publicId": "x",
        "customDomain": "x",
        "workspaceId": "x",
        "resultsTablePreferences": {
          "columnsOrder": [
            "x"
          ],
          "columnsVisibility": {},
          "columnsWidth": {}
        },
        "isArchived": true,
        "isClosed": true,
        "whatsAppCredentialsId": "x",
        "riskLevel": 1,
        "spaceId": "x"
      },
      "currentUserMode": "guest"
    },
    "idField": "id"
  },
  {
    "entity": "typebot",
    "accessor": "Typebot",
    "op": "load",
    "method": "GET",
    "path": "/v1/typebots/{typebotId}/publishedTypebot",
    "action": "published_typebot",
    "args": [
      {
        "name": "id",
        "wire": "typebotId",
        "value": "p1"
      }
    ],
    "select": {
      "migrate_to_latest_version": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "migrateToLatestVersion"
    ],
    "queryArgs": [
      {
        "name": "migrate_to_latest_version",
        "wire": "migrateToLatestVersion"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "publishedTypebot": {
        "id": "x",
        "version": "6",
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "lastActivityAt": "2026-01-01T00:00:00Z",
        "typebotId": "x",
        "groups": [
          {
            "id": "x",
            "title": "x",
            "graphCoordinates": {},
            "blocks": []
          }
        ],
        "events": [
          {}
        ],
        "edges": [
          {
            "id": "x",
            "to": {}
          }
        ],
        "variables": [
          {
            "id": "x",
            "name": "x",
            "isSessionVariable": true
          }
        ],
        "theme": {
          "general": {
            "background": {},
            "progressBar": {}
          },
          "chat": {
            "container": {},
            "hostAvatar": {},
            "guestAvatar": {},
            "hostBubbles": {},
            "guestBubbles": {},
            "buttons": {},
            "inputs": {},
            "roundness": "none",
            "buttonsInput": {}
          },
          "customCss": "x"
        },
        "settings": {
          "general": {
            "isBrandingEnabled": true,
            "isTypingEmulationEnabled": true,
            "isInputPrefillEnabled": true,
            "isHideQueryParamsEnabled": true,
            "isNewResultOnRefreshEnabled": true,
            "rememberUser": {},
            "systemMessages": {}
          },
          "typingEmulation": {
            "enabled": true,
            "speed": 1,
            "maxDelay": 1,
            "delayBetweenBubbles": 1,
            "isDisabledOnFirstMessage": true
          },
          "metadata": {
            "title": "x",
            "description": "x",
            "imageUrl": "x",
            "favIconUrl": "x",
            "customHeadCode": "x",
            "googleTagManagerId": "x",
            "allowIndexing": true
          },
          "publicShare": {
            "isEnabled": true
          },
          "security": {
            "allowedOrigins": []
          }
        }
      },
      "version": "3"
    },
    "idField": "id"
  },
  {
    "entity": "typebot",
    "accessor": "Typebot",
    "op": "remove",
    "method": "DELETE",
    "path": "/v1/typebots/{typebotId}",
    "args": [
      {
        "name": "id",
        "wire": "typebotId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "typebot",
    "accessor": "Typebot",
    "op": "update",
    "method": "PATCH",
    "path": "/v1/typebots/{typebotId}",
    "args": [
      {
        "name": "id",
        "wire": "typebotId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "typebot": {
        "version": "6",
        "id": "x",
        "name": "x",
        "events": [
          {
            "id": "x",
            "outgoingEdgeId": "x",
            "graphCoordinates": {
              "x": 1,
              "y": 1
            },
            "options": {
              "command": "x",
              "resumeAfter": true
            }
          }
        ],
        "groups": [
          {
            "id": "x",
            "title": "x",
            "graphCoordinates": {
              "x": 1,
              "y": 1
            },
            "blocks": [
              {}
            ]
          }
        ],
        "edges": [
          {
            "id": "x",
            "from": {
              "blockId": "x",
              "itemId": "x",
              "pathId": "x"
            },
            "to": {
              "groupId": "x",
              "blockId": "x"
            }
          }
        ],
        "variables": [
          {
            "id": "x",
            "name": "x",
            "isSessionVariable": true,
            "value": "x"
          }
        ],
        "theme": {
          "general": {
            "font": "x",
            "background": {
              "type": "Color",
              "content": "x"
            },
            "progressBar": {
              "isEnabled": true,
              "color": "x",
              "backgroundColor": "x",
              "placement": "Top",
              "thickness": 1,
              "position": "fixed"
            }
          },
          "chat": {
            "container": {
              "maxWidth": "x",
              "maxHeight": "x",
              "backgroundColor": "x",
              "color": "x",
              "blur": 1,
              "opacity": 1,
              "shadow": "none",
              "border": {
                "thickness": 1,
                "color": "x",
                "roundeness": "none",
                "customRoundeness": 1,
                "opacity": 1
              }
            },
            "hostAvatar": {
              "isEnabled": true,
              "url": "x"
            },
            "guestAvatar": {
              "isEnabled": true,
              "url": "x"
            },
            "hostBubbles": {
              "backgroundColor": "x",
              "color": "x",
              "blur": 1,
              "opacity": 1,
              "shadow": "none",
              "border": {
                "thickness": 1,
                "color": "x",
                "roundeness": "none",
                "customRoundeness": 1,
                "opacity": 1
              }
            },
            "guestBubbles": {
              "backgroundColor": "x",
              "color": "x",
              "blur": 1,
              "opacity": 1,
              "shadow": "none",
              "border": {
                "thickness": 1,
                "color": "x",
                "roundeness": "none",
                "customRoundeness": 1,
                "opacity": 1
              }
            },
            "buttons": {
              "backgroundColor": "x",
              "color": "x",
              "blur": 1,
              "opacity": 1,
              "shadow": "none",
              "border": {
                "thickness": 1,
                "color": "x",
                "roundeness": "none",
                "customRoundeness": 1,
                "opacity": 1
              }
            },
            "inputs": {
              "backgroundColor": "x",
              "color": "x",
              "blur": 1,
              "opacity": 1,
              "shadow": "none",
              "border": {
                "thickness": 1,
                "color": "x",
                "roundeness": "none",
                "customRoundeness": 1,
                "opacity": 1
              },
              "placeholderColor": "x"
            },
            "roundness": "none",
            "buttonsInput": {
              "layout": "wrap"
            }
          },
          "customCss": "x"
        },
        "selectedThemeTemplateId": "x",
        "settings": {
          "general": {
            "isBrandingEnabled": true,
            "isTypingEmulationEnabled": true,
            "isInputPrefillEnabled": true,
            "isHideQueryParamsEnabled": true,
            "isNewResultOnRefreshEnabled": true,
            "rememberUser": {
              "isEnabled": true,
              "storage": "session"
            },
            "systemMessages": {
              "invalidMessage": "x",
              "botClosed": "x",
              "networkErrorTitle": "x",
              "networkErrorMessage": "x",
              "popupBlockedTitle": "x",
              "popupBlockedDescription": "x",
              "popupBlockedButtonLabel": "x",
              "fileUploadError": "x",
              "fileUploadSizeError": "x",
              "whatsAppPictureChoiceSelectLabel": "x"
            }
          },
          "typingEmulation": {
            "enabled": true,
            "speed": 1,
            "maxDelay": 1,
            "delayBetweenBubbles": 1,
            "isDisabledOnFirstMessage": true
          },
          "metadata": {
            "title": "x",
            "description": "x",
            "imageUrl": "x",
            "favIconUrl": "x",
            "customHeadCode": "x",
            "googleTagManagerId": "x",
            "allowIndexing": true
          },
          "publicShare": {
            "isEnabled": true
          },
          "security": {
            "allowedOrigins": [
              "x"
            ]
          }
        },
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "icon": "x",
        "folderId": "x",
        "publicId": "x",
        "customDomain": "x",
        "workspaceId": "x",
        "resultsTablePreferences": {
          "columnsOrder": [
            "x"
          ],
          "columnsVisibility": {},
          "columnsWidth": {}
        },
        "isArchived": true,
        "isClosed": true,
        "whatsAppCredentialsId": "x",
        "riskLevel": 1,
        "spaceId": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "workspace",
    "accessor": "Workspace",
    "op": "create",
    "method": "POST",
    "path": "/v1/workspaces",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "workspace": {
        "id": "x",
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "name": "x",
        "icon": "x",
        "plan": "FREE",
        "stripeId": "x",
        "settings": {},
        "isSuspended": true,
        "isPastDue": true,
        "isVerified": true,
        "chatsHardLimit": 1,
        "lastActivityAt": "2026-01-01T00:00:00Z",
        "inactiveFirstEmailSentAt": "2026-01-01T00:00:00Z",
        "inactiveSecondEmailSentAt": "2026-01-01T00:00:00Z"
      }
    },
    "idField": "id"
  },
  {
    "entity": "workspace",
    "accessor": "Workspace",
    "op": "list",
    "method": "GET",
    "path": "/v1/workspaces/{workspaceId}/members",
    "action": "member",
    "args": [
      {
        "name": "id",
        "wire": "workspaceId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "members": [
        {
          "workspaceId": "x",
          "userId": "x",
          "user": {
            "name": "x",
            "email": "x",
            "image": "x"
          },
          "role": "ADMIN"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "workspace",
    "accessor": "Workspace",
    "op": "list",
    "method": "GET",
    "path": "/v1/workspaces",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "workspaces": [
        {
          "id": "x",
          "name": "x",
          "icon": "x",
          "plan": "FREE"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "workspace",
    "accessor": "Workspace",
    "op": "load",
    "method": "GET",
    "path": "/v1/workspaces/{workspaceId}",
    "args": [
      {
        "name": "id",
        "wire": "workspaceId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "workspace": {
        "id": "x",
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "name": "x",
        "icon": "x",
        "plan": "FREE",
        "stripeId": "x",
        "settings": {},
        "customChatsLimit": 1,
        "customSeatsLimit": 1,
        "isSuspended": true,
        "isPastDue": true,
        "isVerified": true,
        "chatsHardLimit": 1,
        "lastActivityAt": "2026-01-01T00:00:00Z",
        "inactiveFirstEmailSentAt": "2026-01-01T00:00:00Z",
        "inactiveSecondEmailSentAt": "2026-01-01T00:00:00Z"
      },
      "currentUserMode": "read"
    },
    "idField": "id"
  },
  {
    "entity": "workspace",
    "accessor": "Workspace",
    "op": "remove",
    "method": "DELETE",
    "path": "/v1/workspaces/{workspaceId}",
    "args": [
      {
        "name": "id",
        "wire": "workspaceId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "message": "x"
    },
    "idField": "id"
  },
  {
    "entity": "workspace",
    "accessor": "Workspace",
    "op": "update",
    "method": "PATCH",
    "path": "/v1/workspaces/{workspaceId}",
    "args": [
      {
        "name": "id",
        "wire": "workspaceId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "workspace": {
        "name": "x",
        "icon": "x"
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
