# Rollup Plugin Shims

Add shims to use some ES2015+ methods in a ES5+ environment

## Version 3

### new features

- option to skip older shims
- added support for rollup 3 and 4
- support for multi entry

### breaking changes

- only support for es module syntax in rollup.config.js
- output is handled completly by rollup
- skip and add shims option is removed.

## Version 2

### breaking changes

- options are passed as object
- comments are no longer supported to skip individual shims

## Installation

```shell
npm install --save-dev rollup-plugin-shims
```

## Usage

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
        ecmaVersion: 2017, // version supported by the engine, older shims are skipped
        include: [], // define wich files should be processed, Default all files.
        exclude: [], // files excluded from parsing
      },
    ),
  ],
};
```

or create a file for your engine with the cli

```shell
npx build-shim --ecmaversion=2017 --output=shim.js
```

for all options run `npx build-shim --help`

## Not included shims

Some funtions could only shimed partial. This ones are not included in this plugin.
Please consider to use a more profound soltution like core-js.

### ES2015

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

### ES2017

- Object.getOwnPropertyDescriptors()

### ES2020

- import()
- BigInt
- globalThis

### ES2022

- RegExp /d
- error.cause

### ES2024

- Temporal

## License

MIT
