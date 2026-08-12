
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


describe('TypebotEntity', async () => {

  test('instance', async () => {
    const testsdk = TypebotSDK.test()
    const ent = testsdk.Typebot()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const typebot_ref01_ent = client.Typebot()
    let typebot_ref01_data = setup.data.new.typebot['typebot_ref01']

    typebot_ref01_data = await typebot_ref01_ent.create(typebot_ref01_data)
    assert(null != typebot_ref01_data.id)


    // LIST
    const typebot_ref01_match = {}

    const typebot_ref01_list = await typebot_ref01_ent.list(typebot_ref01_match)

    assert(!isempty(select(typebot_ref01_list, { id: typebot_ref01_data.id })))


    // UPDATE
    const typebot_ref01_data_up0 = {}
    typebot_ref01_data_up0.id = typebot_ref01_data.id

    const typebot_ref01_markdef_up0 = { name: 'accessRight', value: 'Mark01-typebot_ref01_' + setup.now }
    typebot_ref01_data_up0 [typebot_ref01_markdef_up0.name] = typebot_ref01_markdef_up0.value

    const typebot_ref01_resdata_up0 = await typebot_ref01_ent.update(typebot_ref01_data_up0)
    assert(typebot_ref01_resdata_up0.id === typebot_ref01_data_up0.id)

    assert(typebot_ref01_resdata_up0[typebot_ref01_markdef_up0.name] === typebot_ref01_markdef_up0.value)


    // LOAD
    const typebot_ref01_match_dt0 = {}
    typebot_ref01_match_dt0.id = typebot_ref01_data.id
    const typebot_ref01_data_dt0 = await typebot_ref01_ent.load(typebot_ref01_match_dt0)
    assert(typebot_ref01_data_dt0.id === typebot_ref01_data.id)


    // REMOVE
    const typebot_ref01_match_rm0 = {}
    typebot_ref01_match_rm0.id = typebot_ref01_data.id
    await typebot_ref01_ent.remove(typebot_ref01_match_rm0)
  

    // LIST
    const typebot_ref01_match_rt0 = {}

    const typebot_ref01_list_rt0 = await typebot_ref01_ent.list(typebot_ref01_match_rt0)

    assert(isempty(select(typebot_ref01_list_rt0, { id: typebot_ref01_data.id })))


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

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
    'TYPEBOT_APIKEY': 'NONE',
  })

  idmap = env['TYPEBOT_TEST_TYPEBOT_ENTID']

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
  
