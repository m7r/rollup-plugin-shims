if (!Object.values) {
  Object.values = function values (O) {
    if (O == null) throw new TypeError('Cannot convert undefined or null to object')
    var obj = Object(O)
    var has = Object.prototype.hasOwnProperty
    var enumerable = Object.prototype.propertyIsEnumerable
    var vals = []
    for (var key in obj) {
      if (has.call(obj, key) && enumerable.call(obj, key)) {
        vals.push(obj[key])
      }
    }
    return vals
  }
}
