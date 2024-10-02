import plugin from "./index.js";
import index from "../shims/index.js";
import { parse } from "acorn";
import { resolve } from "node:path";
import { test } from "node:test";
import { equal, deepEqual } from "node:assert/strict";

const code = 'Number(12).toString(16).padStart(2, "0");';
const mappings =
  ";;AAAA,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC";
const import2015 = `import "${index.root}/es2015/string-repeat.js";\n`;
const import2017 = `import "${index.root}/es2017/string-pad-start.js";\n`;
const parseOptions = { allowReturnOutsideFunction: true };
const id = resolve("src/index.js");

const fakeRollup = {
  parse: (code, opts) =>
    parse(code, { ecmaVersion: 2023, sourceType: "module", ...opts }),
};

test("detect shim default settings", () => {
  const instance = plugin();
  const result = instance.transform.handler.call(fakeRollup, code, id);
  const modified = import2015 + import2017 + code;
  const ast = fakeRollup.parse(modified, parseOptions);
  deepEqual(result, { code: modified, map: { mappings }, ast });
});

test("detect shim for es2015", () => {
  const instance = plugin({ ecmaVersion: 2015 });
  const result = instance.transform.handler.call(fakeRollup, code, id);
  const modified = import2017 + code;
  const ast = fakeRollup.parse(modified, parseOptions);
  deepEqual(result, { code: modified, map: { mappings }, ast });
});

test("ignore shim if environment is newer", () => {
  const instance = plugin({ ecmaVersion: 2020 });
  const result = instance.transform.handler.call(fakeRollup, code, id);
  equal(result, null);
});

test("ignore shim if source file is excluded", () => {
  const instance = plugin({ exclude: "src/index.js" });
  const result = instance.transform.handler.call(fakeRollup, code, id);
  equal(result, null);
});
