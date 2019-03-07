const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const { parse } = require('acorn')
const { simple } = require('acorn-walk')
const index = require('./shims/index.js')

const flatten = (arr) => Array.prototype.concat(...arr)
const getProp = (obj, key) => obj != null ? obj[key] : obj
const get = (obj, ...args) => args.reduce(getProp, obj)
const join = (arr) => arr.join('')
const toId = (str) => String(str)
  .replace(/NaN/g, 'nan')
  .replace(/(.prototype.|[._])/g, '-')
  .replace(/(.)([A-Z])/g, '$1-$2')
  .toLowerCase()
const extractId = (accum, comment) => {
  const match = comment.value.match(/shims skip (.+)/)
  return match ? accum.concat(...match[1].split(' ').map(toId)) : accum
}
const isIncluded = (skip) =>
  (name) => name && !skip.some((id) => name.includes(id))
const readFile = promisify(fs.readFile)
const read = (file) =>
  readFile(path.join(__dirname, 'shims', file), 'utf-8')

/**
 * Prepend bundle with shims for used functions
 * @param {string[]?} skip Omit shim for this methods
 */
module.exports = function (skip = []) {
  const shim = new Set()
  const skipedIds = skip.map(toId)
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
          shim.add(
            get(index, 'staticMethods', node.object.name, node.property.name) ||
            get(index, 'instanceMethods', node.property.name)
          )
        } }
      )
      return null
    },
    /**
     * Load shims and prepend to bundle
     * @returns {Promise<string>}
     */
    intro () {
      const skip = comments.reduce(extractId, skipedIds)
      return Promise.all(
        flatten(shim.values())
          .filter(isIncluded(skip))
          .sort()
          .map(read)
      ).then(join)
    }
  }
}
