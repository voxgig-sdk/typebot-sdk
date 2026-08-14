import { TypebotEntityBase } from '../TypebotEntityBase';
import type { TypebotSDK } from '../TypebotSDK';
import type { Control } from '../types';
import type { Folder, FolderLoadMatch, FolderListMatch, FolderCreateData, FolderUpdateData, FolderRemoveMatch } from '../TypebotTypes';
declare class FolderEntity extends TypebotEntityBase<Folder> {
    constructor(client: TypebotSDK, entopts: any);
    make(this: FolderEntity): FolderEntity;
    load(this: any, reqmatch?: FolderLoadMatch, ctrl?: Control): Promise<Folder>;
    list(this: any, reqmatch?: FolderListMatch, ctrl?: Control): Promise<Folder[]>;
    create(this: any, reqdata?: FolderCreateData, ctrl?: Control): Promise<Folder>;
    update(this: any, reqdata?: FolderUpdateData, ctrl?: Control): Promise<Folder>;
    remove(this: any, reqmatch?: FolderRemoveMatch, ctrl?: Control): Promise<Folder>;
}
export { FolderEntity };
