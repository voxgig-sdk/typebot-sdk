"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypebotError = void 0;
class TypebotError extends Error {
    isTypebotError = true;
    sdk = 'Typebot';
    code;
    ctx;
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.TypebotError = TypebotError;
//# sourceMappingURL=TypebotError.js.map