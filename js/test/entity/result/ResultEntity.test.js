
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


describe('ResultEntity', async () => {

  test('instance', async () => {
    const testsdk = TypebotSDK.test()
    const ent = testsdk.Result()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let result_ref01_data = Object.values(setup.data.existing.result)[0]

    // LIST
    const result_ref01_ent = client.Result()
    const result_ref01_match = {}
    result_ref01_match['result_id'] = setup.idmap['result01']
    result_ref01_match['typebot_id'] = setup.idmap['typebot01']

    const result_ref01_list = await result_ref01_ent.list(result_ref01_match)


    // LOAD
    const result_ref01_match_dt0 = {}
    result_ref01_match_dt0.id = result_ref01_data.id
    const result_ref01_data_dt0 = await result_ref01_ent.load(result_ref01_match_dt0)
    assert(result_ref01_data_dt0.id === result_ref01_data.id)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

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
    'TYPEBOT_APIKEY': 'NONE',
  })

  idmap = env['TYPEBOT_TEST_RESULT_ENTID']

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
  
