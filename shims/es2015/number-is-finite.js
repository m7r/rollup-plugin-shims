if (!Number.isFinite) {
  Number.isFinite = function isFinite (value) {
    return typeof value === 'number' && isFinite(value)
  }
}
