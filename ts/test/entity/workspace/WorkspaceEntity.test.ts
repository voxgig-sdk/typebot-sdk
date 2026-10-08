

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


describe('WorkspaceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TYPEBOT_TEST_LIVE=TRUE.
  afterEach(liveDelay('TYPEBOT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TypebotSDK.test()
    const ent = testsdk.Workspace()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('workspace hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of TypebotSDK.test(offline).Workspace().stream('list')) { }
    }, /offline/)

    for await (const _item of TypebotSDK.test(offline).Workspace()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = TypebotSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Workspace().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of TypebotSDK.test().Workspace().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new TypebotSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Workspace().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Workspace().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TypebotSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Workspace().list({"createdAt":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TYPEBOT_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'workspace.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"chatsHardLimit":{"a":true,"h":"Chats Hard Limit","n":"chatsHardLimit","r":true,"t":"`$ANY`","key$":"chatsHardLimit","index$":0},"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":true,"t":"`$STRING`","key$":"createdAt","index$":1},"currentUserMode":{"a":true,"h":"Current User Mode","n":"currentUserMode","r":true,"t":"`$STRING`","key$":"currentUserMode","index$":2},"icon":{"a":true,"h":"Icon","n":"icon","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$ANY`","key$":"icon","index$":3},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":4},"inactiveFirstEmailSentAt":{"a":true,"h":"Inactive First Email Sent At","n":"inactiveFirstEmailSentAt","r":true,"t":"`$ANY`","key$":"inactiveFirstEmailSentAt","index$":5},"inactiveSecondEmailSentAt":{"a":true,"h":"Inactive Second Email Sent At","n":"inactiveSecondEmailSentAt","r":true,"t":"`$ANY`","key$":"inactiveSecondEmailSentAt","index$":6},"isPastDue":{"a":true,"h":"Is Past Due","n":"isPastDue","r":true,"t":"`$BOOLEAN`","key$":"isPastDue","index$":7},"isSuspended":{"a":true,"h":"Is Suspended","n":"isSuspended","r":true,"t":"`$BOOLEAN`","key$":"isSuspended","index$":8},"isVerified":{"a":true,"h":"Is Verified","n":"isVerified","r":true,"t":"`$ANY`","key$":"isVerified","index$":9},"lastActivityAt":{"a":true,"h":"Last Activity At","n":"lastActivityAt","r":true,"t":"`$ANY`","key$":"lastActivityAt","index$":10},"name":{"a":true,"h":"Name","n":"name","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"name","index$":11},"plan":{"a":true,"h":"Plan","n":"plan","r":true,"t":"`$STRING`","key$":"plan","index$":12},"settings":{"a":true,"h":"Settings","n":"settings","r":true,"t":"`$ANY`","key$":"settings","index$":13},"stripeId":{"a":true,"h":"Stripe Id","n":"stripeId","r":true,"t":"`$ANY`","key$":"stripeId","index$":14},"updatedAt":{"a":true,"fo":"date-time","h":"Updated At","n":"updatedAt","r":true,"t":"`$STRING`","key$":"updatedAt","index$":15},"workspace":{"a":true,"h":"Workspace","n":"workspace","r":true,"t":"`$OBJECT`","key$":"workspace","index$":16}},"id":{"field":"id","name":"id"},"name":"workspace","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["icon","name"],"co":{"id":"POST /v1/workspaces","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/workspaces","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"workspaces"}],"t":{"req":"`reqdata`","res":"`body.workspace`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/workspaces/{workspaceId}/members","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"workspaceId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/workspaces/{workspaceId}/members","q":{"$action":"member","exist":["id"]},"r":{"param":{"workspaceId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"workspaces"},{"var":"id"},{"lit":"members"}],"t":{"req":"`reqdata`","res":"`body.members`"},"index$":0},{"a":true,"co":{"id":"GET /v1/workspaces","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v1/workspaces","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"workspaces"}],"t":{"req":"`reqdata`","res":"`body.workspaces`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/workspaces/{workspaceId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"workspaceId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/workspaces/{workspaceId}","q":{"exist":["id"]},"r":{"param":{"workspaceId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"workspaces"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.workspace`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"bf":false,"co":{"id":"DELETE /v1/workspaces/{workspaceId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"workspaceId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v1/workspaces/{workspaceId}","q":{"exist":["id"]},"r":{"param":{"workspaceId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"workspaces"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["icon","name"],"co":{"id":"PATCH /v1/workspaces/{workspaceId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"workspaceId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/v1/workspaces/{workspaceId}","q":{"exist":["id"]},"r":{"param":{"workspaceId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"workspaces"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.workspace`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"workspace","name__orig":"workspace","Name":"Workspace","name_":"workspace","name-":"workspace","NAME":"WORKSPACE","index$":5}, {"active":true,"entity":"workspace","key$":"BasicWorkspaceFlow","kind":"basic","name":"BasicWorkspaceFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"workspace_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"workspace_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"workspace_ref01","srcdatavar":"workspace_ref01_data","suffix":"_up0","textfield":"createdAt"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-workspace_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"workspace_ref01","srcdatavar":"workspace_ref01_data","suffix":"_dt0"},"m":{"id":"workspace01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-workspace_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"workspace_ref01","suffix":"_rm0"},"m":{"id":"workspace01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"workspace_ref01"}}],"index$":5}]}, 'Workspace', {"POST /v1/workspaces":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"icon":{"type":"string","key$":"icon"},"name":{"type":"string","key$":"name"}},"required":["name"],"index$":1}}}},"parameters":[]},"GET /v1/workspaces/{workspaceId}/members":{"protocol":"http","parameters":[{"name":"workspaceId","in":"path","required":true,"schema":{"type":"string","description":"[Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid)"},"index$":0}]},"GET /v1/workspaces":{"protocol":"http","parameters":[]},"GET /v1/workspaces/{workspaceId}":{"protocol":"http","parameters":[{"name":"workspaceId","in":"path","required":true,"schema":{"type":"string","description":"[Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid)"},"index$":0}]},"DELETE /v1/workspaces/{workspaceId}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","properties":{},"required":[]}}}},"parameters":[{"name":"workspaceId","in":"path","required":true,"schema":{"type":"string","description":"[Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid)"},"index$":0}]},"PATCH /v1/workspaces/{workspaceId}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","key$":"name"},"icon":{"type":"string","key$":"icon"}},"required":[],"index$":1}}}},"parameters":[{"name":"workspaceId","in":"path","required":true,"schema":{"type":"string","description":"[Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid)"},"index$":0}]}}, { strict: LIVE_STRICT, t })
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
    const workspace_ref01_match: any = {}

    const workspace_ref01_list = (await workspace_ref01_ent.list(workspace_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(workspace_ref01_list, { id: workspace_ref01_data.id })))


    // UPDATE
    const workspace_ref01_data_up0: any = {}
    workspace_ref01_data_up0.id = workspace_ref01_data.id

    const workspace_ref01_markdef_up0 = { name: 'createdAt', value: 'Mark01-workspace_ref01_' + setup.now }
    ;(workspace_ref01_data_up0 as any)[workspace_ref01_markdef_up0.name] = workspace_ref01_markdef_up0.value

    const workspace_ref01_resdata_up0 = (await workspace_ref01_ent.update(workspace_ref01_data_up0)).data()
    assert(workspace_ref01_resdata_up0.id === workspace_ref01_data_up0.id)

    assert((workspace_ref01_resdata_up0 as any)[workspace_ref01_markdef_up0.name] === workspace_ref01_markdef_up0.value)


    // LOAD
    const workspace_ref01_match_dt0: any = {}
    workspace_ref01_match_dt0.id = workspace_ref01_data.id
    const workspace_ref01_data_dt0 = (await workspace_ref01_ent.load(workspace_ref01_match_dt0)).data()
    assert(workspace_ref01_data_dt0.id === workspace_ref01_data.id)


    // REMOVE
    const workspace_ref01_match_rm0: any = { id: workspace_ref01_data.id }
    await workspace_ref01_ent.remove(workspace_ref01_match_rm0)
  

    // LIST
    const workspace_ref01_match_rt0: any = {}

    const workspace_ref01_list_rt0 = (await workspace_ref01_ent.list(workspace_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(workspace_ref01_list_rt0, { id: workspace_ref01_data.id })))


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
  
