module.exports = wallaby => {
  const register = (...modules) => modules
    .map(id => '-r ' + require.resolve(id))
    .join(' ')

  wallaby.defaults.files.load = false
  wallaby.defaults.files.instrument = false

  return {
    files: [
      { pattern: 'index.js', instrument: true },
      'shims/*.js',
      'shims/**/*.js',
      'package.json',
      '!*.spec.js'
    ],

    tests: [
      '*.spec.js'
    ],

    testFramework: 'mocha',

    env: {
      type: 'node',
      params: {
        runner: register('chai/register-expect', 'chai-autoload-plugins')
      }
    }
  }
}
