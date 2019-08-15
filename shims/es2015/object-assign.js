if (!Object.assign) {
  Object.assign = function assign (target) {
    target = coerceObject(target)
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index]
      if (source != null) {
        for (var key in source) {
          if (has.call(source, key)) {
            target[key] = source[key]
          }
        }
      }
    }
    return target
  }
}
