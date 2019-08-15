if (!Object.entries) {
  Object.entries = function entries (O) {
    if (O == null) throw new TypeError('Cannot convert undefined or null to object')
    var obj = Object(O)
    var has = Object.prototype.hasOwnProperty
    var enumerable = Object.prototype.propertyIsEnumerable
    var entrys = []
    for (var key in obj) {
      if (has.call(obj, key) && enumerable.call(obj, key)) {
        entrys.push([key, obj[key]])
      }
    }
    return entrys
  }
}
