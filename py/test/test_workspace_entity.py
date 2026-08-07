# Workspace entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from typebot_sdk import TypebotSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestWorkspaceEntity:

    def test_should_create_instance(self):
        testsdk = TypebotSDK.test(None, None)
        ent = testsdk.Workspace(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "workspace": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = TypebotSDK.test(seed, None)
        seen = list(base.Workspace(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from config import make_config
        cfg = make_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = TypebotSDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.Workspace(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_run_basic_flow(self):
        setup = _workspace_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "workspace." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set TYPEBOT_TEST_WORKSPACE_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        workspace_ref01_ent = client.Workspace(None)
        workspace_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.workspace"), "workspace_ref01"))

        workspace_ref01_data = helpers.to_map(workspace_ref01_ent.create(workspace_ref01_data, None))
        assert workspace_ref01_data is not None
        assert workspace_ref01_data["id"] is not None

        # LIST
        workspace_ref01_match = {}

        workspace_ref01_list_result = workspace_ref01_ent.list(workspace_ref01_match, None)
        assert isinstance(workspace_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(workspace_ref01_list_result),
            {"id": workspace_ref01_data["id"]})
        assert not vs.isempty(found_item)

        # UPDATE
        workspace_ref01_data_up0_up = {
            "id": workspace_ref01_data["id"],
        }

        workspace_ref01_markdef_up0_name = "created_at"
        workspace_ref01_markdef_up0_value = "Mark01-workspace_ref01_" + str(setup["now"])
        workspace_ref01_data_up0_up[workspace_ref01_markdef_up0_name] = workspace_ref01_markdef_up0_value

        workspace_ref01_resdata_up0 = helpers.to_map(workspace_ref01_ent.update(workspace_ref01_data_up0_up, None))
        assert workspace_ref01_resdata_up0 is not None
        assert workspace_ref01_resdata_up0["id"] == workspace_ref01_data_up0_up["id"]
        assert workspace_ref01_resdata_up0[workspace_ref01_markdef_up0_name] == workspace_ref01_markdef_up0_value

        # LOAD
        workspace_ref01_match_dt0 = {
            "id": workspace_ref01_data["id"],
        }
        workspace_ref01_data_dt0_loaded = workspace_ref01_ent.load(workspace_ref01_match_dt0, None)
        workspace_ref01_data_dt0_load_result = helpers.to_map(workspace_ref01_data_dt0_loaded)
        assert workspace_ref01_data_dt0_load_result is not None
        assert workspace_ref01_data_dt0_load_result["id"] == workspace_ref01_data["id"]

        # REMOVE
        workspace_ref01_match_rm0 = {
            "id": workspace_ref01_data["id"],
        }
        workspace_ref01_ent.remove(workspace_ref01_match_rm0, None)

        # LIST
        workspace_ref01_match_rt0 = {}

        workspace_ref01_list_rt0_result = workspace_ref01_ent.list(workspace_ref01_match_rt0, None)
        assert isinstance(workspace_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(workspace_ref01_list_rt0_result),
            {"id": workspace_ref01_data["id"]})
        assert vs.isempty(not_found_item)



def _workspace_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/workspace/WorkspaceTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = TypebotSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["workspace01", "workspace02", "workspace03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "TYPEBOT_TEST_WORKSPACE_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "TYPEBOT_TEST_WORKSPACE_ENTID": idmap,
        "TYPEBOT_TEST_LIVE": "FALSE",
        "TYPEBOT_TEST_EXPLAIN": "FALSE",
        "TYPEBOT_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("TYPEBOT_TEST_WORKSPACE_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("TYPEBOT_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("TYPEBOT_APIKEY"),
            },
            extra or {},
        ])
        client = TypebotSDK(helpers.to_map(merged_opts))

    _live = env.get("TYPEBOT_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("TYPEBOT_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
