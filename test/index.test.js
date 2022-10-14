const { rollup } = require("rollup");
const { terser } = require("../dist/index");

test("works with code splitting", async () => {
  const bundle = await rollup({
    input: ["test/fixtures/chunk-1.js", "test/fixtures/chunk-2.js"],
    plugins: [terser()],
  });
  const { output } = await bundle.generate({ format: "esm" });
  const newOutput = {};
  output.forEach((out) => {
    // TODO rewrite with object rest after node 6 dropping
    const value = Object.assign({}, out);
    delete value.modules;
    delete value.facadeModuleId;
    newOutput[out.fileName] = value;
  });
  expect(newOutput).toMatchSnapshot();
});

test("allow to pass not string values to worker", async () => {
  const bundle = await rollup({
    input: "test/fixtures/unminified.js",
    plugins: [terser({ mangle: { properties: { regex: /^_/ } } })],
  });
  const result = await bundle.generate({ format: "cjs" });
  expect(result.output).toHaveLength(1);
  const [output] = result.output;
  expect(output.code).toEqual(
    '"use strict";window.a=5,window.a<3&&console.log(4);\n'
  );
});

test("allow classic function definitions passing to worker", async () => {
  const bundle = await rollup({
    input: "test/fixtures/commented.js",
    plugins: [
      terser({
        mangle: { properties: { regex: /^_/ } },
        output: {
          comments: function (node, comment) {
            if (comment.type === "comment2") {
              // multiline comment
              return /@preserve|@license|@cc_on|^!/i.test(comment.value);
            }
            return false;
          },
        },
      }),
    ],
  });
  const result = await bundle.generate({ format: "cjs", compact: true });
  expect(result.output).toHaveLength(1);
  const [output] = result.output;
  expect(output.code).toEqual(
    '"use strict";window.a=5,\n/* @preserve this comment */\nwindow.a<3&&console.log(4);'
  );
});

test("allow method shorthand definitions passing to worker", async () => {
  const bundle = await rollup({
    input: "test/fixtures/commented.js",
    plugins: [
      terser({
        mangle: { properties: { regex: /^_/ } },
        output: {
          comments(node, comment) {
            if (comment.type === "comment2") {
              // multiline comment
              return /@preserve|@license|@cc_on|^!/i.test(comment.value);
            }
            return false;
          },
        },
      }),
    ],
  });
  const result = await bundle.generate({ format: "cjs", compact: true });
  expect(result.output).toHaveLength(1);
  const [output] = result.output;
  expect(output.code).toEqual(
    '"use strict";window.a=5,\n/* @preserve this comment */\nwindow.a<3&&console.log(4);'
  );
});

test("allow arrow function definitions passing to worker", async () => {
  const bundle = await rollup({
    input: "test/fixtures/unminified.js",
    plugins: [
      terser({
        mangle: { properties: { regex: /^_/ } },
        output: {
          comments: (node, comment) => {
            if (comment.type === "comment2") {
              // multiline comment
              return /@preserve|@license|@cc_on|^!/i.test(comment.value);
            }
            return false;
          },
        },
      }),
    ],
  });
  const result = await bundle.generate({ format: "cjs" });
  expect(result.output).toHaveLength(1);
  const [output] = result.output;
  expect(output.code).toEqual(
    '"use strict";window.a=5,window.a<3&&console.log(4);\n'
  );
});

test("allow to pass not string values to worker", async () => {
  const bundle = await rollup({
    input: "test/fixtures/unminified.js",
    plugins: [terser({ mangle: { properties: { regex: /^_/ } } })],
  });
  const result = await bundle.generate({ format: "cjs" });
  expect(result.output[0].code).toEqual(
    '"use strict";window.a=5,window.a<3&&console.log(4);\n'
  );
});