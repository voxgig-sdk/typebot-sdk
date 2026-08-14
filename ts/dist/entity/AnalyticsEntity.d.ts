import { TypebotEntityBase } from '../TypebotEntityBase';
import type { TypebotSDK } from '../TypebotSDK';
import type { Control } from '../types';
import type { Analytics, AnalyticsLoadMatch } from '../TypebotTypes';
declare class AnalyticsEntity extends TypebotEntityBase<Analytics> {
    constructor(client: TypebotSDK, entopts: any);
    make(this: AnalyticsEntity): AnalyticsEntity;
    load(this: any, reqmatch?: AnalyticsLoadMatch, ctrl?: Control): Promise<Analytics>;
}
export { AnalyticsEntity };
