assert(
  [2, 3, 4, 5].findLastIndex(function (v) {
    return v % this;
  }, 2) === 3,
  "Array.prototype.findLastIndex"
);
