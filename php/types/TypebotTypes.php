<?php
declare(strict_types=1);

// Typed models for the Typebot SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Analytics entity data model. */
class Analytics
{
    public float $total_completed;
    public float $total_start;
    public float $total_view;
}

/** Request payload for Analytics#load. */
class AnalyticsLoadMatch
{
    public string $typebot_id;
}

/** Billing entity data model. */
class Billing
{
    public float $amount;
    public string $currency;
    public mixed $date;
    public string $id;
    public string $resets_at;
    public float $total_chats_used;
    public string $url;
}

/** Request payload for Billing#load. */
class BillingLoadMatch
{
    public ?float $amount = null;
    public ?string $currency = null;
    public mixed $date = null;
    public string $id;
    public ?string $resets_at = null;
    public ?float $total_chats_used = null;
    public ?string $url = null;
}

/** Request payload for Billing#list. */
class BillingListMatch
{
    public ?float $amount = null;
    public ?string $currency = null;
    public mixed $date = null;
    public ?string $id = null;
    public ?string $resets_at = null;
    public ?float $total_chats_used = null;
    public ?string $url = null;
}

/** Folder entity data model. */
class Folder
{
    public string $created_at;
    public array $folder;
    public ?string $folder_name = null;
    public string $id;
    public string $name;
    public string $parent_folder_id;
    public string $updated_at;
    public string $workspace_id;
}

/** Request payload for Folder#load. */
class FolderLoadMatch
{
    public string $id;
}

/** Request payload for Folder#list. */
class FolderListMatch
{
    public ?string $created_at = null;
    public ?array $folder = null;
    public ?string $folder_name = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $parent_folder_id = null;
    public ?string $updated_at = null;
    public ?string $workspace_id = null;
}

/** Request payload for Folder#create. */
class FolderCreateData
{
    public string $created_at;
    public array $folder;
    public ?string $folder_name = null;
    public string $id;
    public string $name;
    public string $parent_folder_id;
    public string $updated_at;
    public string $workspace_id;
}

/** Request payload for Folder#update. */
class FolderUpdateData
{
    public string $id;
    public ?string $created_at = null;
    public ?array $folder = null;
    public ?string $folder_name = null;
    public ?string $name = null;
    public ?string $parent_folder_id = null;
    public ?string $updated_at = null;
    public ?string $workspace_id = null;
}

/** Request payload for Folder#remove. */
class FolderRemoveMatch
{
    public string $id;
}

/** Result entity data model. */
class Result
{
    public array $answer;
    public mixed $context;
    public string $created_at;
    public string $description;
    public mixed $detail;
    public bool $has_started;
    public string $id;
    public bool $is_archived;
    public bool $is_completed;
    public string $last_chat_session_id;
    public string $result_id;
    public string $status;
    public string $typebot_id;
    public array $variable;
}

/** Request payload for Result#load. */
class ResultLoadMatch
{
    public string $id;
    public string $typebot_id;
}

/** Request payload for Result#list. */
class ResultListMatch
{
    public string $typebot_id;
}

/** Request payload for Result#remove. */
class ResultRemoveMatch
{
    public string $typebot_id;
}

/** Typebot entity data model. */
class Typebot
{
    public string $access_right;
    public string $created_at;
    public string $current_user_mode;
    public mixed $custom_domain;
    public array $edge;
    public ?bool $enable_safety_flag = null;
    public array $event;
    public string $folder_id;
    public ?string $from_template = null;
    public array $group;
    public mixed $icon;
    public string $id;
    public bool $is_archived;
    public bool $is_closed;
    public mixed $message;
    public string $name;
    public ?bool $overwrite = null;
    public string $public_id;
    public mixed $published_typebot;
    public ?string $published_typebot_id = null;
    public mixed $results_table_preference;
    public mixed $risk_level;
    public string $selected_theme_template_id;
    public array $setting;
    public string $space_id;
    public array $theme;
    public mixed $typebot;
    public string $updated_at;
    public array $variable;
    public mixed $version = null;
    public ?array $warning = null;
    public string $whats_app_credentials_id;
    public string $workspace_id;
}

/** Request payload for Typebot#load. */
class TypebotLoadMatch
{
    public string $id;
}

/** Request payload for Typebot#list. */
class TypebotListMatch
{
    public ?string $access_right = null;
    public ?string $created_at = null;
    public ?string $current_user_mode = null;
    public mixed $custom_domain = null;
    public ?array $edge = null;
    public ?bool $enable_safety_flag = null;
    public ?array $event = null;
    public ?string $folder_id = null;
    public ?string $from_template = null;
    public ?array $group = null;
    public mixed $icon = null;
    public ?string $id = null;
    public ?bool $is_archived = null;
    public ?bool $is_closed = null;
    public mixed $message = null;
    public ?string $name = null;
    public ?bool $overwrite = null;
    public ?string $public_id = null;
    public mixed $published_typebot = null;
    public ?string $published_typebot_id = null;
    public mixed $results_table_preference = null;
    public mixed $risk_level = null;
    public ?string $selected_theme_template_id = null;
    public ?array $setting = null;
    public ?string $space_id = null;
    public ?array $theme = null;
    public mixed $typebot = null;
    public ?string $updated_at = null;
    public ?array $variable = null;
    public mixed $version = null;
    public ?array $warning = null;
    public ?string $whats_app_credentials_id = null;
    public ?string $workspace_id = null;
}

/** Request payload for Typebot#create. */
class TypebotCreateData
{
    public string $access_right;
    public string $created_at;
    public string $current_user_mode;
    public mixed $custom_domain;
    public array $edge;
    public ?bool $enable_safety_flag = null;
    public array $event;
    public string $folder_id;
    public ?string $from_template = null;
    public array $group;
    public mixed $icon;
    public string $id;
    public bool $is_archived;
    public bool $is_closed;
    public mixed $message;
    public string $name;
    public ?bool $overwrite = null;
    public string $public_id;
    public mixed $published_typebot;
    public ?string $published_typebot_id = null;
    public mixed $results_table_preference;
    public mixed $risk_level;
    public string $selected_theme_template_id;
    public array $setting;
    public string $space_id;
    public array $theme;
    public mixed $typebot;
    public string $updated_at;
    public array $variable;
    public mixed $version = null;
    public ?array $warning = null;
    public string $whats_app_credentials_id;
    public string $workspace_id;
}

/** Request payload for Typebot#update. */
class TypebotUpdateData
{
    public string $id;
    public ?string $access_right = null;
    public ?string $created_at = null;
    public ?string $current_user_mode = null;
    public mixed $custom_domain = null;
    public ?array $edge = null;
    public ?bool $enable_safety_flag = null;
    public ?array $event = null;
    public ?string $folder_id = null;
    public ?string $from_template = null;
    public ?array $group = null;
    public mixed $icon = null;
    public ?bool $is_archived = null;
    public ?bool $is_closed = null;
    public mixed $message = null;
    public ?string $name = null;
    public ?bool $overwrite = null;
    public ?string $public_id = null;
    public mixed $published_typebot = null;
    public ?string $published_typebot_id = null;
    public mixed $results_table_preference = null;
    public mixed $risk_level = null;
    public ?string $selected_theme_template_id = null;
    public ?array $setting = null;
    public ?string $space_id = null;
    public ?array $theme = null;
    public mixed $typebot = null;
    public ?string $updated_at = null;
    public ?array $variable = null;
    public mixed $version = null;
    public ?array $warning = null;
    public ?string $whats_app_credentials_id = null;
    public ?string $workspace_id = null;
}

/** Request payload for Typebot#remove. */
class TypebotRemoveMatch
{
    public string $id;
}

/** Workspace entity data model. */
class Workspace
{
    public mixed $chats_hard_limit;
    public string $created_at;
    public string $current_user_mode;
    public mixed $icon;
    public string $id;
    public mixed $inactive_first_email_sent_at;
    public mixed $inactive_second_email_sent_at;
    public bool $is_past_due;
    public bool $is_suspended;
    public bool $is_verified;
    public mixed $last_activity_at;
    public string $name;
    public string $plan;
    public string $role;
    public mixed $setting;
    public string $stripe_id;
    public string $updated_at;
    public array $user;
    public string $user_id;
    public array $workspace;
    public string $workspace_id;
}

/** Request payload for Workspace#load. */
class WorkspaceLoadMatch
{
    public string $id;
}

/** Request payload for Workspace#list. */
class WorkspaceListMatch
{
    public mixed $chats_hard_limit = null;
    public ?string $created_at = null;
    public ?string $current_user_mode = null;
    public mixed $icon = null;
    public ?string $id = null;
    public mixed $inactive_first_email_sent_at = null;
    public mixed $inactive_second_email_sent_at = null;
    public ?bool $is_past_due = null;
    public ?bool $is_suspended = null;
    public ?bool $is_verified = null;
    public mixed $last_activity_at = null;
    public ?string $name = null;
    public ?string $plan = null;
    public ?string $role = null;
    public mixed $setting = null;
    public ?string $stripe_id = null;
    public ?string $updated_at = null;
    public ?array $user = null;
    public ?string $user_id = null;
    public ?array $workspace = null;
    public ?string $workspace_id = null;
}

/** Request payload for Workspace#create. */
class WorkspaceCreateData
{
    public mixed $chats_hard_limit;
    public string $created_at;
    public string $current_user_mode;
    public mixed $icon;
    public string $id;
    public mixed $inactive_first_email_sent_at;
    public mixed $inactive_second_email_sent_at;
    public bool $is_past_due;
    public bool $is_suspended;
    public bool $is_verified;
    public mixed $last_activity_at;
    public string $name;
    public string $plan;
    public string $role;
    public mixed $setting;
    public string $stripe_id;
    public string $updated_at;
    public array $user;
    public string $user_id;
    public array $workspace;
    public string $workspace_id;
}

/** Request payload for Workspace#update. */
class WorkspaceUpdateData
{
    public string $id;
    public mixed $chats_hard_limit = null;
    public ?string $created_at = null;
    public ?string $current_user_mode = null;
    public mixed $icon = null;
    public mixed $inactive_first_email_sent_at = null;
    public mixed $inactive_second_email_sent_at = null;
    public ?bool $is_past_due = null;
    public ?bool $is_suspended = null;
    public ?bool $is_verified = null;
    public mixed $last_activity_at = null;
    public ?string $name = null;
    public ?string $plan = null;
    public ?string $role = null;
    public mixed $setting = null;
    public ?string $stripe_id = null;
    public ?string $updated_at = null;
    public ?array $user = null;
    public ?string $user_id = null;
    public ?array $workspace = null;
    public ?string $workspace_id = null;
}

/** Request payload for Workspace#remove. */
class WorkspaceRemoveMatch
{
    public string $id;
}

