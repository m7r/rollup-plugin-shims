assert.deepEqual(
  Object.groupBy(
    [
      { a: 1, b: 1 },
      { a: 2, b: 2 },
      { a: 1, b: 3 },
    ],
    function (value) {
      return value.a;
    }
  ),
  {
    1: [
      { a: 1, b: 1 },
      { a: 1, b: 3 },
    ],
    2: [{ a: 2, b: 2 }],
  },
  "Object.groupBy()"
);
