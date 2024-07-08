assert(JSON.stringify(Object.values({ a: 1 })) === "[1]", "Object.values");

assert(
  JSON.stringify(Object.values(noProto)) === "[1]",
  "Object.values no Prototype"
);
