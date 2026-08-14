import { TypebotEntityBase } from '../TypebotEntityBase';
import type { TypebotSDK } from '../TypebotSDK';
import type { Control } from '../types';
import type { Typebot, TypebotLoadMatch, TypebotListMatch, TypebotCreateData, TypebotUpdateData, TypebotRemoveMatch } from '../TypebotTypes';
declare class TypebotEntity extends TypebotEntityBase<Typebot> {
    constructor(client: TypebotSDK, entopts: any);
    make(this: TypebotEntity): TypebotEntity;
    load(this: any, reqmatch?: TypebotLoadMatch, ctrl?: Control): Promise<TypebotEntity>;
    list(this: any, reqmatch?: TypebotListMatch, ctrl?: Control): Promise<TypebotEntity[]>;
    create(this: any, reqdata?: TypebotCreateData, ctrl?: Control): Promise<TypebotEntity>;
    update(this: any, reqdata?: TypebotUpdateData, ctrl?: Control): Promise<TypebotEntity>;
    remove(this: any, reqmatch?: TypebotRemoveMatch, ctrl?: Control): Promise<TypebotEntity>;
}
export { TypebotEntity };
