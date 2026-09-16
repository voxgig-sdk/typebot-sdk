

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


describe('AnalyticsEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TYPEBOT_TEST_LIVE=TRUE.
  afterEach(liveDelay('TYPEBOT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TypebotSDK.test()
    const ent = testsdk.Analytics()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TYPEBOT_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'analytics.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"totalCompleted","req":true,"type":"`$NUMBER`","index$":0},{"active":true,"name":"totalStarts","req":true,"type":"`$NUMBER`","index$":1},{"active":true,"name":"totalViews","req":true,"type":"`$NUMBER`","index$":2}],"name":"analytics","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"typebot_id","orig":"typebot_id","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"example":"last7Days","kind":"query","name":"time_filter","orig":"time_filter","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"time_zone","orig":"time_zone","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /v1/typebots/{typebotId}/analytics/stats","json":"{\"operationId\":\"analytics-getStats\",\"parameters\":[{\"in\":\"path\",\"name\":\"typebotId\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"allowEmptyValue\":true,\"allowReserved\":true,\"in\":\"query\",\"name\":\"timeFilter\",\"required\":false,\"schema\":{\"default\":\"last7Days\",\"enum\":[\"today\",\"last7Days\",\"last30Days\",\"monthToDate\",\"lastMonth\",\"yearToDate\",\"allTime\"],\"type\":\"string\"}},{\"allowEmptyValue\":true,\"allowReserved\":true,\"in\":\"query\",\"name\":\"timeZone\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"stats\":{\"properties\":{\"totalCompleted\":{\"type\":\"number\"},\"totalStarts\":{\"type\":\"number\"},\"totalViews\":{\"type\":\"number\"}},\"required\":[\"totalViews\",\"totalStarts\",\"totalCompleted\"],\"type\":\"object\"}},\"required\":[\"stats\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"BAD_REQUEST\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Bad Request\",\"type\":\"string\"},\"status\":{\"const\":400}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"400\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"UNAUTHORIZED\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Unauthorized\",\"type\":\"string\"},\"status\":{\"const\":401}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"401\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"FORBIDDEN\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Forbidden\",\"type\":\"string\"},\"status\":{\"const\":403}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"403\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"NOT_FOUND\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Not Found\",\"type\":\"string\"},\"status\":{\"const\":404}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"404\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"code\":{\"const\":\"INTERNAL_SERVER_ERROR\"},\"data\":{},\"defined\":{\"const\":true},\"message\":{\"default\":\"Internal Server Error\",\"type\":\"string\"},\"status\":{\"const\":500}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"},{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{},\"defined\":{\"const\":false},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"}},\"required\":[\"defined\",\"code\",\"status\",\"message\"],\"type\":\"object\"}]}}},\"description\":\"500\"}},\"security\":[{\"Authorization\":[]}],\"securitySchemes\":{\"Authorization\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/typebots/{typebotId}/analytics/stats","rename":{"param":{"typebotId":"typebot_id"}},"segments":[{"lit":"v1"},{"lit":"typebots"},{"var":"typebot_id"},{"lit":"analytics"},{"lit":"stats"}],"select":{"$action":"stat","exist":["time_filter","time_zone","typebot_id"]},"transform":{"req":"`reqdata`","res":"`body.stats`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["typebot"]]},"key$":"analytics","name__orig":"analytics","Name":"Analytics","name_":"analytics","name-":"analytics","NAME":"ANALYTICS","index$":0}, {"active":true,"entity":"analytics","key$":"BasicAnalyticsFlow","kind":"basic","name":"BasicAnalyticsFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"analytics_ref01","srcdatavar":"analytics_ref01_data","suffix":"_dt0"},"match":{"id":"analytics01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-analytics_ref01"}}],"index$":0}]}, 'Analytics')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let analytics_ref01_data = Object.values(setup.data.existing.analytics)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const analytics_ref01_ent = client.Analytics()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/analytics/AnalyticsTestData.json')

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
    ['analytics01','analytics02','analytics03','typebot01','typebot02','typebot03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TYPEBOT_TEST_ANALYTICS_ENTID': idmap,
    'TYPEBOT_TEST_LIVE': 'FALSE',
    'TYPEBOT_TEST_EXPLAIN': 'FALSE',
    'TYPEBOT_APIKEY': '',
  })

  idmap = env['TYPEBOT_TEST_ANALYTICS_ENTID']

  const live = 'TRUE' === env.TYPEBOT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TYPEBOT_TEST_ANALYTICS_ENTID']
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
  
