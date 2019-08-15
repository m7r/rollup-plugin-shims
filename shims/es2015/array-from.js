if (!Array.from) {
  Array.from = function from (arrayLike/* , mapFn, thisArg */) {
    // 1. Let C be the this value.
    var C = this

    // 2 + 3. Let items be ToObject(arrayLike).
    var items = coerceObject(arrayLike)

    // 4. If mapfn is undefined, then let mapping be false.
    var mapFn = arguments.length > 1 ? arguments[1] : void undefined
    var T
    if (typeof mapFn !== 'undefined') {
      // 5. else
      // 5. a If callable(mapfn) is false, throw a TypeError exception.
      if (!callable(mapFn)) {
        throw new TypeError('Array.from: when provided, the second argument must be a function')
      }

      // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
      if (arguments.length > 2) {
        T = arguments[2]
      }
    }

    // 10. let lenValue be Get(items, "length").
    // 11. let len be ToLength(lenValue).
    var len = toLength(items.length)

    // 13. If IsConstructor(C) is true, then
    // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
    // 14. a. Else, Let A be ArrayCreate(len).
    var A = callable(C) ? Object(new C(len)) : new Array(len)

    // 16. Let k be 0.
    var k = 0
    // 17. Repeat, while k < len… (also steps a - h)
    var kValue
    while (k < len) {
      kValue = items[k]
      if (mapFn) {
        A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k)
      } else {
        A[k] = kValue
      }
      k += 1
    }
    // 18. Let putStatus be Put(A, "length", len, true).
    A.length = len
    // 20. Return A.
    return A
  }
}
