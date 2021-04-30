const fs = require('fs')
const path = require('path')
const plugin = require('./index')
const index = require('./shims')
const { parse } = require('acorn')

const prepare = (moduleParsed) => (source) => {
  const ast = parse(source, { sourceType: 'module', ecmaVersion: 9 })
  return moduleParsed({ ast })
}

const run = async (option, ...sources) => {
  const instance = plugin(option)
  const parts = sources.map(prepare(instance.moduleParsed))
  const intro = instance.intro()
  intro.parts = parts
  return intro
}
const load = id => fs.readFileSync(path.join('shims', id), 'utf-8')
const common = load(index.common)
const ObjectValues = load(index.staticMethods.Object.values)
const padStart = load(index.instanceMethods.padStart)
const wrap = (...args) => `(function(){\n${args.join('\n')}\n}())\n`

describe('rollup-plugin-shims', () => {
  it('detects needed shims', () => {
    return expect(
      run({}, 'a.padStart(2)', 'Object.values(b).join()')
    ).to.eventually.equal(wrap(common, ObjectValues, padStart))
  })

  it('allow to add shims by config', () => {
    return expect(
      run({ add: ['Object.values'] }, '1 + 1')
    ).to.eventually.equal(wrap(common, ObjectValues))
  })

  it('allow to skip shims by config', () => {
    return expect(
      run({ skip: ['Object.values'] }, 'a.padStart(2) + Object.values(b).join()')
    ).to.eventually.equal(wrap(padStart))
  })

  it('ignore object buildin functions', () => {
    return expect(
      run(undefined, 'a.toString()')
    ).to.eventually.equal('')
  })
})
