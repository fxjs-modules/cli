import { RayTsTypeHelpers } from '@richardo2016/ts-type-helpers'

import FCli = require('./Cli')

const getFCli = (...args: RayTsTypeHelpers.ConstructorParams<typeof FCli>) => new FCli(...args)
getFCli.default = getFCli;

export = getFCli;
