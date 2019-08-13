if (!Array.prototype.flat || !Array.prototype.flatMap) {
  (function () {
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1

    function FlattenIntoArray (target, source, sourceLen, start, depth, mapperFunction, mapperThis) {
      var targetIndex = start
      var sourceIndex = 0

      while (sourceIndex < sourceLen) {
        var P = String(sourceIndex)
        var exists = source !== null && P in source
        if (exists) {
          var element = source[P]
          if (typeof mapperFunction !== 'undefined') {
            if (arguments.length <= 6) {
              throw new TypeError('Assertion failed: thisArg is required when mapperFunction is provided')
            }
            element = mapperFunction.call(mapperThis, element, sourceIndex, source)
          }
          var shouldFlatten = false
          if (depth > 0) {
            shouldFlatten = Array.isArray(element)
          }
          if (shouldFlatten) {
            var elementLen = toLength(element.length)
            targetIndex = FlattenIntoArray(target, element, elementLen, targetIndex, depth - 1)
          } else {
            if (targetIndex >= MAX_SAFE_INTEGER) {
              throw new TypeError('index too large')
            }
            target[targetIndex] = element
            targetIndex += 1
          }
        }
        sourceIndex += 1
      }

      return targetIndex
    }

    function toLength (len) {
      return len > MAX_SAFE_INTEGER ? MAX_SAFE_INTEGER : len
    }

    Array.prototype.flat = function flat () {
      var O = Object(this)
      var sourceLen = toLength(O.length)

      var depthNum = 1
      if (arguments.length > 0 && typeof arguments[0] !== 'undefined') {
        depthNum = Number(arguments[0])
      }

      var A = []
      FlattenIntoArray(A, O, sourceLen, 0, depthNum)
      return A
    }

    Array.prototype.flatMap = function flatMap (callbackfn) {
      var O = Object(this)
      var sourceLen = toLength(O.length)

      if (typeof callbackfn !== 'function') {
        throw new TypeError('callback must be a function')
      }

      var T
      if (arguments.length > 1) {
        T = arguments[1]
      }

      var A = []
      FlattenIntoArray(A, O, sourceLen, 0, 1, callbackfn, T)
      return A
    }
  })()
}
