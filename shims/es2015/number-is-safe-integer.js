if (!Number.isSafeInteger) {
  Number.isSafeInteger = function isSafeInteger (value) {
    return Number.isInteger(value) &&
      Math.abs(value) <= MAX_SAFE_INTEGER
  }
}
