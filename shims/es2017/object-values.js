if (!Object.values) {
  Object.values = function (O) {
    var obj = Object(O)
    var vals = []
    for (var key in obj) {
      if (obj.hasOwnProperty(key) && obj.propertyIsEnumerable(key)) {
        vals.push(obj[key])
      }
    }
    return vals
  }
}
