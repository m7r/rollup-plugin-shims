if (!Object.fromEntries) {
  Object.fromEntries = function fromEntries (iterable) {
    if (!Array.isArray(iterable)) {
      throw new TypeError('this environment lacks native Symbols, and can not support non-Array iterables')
    }

    var obj = {}

    for (var i = 0; i < iterable.length; ++i) {
      var entry = iterable[i]
      if (typeof entry !== 'object') {
        throw new TypeError('iterator returned a non-object; entry expected')
      }
      obj[entry[0]] = entry[1]
    }

    return obj
  }
}
