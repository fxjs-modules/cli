import { RayTsTypeHelpers } from '@richardo2016/ts-type-helpers'

import FCli = require('./Cli')

type IGetFCli = (...args: RayTsTypeHelpers.ConstructorParams<typeof FCli>) => FCli;
const getFCli = (...args: RayTsTypeHelpers.ConstructorParams<typeof FCli>) => new FCli(...args)
getFCli.default = getFCli as IGetFCli;

export = getFCli;
