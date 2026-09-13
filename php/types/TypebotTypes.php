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
    public float $totalCompleted;
    public float $totalStarts;
    public float $totalViews;
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
    public float $amount;
    public string $currency;
    public mixed $date;
    public string $id;
    public string $resetsAt;
    public float $totalChatsUsed;
    public string $url;
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
    public mixed $context;
    public string $createdAt;
    public string $description;
    public mixed $details;
    public mixed $hasStarted;
    public string $id;
    public mixed $isArchived;
    public bool $isCompleted;
    public mixed $lastChatSessionId;
    public string $resultId;
    public string $status;
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
    public mixed $customDomain;
    public array $edges;
    public ?bool $enableSafetyFlags = null;
    public array $events;
    public mixed $folderId;
    public ?string $fromTemplate = null;
    public array $groups;
    public mixed $icon;
    public string $id;
    public bool $isArchived;
    public bool $isClosed;
    public mixed $message;
    public string $name;
    public ?bool $overwrite = null;
    public mixed $publicId;
    public mixed $publishedTypebot;
    public ?string $publishedTypebotId = null;
    public mixed $resultsTablePreferences;
    public mixed $riskLevel;
    public mixed $selectedThemeTemplateId;
    public array $settings;
    public mixed $spaceId;
    public array $theme;
    public array $typebot;
    public string $updatedAt;
    public array $variables;
    public mixed $version = null;
    public ?array $warnings = null;
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
    public mixed $customDomain;
    public array $edges;
    public ?bool $enableSafetyFlags = null;
    public array $events;
    public mixed $folderId;
    public ?string $fromTemplate = null;
    public array $groups;
    public mixed $icon;
    public string $id;
    public bool $isArchived;
    public bool $isClosed;
    public mixed $message;
    public string $name;
    public ?bool $overwrite = null;
    public mixed $publicId;
    public mixed $publishedTypebot;
    public ?string $publishedTypebotId = null;
    public mixed $resultsTablePreferences;
    public mixed $riskLevel;
    public mixed $selectedThemeTemplateId;
    public array $settings;
    public mixed $spaceId;
    public array $theme;
    public array $typebot;
    public string $updatedAt;
    public array $variables;
    public mixed $version = null;
    public ?array $warnings = null;
    public mixed $whatsAppCredentialsId;
    public string $workspaceId;
}

/** Request payload for Typebot#update. */
class TypebotUpdateData
{
    public string $id;
    public ?string $accessRight = null;
    public ?string $createdAt = null;
    public mixed $customDomain = null;
    public ?array $edges = null;
    public ?bool $enableSafetyFlags = null;
    public ?array $events = null;
    public mixed $folderId = null;
    public ?string $fromTemplate = null;
    public ?array $groups = null;
    public mixed $icon = null;
    public ?bool $isArchived = null;
    public ?bool $isClosed = null;
    public mixed $message = null;
    public ?string $name = null;
    public ?bool $overwrite = null;
    public mixed $publicId = null;
    public mixed $publishedTypebot = null;
    public ?string $publishedTypebotId = null;
    public mixed $resultsTablePreferences = null;
    public mixed $riskLevel = null;
    public mixed $selectedThemeTemplateId = null;
    public ?array $settings = null;
    public mixed $spaceId = null;
    public ?array $theme = null;
    public ?array $typebot = null;
    public ?string $updatedAt = null;
    public ?array $variables = null;
    public mixed $version = null;
    public ?array $warnings = null;
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
    public mixed $customChatsLimit;
    public mixed $customSeatsLimit;
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
    public string $role;
    public mixed $settings;
    public mixed $stripeId;
    public string $updatedAt;
    public array $user;
    public string $userId;
    public string $workspaceId;
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
    public mixed $customChatsLimit = null;
    public mixed $customSeatsLimit = null;
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
    public ?string $role = null;
    public mixed $settings = null;
    public mixed $stripeId = null;
    public ?string $updatedAt = null;
    public ?array $user = null;
    public ?string $userId = null;
    public ?string $workspaceId = null;
}

/** Request payload for Workspace#create. */
class WorkspaceCreateData
{
    public mixed $chatsHardLimit;
    public string $createdAt;
    public mixed $customChatsLimit;
    public mixed $customSeatsLimit;
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
    public string $role;
    public mixed $settings;
    public mixed $stripeId;
    public string $updatedAt;
    public array $user;
    public string $userId;
    public string $workspaceId;
}

/** Request payload for Workspace#update. */
class WorkspaceUpdateData
{
    public string $id;
    public mixed $chatsHardLimit = null;
    public ?string $createdAt = null;
    public mixed $customChatsLimit = null;
    public mixed $customSeatsLimit = null;
    public mixed $icon = null;
    public mixed $inactiveFirstEmailSentAt = null;
    public mixed $inactiveSecondEmailSentAt = null;
    public ?bool $isPastDue = null;
    public ?bool $isSuspended = null;
    public mixed $isVerified = null;
    public mixed $lastActivityAt = null;
    public ?string $name = null;
    public ?string $plan = null;
    public ?string $role = null;
    public mixed $settings = null;
    public mixed $stripeId = null;
    public ?string $updatedAt = null;
    public ?array $user = null;
    public ?string $userId = null;
    public ?string $workspaceId = null;
}

/** Request payload for Workspace#remove. */
class WorkspaceRemoveMatch
{
    public string $id;
}

