assert(
  ["a", "b", "c", "d", "e"].copyWithin(1, 3).join() === "a,d,e,d,e",
  "Array.prototype.copyWithin(1, 3)"
);

assert(
  ["a", "b", "c", "d", "e"].copyWithin(0, 3, 4).join() === "d,b,c,d,e",
  "Array.prototype.copyWithin(0, 3, 4)"
);
