const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const { parse } = require('acorn')
const { simple } = require('acorn-walk')
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
const extract = (regExp) => (accum, comment) => {
  const match = comment.value.match(regExp)
  return match ? accum.concat(...match[1].split(' ')) : accum
}
const exclude = (skipped) =>
  (name) => typeof name === 'string' && !skipped.some((id) => name.includes(id))
const getFrom = (items) => (id) => items.find((name) => name.includes(id))
const needsCommon = (key) => index.needsCommon[key]
const readFile = promisify(fs.readFile)
const read = (file) =>
  readFile(path.join(__dirname, 'shims', file), 'utf-8')

/**
 * Prepend bundle with shims for used functions
 * @param {string[]?} skip Omit shim for this methods
 */
module.exports = function ({ skip = [], add = [] } = {}) {
  const shim = new Set()
  const addShim = shim.add.bind(shim)
  const comments = []

  return {
    /**
     * Detect used methods, source remains unchanged
     * @param {string} source
     * @return {null}
     */
    transform (source) {
      simple(
        parse(source, { sourceType: 'module', ecmaVersion: 9, onComment: comments }),
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
    intro () {
      comments.reduce(extract(/shims add (.+)/), add).map(toId).map((getFrom(index.files))).forEach(addShim)
      const skipped = comments.reduce(extract(/shims skip (.+)/), skip).map(toId)
      const shims = Array.from(shim.values())
        .filter(exclude(skipped))
        .sort()
      if (shims.some(needsCommon)) shims.unshift(index.common)
      return Promise.all(shims.map(read)).then(wrap)
    }
  }
}
