var reverseInput = [2, 3, 4, 5];
assert.deepEqual(
  reverseInput.toReversed(),
  [5, 4, 3, 2],
  "Array.prototype.toReversed"
);
assert(
  reverseInput.toReversed() != reverseInput,
  "Array.prototype.toReversed return copy"
);
