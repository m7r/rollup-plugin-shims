assert(Object.hasOwn({ a: 1 }, "a") === true, 'Object.is({a: 1}, "a")');

assert(Object.hasOwn({}, "toString") === false, 'Object.is({}, "toString")');
