const pluginJs = require("@eslint/js");
const globals = require("globals");

module.exports = [
  pluginJs.configs.recommended,
  {
    files: ["plugin/**.js", "shims/index.js", "build.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ["shims/common.js", "tests/common.js"],
    languageOptions: {
      ecmaVersion: 5,
      sourceType: "script",
      globals: {
        console: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "off",
    },
  },
  {
    files: ["shims/es*/**.js", "tests/es*/**.js"],
    languageOptions: {
      ecmaVersion: 5,
      sourceType: "script",
      globals: {
        has: "readonly",
        enumerable: "readonly",
        callable: "readonly",
        coerceObject: "readonly",
        toLength: "readonly",
        toStr: "readonly",
        MAX_SAFE_INTEGER: "readonly",
        assert: "writable",
        noProto: "writable",
      },
    },
  },
];
