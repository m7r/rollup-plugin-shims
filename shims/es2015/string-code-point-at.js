if (!String.prototype.codePointAt) {
  String.prototype.codePointAt = function (position) {
    if (this == null) {
      throw new TypeError()
    }
    let string = String(this)
    let size = string.length
    // `ToInteger`
    let index = position ? Number(position) : 0
    if (index != index) { // better `isNaN`
      index = 0
    }
    // Account for out-of-bounds indices:
    if (index < 0 || index >= size) {
      return undefined
    }
    // Get the first code unit
    let first = string.charCodeAt(index)
    let second
    if ( // check if it’s the start of a surrogate pair
      first >= 0xD800 && first <= 0xDBFF && // high surrogate
          size > index + 1 // there is a next code unit
    ) {
      second = string.charCodeAt(index + 1)
      if (second >= 0xDC00 && second <= 0xDFFF) { // low surrogate
        // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000
      }
    }
    return first
  }
}
