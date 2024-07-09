import plugin from "./index.js";
import index from "../shims/index.js";
import { parse } from "acorn";
import { resolve } from "node:path";
import { test } from "node:test";
import { equal, deepEqual } from "node:assert/strict";

const fakeRollup = {
  parse: (code, opts) =>
    parse(code, { ecmaVersion: 2023, sourceType: "module", ...opts }),
};

const id = resolve("src/index.js");
const code = 'String(4).padStart(3, "0")';
const modified = `import "${index.root}/es2015/string-repeat.js";\nimport "${index.root}/es2017/string-pad-start.js";\n${code}`;
const map = {
  mappings:
    ";;AAAA,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC",
};
const ast = fakeRollup.parse(modified, { allowReturnOutsideFunction: true });

test("detect shim default settings", () => {
  const instance = plugin();
  const result = instance.transform.handler.call(fakeRollup, code, id);
  deepEqual({ code: result.code, map: result.map }, { code: modified, map });
  // compare only some ast properties, deepEqual fails here
  equal(result.ast.start, ast.start);
  equal(result.ast.end, ast.end);
  equal(result.ast.body.at(1).raw, ast.body.at(1).raw);
  equal(result.ast.body.at(2).raw, ast.body.at(2).raw);
  equal(result.ast.body.at(2).start, ast.body.at(2).start);
  equal(result.ast.body.at(-1).end, ast.body.at(-1).end);
});

test("detect shim for es2015", () => {
  const instance = plugin({ ecmaVersion: 2015 });
  const result = instance.transform.handler.call(fakeRollup, code, id);
  deepEqual(result.code, modified.replace(/^[^\n]+\n/, ""));
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
