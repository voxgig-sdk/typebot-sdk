export interface Analytics {
    totalCompleted: number;
    totalStarts: number;
    totalViews: number;
}
export interface AnalyticsLoadMatch {
    typebot_id: string;
    $action?: string;
    [action: string]: any;
}
export interface Billing {
    amount: number;
    currency: string;
    date: any;
    id: string;
    resetsAt: string;
    totalChatsUsed: number;
    url: string;
}
export interface BillingLoadMatch {
    amount?: number;
    currency?: string;
    date?: any;
    id: string;
    resetsAt?: string;
    totalChatsUsed?: number;
    url?: string;
    $action?: string;
    [action: string]: any;
}
export interface BillingListMatch {
    amount?: number;
    currency?: string;
    date?: any;
    id?: string;
    resetsAt?: string;
    totalChatsUsed?: number;
    url?: string;
    $action?: string;
    [action: string]: any;
}
export interface Folder {
    createdAt: string;
    folder: Record<string, any>;
    folderName?: string;
    id: string;
    name: string;
    parentFolderId: any;
    updatedAt: string;
    workspaceId: string;
}
export interface FolderLoadMatch {
    id: string;
}
export interface FolderListMatch {
    createdAt?: string;
    folder?: Record<string, any>;
    folderName?: string;
    id?: string;
    name?: string;
    parentFolderId?: any;
    updatedAt?: string;
    workspaceId?: string;
}
export interface FolderCreateData {
    createdAt: string;
    folder: Record<string, any>;
    folderName?: string;
    id: string;
    name: string;
    parentFolderId: any;
    updatedAt: string;
    workspaceId: string;
}
export interface FolderUpdateData {
    id: string;
    createdAt?: string;
    folder?: Record<string, any>;
    folderName?: string;
    name?: string;
    parentFolderId?: any;
    updatedAt?: string;
    workspaceId?: string;
}
export interface FolderRemoveMatch {
    id: string;
}
export interface Result {
    answers: any[];
    context: any;
    createdAt: string;
    description: string;
    details: any;
    hasStarted: any;
    id: string;
    isArchived: any;
    isCompleted: boolean;
    lastChatSessionId: any;
    resultId: string;
    status: string;
    typebotId: string;
    variables: any[];
}
export interface ResultLoadMatch {
    id: string;
    typebot_id: string;
}
export interface ResultListMatch {
    typebot_id: string;
    $action?: string;
    [action: string]: any;
}
export interface ResultRemoveMatch {
    typebot_id: string;
}
export interface Typebot {
    accessRight: string;
    createdAt: string;
    customDomain: any;
    edges: any[];
    enableSafetyFlags?: boolean;
    events: any[];
    folderId: any;
    fromTemplate?: string;
    groups: any[];
    icon: any;
    id: string;
    isArchived: boolean;
    isClosed: boolean;
    message: any;
    name: string;
    overwrite?: boolean;
    publicId: any;
    publishedTypebot: any;
    publishedTypebotId?: string;
    resultsTablePreferences: any;
    riskLevel: any;
    selectedThemeTemplateId: any;
    settings: Record<string, any>;
    spaceId: any;
    theme: Record<string, any>;
    typebot: Record<string, any>;
    updatedAt: string;
    variables: any[];
    version?: any;
    warnings?: any[];
    whatsAppCredentialsId: any;
    workspaceId: string;
}
export interface TypebotLoadMatch {
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface TypebotListMatch {
    accessRight?: string;
    createdAt?: string;
    customDomain?: any;
    edges?: any[];
    enableSafetyFlags?: boolean;
    events?: any[];
    folderId?: any;
    fromTemplate?: string;
    groups?: any[];
    icon?: any;
    id?: string;
    isArchived?: boolean;
    isClosed?: boolean;
    message?: any;
    name?: string;
    overwrite?: boolean;
    publicId?: any;
    publishedTypebot?: any;
    publishedTypebotId?: string;
    resultsTablePreferences?: any;
    riskLevel?: any;
    selectedThemeTemplateId?: any;
    settings?: Record<string, any>;
    spaceId?: any;
    theme?: Record<string, any>;
    typebot?: Record<string, any>;
    updatedAt?: string;
    variables?: any[];
    version?: any;
    warnings?: any[];
    whatsAppCredentialsId?: any;
    workspaceId?: string;
}
export interface TypebotCreateData {
    accessRight: string;
    createdAt: string;
    customDomain: any;
    edges: any[];
    enableSafetyFlags?: boolean;
    events: any[];
    folderId: any;
    fromTemplate?: string;
    groups: any[];
    icon: any;
    id: string;
    isArchived: boolean;
    isClosed: boolean;
    message: any;
    name: string;
    overwrite?: boolean;
    publicId: any;
    publishedTypebot: any;
    publishedTypebotId?: string;
    resultsTablePreferences: any;
    riskLevel: any;
    selectedThemeTemplateId: any;
    settings: Record<string, any>;
    spaceId: any;
    theme: Record<string, any>;
    typebot: Record<string, any>;
    updatedAt: string;
    variables: any[];
    version?: any;
    warnings?: any[];
    whatsAppCredentialsId: any;
    workspaceId: string;
    $action?: string;
    [action: string]: any;
}
export interface TypebotUpdateData {
    id: string;
    accessRight?: string;
    createdAt?: string;
    customDomain?: any;
    edges?: any[];
    enableSafetyFlags?: boolean;
    events?: any[];
    folderId?: any;
    fromTemplate?: string;
    groups?: any[];
    icon?: any;
    isArchived?: boolean;
    isClosed?: boolean;
    message?: any;
    name?: string;
    overwrite?: boolean;
    publicId?: any;
    publishedTypebot?: any;
    publishedTypebotId?: string;
    resultsTablePreferences?: any;
    riskLevel?: any;
    selectedThemeTemplateId?: any;
    settings?: Record<string, any>;
    spaceId?: any;
    theme?: Record<string, any>;
    typebot?: Record<string, any>;
    updatedAt?: string;
    variables?: any[];
    version?: any;
    warnings?: any[];
    whatsAppCredentialsId?: any;
    workspaceId?: string;
}
export interface TypebotRemoveMatch {
    id: string;
}
export interface Workspace {
    chatsHardLimit: any;
    createdAt: string;
    customChatsLimit: any;
    customSeatsLimit: any;
    icon: any;
    id: string;
    inactiveFirstEmailSentAt: any;
    inactiveSecondEmailSentAt: any;
    isPastDue: boolean;
    isSuspended: boolean;
    isVerified: any;
    lastActivityAt: any;
    name: string;
    plan: string;
    role: string;
    settings: any;
    stripeId: any;
    updatedAt: string;
    user: Record<string, any>;
    userId: string;
    workspaceId: string;
}
export interface WorkspaceLoadMatch {
    id: string;
}
export interface WorkspaceListMatch {
    chatsHardLimit?: any;
    createdAt?: string;
    customChatsLimit?: any;
    customSeatsLimit?: any;
    icon?: any;
    id?: string;
    inactiveFirstEmailSentAt?: any;
    inactiveSecondEmailSentAt?: any;
    isPastDue?: boolean;
    isSuspended?: boolean;
    isVerified?: any;
    lastActivityAt?: any;
    name?: string;
    plan?: string;
    role?: string;
    settings?: any;
    stripeId?: any;
    updatedAt?: string;
    user?: Record<string, any>;
    userId?: string;
    workspaceId?: string;
    $action?: string;
    [action: string]: any;
}
export interface WorkspaceCreateData {
    chatsHardLimit: any;
    createdAt: string;
    customChatsLimit: any;
    customSeatsLimit: any;
    icon: any;
    id: string;
    inactiveFirstEmailSentAt: any;
    inactiveSecondEmailSentAt: any;
    isPastDue: boolean;
    isSuspended: boolean;
    isVerified: any;
    lastActivityAt: any;
    name: string;
    plan: string;
    role: string;
    settings: any;
    stripeId: any;
    updatedAt: string;
    user: Record<string, any>;
    userId: string;
    workspaceId: string;
}
export interface WorkspaceUpdateData {
    id: string;
    chatsHardLimit?: any;
    createdAt?: string;
    customChatsLimit?: any;
    customSeatsLimit?: any;
    icon?: any;
    inactiveFirstEmailSentAt?: any;
    inactiveSecondEmailSentAt?: any;
    isPastDue?: boolean;
    isSuspended?: boolean;
    isVerified?: any;
    lastActivityAt?: any;
    name?: string;
    plan?: string;
    role?: string;
    settings?: any;
    stripeId?: any;
    updatedAt?: string;
    user?: Record<string, any>;
    userId?: string;
    workspaceId?: string;
}
export interface WorkspaceRemoveMatch {
    id: string;
}
