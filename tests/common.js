/* eslint-disable  no-unused-vars */
var noProto = Object.create(null)
noProto.a = 1

function assert (bool /*, msg */) {
  var msg = arguments[1] || 'The expression evaluated to a falsy value'
  if (!bool) console.log('Error: ' + msg)
}
