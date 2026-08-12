
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe } = require('node:test')
const assert = require('node:assert')


const { TypebotSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('WorkspaceEntity', async () => {

  test('instance', async () => {
    const testsdk = TypebotSDK.test()
    const ent = testsdk.Workspace()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const workspace_ref01_ent = client.Workspace()
    let workspace_ref01_data = setup.data.new.workspace['workspace_ref01']

    workspace_ref01_data = await workspace_ref01_ent.create(workspace_ref01_data)
    assert(null != workspace_ref01_data.id)


    // LIST
    const workspace_ref01_match = {}

    const workspace_ref01_list = await workspace_ref01_ent.list(workspace_ref01_match)

    assert(!isempty(select(workspace_ref01_list, { id: workspace_ref01_data.id })))


    // UPDATE
    const workspace_ref01_data_up0 = {}
    workspace_ref01_data_up0.id = workspace_ref01_data.id

    const workspace_ref01_markdef_up0 = { name: 'createdAt', value: 'Mark01-workspace_ref01_' + setup.now }
    workspace_ref01_data_up0 [workspace_ref01_markdef_up0.name] = workspace_ref01_markdef_up0.value

    const workspace_ref01_resdata_up0 = await workspace_ref01_ent.update(workspace_ref01_data_up0)
    assert(workspace_ref01_resdata_up0.id === workspace_ref01_data_up0.id)

    assert(workspace_ref01_resdata_up0[workspace_ref01_markdef_up0.name] === workspace_ref01_markdef_up0.value)


    // LOAD
    const workspace_ref01_match_dt0 = {}
    workspace_ref01_match_dt0.id = workspace_ref01_data.id
    const workspace_ref01_data_dt0 = await workspace_ref01_ent.load(workspace_ref01_match_dt0)
    assert(workspace_ref01_data_dt0.id === workspace_ref01_data.id)


    // REMOVE
    const workspace_ref01_match_rm0 = {}
    workspace_ref01_match_rm0.id = workspace_ref01_data.id
    await workspace_ref01_ent.remove(workspace_ref01_match_rm0)
  

    // LIST
    const workspace_ref01_match_rt0 = {}

    const workspace_ref01_list_rt0 = await workspace_ref01_ent.list(workspace_ref01_match_rt0)

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
    'TYPEBOT_APIKEY': 'NONE',
  })

  idmap = env['TYPEBOT_TEST_WORKSPACE_ENTID']

  if ('TRUE' === env.TYPEBOT_TEST_LIVE) {
    client = new TypebotSDK(merge([
      {
        apikey: env.TYPEBOT_APIKEY,
      },
      extra
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
    now: Date.now(),
  }

  return setup
}
  
