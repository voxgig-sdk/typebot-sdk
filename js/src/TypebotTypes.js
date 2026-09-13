// Typed models for the Typebot SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} Analytics
 * @property {number} totalCompleted
 * @property {number} totalStarts
 * @property {number} totalViews
 */

/**
 * @typedef {Object} AnalyticsLoadMatch
 * @property {string} typebot_id
 * @property {string} [time_filter]
 * @property {string} [time_zone]
 */

/**
 * @typedef {Object} Billing
 * @property {number} amount
 * @property {string} currency
 * @property {*} date
 * @property {string} id
 * @property {string} resetsAt
 * @property {number} totalChatsUsed
 * @property {string} url
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
 * @property {*} context
 * @property {string} createdAt
 * @property {string} description
 * @property {*} details
 * @property {*} hasStarted
 * @property {string} id
 * @property {*} isArchived
 * @property {boolean} isCompleted
 * @property {*} lastChatSessionId
 * @property {string} resultId
 * @property {string} status
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
 * @property {*} customDomain
 * @property {Array} edges
 * @property {boolean} [enableSafetyFlags]
 * @property {Array} events
 * @property {*} folderId
 * @property {string} [fromTemplate]
 * @property {Array} groups
 * @property {*} icon
 * @property {string} id
 * @property {boolean} isArchived
 * @property {boolean} isClosed
 * @property {*} message
 * @property {string} name
 * @property {boolean} [overwrite]
 * @property {*} publicId
 * @property {*} publishedTypebot
 * @property {string} [publishedTypebotId]
 * @property {*} resultsTablePreferences
 * @property {*} riskLevel
 * @property {*} selectedThemeTemplateId
 * @property {Object} settings
 * @property {*} spaceId
 * @property {Object} theme
 * @property {Object} typebot
 * @property {string} updatedAt
 * @property {Array} variables
 * @property {*} [version]
 * @property {Array} [warnings]
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
 * @property {*} customDomain
 * @property {Array} edges
 * @property {boolean} [enableSafetyFlags]
 * @property {Array} events
 * @property {*} folderId
 * @property {string} [fromTemplate]
 * @property {Array} groups
 * @property {*} icon
 * @property {string} id
 * @property {boolean} isArchived
 * @property {boolean} isClosed
 * @property {*} message
 * @property {string} name
 * @property {boolean} [overwrite]
 * @property {*} publicId
 * @property {*} publishedTypebot
 * @property {string} [publishedTypebotId]
 * @property {*} resultsTablePreferences
 * @property {*} riskLevel
 * @property {*} selectedThemeTemplateId
 * @property {Object} settings
 * @property {*} spaceId
 * @property {Object} theme
 * @property {Object} typebot
 * @property {string} updatedAt
 * @property {Array} variables
 * @property {*} [version]
 * @property {Array} [warnings]
 * @property {*} whatsAppCredentialsId
 * @property {string} workspaceId
 */

/**
 * @typedef {Object} TypebotUpdateData
 * @property {string} id
 * @property {string} [accessRight]
 * @property {string} [createdAt]
 * @property {*} [customDomain]
 * @property {Array} [edges]
 * @property {boolean} [enableSafetyFlags]
 * @property {Array} [events]
 * @property {*} [folderId]
 * @property {string} [fromTemplate]
 * @property {Array} [groups]
 * @property {*} [icon]
 * @property {boolean} [isArchived]
 * @property {boolean} [isClosed]
 * @property {*} [message]
 * @property {string} [name]
 * @property {boolean} [overwrite]
 * @property {*} [publicId]
 * @property {*} [publishedTypebot]
 * @property {string} [publishedTypebotId]
 * @property {*} [resultsTablePreferences]
 * @property {*} [riskLevel]
 * @property {*} [selectedThemeTemplateId]
 * @property {Object} [settings]
 * @property {*} [spaceId]
 * @property {Object} [theme]
 * @property {Object} [typebot]
 * @property {string} [updatedAt]
 * @property {Array} [variables]
 * @property {*} [version]
 * @property {Array} [warnings]
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
 * @property {*} customChatsLimit
 * @property {*} customSeatsLimit
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
 * @property {string} role
 * @property {*} settings
 * @property {*} stripeId
 * @property {string} updatedAt
 * @property {Object} user
 * @property {string} userId
 * @property {string} workspaceId
 */

/**
 * @typedef {Object} WorkspaceLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} WorkspaceListMatch
 * @property {*} [chatsHardLimit]
 * @property {string} [createdAt]
 * @property {*} [customChatsLimit]
 * @property {*} [customSeatsLimit]
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
 * @property {string} [role]
 * @property {*} [settings]
 * @property {*} [stripeId]
 * @property {string} [updatedAt]
 * @property {Object} [user]
 * @property {string} [userId]
 * @property {string} [workspaceId]
 */

/**
 * @typedef {Object} WorkspaceCreateData
 * @property {*} chatsHardLimit
 * @property {string} createdAt
 * @property {*} customChatsLimit
 * @property {*} customSeatsLimit
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
 * @property {string} role
 * @property {*} settings
 * @property {*} stripeId
 * @property {string} updatedAt
 * @property {Object} user
 * @property {string} userId
 * @property {string} workspaceId
 */

/**
 * @typedef {Object} WorkspaceUpdateData
 * @property {string} id
 * @property {*} [chatsHardLimit]
 * @property {string} [createdAt]
 * @property {*} [customChatsLimit]
 * @property {*} [customSeatsLimit]
 * @property {*} [icon]
 * @property {*} [inactiveFirstEmailSentAt]
 * @property {*} [inactiveSecondEmailSentAt]
 * @property {boolean} [isPastDue]
 * @property {boolean} [isSuspended]
 * @property {*} [isVerified]
 * @property {*} [lastActivityAt]
 * @property {string} [name]
 * @property {string} [plan]
 * @property {string} [role]
 * @property {*} [settings]
 * @property {*} [stripeId]
 * @property {string} [updatedAt]
 * @property {Object} [user]
 * @property {string} [userId]
 * @property {string} [workspaceId]
 */

/**
 * @typedef {Object} WorkspaceRemoveMatch
 * @property {string} id
 */

