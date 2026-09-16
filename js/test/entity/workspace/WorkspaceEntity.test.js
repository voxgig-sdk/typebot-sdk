
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { TypebotSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('WorkspaceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TYPEBOT_TEST_LIVE=TRUE.
  afterEach(liveDelay('TYPEBOT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TypebotSDK.test()
    const ent = testsdk.Workspace()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"chatsHardLimit","req":true,"type":"`$ANY`","index$":0},{"active":true,"format":"date-time","name":"createdAt","req":true,"type":"`$STRING`","index$":1},{"active":true,"name":"customChatsLimit","req":true,"type":"`$ANY`","index$":2},{"active":true,"name":"customSeatsLimit","req":true,"type":"`$ANY`","index$":3},{"active":true,"name":"icon","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"req":true,"type":"`$ANY`","index$":4},{"active":true,"name":"id","req":true,"type":"`$STRING`","index$":5},{"active":true,"name":"inactiveFirstEmailSentAt","req":true,"type":"`$ANY`","index$":6},{"active":true,"name":"inactiveSecondEmailSentAt","req":true,"type":"`$ANY`","index$":7},{"active":true,"name":"isPastDue","req":true,"type":"`$BOOLEAN`","index$":8},{"active":true,"name":"isSuspended","req":true,"type":"`$BOOLEAN`","index$":9},{"active":true,"name":"isVerified","req":true,"type":"`$ANY`","index$":10},{"active":true,"name":"lastActivityAt","req":true,"type":"`$ANY`","index$":11},{"active":true,"name":"name","op":{"update":{"req":false,"type":"`$STRING`"}},"req":true,"type":"`$STRING`","index$":12},{"active":true,"name":"plan","req":true,"type":"`$STRING`","index$":13},{"active":true,"name":"role","req":true,"type":"`$STRING`","index$":14},{"active":true,"name":"settings","req":true,"type":"`$ANY`","index$":15},{"active":true,"name":"stripeId","req":true,"type":"`$ANY`","index$":16},{"active":true,"format":"date-time","name":"updatedAt","req":true,"type":"`$STRING`","index$":17},{"active":true,"name":"user","req":true,"type":"`$OBJECT`","index$":18},{"active":true,"name":"userId","req":true,"type":"`$STRING`","index$":19},{"active":true,"name":"workspaceId","req":true,"type":"`$STRING`","index$":20}],"id":{"field":"id","name":"id"},"name":"workspace","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /v1/workspaces","json":"{\"operationId\":\"workspace-createWorkspace\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"icon\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"workspace\":{\"properties\":{\"chatsHardLimit\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"createdAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"icon\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}]},\"id\":{\"type\":\"string\"},\"inactiveFirstEmailSentAt\":{\"anyOf\":[{\"format\":\"date-time\",\"type\":\"string\"},{\"type\":\"null\"}]},\"inactiveSecondEmailSentAt\":{\"anyOf\":[{\"format\":\"date-time\",\"type\":\"string\"},{\"type\":\"null\"}]},\"isPastDue\":{\"type\":\"boolean\"},\"isSuspended\":{\"type\":\"boolean\"},\"isVerified\":{\"anyOf\":[{\"type\":\"boolean\"},{\"type\":\"null\"}]},\"lastActivityAt\":{\"anyOf\":[{\"format\":\"date-time\",\"type\":\"string\"},{\"type\":\"null\"}]},\"name\":{\"type\":\"string\"},\"plan\":{\"enum\":[\"FREE\",\"STARTER\",\"PRO\",\"LIFETIME\",\"OFFERED\",\"CUSTOM\",\"UNLIMITED\",\"ENTERPRISE\"],\"type\":\"string\"},\"settings\":{\"anyOf\":[{\"type\":\"object\"},{\"type\":\"null\"}]},\"stripeId\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}]},\"updatedAt\":{\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"id\",\"createdAt\",\"updatedAt\",\"name\",\"icon\",\"plan\",\"stripeId\",\"settings\",\"isSuspended\",\"isPastDue\",\"isVerified\",\"chatsHardLimit\",\"lastActivityAt\",\"inactiveFirstEmailSentAt\",\"inactiveSecondEmailSentAt\"],\"type\":\"object\"}},\"required\":[\"workspace\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"BAD_REQUEST\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Bad Request\",\"type\":\"string\"},\"status\":{\"const\":400}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"400\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"UNAUTHORIZED\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Unauthorized\",\"type\":\"string\"},\"status\":{\"const\":401}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"401\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"FORBIDDEN\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Forbidden\",\"type\":\"string\"},\"status\":{\"const\":403}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"403\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"NOT_FOUND\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Not Found\",\"type\":\"string\"},\"status\":{\"const\":404}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"404\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"INTERNAL_SERVER_ERROR\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Internal Server Error\",\"type\":\"string\"},\"status\":{\"const\":500}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"500\"}},\"security\":[{\"Authorization\":[]}],\"securitySchemes\":{\"Authorization\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/v1/workspaces","segments":[{"lit":"v1"},{"lit":"workspaces"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.workspace`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"workspace_id","reqd":true,"type":"`$STRING`"}]},"contract":{"id":"GET /v1/workspaces/{workspaceId}/members","json":"{\"operationId\":\"workspace-listMembersInWorkspace\",\"parameters\":[{\"in\":\"path\",\"name\":\"workspaceId\",\"required\":true,\"schema\":{\"description\":\"[Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid)\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"members\":{\"items\":{\"properties\":{\"role\":{\"enum\":[\"ADMIN\",\"MEMBER\",\"GUEST\"],\"type\":\"string\"},\"user\":{\"properties\":{\"email\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}]},\"image\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}]},\"name\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}]}},\"required\":[\"name\",\"email\",\"image\"],\"type\":\"object\"},\"userId\":{\"type\":\"string\"},\"workspaceId\":{\"type\":\"string\"}},\"required\":[\"workspaceId\",\"userId\",\"user\",\"role\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"members\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"BAD_REQUEST\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Bad Request\",\"type\":\"string\"},\"status\":{\"const\":400}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"400\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"UNAUTHORIZED\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Unauthorized\",\"type\":\"string\"},\"status\":{\"const\":401}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"401\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"FORBIDDEN\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Forbidden\",\"type\":\"string\"},\"status\":{\"const\":403}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"403\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"NOT_FOUND\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Not Found\",\"type\":\"string\"},\"status\":{\"const\":404}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"404\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"INTERNAL_SERVER_ERROR\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Internal Server Error\",\"type\":\"string\"},\"status\":{\"const\":500}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"500\"}},\"security\":[{\"Authorization\":[]}],\"securitySchemes\":{\"Authorization\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/workspaces/{workspaceId}/members","rename":{"param":{"workspaceId":"id"}},"segments":[{"lit":"v1"},{"lit":"workspaces"},{"var":"id"},{"lit":"members"}],"select":{"$action":"member","exist":["id"]},"transform":{"req":"`reqdata`","res":"`body.members`"},"index$":0},{"active":true,"args":{},"contract":{"id":"GET /v1/workspaces","json":"{\"operationId\":\"workspace-listWorkspaces\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"workspaces\":{\"items\":{\"properties\":{\"icon\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}]},\"id\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"plan\":{\"enum\":[\"FREE\",\"STARTER\",\"PRO\",\"LIFETIME\",\"OFFERED\",\"CUSTOM\",\"UNLIMITED\",\"ENTERPRISE\"],\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"icon\",\"plan\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"workspaces\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"BAD_REQUEST\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Bad Request\",\"type\":\"string\"},\"status\":{\"const\":400}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"400\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"UNAUTHORIZED\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Unauthorized\",\"type\":\"string\"},\"status\":{\"const\":401}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"401\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"FORBIDDEN\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Forbidden\",\"type\":\"string\"},\"status\":{\"const\":403}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"403\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"NOT_FOUND\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Not Found\",\"type\":\"string\"},\"status\":{\"const\":404}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"404\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"INTERNAL_SERVER_ERROR\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Internal Server Error\",\"type\":\"string\"},\"status\":{\"const\":500}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"500\"}},\"security\":[{\"Authorization\":[]}],\"securitySchemes\":{\"Authorization\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/workspaces","segments":[{"lit":"v1"},{"lit":"workspaces"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.workspaces`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"workspace_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /v1/workspaces/{workspaceId}","json":"{\"operationId\":\"workspace-getWorkspace\",\"parameters\":[{\"in\":\"path\",\"name\":\"workspaceId\",\"required\":true,\"schema\":{\"description\":\"[Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid)\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"currentUserMode\":{\"enum\":[\"read\",\"write\",\"guest\"],\"type\":\"string\"},\"workspace\":{\"properties\":{\"chatsHardLimit\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"createdAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"customChatsLimit\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"customSeatsLimit\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"icon\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}]},\"id\":{\"type\":\"string\"},\"inactiveFirstEmailSentAt\":{\"anyOf\":[{\"format\":\"date-time\",\"type\":\"string\"},{\"type\":\"null\"}]},\"inactiveSecondEmailSentAt\":{\"anyOf\":[{\"format\":\"date-time\",\"type\":\"string\"},{\"type\":\"null\"}]},\"isPastDue\":{\"type\":\"boolean\"},\"isSuspended\":{\"type\":\"boolean\"},\"isVerified\":{\"anyOf\":[{\"type\":\"boolean\"},{\"type\":\"null\"}]},\"lastActivityAt\":{\"anyOf\":[{\"format\":\"date-time\",\"type\":\"string\"},{\"type\":\"null\"}]},\"name\":{\"type\":\"string\"},\"plan\":{\"enum\":[\"FREE\",\"STARTER\",\"PRO\",\"LIFETIME\",\"OFFERED\",\"CUSTOM\",\"UNLIMITED\",\"ENTERPRISE\"],\"type\":\"string\"},\"settings\":{\"anyOf\":[{\"type\":\"object\"},{\"type\":\"null\"}]},\"stripeId\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}]},\"updatedAt\":{\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"id\",\"createdAt\",\"updatedAt\",\"name\",\"icon\",\"plan\",\"stripeId\",\"settings\",\"customChatsLimit\",\"customSeatsLimit\",\"isSuspended\",\"isPastDue\",\"isVerified\",\"chatsHardLimit\",\"lastActivityAt\",\"inactiveFirstEmailSentAt\",\"inactiveSecondEmailSentAt\"],\"type\":\"object\"}},\"required\":[\"workspace\",\"currentUserMode\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"BAD_REQUEST\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Bad Request\",\"type\":\"string\"},\"status\":{\"const\":400}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"400\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"UNAUTHORIZED\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Unauthorized\",\"type\":\"string\"},\"status\":{\"const\":401}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"401\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"FORBIDDEN\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Forbidden\",\"type\":\"string\"},\"status\":{\"const\":403}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"403\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"NOT_FOUND\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Not Found\",\"type\":\"string\"},\"status\":{\"const\":404}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"404\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"INTERNAL_SERVER_ERROR\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Internal Server Error\",\"type\":\"string\"},\"status\":{\"const\":500}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"500\"}},\"security\":[{\"Authorization\":[]}],\"securitySchemes\":{\"Authorization\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/workspaces/{workspaceId}","rename":{"param":{"workspaceId":"id"}},"segments":[{"lit":"v1"},{"lit":"workspaces"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body.workspace`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"workspace_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"DELETE /v1/workspaces/{workspaceId}","json":"{\"operationId\":\"workspace-deleteWorkspace\",\"parameters\":[{\"in\":\"path\",\"name\":\"workspaceId\",\"required\":true,\"schema\":{\"description\":\"[Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid)\",\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{},\"required\":[],\"type\":\"object\"}}},\"required\":false},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"type\":\"string\"}},\"required\":[\"message\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"BAD_REQUEST\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Bad Request\",\"type\":\"string\"},\"status\":{\"const\":400}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"400\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"UNAUTHORIZED\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Unauthorized\",\"type\":\"string\"},\"status\":{\"const\":401}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"401\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"FORBIDDEN\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Forbidden\",\"type\":\"string\"},\"status\":{\"const\":403}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"403\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"NOT_FOUND\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Not Found\",\"type\":\"string\"},\"status\":{\"const\":404}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"404\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"INTERNAL_SERVER_ERROR\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Internal Server Error\",\"type\":\"string\"},\"status\":{\"const\":500}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"500\"}},\"security\":[{\"Authorization\":[]}],\"securitySchemes\":{\"Authorization\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/v1/workspaces/{workspaceId}","rename":{"param":{"workspaceId":"id"}},"segments":[{"lit":"v1"},{"lit":"workspaces"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"workspace_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"PATCH /v1/workspaces/{workspaceId}","json":"{\"operationId\":\"workspace-updateWorkspace\",\"parameters\":[{\"in\":\"path\",\"name\":\"workspaceId\",\"required\":true,\"schema\":{\"description\":\"[Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid)\",\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"icon\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"required\":[],\"type\":\"object\"}}},\"required\":false},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"workspace\":{\"properties\":{\"icon\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}]},\"name\":{\"type\":\"string\"}},\"required\":[\"name\",\"icon\"],\"type\":\"object\"}},\"required\":[\"workspace\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"BAD_REQUEST\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Bad Request\",\"type\":\"string\"},\"status\":{\"const\":400}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"400\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"UNAUTHORIZED\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Unauthorized\",\"type\":\"string\"},\"status\":{\"const\":401}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"401\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"FORBIDDEN\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Forbidden\",\"type\":\"string\"},\"status\":{\"const\":403}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"403\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"NOT_FOUND\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Not Found\",\"type\":\"string\"},\"status\":{\"const\":404}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"404\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"INTERNAL_SERVER_ERROR\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Internal Server Error\",\"type\":\"string\"},\"status\":{\"const\":500}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"500\"}},\"security\":[{\"Authorization\":[]}],\"securitySchemes\":{\"Authorization\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"PATCH","orig":"/v1/workspaces/{workspaceId}","rename":{"param":{"workspaceId":"id"}},"segments":[{"lit":"v1"},{"lit":"workspaces"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body.workspace`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"workspace","name__orig":"workspace","Name":"Workspace","name_":"workspace","name-":"workspace","NAME":"WORKSPACE","index$":5}, {"active":true,"entity":"workspace","key$":"BasicWorkspaceFlow","kind":"basic","name":"BasicWorkspaceFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"workspace_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"workspace_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"workspace_ref01","srcdatavar":"workspace_ref01_data","suffix":"_up0","textfield":"createdAt"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-workspace_ref01"}}],"valid":[],"index$":2},{"active":true,"data":{},"input":{"ref":"workspace_ref01","srcdatavar":"workspace_ref01_data","suffix":"_dt0"},"match":{"id":"workspace01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-workspace_ref01"}}],"index$":3},{"active":true,"data":{},"input":{"ref":"workspace_ref01","suffix":"_rm0"},"match":{"id":"workspace01"},"op":"remove","spec":[],"valid":[],"index$":4},{"active":true,"data":{},"input":{"suffix":"_rt0"},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemNotExists","def":{"ref":"workspace_ref01"}}],"index$":5}]}, 'Workspace')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const workspace_ref01_ent = client.Workspace()
    let workspace_ref01_data = setup.data.new.workspace['workspace_ref01']

    workspace_ref01_data = (await workspace_ref01_ent.create(workspace_ref01_data)).data()
    assert(null != workspace_ref01_data.id)


    // LIST
    const workspace_ref01_match = {}

    const workspace_ref01_list = (await workspace_ref01_ent.list(workspace_ref01_match)).map((e) => e.data())

    assert(!isempty(select(workspace_ref01_list, { id: workspace_ref01_data.id })))


    // UPDATE
    const workspace_ref01_data_up0 = {}
    workspace_ref01_data_up0.id = workspace_ref01_data.id

    const workspace_ref01_markdef_up0 = { name: 'createdAt', value: 'Mark01-workspace_ref01_' + setup.now }
    workspace_ref01_data_up0 [workspace_ref01_markdef_up0.name] = workspace_ref01_markdef_up0.value

    const workspace_ref01_resdata_up0 = (await workspace_ref01_ent.update(workspace_ref01_data_up0)).data()
    assert(workspace_ref01_resdata_up0.id === workspace_ref01_data_up0.id)

    assert(workspace_ref01_resdata_up0[workspace_ref01_markdef_up0.name] === workspace_ref01_markdef_up0.value)


    // LOAD
    const workspace_ref01_match_dt0 = {}
    workspace_ref01_match_dt0.id = workspace_ref01_data.id
    const workspace_ref01_data_dt0 = (await workspace_ref01_ent.load(workspace_ref01_match_dt0)).data()
    assert(workspace_ref01_data_dt0.id === workspace_ref01_data.id)


    // REMOVE
    const workspace_ref01_match_rm0 = {}
    workspace_ref01_match_rm0.id = workspace_ref01_data.id
    await workspace_ref01_ent.remove(workspace_ref01_match_rm0)
  

    // LIST
    const workspace_ref01_match_rt0 = {}

    const workspace_ref01_list_rt0 = (await workspace_ref01_ent.list(workspace_ref01_match_rt0)).map((e) => e.data())

    assert(isempty(select(workspace_ref01_list_rt0, { id: workspace_ref01_data.id })))


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/workspace/WorkspaceTestData.json')

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
    ['workspace01','workspace02','workspace03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TYPEBOT_TEST_WORKSPACE_ENTID': idmap,
    'TYPEBOT_TEST_LIVE': 'FALSE',
    'TYPEBOT_TEST_EXPLAIN': 'FALSE',
    'TYPEBOT_APIKEY': '',
  })

  idmap = env['TYPEBOT_TEST_WORKSPACE_ENTID']

  const live = 'TRUE' === env.TYPEBOT_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TYPEBOT_TEST_WORKSPACE_ENTID']
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
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
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
  
