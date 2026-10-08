

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


describe('TypebotEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TYPEBOT_TEST_LIVE=TRUE.
  afterEach(liveDelay('TYPEBOT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TypebotSDK.test()
    const ent = testsdk.Typebot()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('typebot hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of TypebotSDK.test(offline).Typebot().stream('list')) { }
    }, /offline/)

    for await (const _item of TypebotSDK.test(offline).Typebot()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = TypebotSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Typebot().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of TypebotSDK.test().Typebot().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new TypebotSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Typebot().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Typebot().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TypebotSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Typebot().list({"folder_id":1,"workspace_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TYPEBOT_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'typebot.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"accessRight":{"a":true,"h":"Access Right","n":"accessRight","r":true,"t":"`$STRING`","key$":"accessRight","index$":0},"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":true,"t":"`$STRING`","key$":"createdAt","index$":1},"currentUserMode":{"a":true,"h":"Current User Mode","n":"currentUserMode","r":true,"t":"`$STRING`","key$":"currentUserMode","index$":2},"customDomain":{"a":true,"h":"Custom Domain","n":"customDomain","r":true,"t":"`$ANY`","key$":"customDomain","index$":3},"edges":{"a":true,"h":"Edges","n":"edges","r":true,"t":"`$ARRAY`","union":{"branches":2,"count":1,"depth":3},"key$":"edges","index$":4},"events":{"a":true,"h":"Events","n":"events","r":true,"t":"`$ARRAY`","union":{"branches":3,"count":1,"depth":1},"key$":"events","index$":5},"folderId":{"a":true,"h":"Folder Id","n":"folderId","r":true,"t":"`$ANY`","key$":"folderId","index$":6},"groups":{"a":true,"h":"Groups","n":"groups","r":true,"t":"`$ARRAY`","union":{"branches":19,"count":31,"depth":14},"key$":"groups","index$":7},"icon":{"a":true,"h":"Icon","n":"icon","r":true,"t":"`$ANY`","key$":"icon","index$":8},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":9},"isArchived":{"a":true,"h":"Is Archived","n":"isArchived","r":true,"t":"`$BOOLEAN`","key$":"isArchived","index$":10},"isClosed":{"a":true,"h":"Is Closed","n":"isClosed","r":true,"t":"`$BOOLEAN`","key$":"isClosed","index$":11},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":12},"overwrite":{"a":true,"h":"Overwrite","n":"overwrite","r":false,"sh":"If true, even if we detect a conflict, we will overwrite push the updates to the typebot","t":"`$BOOLEAN`","key$":"overwrite","index$":13},"publicId":{"a":true,"h":"Public Id","n":"publicId","r":true,"t":"`$ANY`","key$":"publicId","index$":14},"publishedTypebotId":{"a":true,"h":"Published Typebot Id","n":"publishedTypebotId","r":false,"t":"`$STRING`","key$":"publishedTypebotId","index$":15},"resultsTablePreferences":{"a":true,"h":"Results Table Preferences","n":"resultsTablePreferences","r":true,"t":"`$ANY`","key$":"resultsTablePreferences","index$":16},"riskLevel":{"a":true,"h":"Risk Level","n":"riskLevel","r":true,"t":"`$ANY`","key$":"riskLevel","index$":17},"selectedThemeTemplateId":{"a":true,"h":"Selected Theme Template Id","n":"selectedThemeTemplateId","r":true,"t":"`$ANY`","key$":"selectedThemeTemplateId","index$":18},"settings":{"a":true,"h":"Settings","n":"settings","r":true,"t":"`$OBJECT`","key$":"settings","index$":19},"spaceId":{"a":true,"h":"Space Id","n":"spaceId","r":true,"t":"`$ANY`","key$":"spaceId","index$":20},"theme":{"a":true,"h":"Theme","n":"theme","r":true,"t":"`$OBJECT`","union":{"branches":2,"count":2,"depth":6},"key$":"theme","index$":21},"typebot":{"a":true,"h":"Typebot","n":"typebot","r":true,"t":"`$ANY`","union":{"branches":19,"count":49,"depth":18},"key$":"typebot","index$":22},"updatedAt":{"a":true,"fo":"date-time","h":"Updated At","n":"updatedAt","r":true,"t":"`$STRING`","key$":"updatedAt","index$":23},"variables":{"a":true,"h":"Variables","n":"variables","r":true,"t":"`$ARRAY`","union":{"branches":2,"count":1,"depth":5},"key$":"variables","index$":24},"version":{"a":true,"h":"Version","n":"version","r":true,"t":"`$STRING`","key$":"version","index$":25},"whatsAppCredentialsId":{"a":true,"h":"Whats App Credentials Id","n":"whatsAppCredentialsId","r":true,"t":"`$ANY`","key$":"whatsAppCredentialsId","index$":26},"workspaceId":{"a":true,"h":"Workspace Id","n":"workspaceId","r":true,"t":"`$STRING`","key$":"workspaceId","index$":27}},"id":{"field":"id","name":"id"},"name":"typebot","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /v1/typebots/{typebotId}/publish","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"typebotId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/typebots/{typebotId}/publish","q":{"$action":"publish","exist":["id"]},"r":{"param":{"typebotId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"typebots"},{"var":"id"},{"lit":"publish"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /v1/typebots/{typebotId}/unpublish","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"typebotId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/typebots/{typebotId}/unpublish","q":{"$action":"unpublish","exist":["id"]},"r":{"param":{"typebotId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"typebots"},{"var":"id"},{"lit":"unpublish"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["typebot","workspaceId"],"co":{"id":"POST /v1/typebots","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/typebots","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"typebots"}],"t":{"req":"`reqdata`","res":"`body.typebot`"},"index$":2},{"a":true,"bf":["enableSafetyFlags","fromTemplate","typebot","workspaceId"],"co":{"id":"POST /v1/typebots/import","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/typebots/import","q":{"$action":"import"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"typebots"},{"lit":"import"}],"t":{"req":"`reqdata`","res":"`body.typebot`"},"index$":3}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/typebots","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"folder_id","or":"folderId","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"workspace_id","or":"workspaceId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/typebots","q":{"exist":["workspace_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"typebots"}],"t":{"req":"`reqdata`","res":"`body.typebots`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/typebots/{typebotId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"typebotId","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":false,"k":"query","n":"migrate_to_latest_version","or":"migrateToLatestVersion","r":false,"t":"`$BOOLEAN`","index$":0}]},"k":"http","m":"GET","o":"/v1/typebots/{typebotId}","q":{"exist":["id"]},"r":{"param":{"typebotId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"typebots"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.typebot`"},"index$":0},{"a":true,"co":{"id":"GET /v1/typebots/{typebotId}/publishedTypebot","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"typebotId","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":false,"k":"query","n":"migrate_to_latest_version","or":"migrateToLatestVersion","r":false,"t":"`$BOOLEAN`","index$":0}]},"k":"http","m":"GET","o":"/v1/typebots/{typebotId}/publishedTypebot","q":{"$action":"published_typebot","exist":["id"]},"r":{"param":{"typebotId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"typebots"},{"var":"id"},{"lit":"publishedTypebot"}],"t":{"req":"`reqdata`","res":"`body.publishedTypebot`"},"index$":1}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"bf":false,"co":{"id":"DELETE /v1/typebots/{typebotId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"typebotId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v1/typebots/{typebotId}","q":{"exist":["id"]},"r":{"param":{"typebotId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"typebots"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["overwrite","typebot"],"co":{"id":"PATCH /v1/typebots/{typebotId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"typebotId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/v1/typebots/{typebotId}","q":{"exist":["id"]},"r":{"param":{"typebotId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"typebots"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.typebot`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"typebot","name__orig":"typebot","Name":"Typebot","name_":"typebot","name-":"typebot","NAME":"TYPEBOT","index$":4}, {"active":true,"entity":"typebot","key$":"BasicTypebotFlow","kind":"basic","name":"BasicTypebotFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"typebot_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"typebot_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"typebot_ref01","srcdatavar":"typebot_ref01_data","suffix":"_up0","textfield":"accessRight"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-typebot_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"typebot_ref01","srcdatavar":"typebot_ref01_data","suffix":"_dt0"},"m":{"id":"typebot01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-typebot_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"typebot_ref01","suffix":"_rm0"},"m":{"id":"typebot01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"typebot_ref01"}}],"index$":5}]}, 'Typebot', {"POST /v1/typebots/{typebotId}/publish":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","properties":{},"required":[]}}}},"parameters":[{"name":"typebotId","in":"path","required":true,"schema":{"type":"string","description":"[Where to find my bot's ID?](../how-to#how-to-find-my-typebotid)"},"index$":0}]},"POST /v1/typebots/{typebotId}/unpublish":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","properties":{},"required":[]}}}},"parameters":[{"name":"typebotId","in":"path","required":true,"schema":{"type":"string","description":"[Where to find my bot's ID?](../how-to#how-to-find-my-typebotid)"},"index$":0}]},"POST /v1/typebots":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"workspaceId":{"type":"string","key$":"workspaceId"},"typebot":{"type":"object","properties":{"name":{"type":"string"},"icon":{"anyOf":[{},{}]},"selectedThemeTemplateId":{"anyOf":[{},{}]},"groups":{"type":"array","items":{"type":"object","properties":{},"required":[]}},"events":{"type":"array","prefixItems":[{}],"items":{"anyOf":[]}},"theme":{"type":"object","properties":{"general":{},"chat":{},"customCss":{}}},"settings":{"type":"object","properties":{"general":{},"typingEmulation":{},"metadata":{},"whatsApp":{},"publicShare":{},"security":{}}},"folderId":{"anyOf":[{},{}]},"variables":{"type":"array","items":{"type":"object","properties":{},"required":[]}},"edges":{"type":"array","items":{"type":"object","properties":{},"required":[]}},"resultsTablePreferences":{"anyOf":[{},{}]},"publicId":{"anyOf":[{},{}]},"customDomain":{"anyOf":[{},{}]}},"key$":"typebot"}},"required":["workspaceId","typebot"],"index$":1}}}},"parameters":[]},"POST /v1/typebots/import":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"workspaceId":{"type":"string","description":"[Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid)"},"typebot":{"anyOf":[{"type":"object","properties":{"version":{},"name":{},"events":{},"groups":{},"edges":{},"variables":{},"theme":{},"settings":{},"icon":{},"folderId":{},"resultsTablePreferences":{},"selectedThemeTemplateId":{},"workspaceId":{},"id":{}},"required":["version","name","events","groups","edges","variables","theme","settings","icon","folderId"]},{"type":"object","properties":{"version":{},"name":{},"events":{},"groups":{},"edges":{},"variables":{},"theme":{},"settings":{},"icon":{},"folderId":{},"resultsTablePreferences":{},"selectedThemeTemplateId":{},"workspaceId":{},"id":{}},"required":["version","name","events","groups","edges","variables","theme","settings","icon","folderId"]}]},"fromTemplate":{"type":"string"},"enableSafetyFlags":{"type":"boolean"}},"required":["workspaceId","typebot"]}}}},"parameters":[]},"GET /v1/typebots":{"protocol":"http","parameters":[{"name":"workspaceId","in":"query","required":true,"schema":{"type":"string","description":"[Where to find my workspace ID?](../how-to#how-to-find-my-workspaceid)"},"allowEmptyValue":true,"allowReserved":true,"index$":0},{"name":"folderId","in":"query","required":false,"schema":{"type":"string"},"allowEmptyValue":true,"allowReserved":true,"index$":1}]},"GET /v1/typebots/{typebotId}":{"protocol":"http","parameters":[{"name":"typebotId","in":"path","required":true,"schema":{"type":"string","description":"[Where to find my bot's ID?](../how-to#how-to-find-my-typebotid)"},"index$":0},{"name":"migrateToLatestVersion","in":"query","required":false,"schema":{"type":"boolean","default":false,"description":"If enabled, the typebot will be converted to the latest schema version"},"allowEmptyValue":true,"allowReserved":true,"index$":1}]},"GET /v1/typebots/{typebotId}/publishedTypebot":{"protocol":"http","parameters":[{"name":"typebotId","in":"path","required":true,"schema":{"type":"string","description":"[Where to find my bot's ID?](../how-to#how-to-find-my-typebotid)"},"index$":0},{"name":"migrateToLatestVersion","in":"query","required":false,"schema":{"type":"boolean","default":false,"description":"If enabled, the typebot will be converted to the latest schema version"},"allowEmptyValue":true,"allowReserved":true,"index$":1}]},"DELETE /v1/typebots/{typebotId}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","properties":{},"required":[]}}}},"parameters":[{"name":"typebotId","in":"path","required":true,"schema":{"type":"string","description":"[Where to find my bot's ID?](../how-to#how-to-find-my-typebotid)"},"index$":0}]},"PATCH /v1/typebots/{typebotId}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"typebot":{"anyOf":[{"type":"object","properties":{"version":{},"name":{},"icon":{},"selectedThemeTemplateId":{},"groups":{},"theme":{},"settings":{},"folderId":{},"variables":{},"edges":{},"resultsTablePreferences":{},"publicId":{},"customDomain":{},"isClosed":{},"whatsAppCredentialsId":{},"riskLevel":{},"events":{},"updatedAt":{},"spaceId":{}}},{"type":"object","properties":{"version":{},"name":{},"icon":{},"selectedThemeTemplateId":{},"groups":{},"theme":{},"settings":{},"folderId":{},"variables":{},"edges":{},"resultsTablePreferences":{},"publicId":{},"customDomain":{},"isClosed":{},"whatsAppCredentialsId":{},"riskLevel":{},"events":{},"updatedAt":{},"spaceId":{}}}],"key$":"typebot"},"overwrite":{"type":"boolean","description":"If true, even if we detect a conflict, we will overwrite push the updates to the typebot","key$":"overwrite"}},"required":["typebot"],"index$":1}}}},"parameters":[{"name":"typebotId","in":"path","required":true,"schema":{"type":"string","description":"[Where to find my bot's ID?](../how-to#how-to-find-my-typebotid)"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const typebot_ref01_ent = client.Typebot()
    let typebot_ref01_data = setup.data.new.typebot['typebot_ref01']

    typebot_ref01_data = (await typebot_ref01_ent.create(typebot_ref01_data)).data()
    assert(null != typebot_ref01_data.id)


    // LIST
    const typebot_ref01_match: any = {}

    const typebot_ref01_list = (await typebot_ref01_ent.list(typebot_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(typebot_ref01_list, { id: typebot_ref01_data.id })))


    // UPDATE
    const typebot_ref01_data_up0: any = {}
    typebot_ref01_data_up0.id = typebot_ref01_data.id

    const typebot_ref01_markdef_up0 = { name: 'accessRight', value: 'Mark01-typebot_ref01_' + setup.now }
    ;(typebot_ref01_data_up0 as any)[typebot_ref01_markdef_up0.name] = typebot_ref01_markdef_up0.value

    const typebot_ref01_resdata_up0 = (await typebot_ref01_ent.update(typebot_ref01_data_up0)).data()
    assert(typebot_ref01_resdata_up0.id === typebot_ref01_data_up0.id)

    assert((typebot_ref01_resdata_up0 as any)[typebot_ref01_markdef_up0.name] === typebot_ref01_markdef_up0.value)


    // LOAD
    const typebot_ref01_match_dt0: any = {}
    typebot_ref01_match_dt0.id = typebot_ref01_data.id
    const typebot_ref01_data_dt0 = (await typebot_ref01_ent.load(typebot_ref01_match_dt0)).data()
    assert(typebot_ref01_data_dt0.id === typebot_ref01_data.id)


    // REMOVE
    const typebot_ref01_match_rm0: any = { id: typebot_ref01_data.id }
    await typebot_ref01_ent.remove(typebot_ref01_match_rm0)
  

    // LIST
    const typebot_ref01_match_rt0: any = {}

    const typebot_ref01_list_rt0 = (await typebot_ref01_ent.list(typebot_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(typebot_ref01_list_rt0, { id: typebot_ref01_data.id })))


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
      '../../../../.sdk/test/entity/typebot/TypebotTestData.json')

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
    ['typebot01','typebot02','typebot03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TYPEBOT_TEST_TYPEBOT_ENTID': idmap,
    'TYPEBOT_TEST_LIVE': 'FALSE',
    'TYPEBOT_TEST_EXPLAIN': 'FALSE',
    'TYPEBOT_APIKEY': '',
  })

  idmap = env['TYPEBOT_TEST_TYPEBOT_ENTID']

  const live = 'TRUE' === env.TYPEBOT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TYPEBOT_TEST_TYPEBOT_ENTID']
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
  
