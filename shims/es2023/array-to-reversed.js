// import { coerceObject, toLength } from "../common.js";

if (!Array.prototype.toReversed) {
  Array.prototype.toReversed = function toReversed() {
    var O = coerceObject(this);
    var len = toLength(O.length);
    var A = Array(len);
    var k = 0;
    while (k < len) {
      var from = String(len - k - 1);
      var to = String(k);
      A[to] = O[from];
      k += 1;
    }
    return A;
  };
}
