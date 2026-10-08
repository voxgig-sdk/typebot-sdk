package sdktest

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/typebot-sdk/go"
	"github.com/voxgig-sdk/typebot-sdk/go/core"

	vs "github.com/voxgig-sdk/typebot-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const workspaceEntityLiveStrict = true


type workspaceFailHook struct {
	sdk.BaseFeature
	unexpected int
}

func (f *workspaceFailHook) PreSpec(ctx *sdk.Context) {
	panic("workspace hook failed")
}

func (f *workspaceFailHook) PreUnexpected(ctx *sdk.Context) {
	f.unexpected++
}

func TestWorkspaceEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Workspace(nil)
		if ent == nil {
			t.Fatal("expected non-nil WorkspaceEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"workspace": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for si := range base.Workspace(nil).Stream("list", nil, nil) {
			if si.Err != nil {
				t.Fatalf("stream failed: %v", si.Err)
			}
			seen = append(seen, si.Item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for si := range streamSdk.Workspace(nil).Stream("list", nil, nil) {
				if si.Err != nil {
					t.Fatalf("stream failed: %v", si.Err)
				}
				if sub, ok := si.Item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, si.Item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("stream-error", func(t *testing.T) {
		offline := map[string]any{"net": map[string]any{"offline": true}}
		var streamerr error
		for si := range sdk.TestSDK(offline, nil).Workspace(nil).Stream("list", nil, nil) {
			if si.Err != nil {
				streamerr = si.Err
			}
		}
		if nil == streamerr || !strings.Contains(streamerr.Error(), "offline") {
			t.Fatalf("expected the transport failure as a stream value, got %v", streamerr)
		}

		quiet := map[string]any{"ctrl": map[string]any{"throw": false}}
		for si := range sdk.TestSDK(offline, nil).Workspace(nil).Stream("list", nil, quiet) {
			if si.Err != nil {
				t.Fatalf("throw false: expected no error value, got %v", si.Err)
			}
		}

		if fhHasFeature("rbac") {
			denied := sdk.TestSDK(nil, map[string]any{
				"feature": map[string]any{"rbac": map[string]any{"active": true, "deny": true}},
			})
			var denyerr error
			for si := range denied.Workspace(nil).Stream("list", nil, nil) {
				if si.Err != nil {
					denyerr = si.Err
				}
			}
			if sdkerr, ok := denyerr.(*core.TypebotError); !ok || "rbac_denied" != sdkerr.Code {
				t.Fatalf("expected the rbac denial as a stream value, got %v", denyerr)
			}
		}
	})

	t.Run("stream-ctrl", func(t *testing.T) {
		explain := map[string]any{}
		ctrl := map[string]any{"explain": explain}
		for range sdk.TestSDK(nil, nil).Workspace(nil).Stream("list", nil, map[string]any{"ctrl": ctrl}) {
		}
		if _, has := ctrl["stream"]; has || 1 != len(ctrl) {
			t.Fatalf("the stream changed the caller's ctrl")
		}
		if 0 == len(explain) {
			t.Fatalf("the caller's explain record was not filled")
		}
	})

	t.Run("unexpected", func(t *testing.T) {
		hook := &workspaceFailHook{
			BaseFeature: sdk.BaseFeature{Version: "0.0.1", Name: "failhook", Active: true}}
		client := sdk.TestSDK(nil, map[string]any{"extend": []any{hook}})

		_, err := client.Workspace(nil).List(nil, nil)
		if nil == err || !strings.Contains(err.Error(), "hook failed") {
			t.Fatalf("expected the hook's failure, got %v", err)
		}
		if 0 == hook.unexpected {
			t.Fatalf("PreUnexpected did not fire")
		}

		fired := hook.unexpected
		if _, err := client.Workspace(nil).List(nil, map[string]any{"throw": false}); nil != err {
			t.Fatalf("throw false: expected no error, got %v", err)
		}
		if fired == hook.unexpected {
			t.Fatalf("throw false: PreUnexpected did not fire")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Workspace(nil).List(map[string]any{"createdAt": 1}, nil)
		if sdkerr, ok := err.(*core.TypebotError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := workspaceBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "workspace." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		client := setup.client

		// CREATE
		workspaceRef01Ent := client.Workspace(nil)
		workspaceRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "workspace"}), "workspace_ref01"))

		workspaceRef01DataResult, err := workspaceRef01Ent.Create(workspaceRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		workspaceRef01Data = core.ToMapAny(entityData(workspaceRef01DataResult))
		if workspaceRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if workspaceRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		workspaceRef01Match := map[string]any{}

		workspaceRef01ListResult, err := workspaceRef01Ent.List(workspaceRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		workspaceRef01List, workspaceRef01ListOk := workspaceRef01ListResult.([]any)
		if !workspaceRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", workspaceRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(workspaceRef01List), map[string]any{"id": workspaceRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		workspaceRef01DataUp0Up := map[string]any{
			"id": workspaceRef01Data["id"],
		}

		workspaceRef01MarkdefUp0Name := "createdAt"
		workspaceRef01MarkdefUp0Value := fmt.Sprintf("Mark01-workspace_ref01_%d", setup.now)
		workspaceRef01DataUp0Up[workspaceRef01MarkdefUp0Name] = workspaceRef01MarkdefUp0Value

		workspaceRef01ResdataUp0Result, err := workspaceRef01Ent.Update(workspaceRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		workspaceRef01ResdataUp0 := core.ToMapAny(entityData(workspaceRef01ResdataUp0Result))
		if workspaceRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if workspaceRef01ResdataUp0["id"] != workspaceRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if workspaceRef01ResdataUp0[workspaceRef01MarkdefUp0Name] != workspaceRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", workspaceRef01MarkdefUp0Name, workspaceRef01ResdataUp0[workspaceRef01MarkdefUp0Name])
		}

		// LOAD
		workspaceRef01MatchDt0 := map[string]any{
			"id": workspaceRef01Data["id"],
		}
		workspaceRef01DataDt0Loaded, err := workspaceRef01Ent.Load(workspaceRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		workspaceRef01DataDt0LoadResult := core.ToMapAny(entityData(workspaceRef01DataDt0Loaded))
		if workspaceRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if workspaceRef01DataDt0LoadResult["id"] != workspaceRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		workspaceRef01MatchRm0 := map[string]any{
			"id": workspaceRef01Data["id"],
		}
		_, err = workspaceRef01Ent.Remove(workspaceRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		workspaceRef01MatchRt0 := map[string]any{}

		workspaceRef01ListRt0Result, err := workspaceRef01Ent.List(workspaceRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		workspaceRef01ListRt0, workspaceRef01ListRt0Ok := workspaceRef01ListRt0Result.([]any)
		if !workspaceRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", workspaceRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(workspaceRef01ListRt0), map[string]any{"id": workspaceRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func workspaceBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "workspace", "WorkspaceTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read workspace test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse workspace test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"workspace01", "workspace02", "workspace03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("TYPEBOT_TEST_WORKSPACE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"TYPEBOT_TEST_WORKSPACE_ENTID": idmap,
		"TYPEBOT_TEST_LIVE":      "FALSE",
		"TYPEBOT_TEST_EXPLAIN":   "FALSE",
		"TYPEBOT_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["TYPEBOT_TEST_WORKSPACE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["TYPEBOT_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["TYPEBOT_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewTypebotSDK(core.ToMapAny(mergedOpts))
	}

	live := env["TYPEBOT_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["TYPEBOT_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
