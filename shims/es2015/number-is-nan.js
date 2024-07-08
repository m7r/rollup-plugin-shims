if (!Number.isNaN) {
  Number.isNaN = function isNaN(value) {
    return value !== value;
  };
}
