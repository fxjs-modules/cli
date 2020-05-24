/// <reference path="../dts/command.d.ts" />
import FCli = require('./Cli');
import CliOption = require('./Option');
export declare class CliCommand {
    raw: string;
    description: string;
    config: CliCommandNS.Config;
    cli: FCli;
    options: CliOption[];
    aliasNames: string[];
    name: string;
    args: CliCommandNS.Argument[];
    examples: CliCommandNS.CommandExample[];
    helpCallback?: CliCommandNS.HelpCallback;
    topLevelCommand?: FCliGlobalCommand;
    commandAction?: (...args: any[]) => any;
    usageText?: string;
    versionNumber?: string;
    constructor(raw: string, description: string, config: CliCommandNS.Config, cli: FCli);
    /**
     * set usage text
     *
     * @param text usage text
     */
    usage(text: string): this;
    /**
     * set version number
     *
     * @param version semver string
     * @param customFlags customzied flags, default as `-v, --version`
     */
    version(version: string, customFlags?: string): this;
    /**
     * Add command example
     *
     * @param example Example Instance
     */
    example(example: CliCommandNS.CommandExample): this;
    /**
     * Add a option for this command
     * @param raw Raw option name(s)
     * @param description Option description
     * @param config Option config
     */
    option(raw: string, description: string, config?: CliOption['config']): this;
    /**
     * add alias of this command
     * @param name alias name
     */
    alias(name: string): this;
    /**
     * set action for this command
     *
     *
        interface ActionCallback {
            (
                // Parsed CLI args
                // The last arg will be an array if it's an varadic argument
                ...args: string | string[] | number | number[],
                // Parsed CLI options
                options: CliOption[]
            ): void
        }
        * @param callback callback when this command executed
    */
    action(callback: (...args: any[]) => any): this;
    /**
     * Check if a command name is matched by this command
     * @param name Command name
     */
    isCommandMatched(name: string): boolean;
    get isDefaultCommand(): boolean;
    get isGlobalCommand(): boolean;
    /**
     * Check if an option is registered in this command
     * @param name Option name
     */
    hasOption(name: string): boolean;
    outputHelp(): void;
    outputVersion(): void;
    checkRequiredArgs(): void;
    /**
     * Check if the parsed options contain any unknown options
     *
     * Exit and output error when true
     */
    checkUnknownOptions(): void;
    /**
     * Check if the required string-type options exist
     */
    checkOptionValue(): void;
}
export declare class FCliGlobalCommand extends CliCommand {
    constructor(cli: FCli);
}
