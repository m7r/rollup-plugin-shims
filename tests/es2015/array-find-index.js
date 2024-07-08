assert(
  [2, 3, 4].findIndex(function (v, i) {
    return v % this;
  }, 2) === 1,
  "Array.prototype.findIndex"
);
