-- Typebot SDK exists test

local sdk = require("typebot_sdk")

describe("TypebotSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
