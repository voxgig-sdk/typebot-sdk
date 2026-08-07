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
    total_completed: float
    total_start: float
    total_view: float


class AnalyticsLoadMatch(TypedDict):
    typebot_id: str


class Billing(TypedDict):
    amount: float
    currency: str
    date: Any
    id: str
    resets_at: str
    total_chats_used: float
    url: str


class BillingLoadMatchRequired(TypedDict):
    id: str


class BillingLoadMatch(BillingLoadMatchRequired, total=False):
    amount: float
    currency: str
    date: Any
    resets_at: str
    total_chats_used: float
    url: str


class BillingListMatch(TypedDict, total=False):
    amount: float
    currency: str
    date: Any
    id: str
    resets_at: str
    total_chats_used: float
    url: str


class FolderRequired(TypedDict):
    created_at: str
    folder: dict
    id: str
    name: str
    parent_folder_id: str
    updated_at: str
    workspace_id: str


class Folder(FolderRequired, total=False):
    folder_name: str


class FolderLoadMatch(TypedDict):
    id: str


class FolderListMatch(TypedDict, total=False):
    created_at: str
    folder: dict
    folder_name: str
    id: str
    name: str
    parent_folder_id: str
    updated_at: str
    workspace_id: str


class FolderCreateDataRequired(TypedDict):
    created_at: str
    folder: dict
    id: str
    name: str
    parent_folder_id: str
    updated_at: str
    workspace_id: str


class FolderCreateData(FolderCreateDataRequired, total=False):
    folder_name: str


class FolderUpdateDataRequired(TypedDict):
    id: str


class FolderUpdateData(FolderUpdateDataRequired, total=False):
    created_at: str
    folder: dict
    folder_name: str
    name: str
    parent_folder_id: str
    updated_at: str
    workspace_id: str


class FolderRemoveMatch(TypedDict):
    id: str


class Result(TypedDict):
    answer: list
    context: Any
    created_at: str
    description: str
    detail: Any
    has_started: bool
    id: str
    is_archived: bool
    is_completed: bool
    last_chat_session_id: str
    result_id: str
    status: str
    typebot_id: str
    variable: list


class ResultLoadMatch(TypedDict):
    id: str
    typebot_id: str


class ResultListMatch(TypedDict):
    typebot_id: str


class ResultRemoveMatch(TypedDict):
    typebot_id: str


class TypebotRequired(TypedDict):
    access_right: str
    created_at: str
    current_user_mode: str
    custom_domain: Any
    edge: list
    event: list
    folder_id: str
    group: list
    icon: Any
    id: str
    is_archived: bool
    is_closed: bool
    message: Any
    name: str
    public_id: str
    published_typebot: Any
    results_table_preference: Any
    risk_level: Any
    selected_theme_template_id: str
    setting: dict
    space_id: str
    theme: dict
    typebot: Any
    updated_at: str
    variable: list
    whats_app_credentials_id: str
    workspace_id: str


class Typebot(TypebotRequired, total=False):
    enable_safety_flag: bool
    from_template: str
    overwrite: bool
    published_typebot_id: str
    version: Any
    warning: list


class TypebotLoadMatch(TypedDict):
    id: str


class TypebotListMatch(TypedDict, total=False):
    access_right: str
    created_at: str
    current_user_mode: str
    custom_domain: Any
    edge: list
    enable_safety_flag: bool
    event: list
    folder_id: str
    from_template: str
    group: list
    icon: Any
    id: str
    is_archived: bool
    is_closed: bool
    message: Any
    name: str
    overwrite: bool
    public_id: str
    published_typebot: Any
    published_typebot_id: str
    results_table_preference: Any
    risk_level: Any
    selected_theme_template_id: str
    setting: dict
    space_id: str
    theme: dict
    typebot: Any
    updated_at: str
    variable: list
    version: Any
    warning: list
    whats_app_credentials_id: str
    workspace_id: str


class TypebotCreateDataRequired(TypedDict):
    access_right: str
    created_at: str
    current_user_mode: str
    custom_domain: Any
    edge: list
    event: list
    folder_id: str
    group: list
    icon: Any
    id: str
    is_archived: bool
    is_closed: bool
    message: Any
    name: str
    public_id: str
    published_typebot: Any
    results_table_preference: Any
    risk_level: Any
    selected_theme_template_id: str
    setting: dict
    space_id: str
    theme: dict
    typebot: Any
    updated_at: str
    variable: list
    whats_app_credentials_id: str
    workspace_id: str


class TypebotCreateData(TypebotCreateDataRequired, total=False):
    enable_safety_flag: bool
    from_template: str
    overwrite: bool
    published_typebot_id: str
    version: Any
    warning: list


class TypebotUpdateDataRequired(TypedDict):
    id: str


class TypebotUpdateData(TypebotUpdateDataRequired, total=False):
    access_right: str
    created_at: str
    current_user_mode: str
    custom_domain: Any
    edge: list
    enable_safety_flag: bool
    event: list
    folder_id: str
    from_template: str
    group: list
    icon: Any
    is_archived: bool
    is_closed: bool
    message: Any
    name: str
    overwrite: bool
    public_id: str
    published_typebot: Any
    published_typebot_id: str
    results_table_preference: Any
    risk_level: Any
    selected_theme_template_id: str
    setting: dict
    space_id: str
    theme: dict
    typebot: Any
    updated_at: str
    variable: list
    version: Any
    warning: list
    whats_app_credentials_id: str
    workspace_id: str


class TypebotRemoveMatch(TypedDict):
    id: str


class Workspace(TypedDict):
    chats_hard_limit: Any
    created_at: str
    current_user_mode: str
    icon: Any
    id: str
    inactive_first_email_sent_at: Any
    inactive_second_email_sent_at: Any
    is_past_due: bool
    is_suspended: bool
    is_verified: bool
    last_activity_at: Any
    name: str
    plan: str
    role: str
    setting: Any
    stripe_id: str
    updated_at: str
    user: dict
    user_id: str
    workspace: dict
    workspace_id: str


class WorkspaceLoadMatch(TypedDict):
    id: str


class WorkspaceListMatch(TypedDict, total=False):
    chats_hard_limit: Any
    created_at: str
    current_user_mode: str
    icon: Any
    id: str
    inactive_first_email_sent_at: Any
    inactive_second_email_sent_at: Any
    is_past_due: bool
    is_suspended: bool
    is_verified: bool
    last_activity_at: Any
    name: str
    plan: str
    role: str
    setting: Any
    stripe_id: str
    updated_at: str
    user: dict
    user_id: str
    workspace: dict
    workspace_id: str


class WorkspaceCreateData(TypedDict):
    chats_hard_limit: Any
    created_at: str
    current_user_mode: str
    icon: Any
    id: str
    inactive_first_email_sent_at: Any
    inactive_second_email_sent_at: Any
    is_past_due: bool
    is_suspended: bool
    is_verified: bool
    last_activity_at: Any
    name: str
    plan: str
    role: str
    setting: Any
    stripe_id: str
    updated_at: str
    user: dict
    user_id: str
    workspace: dict
    workspace_id: str


class WorkspaceUpdateDataRequired(TypedDict):
    id: str


class WorkspaceUpdateData(WorkspaceUpdateDataRequired, total=False):
    chats_hard_limit: Any
    created_at: str
    current_user_mode: str
    icon: Any
    inactive_first_email_sent_at: Any
    inactive_second_email_sent_at: Any
    is_past_due: bool
    is_suspended: bool
    is_verified: bool
    last_activity_at: Any
    name: str
    plan: str
    role: str
    setting: Any
    stripe_id: str
    updated_at: str
    user: dict
    user_id: str
    workspace: dict
    workspace_id: str


class WorkspaceRemoveMatch(TypedDict):
    id: str
