import { TypebotEntityBase } from '../TypebotEntityBase';
import type { TypebotSDK } from '../TypebotSDK';
import type { Control } from '../types';
import type { Billing, BillingLoadMatch, BillingListMatch } from '../TypebotTypes';
declare class BillingEntity extends TypebotEntityBase<Billing> {
    constructor(client: TypebotSDK, entopts: any);
    make(this: BillingEntity): BillingEntity;
    load(this: any, reqmatch?: BillingLoadMatch, ctrl?: Control): Promise<BillingEntity>;
    list(this: any, reqmatch?: BillingListMatch, ctrl?: Control): Promise<BillingEntity[]>;
}
export { BillingEntity };
