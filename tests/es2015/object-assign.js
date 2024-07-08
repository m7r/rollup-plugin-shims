assert(
  JSON.stringify(Object.assign({ a: 1 }, { a: 2, b: 3 }, { c: 4 })) ===
    '{"a":2,"b":3,"c":4}',
  "Object.assign"
);
