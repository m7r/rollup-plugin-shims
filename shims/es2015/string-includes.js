if (!String.prototype.includes) {
  String.prototype.includes = function includes (search /*, start */) {
    var start = arguments[1]
    if (typeof start !== 'number') {
      start = 0
    }
    if (start + search.length > this.length) {
      return false
    } else {
      return this.indexOf(search, start) !== -1
    }
  }
}
