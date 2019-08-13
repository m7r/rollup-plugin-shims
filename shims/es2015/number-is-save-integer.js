if (!Number.isSafeInteger) {
  Number.isSafeInteger = function isSafeInteger (value) {
    return Number.isInteger(value) &&
      Math.abs(value) <= Number.MAX_SAFE_INTEGER
  }
}
