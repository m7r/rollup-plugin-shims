assert(
  [2, 3, 4].find(function (v, i) { return v % this }, 2) === 3,
  'Array.prototype.find'
)
