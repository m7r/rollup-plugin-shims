if (!Object.entries) {
  Object.entries = function entries (O) {
    var obj = Object(O)
    var entrys = []
    for (var key in obj) {
      if (obj.hasOwnProperty(key) && obj.propertyIsEnumerable(key)) {
        entrys.push([key, obj[key]])
      }
    }
    return entrys
  }
}
