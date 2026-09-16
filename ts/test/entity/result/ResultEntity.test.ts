

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { TypebotSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('ResultEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TYPEBOT_TEST_LIVE=TRUE.
  afterEach(liveDelay('TYPEBOT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TypebotSDK.test()
    const ent = testsdk.Result()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TYPEBOT_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'result.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"answers","req":true,"type":"`$ARRAY`","index$":0},{"active":true,"name":"context","req":true,"type":"`$ANY`","index$":1},{"active":true,"format":"date-time","name":"createdAt","req":true,"type":"`$STRING`","index$":2},{"active":true,"name":"description","req":true,"type":"`$STRING`","index$":3},{"active":true,"name":"details","req":true,"type":"`$ANY`","index$":4},{"active":true,"name":"hasStarted","req":true,"type":"`$ANY`","index$":5},{"active":true,"name":"id","req":true,"type":"`$STRING`","index$":6},{"active":true,"name":"isArchived","req":true,"type":"`$ANY`","index$":7},{"active":true,"name":"isCompleted","req":true,"type":"`$BOOLEAN`","index$":8},{"active":true,"name":"lastChatSessionId","req":true,"type":"`$ANY`","index$":9},{"active":true,"name":"resultId","req":true,"type":"`$STRING`","index$":10},{"active":true,"name":"status","req":true,"type":"`$STRING`","index$":11},{"active":true,"name":"typebotId","req":true,"type":"`$STRING`","index$":12},{"active":true,"name":"variables","req":true,"type":"`$ARRAY`","union":{"branches":2,"count":1,"depth":3},"index$":13}],"id":{"field":"id","name":"id"},"name":"result","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"typebot_id","orig":"typebot_id","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"cursor","orig":"cursor","reqd":false,"type":"`$NUMBER`","index$":0},{"active":true,"example":50,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$NUMBER`","index$":1},{"active":true,"example":"last7Days","kind":"query","name":"time_filter","orig":"time_filter","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"time_zone","orig":"time_zone","reqd":false,"type":"`$STRING`","index$":3}]},"contract":{"id":"GET /v1/typebots/{typebotId}/results","json":"{\"operationId\":\"results-getResults\",\"parameters\":[{\"in\":\"path\",\"name\":\"typebotId\",\"required\":true,\"schema\":{\"description\":\"[Where to find my bot's ID?](../how-to#how-to-find-my-typebotid)\",\"type\":\"string\"}},{\"allowEmptyValue\":true,\"allowReserved\":true,\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":50,\"maximum\":500,\"minimum\":1,\"type\":\"number\"}},{\"allowEmptyValue\":true,\"allowReserved\":true,\"in\":\"query\",\"name\":\"cursor\",\"required\":false,\"schema\":{\"type\":\"number\"}},{\"allowEmptyValue\":true,\"allowReserved\":true,\"in\":\"query\",\"name\":\"timeFilter\",\"required\":false,\"schema\":{\"default\":\"last7Days\",\"enum\":[\"today\",\"last7Days\",\"last30Days\",\"monthToDate\",\"lastMonth\",\"yearToDate\",\"allTime\"],\"type\":\"string\"}},{\"allowEmptyValue\":true,\"allowReserved\":true,\"in\":\"query\",\"name\":\"timeZone\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"nextCursor\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"results\":{\"items\":{\"properties\":{\"answers\":{\"items\":{\"properties\":{\"attachedFileUrls\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"blockId\":{\"type\":\"string\"},\"content\":{\"type\":\"string\"}},\"required\":[\"blockId\",\"content\"],\"type\":\"object\"},\"type\":\"array\"},\"createdAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"hasStarted\":{\"anyOf\":[{\"type\":\"boolean\"},{\"type\":\"null\"}]},\"id\":{\"type\":\"string\"},\"isArchived\":{\"anyOf\":[{\"type\":\"boolean\"},{\"type\":\"null\"}]},\"isCompleted\":{\"type\":\"boolean\"},\"lastChatSessionId\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}]},\"typebotId\":{\"type\":\"string\"},\"variables\":{\"items\":{\"properties\":{\"id\":{\"type\":\"string\"},\"isSessionVariable\":{\"type\":\"boolean\"},\"name\":{\"type\":\"string\"},\"value\":{\"anyOf\":[{\"type\":\"string\"},{\"items\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}]},\"type\":\"array\"}]}},\"required\":[\"id\",\"name\",\"value\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"id\",\"createdAt\",\"typebotId\",\"variables\",\"isCompleted\",\"hasStarted\",\"isArchived\",\"lastChatSessionId\",\"answers\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"results\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"BAD_REQUEST\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Bad Request\",\"type\":\"string\"},\"status\":{\"const\":400}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"400\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"UNAUTHORIZED\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Unauthorized\",\"type\":\"string\"},\"status\":{\"const\":401}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"401\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"FORBIDDEN\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Forbidden\",\"type\":\"string\"},\"status\":{\"const\":403}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"403\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"NOT_FOUND\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Not Found\",\"type\":\"string\"},\"status\":{\"const\":404}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"404\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"INTERNAL_SERVER_ERROR\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Internal Server Error\",\"type\":\"string\"},\"status\":{\"const\":500}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"500\"}},\"security\":[{\"Authorization\":[]}],\"securitySchemes\":{\"Authorization\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/typebots/{typebotId}/results","rename":{"param":{"typebotId":"typebot_id"}},"segments":[{"lit":"v1"},{"lit":"typebots"},{"var":"typebot_id"},{"lit":"results"}],"select":{"exist":["cursor","limit","time_filter","time_zone","typebot_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"result_id","reqd":true,"type":"`$STRING`"},{"active":true,"kind":"param","name":"typebot_id","orig":"typebot_id","reqd":true,"type":"`$STRING`"}]},"contract":{"id":"GET /v1/typebots/{typebotId}/results/{resultId}/logs","json":"{\"operationId\":\"results-getResultLogs\",\"parameters\":[{\"in\":\"path\",\"name\":\"typebotId\",\"required\":true,\"schema\":{\"description\":\"[Where to find my bot's ID?](../how-to#how-to-find-my-typebotid)\",\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"resultId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"logs\":{\"items\":{\"properties\":{\"context\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}]},\"createdAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"details\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}]},\"id\":{\"type\":\"string\"},\"resultId\":{\"type\":\"string\"},\"status\":{\"type\":\"string\"}},\"required\":[\"id\",\"createdAt\",\"resultId\",\"status\",\"description\",\"details\",\"context\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"logs\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"BAD_REQUEST\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Bad Request\",\"type\":\"string\"},\"status\":{\"const\":400}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"400\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"UNAUTHORIZED\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Unauthorized\",\"type\":\"string\"},\"status\":{\"const\":401}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"401\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"FORBIDDEN\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Forbidden\",\"type\":\"string\"},\"status\":{\"const\":403}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"403\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"NOT_FOUND\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Not Found\",\"type\":\"string\"},\"status\":{\"const\":404}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"404\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"INTERNAL_SERVER_ERROR\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Internal Server Error\",\"type\":\"string\"},\"status\":{\"const\":500}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"500\"}},\"security\":[{\"Authorization\":[]}],\"securitySchemes\":{\"Authorization\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/typebots/{typebotId}/results/{resultId}/logs","rename":{"param":{"resultId":"id","typebotId":"typebot_id"}},"segments":[{"lit":"v1"},{"lit":"typebots"},{"var":"typebot_id"},{"lit":"results"},{"var":"id"},{"lit":"logs"}],"select":{"$action":"log","exist":["id","typebot_id"]},"transform":{"req":"`reqdata`","res":"`body.logs`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"result_id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"typebot_id","orig":"typebot_id","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /v1/typebots/{typebotId}/results/{resultId}","json":"{\"operationId\":\"results-getResult\",\"parameters\":[{\"in\":\"path\",\"name\":\"typebotId\",\"required\":true,\"schema\":{\"description\":\"[Where to find my bot's ID?](../how-to#how-to-find-my-typebotid)\",\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"resultId\",\"required\":true,\"schema\":{\"description\":\"The `resultId` is returned by the /startChat endpoint or you can find it by listing results with `/results` endpoint\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"result\":{\"properties\":{\"answers\":{\"items\":{\"properties\":{\"attachedFileUrls\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"blockId\":{\"type\":\"string\"},\"content\":{\"type\":\"string\"}},\"required\":[\"blockId\",\"content\"],\"type\":\"object\"},\"type\":\"array\"},\"createdAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"hasStarted\":{\"anyOf\":[{\"type\":\"boolean\"},{\"type\":\"null\"}]},\"id\":{\"type\":\"string\"},\"isArchived\":{\"anyOf\":[{\"type\":\"boolean\"},{\"type\":\"null\"}]},\"isCompleted\":{\"type\":\"boolean\"},\"lastChatSessionId\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}]},\"typebotId\":{\"type\":\"string\"},\"variables\":{\"items\":{\"properties\":{\"id\":{\"type\":\"string\"},\"isSessionVariable\":{\"type\":\"boolean\"},\"name\":{\"type\":\"string\"},\"value\":{\"anyOf\":[{\"type\":\"string\"},{\"items\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}]},\"type\":\"array\"}]}},\"required\":[\"id\",\"name\",\"value\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"id\",\"createdAt\",\"typebotId\",\"variables\",\"isCompleted\",\"hasStarted\",\"isArchived\",\"lastChatSessionId\",\"answers\"],\"type\":\"object\"}},\"required\":[\"result\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"BAD_REQUEST\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Bad Request\",\"type\":\"string\"},\"status\":{\"const\":400}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"400\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"UNAUTHORIZED\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Unauthorized\",\"type\":\"string\"},\"status\":{\"const\":401}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"401\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"FORBIDDEN\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Forbidden\",\"type\":\"string\"},\"status\":{\"const\":403}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"403\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"NOT_FOUND\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Not Found\",\"type\":\"string\"},\"status\":{\"const\":404}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"404\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"INTERNAL_SERVER_ERROR\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Internal Server Error\",\"type\":\"string\"},\"status\":{\"const\":500}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"500\"}},\"security\":[{\"Authorization\":[]}],\"securitySchemes\":{\"Authorization\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/typebots/{typebotId}/results/{resultId}","rename":{"param":{"resultId":"id","typebotId":"typebot_id"}},"segments":[{"lit":"v1"},{"lit":"typebots"},{"var":"typebot_id"},{"lit":"results"},{"var":"id"}],"select":{"exist":["id","typebot_id"]},"transform":{"req":"`reqdata`","res":"`body.result`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"typebot_id","orig":"typebot_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"DELETE /v1/typebots/{typebotId}/results","json":"{\"operationId\":\"results-deleteResults\",\"parameters\":[{\"in\":\"path\",\"name\":\"typebotId\",\"required\":true,\"schema\":{\"description\":\"[Where to find my bot's ID?](../how-to#how-to-find-my-typebotid)\",\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"resultIds\":{\"description\":\"Comma separated list of ids. If not provided, all results will be deleted. ⚠️\",\"type\":\"string\"}},\"required\":[],\"type\":\"object\"}}},\"required\":false},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"anyOf\":[{\"not\":{}},{\"not\":{}}]}}},\"description\":\"OK\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"BAD_REQUEST\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Bad Request\",\"type\":\"string\"},\"status\":{\"const\":400}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"400\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"UNAUTHORIZED\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Unauthorized\",\"type\":\"string\"},\"status\":{\"const\":401}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"401\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"FORBIDDEN\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Forbidden\",\"type\":\"string\"},\"status\":{\"const\":403}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"403\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"NOT_FOUND\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Not Found\",\"type\":\"string\"},\"status\":{\"const\":404}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"404\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"INTERNAL_SERVER_ERROR\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Internal Server Error\",\"type\":\"string\"},\"status\":{\"const\":500}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"500\"}},\"security\":[{\"Authorization\":[]}],\"securitySchemes\":{\"Authorization\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/v1/typebots/{typebotId}/results","rename":{"param":{"typebotId":"typebot_id"}},"segments":[{"lit":"v1"},{"lit":"typebots"},{"var":"typebot_id"},{"lit":"results"}],"select":{"exist":["typebot_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["typebot"]]},"key$":"result","name__orig":"result","Name":"Result","name_":"result","name-":"result","NAME":"RESULT","index$":3}, {"active":true,"entity":"result","key$":"BasicResultFlow","kind":"basic","name":"BasicResultFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{"result_id":"result01","typebot_id":"typebot01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"result_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"result_ref01","srcdatavar":"result_ref01_data","suffix":"_dt0"},"match":{"id":"result01","typebot_id":"typebot01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-result_ref01"}}],"index$":1}]}, 'Result')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let result_ref01_data = Object.values(setup.data.existing.result)[0] as any

    // LIST
    const result_ref01_ent = client.Result()
    const result_ref01_match: any = {}
    result_ref01_match['result_id'] = setup.idmap['result01']
    result_ref01_match['typebot_id'] = setup.idmap['typebot01']

    const result_ref01_list = (await result_ref01_ent.list(result_ref01_match)).map((e: any) => e.data())


    // LOAD
    const result_ref01_match_dt0: any = {}
    result_ref01_match_dt0.id = result_ref01_data.id
    const result_ref01_data_dt0 = (await result_ref01_ent.load(result_ref01_match_dt0)).data()
    assert(result_ref01_data_dt0.id === result_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/result/ResultTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = TypebotSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['result01','result02','result03','typebot01','typebot02','typebot03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TYPEBOT_TEST_RESULT_ENTID': idmap,
    'TYPEBOT_TEST_LIVE': 'FALSE',
    'TYPEBOT_TEST_EXPLAIN': 'FALSE',
    'TYPEBOT_APIKEY': '',
  })

  idmap = env['TYPEBOT_TEST_RESULT_ENTID']

  const live = 'TRUE' === env.TYPEBOT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TYPEBOT_TEST_RESULT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new TypebotSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
