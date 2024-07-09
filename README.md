# Rollup Plugin Shims

Add shims to use some ES2015+ methods in a ES5 environment

## Version 2 breaking changes

- options are passed as object
- comments are no longer supported to skip individual shims

### Installation

```shell
npm install --save-dev rollup-plugin-shims
```

### Usage

```js
// rollup.config.js
import shims from "rollup-plugin-shims";

export default {
  input: "main.js",
  output: {
    file: "bundle.js",
    format: "iife",
    name: "MyModule",
  },
  plugins: [
    shims(
      // optional config
      {
        skip: ["array.includes"], // optional: exclude a not required instance method
        add: ["string.replaceAll"], // optional: add a method even if not used in code
        output: "dist/shim.js", // optional: write shims to separate file [Default: null]
        prepend: true, // optional: prepend shims to rollup output [Default: !output]
      },
    ),
  ],
};
```

### Not included shims

Some funtions could only shimed partial. This ones are not included in this plugin.
Please consider to use a more profound soltution like core-js.

#### ES2015

- Promise
- Symbol
- Reflect
- Proxy
- Class
- Map / WeakMap
- Set / WeakSet
- Array.prototype.keys()
- Array.prototype.values()
- Array.prototype.entries()
- String.prototype.anchor() and other HTML generators

#### ES2017

- Object.getOwnPropertyDescriptors()

#### ES2020

- import()
- BigInt
- globalThis

#### ES2022

- RegExp /d
- error.cause

### ES2024

- Temporal

### License

MIT
