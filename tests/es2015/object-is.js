assert(Object.is("foo", "foo") === true, 'Object.is("foo", "foo")');

assert(Object.is(Number, Number) === true, "Object.is(Number, Number)");

assert(!Object.is(Number, Date), "Object.is(Number, Date)");

assert(!Object.is(0, -0), "Object.is(0, -0)");

assert(Object.is(NaN, 0 / 0), "Object.is(0, 0/0)");
