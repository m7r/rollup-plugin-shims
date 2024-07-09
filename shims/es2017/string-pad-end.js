if (!String.prototype.padEnd) {
  String.prototype.padEnd = function padEnd(targetLength /*, padString */) {
    targetLength = targetLength >> 0;
    var padString = String(arguments[1]);
    if (padString === "undefined") padString = " ";
    if (this.length > targetLength) {
      return String(this);
    } else {
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length);
      }
      return String(this) + padString.slice(0, targetLength);
    }
  };
}
