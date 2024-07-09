if (!Array.prototype.findLastIndex) {
  Array.prototype.findLastIndex = function findLastIndex(
    predicate /*, thisArg */
  ) {
    if (!callable(predicate)) {
      throw new TypeError("predicate must be a function");
    }
    var list = coerceObject(this);
    var length = toLength(list.length);
    var thisArg = arguments[1];
    var value;

    for (var i = length; i > -1; i--) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}
