// Typed models for the Typebot SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} Analytics
 * @property {number} total_completed
 * @property {number} total_start
 * @property {number} total_view
 */

/**
 * @typedef {Object} AnalyticsLoadMatch
 * @property {string} typebot_id
 */

/**
 * @typedef {Object} Billing
 * @property {number} amount
 * @property {string} currency
 * @property {*} date
 * @property {string} id
 * @property {string} resets_at
 * @property {number} total_chats_used
 * @property {string} url
 */

/**
 * @typedef {Object} BillingLoadMatch
 * @property {number} [amount]
 * @property {string} [currency]
 * @property {*} [date]
 * @property {string} id
 * @property {string} [resets_at]
 * @property {number} [total_chats_used]
 * @property {string} [url]
 */

/**
 * @typedef {Object} BillingListMatch
 * @property {number} [amount]
 * @property {string} [currency]
 * @property {*} [date]
 * @property {string} [id]
 * @property {string} [resets_at]
 * @property {number} [total_chats_used]
 * @property {string} [url]
 */

/**
 * @typedef {Object} Folder
 * @property {string} created_at
 * @property {Object} folder
 * @property {string} [folder_name]
 * @property {string} id
 * @property {string} name
 * @property {string} parent_folder_id
 * @property {string} updated_at
 * @property {string} workspace_id
 */

/**
 * @typedef {Object} FolderLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} FolderListMatch
 * @property {string} [created_at]
 * @property {Object} [folder]
 * @property {string} [folder_name]
 * @property {string} [id]
 * @property {string} [name]
 * @property {string} [parent_folder_id]
 * @property {string} [updated_at]
 * @property {string} [workspace_id]
 */

/**
 * @typedef {Object} FolderCreateData
 * @property {string} created_at
 * @property {Object} folder
 * @property {string} [folder_name]
 * @property {string} id
 * @property {string} name
 * @property {string} parent_folder_id
 * @property {string} updated_at
 * @property {string} workspace_id
 */

/**
 * @typedef {Object} FolderUpdateData
 * @property {string} id
 * @property {string} [created_at]
 * @property {Object} [folder]
 * @property {string} [folder_name]
 * @property {string} [name]
 * @property {string} [parent_folder_id]
 * @property {string} [updated_at]
 * @property {string} [workspace_id]
 */

/**
 * @typedef {Object} FolderRemoveMatch
 * @property {string} id
 */

/**
 * @typedef {Object} Result
 * @property {Array} answer
 * @property {*} context
 * @property {string} created_at
 * @property {string} description
 * @property {*} detail
 * @property {boolean} has_started
 * @property {string} id
 * @property {boolean} is_archived
 * @property {boolean} is_completed
 * @property {string} last_chat_session_id
 * @property {string} result_id
 * @property {string} status
 * @property {string} typebot_id
 * @property {Array} variable
 */

/**
 * @typedef {Object} ResultLoadMatch
 * @property {string} id
 * @property {string} typebot_id
 */

/**
 * @typedef {Object} ResultListMatch
 * @property {string} typebot_id
 */

/**
 * @typedef {Object} ResultRemoveMatch
 * @property {string} typebot_id
 */

/**
 * @typedef {Object} Typebot
 * @property {string} access_right
 * @property {string} created_at
 * @property {string} current_user_mode
 * @property {*} custom_domain
 * @property {Array} edge
 * @property {boolean} [enable_safety_flag]
 * @property {Array} event
 * @property {string} folder_id
 * @property {string} [from_template]
 * @property {Array} group
 * @property {*} icon
 * @property {string} id
 * @property {boolean} is_archived
 * @property {boolean} is_closed
 * @property {*} message
 * @property {string} name
 * @property {boolean} [overwrite]
 * @property {string} public_id
 * @property {*} published_typebot
 * @property {string} [published_typebot_id]
 * @property {*} results_table_preference
 * @property {*} risk_level
 * @property {string} selected_theme_template_id
 * @property {Object} setting
 * @property {string} space_id
 * @property {Object} theme
 * @property {*} typebot
 * @property {string} updated_at
 * @property {Array} variable
 * @property {*} [version]
 * @property {Array} [warning]
 * @property {string} whats_app_credentials_id
 * @property {string} workspace_id
 */

/**
 * @typedef {Object} TypebotLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} TypebotListMatch
 * @property {string} [access_right]
 * @property {string} [created_at]
 * @property {string} [current_user_mode]
 * @property {*} [custom_domain]
 * @property {Array} [edge]
 * @property {boolean} [enable_safety_flag]
 * @property {Array} [event]
 * @property {string} [folder_id]
 * @property {string} [from_template]
 * @property {Array} [group]
 * @property {*} [icon]
 * @property {string} [id]
 * @property {boolean} [is_archived]
 * @property {boolean} [is_closed]
 * @property {*} [message]
 * @property {string} [name]
 * @property {boolean} [overwrite]
 * @property {string} [public_id]
 * @property {*} [published_typebot]
 * @property {string} [published_typebot_id]
 * @property {*} [results_table_preference]
 * @property {*} [risk_level]
 * @property {string} [selected_theme_template_id]
 * @property {Object} [setting]
 * @property {string} [space_id]
 * @property {Object} [theme]
 * @property {*} [typebot]
 * @property {string} [updated_at]
 * @property {Array} [variable]
 * @property {*} [version]
 * @property {Array} [warning]
 * @property {string} [whats_app_credentials_id]
 * @property {string} [workspace_id]
 */

/**
 * @typedef {Object} TypebotCreateData
 * @property {string} access_right
 * @property {string} created_at
 * @property {string} current_user_mode
 * @property {*} custom_domain
 * @property {Array} edge
 * @property {boolean} [enable_safety_flag]
 * @property {Array} event
 * @property {string} folder_id
 * @property {string} [from_template]
 * @property {Array} group
 * @property {*} icon
 * @property {string} id
 * @property {boolean} is_archived
 * @property {boolean} is_closed
 * @property {*} message
 * @property {string} name
 * @property {boolean} [overwrite]
 * @property {string} public_id
 * @property {*} published_typebot
 * @property {string} [published_typebot_id]
 * @property {*} results_table_preference
 * @property {*} risk_level
 * @property {string} selected_theme_template_id
 * @property {Object} setting
 * @property {string} space_id
 * @property {Object} theme
 * @property {*} typebot
 * @property {string} updated_at
 * @property {Array} variable
 * @property {*} [version]
 * @property {Array} [warning]
 * @property {string} whats_app_credentials_id
 * @property {string} workspace_id
 */

/**
 * @typedef {Object} TypebotUpdateData
 * @property {string} id
 * @property {string} [access_right]
 * @property {string} [created_at]
 * @property {string} [current_user_mode]
 * @property {*} [custom_domain]
 * @property {Array} [edge]
 * @property {boolean} [enable_safety_flag]
 * @property {Array} [event]
 * @property {string} [folder_id]
 * @property {string} [from_template]
 * @property {Array} [group]
 * @property {*} [icon]
 * @property {boolean} [is_archived]
 * @property {boolean} [is_closed]
 * @property {*} [message]
 * @property {string} [name]
 * @property {boolean} [overwrite]
 * @property {string} [public_id]
 * @property {*} [published_typebot]
 * @property {string} [published_typebot_id]
 * @property {*} [results_table_preference]
 * @property {*} [risk_level]
 * @property {string} [selected_theme_template_id]
 * @property {Object} [setting]
 * @property {string} [space_id]
 * @property {Object} [theme]
 * @property {*} [typebot]
 * @property {string} [updated_at]
 * @property {Array} [variable]
 * @property {*} [version]
 * @property {Array} [warning]
 * @property {string} [whats_app_credentials_id]
 * @property {string} [workspace_id]
 */

/**
 * @typedef {Object} TypebotRemoveMatch
 * @property {string} id
 */

/**
 * @typedef {Object} Workspace
 * @property {*} chats_hard_limit
 * @property {string} created_at
 * @property {string} current_user_mode
 * @property {*} icon
 * @property {string} id
 * @property {*} inactive_first_email_sent_at
 * @property {*} inactive_second_email_sent_at
 * @property {boolean} is_past_due
 * @property {boolean} is_suspended
 * @property {boolean} is_verified
 * @property {*} last_activity_at
 * @property {string} name
 * @property {string} plan
 * @property {string} role
 * @property {*} setting
 * @property {string} stripe_id
 * @property {string} updated_at
 * @property {Object} user
 * @property {string} user_id
 * @property {Object} workspace
 * @property {string} workspace_id
 */

/**
 * @typedef {Object} WorkspaceLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} WorkspaceListMatch
 * @property {*} [chats_hard_limit]
 * @property {string} [created_at]
 * @property {string} [current_user_mode]
 * @property {*} [icon]
 * @property {string} [id]
 * @property {*} [inactive_first_email_sent_at]
 * @property {*} [inactive_second_email_sent_at]
 * @property {boolean} [is_past_due]
 * @property {boolean} [is_suspended]
 * @property {boolean} [is_verified]
 * @property {*} [last_activity_at]
 * @property {string} [name]
 * @property {string} [plan]
 * @property {string} [role]
 * @property {*} [setting]
 * @property {string} [stripe_id]
 * @property {string} [updated_at]
 * @property {Object} [user]
 * @property {string} [user_id]
 * @property {Object} [workspace]
 * @property {string} [workspace_id]
 */

/**
 * @typedef {Object} WorkspaceCreateData
 * @property {*} chats_hard_limit
 * @property {string} created_at
 * @property {string} current_user_mode
 * @property {*} icon
 * @property {string} id
 * @property {*} inactive_first_email_sent_at
 * @property {*} inactive_second_email_sent_at
 * @property {boolean} is_past_due
 * @property {boolean} is_suspended
 * @property {boolean} is_verified
 * @property {*} last_activity_at
 * @property {string} name
 * @property {string} plan
 * @property {string} role
 * @property {*} setting
 * @property {string} stripe_id
 * @property {string} updated_at
 * @property {Object} user
 * @property {string} user_id
 * @property {Object} workspace
 * @property {string} workspace_id
 */

/**
 * @typedef {Object} WorkspaceUpdateData
 * @property {string} id
 * @property {*} [chats_hard_limit]
 * @property {string} [created_at]
 * @property {string} [current_user_mode]
 * @property {*} [icon]
 * @property {*} [inactive_first_email_sent_at]
 * @property {*} [inactive_second_email_sent_at]
 * @property {boolean} [is_past_due]
 * @property {boolean} [is_suspended]
 * @property {boolean} [is_verified]
 * @property {*} [last_activity_at]
 * @property {string} [name]
 * @property {string} [plan]
 * @property {string} [role]
 * @property {*} [setting]
 * @property {string} [stripe_id]
 * @property {string} [updated_at]
 * @property {Object} [user]
 * @property {string} [user_id]
 * @property {Object} [workspace]
 * @property {string} [workspace_id]
 */

/**
 * @typedef {Object} WorkspaceRemoveMatch
 * @property {string} id
 */

