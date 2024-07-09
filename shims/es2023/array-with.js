if (!Array.prototype.with) {
  Array.prototype.with = function With(index, value) {
    var O = coerceObject(this);
    var len = toLength(O.length);
    var relativeIndex = toIntegerOrInfinity(index);
    var actualIndex = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;

    if (actualIndex >= len || actualIndex < 0) {
      throw new RangeError("index is out of range");
    }

    var A = Array(len);
    var k = 0;
    while (k < len) {
      var key = String(k);
      var fromValue = k === actualIndex ? value : O[key];
      A[key] = fromValue;
      k += 1;
    }
    return A;
  };
}
