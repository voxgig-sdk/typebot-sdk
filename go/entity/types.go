// Typed models for the Typebot SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/typebot-sdk/go/core"
)

// Analytics is the typed data model for the analytics entity.
type Analytics struct {
	TotalCompleted float64 `json:"totalCompleted"`
	TotalStarts float64 `json:"totalStarts"`
	TotalViews float64 `json:"totalViews"`
}

// AnalyticsLoadMatch is the typed request payload for Analytics.LoadTyped.
type AnalyticsLoadMatch struct {
	TypebotId string `json:"typebot_id"`
}

// Billing is the typed data model for the billing entity.
type Billing struct {
	Amount float64 `json:"amount"`
	Currency string `json:"currency"`
	Date any `json:"date"`
	Id string `json:"id"`
	ResetsAt string `json:"resetsAt"`
	TotalChatsUsed float64 `json:"totalChatsUsed"`
	Url string `json:"url"`
}

// BillingLoadMatch is the typed request payload for Billing.LoadTyped.
type BillingLoadMatch struct {
	Amount *float64 `json:"amount,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Date *any `json:"date,omitempty"`
	Id string `json:"id"`
	ResetsAt *string `json:"resetsAt,omitempty"`
	TotalChatsUsed *float64 `json:"totalChatsUsed,omitempty"`
	Url *string `json:"url,omitempty"`
}

// BillingListMatch is the typed request payload for Billing.ListTyped.
type BillingListMatch struct {
	Amount *float64 `json:"amount,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Date *any `json:"date,omitempty"`
	Id *string `json:"id,omitempty"`
	ResetsAt *string `json:"resetsAt,omitempty"`
	TotalChatsUsed *float64 `json:"totalChatsUsed,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Folder is the typed data model for the folder entity.
type Folder struct {
	CreatedAt string `json:"createdAt"`
	Folder map[string]any `json:"folder"`
	FolderName *string `json:"folderName,omitempty"`
	Id string `json:"id"`
	Name string `json:"name"`
	ParentFolderId any `json:"parentFolderId"`
	UpdatedAt string `json:"updatedAt"`
	WorkspaceId string `json:"workspaceId"`
}

// FolderLoadMatch is the typed request payload for Folder.LoadTyped.
type FolderLoadMatch struct {
	Id string `json:"id"`
}

// FolderListMatch is the typed request payload for Folder.ListTyped.
type FolderListMatch struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	Folder *map[string]any `json:"folder,omitempty"`
	FolderName *string `json:"folderName,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	ParentFolderId *any `json:"parentFolderId,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
	WorkspaceId *string `json:"workspaceId,omitempty"`
}

// FolderCreateData is the typed request payload for Folder.CreateTyped.
type FolderCreateData struct {
	CreatedAt string `json:"createdAt"`
	Folder map[string]any `json:"folder"`
	FolderName *string `json:"folderName,omitempty"`
	Id string `json:"id"`
	Name string `json:"name"`
	ParentFolderId any `json:"parentFolderId"`
	UpdatedAt string `json:"updatedAt"`
	WorkspaceId string `json:"workspaceId"`
}

// FolderUpdateData is the typed request payload for Folder.UpdateTyped.
type FolderUpdateData struct {
	Id string `json:"id"`
	CreatedAt *string `json:"createdAt,omitempty"`
	Folder *map[string]any `json:"folder,omitempty"`
	FolderName *string `json:"folderName,omitempty"`
	Name *string `json:"name,omitempty"`
	ParentFolderId *any `json:"parentFolderId,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
	WorkspaceId *string `json:"workspaceId,omitempty"`
}

// FolderRemoveMatch is the typed request payload for Folder.RemoveTyped.
type FolderRemoveMatch struct {
	Id string `json:"id"`
}

// Result is the typed data model for the result entity.
type Result struct {
	Answers []any `json:"answers"`
	Context any `json:"context"`
	CreatedAt string `json:"createdAt"`
	Description string `json:"description"`
	Details any `json:"details"`
	HasStarted any `json:"hasStarted"`
	Id string `json:"id"`
	IsArchived any `json:"isArchived"`
	IsCompleted bool `json:"isCompleted"`
	LastChatSessionId any `json:"lastChatSessionId"`
	ResultId string `json:"resultId"`
	Status string `json:"status"`
	TypebotId string `json:"typebotId"`
	Variables []any `json:"variables"`
}

// ResultLoadMatch is the typed request payload for Result.LoadTyped.
type ResultLoadMatch struct {
	Id string `json:"id"`
	TypebotId string `json:"typebot_id"`
}

// ResultListMatch is the typed request payload for Result.ListTyped.
type ResultListMatch struct {
	TypebotId string `json:"typebot_id"`
}

// ResultRemoveMatch is the typed request payload for Result.RemoveTyped.
type ResultRemoveMatch struct {
	TypebotId string `json:"typebot_id"`
}

// Typebot is the typed data model for the typebot entity.
type Typebot struct {
	AccessRight string `json:"accessRight"`
	CreatedAt string `json:"createdAt"`
	CustomDomain any `json:"customDomain"`
	Edges []any `json:"edges"`
	EnableSafetyFlags *bool `json:"enableSafetyFlags,omitempty"`
	Events []any `json:"events"`
	FolderId any `json:"folderId"`
	FromTemplate *string `json:"fromTemplate,omitempty"`
	Groups []any `json:"groups"`
	Icon any `json:"icon"`
	Id string `json:"id"`
	IsArchived bool `json:"isArchived"`
	IsClosed bool `json:"isClosed"`
	Message any `json:"message"`
	Name string `json:"name"`
	Overwrite *bool `json:"overwrite,omitempty"`
	PublicId any `json:"publicId"`
	PublishedTypebot any `json:"publishedTypebot"`
	PublishedTypebotId *string `json:"publishedTypebotId,omitempty"`
	ResultsTablePreferences any `json:"resultsTablePreferences"`
	RiskLevel any `json:"riskLevel"`
	SelectedThemeTemplateId any `json:"selectedThemeTemplateId"`
	Settings map[string]any `json:"settings"`
	SpaceId any `json:"spaceId"`
	Theme map[string]any `json:"theme"`
	Typebot map[string]any `json:"typebot"`
	UpdatedAt string `json:"updatedAt"`
	Variables []any `json:"variables"`
	Version *any `json:"version,omitempty"`
	Warnings *[]any `json:"warnings,omitempty"`
	WhatsAppCredentialsId any `json:"whatsAppCredentialsId"`
	WorkspaceId string `json:"workspaceId"`
}

// TypebotLoadMatch is the typed request payload for Typebot.LoadTyped.
type TypebotLoadMatch struct {
	Id string `json:"id"`
}

// TypebotListMatch is the typed request payload for Typebot.ListTyped.
type TypebotListMatch struct {
	AccessRight *string `json:"accessRight,omitempty"`
	CreatedAt *string `json:"createdAt,omitempty"`
	CustomDomain *any `json:"customDomain,omitempty"`
	Edges *[]any `json:"edges,omitempty"`
	EnableSafetyFlags *bool `json:"enableSafetyFlags,omitempty"`
	Events *[]any `json:"events,omitempty"`
	FolderId *any `json:"folderId,omitempty"`
	FromTemplate *string `json:"fromTemplate,omitempty"`
	Groups *[]any `json:"groups,omitempty"`
	Icon *any `json:"icon,omitempty"`
	Id *string `json:"id,omitempty"`
	IsArchived *bool `json:"isArchived,omitempty"`
	IsClosed *bool `json:"isClosed,omitempty"`
	Message *any `json:"message,omitempty"`
	Name *string `json:"name,omitempty"`
	Overwrite *bool `json:"overwrite,omitempty"`
	PublicId *any `json:"publicId,omitempty"`
	PublishedTypebot *any `json:"publishedTypebot,omitempty"`
	PublishedTypebotId *string `json:"publishedTypebotId,omitempty"`
	ResultsTablePreferences *any `json:"resultsTablePreferences,omitempty"`
	RiskLevel *any `json:"riskLevel,omitempty"`
	SelectedThemeTemplateId *any `json:"selectedThemeTemplateId,omitempty"`
	Settings *map[string]any `json:"settings,omitempty"`
	SpaceId *any `json:"spaceId,omitempty"`
	Theme *map[string]any `json:"theme,omitempty"`
	Typebot *map[string]any `json:"typebot,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
	Variables *[]any `json:"variables,omitempty"`
	Version *any `json:"version,omitempty"`
	Warnings *[]any `json:"warnings,omitempty"`
	WhatsAppCredentialsId *any `json:"whatsAppCredentialsId,omitempty"`
	WorkspaceId *string `json:"workspaceId,omitempty"`
}

// TypebotCreateData is the typed request payload for Typebot.CreateTyped.
type TypebotCreateData struct {
	AccessRight string `json:"accessRight"`
	CreatedAt string `json:"createdAt"`
	CustomDomain any `json:"customDomain"`
	Edges []any `json:"edges"`
	EnableSafetyFlags *bool `json:"enableSafetyFlags,omitempty"`
	Events []any `json:"events"`
	FolderId any `json:"folderId"`
	FromTemplate *string `json:"fromTemplate,omitempty"`
	Groups []any `json:"groups"`
	Icon any `json:"icon"`
	Id string `json:"id"`
	IsArchived bool `json:"isArchived"`
	IsClosed bool `json:"isClosed"`
	Message any `json:"message"`
	Name string `json:"name"`
	Overwrite *bool `json:"overwrite,omitempty"`
	PublicId any `json:"publicId"`
	PublishedTypebot any `json:"publishedTypebot"`
	PublishedTypebotId *string `json:"publishedTypebotId,omitempty"`
	ResultsTablePreferences any `json:"resultsTablePreferences"`
	RiskLevel any `json:"riskLevel"`
	SelectedThemeTemplateId any `json:"selectedThemeTemplateId"`
	Settings map[string]any `json:"settings"`
	SpaceId any `json:"spaceId"`
	Theme map[string]any `json:"theme"`
	Typebot map[string]any `json:"typebot"`
	UpdatedAt string `json:"updatedAt"`
	Variables []any `json:"variables"`
	Version *any `json:"version,omitempty"`
	Warnings *[]any `json:"warnings,omitempty"`
	WhatsAppCredentialsId any `json:"whatsAppCredentialsId"`
	WorkspaceId string `json:"workspaceId"`
}

// TypebotUpdateData is the typed request payload for Typebot.UpdateTyped.
type TypebotUpdateData struct {
	Id string `json:"id"`
	AccessRight *string `json:"accessRight,omitempty"`
	CreatedAt *string `json:"createdAt,omitempty"`
	CustomDomain *any `json:"customDomain,omitempty"`
	Edges *[]any `json:"edges,omitempty"`
	EnableSafetyFlags *bool `json:"enableSafetyFlags,omitempty"`
	Events *[]any `json:"events,omitempty"`
	FolderId *any `json:"folderId,omitempty"`
	FromTemplate *string `json:"fromTemplate,omitempty"`
	Groups *[]any `json:"groups,omitempty"`
	Icon *any `json:"icon,omitempty"`
	IsArchived *bool `json:"isArchived,omitempty"`
	IsClosed *bool `json:"isClosed,omitempty"`
	Message *any `json:"message,omitempty"`
	Name *string `json:"name,omitempty"`
	Overwrite *bool `json:"overwrite,omitempty"`
	PublicId *any `json:"publicId,omitempty"`
	PublishedTypebot *any `json:"publishedTypebot,omitempty"`
	PublishedTypebotId *string `json:"publishedTypebotId,omitempty"`
	ResultsTablePreferences *any `json:"resultsTablePreferences,omitempty"`
	RiskLevel *any `json:"riskLevel,omitempty"`
	SelectedThemeTemplateId *any `json:"selectedThemeTemplateId,omitempty"`
	Settings *map[string]any `json:"settings,omitempty"`
	SpaceId *any `json:"spaceId,omitempty"`
	Theme *map[string]any `json:"theme,omitempty"`
	Typebot *map[string]any `json:"typebot,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
	Variables *[]any `json:"variables,omitempty"`
	Version *any `json:"version,omitempty"`
	Warnings *[]any `json:"warnings,omitempty"`
	WhatsAppCredentialsId *any `json:"whatsAppCredentialsId,omitempty"`
	WorkspaceId *string `json:"workspaceId,omitempty"`
}

// TypebotRemoveMatch is the typed request payload for Typebot.RemoveTyped.
type TypebotRemoveMatch struct {
	Id string `json:"id"`
}

// Workspace is the typed data model for the workspace entity.
type Workspace struct {
	ChatsHardLimit any `json:"chatsHardLimit"`
	CreatedAt string `json:"createdAt"`
	CustomChatsLimit any `json:"customChatsLimit"`
	CustomSeatsLimit any `json:"customSeatsLimit"`
	Icon any `json:"icon"`
	Id string `json:"id"`
	InactiveFirstEmailSentAt any `json:"inactiveFirstEmailSentAt"`
	InactiveSecondEmailSentAt any `json:"inactiveSecondEmailSentAt"`
	IsPastDue bool `json:"isPastDue"`
	IsSuspended bool `json:"isSuspended"`
	IsVerified any `json:"isVerified"`
	LastActivityAt any `json:"lastActivityAt"`
	Name string `json:"name"`
	Plan string `json:"plan"`
	Role string `json:"role"`
	Settings any `json:"settings"`
	StripeId any `json:"stripeId"`
	UpdatedAt string `json:"updatedAt"`
	User map[string]any `json:"user"`
	UserId string `json:"userId"`
	WorkspaceId string `json:"workspaceId"`
}

// WorkspaceLoadMatch is the typed request payload for Workspace.LoadTyped.
type WorkspaceLoadMatch struct {
	Id string `json:"id"`
}

// WorkspaceListMatch is the typed request payload for Workspace.ListTyped.
type WorkspaceListMatch struct {
	ChatsHardLimit *any `json:"chatsHardLimit,omitempty"`
	CreatedAt *string `json:"createdAt,omitempty"`
	CustomChatsLimit *any `json:"customChatsLimit,omitempty"`
	CustomSeatsLimit *any `json:"customSeatsLimit,omitempty"`
	Icon *any `json:"icon,omitempty"`
	Id *string `json:"id,omitempty"`
	InactiveFirstEmailSentAt *any `json:"inactiveFirstEmailSentAt,omitempty"`
	InactiveSecondEmailSentAt *any `json:"inactiveSecondEmailSentAt,omitempty"`
	IsPastDue *bool `json:"isPastDue,omitempty"`
	IsSuspended *bool `json:"isSuspended,omitempty"`
	IsVerified *any `json:"isVerified,omitempty"`
	LastActivityAt *any `json:"lastActivityAt,omitempty"`
	Name *string `json:"name,omitempty"`
	Plan *string `json:"plan,omitempty"`
	Role *string `json:"role,omitempty"`
	Settings *any `json:"settings,omitempty"`
	StripeId *any `json:"stripeId,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
	User *map[string]any `json:"user,omitempty"`
	UserId *string `json:"userId,omitempty"`
	WorkspaceId *string `json:"workspaceId,omitempty"`
}

// WorkspaceCreateData is the typed request payload for Workspace.CreateTyped.
type WorkspaceCreateData struct {
	ChatsHardLimit any `json:"chatsHardLimit"`
	CreatedAt string `json:"createdAt"`
	CustomChatsLimit any `json:"customChatsLimit"`
	CustomSeatsLimit any `json:"customSeatsLimit"`
	Icon any `json:"icon"`
	Id string `json:"id"`
	InactiveFirstEmailSentAt any `json:"inactiveFirstEmailSentAt"`
	InactiveSecondEmailSentAt any `json:"inactiveSecondEmailSentAt"`
	IsPastDue bool `json:"isPastDue"`
	IsSuspended bool `json:"isSuspended"`
	IsVerified any `json:"isVerified"`
	LastActivityAt any `json:"lastActivityAt"`
	Name string `json:"name"`
	Plan string `json:"plan"`
	Role string `json:"role"`
	Settings any `json:"settings"`
	StripeId any `json:"stripeId"`
	UpdatedAt string `json:"updatedAt"`
	User map[string]any `json:"user"`
	UserId string `json:"userId"`
	WorkspaceId string `json:"workspaceId"`
}

// WorkspaceUpdateData is the typed request payload for Workspace.UpdateTyped.
type WorkspaceUpdateData struct {
	Id string `json:"id"`
	ChatsHardLimit *any `json:"chatsHardLimit,omitempty"`
	CreatedAt *string `json:"createdAt,omitempty"`
	CustomChatsLimit *any `json:"customChatsLimit,omitempty"`
	CustomSeatsLimit *any `json:"customSeatsLimit,omitempty"`
	Icon *any `json:"icon,omitempty"`
	InactiveFirstEmailSentAt *any `json:"inactiveFirstEmailSentAt,omitempty"`
	InactiveSecondEmailSentAt *any `json:"inactiveSecondEmailSentAt,omitempty"`
	IsPastDue *bool `json:"isPastDue,omitempty"`
	IsSuspended *bool `json:"isSuspended,omitempty"`
	IsVerified *any `json:"isVerified,omitempty"`
	LastActivityAt *any `json:"lastActivityAt,omitempty"`
	Name *string `json:"name,omitempty"`
	Plan *string `json:"plan,omitempty"`
	Role *string `json:"role,omitempty"`
	Settings *any `json:"settings,omitempty"`
	StripeId *any `json:"stripeId,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
	User *map[string]any `json:"user,omitempty"`
	UserId *string `json:"userId,omitempty"`
	WorkspaceId *string `json:"workspaceId,omitempty"`
}

// WorkspaceRemoveMatch is the typed request payload for Workspace.RemoveTyped.
type WorkspaceRemoveMatch struct {
	Id string `json:"id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
