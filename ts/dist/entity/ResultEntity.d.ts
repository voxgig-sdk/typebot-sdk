import { TypebotEntityBase } from '../TypebotEntityBase';
import type { TypebotSDK } from '../TypebotSDK';
import type { Control } from '../types';
import type { Result, ResultLoadMatch, ResultListMatch, ResultRemoveMatch } from '../TypebotTypes';
declare class ResultEntity extends TypebotEntityBase<Result> {
    constructor(client: TypebotSDK, entopts: any);
    make(this: ResultEntity): ResultEntity;
    load(this: any, reqmatch?: ResultLoadMatch, ctrl?: Control): Promise<ResultEntity>;
    list(this: any, reqmatch?: ResultListMatch, ctrl?: Control): Promise<ResultEntity[]>;
    remove(this: any, reqmatch?: ResultRemoveMatch, ctrl?: Control): Promise<ResultEntity>;
}
export { ResultEntity };
