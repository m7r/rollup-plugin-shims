if (!String.prototype.matchAll) {
  String.prototype.matchAll = function (regExp) {
    var O = coerceObject(this)
    var matches = []
    var match

    if (toStr.call(regExp) === '[object RegExp]') {
      if (!regExp.global) {
        throw new TypeError('matchAll requires a global regular expression')
      }
    } else {
      regExp = new RegExp(regExp, 'g')
    }

    while ((match = regExp.exec(O)) !== null) {
      matches.push(match)
    }

    return matches
  }
}
