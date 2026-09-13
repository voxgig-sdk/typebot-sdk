# Typed models for the Typebot SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Analytics(TypedDict):
    totalCompleted: float
    totalStarts: float
    totalViews: float


class AnalyticsLoadMatchRequired(TypedDict):
    typebot_id: str


class AnalyticsLoadMatch(AnalyticsLoadMatchRequired, total=False):
    time_filter: str
    time_zone: str


class Billing(TypedDict):
    amount: float
    currency: str
    date: Any
    id: str
    resetsAt: str
    totalChatsUsed: float
    url: str


class BillingLoadMatch(TypedDict):
    workspace_id: str


class BillingListMatch(TypedDict):
    workspace_id: str


class FolderRequired(TypedDict):
    createdAt: str
    folder: dict
    id: str
    name: str
    parentFolderId: Any
    updatedAt: str
    workspaceId: str


class Folder(FolderRequired, total=False):
    folderName: str


class FolderLoadMatch(TypedDict):
    id: str
    workspace_id: str


class FolderListMatchRequired(TypedDict):
    workspace_id: str


class FolderListMatch(FolderListMatchRequired, total=False):
    parent_folder_id: str


class FolderCreateDataRequired(TypedDict):
    createdAt: str
    folder: dict
    id: str
    name: str
    parentFolderId: Any
    updatedAt: str
    workspaceId: str


class FolderCreateData(FolderCreateDataRequired, total=False):
    folderName: str


class FolderUpdateDataRequired(TypedDict):
    id: str


class FolderUpdateData(FolderUpdateDataRequired, total=False):
    createdAt: str
    folder: dict
    folderName: str
    name: str
    parentFolderId: Any
    updatedAt: str
    workspaceId: str


class FolderRemoveMatch(TypedDict):
    id: str


class Result(TypedDict):
    answers: list
    context: Any
    createdAt: str
    description: str
    details: Any
    hasStarted: Any
    id: str
    isArchived: Any
    isCompleted: bool
    lastChatSessionId: Any
    resultId: str
    status: str
    typebotId: str
    variables: list


class ResultLoadMatch(TypedDict):
    id: str
    typebot_id: str


class ResultListMatchRequired(TypedDict):
    typebot_id: str


class ResultListMatch(ResultListMatchRequired, total=False):
    cursor: float
    limit: float
    time_filter: str
    time_zone: str


class ResultRemoveMatch(TypedDict):
    typebot_id: str


class TypebotRequired(TypedDict):
    accessRight: str
    createdAt: str
    customDomain: Any
    edges: list
    events: list
    folderId: Any
    groups: list
    icon: Any
    id: str
    isArchived: bool
    isClosed: bool
    message: Any
    name: str
    publicId: Any
    publishedTypebot: Any
    resultsTablePreferences: Any
    riskLevel: Any
    selectedThemeTemplateId: Any
    settings: dict
    spaceId: Any
    theme: dict
    typebot: dict
    updatedAt: str
    variables: list
    whatsAppCredentialsId: Any
    workspaceId: str


class Typebot(TypebotRequired, total=False):
    enableSafetyFlags: bool
    fromTemplate: str
    overwrite: bool
    publishedTypebotId: str
    version: Any
    warnings: list


class TypebotLoadMatchRequired(TypedDict):
    id: str


class TypebotLoadMatch(TypebotLoadMatchRequired, total=False):
    migrate_to_latest_version: bool


class TypebotListMatchRequired(TypedDict):
    workspace_id: str


class TypebotListMatch(TypebotListMatchRequired, total=False):
    folder_id: str


class TypebotCreateDataRequired(TypedDict):
    accessRight: str
    createdAt: str
    customDomain: Any
    edges: list
    events: list
    folderId: Any
    groups: list
    icon: Any
    id: str
    isArchived: bool
    isClosed: bool
    message: Any
    name: str
    publicId: Any
    publishedTypebot: Any
    resultsTablePreferences: Any
    riskLevel: Any
    selectedThemeTemplateId: Any
    settings: dict
    spaceId: Any
    theme: dict
    typebot: dict
    updatedAt: str
    variables: list
    whatsAppCredentialsId: Any
    workspaceId: str


class TypebotCreateData(TypebotCreateDataRequired, total=False):
    enableSafetyFlags: bool
    fromTemplate: str
    overwrite: bool
    publishedTypebotId: str
    version: Any
    warnings: list


class TypebotUpdateDataRequired(TypedDict):
    id: str


class TypebotUpdateData(TypebotUpdateDataRequired, total=False):
    accessRight: str
    createdAt: str
    customDomain: Any
    edges: list
    enableSafetyFlags: bool
    events: list
    folderId: Any
    fromTemplate: str
    groups: list
    icon: Any
    isArchived: bool
    isClosed: bool
    message: Any
    name: str
    overwrite: bool
    publicId: Any
    publishedTypebot: Any
    publishedTypebotId: str
    resultsTablePreferences: Any
    riskLevel: Any
    selectedThemeTemplateId: Any
    settings: dict
    spaceId: Any
    theme: dict
    typebot: dict
    updatedAt: str
    variables: list
    version: Any
    warnings: list
    whatsAppCredentialsId: Any
    workspaceId: str


class TypebotRemoveMatch(TypedDict):
    id: str


class Workspace(TypedDict):
    chatsHardLimit: Any
    createdAt: str
    customChatsLimit: Any
    customSeatsLimit: Any
    icon: Any
    id: str
    inactiveFirstEmailSentAt: Any
    inactiveSecondEmailSentAt: Any
    isPastDue: bool
    isSuspended: bool
    isVerified: Any
    lastActivityAt: Any
    name: str
    plan: str
    role: str
    settings: Any
    stripeId: Any
    updatedAt: str
    user: dict
    userId: str
    workspaceId: str


class WorkspaceLoadMatch(TypedDict):
    id: str


class WorkspaceListMatch(TypedDict, total=False):
    chatsHardLimit: Any
    createdAt: str
    customChatsLimit: Any
    customSeatsLimit: Any
    icon: Any
    id: str
    inactiveFirstEmailSentAt: Any
    inactiveSecondEmailSentAt: Any
    isPastDue: bool
    isSuspended: bool
    isVerified: Any
    lastActivityAt: Any
    name: str
    plan: str
    role: str
    settings: Any
    stripeId: Any
    updatedAt: str
    user: dict
    userId: str
    workspaceId: str


class WorkspaceCreateData(TypedDict):
    chatsHardLimit: Any
    createdAt: str
    customChatsLimit: Any
    customSeatsLimit: Any
    icon: Any
    id: str
    inactiveFirstEmailSentAt: Any
    inactiveSecondEmailSentAt: Any
    isPastDue: bool
    isSuspended: bool
    isVerified: Any
    lastActivityAt: Any
    name: str
    plan: str
    role: str
    settings: Any
    stripeId: Any
    updatedAt: str
    user: dict
    userId: str
    workspaceId: str


class WorkspaceUpdateDataRequired(TypedDict):
    id: str


class WorkspaceUpdateData(WorkspaceUpdateDataRequired, total=False):
    chatsHardLimit: Any
    createdAt: str
    customChatsLimit: Any
    customSeatsLimit: Any
    icon: Any
    inactiveFirstEmailSentAt: Any
    inactiveSecondEmailSentAt: Any
    isPastDue: bool
    isSuspended: bool
    isVerified: Any
    lastActivityAt: Any
    name: str
    plan: str
    role: str
    settings: Any
    stripeId: Any
    updatedAt: str
    user: dict
    userId: str
    workspaceId: str


class WorkspaceRemoveMatch(TypedDict):
    id: str
