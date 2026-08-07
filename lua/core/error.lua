-- Typebot SDK error

local TypebotError = {}
TypebotError.__index = TypebotError


function TypebotError.new(code, msg, ctx)
  local self = setmetatable({}, TypebotError)
  self.is_sdk_error = true
  self.sdk = "Typebot"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function TypebotError:error()
  return self.msg
end


function TypebotError:__tostring()
  return self.msg
end


return TypebotError
