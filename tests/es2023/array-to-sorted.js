var sortInput = [3, 1, 2];
assert.deepEqual(sortInput.toSorted(), [1, 2, 3], "Array.prototype.toSorted");
assert.deepEqual(
  sortInput.toSorted(function (a, b) {
    return b - a;
  }),
  [3, 2, 1],
  "Array.prototype.toSorted with function"
);
assert(
  sortInput.toSorted() != sortInput,
  "Array.prototype.toSorted return copy"
);
