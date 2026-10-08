<?php
declare(strict_types=1);

// Workspace entity test

require_once __DIR__ . '/../typebot_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class WorkspaceEntityTestFailHook extends TypebotBaseFeature
{
    public int $unexpected = 0;

    public function __construct()
    {
        parent::__construct();
        $this->name = 'failhook';
    }

    public function init(TypebotContext $ctx, array $options): void
    {
    }

    public function PreSpec(TypebotContext $ctx): void
    {
        throw new \RuntimeException('workspace hook failed');
    }

    public function PreUnexpected(TypebotContext $ctx): void
    {
        $this->unexpected++;
    }
}

class WorkspaceEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = TypebotSDK::test(null, null);
        $ent = $testsdk->Workspace(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "workspace" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = TypebotSDK::test($seed, null);
        $seen = iterator_to_array($base->Workspace(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = TypebotConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = TypebotSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->Workspace(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_stream_error(): void
    {
        $offline = ["net" => ["offline" => true]];
        $streamerr = null;
        try {
            iterator_to_array(TypebotSDK::test($offline, null)->Workspace(null)
                ->stream("list", null, null), false);
        } catch (\Throwable $e) {
            $streamerr = $e;
        }
        $this->assertNotNull($streamerr, 'the stream should raise the transport failure');
        $this->assertStringContainsString('offline', $streamerr->getMessage());

        iterator_to_array(TypebotSDK::test($offline, null)->Workspace(null)
            ->stream("list", null, ["ctrl" => ["throw" => false]]), false);

        $cfg = TypebotConfig::shared_config();
        if (isset($cfg["feature"]["rbac"])) {
            $denied = TypebotSDK::test(null, ["feature" => ["rbac" => ["active" => true, "deny" => true]]]);
            $denyerr = null;
            try {
                iterator_to_array($denied->Workspace(null)->stream("list", null, null), false);
            } catch (\Throwable $e) {
                $denyerr = $e;
            }
            $this->assertSame('rbac_denied', $denyerr->sdk_code ?? null);
        }
    }

    public function test_stream_ctrl(): void
    {
        $ctrl = ["explain" => []];
        iterator_to_array(TypebotSDK::test(null, null)->Workspace(null)
            ->stream("list", null, ["ctrl" => $ctrl]), false);
        $this->assertSame(["explain"], array_keys($ctrl));
    }

    public function test_unexpected(): void
    {
        $hook = new WorkspaceEntityTestFailHook();
        $client = new TypebotSDK(["feature" => ["test" => ["active" => true]], "extend" => [$hook]]);

        $err = null;
        try {
            $client->Workspace(null)->list(null, null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertNotNull($err, 'the throwing hook should fail the operation');
        $this->assertStringContainsString('hook failed', $err->getMessage());
        $this->assertGreaterThan(0, $hook->unexpected, 'PreUnexpected did not fire');

        $fired = $hook->unexpected;
        $this->assertNull($client->Workspace(null)->list(null, ["throw" => false]));
        $this->assertGreaterThan($fired, $hook->unexpected, 'PreUnexpected did not fire');
    }

    public function test_cost_commits_a_throwing_transport(): void
    {
        $cfg = TypebotConfig::shared_config();
        if (!isset($cfg["feature"]["cost"])) {
            $this->markTestSkipped('feature not present in this SDK: cost');
        }
        $client = new TypebotSDK([
            "test" => ["active" => true],
            "feature" => ["cost" => ["active" => true, "unit" => 1]],
            "utility" => ["fetcher" => function ($ctx, $url, $fetchdef) {
                throw new \RuntimeException('workspace transport failed');
            }],
        ]);

        $err = null;
        try {
            $client->Workspace(null)->list(null, null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertInstanceOf(TypebotError::class, $err);
        $this->assertStringContainsString('transport failed', $err->getMessage());

        $client->Workspace(null)->list(null, ["throw" => false]);
        $this->assertSame(2, $client->_cost["total"]["calls"]);
        $this->assertSame(2, $client->_cost["total"]["attempts"]);
    }

    public function test_validate(): void
    {
        $cfg = TypebotConfig::shared_config();
        if (!isset($cfg["feature"]["validate"])) {
            $this->markTestSkipped('feature not present in this SDK: validate');
        }
        $client = TypebotSDK::test(null, ["feature" => ["validate" => ["active" => true]]]);
        $err = null;
        try {
            $client->Workspace(null)->list(["createdAt" => 1], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = workspace_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "update", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "workspace." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        $client = $setup["client"];

        // CREATE
        $workspace_ref01_ent = $client->Workspace(null);
        $workspace_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.workspace"), "workspace_ref01"));

        $workspace_ref01_data_result = $workspace_ref01_ent->create($workspace_ref01_data, null);
        $workspace_ref01_data = Helpers::to_map(is_object($workspace_ref01_data_result) && method_exists($workspace_ref01_data_result, 'data_get') ? $workspace_ref01_data_result->data_get() : $workspace_ref01_data_result);
        $this->assertNotNull($workspace_ref01_data);
        $this->assertNotNull($workspace_ref01_data["id"]);

        // LIST
        $workspace_ref01_match = [];

        $workspace_ref01_list_result = $workspace_ref01_ent->list($workspace_ref01_match, null);
        $this->assertIsArray($workspace_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($workspace_ref01_list_result),
            ["id" => $workspace_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // UPDATE
        $workspace_ref01_data_up0_up = [
            "id" => $workspace_ref01_data["id"],
        ];

        $workspace_ref01_markdef_up0_name = "createdAt";
        $workspace_ref01_markdef_up0_value = "Mark01-workspace_ref01_" . $setup["now"];
        $workspace_ref01_data_up0_up[$workspace_ref01_markdef_up0_name] = $workspace_ref01_markdef_up0_value;

        $workspace_ref01_resdata_up0_result = $workspace_ref01_ent->update($workspace_ref01_data_up0_up, null);
        $workspace_ref01_resdata_up0 = Helpers::to_map(is_object($workspace_ref01_resdata_up0_result) && method_exists($workspace_ref01_resdata_up0_result, 'data_get') ? $workspace_ref01_resdata_up0_result->data_get() : $workspace_ref01_resdata_up0_result);
        $this->assertNotNull($workspace_ref01_resdata_up0);
        $this->assertEquals($workspace_ref01_resdata_up0["id"], $workspace_ref01_data_up0_up["id"]);
        $this->assertEquals($workspace_ref01_resdata_up0[$workspace_ref01_markdef_up0_name], $workspace_ref01_markdef_up0_value);

        // LOAD
        $workspace_ref01_match_dt0 = [
            "id" => $workspace_ref01_data["id"],
        ];
        $workspace_ref01_data_dt0_loaded = $workspace_ref01_ent->load($workspace_ref01_match_dt0, null);
        $workspace_ref01_data_dt0_load_result = Helpers::to_map(is_object($workspace_ref01_data_dt0_loaded) && method_exists($workspace_ref01_data_dt0_loaded, 'data_get') ? $workspace_ref01_data_dt0_loaded->data_get() : $workspace_ref01_data_dt0_loaded);
        $this->assertNotNull($workspace_ref01_data_dt0_load_result);
        $this->assertEquals($workspace_ref01_data_dt0_load_result["id"], $workspace_ref01_data["id"]);

        // REMOVE
        $workspace_ref01_match_rm0 = [
            "id" => $workspace_ref01_data["id"],
        ];
        $workspace_ref01_ent->remove($workspace_ref01_match_rm0, null);

        // LIST
        $workspace_ref01_match_rt0 = [];

        $workspace_ref01_list_rt0_result = $workspace_ref01_ent->list($workspace_ref01_match_rt0, null);
        $this->assertIsArray($workspace_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($workspace_ref01_list_rt0_result),
            ["id" => $workspace_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function workspace_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/workspace/WorkspaceTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = TypebotSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["workspace01", "workspace02", "workspace03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("TYPEBOT_TEST_WORKSPACE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "TYPEBOT_TEST_WORKSPACE_ENTID" => $idmap,
        "TYPEBOT_TEST_LIVE" => "FALSE",
        "TYPEBOT_TEST_EXPLAIN" => "FALSE",
        "TYPEBOT_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["TYPEBOT_TEST_WORKSPACE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["TYPEBOT_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["TYPEBOT_APIKEY"],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new TypebotSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["TYPEBOT_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["TYPEBOT_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
