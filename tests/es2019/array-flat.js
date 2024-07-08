assert(
  JSON.stringify([1, 2, 3, [4, 5, [1, 2]]].flat()) === "[1,2,3,4,5,[1,2]]",
  "Array.prototype.flat()"
);

assert(
  JSON.stringify([1, 2, 3, [4, 5, [1, 2]]].flat(2)) === "[1,2,3,4,5,1,2]",
  "Array.prototype.flat(2)"
);

assert(
  JSON.stringify(
    [1, 2, 3, [4, 5]].flatMap(function (v) {
      return Array.isArray(v) ? v : v + this;
    }, 1)
  ) === "[2,3,4,4,5]",
  "Array.prototype.flatMap"
);
