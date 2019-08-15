const fs = require('fs')
const glob = require('glob')

const load = id => fs.readFileSync(id, 'utf-8')
const polyfills = glob.sync('shims/**/*.js').sort().slice(0, -1)
const tests = glob.sync('tests/**/*.js').sort()
const code = polyfills.concat(tests).map(load).join('\n')

console.log(`(function(){\n'use static'\n${code}\n}())`)
