"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const envlocal = __dirname + '/../../../.env.local';
require('dotenv').config({ quiet: true, path: [envlocal] });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, node_test_1.describe)('FolderEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TYPEBOT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TYPEBOT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TypebotSDK.test();
        const ent = testsdk.Folder();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TYPEBOT_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if ((0, utility_1.maybeSkipControl)(t, 'entityOp', 'folder.' + op, live))
                return;
        }
        const setup = basicSetup();
        // The basic flow consumes synthetic IDs and field values from the
        // fixture (entity TestData.json). Those don't exist on the live API.
        // Skip live runs unless the user provided a real ENTID env override.
        if (setup.syntheticOnly) {
            t.skip('live entity test uses synthetic IDs from fixture — set TYPEBOT_TEST_FOLDER_ENTID JSON to run live');
            return;
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const folder_ref01_ent = client.Folder();
        let folder_ref01_data = setup.data.new.folder['folder_ref01'];
        folder_ref01_data = await folder_ref01_ent.create(folder_ref01_data);
        (0, node_assert_1.default)(null != folder_ref01_data.id);
        // LIST
        const folder_ref01_match = {};
        const folder_ref01_list = await folder_ref01_ent.list(folder_ref01_match);
        (0, node_assert_1.default)(!isempty(select(folder_ref01_list, { id: folder_ref01_data.id })));
        // UPDATE
        const folder_ref01_data_up0 = {};
        folder_ref01_data_up0.id = folder_ref01_data.id;
        const folder_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-folder_ref01_' + setup.now };
        folder_ref01_data_up0[folder_ref01_markdef_up0.name] = folder_ref01_markdef_up0.value;
        const folder_ref01_resdata_up0 = await folder_ref01_ent.update(folder_ref01_data_up0);
        (0, node_assert_1.default)(folder_ref01_resdata_up0.id === folder_ref01_data_up0.id);
        (0, node_assert_1.default)(folder_ref01_resdata_up0[folder_ref01_markdef_up0.name] === folder_ref01_markdef_up0.value);
        // LOAD
        const folder_ref01_match_dt0 = {};
        folder_ref01_match_dt0.id = folder_ref01_data.id;
        const folder_ref01_data_dt0 = await folder_ref01_ent.load(folder_ref01_match_dt0);
        (0, node_assert_1.default)(folder_ref01_data_dt0.id === folder_ref01_data.id);
        // REMOVE
        const folder_ref01_match_rm0 = { id: folder_ref01_data.id };
        await folder_ref01_ent.remove(folder_ref01_match_rm0);
        // LIST
        const folder_ref01_match_rt0 = {};
        const folder_ref01_list_rt0 = await folder_ref01_ent.list(folder_ref01_match_rt0);
        (0, node_assert_1.default)(isempty(select(folder_ref01_list_rt0, { id: folder_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/folder/FolderTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TypebotSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['folder01', 'folder02', 'folder03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    // Detect whether the user provided a real ENTID JSON via env var. The
    // basic flow consumes synthetic IDs from the fixture file; without an
    // override those synthetic IDs reach the live API and 4xx. Surface this
    // to the test so it can skip rather than fail.
    const idmapEnvVal = process.env['TYPEBOT_TEST_FOLDER_ENTID'];
    const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{');
    const env = (0, utility_1.envOverride)({
        'TYPEBOT_TEST_FOLDER_ENTID': idmap,
        'TYPEBOT_TEST_LIVE': 'FALSE',
        'TYPEBOT_TEST_EXPLAIN': 'FALSE',
        'TYPEBOT_APIKEY': 'NONE',
    });
    idmap = env['TYPEBOT_TEST_FOLDER_ENTID'];
    const live = 'TRUE' === env.TYPEBOT_TEST_LIVE;
    if (live) {
        client = new __1.TypebotSDK(merge([
            {
                apikey: env.TYPEBOT_APIKEY,
            },
            extra
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.TYPEBOT_TEST_EXPLAIN,
        live,
        syntheticOnly: live && !idmapOverridden,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=FolderEntity.test.js.map