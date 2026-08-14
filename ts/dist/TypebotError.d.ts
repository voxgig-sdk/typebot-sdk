import { Context } from './Context';
declare class TypebotError extends Error {
    isTypebotError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    constructor(code: string, msg: string, ctx: Context);
}
export { TypebotError };
