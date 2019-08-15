if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart (targetLength/*, padString */) {
    // floor if number or convert non-number to 0;
    targetLength = targetLength >> 0
    var padString = String(arguments[1])
    if (padString === 'undefined') padString = ' '
    if (this.length > targetLength) {
      return String(this)
    } else {
      targetLength = targetLength - this.length
      if (targetLength > padString.length) {
        // append to original to ensure we are longer than needed
        padString += padString.repeat(targetLength / padString.length)
      }
      return padString.slice(0, targetLength) + String(this)
    }
  }
}
