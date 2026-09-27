
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TypebotSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = TypebotSDK.test()
    equal(testsdk instanceof TypebotSDK, true,
      'TypebotSDK.test() must return a client synchronously')
  })

})
