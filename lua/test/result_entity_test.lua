-- Result entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("typebot_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

-- main.kit.test.live.strict is true (the default is true): a live
-- request that fails, or a live test missing an input it needs,
-- fails the test.
-- An account with no record for a test to read skips it either way.
local LIVE_STRICT = true


describe("ResultEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Result(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:Result(nil):list({ ["typebot_id"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = result_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"list", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "result." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live then
      for _, _live_key in ipairs({"typebot01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via TYPEBOT_TEST_RESULT_ENTID")
        end
      end
    end
    local client = setup.client
    if setup.live then
      runner.live_existing(pending, setup, LIVE_STRICT, "result", function()
        return client:Result(nil):list({["typebot_id"] = setup.idmap["typebot01"]}, nil)
      end)
    end

    -- Bootstrap entity data from existing test data.
    local result_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.result")))
    local result_ref01_data = nil
    if #result_ref01_data_raw > 0 then
      result_ref01_data = helpers.to_map(result_ref01_data_raw[1][2])
    end

    -- LIST
    local result_ref01_ent = client:Result(nil)
    local result_ref01_match = {
      ["typebot_id"] = setup.idmap["typebot01"],
    }

    local result_ref01_list_result, err = result_ref01_ent:list(result_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(result_ref01_list_result)

    -- LOAD
    local result_ref01_match_dt0 = {
      id = result_ref01_data["id"],
    }
    local result_ref01_data_dt0_loaded, err = result_ref01_ent:load(result_ref01_match_dt0, nil)
    assert.is_nil(err)
    local result_ref01_data_dt0_load_result = helpers.to_map(type(result_ref01_data_dt0_loaded) == 'table' and result_ref01_data_dt0_loaded.data_get and result_ref01_data_dt0_loaded:data_get() or result_ref01_data_dt0_loaded)
    assert.is_not_nil(result_ref01_data_dt0_load_result)
    assert.are.equal(result_ref01_data_dt0_load_result["id"], result_ref01_data["id"])

  end)
end)

function result_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/result/ResultTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read result test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "result01", "result02", "result03", "typebot01", "typebot02", "typebot03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("TYPEBOT_TEST_RESULT_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["TYPEBOT_TEST_RESULT_ENTID"] = idmap,
    ["TYPEBOT_TEST_LIVE"] = "FALSE",
    ["TYPEBOT_TEST_EXPLAIN"] = "FALSE",
    ["TYPEBOT_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["TYPEBOT_TEST_RESULT_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["TYPEBOT_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        apikey = env["TYPEBOT_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["TYPEBOT_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["TYPEBOT_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
