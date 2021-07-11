import { RayTsTypeHelpers } from '@richardo2016/ts-type-helpers';
import FCli = require('./Cli');
declare type IGetFCli = (...args: RayTsTypeHelpers.ConstructorParams<typeof FCli>) => FCli;
declare const getFCli: {
    (name?: string): FCli;
    default: IGetFCli;
};
export = getFCli;
