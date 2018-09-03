module.exports = {
  instanceMethods: {
    codePointAt: 'es2015/string-code-point-at.js',
    copyWithin: 'es2015/array-copy-within.js',
    fill: 'es2015/array-fill.js',
    find: 'es2015/array-find.js',
    findIndex: 'es2015/array-find-index.js',
    includes: ['es2015/string-includes.js', 'es2016/array-includes.js'],
    repeat: 'es2015/string-repeat.js',
    startsWith: 'es2015/string-starts-with.js',
    endsWith: 'es2015/string-endsWith.js',
    padStart: 'es2017/string-pad-start.js',
    padEnd: 'es2017/string-pad-end.js'
  },
  staticMethods: {
    Array: {
      from: 'es2015/array-from.js',
      of: 'es2015/array-of.js'
    },
    Number: {
      EPSILON: 'es2015/number-epsilon.js',
      MAX_SAFE_INTEGER: 'es2015/number-max-save-integer.js',
      MIN_SAFE_INTEGER: 'es2015/number-min-save-integer.js',
      isNaN: 'es2015/number-is-nan.js',
      isInteger: 'es2015/number-is-integer.js',
      isSaveInteger: 'es2015/number-is-save-integer.js',
      isFinite: 'es2015/number-is-finite.js',
      parseFloat: 'es2015/number-parse-float.js',
      parseInt: 'es2015/number-parse-int.js'
    },
    Object: {
      assign: 'es2015/object-assign.js',
      is: 'es2015/object-is.js',
      values: 'es2017/object-values.js',
      entries: 'es2017/object-entries.js'
    }
  }
}
