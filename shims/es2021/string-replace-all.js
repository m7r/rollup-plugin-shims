if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function (searchValue, replaceValue) {
    var O = coerceObject(this);

    if (toStr.call(searchValue) === "[object RegExp]") {
      if (!searchValue.global) {
        throw new TypeError("`.replaceAll` does not allow non-global regexes");
      }
    } else {
      searchValue = new RegExp(String(searchValue), "g");
    }

    if (typeof replaceValue !== "function") {
      replaceValue = String(replaceValue);
    }

    return String(O).replace(searchValue, replaceValue);
  };
}
