if (!Object.values) {
  Object.values = function (obj) {
    return Object.keys(Object(obj)).map(function (key) {
      return obj[key]
    })
  };
}
