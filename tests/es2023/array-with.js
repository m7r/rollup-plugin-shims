var withInput = [2, 3, 4, 5];
assert.deepEqual(withInput.with(2, 7), [2, 3, 7, 5], "Array.prototype.with");
assert(withInput.with(2, 7) != withInput, "Array.prototype.with return copy");
