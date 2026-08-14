import { TypebotEntityBase } from '../TypebotEntityBase';
import type { TypebotSDK } from '../TypebotSDK';
import type { Control } from '../types';
import type { Typebot, TypebotLoadMatch, TypebotListMatch, TypebotCreateData, TypebotUpdateData, TypebotRemoveMatch } from '../TypebotTypes';
declare class TypebotEntity extends TypebotEntityBase<Typebot> {
    constructor(client: TypebotSDK, entopts: any);
    make(this: TypebotEntity): TypebotEntity;
    load(this: any, reqmatch?: TypebotLoadMatch, ctrl?: Control): Promise<Typebot>;
    list(this: any, reqmatch?: TypebotListMatch, ctrl?: Control): Promise<Typebot[]>;
    create(this: any, reqdata?: TypebotCreateData, ctrl?: Control): Promise<Typebot>;
    update(this: any, reqdata?: TypebotUpdateData, ctrl?: Control): Promise<Typebot>;
    remove(this: any, reqmatch?: TypebotRemoveMatch, ctrl?: Control): Promise<Typebot>;
}
export { TypebotEntity };
