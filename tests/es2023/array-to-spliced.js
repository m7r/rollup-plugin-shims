var spliceInput = [2, 3];
assert.deepEqual(
  spliceInput.toSpliced(1, 1, 4, 6),
  [2, 4, 6],
  "Array.prototype.toSpliced"
);
assert(
  spliceInput.toSpliced(1, 1, 4, 6) != spliceInput,
  "Array.prototype.toSpliced return copy"
);
