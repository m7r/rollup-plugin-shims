assert.deepEqual(
  Array.from('1111a2b3cccc'.matchAll('1a')),
  [{ 0: '1a', index: 3, input: '1111a2b3cccc', groups: undefined }],
  'String.prototype.matchAll(string)'
)

assert.deepEqual(
  Array.from('1111a2b3cccc'.matchAll(/(\d)(\D)/g)),
  [
    { 0: '1a', 1: '1', 2: 'a', index: 3, input: '1111a2b3cccc', groups: undefined },
    { 0: '2b', 1: '2', 2: 'b', index: 5, input: '1111a2b3cccc', groups: undefined },
    { 0: '3c', 1: '3', 2: 'c', index: 7, input: '1111a2b3cccc', groups: undefined }
  ],
  'String.prototype.matchAll(regExp)'
)

assert.throws(
  function () { '1111a2b3cccc'.matchAll(/(\d)(\D)/) },
  TypeError,
  'String.prototype.matchAll(/.+/)'
)
