if (!String.prototype.startsWith) {
  String.prototype.startsWith = function startsWith(
    searchString /*, position */
  ) {
    var start = arguments[1] | 0;
    return this.slice(start, start + searchString.length) === searchString;
  };
}
