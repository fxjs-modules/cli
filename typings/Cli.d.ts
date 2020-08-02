import { EventEmitter } from 'events';
import { FCliGlobalCommand, CliCommand } from './Command';
import CliOption = require('./Option');
interface ParsedArgv {
    args: ReadonlyArray<string>;
    options: {
        [k: string]: any;
    };
}
interface MriResult extends ParsedArgv {
    rawOptions: {
        [k: string]: any;
    };
}
declare class FCli extends EventEmitter {
    /** The program name to display in help and version message */
    name: string;
    commands: CliCommand[];
    topLevelCommand: FCliGlobalCommand;
    matchedCommand?: CliCommand;
    matchedCommandName?: string;
    /**
     * Raw CLI arguments
     */
    rawArgs: string[];
    /**
     * Parsed CLI arguments
     */
    args: MriResult['args'];
    /**
     * Parsed CLI options, camelCased
     */
    options: MriResult['options'];
    /**
     * Raw CLI options, i.e. not camelcased
     */
    rawOptions: MriResult['rawOptions'];
    /**
     * @param name The program name to display in help and version message
     */
    constructor(name?: string);
    /**
     * Add a global usage text.
     *
     * This is not used by sub-commands.
     */
    usage(text: string): this;
    /**
     * Add a sub-command
     */
    command(raw: string, description?: string, config?: CliCommandNS.Config): CliCommand;
    /**
     * Add a global CLI option.
     *
     * Which is also applied to sub-commands.
     */
    option(raw: string, description: string, config?: CliOption['config']): this;
    /**
     * Show help message when `-h, --help` flags appear.
     *
     */
    help(callback?: CliCommandNS.HelpCallback): this;
    /**
     * Show version number when `-v, --version` flags appear.
     *
     */
    version(version: string, customFlags?: string): this;
    /**
     * Add a global example.
     *
     * This example added here will not be used by sub-commands.
     */
    example(example: CliCommandNS.CommandExample): this;
    /**
     * Parse argv
     */
    parse(argvs?: string[], opts?: {
        run?: boolean;
    }): ParsedArgv;
    /**
     * Output the corresponding help message
     * When a sub-command is matched, output the help message for the command
     * Otherwise output the global one.
     *
     * This will also call `process.exit(0)` to quit the process.
     */
    outputHelp(opts?: CliCommandNS.OutputLikeOptions): void;
    /**
     * Output the version number.
     *
     * This will also call `process.exit(0)` to quit the process.
     */
    outputVersion(): void;
}
export = FCli;
