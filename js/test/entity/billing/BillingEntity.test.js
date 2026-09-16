
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


describe('BillingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TYPEBOT_TEST_LIVE=TRUE.
  afterEach(liveDelay('TYPEBOT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TypebotSDK.test()
    const ent = testsdk.Billing()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"amount","req":true,"type":"`$NUMBER`","index$":0},{"active":true,"name":"currency","req":true,"type":"`$STRING`","index$":1},{"active":true,"name":"date","req":true,"type":"`$ANY`","index$":2},{"active":true,"name":"id","req":true,"type":"`$STRING`","index$":3},{"active":true,"format":"date-time","name":"resetsAt","req":true,"type":"`$STRING`","index$":4},{"active":true,"name":"totalChatsUsed","req":true,"type":"`$NUMBER`","index$":5},{"active":true,"name":"url","req":true,"type":"`$STRING`","index$":6}],"id":{"field":"id","name":"id"},"name":"billing","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"workspace_id","orig":"workspace_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /v1/billing/invoices","json":"{\"operationId\":\"billing-listInvoices\",\"parameters\":[{\"allowEmptyValue\":true,\"allowReserved\":true,\"in\":\"query\",\"name\":\"workspaceId\",\"required\":true,\"schema\":{\"description\":\"[Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid)\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"invoices\":{\"items\":{\"properties\":{\"amount\":{\"type\":\"number\"},\"currency\":{\"type\":\"string\"},\"date\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"id\":{\"type\":\"string\"},\"url\":{\"type\":\"string\"}},\"required\":[\"id\",\"url\",\"amount\",\"currency\",\"date\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"invoices\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"BAD_REQUEST\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Bad Request\",\"type\":\"string\"},\"status\":{\"const\":400}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"400\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"UNAUTHORIZED\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Unauthorized\",\"type\":\"string\"},\"status\":{\"const\":401}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"401\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"FORBIDDEN\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Forbidden\",\"type\":\"string\"},\"status\":{\"const\":403}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"403\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"NOT_FOUND\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Not Found\",\"type\":\"string\"},\"status\":{\"const\":404}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"404\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"INTERNAL_SERVER_ERROR\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Internal Server Error\",\"type\":\"string\"},\"status\":{\"const\":500}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"500\"}},\"security\":[{\"Authorization\":[]}],\"securitySchemes\":{\"Authorization\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/billing/invoices","segments":[{"lit":"v1"},{"lit":"billing"},{"lit":"invoices"}],"select":{"$action":"invoice","exist":["workspace_id"]},"transform":{"req":"`reqdata`","res":"`body.invoices`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"workspace_id","orig":"workspace_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /v1/billing/usage","json":"{\"operationId\":\"billing-getUsage\",\"parameters\":[{\"allowEmptyValue\":true,\"allowReserved\":true,\"in\":\"query\",\"name\":\"workspaceId\",\"required\":true,\"schema\":{\"description\":\"[Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid)\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"resetsAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"totalChatsUsed\":{\"type\":\"number\"}},\"required\":[\"totalChatsUsed\",\"resetsAt\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"BAD_REQUEST\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Bad Request\",\"type\":\"string\"},\"status\":{\"const\":400}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"400\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"UNAUTHORIZED\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Unauthorized\",\"type\":\"string\"},\"status\":{\"const\":401}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"401\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"FORBIDDEN\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Forbidden\",\"type\":\"string\"},\"status\":{\"const\":403}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"403\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"NOT_FOUND\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Not Found\",\"type\":\"string\"},\"status\":{\"const\":404}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"404\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"INTERNAL_SERVER_ERROR\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Internal Server Error\",\"type\":\"string\"},\"status\":{\"const\":500}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"500\"}},\"security\":[{\"Authorization\":[]}],\"securitySchemes\":{\"Authorization\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/billing/usage","segments":[{"lit":"v1"},{"lit":"billing"},{"lit":"usage"}],"select":{"$action":"usage","exist":["workspace_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"billing","name__orig":"billing","Name":"Billing","name_":"billing","name-":"billing","NAME":"BILLING","index$":1}, {"active":true,"entity":"billing","key$":"BasicBillingFlow","kind":"basic","name":"BasicBillingFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"billing_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"billing_ref01","srcdatavar":"billing_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-billing_ref01"}}],"index$":1}]}, 'Billing')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let billing_ref01_data = Object.values(setup.data.existing.billing)[0]

    // LIST
    const billing_ref01_ent = client.Billing()
    const billing_ref01_match = {}

    const billing_ref01_list = (await billing_ref01_ent.list(billing_ref01_match)).map((e) => e.data())


    // LOAD
    const billing_ref01_match_dt0 = {}
    billing_ref01_match_dt0.id = billing_ref01_data.id
    const billing_ref01_data_dt0 = (await billing_ref01_ent.load(billing_ref01_match_dt0)).data()
    assert(billing_ref01_data_dt0.id === billing_ref01_data.id)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/billing/BillingTestData.json')

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
    ['billing01','billing02','billing03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TYPEBOT_TEST_BILLING_ENTID': idmap,
    'TYPEBOT_TEST_LIVE': 'FALSE',
    'TYPEBOT_TEST_EXPLAIN': 'FALSE',
    'TYPEBOT_APIKEY': '',
  })

  idmap = env['TYPEBOT_TEST_BILLING_ENTID']

  const live = 'TRUE' === env.TYPEBOT_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TYPEBOT_TEST_BILLING_ENTID']
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
  
