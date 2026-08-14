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
		for item := range base.Workspace(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
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
			for item := range streamSdk.Workspace(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
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
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set TYPEBOT_TEST_WORKSPACE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		workspaceRef01Ent := client.Workspace(nil)
		workspaceRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "workspace"}, setup.data), "workspace_ref01"))

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
	idmap := vs.Transform(
		[]any{"workspace01", "workspace02", "workspace03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("TYPEBOT_TEST_WORKSPACE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"TYPEBOT_TEST_WORKSPACE_ENTID": idmap,
		"TYPEBOT_TEST_LIVE":      "FALSE",
		"TYPEBOT_TEST_EXPLAIN":   "FALSE",
		"TYPEBOT_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["TYPEBOT_TEST_WORKSPACE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["TYPEBOT_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["TYPEBOT_APIKEY"],
			},
			extra,
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
