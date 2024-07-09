export default {
  experimentalTernaries: true,
  overrides: [
    {
      files: ["shims/common.js", "shims/es*/*.js", "tests/**/*.js"],
      options: { trailingComma: "es5" },
    },
  ],
};
