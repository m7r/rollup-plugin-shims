const map = {
  common: 'common.js',
  instanceMethods: {
    codePointAt: 'es2015/string-code-point-at.js',
    copyWithin: 'es2015/array-copy-within.js',
    fill: 'es2015/array-fill.js',
    find: 'es2015/array-find.js',
    findIndex: 'es2015/array-find-index.js',
    includes: ['es2015/string-includes.js', 'es2016/array-includes.js'],
    repeat: 'es2015/string-repeat.js',
    startsWith: 'es2015/string-starts-with.js',
    endsWith: 'es2015/string-ends-with.js',
    padStart: 'es2017/string-pad-start.js',
    padEnd: 'es2017/string-pad-end.js',
    trimStart: 'es2019/string-trim-start.js',
    trimEnd: 'es2019/string-trim-end.js',
    flat: 'es2019/array-flat.js',
    flatMap: 'es2019/array-flat.js'
  },
  staticMethods: {
    Array: {
      from: 'es2015/array-from.js',
      of: 'es2015/array-of.js'
    },
    Number: {
      EPSILON: 'es2015/number-epsilon.js',
      MAX_SAFE_INTEGER: 'es2015/number-max-safe-integer.js',
      MIN_SAFE_INTEGER: 'es2015/number-min-safe-integer.js',
      isNaN: 'es2015/number-is-nan.js',
      isInteger: 'es2015/number-is-integer.js',
      isSafeInteger: 'es2015/number-is-safe-integer.js',
      isFinite: 'es2015/number-is-finite.js',
      parseFloat: 'es2015/number-parse-float.js',
      parseInt: 'es2015/number-parse-int.js'
    },
    Object: {
      assign: 'es2015/object-assign.js',
      is: 'es2015/object-is.js',
      values: 'es2017/object-values.js',
      entries: 'es2017/object-entries.js',
      fromEntries: 'es2019/object-from-entries.js'
    }
  }
}

const index = (accum, key) => {
  accum[key] = true
  return accum
}

map.needsCommon = [
  map.instanceMethods.copyWithin,
  map.instanceMethods.fill,
  map.instanceMethods.find,
  map.instanceMethods.findIndex,
  map.instanceMethods.includes,
  map.instanceMethods.flat,
  map.instanceMethods.flatMap,
  map.staticMethods.Array.from,
  map.staticMethods.Number.MAX_SAFE_INTEGER,
  map.staticMethods.Number.MIN_SAFE_INTEGER,
  map.staticMethods.Number.isSafeInteger,
  map.staticMethods.Object.assign,
  map.staticMethods.Object.values,
  map.staticMethods.Object.entries
].reduce(index, {})

module.exports = map
