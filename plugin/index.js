import { createFilter } from "@rollup/pluginutils";
import { join } from "node:path";
import { walk } from "estree-walker";
import MagicString from "magic-string";
import index from "../shims/index.js";

const name = "shims";
const version = "3.0.1";

const getProp = (obj, key) => (obj != null ? obj[key] : obj);
const get = (obj, ...args) => args.reduce(getProp, obj);
const toArray = (obj) => (Array.isArray(obj) ? obj : [obj]);
export const createShimFilter = (version) => {
  const env = `es${String(Number(version) + 1).padStart(4, "0")}`;
  return (shim) => shim > env;
};

/**
 * @param {ESTree.Program} ast
 * @returns {Array<string>}
 */
const getShims = (ast) => {
  const shim = new Set();

  walk(ast, {
    enter(node) {
      if (node.type == "MemberExpression")
        toArray(
          get(index, "staticMethods", node.object.name, node.property.name) ||
            get(index, "instanceMethods", node.property.name),
        ).forEach((path) => shim.add(path));
    },
  });

  return Array.from(shim.values());
};

/**
 * @param {Array<string>} shims
 */
const createImports = (shims) =>
  shims.map((shim) => `import "${join(index.root, shim)}";\n`).join("");

/**
 * @param {ESTree.Program} ast1
 * @param {ESTree.Program} ast2
 * @returns {ESTree.Programm}
 */
const mergeAst = (ast1, ast2) => {
  const offset = ast2.end;

  walk(ast1.body, {
    enter(node) {
      node.start += offset;
      node.end += offset;
    },
  });

  ast1.body.unshift(...ast2.body);
  ast1.end += offset;

  return ast1;
};

/**
 * @param {Object} options
 * @param {string | RegExp | Array<string|RegExp>} options.include picomatch pattern for files to process (Default all files)
 * @param {string | RegExp | Array<string|RegExp>} options.exclude picomatch pattern for files to ignore
 * @param {number} options.ecmaVersion ecma version of engine, only newer polyfills are included
 * @returns rollup plugin
 */
export default function (options = {}) {
  const filter = createFilter(options.include, options.exclude);
  const { ecmaVersion = 5 } = options;
  if (!Number.isInteger(ecmaVersion))
    throw new Error("Define ecmaVersion as number! (5 or 2015 to present)");
  const shimFilter = createShimFilter(ecmaVersion);
  const parseOptions = { allowReturnOutsideFunction: true };
  const common = join(index.root, index.common);

  return {
    name,
    version,
    transform: {
      order: "post",
      handler(code, id) {
        if (id === common)
          return {
            code: code.replace(/\n(var|function) /g, "\nexport $1 "),
            map: null,
          };

        if (id.startsWith(index.root)) {
          if (code.startsWith("// import")) {
            return { code: code.slice(3), map: null };
          } else {
            return null;
          }
        }

        if (!filter(id)) return null;

        const ast = this.parse(code, parseOptions);
        const shims = getShims(ast).filter(shimFilter);

        if (!shims.length) return null;

        const imports = createImports(shims);
        const str = new MagicString(code);
        str.prepend(imports);
        const { mappings } = str.generateMap({ hires: true });

        mergeAst(ast, this.parse(imports, parseOptions));

        return {
          code: str.toString(),
          map: { mappings },
          ast,
        };
      },
    },
  };
}
