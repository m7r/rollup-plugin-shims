if (!String.prototype.endsWith) {
  String.prototype.endsWith = function endsWith(searchStr /*, position */) {
    var position = arguments[1];
    if (!(position < this.length)) {
      position = this.length;
    } else {
      position |= 0;
    }
    return (
      this.substr(position - searchStr.length, searchStr.length) === searchStr
    );
  };
}
