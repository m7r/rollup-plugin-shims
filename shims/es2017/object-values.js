if (!Object.values) {
  Object.values = function values (O) {
    var obj = coerceObject(O)
    var vals = []
    for (var key in obj) {
      if (has.call(obj, key) && enumerable.call(obj, key)) {
        vals.push(obj[key])
      }
    }
    return vals
  }
}
