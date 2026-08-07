package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAnalyticsEntityFunc func(client *TypebotSDK, entopts map[string]any) TypebotEntity

var NewBillingEntityFunc func(client *TypebotSDK, entopts map[string]any) TypebotEntity

var NewFolderEntityFunc func(client *TypebotSDK, entopts map[string]any) TypebotEntity

var NewResultEntityFunc func(client *TypebotSDK, entopts map[string]any) TypebotEntity

var NewTypebotEntityFunc func(client *TypebotSDK, entopts map[string]any) TypebotEntity

var NewWorkspaceEntityFunc func(client *TypebotSDK, entopts map[string]any) TypebotEntity

