if (!String.prototype.endsWith) {
  String.prototype.endsWith = function endsWith(searchStr /*, position */) {
    var start = arguments[1];
    if (!(start < this.length)) {
      start = this.length;
    } else {
      start |= 0;
    }
    start -= searchStr.length;
    return this.slice(start, start + searchStr.length) === searchStr;
  };
}
