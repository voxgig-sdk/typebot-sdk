<?php
declare(strict_types=1);

// Typebot SDK configuration

class TypebotConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Typebot",
                "slug" => "typebot",
                "version" => "0.1.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://app.typebot.com/api",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "analytics" => [],
                    "billing" => [],
                    "folder" => [],
                    "result" => [],
                    "typebot" => [],
                    "workspace" => [],
                ],
            ],
            "entity" => [
        'analytics' => [
          'fields' => [
            [
              'name' => 'totalCompleted',
              'req' => true,
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'totalStarts',
              'req' => true,
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'totalViews',
              'req' => true,
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'analytics',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'typebot_id',
                        'orig' => 'typebot_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 'last7Days',
                        'kind' => 'query',
                        'name' => 'time_filter',
                        'orig' => 'time_filter',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'time_zone',
                        'orig' => 'time_zone',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/typebots/{typebotId}/analytics/stats',
                  'rename' => [
                    'param' => [
                      'typebotId' => 'typebot_id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'typebots',
                    ],
                    [
                      'var' => 'typebot_id',
                    ],
                    [
                      'lit' => 'analytics',
                    ],
                    [
                      'lit' => 'stats',
                    ],
                  ],
                  'select' => [
                    '$action' => 'stat',
                    'exist' => [
                      'time_filter',
                      'time_zone',
                      'typebot_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.stats`',
                  ],
                  'parts' => [
                    'v1',
                    'typebots',
                    '{typebot_id}',
                    'analytics',
                    'stats',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'typebot',
              ],
            ],
          ],
        ],
        'billing' => [
          'fields' => [
            [
              'name' => 'amount',
              'req' => true,
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'currency',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'date',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'id',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'format' => 'date-time',
              'name' => 'resetsAt',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'totalChatsUsed',
              'req' => true,
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'url',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'billing',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'workspace_id',
                        'orig' => 'workspace_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/billing/invoices',
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'billing',
                    ],
                    [
                      'lit' => 'invoices',
                    ],
                  ],
                  'select' => [
                    '$action' => 'invoice',
                    'exist' => [
                      'workspace_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.invoices`',
                  ],
                  'parts' => [
                    'v1',
                    'billing',
                    'invoices',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'workspace_id',
                        'orig' => 'workspace_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/billing/usage',
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'billing',
                    ],
                    [
                      'lit' => 'usage',
                    ],
                  ],
                  'select' => [
                    '$action' => 'usage',
                    'exist' => [
                      'workspace_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'v1',
                    'billing',
                    'usage',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'folder' => [
          'fields' => [
            [
              'format' => 'date-time',
              'name' => 'createdAt',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'folder',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'folderName',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'op' => [
                'create' => [
                  'type' => '`$STRING`',
                ],
              ],
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'parentFolderId',
              'op' => [
                'create' => [
                  'type' => '`$STRING`',
                ],
              ],
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'format' => 'date-time',
              'name' => 'updatedAt',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'workspaceId',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'folder',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/v1/folders',
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'folders',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.folder`',
                  ],
                  'parts' => [
                    'v1',
                    'folders',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'parent_folder_id',
                        'orig' => 'parent_folder_id',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'workspace_id',
                        'orig' => 'workspace_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/folders',
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'folders',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'parent_folder_id',
                      'workspace_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.folders`',
                  ],
                  'parts' => [
                    'v1',
                    'folders',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'folder_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'workspace_id',
                        'orig' => 'workspace_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/folders/{folderId}',
                  'rename' => [
                    'param' => [
                      'folderId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'folders',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                      'workspace_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.folder`',
                  ],
                  'parts' => [
                    'v1',
                    'folders',
                    '{id}',
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'folder_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/v1/folders/{folderId}',
                  'rename' => [
                    'param' => [
                      'folderId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'folders',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.folder`',
                  ],
                  'parts' => [
                    'v1',
                    'folders',
                    '{id}',
                  ],
                ],
              ],
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'folder_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'PATCH',
                  'orig' => '/v1/folders/{folderId}',
                  'rename' => [
                    'param' => [
                      'folderId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'folders',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => [
                      'folder' => '`reqdata`',
                    ],
                    'res' => '`body.folder`',
                  ],
                  'parts' => [
                    'v1',
                    'folders',
                    '{id}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'result' => [
          'fields' => [
            [
              'name' => 'answers',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'context',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'format' => 'date-time',
              'name' => 'createdAt',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'details',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'hasStarted',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'id',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'isArchived',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'isCompleted',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'lastChatSessionId',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'resultId',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'status',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'typebotId',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'variables',
              'req' => true,
              'type' => '`$ARRAY`',
              'union' => [
                'branches' => 2,
                'count' => 1,
                'depth' => 3,
              ],
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'result',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'typebot_id',
                        'orig' => 'typebot_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'cursor',
                        'orig' => 'cursor',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => 50,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => 'last7Days',
                        'kind' => 'query',
                        'name' => 'time_filter',
                        'orig' => 'time_filter',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'time_zone',
                        'orig' => 'time_zone',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/typebots/{typebotId}/results',
                  'rename' => [
                    'param' => [
                      'typebotId' => 'typebot_id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'typebots',
                    ],
                    [
                      'var' => 'typebot_id',
                    ],
                    [
                      'lit' => 'results',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'cursor',
                      'limit',
                      'time_filter',
                      'time_zone',
                      'typebot_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'v1',
                    'typebots',
                    '{typebot_id}',
                    'results',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'result_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'typebot_id',
                        'orig' => 'typebot_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/typebots/{typebotId}/results/{resultId}/logs',
                  'rename' => [
                    'param' => [
                      'resultId' => 'id',
                      'typebotId' => 'typebot_id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'typebots',
                    ],
                    [
                      'var' => 'typebot_id',
                    ],
                    [
                      'lit' => 'results',
                    ],
                    [
                      'var' => 'id',
                    ],
                    [
                      'lit' => 'logs',
                    ],
                  ],
                  'select' => [
                    '$action' => 'log',
                    'exist' => [
                      'id',
                      'typebot_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.logs`',
                  ],
                  'parts' => [
                    'v1',
                    'typebots',
                    '{typebot_id}',
                    'results',
                    '{id}',
                    'logs',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'result_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'typebot_id',
                        'orig' => 'typebot_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/typebots/{typebotId}/results/{resultId}',
                  'rename' => [
                    'param' => [
                      'resultId' => 'id',
                      'typebotId' => 'typebot_id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'typebots',
                    ],
                    [
                      'var' => 'typebot_id',
                    ],
                    [
                      'lit' => 'results',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                      'typebot_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.result`',
                  ],
                  'parts' => [
                    'v1',
                    'typebots',
                    '{typebot_id}',
                    'results',
                    '{id}',
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'typebot_id',
                        'orig' => 'typebot_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/v1/typebots/{typebotId}/results',
                  'rename' => [
                    'param' => [
                      'typebotId' => 'typebot_id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'typebots',
                    ],
                    [
                      'var' => 'typebot_id',
                    ],
                    [
                      'lit' => 'results',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'typebot_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'v1',
                    'typebots',
                    '{typebot_id}',
                    'results',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'typebot',
              ],
            ],
          ],
        ],
        'typebot' => [
          'fields' => [
            [
              'name' => 'accessRight',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'format' => 'date-time',
              'name' => 'createdAt',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'customDomain',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'edges',
              'req' => true,
              'type' => '`$ARRAY`',
              'union' => [
                'branches' => 2,
                'count' => 1,
                'depth' => 3,
              ],
            ],
            [
              'name' => 'enableSafetyFlags',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'events',
              'req' => true,
              'type' => '`$ARRAY`',
              'union' => [
                'branches' => 3,
                'count' => 1,
                'depth' => 1,
              ],
            ],
            [
              'name' => 'folderId',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'fromTemplate',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'groups',
              'req' => true,
              'type' => '`$ARRAY`',
              'union' => [
                'branches' => 19,
                'count' => 31,
                'depth' => 14,
              ],
            ],
            [
              'name' => 'icon',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'id',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'isArchived',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'isClosed',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'message',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'name',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'overwrite',
              'short' => 'If true, even if we detect a conflict, we will overwrite push the updates to the typebot',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'publicId',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'publishedTypebot',
              'req' => true,
              'type' => '`$ANY`',
              'union' => [
                'branches' => 19,
                'count' => 51,
                'depth' => 20,
              ],
            ],
            [
              'name' => 'publishedTypebotId',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'resultsTablePreferences',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'riskLevel',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'selectedThemeTemplateId',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'settings',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'spaceId',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'theme',
              'req' => true,
              'type' => '`$OBJECT`',
              'union' => [
                'branches' => 2,
                'count' => 2,
                'depth' => 6,
              ],
            ],
            [
              'name' => 'typebot',
              'req' => true,
              'type' => '`$OBJECT`',
              'union' => [
                'branches' => 19,
                'count' => 88,
                'depth' => 24,
              ],
            ],
            [
              'format' => 'date-time',
              'name' => 'updatedAt',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'variables',
              'req' => true,
              'type' => '`$ARRAY`',
              'union' => [
                'branches' => 2,
                'count' => 1,
                'depth' => 5,
              ],
            ],
            [
              'name' => 'version',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
                'update' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'short' => 'Provides the version the published bot was migrated from if `migrateToLatestVersion` is set to `true`.',
              'type' => '`$ANY`',
              'union' => [
                'branches' => 2,
                'count' => 1,
                'depth' => 0,
              ],
            ],
            [
              'name' => 'warnings',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'whatsAppCredentialsId',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'workspaceId',
              'req' => true,
              'short' => '[Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid)',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'typebot',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'typebot_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/v1/typebots/{typebotId}/publish',
                  'rename' => [
                    'param' => [
                      'typebotId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'typebots',
                    ],
                    [
                      'var' => 'id',
                    ],
                    [
                      'lit' => 'publish',
                    ],
                  ],
                  'select' => [
                    '$action' => 'publish',
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'v1',
                    'typebots',
                    '{id}',
                    'publish',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'typebot_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/v1/typebots/{typebotId}/unpublish',
                  'rename' => [
                    'param' => [
                      'typebotId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'typebots',
                    ],
                    [
                      'var' => 'id',
                    ],
                    [
                      'lit' => 'unpublish',
                    ],
                  ],
                  'select' => [
                    '$action' => 'unpublish',
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'v1',
                    'typebots',
                    '{id}',
                    'unpublish',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/v1/typebots',
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'typebots',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => [
                      'typebot' => '`reqdata`',
                    ],
                    'res' => '`body.typebot`',
                  ],
                  'parts' => [
                    'v1',
                    'typebots',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/v1/typebots/import',
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'typebots',
                    ],
                    [
                      'lit' => 'import',
                    ],
                  ],
                  'select' => [
                    '$action' => 'import',
                  ],
                  'transform' => [
                    'req' => [
                      'typebot' => '`reqdata`',
                    ],
                    'res' => '`body.typebot`',
                  ],
                  'parts' => [
                    'v1',
                    'typebots',
                    'import',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'folder_id',
                        'orig' => 'folder_id',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'workspace_id',
                        'orig' => 'workspace_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/typebots',
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'typebots',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'folder_id',
                      'workspace_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.typebots`',
                  ],
                  'parts' => [
                    'v1',
                    'typebots',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'typebot_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'migrate_to_latest_version',
                        'orig' => 'migrate_to_latest_version',
                        'type' => '`$BOOLEAN`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/typebots/{typebotId}',
                  'rename' => [
                    'param' => [
                      'typebotId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'typebots',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                      'migrate_to_latest_version',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.typebot`',
                  ],
                  'parts' => [
                    'v1',
                    'typebots',
                    '{id}',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'typebot_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'migrate_to_latest_version',
                        'orig' => 'migrate_to_latest_version',
                        'type' => '`$BOOLEAN`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/typebots/{typebotId}/publishedTypebot',
                  'rename' => [
                    'param' => [
                      'typebotId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'typebots',
                    ],
                    [
                      'var' => 'id',
                    ],
                    [
                      'lit' => 'publishedTypebot',
                    ],
                  ],
                  'select' => [
                    '$action' => 'published_typebot',
                    'exist' => [
                      'id',
                      'migrate_to_latest_version',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'v1',
                    'typebots',
                    '{id}',
                    'publishedTypebot',
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'typebot_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/v1/typebots/{typebotId}',
                  'rename' => [
                    'param' => [
                      'typebotId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'typebots',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'v1',
                    'typebots',
                    '{id}',
                  ],
                ],
              ],
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'typebot_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'PATCH',
                  'orig' => '/v1/typebots/{typebotId}',
                  'rename' => [
                    'param' => [
                      'typebotId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'typebots',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => [
                      'typebot' => '`reqdata`',
                    ],
                    'res' => '`body.typebot`',
                  ],
                  'parts' => [
                    'v1',
                    'typebots',
                    '{id}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'workspace' => [
          'fields' => [
            [
              'name' => 'chatsHardLimit',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'format' => 'date-time',
              'name' => 'createdAt',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'customChatsLimit',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'customSeatsLimit',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'icon',
              'op' => [
                'create' => [
                  'type' => '`$STRING`',
                ],
                'update' => [
                  'type' => '`$STRING`',
                ],
              ],
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'id',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'inactiveFirstEmailSentAt',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'inactiveSecondEmailSentAt',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'isPastDue',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'isSuspended',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'isVerified',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'lastActivityAt',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'name',
              'op' => [
                'update' => [
                  'type' => '`$STRING`',
                ],
              ],
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'plan',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'role',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'settings',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'stripeId',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'format' => 'date-time',
              'name' => 'updatedAt',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'user',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'userId',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'workspaceId',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'workspace',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/v1/workspaces',
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'workspaces',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.workspace`',
                  ],
                  'parts' => [
                    'v1',
                    'workspaces',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'workspace_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/workspaces/{workspaceId}/members',
                  'rename' => [
                    'param' => [
                      'workspaceId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'workspaces',
                    ],
                    [
                      'var' => 'id',
                    ],
                    [
                      'lit' => 'members',
                    ],
                  ],
                  'select' => [
                    '$action' => 'member',
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.members`',
                  ],
                  'parts' => [
                    'v1',
                    'workspaces',
                    '{id}',
                    'members',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/workspaces',
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'workspaces',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.workspaces`',
                  ],
                  'parts' => [
                    'v1',
                    'workspaces',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'workspace_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/workspaces/{workspaceId}',
                  'rename' => [
                    'param' => [
                      'workspaceId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'workspaces',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.workspace`',
                  ],
                  'parts' => [
                    'v1',
                    'workspaces',
                    '{id}',
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'workspace_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/v1/workspaces/{workspaceId}',
                  'rename' => [
                    'param' => [
                      'workspaceId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'workspaces',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'v1',
                    'workspaces',
                    '{id}',
                  ],
                ],
              ],
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'workspace_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'PATCH',
                  'orig' => '/v1/workspaces/{workspaceId}',
                  'rename' => [
                    'param' => [
                      'workspaceId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'workspaces',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.workspace`',
                  ],
                  'parts' => [
                    'v1',
                    'workspaces',
                    '{id}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return TypebotFeatures::make_feature($name);
    }
}
