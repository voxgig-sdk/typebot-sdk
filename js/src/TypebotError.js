

class TypebotError extends Error {

  isTypebotError = true

  sdk = 'Typebot'

  constructor(code, msg, ctx) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

module.exports = {
  TypebotError
}

