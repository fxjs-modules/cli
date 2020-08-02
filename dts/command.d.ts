declare namespace CliCommandNS {
    interface Argument {
        required: boolean
        name: string
        rest: boolean
    }

    // Demanded arguments in order [...allAngled, ...allSquared]
    type OrderedCommandArguments = CliCommandNS.Argument[]

    interface Config {
        allowUnknownOptions?: boolean
        ignoreOptionDefaultValue?: boolean
    }

    type CommandExample = ((bin: string) => string) | string

    interface HelpSection {
        title?: string
        body: string
    }

    type HelpCallback = (sections: HelpSection[]) => void

    type OutputLikeOptions = {
        /**
         * @description should exit after print help
         */
        exit?: boolean
    }
}