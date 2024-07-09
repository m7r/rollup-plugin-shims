import pluginJs from "@eslint/js";
import globals from "globals";

export default [
  pluginJs.configs.recommended,
  {
    files: ["plugin/*.js", "shims/index.js", "build.js", "*.config.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ["shims/common.js", "tests/common.js", "test.js"],
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
        toIntegerOrInfinity: "readonly",
        MAX_SAFE_INTEGER: "readonly",
        assert: "writable",
        noProto: "writable",
      },
    },
  },
];
