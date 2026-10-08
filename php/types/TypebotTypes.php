<?php
declare(strict_types=1);

// Typed models for the Typebot SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Analytics entity data model. */
class Analytics
{
}

/** Request payload for Analytics#load. */
class AnalyticsLoadMatch
{
    public string $typebot_id;
    public ?string $time_filter = null;
    public ?string $time_zone = null;
}

/** Billing entity data model. */
class Billing
{
}

/** Request payload for Billing#load. */
class BillingLoadMatch
{
    public string $workspace_id;
}

/** Request payload for Billing#list. */
class BillingListMatch
{
    public string $workspace_id;
}

/** Folder entity data model. */
class Folder
{
    public string $createdAt;
    public array $folder;
    public ?string $folderName = null;
    public string $id;
    public string $name;
    public mixed $parentFolderId;
    public string $updatedAt;
    public string $workspaceId;
}

/** Request payload for Folder#load. */
class FolderLoadMatch
{
    public string $id;
    public string $workspace_id;
}

/** Request payload for Folder#list. */
class FolderListMatch
{
    public ?string $parent_folder_id = null;
    public string $workspace_id;
}

/** Request payload for Folder#create. */
class FolderCreateData
{
    public string $createdAt;
    public array $folder;
    public ?string $folderName = null;
    public string $id;
    public string $name;
    public mixed $parentFolderId;
    public string $updatedAt;
    public string $workspaceId;
}

/** Request payload for Folder#update. */
class FolderUpdateData
{
    public string $id;
    public ?string $createdAt = null;
    public ?array $folder = null;
    public ?string $folderName = null;
    public ?string $name = null;
    public mixed $parentFolderId = null;
    public ?string $updatedAt = null;
    public ?string $workspaceId = null;
}

/** Request payload for Folder#remove. */
class FolderRemoveMatch
{
    public string $id;
}

/** Result entity data model. */
class Result
{
    public array $answers;
    public string $createdAt;
    public mixed $hasStarted;
    public string $id;
    public mixed $isArchived;
    public bool $isCompleted;
    public mixed $lastChatSessionId;
    public string $typebotId;
    public array $variables;
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
    public ?float $cursor = null;
    public ?float $limit = null;
    public ?string $time_filter = null;
    public ?string $time_zone = null;
}

/** Request payload for Result#remove. */
class ResultRemoveMatch
{
    public string $typebot_id;
}

/** Typebot entity data model. */
class Typebot
{
    public string $accessRight;
    public string $createdAt;
    public string $currentUserMode;
    public mixed $customDomain;
    public array $edges;
    public array $events;
    public mixed $folderId;
    public array $groups;
    public mixed $icon;
    public string $id;
    public bool $isArchived;
    public bool $isClosed;
    public string $name;
    public ?bool $overwrite = null;
    public mixed $publicId;
    public ?string $publishedTypebotId = null;
    public mixed $resultsTablePreferences;
    public mixed $riskLevel;
    public mixed $selectedThemeTemplateId;
    public array $settings;
    public mixed $spaceId;
    public array $theme;
    public mixed $typebot;
    public string $updatedAt;
    public array $variables;
    public string $version;
    public mixed $whatsAppCredentialsId;
    public string $workspaceId;
}

/** Request payload for Typebot#load. */
class TypebotLoadMatch
{
    public string $id;
    public ?bool $migrate_to_latest_version = null;
}

/** Request payload for Typebot#list. */
class TypebotListMatch
{
    public ?string $folder_id = null;
    public string $workspace_id;
}

/** Request payload for Typebot#create. */
class TypebotCreateData
{
    public string $accessRight;
    public string $createdAt;
    public string $currentUserMode;
    public mixed $customDomain;
    public array $edges;
    public array $events;
    public mixed $folderId;
    public array $groups;
    public mixed $icon;
    public string $id;
    public bool $isArchived;
    public bool $isClosed;
    public string $name;
    public ?bool $overwrite = null;
    public mixed $publicId;
    public ?string $publishedTypebotId = null;
    public mixed $resultsTablePreferences;
    public mixed $riskLevel;
    public mixed $selectedThemeTemplateId;
    public array $settings;
    public mixed $spaceId;
    public array $theme;
    public mixed $typebot;
    public string $updatedAt;
    public array $variables;
    public string $version;
    public mixed $whatsAppCredentialsId;
    public string $workspaceId;
}

/** Request payload for Typebot#update. */
class TypebotUpdateData
{
    public string $id;
    public ?string $accessRight = null;
    public ?string $createdAt = null;
    public ?string $currentUserMode = null;
    public mixed $customDomain = null;
    public ?array $edges = null;
    public ?array $events = null;
    public mixed $folderId = null;
    public ?array $groups = null;
    public mixed $icon = null;
    public ?bool $isArchived = null;
    public ?bool $isClosed = null;
    public ?string $name = null;
    public ?bool $overwrite = null;
    public mixed $publicId = null;
    public ?string $publishedTypebotId = null;
    public mixed $resultsTablePreferences = null;
    public mixed $riskLevel = null;
    public mixed $selectedThemeTemplateId = null;
    public ?array $settings = null;
    public mixed $spaceId = null;
    public ?array $theme = null;
    public mixed $typebot = null;
    public ?string $updatedAt = null;
    public ?array $variables = null;
    public ?string $version = null;
    public mixed $whatsAppCredentialsId = null;
    public ?string $workspaceId = null;
}

/** Request payload for Typebot#remove. */
class TypebotRemoveMatch
{
    public string $id;
}

/** Workspace entity data model. */
class Workspace
{
    public mixed $chatsHardLimit;
    public string $createdAt;
    public string $currentUserMode;
    public mixed $icon;
    public string $id;
    public mixed $inactiveFirstEmailSentAt;
    public mixed $inactiveSecondEmailSentAt;
    public bool $isPastDue;
    public bool $isSuspended;
    public mixed $isVerified;
    public mixed $lastActivityAt;
    public string $name;
    public string $plan;
    public mixed $settings;
    public mixed $stripeId;
    public string $updatedAt;
    public array $workspace;
}

/** Request payload for Workspace#load. */
class WorkspaceLoadMatch
{
    public string $id;
}

/** Request payload for Workspace#list. */
class WorkspaceListMatch
{
    public mixed $chatsHardLimit = null;
    public ?string $createdAt = null;
    public ?string $currentUserMode = null;
    public mixed $icon = null;
    public ?string $id = null;
    public mixed $inactiveFirstEmailSentAt = null;
    public mixed $inactiveSecondEmailSentAt = null;
    public ?bool $isPastDue = null;
    public ?bool $isSuspended = null;
    public mixed $isVerified = null;
    public mixed $lastActivityAt = null;
    public ?string $name = null;
    public ?string $plan = null;
    public mixed $settings = null;
    public mixed $stripeId = null;
    public ?string $updatedAt = null;
    public ?array $workspace = null;
}

/** Request payload for Workspace#create. */
class WorkspaceCreateData
{
    public mixed $chatsHardLimit;
    public string $createdAt;
    public string $currentUserMode;
    public mixed $icon;
    public string $id;
    public mixed $inactiveFirstEmailSentAt;
    public mixed $inactiveSecondEmailSentAt;
    public bool $isPastDue;
    public bool $isSuspended;
    public mixed $isVerified;
    public mixed $lastActivityAt;
    public string $name;
    public string $plan;
    public mixed $settings;
    public mixed $stripeId;
    public string $updatedAt;
    public array $workspace;
}

/** Request payload for Workspace#update. */
class WorkspaceUpdateData
{
    public string $id;
    public mixed $chatsHardLimit = null;
    public ?string $createdAt = null;
    public ?string $currentUserMode = null;
    public mixed $icon = null;
    public mixed $inactiveFirstEmailSentAt = null;
    public mixed $inactiveSecondEmailSentAt = null;
    public ?bool $isPastDue = null;
    public ?bool $isSuspended = null;
    public mixed $isVerified = null;
    public mixed $lastActivityAt = null;
    public ?string $name = null;
    public ?string $plan = null;
    public mixed $settings = null;
    public mixed $stripeId = null;
    public ?string $updatedAt = null;
    public ?array $workspace = null;
}

/** Request payload for Workspace#remove. */
class WorkspaceRemoveMatch
{
    public string $id;
}

