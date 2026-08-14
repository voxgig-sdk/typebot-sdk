import { AnalyticsEntity } from './entity/AnalyticsEntity';
import { BillingEntity } from './entity/BillingEntity';
import { FolderEntity } from './entity/FolderEntity';
import { ResultEntity } from './entity/ResultEntity';
import { TypebotEntity } from './entity/TypebotEntity';
import { WorkspaceEntity } from './entity/WorkspaceEntity';
export type * from './TypebotTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { TypebotEntityBase } from './TypebotEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class TypebotSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Analytics(entopts?: Record<string, any>): AnalyticsEntity;
    Billing(entopts?: Record<string, any>): BillingEntity;
    Folder(entopts?: Record<string, any>): FolderEntity;
    Result(entopts?: Record<string, any>): ResultEntity;
    Typebot(entopts?: Record<string, any>): TypebotEntity;
    Workspace(entopts?: Record<string, any>): WorkspaceEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): TypebotSDK;
    tester(testopts?: any, sdkopts?: any): TypebotSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof TypebotSDK;
export { stdutil, config, BaseFeature, TypebotEntityBase, TypebotSDK, SDK, };
