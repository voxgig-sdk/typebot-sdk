package voxgigtypebotsdk

import (
	"github.com/voxgig-sdk/typebot-sdk/go/core"
	"github.com/voxgig-sdk/typebot-sdk/go/entity"
	"github.com/voxgig-sdk/typebot-sdk/go/feature"
	_ "github.com/voxgig-sdk/typebot-sdk/go/utility"
)

// Type aliases preserve external API.
type TypebotSDK = core.TypebotSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type TypebotEntity = core.TypebotEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type TypebotError = core.TypebotError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAnalyticsEntityFunc = func(client *core.TypebotSDK, entopts map[string]any) core.TypebotEntity {
		return entity.NewAnalyticsEntity(client, entopts)
	}
	core.NewBillingEntityFunc = func(client *core.TypebotSDK, entopts map[string]any) core.TypebotEntity {
		return entity.NewBillingEntity(client, entopts)
	}
	core.NewFolderEntityFunc = func(client *core.TypebotSDK, entopts map[string]any) core.TypebotEntity {
		return entity.NewFolderEntity(client, entopts)
	}
	core.NewResultEntityFunc = func(client *core.TypebotSDK, entopts map[string]any) core.TypebotEntity {
		return entity.NewResultEntity(client, entopts)
	}
	core.NewTypebotEntityFunc = func(client *core.TypebotSDK, entopts map[string]any) core.TypebotEntity {
		return entity.NewTypebotEntity(client, entopts)
	}
	core.NewWorkspaceEntityFunc = func(client *core.TypebotSDK, entopts map[string]any) core.TypebotEntity {
		return entity.NewWorkspaceEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewTypebotSDK = core.NewTypebotSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewTypebotSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *TypebotSDK  { return NewTypebotSDK(nil) }
func Test() *TypebotSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
