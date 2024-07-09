if (!Object.groupBy) {
  Object.groupBy = function groupBy(items, callbackfn) {
    if (!callable(callbackfn)) {
      throw new TypeError(
        "Object.groupBy requires that the second argument must be a function"
      );
    }
    var O = coerceObject(items);
    var len = toLength(O.length);
    var target = Object.create(null);
    var i = 0;
    var key, value;
    while (i < len) {
      value = O[i];
      key = String(callbackfn(value, i));
      if (key in target) target[key].push(value);
      else target[key] = [value];
      i += 1;
    }
    return target;
  };
}
