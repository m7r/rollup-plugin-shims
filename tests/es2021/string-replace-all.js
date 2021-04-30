assert(
  'aba'.replaceAll('a', '_') === '_b_',
  'String.prototype.replaceAll("a", "_")'
)

assert(
  'xxx'.replaceAll('', '_') === '_x_x_x_',
  'String.prototype.replaceAll("", "_")'
)

assert(
  'aba'.replaceAll('b') === 'aundefineda',
  'String.prototype.replaceAll("b")'
)

assert(
  'b.b.b.b.b'.replaceAll(/\./g, 'a') === 'babababab',
  'String.prototype.replaceAll(/\\./g, "a")'
)

assert.throws(
  function () {
    'b.b.b.b.b'.replaceAll(/\./, 'a')
  },
  TypeError,
  'String.prototype.replaceAll(/\\./, "a")'
)
