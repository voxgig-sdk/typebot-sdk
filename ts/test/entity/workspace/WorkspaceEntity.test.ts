
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { TypebotSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


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

    const live = 'TRUE' === process.env.TYPEBOT_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (maybeSkipControl(t, 'entityOp', 'workspace.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set TYPEBOT_TEST_WORKSPACE_ENTID JSON to run live')
      return
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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['TYPEBOT_TEST_WORKSPACE_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'TYPEBOT_TEST_WORKSPACE_ENTID': idmap,
    'TYPEBOT_TEST_LIVE': 'FALSE',
    'TYPEBOT_TEST_EXPLAIN': 'FALSE',
    'TYPEBOT_APIKEY': 'NONE',
  })

  idmap = env['TYPEBOT_TEST_WORKSPACE_ENTID']

  const live = 'TRUE' === env.TYPEBOT_TEST_LIVE

  if (live) {
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
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
