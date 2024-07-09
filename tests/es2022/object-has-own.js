assert(Object.hasOwn({ a: 1 }, "a") === true, 'Object.hasOwn({a: 1}, "a")');

assert(
  Object.hasOwn({}, "toString") === false,
  'Object.hasOwn({}, "toString")'
);
