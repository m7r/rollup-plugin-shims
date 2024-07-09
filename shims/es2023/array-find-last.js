// import { coerceObject, toLength } from "../common.js";

if (!Array.prototype.findLast) {
  Array.prototype.findLast = function findLast(predicate /*, thisArg */) {
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
        return value;
      }
    }
    return undefined;
  };
}
