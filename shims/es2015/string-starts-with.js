if (!String.prototype.startsWith) {
  String.prototype.startsWith = function startsWith (searchString, position) {
    return this.substr(position || 0, searchString.length) === searchString
  }
}
