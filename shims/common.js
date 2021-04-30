/* eslint-disable  no-unused-vars */
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1
var toStr = Object.prototype.toString
var has = Object.prototype.hasOwnProperty
var enumerable = Object.prototype.propertyIsEnumerable

function callable (fn) {
  return typeof fn === 'function' || toStr.call(fn) === '[object Function]'
}

function coerceObject (obj) {
  if (obj == null) throw new TypeError('Cannot convert undefined or null to object')
  return Object(obj)
}

function toLength (len) {
  return len > MAX_SAFE_INTEGER ? MAX_SAFE_INTEGER : len | 0
}
