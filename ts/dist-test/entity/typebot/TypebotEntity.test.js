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
(0, node_test_1.describe)('TypebotEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TYPEBOT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TYPEBOT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TypebotSDK.test();
        const ent = testsdk.Typebot();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TYPEBOT_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'typebot.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "accessRight": { "a": true, "h": "Access Right", "n": "accessRight", "r": true, "t": "`$STRING`", "key$": "accessRight", "index$": 0 }, "createdAt": { "a": true, "fo": "date-time", "h": "Created At", "n": "createdAt", "r": true, "t": "`$STRING`", "key$": "createdAt", "index$": 1 }, "customDomain": { "a": true, "h": "Custom Domain", "n": "customDomain", "r": true, "t": "`$ANY`", "key$": "customDomain", "index$": 2 }, "edges": { "a": true, "h": "Edges", "n": "edges", "r": true, "t": "`$ARRAY`", "union": { "branches": 2, "count": 1, "depth": 3 }, "key$": "edges", "index$": 3 }, "events": { "a": true, "h": "Events", "n": "events", "r": true, "t": "`$ARRAY`", "union": { "branches": 3, "count": 1, "depth": 1 }, "key$": "events", "index$": 4 }, "folderId": { "a": true, "h": "Folder Id", "n": "folderId", "r": true, "t": "`$ANY`", "key$": "folderId", "index$": 5 }, "groups": { "a": true, "h": "Groups", "n": "groups", "r": true, "t": "`$ARRAY`", "union": { "branches": 19, "count": 31, "depth": 14 }, "key$": "groups", "index$": 6 }, "icon": { "a": true, "h": "Icon", "n": "icon", "r": true, "t": "`$ANY`", "key$": "icon", "index$": 7 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 8 }, "isArchived": { "a": true, "h": "Is Archived", "n": "isArchived", "r": true, "t": "`$BOOLEAN`", "key$": "isArchived", "index$": 9 }, "isClosed": { "a": true, "h": "Is Closed", "n": "isClosed", "r": true, "t": "`$BOOLEAN`", "key$": "isClosed", "index$": 10 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 11 }, "overwrite": { "a": true, "h": "Overwrite", "n": "overwrite", "r": false, "sh": "If true, even if we detect a conflict, we will overwrite push the updates to the typebot", "t": "`$BOOLEAN`", "key$": "overwrite", "index$": 12 }, "publicId": { "a": true, "h": "Public Id", "n": "publicId", "r": true, "t": "`$ANY`", "key$": "publicId", "index$": 13 }, "publishedTypebotId": { "a": true, "h": "Published Typebot Id", "n": "publishedTypebotId", "r": false, "t": "`$STRING`", "key$": "publishedTypebotId", "index$": 14 }, "resultsTablePreferences": { "a": true, "h": "Results Table Preferences", "n": "resultsTablePreferences", "r": true, "t": "`$ANY`", "key$": "resultsTablePreferences", "index$": 15 }, "riskLevel": { "a": true, "h": "Risk Level", "n": "riskLevel", "r": true, "t": "`$ANY`", "key$": "riskLevel", "index$": 16 }, "selectedThemeTemplateId": { "a": true, "h": "Selected Theme Template Id", "n": "selectedThemeTemplateId", "r": true, "t": "`$ANY`", "key$": "selectedThemeTemplateId", "index$": 17 }, "settings": { "a": true, "h": "Settings", "n": "settings", "r": true, "t": "`$OBJECT`", "key$": "settings", "index$": 18 }, "spaceId": { "a": true, "h": "Space Id", "n": "spaceId", "r": true, "t": "`$ANY`", "key$": "spaceId", "index$": 19 }, "theme": { "a": true, "h": "Theme", "n": "theme", "r": true, "t": "`$OBJECT`", "union": { "branches": 2, "count": 2, "depth": 6 }, "key$": "theme", "index$": 20 }, "typebot": { "a": true, "h": "Typebot", "n": "typebot", "r": true, "t": "`$OBJECT`", "union": { "branches": 19, "count": 88, "depth": 24 }, "key$": "typebot", "index$": 21 }, "updatedAt": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updatedAt", "r": true, "t": "`$STRING`", "key$": "updatedAt", "index$": 22 }, "variables": { "a": true, "h": "Variables", "n": "variables", "r": true, "t": "`$ARRAY`", "union": { "branches": 2, "count": 1, "depth": 5 }, "key$": "variables", "index$": 23 }, "version": { "a": true, "h": "Version", "n": "version", "r": true, "t": "`$STRING`", "key$": "version", "index$": 24 }, "whatsAppCredentialsId": { "a": true, "h": "Whats App Credentials Id", "n": "whatsAppCredentialsId", "r": true, "t": "`$ANY`", "key$": "whatsAppCredentialsId", "index$": 25 }, "workspaceId": { "a": true, "h": "Workspace Id", "n": "workspaceId", "r": true, "t": "`$STRING`", "key$": "workspaceId", "index$": 26 } }, "id": { "field": "id", "name": "id" }, "name": "typebot", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v1/typebots/{typebotId}/publish", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "typebot_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v1/typebots/{typebotId}/publish", "q": { "$action": "publish", "exist": ["id"] }, "r": { "param": { "typebotId": "id" } }, "s": [{ "lit": "v1" }, { "lit": "typebots" }, { "var": "id" }, { "lit": "publish" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /v1/typebots/{typebotId}/unpublish", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "typebot_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v1/typebots/{typebotId}/unpublish", "q": { "$action": "unpublish", "exist": ["id"] }, "r": { "param": { "typebotId": "id" } }, "s": [{ "lit": "v1" }, { "lit": "typebots" }, { "var": "id" }, { "lit": "unpublish" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "POST /v1/typebots", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v1/typebots", "q": {}, "r": {}, "s": [{ "lit": "v1" }, { "lit": "typebots" }], "t": { "req": { "typebot": "`reqdata`" }, "res": "`body.typebot`" }, "index$": 2 }, { "a": true, "co": { "id": "POST /v1/typebots/import", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v1/typebots/import", "q": { "$action": "import" }, "r": {}, "s": [{ "lit": "v1" }, { "lit": "typebots" }, { "lit": "import" }], "t": { "req": { "typebot": "`reqdata`" }, "res": "`body.typebot`" }, "index$": 3 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v1/typebots", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "folder_id", "or": "folder_id", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "workspace_id", "or": "workspace_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v1/typebots", "q": { "exist": ["folder_id", "workspace_id"] }, "r": {}, "s": [{ "lit": "v1" }, { "lit": "typebots" }], "t": { "req": "`reqdata`", "res": "`body.typebots`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/typebots/{typebotId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "typebot_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": false, "k": "query", "n": "migrate_to_latest_version", "or": "migrate_to_latest_version", "r": false, "t": "`$BOOLEAN`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/typebots/{typebotId}", "q": { "exist": ["id", "migrate_to_latest_version"] }, "r": { "param": { "typebotId": "id" } }, "s": [{ "lit": "v1" }, { "lit": "typebots" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.typebot`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v1/typebots/{typebotId}/publishedTypebot", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "typebot_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": false, "k": "query", "n": "migrate_to_latest_version", "or": "migrate_to_latest_version", "r": false, "t": "`$BOOLEAN`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/typebots/{typebotId}/publishedTypebot", "q": { "$action": "published_typebot", "exist": ["id", "migrate_to_latest_version"] }, "r": { "param": { "typebotId": "id" } }, "s": [{ "lit": "v1" }, { "lit": "typebots" }, { "var": "id" }, { "lit": "publishedTypebot" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v1/typebots/{typebotId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "typebot_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v1/typebots/{typebotId}", "q": { "exist": ["id"] }, "r": { "param": { "typebotId": "id" } }, "s": [{ "lit": "v1" }, { "lit": "typebots" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PATCH /v1/typebots/{typebotId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "typebot_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/v1/typebots/{typebotId}", "q": { "exist": ["id"] }, "r": { "param": { "typebotId": "id" } }, "s": [{ "lit": "v1" }, { "lit": "typebots" }, { "var": "id" }], "t": { "req": { "typebot": "`reqdata`" }, "res": "`body.typebot`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "typebot", "name__orig": "typebot", "Name": "Typebot", "name_": "typebot", "name-": "typebot", "NAME": "TYPEBOT", "index$": 4 }, { "active": true, "entity": "typebot", "key$": "BasicTypebotFlow", "kind": "basic", "name": "BasicTypebotFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "typebot_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "typebot_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "typebot_ref01", "srcdatavar": "typebot_ref01_data", "suffix": "_up0", "textfield": "accessRight" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-typebot_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "typebot_ref01", "srcdatavar": "typebot_ref01_data", "suffix": "_dt0" }, "m": { "id": "typebot01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-typebot_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "typebot_ref01", "suffix": "_rm0" }, "m": { "id": "typebot01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "typebot_ref01" } }], "index$": 5 }] }, 'Typebot', { "POST /v1/typebots/{typebotId}/publish": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "properties": {}, "required": [] } } } }, "parameters": [{ "name": "typebotId", "in": "path", "required": true, "schema": { "type": "string", "description": "[Where to find my bot's ID?](../how-to#how-to-find-my-typebotid)" }, "index$": 0 }] }, "POST /v1/typebots/{typebotId}/unpublish": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "properties": {}, "required": [] } } } }, "parameters": [{ "name": "typebotId", "in": "path", "required": true, "schema": { "type": "string", "description": "[Where to find my bot's ID?](../how-to#how-to-find-my-typebotid)" }, "index$": 0 }] }, "POST /v1/typebots": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "workspaceId": { "type": "string", "key$": "workspaceId" }, "typebot": { "type": "object", "properties": { "name": { "type": "string" }, "icon": { "anyOf": [{}, {}] }, "selectedThemeTemplateId": { "anyOf": [{}, {}] }, "groups": { "type": "array", "items": { "type": "object", "properties": {}, "required": [] } }, "events": { "type": "array", "prefixItems": [{}], "items": { "anyOf": [] } }, "theme": { "type": "object", "properties": { "general": {}, "chat": {}, "customCss": {} } }, "settings": { "type": "object", "properties": { "general": {}, "typingEmulation": {}, "metadata": {}, "whatsApp": {}, "publicShare": {}, "security": {} } }, "folderId": { "anyOf": [{}, {}] }, "variables": { "type": "array", "items": { "type": "object", "properties": {}, "required": [] } }, "edges": { "type": "array", "items": { "type": "object", "properties": {}, "required": [] } }, "resultsTablePreferences": { "anyOf": [{}, {}] }, "publicId": { "anyOf": [{}, {}] }, "customDomain": { "anyOf": [{}, {}] } }, "key$": "typebot" } }, "required": ["workspaceId", "typebot"], "index$": 1 } } } }, "parameters": [] }, "POST /v1/typebots/import": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "workspaceId": { "type": "string", "description": "[Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid)" }, "typebot": { "anyOf": [{ "type": "object", "properties": { "version": {}, "name": {}, "events": {}, "groups": {}, "edges": {}, "variables": {}, "theme": {}, "settings": {}, "icon": {}, "folderId": {}, "resultsTablePreferences": {}, "selectedThemeTemplateId": {}, "workspaceId": {}, "id": {} }, "required": ["version", "name", "events", "groups", "edges", "variables", "theme", "settings", "icon", "folderId"] }, { "type": "object", "properties": { "version": {}, "name": {}, "events": {}, "groups": {}, "edges": {}, "variables": {}, "theme": {}, "settings": {}, "icon": {}, "folderId": {}, "resultsTablePreferences": {}, "selectedThemeTemplateId": {}, "workspaceId": {}, "id": {} }, "required": ["version", "name", "events", "groups", "edges", "variables", "theme", "settings", "icon", "folderId"] }] }, "fromTemplate": { "type": "string" }, "enableSafetyFlags": { "type": "boolean" } }, "required": ["workspaceId", "typebot"] } } } }, "parameters": [] }, "GET /v1/typebots": { "protocol": "http", "parameters": [{ "name": "workspaceId", "in": "query", "required": true, "schema": { "type": "string", "description": "[Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid)" }, "allowEmptyValue": true, "allowReserved": true, "index$": 0 }, { "name": "folderId", "in": "query", "required": false, "schema": { "type": "string" }, "allowEmptyValue": true, "allowReserved": true, "index$": 1 }] }, "GET /v1/typebots/{typebotId}": { "protocol": "http", "parameters": [{ "name": "typebotId", "in": "path", "required": true, "schema": { "type": "string", "description": "[Where to find my bot's ID?](../how-to#how-to-find-my-typebotid)" }, "index$": 0 }, { "name": "migrateToLatestVersion", "in": "query", "required": false, "schema": { "type": "boolean", "default": false, "description": "If enabled, the typebot will be converted to the latest schema version" }, "allowEmptyValue": true, "allowReserved": true, "index$": 1 }] }, "GET /v1/typebots/{typebotId}/publishedTypebot": { "protocol": "http", "parameters": [{ "name": "typebotId", "in": "path", "required": true, "schema": { "type": "string", "description": "[Where to find my bot's ID?](../how-to#how-to-find-my-typebotid)" }, "index$": 0 }, { "name": "migrateToLatestVersion", "in": "query", "required": false, "schema": { "type": "boolean", "default": false, "description": "If enabled, the typebot will be converted to the latest schema version" }, "allowEmptyValue": true, "allowReserved": true, "index$": 1 }] }, "DELETE /v1/typebots/{typebotId}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "properties": {}, "required": [] } } } }, "parameters": [{ "name": "typebotId", "in": "path", "required": true, "schema": { "type": "string", "description": "[Where to find my bot's ID?](../how-to#how-to-find-my-typebotid)" }, "index$": 0 }] }, "PATCH /v1/typebots/{typebotId}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "typebot": { "anyOf": [{ "type": "object", "properties": { "version": {}, "name": {}, "icon": {}, "selectedThemeTemplateId": {}, "groups": {}, "theme": {}, "settings": {}, "folderId": {}, "variables": {}, "edges": {}, "resultsTablePreferences": {}, "publicId": {}, "customDomain": {}, "isClosed": {}, "whatsAppCredentialsId": {}, "riskLevel": {}, "events": {}, "updatedAt": {}, "spaceId": {} } }, { "type": "object", "properties": { "version": {}, "name": {}, "icon": {}, "selectedThemeTemplateId": {}, "groups": {}, "theme": {}, "settings": {}, "folderId": {}, "variables": {}, "edges": {}, "resultsTablePreferences": {}, "publicId": {}, "customDomain": {}, "isClosed": {}, "whatsAppCredentialsId": {}, "riskLevel": {}, "events": {}, "updatedAt": {}, "spaceId": {} } }], "key$": "typebot" }, "overwrite": { "type": "boolean", "description": "If true, even if we detect a conflict, we will overwrite push the updates to the typebot", "key$": "overwrite" } }, "required": ["typebot"], "index$": 1 } } } }, "parameters": [{ "name": "typebotId", "in": "path", "required": true, "schema": { "type": "string", "description": "[Where to find my bot's ID?](../how-to#how-to-find-my-typebotid)" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const typebot_ref01_ent = client.Typebot();
        let typebot_ref01_data = setup.data.new.typebot['typebot_ref01'];
        typebot_ref01_data = (await typebot_ref01_ent.create(typebot_ref01_data)).data();
        (0, node_assert_1.default)(null != typebot_ref01_data.id);
        // LIST
        const typebot_ref01_match = {};
        const typebot_ref01_list = (await typebot_ref01_ent.list(typebot_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(typebot_ref01_list, { id: typebot_ref01_data.id })));
        // UPDATE
        const typebot_ref01_data_up0 = {};
        typebot_ref01_data_up0.id = typebot_ref01_data.id;
        const typebot_ref01_markdef_up0 = { name: 'accessRight', value: 'Mark01-typebot_ref01_' + setup.now };
        typebot_ref01_data_up0[typebot_ref01_markdef_up0.name] = typebot_ref01_markdef_up0.value;
        const typebot_ref01_resdata_up0 = (await typebot_ref01_ent.update(typebot_ref01_data_up0)).data();
        (0, node_assert_1.default)(typebot_ref01_resdata_up0.id === typebot_ref01_data_up0.id);
        (0, node_assert_1.default)(typebot_ref01_resdata_up0[typebot_ref01_markdef_up0.name] === typebot_ref01_markdef_up0.value);
        // LOAD
        const typebot_ref01_match_dt0 = {};
        typebot_ref01_match_dt0.id = typebot_ref01_data.id;
        const typebot_ref01_data_dt0 = (await typebot_ref01_ent.load(typebot_ref01_match_dt0)).data();
        (0, node_assert_1.default)(typebot_ref01_data_dt0.id === typebot_ref01_data.id);
        // REMOVE
        const typebot_ref01_match_rm0 = { id: typebot_ref01_data.id };
        await typebot_ref01_ent.remove(typebot_ref01_match_rm0);
        // LIST
        const typebot_ref01_match_rt0 = {};
        const typebot_ref01_list_rt0 = (await typebot_ref01_ent.list(typebot_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(typebot_ref01_list_rt0, { id: typebot_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/typebot/TypebotTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TypebotSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['typebot01', 'typebot02', 'typebot03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TYPEBOT_TEST_TYPEBOT_ENTID': idmap,
        'TYPEBOT_TEST_LIVE': 'FALSE',
        'TYPEBOT_TEST_EXPLAIN': 'FALSE',
        'TYPEBOT_APIKEY': '',
    });
    idmap = env['TYPEBOT_TEST_TYPEBOT_ENTID'];
    const live = 'TRUE' === env.TYPEBOT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TYPEBOT_TEST_TYPEBOT_ENTID'];
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
//# sourceMappingURL=TypebotEntity.test.js.map