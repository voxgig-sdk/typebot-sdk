
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

const { test, describe } = require('node:test')
const assert = require('node:assert')


const { TypebotSDK } = require('../../..')

const {
  envOverride,
} = require('../../utility')


describe('WorkspaceDirect', async () => {

  test('direct-exists', async () => {
    const sdk = new TypebotSDK({
      system: { fetch: async () => ({}) }
    })
    assert('function' === typeof sdk.direct)
    assert('function' === typeof sdk.prepare)
  })


  test('direct-load-workspace', async () => {
    const setup = directSetup({ id: 'direct01' })
    const { client, calls } = setup

    const params = {}
    if (setup.live) {
      const listResult = await client.direct({
        path: 'v1/workspaces/{id}/members',
        method: 'GET',
        params: {
        id: setup.idmap['workspace01'],
        },
      })
      assert(listResult.ok === true)
      const listData = listResult.data
      if (!Array.isArray(listData) || listData.length === 0) {
        return // skip: no entities to load in live mode
      }
      params.id = listData[0].id

    } else {
      params.id = 'direct01'
    }

    const result = await client.direct({
      path: 'v1/workspaces/{id}',
      method: 'GET',
      params,
    })

    assert(result.ok === true)
    assert(result.status === 200)
    assert(null != result.data)

    if (!setup.live) {
      assert(result.data.id === 'direct01')
      assert(calls.length === 1)
      assert(calls[0].init.method === 'GET')
      assert(calls[0].url.includes('direct01'))
    }
  })

  test('direct-list-workspace', async () => {
    const setup = directSetup([{ id: 'direct01' }, { id: 'direct02' }])
    const { client, calls } = setup

    const params = {}
    if (setup.live) {
      params.id = setup.idmap['workspace01']
    } else {
      params.id = 'direct01'
    }

    const result = await client.direct({
      path: 'v1/workspaces/{id}/members',
      method: 'GET',
      params,
    })

    assert(result.ok === true)
    assert(result.status === 200)
    assert(Array.isArray(result.data))

    if (!setup.live) {
      assert(result.data.length === 2)
      assert(calls.length === 1)
      assert(calls[0].init.method === 'GET')
      assert(calls[0].url.includes('direct01'))
    }
  })

})



function directSetup(mockres) {
  const calls = []

  const env = envOverride({
    'TYPEBOT_TEST_WORKSPACE_ENTID': {},
    'TYPEBOT_TEST_LIVE': 'FALSE',
    'TYPEBOT_APIKEY': 'NONE',
  })

  const live = 'TRUE' === env.TYPEBOT_TEST_LIVE

  if (live) {
    const client = new TypebotSDK({
      apikey: env.TYPEBOT_APIKEY,
    })

    let idmap = env['TYPEBOT_TEST_WORKSPACE_ENTID']
    if ('string' === typeof idmap && idmap.startsWith('{')) {
      idmap = JSON.parse(idmap)
    }

    return { client, calls, live, idmap }
  }

  const mockFetch = async (url, init) => {
    calls.push({ url, init })
    return {
      status: 200,
      statusText: 'OK',
      headers: {},
      json: async () => (null != mockres ? mockres : { id: 'direct01' }),
    }
  }

  const client = new TypebotSDK({
    base: 'http://localhost:8080',
    system: { fetch: mockFetch },
  })

  return { client, calls, live, idmap: {} }
}
  
