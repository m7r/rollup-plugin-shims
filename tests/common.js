/* eslint-disable  no-unused-vars */
var noProto = Object.create(null);
noProto.a = 1;

function deepEqual(a, b) {
  if (a !== null && typeof a === "object") {
    return Object.keys(a).every(function (key) {
      return deepEqual(a[key], b[key]);
    });
  }
  return a === b;
}

function assert(bool /*, msg */) {
  var msg = arguments[1] || "Got a falsy value";
  if (!bool) console.log("Error: " + msg);
}

assert.deepEqual = function (a, b, msg) {
  assert(deepEqual(a, b), msg || "Items are not equal");
};

assert.throws = function (fn, error, msg) {
  try {
    fn();
    assert(false, (msg || "Function") + " should throw an error");
  } catch (e) {
    assert(
      e instanceof error,
      (msg || "Function") + " should throw an " + error.name
    );
  }
};
