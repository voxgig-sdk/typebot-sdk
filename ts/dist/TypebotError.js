"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypebotError = void 0;
class TypebotError extends Error {
    isTypebotError = true;
    sdk = 'Typebot';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.TypebotError = TypebotError;
//# sourceMappingURL=TypebotError.js.map