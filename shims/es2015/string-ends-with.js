if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (searchStr, position) {
    // This works much better than >= because
    // it compensates for NaN:
    if (!(position < this.length)) {
      position = this.length
    } else {
      position |= 0
    } // round position
    return this.substr(
      position - searchStr.length,
      searchStr.length
    ) === searchStr
  };
}
