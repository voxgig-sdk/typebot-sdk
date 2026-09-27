
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


describe('FolderEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TYPEBOT_TEST_LIVE=TRUE.
  afterEach(liveDelay('TYPEBOT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TypebotSDK.test()
    const ent = testsdk.Folder()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":true,"t":"`$STRING`","key$":"createdAt","index$":0},"folder":{"a":true,"h":"Folder","n":"folder","r":true,"t":"`$OBJECT`","key$":"folder","index$":1},"folderName":{"a":true,"h":"Folder Name","n":"folderName","r":false,"t":"`$STRING`","key$":"folderName","index$":2},"id":{"a":true,"h":"Id","n":"id","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"id","index$":3},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":4},"parentFolderId":{"a":true,"h":"Parent Folder Id","n":"parentFolderId","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$ANY`","key$":"parentFolderId","index$":5},"updatedAt":{"a":true,"fo":"date-time","h":"Updated At","n":"updatedAt","r":true,"t":"`$STRING`","key$":"updatedAt","index$":6},"workspaceId":{"a":true,"h":"Workspace Id","n":"workspaceId","r":true,"t":"`$STRING`","key$":"workspaceId","index$":7}},"id":{"field":"id","name":"id"},"name":"folder","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v1/folders","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/folders","q":{},"r":{},"s":[{"lit":"v1"},{"lit":"folders"}],"t":{"req":"`reqdata`","res":"`body.folder`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/folders","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"parent_folder_id","or":"parent_folder_id","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"workspace_id","or":"workspace_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/folders","q":{"exist":["parent_folder_id","workspace_id"]},"r":{},"s":[{"lit":"v1"},{"lit":"folders"}],"t":{"req":"`reqdata`","res":"`body.folders`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/folders/{folderId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"folder_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"workspace_id","or":"workspace_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/folders/{folderId}","q":{"exist":["id","workspace_id"]},"r":{"param":{"folderId":"id"}},"s":[{"lit":"v1"},{"lit":"folders"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.folder`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v1/folders/{folderId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"folder_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v1/folders/{folderId}","q":{"exist":["id"]},"r":{"param":{"folderId":"id"}},"s":[{"lit":"v1"},{"lit":"folders"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.folder`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /v1/folders/{folderId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"folder_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/v1/folders/{folderId}","q":{"exist":["id"]},"r":{"param":{"folderId":"id"}},"s":[{"lit":"v1"},{"lit":"folders"},{"var":"id"}],"t":{"req":{"folder":"`reqdata`"},"res":"`body.folder`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"folder","name__orig":"folder","Name":"Folder","name_":"folder","name-":"folder","NAME":"FOLDER","index$":2}, {"active":true,"entity":"folder","key$":"BasicFolderFlow","kind":"basic","name":"BasicFolderFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"folder_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"folder_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"folder_ref01","srcdatavar":"folder_ref01_data","suffix":"_up0","textfield":"createdAt"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-folder_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"folder_ref01","srcdatavar":"folder_ref01_data","suffix":"_dt0"},"m":{"id":"folder01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-folder_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"folder_ref01","suffix":"_rm0"},"m":{"id":"folder01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"folder_ref01"}}],"index$":5}]}, 'Folder', {"POST /v1/folders":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"string","pattern":"^[0-9a-z]+$","key$":"id"},"folderName":{"type":"string","key$":"folderName"},"workspaceId":{"type":"string","key$":"workspaceId"},"parentFolderId":{"type":"string","key$":"parentFolderId"}},"required":["workspaceId"],"index$":1}}}},"parameters":[]},"GET /v1/folders":{"protocol":"http","parameters":[{"name":"workspaceId","in":"query","required":true,"schema":{"type":"string"},"allowEmptyValue":true,"allowReserved":true,"index$":0},{"name":"parentFolderId","in":"query","required":false,"schema":{"type":"string"},"allowEmptyValue":true,"allowReserved":true,"index$":1}]},"GET /v1/folders/{folderId}":{"protocol":"http","parameters":[{"name":"folderId","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"workspaceId","in":"query","required":true,"schema":{"type":"string"},"allowEmptyValue":true,"allowReserved":true,"index$":1}]},"DELETE /v1/folders/{folderId}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"workspaceId":{"type":"string"}},"required":["workspaceId"]}}}},"parameters":[{"name":"folderId","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PATCH /v1/folders/{folderId}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"workspaceId":{"type":"string","key$":"workspaceId"},"folder":{"type":"object","properties":{"name":{"type":"string"},"parentFolderId":{"anyOf":[{},{}]}},"key$":"folder"}},"required":["workspaceId","folder"],"index$":1}}}},"parameters":[{"name":"folderId","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const folder_ref01_ent = client.Folder()
    let folder_ref01_data = setup.data.new.folder['folder_ref01']

    folder_ref01_data = (await folder_ref01_ent.create(folder_ref01_data)).data()
    assert(null != folder_ref01_data.id)


    // LIST
    const folder_ref01_match = {}

    const folder_ref01_list = (await folder_ref01_ent.list(folder_ref01_match)).map((e) => e.data())

    assert(!isempty(select(folder_ref01_list, { id: folder_ref01_data.id })))


    // UPDATE
    const folder_ref01_data_up0 = {}
    folder_ref01_data_up0.id = folder_ref01_data.id

    const folder_ref01_markdef_up0 = { name: 'createdAt', value: 'Mark01-folder_ref01_' + setup.now }
    folder_ref01_data_up0 [folder_ref01_markdef_up0.name] = folder_ref01_markdef_up0.value

    const folder_ref01_resdata_up0 = (await folder_ref01_ent.update(folder_ref01_data_up0)).data()
    assert(folder_ref01_resdata_up0.id === folder_ref01_data_up0.id)

    assert(folder_ref01_resdata_up0[folder_ref01_markdef_up0.name] === folder_ref01_markdef_up0.value)


    // LOAD
    const folder_ref01_match_dt0 = {}
    folder_ref01_match_dt0.id = folder_ref01_data.id
    const folder_ref01_data_dt0 = (await folder_ref01_ent.load(folder_ref01_match_dt0)).data()
    assert(folder_ref01_data_dt0.id === folder_ref01_data.id)


    // REMOVE
    const folder_ref01_match_rm0 = {}
    folder_ref01_match_rm0.id = folder_ref01_data.id
    await folder_ref01_ent.remove(folder_ref01_match_rm0)
  

    // LIST
    const folder_ref01_match_rt0 = {}

    const folder_ref01_list_rt0 = (await folder_ref01_ent.list(folder_ref01_match_rt0)).map((e) => e.data())

    assert(isempty(select(folder_ref01_list_rt0, { id: folder_ref01_data.id })))


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/folder/FolderTestData.json')

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
    ['folder01','folder02','folder03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TYPEBOT_TEST_FOLDER_ENTID': idmap,
    'TYPEBOT_TEST_LIVE': 'FALSE',
    'TYPEBOT_TEST_EXPLAIN': 'FALSE',
    'TYPEBOT_APIKEY': '',
  })

  idmap = env['TYPEBOT_TEST_FOLDER_ENTID']

  const live = 'TRUE' === env.TYPEBOT_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TYPEBOT_TEST_FOLDER_ENTID']
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
  
