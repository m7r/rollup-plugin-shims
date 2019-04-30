const fs = require('fs')
const path = require('path')
const plugin = require('./index')
const index = require('./shims')

const run = (skip, ...sources) => {
  const instance = plugin(skip)
  sources.forEach(instance.transform)
  return instance.intro()
}
const load = id => fs.readFileSync(path.join('shims', id), 'utf-8')
const ObjectValues = load(index.staticMethods.Object.values)
const padStart = load(index.instanceMethods.padStart)

describe('rollup-plugin-shims', () => {
  it('detects needed shims', () => {
    return expect(
      run(undefined, 'a.padStart(2)', 'Object.values(b).join()')
    ).to.eventually.equal(ObjectValues + padStart)
  })

  it('allow to skip shims by config', () => {
    return expect(
      run(['Object.values'], 'a.padStart(2) + Object.values(b).join()')
    ).to.eventually.equal(padStart)
  })

  it('allow to skip shims by comment too', () => {
    return expect(
      run(['Object.values'], '// hint', 'a.padStart(2)', 'Object.values(b).join()', '// shims skip padStart')
    ).to.eventually.equal('')
  })

  it('allow to skip shims by full name in comment', () => {
    return expect(
      run(['Object.values'], '// hint', 'a.padStart(2)', 'Object.values(b).join()', '// shims skip String.prototype.padStart')
    ).to.eventually.equal('')
  })

  it('ignore object buildin functions', () => {
    return expect(
      run(undefined, 'a.toString()')
    ).to.eventually.equal('')
  })
})
