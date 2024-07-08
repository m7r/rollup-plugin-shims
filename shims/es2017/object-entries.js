if (!Object.entries) {
  Object.entries = function entries(O) {
    var obj = coerceObject(O);
    var entrys = [];
    for (var key in obj) {
      if (has.call(obj, key) && enumerable.call(obj, key)) {
        entrys.push([key, obj[key]]);
      }
    }
    return entrys;
  };
}
