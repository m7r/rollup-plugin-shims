// import { callable, coerceObject, toLength } from "../common.js";

if (!Array.from) {
  Array.from = function from(arrayLike /* , mapFn, thisArg */) {
    var C = this;
    var items = coerceObject(arrayLike);
    var mapFn = arguments.length > 1 ? arguments[1] : undefined;
    var T;
    if (typeof mapFn !== "undefined") {
      if (!callable(mapFn)) {
        throw new TypeError(
          "Array.from: when provided, the second argument must be a function"
        );
      }

      if (arguments.length > 2) {
        T = arguments[2];
      }
    }

    var len = toLength(items.length);
    var A = callable(C) ? Object(new C(len)) : new Array(len);

    var k = 0;
    var kValue;
    while (k < len) {
      kValue = items[k];
      if (mapFn) {
        A[k] =
          typeof T === "undefined" ?
            mapFn(kValue, k)
          : mapFn.call(T, kValue, k);
      } else {
        A[k] = kValue;
      }
      k += 1;
    }

    A.length = len;

    return A;
  };
}
