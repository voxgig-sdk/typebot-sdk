// Typed models for the Typebot SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} Analytics
 */

/**
 * @typedef {Object} AnalyticsLoadMatch
 * @property {string} typebot_id
 * @property {string} [time_filter]
 * @property {string} [time_zone]
 */

/**
 * @typedef {Object} Billing
 */

/**
 * @typedef {Object} BillingLoadMatch
 * @property {string} workspace_id
 */

/**
 * @typedef {Object} BillingListMatch
 * @property {string} workspace_id
 */

/**
 * @typedef {Object} Folder
 * @property {string} createdAt
 * @property {Object} folder
 * @property {string} [folderName]
 * @property {string} id
 * @property {string} name
 * @property {*} parentFolderId
 * @property {string} updatedAt
 * @property {string} workspaceId
 */

/**
 * @typedef {Object} FolderLoadMatch
 * @property {string} id
 * @property {string} workspace_id
 */

/**
 * @typedef {Object} FolderListMatch
 * @property {string} [parent_folder_id]
 * @property {string} workspace_id
 */

/**
 * @typedef {Object} FolderCreateData
 * @property {string} createdAt
 * @property {Object} folder
 * @property {string} [folderName]
 * @property {string} id
 * @property {string} name
 * @property {*} parentFolderId
 * @property {string} updatedAt
 * @property {string} workspaceId
 */

/**
 * @typedef {Object} FolderUpdateData
 * @property {string} id
 * @property {string} [createdAt]
 * @property {Object} [folder]
 * @property {string} [folderName]
 * @property {string} [name]
 * @property {*} [parentFolderId]
 * @property {string} [updatedAt]
 * @property {string} [workspaceId]
 */

/**
 * @typedef {Object} FolderRemoveMatch
 * @property {string} id
 */

/**
 * @typedef {Object} Result
 * @property {Array} answers
 * @property {string} createdAt
 * @property {*} hasStarted
 * @property {string} id
 * @property {*} isArchived
 * @property {boolean} isCompleted
 * @property {*} lastChatSessionId
 * @property {string} typebotId
 * @property {Array} variables
 */

/**
 * @typedef {Object} ResultLoadMatch
 * @property {string} id
 * @property {string} typebot_id
 */

/**
 * @typedef {Object} ResultListMatch
 * @property {string} typebot_id
 * @property {number} [cursor]
 * @property {number} [limit]
 * @property {string} [time_filter]
 * @property {string} [time_zone]
 */

/**
 * @typedef {Object} ResultRemoveMatch
 * @property {string} typebot_id
 */

/**
 * @typedef {Object} Typebot
 * @property {string} accessRight
 * @property {string} createdAt
 * @property {string} currentUserMode
 * @property {*} customDomain
 * @property {Array} edges
 * @property {Array} events
 * @property {*} folderId
 * @property {Array} groups
 * @property {*} icon
 * @property {string} id
 * @property {boolean} isArchived
 * @property {boolean} isClosed
 * @property {string} name
 * @property {boolean} [overwrite]
 * @property {*} publicId
 * @property {string} [publishedTypebotId]
 * @property {*} resultsTablePreferences
 * @property {*} riskLevel
 * @property {*} selectedThemeTemplateId
 * @property {Object} settings
 * @property {*} spaceId
 * @property {Object} theme
 * @property {*} typebot
 * @property {string} updatedAt
 * @property {Array} variables
 * @property {string} version
 * @property {*} whatsAppCredentialsId
 * @property {string} workspaceId
 */

/**
 * @typedef {Object} TypebotLoadMatch
 * @property {string} id
 * @property {boolean} [migrate_to_latest_version]
 */

/**
 * @typedef {Object} TypebotListMatch
 * @property {string} [folder_id]
 * @property {string} workspace_id
 */

/**
 * @typedef {Object} TypebotCreateData
 * @property {string} accessRight
 * @property {string} createdAt
 * @property {string} currentUserMode
 * @property {*} customDomain
 * @property {Array} edges
 * @property {Array} events
 * @property {*} folderId
 * @property {Array} groups
 * @property {*} icon
 * @property {string} id
 * @property {boolean} isArchived
 * @property {boolean} isClosed
 * @property {string} name
 * @property {boolean} [overwrite]
 * @property {*} publicId
 * @property {string} [publishedTypebotId]
 * @property {*} resultsTablePreferences
 * @property {*} riskLevel
 * @property {*} selectedThemeTemplateId
 * @property {Object} settings
 * @property {*} spaceId
 * @property {Object} theme
 * @property {*} typebot
 * @property {string} updatedAt
 * @property {Array} variables
 * @property {string} version
 * @property {*} whatsAppCredentialsId
 * @property {string} workspaceId
 */

/**
 * @typedef {Object} TypebotUpdateData
 * @property {string} id
 * @property {string} [accessRight]
 * @property {string} [createdAt]
 * @property {string} [currentUserMode]
 * @property {*} [customDomain]
 * @property {Array} [edges]
 * @property {Array} [events]
 * @property {*} [folderId]
 * @property {Array} [groups]
 * @property {*} [icon]
 * @property {boolean} [isArchived]
 * @property {boolean} [isClosed]
 * @property {string} [name]
 * @property {boolean} [overwrite]
 * @property {*} [publicId]
 * @property {string} [publishedTypebotId]
 * @property {*} [resultsTablePreferences]
 * @property {*} [riskLevel]
 * @property {*} [selectedThemeTemplateId]
 * @property {Object} [settings]
 * @property {*} [spaceId]
 * @property {Object} [theme]
 * @property {*} [typebot]
 * @property {string} [updatedAt]
 * @property {Array} [variables]
 * @property {string} [version]
 * @property {*} [whatsAppCredentialsId]
 * @property {string} [workspaceId]
 */

/**
 * @typedef {Object} TypebotRemoveMatch
 * @property {string} id
 */

/**
 * @typedef {Object} Workspace
 * @property {*} chatsHardLimit
 * @property {string} createdAt
 * @property {string} currentUserMode
 * @property {*} icon
 * @property {string} id
 * @property {*} inactiveFirstEmailSentAt
 * @property {*} inactiveSecondEmailSentAt
 * @property {boolean} isPastDue
 * @property {boolean} isSuspended
 * @property {*} isVerified
 * @property {*} lastActivityAt
 * @property {string} name
 * @property {string} plan
 * @property {*} settings
 * @property {*} stripeId
 * @property {string} updatedAt
 * @property {Object} workspace
 */

/**
 * @typedef {Object} WorkspaceLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} WorkspaceListMatch
 * @property {*} [chatsHardLimit]
 * @property {string} [createdAt]
 * @property {string} [currentUserMode]
 * @property {*} [icon]
 * @property {string} [id]
 * @property {*} [inactiveFirstEmailSentAt]
 * @property {*} [inactiveSecondEmailSentAt]
 * @property {boolean} [isPastDue]
 * @property {boolean} [isSuspended]
 * @property {*} [isVerified]
 * @property {*} [lastActivityAt]
 * @property {string} [name]
 * @property {string} [plan]
 * @property {*} [settings]
 * @property {*} [stripeId]
 * @property {string} [updatedAt]
 * @property {Object} [workspace]
 */

/**
 * @typedef {Object} WorkspaceCreateData
 * @property {*} chatsHardLimit
 * @property {string} createdAt
 * @property {string} currentUserMode
 * @property {*} icon
 * @property {string} id
 * @property {*} inactiveFirstEmailSentAt
 * @property {*} inactiveSecondEmailSentAt
 * @property {boolean} isPastDue
 * @property {boolean} isSuspended
 * @property {*} isVerified
 * @property {*} lastActivityAt
 * @property {string} name
 * @property {string} plan
 * @property {*} settings
 * @property {*} stripeId
 * @property {string} updatedAt
 * @property {Object} workspace
 */

/**
 * @typedef {Object} WorkspaceUpdateData
 * @property {string} id
 * @property {*} [chatsHardLimit]
 * @property {string} [createdAt]
 * @property {string} [currentUserMode]
 * @property {*} [icon]
 * @property {*} [inactiveFirstEmailSentAt]
 * @property {*} [inactiveSecondEmailSentAt]
 * @property {boolean} [isPastDue]
 * @property {boolean} [isSuspended]
 * @property {*} [isVerified]
 * @property {*} [lastActivityAt]
 * @property {string} [name]
 * @property {string} [plan]
 * @property {*} [settings]
 * @property {*} [stripeId]
 * @property {string} [updatedAt]
 * @property {Object} [workspace]
 */

/**
 * @typedef {Object} WorkspaceRemoveMatch
 * @property {string} id
 */

