if (!Object.hasOwn) {
  Object.hasOwn = function hasOwn(obj, prop) {
    var O = coerceObject(obj);
    var P = toStr(prop);
    return has.call(O, P);
  };
}
