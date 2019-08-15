if (!String.prototype.startsWith) {
  String.prototype.startsWith = function startsWith (searchString /*, position */) {
    var position = arguments[1] | 0
    return this.substr(position, searchString.length) === searchString
  }
}
