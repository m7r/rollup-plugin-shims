assert(
  [2, 3, 4].findIndex(function (v) {
    return v % this;
  }, 2) === 1,
  "Array.prototype.findIndex"
);
