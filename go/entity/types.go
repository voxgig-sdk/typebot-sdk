// Typed models for the Typebot SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Analytics is the typed data model for the analytics entity.
type Analytics struct {
	TotalCompleted float64 `json:"total_completed"`
	TotalStart float64 `json:"total_start"`
	TotalView float64 `json:"total_view"`
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
	ResetsAt string `json:"resets_at"`
	TotalChatsUsed float64 `json:"total_chats_used"`
	Url string `json:"url"`
}

// BillingLoadMatch is the typed request payload for Billing.LoadTyped.
type BillingLoadMatch struct {
	Amount *float64 `json:"amount,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Date *any `json:"date,omitempty"`
	Id string `json:"id"`
	ResetsAt *string `json:"resets_at,omitempty"`
	TotalChatsUsed *float64 `json:"total_chats_used,omitempty"`
	Url *string `json:"url,omitempty"`
}

// BillingListMatch is the typed request payload for Billing.ListTyped.
type BillingListMatch struct {
	Amount *float64 `json:"amount,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Date *any `json:"date,omitempty"`
	Id *string `json:"id,omitempty"`
	ResetsAt *string `json:"resets_at,omitempty"`
	TotalChatsUsed *float64 `json:"total_chats_used,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Folder is the typed data model for the folder entity.
type Folder struct {
	CreatedAt string `json:"created_at"`
	Folder map[string]any `json:"folder"`
	FolderName *string `json:"folder_name,omitempty"`
	Id string `json:"id"`
	Name string `json:"name"`
	ParentFolderId string `json:"parent_folder_id"`
	UpdatedAt string `json:"updated_at"`
	WorkspaceId string `json:"workspace_id"`
}

// FolderLoadMatch is the typed request payload for Folder.LoadTyped.
type FolderLoadMatch struct {
	Id string `json:"id"`
}

// FolderListMatch is the typed request payload for Folder.ListTyped.
type FolderListMatch struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Folder *map[string]any `json:"folder,omitempty"`
	FolderName *string `json:"folder_name,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	ParentFolderId *string `json:"parent_folder_id,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	WorkspaceId *string `json:"workspace_id,omitempty"`
}

// FolderCreateData is the typed request payload for Folder.CreateTyped.
type FolderCreateData struct {
	CreatedAt string `json:"created_at"`
	Folder map[string]any `json:"folder"`
	FolderName *string `json:"folder_name,omitempty"`
	Id string `json:"id"`
	Name string `json:"name"`
	ParentFolderId string `json:"parent_folder_id"`
	UpdatedAt string `json:"updated_at"`
	WorkspaceId string `json:"workspace_id"`
}

// FolderUpdateData is the typed request payload for Folder.UpdateTyped.
type FolderUpdateData struct {
	Id string `json:"id"`
	CreatedAt *string `json:"created_at,omitempty"`
	Folder *map[string]any `json:"folder,omitempty"`
	FolderName *string `json:"folder_name,omitempty"`
	Name *string `json:"name,omitempty"`
	ParentFolderId *string `json:"parent_folder_id,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	WorkspaceId *string `json:"workspace_id,omitempty"`
}

// FolderRemoveMatch is the typed request payload for Folder.RemoveTyped.
type FolderRemoveMatch struct {
	Id string `json:"id"`
}

// Result is the typed data model for the result entity.
type Result struct {
	Answer []any `json:"answer"`
	Context any `json:"context"`
	CreatedAt string `json:"created_at"`
	Description string `json:"description"`
	Detail any `json:"detail"`
	HasStarted bool `json:"has_started"`
	Id string `json:"id"`
	IsArchived bool `json:"is_archived"`
	IsCompleted bool `json:"is_completed"`
	LastChatSessionId string `json:"last_chat_session_id"`
	ResultId string `json:"result_id"`
	Status string `json:"status"`
	TypebotId string `json:"typebot_id"`
	Variable []any `json:"variable"`
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
	AccessRight string `json:"access_right"`
	CreatedAt string `json:"created_at"`
	CurrentUserMode string `json:"current_user_mode"`
	CustomDomain any `json:"custom_domain"`
	Edge []any `json:"edge"`
	EnableSafetyFlag *bool `json:"enable_safety_flag,omitempty"`
	Event []any `json:"event"`
	FolderId string `json:"folder_id"`
	FromTemplate *string `json:"from_template,omitempty"`
	Group []any `json:"group"`
	Icon any `json:"icon"`
	Id string `json:"id"`
	IsArchived bool `json:"is_archived"`
	IsClosed bool `json:"is_closed"`
	Message any `json:"message"`
	Name string `json:"name"`
	Overwrite *bool `json:"overwrite,omitempty"`
	PublicId string `json:"public_id"`
	PublishedTypebot any `json:"published_typebot"`
	PublishedTypebotId *string `json:"published_typebot_id,omitempty"`
	ResultsTablePreference any `json:"results_table_preference"`
	RiskLevel any `json:"risk_level"`
	SelectedThemeTemplateId string `json:"selected_theme_template_id"`
	Setting map[string]any `json:"setting"`
	SpaceId string `json:"space_id"`
	Theme map[string]any `json:"theme"`
	Typebot any `json:"typebot"`
	UpdatedAt string `json:"updated_at"`
	Variable []any `json:"variable"`
	Version *any `json:"version,omitempty"`
	Warning *[]any `json:"warning,omitempty"`
	WhatsAppCredentialsId string `json:"whats_app_credentials_id"`
	WorkspaceId string `json:"workspace_id"`
}

// TypebotLoadMatch is the typed request payload for Typebot.LoadTyped.
type TypebotLoadMatch struct {
	Id string `json:"id"`
}

// TypebotListMatch is the typed request payload for Typebot.ListTyped.
type TypebotListMatch struct {
	AccessRight *string `json:"access_right,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	CurrentUserMode *string `json:"current_user_mode,omitempty"`
	CustomDomain *any `json:"custom_domain,omitempty"`
	Edge *[]any `json:"edge,omitempty"`
	EnableSafetyFlag *bool `json:"enable_safety_flag,omitempty"`
	Event *[]any `json:"event,omitempty"`
	FolderId *string `json:"folder_id,omitempty"`
	FromTemplate *string `json:"from_template,omitempty"`
	Group *[]any `json:"group,omitempty"`
	Icon *any `json:"icon,omitempty"`
	Id *string `json:"id,omitempty"`
	IsArchived *bool `json:"is_archived,omitempty"`
	IsClosed *bool `json:"is_closed,omitempty"`
	Message *any `json:"message,omitempty"`
	Name *string `json:"name,omitempty"`
	Overwrite *bool `json:"overwrite,omitempty"`
	PublicId *string `json:"public_id,omitempty"`
	PublishedTypebot *any `json:"published_typebot,omitempty"`
	PublishedTypebotId *string `json:"published_typebot_id,omitempty"`
	ResultsTablePreference *any `json:"results_table_preference,omitempty"`
	RiskLevel *any `json:"risk_level,omitempty"`
	SelectedThemeTemplateId *string `json:"selected_theme_template_id,omitempty"`
	Setting *map[string]any `json:"setting,omitempty"`
	SpaceId *string `json:"space_id,omitempty"`
	Theme *map[string]any `json:"theme,omitempty"`
	Typebot *any `json:"typebot,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Variable *[]any `json:"variable,omitempty"`
	Version *any `json:"version,omitempty"`
	Warning *[]any `json:"warning,omitempty"`
	WhatsAppCredentialsId *string `json:"whats_app_credentials_id,omitempty"`
	WorkspaceId *string `json:"workspace_id,omitempty"`
}

// TypebotCreateData is the typed request payload for Typebot.CreateTyped.
type TypebotCreateData struct {
	AccessRight string `json:"access_right"`
	CreatedAt string `json:"created_at"`
	CurrentUserMode string `json:"current_user_mode"`
	CustomDomain any `json:"custom_domain"`
	Edge []any `json:"edge"`
	EnableSafetyFlag *bool `json:"enable_safety_flag,omitempty"`
	Event []any `json:"event"`
	FolderId string `json:"folder_id"`
	FromTemplate *string `json:"from_template,omitempty"`
	Group []any `json:"group"`
	Icon any `json:"icon"`
	Id string `json:"id"`
	IsArchived bool `json:"is_archived"`
	IsClosed bool `json:"is_closed"`
	Message any `json:"message"`
	Name string `json:"name"`
	Overwrite *bool `json:"overwrite,omitempty"`
	PublicId string `json:"public_id"`
	PublishedTypebot any `json:"published_typebot"`
	PublishedTypebotId *string `json:"published_typebot_id,omitempty"`
	ResultsTablePreference any `json:"results_table_preference"`
	RiskLevel any `json:"risk_level"`
	SelectedThemeTemplateId string `json:"selected_theme_template_id"`
	Setting map[string]any `json:"setting"`
	SpaceId string `json:"space_id"`
	Theme map[string]any `json:"theme"`
	Typebot any `json:"typebot"`
	UpdatedAt string `json:"updated_at"`
	Variable []any `json:"variable"`
	Version *any `json:"version,omitempty"`
	Warning *[]any `json:"warning,omitempty"`
	WhatsAppCredentialsId string `json:"whats_app_credentials_id"`
	WorkspaceId string `json:"workspace_id"`
}

// TypebotUpdateData is the typed request payload for Typebot.UpdateTyped.
type TypebotUpdateData struct {
	Id string `json:"id"`
	AccessRight *string `json:"access_right,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	CurrentUserMode *string `json:"current_user_mode,omitempty"`
	CustomDomain *any `json:"custom_domain,omitempty"`
	Edge *[]any `json:"edge,omitempty"`
	EnableSafetyFlag *bool `json:"enable_safety_flag,omitempty"`
	Event *[]any `json:"event,omitempty"`
	FolderId *string `json:"folder_id,omitempty"`
	FromTemplate *string `json:"from_template,omitempty"`
	Group *[]any `json:"group,omitempty"`
	Icon *any `json:"icon,omitempty"`
	IsArchived *bool `json:"is_archived,omitempty"`
	IsClosed *bool `json:"is_closed,omitempty"`
	Message *any `json:"message,omitempty"`
	Name *string `json:"name,omitempty"`
	Overwrite *bool `json:"overwrite,omitempty"`
	PublicId *string `json:"public_id,omitempty"`
	PublishedTypebot *any `json:"published_typebot,omitempty"`
	PublishedTypebotId *string `json:"published_typebot_id,omitempty"`
	ResultsTablePreference *any `json:"results_table_preference,omitempty"`
	RiskLevel *any `json:"risk_level,omitempty"`
	SelectedThemeTemplateId *string `json:"selected_theme_template_id,omitempty"`
	Setting *map[string]any `json:"setting,omitempty"`
	SpaceId *string `json:"space_id,omitempty"`
	Theme *map[string]any `json:"theme,omitempty"`
	Typebot *any `json:"typebot,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Variable *[]any `json:"variable,omitempty"`
	Version *any `json:"version,omitempty"`
	Warning *[]any `json:"warning,omitempty"`
	WhatsAppCredentialsId *string `json:"whats_app_credentials_id,omitempty"`
	WorkspaceId *string `json:"workspace_id,omitempty"`
}

// TypebotRemoveMatch is the typed request payload for Typebot.RemoveTyped.
type TypebotRemoveMatch struct {
	Id string `json:"id"`
}

// Workspace is the typed data model for the workspace entity.
type Workspace struct {
	ChatsHardLimit any `json:"chats_hard_limit"`
	CreatedAt string `json:"created_at"`
	CurrentUserMode string `json:"current_user_mode"`
	Icon any `json:"icon"`
	Id string `json:"id"`
	InactiveFirstEmailSentAt any `json:"inactive_first_email_sent_at"`
	InactiveSecondEmailSentAt any `json:"inactive_second_email_sent_at"`
	IsPastDue bool `json:"is_past_due"`
	IsSuspended bool `json:"is_suspended"`
	IsVerified bool `json:"is_verified"`
	LastActivityAt any `json:"last_activity_at"`
	Name string `json:"name"`
	Plan string `json:"plan"`
	Role string `json:"role"`
	Setting any `json:"setting"`
	StripeId string `json:"stripe_id"`
	UpdatedAt string `json:"updated_at"`
	User map[string]any `json:"user"`
	UserId string `json:"user_id"`
	Workspace map[string]any `json:"workspace"`
	WorkspaceId string `json:"workspace_id"`
}

// WorkspaceLoadMatch is the typed request payload for Workspace.LoadTyped.
type WorkspaceLoadMatch struct {
	Id string `json:"id"`
}

// WorkspaceListMatch is the typed request payload for Workspace.ListTyped.
type WorkspaceListMatch struct {
	ChatsHardLimit *any `json:"chats_hard_limit,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	CurrentUserMode *string `json:"current_user_mode,omitempty"`
	Icon *any `json:"icon,omitempty"`
	Id *string `json:"id,omitempty"`
	InactiveFirstEmailSentAt *any `json:"inactive_first_email_sent_at,omitempty"`
	InactiveSecondEmailSentAt *any `json:"inactive_second_email_sent_at,omitempty"`
	IsPastDue *bool `json:"is_past_due,omitempty"`
	IsSuspended *bool `json:"is_suspended,omitempty"`
	IsVerified *bool `json:"is_verified,omitempty"`
	LastActivityAt *any `json:"last_activity_at,omitempty"`
	Name *string `json:"name,omitempty"`
	Plan *string `json:"plan,omitempty"`
	Role *string `json:"role,omitempty"`
	Setting *any `json:"setting,omitempty"`
	StripeId *string `json:"stripe_id,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	User *map[string]any `json:"user,omitempty"`
	UserId *string `json:"user_id,omitempty"`
	Workspace *map[string]any `json:"workspace,omitempty"`
	WorkspaceId *string `json:"workspace_id,omitempty"`
}

// WorkspaceCreateData is the typed request payload for Workspace.CreateTyped.
type WorkspaceCreateData struct {
	ChatsHardLimit any `json:"chats_hard_limit"`
	CreatedAt string `json:"created_at"`
	CurrentUserMode string `json:"current_user_mode"`
	Icon any `json:"icon"`
	Id string `json:"id"`
	InactiveFirstEmailSentAt any `json:"inactive_first_email_sent_at"`
	InactiveSecondEmailSentAt any `json:"inactive_second_email_sent_at"`
	IsPastDue bool `json:"is_past_due"`
	IsSuspended bool `json:"is_suspended"`
	IsVerified bool `json:"is_verified"`
	LastActivityAt any `json:"last_activity_at"`
	Name string `json:"name"`
	Plan string `json:"plan"`
	Role string `json:"role"`
	Setting any `json:"setting"`
	StripeId string `json:"stripe_id"`
	UpdatedAt string `json:"updated_at"`
	User map[string]any `json:"user"`
	UserId string `json:"user_id"`
	Workspace map[string]any `json:"workspace"`
	WorkspaceId string `json:"workspace_id"`
}

// WorkspaceUpdateData is the typed request payload for Workspace.UpdateTyped.
type WorkspaceUpdateData struct {
	Id string `json:"id"`
	ChatsHardLimit *any `json:"chats_hard_limit,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	CurrentUserMode *string `json:"current_user_mode,omitempty"`
	Icon *any `json:"icon,omitempty"`
	InactiveFirstEmailSentAt *any `json:"inactive_first_email_sent_at,omitempty"`
	InactiveSecondEmailSentAt *any `json:"inactive_second_email_sent_at,omitempty"`
	IsPastDue *bool `json:"is_past_due,omitempty"`
	IsSuspended *bool `json:"is_suspended,omitempty"`
	IsVerified *bool `json:"is_verified,omitempty"`
	LastActivityAt *any `json:"last_activity_at,omitempty"`
	Name *string `json:"name,omitempty"`
	Plan *string `json:"plan,omitempty"`
	Role *string `json:"role,omitempty"`
	Setting *any `json:"setting,omitempty"`
	StripeId *string `json:"stripe_id,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	User *map[string]any `json:"user,omitempty"`
	UserId *string `json:"user_id,omitempty"`
	Workspace *map[string]any `json:"workspace,omitempty"`
	WorkspaceId *string `json:"workspace_id,omitempty"`
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

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
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

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
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
