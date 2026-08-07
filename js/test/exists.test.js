
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { TypebotSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await TypebotSDK.test()
    equal(null !== testsdk, true)
  })

})
