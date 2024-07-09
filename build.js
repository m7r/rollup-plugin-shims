#!/usr/bin/env node

import { parseArgs } from "argv-utils";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createShimFilter } from "./plugin/index.js";
import index from "./shims/index.js";

const option = parseArgs(process.argv);

if (
  option.help ||
  !option.output ||
  (option.ecmaversion && !Number.isInteger(Number(option.ecmaversion)))
) {
  console.log(
    `
Usage ${option.scriptPath} [--tests, --ecmaversion=, --output=]

Options:
--help         show usage
--tests        include tests in output
--output=      path to output file
--ecmaversion= Number of year 2015 to today. Skip shims not needed for this engine
`,
  );

  process.exit(option.help ? 0 : 1);
}

const load = (id) => readFileSync(join(index.root, id), "utf-8");
const noImports = (code) => String(code).replace(/^\/\/ import [^\n]+\n+/, "");
const shimFilter = createShimFilter(option.ecmaversion || 5);
const getDeepValues = (obj) =>
  typeof obj === "object" ? Object.values(obj).flatMap(getDeepValues) : obj;

const files = [
  ...new Set(
    getDeepValues({
      ...index.instanceMethods,
      ...index.staticMethods,
    }).filter(shimFilter),
  ),
];

files.unshift(index.common);

if (option.tests) {
  files.push(...files.map((shim) => `../tests/${shim}`));
}

const code = files.map(load).map(noImports).join("\n");
writeFileSync(option.output, `(function(){\n'use static'\n${code}\n}())`);
