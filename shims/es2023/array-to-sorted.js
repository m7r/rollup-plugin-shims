if (!Array.prototype.toSorted) {
  Array.prototype.toSorted = function toSorted(comparator) {
    if (comparator !== undefined && !callable(comparator)) {
      throw new TypeError(
        "Array.prototype.toSorted requires the comparator argument to be a function or undefined"
      );
    }
    var O = coerceObject(this);
    var len = toLength(O.length);
    var A = Array(len);

    var i = 0;
    while (i < len) {
      var Pi = String(i);
      A[Pi] = O[Pi];
      i += 1;
    }

    A.sort(comparator);

    return A;
  };
}
