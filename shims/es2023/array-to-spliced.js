if (!Array.prototype.toSpliced) {
  Array.prototype.toSpliced = function toSpliced(start, deleteCount) {
    var O = coerceObject(this);
    var len = toLength(O.length);
    var relativeStart = toIntegerOrInfinity(start);
    var actualStart;
    if (relativeStart === -Infinity) {
      actualStart = 0;
    } else if (relativeStart < 0) {
      actualStart = Math.max(len + relativeStart, 0);
    } else {
      actualStart = Math.min(relativeStart, len);
    }

    var items =
      arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : [];
    var insertCount = items.length;
    var actualDeleteCount =
      arguments.length < 1 ? 0
      : arguments.length < 2 ? len - actualStart
      : Math.min(
          Math.max(toIntegerOrInfinity(deleteCount), 0),
          len - actualStart
        );

    var newLen = len + insertCount - actualDeleteCount;
    if (newLen > MAX_SAFE_INTEGER) {
      throw new TypeError("Length exceeded the maximum array length");
    }

    var A = Array(newLen);
    var i = 0;
    var r = actualStart + actualDeleteCount;
    var Pi;

    while (i < actualStart) {
      Pi = String(i);
      A[Pi] = O[Pi];
      i += 1;
    }

    items.forEach(function (E) {
      A[String(i)] = E;
      i += 1;
    });

    while (i < newLen) {
      A[String(i)] = O[String(r)];
      i += 1;
      r += 1;
    }

    return A;
  };
}
