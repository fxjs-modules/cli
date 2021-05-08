/**
 * @param v
 */
export function removeBrackets(v: string) {
    return v.replace(/[<[].+/, '').trim()
}

const ANGLED_BRACKET_RE = /<([^>]+)>/g
const SQUARE_BRACKET_RE = /\[([^\]]+)\]/g
const VALID_VARNAME_PATTERN = '[$_a-zA-Z][$_a-zA-Z0-9]*'
/**
 * @sample VALID_VARNAME_RE.test('$$abc')
 * @sample VALID_VARNAME_RE.test('foo1')
 */
const VALID_VARNAME_RE = new RegExp(`^(${VALID_VARNAME_PATTERN})$`/* , 'g' */)
/**
 * @sample VALID_VARNAME_RE.test('...$$abc')
 * @sample VALID_VARNAME_RE.test('...foo1')
 */
const VALID_REST_VARNAME_RE = new RegExp(`^(\.\.\.${VALID_VARNAME_PATTERN})$`/* , 'g' */)
function getVarNameInfo (name: string) {
  let isRest = false,
      isNormal = VALID_VARNAME_RE.test(name),
      varName = name

  if (!isNormal) {
    isRest = VALID_REST_VARNAME_RE.test(name)
    if (isRest)
      varName = name.slice(3)
  } else
    varName = name

  return { isValid: isRest || isNormal, isRest, varName }
}

function makeDemandedOption(name: string, required: boolean, rest: boolean): CliCommandNS.Argument {
    return { required, name, rest }
}

export function parseBracketedArgs(v: string): CliCommandNS.OrderedCommandArguments {
    const args = []

    let angled_tuple, square_tuple, info

    while ((angled_tuple = ANGLED_BRACKET_RE.exec(v))) {
      info = getVarNameInfo(angled_tuple[1])
      if (info.isValid)
        args.push(makeDemandedOption(info.varName, true && !info.isRest, info.isRest))
    }

    while ((square_tuple = SQUARE_BRACKET_RE.exec(v))) {
      info = getVarNameInfo(square_tuple[1])
      if (info.isValid)
        args.push(makeDemandedOption(info.varName, false, info.isRest))
    }

    return args
}


export function findLongestStr (arr: string[]) {
  return arr.sort((a, b) => {
    return a.length > b.length ? -1 : 1
  })[0]
}

export function padRight (str: string, length: number, fill: string = ' ') {
  return str.length >= length ? str : `${str}${' '.repeat(length - str.length)}`
}

export const camelCase = (input: string) => {
  return input.replace(/([a-z])-([a-z])/g, (_, p1, p2) => {
    return p1 + p2.toUpperCase()
  })
}

export function setDotProp (
  obj: { [k: string]: any },
  keys: string[],
  val: any
) {
  let i = 0
  let length = keys.length
  let t = obj
  let x
  for (; i < length; ++i) {
    x = t[keys[i]]
    t = t[keys[i]] =
      i === length - 1
        ? val
        : x != null
        ? x
        : !!~keys[i + 1].indexOf('.') || !(+keys[i + 1] > -1)
        ? {}
        : []
  }
}

export type ITransformFunc<T> = (...args: any[]) => T
export type ITransforms = {
	[k: string]: {
		shouldTransform: boolean,
		transformFunction: ITransformFunc<any>
	}
}
export function setByType (
  obj: { [k: string]: any },
  transforms: { [k: string]: any }
) {
  for (const key of Object.keys(transforms)) {
    const transform = transforms[key]

    if (transform.shouldTransform) {
      obj[key] = Array.prototype.concat.call([], obj[key])

      if (typeof transform.transformFunction === 'function') {
        obj[key] = obj[key].map(transform.transformFunction)
      }
    }
  }
}

export function getProgramAppFromFilepath (input: string) {
  const m = /([^\\\/]+)$/.exec(input)
  return m ? m[1] : ''
}

export function addUnWrittableProperty(obj: Fibjs.AnyObject, p: string, v: any) {
  Object.defineProperty(obj, p, {
    get value () { return v },
    configurable: false
  })
}

export function addVisibleUnWrittableProperty(obj: Fibjs.AnyObject, p: string, v: any) {
  Object.defineProperty(obj, p, {
    get value () { return v },
    enumerable: true,
    configurable: false
  })
}

export function addHiddenChangeableProperty(obj: Fibjs.AnyObject, p: string, v: any) {
  Object.defineProperty(obj, p, {
    get value () { return v },
    enumerable: false,
    configurable: true
  })
}
