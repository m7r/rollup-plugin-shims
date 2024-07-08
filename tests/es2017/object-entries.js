assert(
  JSON.stringify(Object.entries({ a: 1 })) === '[["a",1]]',
  "Object.entries"
);

assert(
  JSON.stringify(Object.entries(noProto)) === '[["a",1]]',
  "Object.entries no Prototype"
);
