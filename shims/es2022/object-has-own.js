if (!Object.hasOwn) {
  Object.hasOwn = function hasOwn(obj, prop) {
    var O = coerceObject(obj);
    var P = String(prop);
    return has.call(O, P);
  };
}
