if (!String.prototype.codePointAt) {
  String.prototype.codePointAt = function codePointAt(position) {
    if (this == null) {
      throw new TypeError("called on null or undefined");
    }
    var string = String(this);
    var size = string.length;
    // `ToInteger`
    var index = position ? Number(position) : 0;
    if (index != index) {
      // better `isNaN`
      index = 0;
    }
    // Account for out-of-bounds indices:
    if (index < 0 || index >= size) {
      return undefined;
    }
    // Get the first code unit
    var first = string.charCodeAt(index);
    var second;
    if (
      // check if it’s the start of a surrogate pair
      first >= 0xd800 &&
      first <= 0xdbff && // high surrogate
      size > index + 1 // there is a next code unit
    ) {
      second = string.charCodeAt(index + 1);
      if (second >= 0xdc00 && second <= 0xdfff) {
        // low surrogate
        // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        return (first - 0xd800) * 0x400 + second - 0xdc00 + 0x10000;
      }
    }
    return first;
  };
}
