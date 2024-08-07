// import { coerceObject } from "../common.js";

if (!Array.prototype.includes) {
  Array.prototype.includes = function includes(
    searchElement /* , fromIndex */
  ) {
    var O = coerceObject(this);
    var len = parseInt(O.length, 10) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1], 10) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {
        k = 0;
      }
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (
        searchElement === currentElement ||
        Boolean(
          searchElement !== searchElement && currentElement !== currentElement
        )
      ) {
        return true;
      }
      k++;
    }
    return false;
  };
}
