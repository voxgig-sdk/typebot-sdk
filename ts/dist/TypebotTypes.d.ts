export interface Analytics {
    total_completed: number;
    total_start: number;
    total_view: number;
}
export interface AnalyticsLoadMatch {
    typebot_id: string;
}
export interface Billing {
    amount: number;
    currency: string;
    date: any;
    id: string;
    resets_at: string;
    total_chats_used: number;
    url: string;
}
export interface BillingLoadMatch {
    amount?: number;
    currency?: string;
    date?: any;
    id: string;
    resets_at?: string;
    total_chats_used?: number;
    url?: string;
}
export interface BillingListMatch {
    amount?: number;
    currency?: string;
    date?: any;
    id?: string;
    resets_at?: string;
    total_chats_used?: number;
    url?: string;
}
export interface Folder {
    created_at: string;
    folder: Record<string, any>;
    folder_name?: string;
    id: string;
    name: string;
    parent_folder_id: string;
    updated_at: string;
    workspace_id: string;
}
export interface FolderLoadMatch {
    id: string;
}
export interface FolderListMatch {
    created_at?: string;
    folder?: Record<string, any>;
    folder_name?: string;
    id?: string;
    name?: string;
    parent_folder_id?: string;
    updated_at?: string;
    workspace_id?: string;
}
export interface FolderCreateData {
    created_at: string;
    folder: Record<string, any>;
    folder_name?: string;
    id: string;
    name: string;
    parent_folder_id: string;
    updated_at: string;
    workspace_id: string;
}
export interface FolderUpdateData {
    id: string;
    created_at?: string;
    folder?: Record<string, any>;
    folder_name?: string;
    name?: string;
    parent_folder_id?: string;
    updated_at?: string;
    workspace_id?: string;
}
export interface FolderRemoveMatch {
    id: string;
}
export interface Result {
    answer: any[];
    context: any;
    created_at: string;
    description: string;
    detail: any;
    has_started: boolean;
    id: string;
    is_archived: boolean;
    is_completed: boolean;
    last_chat_session_id: string;
    result_id: string;
    status: string;
    typebot_id: string;
    variable: any[];
}
export interface ResultLoadMatch {
    id: string;
    typebot_id: string;
}
export interface ResultListMatch {
    typebot_id: string;
}
export interface ResultRemoveMatch {
    typebot_id: string;
}
export interface Typebot {
    access_right: string;
    created_at: string;
    current_user_mode: string;
    custom_domain: any;
    edge: any[];
    enable_safety_flag?: boolean;
    event: any[];
    folder_id: string;
    from_template?: string;
    group: any[];
    icon: any;
    id: string;
    is_archived: boolean;
    is_closed: boolean;
    message: any;
    name: string;
    overwrite?: boolean;
    public_id: string;
    published_typebot: any;
    published_typebot_id?: string;
    results_table_preference: any;
    risk_level: any;
    selected_theme_template_id: string;
    setting: Record<string, any>;
    space_id: string;
    theme: Record<string, any>;
    typebot: any;
    updated_at: string;
    variable: any[];
    version?: any;
    warning?: any[];
    whats_app_credentials_id: string;
    workspace_id: string;
}
export interface TypebotLoadMatch {
    id: string;
}
export interface TypebotListMatch {
    access_right?: string;
    created_at?: string;
    current_user_mode?: string;
    custom_domain?: any;
    edge?: any[];
    enable_safety_flag?: boolean;
    event?: any[];
    folder_id?: string;
    from_template?: string;
    group?: any[];
    icon?: any;
    id?: string;
    is_archived?: boolean;
    is_closed?: boolean;
    message?: any;
    name?: string;
    overwrite?: boolean;
    public_id?: string;
    published_typebot?: any;
    published_typebot_id?: string;
    results_table_preference?: any;
    risk_level?: any;
    selected_theme_template_id?: string;
    setting?: Record<string, any>;
    space_id?: string;
    theme?: Record<string, any>;
    typebot?: any;
    updated_at?: string;
    variable?: any[];
    version?: any;
    warning?: any[];
    whats_app_credentials_id?: string;
    workspace_id?: string;
}
export interface TypebotCreateData {
    access_right: string;
    created_at: string;
    current_user_mode: string;
    custom_domain: any;
    edge: any[];
    enable_safety_flag?: boolean;
    event: any[];
    folder_id: string;
    from_template?: string;
    group: any[];
    icon: any;
    id: string;
    is_archived: boolean;
    is_closed: boolean;
    message: any;
    name: string;
    overwrite?: boolean;
    public_id: string;
    published_typebot: any;
    published_typebot_id?: string;
    results_table_preference: any;
    risk_level: any;
    selected_theme_template_id: string;
    setting: Record<string, any>;
    space_id: string;
    theme: Record<string, any>;
    typebot: any;
    updated_at: string;
    variable: any[];
    version?: any;
    warning?: any[];
    whats_app_credentials_id: string;
    workspace_id: string;
}
export interface TypebotUpdateData {
    id: string;
    access_right?: string;
    created_at?: string;
    current_user_mode?: string;
    custom_domain?: any;
    edge?: any[];
    enable_safety_flag?: boolean;
    event?: any[];
    folder_id?: string;
    from_template?: string;
    group?: any[];
    icon?: any;
    is_archived?: boolean;
    is_closed?: boolean;
    message?: any;
    name?: string;
    overwrite?: boolean;
    public_id?: string;
    published_typebot?: any;
    published_typebot_id?: string;
    results_table_preference?: any;
    risk_level?: any;
    selected_theme_template_id?: string;
    setting?: Record<string, any>;
    space_id?: string;
    theme?: Record<string, any>;
    typebot?: any;
    updated_at?: string;
    variable?: any[];
    version?: any;
    warning?: any[];
    whats_app_credentials_id?: string;
    workspace_id?: string;
}
export interface TypebotRemoveMatch {
    id: string;
}
export interface Workspace {
    chats_hard_limit: any;
    created_at: string;
    current_user_mode: string;
    icon: any;
    id: string;
    inactive_first_email_sent_at: any;
    inactive_second_email_sent_at: any;
    is_past_due: boolean;
    is_suspended: boolean;
    is_verified: boolean;
    last_activity_at: any;
    name: string;
    plan: string;
    role: string;
    setting: any;
    stripe_id: string;
    updated_at: string;
    user: Record<string, any>;
    user_id: string;
    workspace: Record<string, any>;
    workspace_id: string;
}
export interface WorkspaceLoadMatch {
    id: string;
}
export interface WorkspaceListMatch {
    chats_hard_limit?: any;
    created_at?: string;
    current_user_mode?: string;
    icon?: any;
    id?: string;
    inactive_first_email_sent_at?: any;
    inactive_second_email_sent_at?: any;
    is_past_due?: boolean;
    is_suspended?: boolean;
    is_verified?: boolean;
    last_activity_at?: any;
    name?: string;
    plan?: string;
    role?: string;
    setting?: any;
    stripe_id?: string;
    updated_at?: string;
    user?: Record<string, any>;
    user_id?: string;
    workspace?: Record<string, any>;
    workspace_id?: string;
}
export interface WorkspaceCreateData {
    chats_hard_limit: any;
    created_at: string;
    current_user_mode: string;
    icon: any;
    id: string;
    inactive_first_email_sent_at: any;
    inactive_second_email_sent_at: any;
    is_past_due: boolean;
    is_suspended: boolean;
    is_verified: boolean;
    last_activity_at: any;
    name: string;
    plan: string;
    role: string;
    setting: any;
    stripe_id: string;
    updated_at: string;
    user: Record<string, any>;
    user_id: string;
    workspace: Record<string, any>;
    workspace_id: string;
}
export interface WorkspaceUpdateData {
    id: string;
    chats_hard_limit?: any;
    created_at?: string;
    current_user_mode?: string;
    icon?: any;
    inactive_first_email_sent_at?: any;
    inactive_second_email_sent_at?: any;
    is_past_due?: boolean;
    is_suspended?: boolean;
    is_verified?: boolean;
    last_activity_at?: any;
    name?: string;
    plan?: string;
    role?: string;
    setting?: any;
    stripe_id?: string;
    updated_at?: string;
    user?: Record<string, any>;
    user_id?: string;
    workspace?: Record<string, any>;
    workspace_id?: string;
}
export interface WorkspaceRemoveMatch {
    id: string;
}
