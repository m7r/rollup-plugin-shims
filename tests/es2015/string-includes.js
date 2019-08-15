assert(
  'ABC'.includes('B'),
  'String.prototype.includes("B")'
)

assert(
  ! 'ABC'.includes('B', 2),
  'String.prototype.includes("B", 2)'
)
