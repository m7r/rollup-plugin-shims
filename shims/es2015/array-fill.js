// import { coerceObject } from "../common.js";

if (!Array.prototype.fill) {
  Array.prototype.fill = function fill(value) {
    var O = coerceObject(this);
    var len = O.length >>> 0;
    var start = arguments[1];
    var relativeStart = start >> 0;

    var k =
      relativeStart < 0 ?
        Math.max(len + relativeStart, 0)
      : Math.min(relativeStart, len);

    var end = arguments[2];
    var relativeEnd = end === undefined ? len : end >> 0;

    var finalEnd =
      relativeEnd < 0 ?
        Math.max(len + relativeEnd, 0)
      : Math.min(relativeEnd, len);

    while (k < finalEnd) {
      O[k] = value;
      k++;
    }

    return O;
  };
}
