
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TypebotSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await TypebotSDK.test()
    equal(null !== testsdk, true)
  })

})
