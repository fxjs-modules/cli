import { RayTsTypeHelpers } from '@richardo2016/ts-type-helpers'

import FCli = require('./Cli')

export = (...args: RayTsTypeHelpers.ConstructorParams<typeof FCli>) => new FCli(...args)
