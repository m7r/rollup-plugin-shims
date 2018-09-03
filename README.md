# Rollup Plugin Shims

Add shims to use some ES2015+ methods in a ES5 environment

### Installation

```shell
npm install --save-dev rollup-plugin-shims
```

### Usage

```js
// rollup.config.js
import shims from 'rollup-plugin-shims';

export default {
  input: 'main.js',
  output: {
    file: 'bundle.js',
    format: 'iife',
    name: 'MyModule'
  },
  plugins: [
    shims(
      // optional array shims to skip
      // for example to exclude a not required instance method
      ['array.includes']
    )
  ]
}
```

### Not included shims

Some funtions could only shimed partial. This ones are not included in this plugin.
Please consider to use a more profound soltution like core-js.

#### ES2015

  - Promise
  - Symbol
  - Reflect
  - Proxy
  - Map / WeakMap
  - Set / WeakSet
  - Array.prototype.keys()
  - Array.prototype.values()
  - Array.prototype.entries()
  - String.prototype.anchor() and other HTML generators

#### ES2017
  
  - Object.getOwnPropertyDescriptors()

### License
MIT