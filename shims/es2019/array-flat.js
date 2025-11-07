// import { toLength, coerceObject, callable, MAX_SAFE_INTEGER } from "../common.js";

if (!Array.prototype.flat || !Array.prototype.flatMap) {
  var FlattenIntoArray = function FlattenIntoArray(
    target,
    source,
    sourceLen,
    start,
    depth,
    mapperFunction,
    thisArg
  ) {
    var targetIndex = start;
    var sourceIndex = 0;

    while (sourceIndex < sourceLen) {
      var P = String(sourceIndex);
      var exists = source !== null && P in source;
      if (exists) {
        var element = source[P];
        if (typeof mapperFunction !== "undefined") {
          if (arguments.length <= 6) {
            throw new TypeError(
              "Assertion failed: thisArg is required when mapperFunction is provided"
            );
          }
          element = mapperFunction.call(thisArg, element, sourceIndex, source);
        }
        var shouldFlatten = false;
        if (depth > 0) {
          shouldFlatten = Array.isArray(element);
        }
        if (shouldFlatten) {
          var elementLen = toLength(element.length);
          targetIndex = FlattenIntoArray(
            target,
            element,
            elementLen,
            targetIndex,
            depth - 1
          );
        } else {
          if (targetIndex >= MAX_SAFE_INTEGER) {
            throw new TypeError("index too large");
          }
          target[targetIndex] = element;
          targetIndex += 1;
        }
      }
      sourceIndex += 1;
    }

    return targetIndex;
  };

  Array.prototype.flat = function flat() {
    var O = coerceObject(this);
    var sourceLen = toLength(O.length);

    var depthNum = 1;
    if (arguments.length > 0 && typeof arguments[0] !== "undefined") {
      depthNum = Number(arguments[0]);
    }

    var A = [];
    FlattenIntoArray(A, O, sourceLen, 0, depthNum);
    return A;
  };

  Array.prototype.flatMap = function flatMap(callbackfn /*, thisArg */) {
    var O = coerceObject(this);
    var sourceLen = toLength(O.length);

    if (!callable(callbackfn)) {
      throw new TypeError("callback must be a function");
    }

    var T;
    if (arguments.length > 1) {
      T = arguments[1];
    }

    var A = [];
    FlattenIntoArray(A, O, sourceLen, 0, 1, callbackfn, T);
    return A;
  };
}
