<?php
declare(strict_types=1);

// Result entity test

require_once __DIR__ . '/../typebot_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ResultEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = TypebotSDK::test(null, null);
        $ent = $testsdk->Result(null);
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
                "result" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = TypebotSDK::test($seed, null);
        $seen = iterator_to_array($base->Result(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = TypebotConfig::make_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = TypebotSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->Result(null)->stream("list", null, null) as $item) {
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

    public function test_basic_flow(): void
    {
        $setup = result_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "result." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set TYPEBOT_TEST_RESULT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $result_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.result")));
        $result_ref01_data = null;
        if (count($result_ref01_data_raw) > 0) {
            $result_ref01_data = Helpers::to_map($result_ref01_data_raw[0][1]);
        }

        // LIST
        $result_ref01_ent = $client->Result(null);
        $result_ref01_match = [
            "result_id" => $setup["idmap"]["result01"],
            "typebot_id" => $setup["idmap"]["typebot01"],
        ];

        $result_ref01_list_result = $result_ref01_ent->list($result_ref01_match, null);
        $this->assertIsArray($result_ref01_list_result);

        // LOAD
        $result_ref01_match_dt0 = [
            "id" => $result_ref01_data["id"],
        ];
        $result_ref01_data_dt0_loaded = $result_ref01_ent->load($result_ref01_match_dt0, null);
        $result_ref01_data_dt0_load_result = Helpers::to_map($result_ref01_data_dt0_loaded);
        $this->assertNotNull($result_ref01_data_dt0_load_result);
        $this->assertEquals($result_ref01_data_dt0_load_result["id"], $result_ref01_data["id"]);

    }
}

function result_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/result/ResultTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = TypebotSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["result01", "result02", "result03", "typebot01", "typebot02", "typebot03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("TYPEBOT_TEST_RESULT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "TYPEBOT_TEST_RESULT_ENTID" => $idmap,
        "TYPEBOT_TEST_LIVE" => "FALSE",
        "TYPEBOT_TEST_EXPLAIN" => "FALSE",
        "TYPEBOT_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["TYPEBOT_TEST_RESULT_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["TYPEBOT_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["TYPEBOT_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new TypebotSDK(Helpers::to_map($merged_opts));
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
