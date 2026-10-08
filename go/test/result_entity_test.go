package sdktest

import (
	"encoding/json"
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
const resultEntityLiveStrict = true


func TestResultEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Result(nil)
		if ent == nil {
			t.Fatal("expected non-nil ResultEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Result(nil).List(map[string]any{"typebot_id": 1}, nil)
		if sdkerr, ok := err.(*core.TypebotError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := resultBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "result." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"typebot01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, resultEntityLiveStrict, "Live entity test blocked: needs %s via TYPEBOT_TEST_RESULT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		if setup.live {
			liveExisting(t, resultEntityLiveStrict, setup.data, "result", func() (any, error) {
				return client.Result(nil).List(map[string]any{"typebot_id": setup.idmap["typebot01"]}, nil)
			})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		resultRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.result")))
		var resultRef01Data map[string]any
		if len(resultRef01DataRaw) > 0 {
			resultRef01Data = core.ToMapAny(resultRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = resultRef01Data

		// LIST
		resultRef01Ent := client.Result(nil)
		resultRef01Match := map[string]any{
			"typebot_id": setup.idmap["typebot01"],
		}

		resultRef01ListResult, err := resultRef01Ent.List(resultRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, resultRef01ListOk := resultRef01ListResult.([]any)
		if !resultRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", resultRef01ListResult)
		}

		// LOAD
		resultRef01MatchDt0 := map[string]any{
			"id": resultRef01Data["id"],
		}
		resultRef01DataDt0Loaded, err := resultRef01Ent.Load(resultRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		resultRef01DataDt0LoadResult := core.ToMapAny(entityData(resultRef01DataDt0Loaded))
		if resultRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if resultRef01DataDt0LoadResult["id"] != resultRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func resultBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "result", "ResultTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read result test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse result test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"result01", "result02", "result03", "typebot01", "typebot02", "typebot03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("TYPEBOT_TEST_RESULT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"TYPEBOT_TEST_RESULT_ENTID": idmap,
		"TYPEBOT_TEST_LIVE":      "FALSE",
		"TYPEBOT_TEST_EXPLAIN":   "FALSE",
		"TYPEBOT_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["TYPEBOT_TEST_RESULT_ENTID"])
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
