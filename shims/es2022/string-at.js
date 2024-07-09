if (!String.prototype.at) {
  String.prototype.at = function at(index) {
    var S = String(coerceObject(this));
    var len = S.length;
    var relativeIndex = index >> 0;
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return k < 0 || k >= len ? undefined : S.charAt(k);
  };
}
