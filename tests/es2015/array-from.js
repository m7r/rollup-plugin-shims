assert(Array.from({ 0: 1, 1: 2, length: 2 }).join() === "1,2", "Array.from");

assert(
  Array.from(
    { 0: 1, 1: 2, length: 2 },
    function (v) {
      return v + this;
    },
    2
  ).join() === "3,4",
  "Array.from with map function"
);
