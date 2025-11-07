// common methods
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
var toStr = Object.prototype.toString;
var has = Object.prototype.hasOwnProperty;
var enumerable = Object.prototype.propertyIsEnumerable;

function callable(fn) {
  return typeof fn === "function" || toStr.call(fn) === "[object Function]";
}

function coerceObject(obj) {
  if (obj == null) throw new TypeError(obj + " is not an object");
  return Object(obj);
}

function toLength(len) {
  return len > MAX_SAFE_INTEGER ? MAX_SAFE_INTEGER : len | 0;
}

function toIntegerOrInfinity(value) {
  var number = Number(value);
  if (isNaN(number) || number === 0) {
    return 0;
  }
  if (!isFinite(number)) {
    return number;
  }
  return number < 0 ? -Math.floor(-number) : Math.floor(number);
}
