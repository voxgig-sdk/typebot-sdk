"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const DebugFeature_1 = require("./feature/debug/DebugFeature");
const IdempotencyFeature_1 = require("./feature/idempotency/IdempotencyFeature");
const MetricsFeature_1 = require("./feature/metrics/MetricsFeature");
const PagingFeature_1 = require("./feature/paging/PagingFeature");
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    debug: DebugFeature_1.DebugFeature,
    idempotency: IdempotencyFeature_1.IdempotencyFeature,
    metrics: MetricsFeature_1.MetricsFeature,
    paging: PagingFeature_1.PagingFeature,
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Typebot',
        slug: "typebot",
        version: "0.1.1",
        target: "ts",
    };
    feature = {
        debug: {
            "options": {
                "active": false,
                "max": 100,
                "redact": [
                    "authorization",
                    "cookie",
                    "set-cookie",
                    "api-key",
                    "apikey",
                    "x-api-key",
                    "idempotency-key"
                ]
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "onEntry": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        idempotency: {
            "options": {
                "active": false,
                "header": "Idempotency-Key",
                "methods": [
                    "POST",
                    "PUT",
                    "PATCH",
                    "DELETE"
                ],
                "ops": [
                    "create",
                    "update",
                    "remove"
                ]
            },
            "optspec": {
                "keygen": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        metrics: {
            "options": {
                "active": false
            },
            "optspec": {
                "now": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        paging: {
            "options": {
                "active": false,
                "afterVar": "after",
                "cursorParam": "cursor",
                "firstVar": "first",
                "limitParam": "limit",
                "pageParam": "page",
                "startPage": 1
            },
            "optspec": {
                "limit": "`$NUMBER`",
                "ops": "`$LIST`"
            },
            "strict": false,
            "transport": "none"
        },
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
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
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://app.typebot.com/api",
        auth: {
            prefix: 'Bearer',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            analytics: {},
            billing: {},
            folder: {},
            result: {},
            typebot: {},
            workspace: {},
        }
    };
    entity = {
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
                                    "lit": "v1"
                                },
                                {
                                    "lit": "typebots"
                                },
                                {
                                    "var": "typebot_id"
                                },
                                {
                                    "lit": "analytics"
                                },
                                {
                                    "lit": "stats"
                                }
                            ],
                            "parts": [
                                "v1",
                                "typebots",
                                "{typebot_id}",
                                "analytics",
                                "stats"
                            ],
                            "rename": {
                                "param": {
                                    "typebotId": "typebot_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.stats`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "typebot_id",
                                        "orig": "typebot_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "time_filter",
                                        "orig": "time_filter",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "last7Days"
                                    },
                                    {
                                        "name": "time_zone",
                                        "orig": "time_zone",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "stat",
                                "exist": [
                                    "time_filter",
                                    "time_zone",
                                    "typebot_id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.typebot"
                    ]
                ]
            }
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
                                    "lit": "v1"
                                },
                                {
                                    "lit": "billing"
                                },
                                {
                                    "lit": "invoices"
                                }
                            ],
                            "parts": [
                                "v1",
                                "billing",
                                "invoices"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.invoices`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "invoice",
                                "exist": [
                                    "workspace_id"
                                ]
                            }
                        }
                    ]
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
                                    "lit": "v1"
                                },
                                {
                                    "lit": "billing"
                                },
                                {
                                    "lit": "usage"
                                }
                            ],
                            "parts": [
                                "v1",
                                "billing",
                                "usage"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "usage",
                                "exist": [
                                    "workspace_id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "folder": {
            "fields": [
                {
                    "name": "createdAt",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "date-time"
                },
                {
                    "name": "folder",
                    "title": "Folder",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "folderName",
                    "title": "Folder Name",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "parentFolderId",
                    "title": "Parent Folder Id",
                    "type": "`$ANY`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "updatedAt",
                    "title": "Updated At",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "date-time"
                },
                {
                    "name": "workspaceId",
                    "title": "Workspace Id",
                    "type": "`$STRING`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
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
                                    "lit": "v1"
                                },
                                {
                                    "lit": "folders"
                                }
                            ],
                            "parts": [
                                "v1",
                                "folders"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.folder`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
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
                                    "lit": "v1"
                                },
                                {
                                    "lit": "folders"
                                }
                            ],
                            "parts": [
                                "v1",
                                "folders"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.folders`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "parent_folder_id",
                                        "orig": "parent_folder_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "parent_folder_id",
                                    "workspace_id"
                                ]
                            }
                        }
                    ]
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
                                    "lit": "v1"
                                },
                                {
                                    "lit": "folders"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v1",
                                "folders",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "folderId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.folder`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "folder_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "workspace_id"
                                ]
                            }
                        }
                    ]
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
                                    "lit": "v1"
                                },
                                {
                                    "lit": "folders"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v1",
                                "folders",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "folderId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.folder`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "folder_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
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
                                    "lit": "v1"
                                },
                                {
                                    "lit": "folders"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v1",
                                "folders",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "folderId": "id"
                                }
                            },
                            "transform": {
                                "req": {
                                    "folder": "`reqdata`"
                                },
                                "res": "`body.folder`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "folder_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "result": {
            "fields": [
                {
                    "name": "answers",
                    "title": "Answers",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "createdAt",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "date-time"
                },
                {
                    "name": "hasStarted",
                    "title": "Has Started",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "isArchived",
                    "title": "Is Archived",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "isCompleted",
                    "title": "Is Completed",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "lastChatSessionId",
                    "title": "Last Chat Session Id",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "typebotId",
                    "title": "Typebot Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "variables",
                    "title": "Variables",
                    "type": "`$ARRAY`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
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
                            "orig": "/v1/typebots/{typebotId}/results",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "typebots"
                                },
                                {
                                    "var": "typebot_id"
                                },
                                {
                                    "lit": "results"
                                }
                            ],
                            "parts": [
                                "v1",
                                "typebots",
                                "{typebot_id}",
                                "results"
                            ],
                            "rename": {
                                "param": {
                                    "typebotId": "typebot_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "typebot_id",
                                        "orig": "typebot_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$NUMBER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "time_filter",
                                        "orig": "time_filter",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "last7Days"
                                    },
                                    {
                                        "name": "time_zone",
                                        "orig": "time_zone",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cursor",
                                    "limit",
                                    "time_filter",
                                    "time_zone",
                                    "typebot_id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/typebots/{typebotId}/results/{resultId}/logs",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "typebots"
                                },
                                {
                                    "var": "typebot_id"
                                },
                                {
                                    "lit": "results"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "logs"
                                }
                            ],
                            "parts": [
                                "v1",
                                "typebots",
                                "{typebot_id}",
                                "results",
                                "{id}",
                                "logs"
                            ],
                            "rename": {
                                "param": {
                                    "resultId": "id",
                                    "typebotId": "typebot_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.logs`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "result_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "typebot_id",
                                        "orig": "typebot_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "log",
                                "exist": [
                                    "id",
                                    "typebot_id"
                                ]
                            }
                        }
                    ]
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
                                    "lit": "v1"
                                },
                                {
                                    "lit": "typebots"
                                },
                                {
                                    "var": "typebot_id"
                                },
                                {
                                    "lit": "results"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v1",
                                "typebots",
                                "{typebot_id}",
                                "results",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "resultId": "id",
                                    "typebotId": "typebot_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.result`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "result_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "typebot_id",
                                        "orig": "typebot_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "typebot_id"
                                ]
                            }
                        }
                    ]
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
                                    "lit": "v1"
                                },
                                {
                                    "lit": "typebots"
                                },
                                {
                                    "var": "typebot_id"
                                },
                                {
                                    "lit": "results"
                                }
                            ],
                            "parts": [
                                "v1",
                                "typebots",
                                "{typebot_id}",
                                "results"
                            ],
                            "rename": {
                                "param": {
                                    "typebotId": "typebot_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "typebot_id",
                                        "orig": "typebot_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "typebot_id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.typebot"
                    ]
                ]
            }
        },
        "typebot": {
            "fields": [
                {
                    "name": "accessRight",
                    "title": "Access Right",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "createdAt",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "date-time"
                },
                {
                    "name": "customDomain",
                    "title": "Custom Domain",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "edges",
                    "title": "Edges",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "events",
                    "title": "Events",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "folderId",
                    "title": "Folder Id",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "groups",
                    "title": "Groups",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "icon",
                    "title": "Icon",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "isArchived",
                    "title": "Is Archived",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "isClosed",
                    "title": "Is Closed",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "overwrite",
                    "title": "Overwrite",
                    "type": "`$BOOLEAN`",
                    "short": "If true, even if we detect a conflict, we will overwrite push the updates to the typebot"
                },
                {
                    "name": "publicId",
                    "title": "Public Id",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "publishedTypebotId",
                    "title": "Published Typebot Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "resultsTablePreferences",
                    "title": "Results Table Preferences",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "riskLevel",
                    "title": "Risk Level",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "selectedThemeTemplateId",
                    "title": "Selected Theme Template Id",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "settings",
                    "title": "Settings",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "spaceId",
                    "title": "Space Id",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "theme",
                    "title": "Theme",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "typebot",
                    "title": "Typebot",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "updatedAt",
                    "title": "Updated At",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "date-time"
                },
                {
                    "name": "variables",
                    "title": "Variables",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "version",
                    "title": "Version",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "whatsAppCredentialsId",
                    "title": "Whats App Credentials Id",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "workspaceId",
                    "title": "Workspace Id",
                    "type": "`$STRING`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
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
                                    "lit": "v1"
                                },
                                {
                                    "lit": "typebots"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "publish"
                                }
                            ],
                            "parts": [
                                "v1",
                                "typebots",
                                "{id}",
                                "publish"
                            ],
                            "rename": {
                                "param": {
                                    "typebotId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "typebot_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "publish",
                                "exist": [
                                    "id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v1/typebots/{typebotId}/unpublish",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "typebots"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "unpublish"
                                }
                            ],
                            "parts": [
                                "v1",
                                "typebots",
                                "{id}",
                                "unpublish"
                            ],
                            "rename": {
                                "param": {
                                    "typebotId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "typebot_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "unpublish",
                                "exist": [
                                    "id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v1/typebots",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "typebots"
                                }
                            ],
                            "parts": [
                                "v1",
                                "typebots"
                            ],
                            "rename": {},
                            "transform": {
                                "req": {
                                    "typebot": "`reqdata`"
                                },
                                "res": "`body.typebot`"
                            },
                            "args": {},
                            "select": {}
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v1/typebots/import",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "typebots"
                                },
                                {
                                    "lit": "import"
                                }
                            ],
                            "parts": [
                                "v1",
                                "typebots",
                                "import"
                            ],
                            "rename": {},
                            "transform": {
                                "req": {
                                    "typebot": "`reqdata`"
                                },
                                "res": "`body.typebot`"
                            },
                            "args": {},
                            "select": {
                                "$action": "import"
                            }
                        }
                    ]
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
                                    "lit": "v1"
                                },
                                {
                                    "lit": "typebots"
                                }
                            ],
                            "parts": [
                                "v1",
                                "typebots"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.typebots`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "folder_id",
                                        "orig": "folder_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "folder_id",
                                    "workspace_id"
                                ]
                            }
                        }
                    ]
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
                                    "lit": "v1"
                                },
                                {
                                    "lit": "typebots"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v1",
                                "typebots",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "typebotId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.typebot`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "typebot_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "migrate_to_latest_version",
                                        "orig": "migrate_to_latest_version",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "migrate_to_latest_version"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/typebots/{typebotId}/publishedTypebot",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "typebots"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "publishedTypebot"
                                }
                            ],
                            "parts": [
                                "v1",
                                "typebots",
                                "{id}",
                                "publishedTypebot"
                            ],
                            "rename": {
                                "param": {
                                    "typebotId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "typebot_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "migrate_to_latest_version",
                                        "orig": "migrate_to_latest_version",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    }
                                ]
                            },
                            "select": {
                                "$action": "published_typebot",
                                "exist": [
                                    "id",
                                    "migrate_to_latest_version"
                                ]
                            }
                        }
                    ]
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
                                    "lit": "v1"
                                },
                                {
                                    "lit": "typebots"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v1",
                                "typebots",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "typebotId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "typebot_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
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
                                    "lit": "v1"
                                },
                                {
                                    "lit": "typebots"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v1",
                                "typebots",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "typebotId": "id"
                                }
                            },
                            "transform": {
                                "req": {
                                    "typebot": "`reqdata`"
                                },
                                "res": "`body.typebot`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "typebot_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "workspace": {
            "fields": [
                {
                    "name": "chatsHardLimit",
                    "title": "Chats Hard Limit",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "createdAt",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "date-time"
                },
                {
                    "name": "customChatsLimit",
                    "title": "Custom Chats Limit",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "customSeatsLimit",
                    "title": "Custom Seats Limit",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "icon",
                    "title": "Icon",
                    "type": "`$ANY`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "inactiveFirstEmailSentAt",
                    "title": "Inactive First Email Sent At",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "inactiveSecondEmailSentAt",
                    "title": "Inactive Second Email Sent At",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "isPastDue",
                    "title": "Is Past Due",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "isSuspended",
                    "title": "Is Suspended",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "isVerified",
                    "title": "Is Verified",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "lastActivityAt",
                    "title": "Last Activity At",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "plan",
                    "title": "Plan",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "settings",
                    "title": "Settings",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "stripeId",
                    "title": "Stripe Id",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "updatedAt",
                    "title": "Updated At",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "date-time"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
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
                                    "lit": "v1"
                                },
                                {
                                    "lit": "workspaces"
                                }
                            ],
                            "parts": [
                                "v1",
                                "workspaces"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.workspace`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
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
                                    "lit": "v1"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "members"
                                }
                            ],
                            "parts": [
                                "v1",
                                "workspaces",
                                "{id}",
                                "members"
                            ],
                            "rename": {
                                "param": {
                                    "workspaceId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.members`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "workspace_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "member",
                                "exist": [
                                    "id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/workspaces",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "workspaces"
                                }
                            ],
                            "parts": [
                                "v1",
                                "workspaces"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.workspaces`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
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
                                    "lit": "v1"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v1",
                                "workspaces",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "workspaceId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.workspace`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "workspace_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
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
                                    "lit": "v1"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v1",
                                "workspaces",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "workspaceId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "workspace_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
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
                                    "lit": "v1"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v1",
                                "workspaces",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "workspaceId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.workspace`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "workspace_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map