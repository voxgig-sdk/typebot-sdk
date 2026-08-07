
import { Context } from './Context'


class TypebotError extends Error {

  isTypebotError = true

  sdk = 'Typebot'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  TypebotError
}

