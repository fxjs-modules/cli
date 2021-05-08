import FCli = require('./Cli');
declare const getFCli: {
    (name?: string): FCli;
    default: any;
};
export = getFCli;
