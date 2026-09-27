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
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ResultEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TYPEBOT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TYPEBOT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TypebotSDK.test();
        const ent = testsdk.Result();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TYPEBOT_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'result.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "answers": { "a": true, "h": "Answers", "n": "answers", "r": true, "t": "`$ARRAY`", "key$": "answers", "index$": 0 }, "createdAt": { "a": true, "fo": "date-time", "h": "Created At", "n": "createdAt", "r": true, "t": "`$STRING`", "key$": "createdAt", "index$": 1 }, "hasStarted": { "a": true, "h": "Has Started", "n": "hasStarted", "r": true, "t": "`$ANY`", "key$": "hasStarted", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 3 }, "isArchived": { "a": true, "h": "Is Archived", "n": "isArchived", "r": true, "t": "`$ANY`", "key$": "isArchived", "index$": 4 }, "isCompleted": { "a": true, "h": "Is Completed", "n": "isCompleted", "r": true, "t": "`$BOOLEAN`", "key$": "isCompleted", "index$": 5 }, "lastChatSessionId": { "a": true, "h": "Last Chat Session Id", "n": "lastChatSessionId", "r": true, "t": "`$ANY`", "key$": "lastChatSessionId", "index$": 6 }, "typebotId": { "a": true, "h": "Typebot Id", "n": "typebotId", "r": true, "t": "`$STRING`", "key$": "typebotId", "index$": 7 }, "variables": { "a": true, "h": "Variables", "n": "variables", "r": true, "t": "`$ARRAY`", "union": { "branches": 2, "count": 1, "depth": 3 }, "key$": "variables", "index$": 8 } }, "id": { "field": "id", "name": "id" }, "name": "result", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v1/typebots/{typebotId}/results", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "typebot_id", "or": "typebot_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "t": "`$NUMBER`", "index$": 0 }, { "a": true, "ex": 50, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$NUMBER`", "index$": 1 }, { "a": true, "ex": "last7Days", "k": "query", "n": "time_filter", "or": "time_filter", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "time_zone", "or": "time_zone", "r": false, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/v1/typebots/{typebotId}/results", "q": { "exist": ["cursor", "limit", "time_filter", "time_zone", "typebot_id"] }, "r": { "param": { "typebotId": "typebot_id" } }, "s": [{ "lit": "v1" }, { "lit": "typebots" }, { "var": "typebot_id" }, { "lit": "results" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v1/typebots/{typebotId}/results/{resultId}/logs", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "result_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "typebot_id", "or": "typebot_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v1/typebots/{typebotId}/results/{resultId}/logs", "q": { "$action": "log", "exist": ["id", "typebot_id"] }, "r": { "param": { "resultId": "id", "typebotId": "typebot_id" } }, "s": [{ "lit": "v1" }, { "lit": "typebots" }, { "var": "typebot_id" }, { "lit": "results" }, { "var": "id" }, { "lit": "logs" }], "t": { "req": "`reqdata`", "res": "`body.logs`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/typebots/{typebotId}/results/{resultId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "result_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "typebot_id", "or": "typebot_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v1/typebots/{typebotId}/results/{resultId}", "q": { "exist": ["id", "typebot_id"] }, "r": { "param": { "resultId": "id", "typebotId": "typebot_id" } }, "s": [{ "lit": "v1" }, { "lit": "typebots" }, { "var": "typebot_id" }, { "lit": "results" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.result`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v1/typebots/{typebotId}/results", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "typebot_id", "or": "typebot_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v1/typebots/{typebotId}/results", "q": { "exist": ["typebot_id"] }, "r": { "param": { "typebotId": "typebot_id" } }, "s": [{ "lit": "v1" }, { "lit": "typebots" }, { "var": "typebot_id" }, { "lit": "results" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.typebot"]] }, "key$": "result", "name__orig": "result", "Name": "Result", "name_": "result", "name-": "result", "NAME": "RESULT", "index$": 3 }, { "active": true, "entity": "result", "key$": "BasicResultFlow", "kind": "basic", "name": "BasicResultFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "result_id": "result01", "typebot_id": "typebot01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "result_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "result_ref01", "srcdatavar": "result_ref01_data", "suffix": "_dt0" }, "m": { "id": "result01", "typebot_id": "typebot01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-result_ref01" } }], "index$": 1 }] }, 'Result', { "GET /v1/typebots/{typebotId}/results": { "protocol": "http", "parameters": [{ "name": "typebotId", "in": "path", "required": true, "schema": { "type": "string", "description": "[Where to find my bot's ID?](../how-to#how-to-find-my-typebotid)" }, "index$": 0 }, { "name": "limit", "in": "query", "required": false, "schema": { "type": "number", "minimum": 1, "maximum": 500, "default": 50 }, "allowEmptyValue": true, "allowReserved": true, "index$": 1 }, { "name": "cursor", "in": "query", "required": false, "schema": { "type": "number" }, "allowEmptyValue": true, "allowReserved": true, "index$": 2 }, { "name": "timeFilter", "in": "query", "required": false, "schema": { "enum": ["today", "last7Days", "last30Days", "monthToDate", "lastMonth", "yearToDate", "allTime"], "type": "string", "default": "last7Days" }, "allowEmptyValue": true, "allowReserved": true, "index$": 3 }, { "name": "timeZone", "in": "query", "required": false, "schema": { "type": "string" }, "allowEmptyValue": true, "allowReserved": true, "index$": 4 }] }, "GET /v1/typebots/{typebotId}/results/{resultId}/logs": { "protocol": "http", "parameters": [{ "name": "typebotId", "in": "path", "required": true, "schema": { "type": "string", "description": "[Where to find my bot's ID?](../how-to#how-to-find-my-typebotid)" }, "index$": 0 }, { "name": "resultId", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /v1/typebots/{typebotId}/results/{resultId}": { "protocol": "http", "parameters": [{ "name": "typebotId", "in": "path", "required": true, "schema": { "type": "string", "description": "[Where to find my bot's ID?](../how-to#how-to-find-my-typebotid)" }, "index$": 0 }, { "name": "resultId", "in": "path", "required": true, "schema": { "type": "string", "description": "The `resultId` is returned by the /startChat endpoint or you can find it by listing results with `/results` endpoint" }, "index$": 1 }] }, "DELETE /v1/typebots/{typebotId}/results": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "properties": { "resultIds": { "type": "string", "description": "Comma separated list of ids. If not provided, all results will be deleted. ⚠️" } }, "required": [] } } } }, "parameters": [{ "name": "typebotId", "in": "path", "required": true, "schema": { "type": "string", "description": "[Where to find my bot's ID?](../how-to#how-to-find-my-typebotid)" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let result_ref01_data = Object.values(setup.data.existing.result)[0];
        // LIST
        const result_ref01_ent = client.Result();
        const result_ref01_match = {};
        result_ref01_match['result_id'] = setup.idmap['result01'];
        result_ref01_match['typebot_id'] = setup.idmap['typebot01'];
        const result_ref01_list = (await result_ref01_ent.list(result_ref01_match)).map((e) => e.data());
        // LOAD
        const result_ref01_match_dt0 = {};
        result_ref01_match_dt0.id = result_ref01_data.id;
        const result_ref01_data_dt0 = (await result_ref01_ent.load(result_ref01_match_dt0)).data();
        (0, node_assert_1.default)(result_ref01_data_dt0.id === result_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/result/ResultTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TypebotSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['result01', 'result02', 'result03', 'typebot01', 'typebot02', 'typebot03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TYPEBOT_TEST_RESULT_ENTID': idmap,
        'TYPEBOT_TEST_LIVE': 'FALSE',
        'TYPEBOT_TEST_EXPLAIN': 'FALSE',
        'TYPEBOT_APIKEY': '',
    });
    idmap = env['TYPEBOT_TEST_RESULT_ENTID'];
    const live = 'TRUE' === env.TYPEBOT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TYPEBOT_TEST_RESULT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.TypebotSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.TYPEBOT_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
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
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ResultEntity.test.js.map