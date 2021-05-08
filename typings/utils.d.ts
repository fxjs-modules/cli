/// <reference types="@fibjs/types" />
/**
 * @param v
 */
export declare function removeBrackets(v: string): string;
export declare function parseBracketedArgs(v: string): CliCommandNS.OrderedCommandArguments;
export declare function findLongestStr(arr: string[]): string;
export declare function padRight(str: string, length: number, fill?: string): string;
export declare const camelCase: (input: string) => string;
export declare function setDotProp(obj: {
    [k: string]: any;
}, keys: string[], val: any): void;
export declare type ITransformFunc<T> = (...args: any[]) => T;
export declare type ITransforms = {
    [k: string]: {
        shouldTransform: boolean;
        transformFunction: ITransformFunc<any>;
    };
};
export declare function setByType(obj: {
    [k: string]: any;
}, transforms: {
    [k: string]: any;
}): void;
export declare function getProgramAppFromFilepath(input: string): string;
export declare function addUnWrittableProperty(obj: Fibjs.AnyObject, p: string, v: any): void;
export declare function addVisibleUnWrittableProperty(obj: Fibjs.AnyObject, p: string, v: any): void;
export declare function addHiddenChangeableProperty(obj: Fibjs.AnyObject, p: string, v: any): void;
