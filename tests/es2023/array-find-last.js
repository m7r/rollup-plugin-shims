assert(
  [2, 3, 4, 5].findLast(function (v) {
    return v % this;
  }, 2) === 5,
  "Array.prototype.findLast"
);
