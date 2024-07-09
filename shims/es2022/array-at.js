// import { coerceObject, toLength } from "../common.js";

if (!Array.prototype.at) {
  Array.prototype.at = function at(index) {
    var O = coerceObject(this);
    var len = toLength(O.length);
    var relativeIndex = index >> 0;
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return k < 0 || k >= len ? undefined : O[k];
  };
}
