declare class CliOption {
    raw: string;
    description: string;
    name: string;
    names: string[];
    config: {
        default?: any;
        type?: any[];
    };
    negative: boolean;
    readonly required?: boolean;
    readonly isBoolean?: boolean;
    constructor(raw: string, description: string, config?: CliOption['config']);
}
export = CliOption;
