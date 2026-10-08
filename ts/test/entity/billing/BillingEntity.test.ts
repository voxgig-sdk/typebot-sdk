

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { TypebotSDK, BaseFeature, config, stdutil } from '../../..'

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('BillingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TYPEBOT_TEST_LIVE=TRUE.
  afterEach(liveDelay('TYPEBOT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TypebotSDK.test()
    const ent = testsdk.Billing()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('billing hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of TypebotSDK.test(offline).Billing().stream('list')) { }
    }, /offline/)

    for await (const _item of TypebotSDK.test(offline).Billing()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = TypebotSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Billing().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of TypebotSDK.test().Billing().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new TypebotSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Billing().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Billing().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TypebotSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Billing().list({"workspace_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TYPEBOT_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'billing.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"billing","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/billing/invoices","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"workspace_id","or":"workspaceId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/billing/invoices","q":{"$action":"invoice","exist":["workspace_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"billing"},{"lit":"invoices"}],"t":{"req":"`reqdata`","res":"`body.invoices`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/billing/usage","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"workspace_id","or":"workspaceId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/billing/usage","q":{"$action":"usage","exist":["workspace_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"billing"},{"lit":"usage"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"billing","name__orig":"billing","Name":"Billing","name_":"billing","name-":"billing","NAME":"BILLING","index$":1}, {"active":true,"entity":"billing","key$":"BasicBillingFlow","kind":"basic","name":"BasicBillingFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"billing_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"billing_ref01","srcdatavar":"billing_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-billing_ref01"}}],"index$":1}]}, 'Billing', {"GET /v1/billing/invoices":{"protocol":"http","parameters":[{"name":"workspaceId","in":"query","required":true,"schema":{"type":"string","description":"[Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid)"},"allowEmptyValue":true,"allowReserved":true,"index$":0}]},"GET /v1/billing/usage":{"protocol":"http","parameters":[{"name":"workspaceId","in":"query","required":true,"schema":{"type":"string","description":"[Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid)"},"allowEmptyValue":true,"allowReserved":true,"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let billing_ref01_data = Object.values(setup.data.existing.billing)[0] as any

    // LIST
    const billing_ref01_ent = client.Billing()
    const billing_ref01_match: any = {}

    const billing_ref01_list = (await billing_ref01_ent.list(billing_ref01_match)).map((e: any) => e.data())


    // LOAD
    const billing_ref01_match_dt0: any = {}
    const billing_ref01_data_dt0 = (await billing_ref01_ent.load(billing_ref01_match_dt0)).data()
    assert(null != billing_ref01_data_dt0)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

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
  
