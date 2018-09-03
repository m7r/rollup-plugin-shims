if (!Object.entries) {
  Object.entries = function (obj) {
    return Object.keys(Object(obj)).map(function (key) {
      return [key, obj[key]]
    })
  };
}
