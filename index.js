const fs = require('fs')
const path = require('path')
const walk = require('acorn-walk')
const index = require('./shims/index.js')

const getProp = (obj, key) => obj != null ? obj[key] : obj
const get = (obj, ...args) => args.reduce(getProp, obj)
const toArray = (obj) => Array.isArray(obj) ? obj : [obj]
const wrap = (arr) => arr.length
  ? `(function(){\n${arr.join('\n')}\n}())\n`
  : ''
const toId = (str) => String(str)
  .replace(/NaN/g, 'nan')
  .replace(/(.prototype.|[._])/g, '-')
  .replace(/(.)([A-Z])/g, '$1-$2')
  .toLowerCase()
const exclude = (skipped) =>
  (name) => typeof name === 'string' && !skipped.some((id) => name.includes(id))
const getFrom = (items) => (id) => items.find((name) => name.includes(id))
const needsCommon = (key) => index.needsCommon[key]
const read = (file) =>
  fs.promises.readFile(path.join(__dirname, 'shims', file), 'utf-8')
const write = (file, text) =>
  fs.promises.writeFile(file, text, 'utf-8')

/**
 * Prepend bundle with shims for used functions
 * @param {string[]?} skip Omit shim for this methods
 */
module.exports = function ({ skip = [], add = [], output = null, prepend = !output } = {}) {
  const shim = new Set()
  const addShim = shim.add.bind(shim)

  return {
    /**
     * Detect used methods, source remains unchanged
     * @param {ModuleInfo} moduleInfo
     * @return {null}
     */
    moduleParsed (moduleInfo) {
      walk.simple(
        moduleInfo.ast,
        { MemberExpression (node) {
          toArray(
            get(index, 'staticMethods', node.object.name, node.property.name) ||
            get(index, 'instanceMethods', node.property.name)
          ).forEach(addShim)
        } }
      )
      return null
    },
    /**
     * Load shims and prepend to bundle
     * @returns {Promise<string>}
     */
    async intro () {
      add.map(toId).map((getFrom(index.files))).forEach(addShim)
      const shims = Array.from(shim.values())
        .filter(exclude(skip.map(toId)))
        .sort()
      if (shims.some(needsCommon)) shims.unshift(index.common)
      const code = wrap(await Promise.all(shims.map(read)))
      if (output) await write(output, code)
      return prepend ? code : null
    }
  }
}
