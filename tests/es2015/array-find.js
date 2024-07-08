assert(
  [2, 3, 4].find(function (v) {
    return v % this;
  }, 2) === 3,
  "Array.prototype.find"
);
