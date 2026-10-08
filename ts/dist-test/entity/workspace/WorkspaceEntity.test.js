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
(0, node_test_1.describe)('WorkspaceEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TYPEBOT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TYPEBOT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TypebotSDK.test();
        const ent = testsdk.Workspace();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('workspace hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.TypebotSDK.test(offline).Workspace().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.TypebotSDK.test(offline).Workspace()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.TypebotSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Workspace().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.TypebotSDK.test().Workspace().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.TypebotSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Workspace().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Workspace().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TypebotSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Workspace().list({ "createdAt": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TYPEBOT_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'workspace.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "chatsHardLimit": { "a": true, "h": "Chats Hard Limit", "n": "chatsHardLimit", "r": true, "t": "`$ANY`", "key$": "chatsHardLimit", "index$": 0 }, "createdAt": { "a": true, "fo": "date-time", "h": "Created At", "n": "createdAt", "r": true, "t": "`$STRING`", "key$": "createdAt", "index$": 1 }, "currentUserMode": { "a": true, "h": "Current User Mode", "n": "currentUserMode", "r": true, "t": "`$STRING`", "key$": "currentUserMode", "index$": 2 }, "icon": { "a": true, "h": "Icon", "n": "icon", "op": { "create": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$ANY`", "key$": "icon", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 4 }, "inactiveFirstEmailSentAt": { "a": true, "h": "Inactive First Email Sent At", "n": "inactiveFirstEmailSentAt", "r": true, "t": "`$ANY`", "key$": "inactiveFirstEmailSentAt", "index$": 5 }, "inactiveSecondEmailSentAt": { "a": true, "h": "Inactive Second Email Sent At", "n": "inactiveSecondEmailSentAt", "r": true, "t": "`$ANY`", "key$": "inactiveSecondEmailSentAt", "index$": 6 }, "isPastDue": { "a": true, "h": "Is Past Due", "n": "isPastDue", "r": true, "t": "`$BOOLEAN`", "key$": "isPastDue", "index$": 7 }, "isSuspended": { "a": true, "h": "Is Suspended", "n": "isSuspended", "r": true, "t": "`$BOOLEAN`", "key$": "isSuspended", "index$": 8 }, "isVerified": { "a": true, "h": "Is Verified", "n": "isVerified", "r": true, "t": "`$ANY`", "key$": "isVerified", "index$": 9 }, "lastActivityAt": { "a": true, "h": "Last Activity At", "n": "lastActivityAt", "r": true, "t": "`$ANY`", "key$": "lastActivityAt", "index$": 10 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "name", "index$": 11 }, "plan": { "a": true, "h": "Plan", "n": "plan", "r": true, "t": "`$STRING`", "key$": "plan", "index$": 12 }, "settings": { "a": true, "h": "Settings", "n": "settings", "r": true, "t": "`$ANY`", "key$": "settings", "index$": 13 }, "stripeId": { "a": true, "h": "Stripe Id", "n": "stripeId", "r": true, "t": "`$ANY`", "key$": "stripeId", "index$": 14 }, "updatedAt": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updatedAt", "r": true, "t": "`$STRING`", "key$": "updatedAt", "index$": 15 }, "workspace": { "a": true, "h": "Workspace", "n": "workspace", "r": true, "t": "`$OBJECT`", "key$": "workspace", "index$": 16 } }, "id": { "field": "id", "name": "id" }, "name": "workspace", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["icon", "name"], "co": { "id": "POST /v1/workspaces", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v1/workspaces", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "workspaces" }], "t": { "req": "`reqdata`", "res": "`body.workspace`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v1/workspaces/{workspaceId}/members", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "workspaceId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/workspaces/{workspaceId}/members", "q": { "$action": "member", "exist": ["id"] }, "r": { "param": { "workspaceId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "workspaces" }, { "var": "id" }, { "lit": "members" }], "t": { "req": "`reqdata`", "res": "`body.members`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v1/workspaces", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/v1/workspaces", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "workspaces" }], "t": { "req": "`reqdata`", "res": "`body.workspaces`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/workspaces/{workspaceId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "workspaceId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/workspaces/{workspaceId}", "q": { "exist": ["id"] }, "r": { "param": { "workspaceId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "workspaces" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.workspace`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "bf": false, "co": { "id": "DELETE /v1/workspaces/{workspaceId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "workspaceId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v1/workspaces/{workspaceId}", "q": { "exist": ["id"] }, "r": { "param": { "workspaceId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "workspaces" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["icon", "name"], "co": { "id": "PATCH /v1/workspaces/{workspaceId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "workspaceId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/v1/workspaces/{workspaceId}", "q": { "exist": ["id"] }, "r": { "param": { "workspaceId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "workspaces" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.workspace`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "workspace", "name__orig": "workspace", "Name": "Workspace", "name_": "workspace", "name-": "workspace", "NAME": "WORKSPACE", "index$": 5 }, { "active": true, "entity": "workspace", "key$": "BasicWorkspaceFlow", "kind": "basic", "name": "BasicWorkspaceFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "workspace_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "workspace_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "workspace_ref01", "srcdatavar": "workspace_ref01_data", "suffix": "_up0", "textfield": "createdAt" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-workspace_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "workspace_ref01", "srcdatavar": "workspace_ref01_data", "suffix": "_dt0" }, "m": { "id": "workspace01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-workspace_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "workspace_ref01", "suffix": "_rm0" }, "m": { "id": "workspace01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "workspace_ref01" } }], "index$": 5 }] }, 'Workspace', { "POST /v1/workspaces": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "icon": { "type": "string", "key$": "icon" }, "name": { "type": "string", "key$": "name" } }, "required": ["name"], "index$": 1 } } } }, "parameters": [] }, "GET /v1/workspaces/{workspaceId}/members": { "protocol": "http", "parameters": [{ "name": "workspaceId", "in": "path", "required": true, "schema": { "type": "string", "description": "[Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid)" }, "index$": 0 }] }, "GET /v1/workspaces": { "protocol": "http", "parameters": [] }, "GET /v1/workspaces/{workspaceId}": { "protocol": "http", "parameters": [{ "name": "workspaceId", "in": "path", "required": true, "schema": { "type": "string", "description": "[Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid)" }, "index$": 0 }] }, "DELETE /v1/workspaces/{workspaceId}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "properties": {}, "required": [] } } } }, "parameters": [{ "name": "workspaceId", "in": "path", "required": true, "schema": { "type": "string", "description": "[Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid)" }, "index$": 0 }] }, "PATCH /v1/workspaces/{workspaceId}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "type": "string", "key$": "name" }, "icon": { "type": "string", "key$": "icon" } }, "required": [], "index$": 1 } } } }, "parameters": [{ "name": "workspaceId", "in": "path", "required": true, "schema": { "type": "string", "description": "[Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid)" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const workspace_ref01_ent = client.Workspace();
        let workspace_ref01_data = setup.data.new.workspace['workspace_ref01'];
        workspace_ref01_data = (await workspace_ref01_ent.create(workspace_ref01_data)).data();
        (0, node_assert_1.default)(null != workspace_ref01_data.id);
        // LIST
        const workspace_ref01_match = {};
        const workspace_ref01_list = (await workspace_ref01_ent.list(workspace_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(workspace_ref01_list, { id: workspace_ref01_data.id })));
        // UPDATE
        const workspace_ref01_data_up0 = {};
        workspace_ref01_data_up0.id = workspace_ref01_data.id;
        const workspace_ref01_markdef_up0 = { name: 'createdAt', value: 'Mark01-workspace_ref01_' + setup.now };
        workspace_ref01_data_up0[workspace_ref01_markdef_up0.name] = workspace_ref01_markdef_up0.value;
        const workspace_ref01_resdata_up0 = (await workspace_ref01_ent.update(workspace_ref01_data_up0)).data();
        (0, node_assert_1.default)(workspace_ref01_resdata_up0.id === workspace_ref01_data_up0.id);
        (0, node_assert_1.default)(workspace_ref01_resdata_up0[workspace_ref01_markdef_up0.name] === workspace_ref01_markdef_up0.value);
        // LOAD
        const workspace_ref01_match_dt0 = {};
        workspace_ref01_match_dt0.id = workspace_ref01_data.id;
        const workspace_ref01_data_dt0 = (await workspace_ref01_ent.load(workspace_ref01_match_dt0)).data();
        (0, node_assert_1.default)(workspace_ref01_data_dt0.id === workspace_ref01_data.id);
        // REMOVE
        const workspace_ref01_match_rm0 = { id: workspace_ref01_data.id };
        await workspace_ref01_ent.remove(workspace_ref01_match_rm0);
        // LIST
        const workspace_ref01_match_rt0 = {};
        const workspace_ref01_list_rt0 = (await workspace_ref01_ent.list(workspace_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(workspace_ref01_list_rt0, { id: workspace_ref01_data.id })));
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/workspace/WorkspaceTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TypebotSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['workspace01', 'workspace02', 'workspace03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TYPEBOT_TEST_WORKSPACE_ENTID': idmap,
        'TYPEBOT_TEST_LIVE': 'FALSE',
        'TYPEBOT_TEST_EXPLAIN': 'FALSE',
        'TYPEBOT_APIKEY': '',
    });
    idmap = env['TYPEBOT_TEST_WORKSPACE_ENTID'];
    const live = 'TRUE' === env.TYPEBOT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TYPEBOT_TEST_WORKSPACE_ENTID'];
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
//# sourceMappingURL=WorkspaceEntity.test.js.map