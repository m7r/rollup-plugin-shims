if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function findIndex(predicate /*, thisArg */) {
    if (!callable(predicate)) {
      throw new TypeError("predicate must be a function");
    }
    var list = coerceObject(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}
