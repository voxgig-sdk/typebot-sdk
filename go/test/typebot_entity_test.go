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

func TestTypebotEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Typebot(nil)
		if ent == nil {
			t.Fatal("expected non-nil TypebotEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"typebot": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Typebot(nil).Stream("list", nil, nil) {
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
			for item := range streamSdk.Typebot(nil).Stream("list", nil, nil) {
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
		setup := typebotBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "typebot." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set TYPEBOT_TEST_TYPEBOT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		typebotRef01Ent := client.Typebot(nil)
		typebotRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "typebot"}), "typebot_ref01"))

		typebotRef01DataResult, err := typebotRef01Ent.Create(typebotRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		typebotRef01Data = core.ToMapAny(entityData(typebotRef01DataResult))
		if typebotRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if typebotRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		typebotRef01Match := map[string]any{}

		typebotRef01ListResult, err := typebotRef01Ent.List(typebotRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		typebotRef01List, typebotRef01ListOk := typebotRef01ListResult.([]any)
		if !typebotRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", typebotRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(typebotRef01List), map[string]any{"id": typebotRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		typebotRef01DataUp0Up := map[string]any{
			"id": typebotRef01Data["id"],
		}

		typebotRef01MarkdefUp0Name := "accessRight"
		typebotRef01MarkdefUp0Value := fmt.Sprintf("Mark01-typebot_ref01_%d", setup.now)
		typebotRef01DataUp0Up[typebotRef01MarkdefUp0Name] = typebotRef01MarkdefUp0Value

		typebotRef01ResdataUp0Result, err := typebotRef01Ent.Update(typebotRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		typebotRef01ResdataUp0 := core.ToMapAny(entityData(typebotRef01ResdataUp0Result))
		if typebotRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if typebotRef01ResdataUp0["id"] != typebotRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if typebotRef01ResdataUp0[typebotRef01MarkdefUp0Name] != typebotRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", typebotRef01MarkdefUp0Name, typebotRef01ResdataUp0[typebotRef01MarkdefUp0Name])
		}

		// LOAD
		typebotRef01MatchDt0 := map[string]any{
			"id": typebotRef01Data["id"],
		}
		typebotRef01DataDt0Loaded, err := typebotRef01Ent.Load(typebotRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		typebotRef01DataDt0LoadResult := core.ToMapAny(entityData(typebotRef01DataDt0Loaded))
		if typebotRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if typebotRef01DataDt0LoadResult["id"] != typebotRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		typebotRef01MatchRm0 := map[string]any{
			"id": typebotRef01Data["id"],
		}
		_, err = typebotRef01Ent.Remove(typebotRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		typebotRef01MatchRt0 := map[string]any{}

		typebotRef01ListRt0Result, err := typebotRef01Ent.List(typebotRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		typebotRef01ListRt0, typebotRef01ListRt0Ok := typebotRef01ListRt0Result.([]any)
		if !typebotRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", typebotRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(typebotRef01ListRt0), map[string]any{"id": typebotRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func typebotBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "typebot", "TypebotTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read typebot test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse typebot test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"typebot01", "typebot02", "typebot03"},
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
	entidEnvRaw := os.Getenv("TYPEBOT_TEST_TYPEBOT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"TYPEBOT_TEST_TYPEBOT_ENTID": idmap,
		"TYPEBOT_TEST_LIVE":      "FALSE",
		"TYPEBOT_TEST_EXPLAIN":   "FALSE",
		"TYPEBOT_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["TYPEBOT_TEST_TYPEBOT_ENTID"])
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
