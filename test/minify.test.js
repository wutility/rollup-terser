const { rollup } = require("rollup");
const { terser } = require("../dist/index");

test("minify", async () => {
  const bundle = await rollup({
    input: "test/fixtures/unminified.js",
    plugins: [terser()],
  });
  const result = await bundle.generate({ format: "cjs" });
  expect(result.output).toHaveLength(1);

  const [output] = result.output;
  expect(output.code).toEqual('"use strict";window.a=5,window.a<3&&console.log(4);\n');
  expect(output.map).toBeFalsy();
});

test("minify via terser options", async () => {
  const bundle = await rollup({
    input: "test/fixtures/empty.js",
    plugins: [terser({ format: { comments: "all" } })],
  });

  const result = await bundle.generate({ banner: "/* package name */", format: "cjs" });
  expect(result.output).toHaveLength(1);

  const [output] = result.output;
  expect(output.code).toEqual('/* package name */\n"use strict";\n');
  expect(output.map).toBeFalsy();
});

test("minify multiple outputs", async () => {
  const bundle = await rollup({ input: "test/fixtures/unminified.js", plugins: [terser()], });

  const [bundle1, bundle2] = await Promise.all([
    bundle.generate({ format: "cjs" }),
    bundle.generate({ format: "es" }),
  ]);
  const [output1] = bundle1.output;
  const [output2] = bundle2.output;

  expect(output1.code).toEqual(
    '"use strict";window.a=5,window.a<3&&console.log(4);\n'
  );
  expect(output2.code).toEqual("window.a=5,window.a<3&&console.log(4);\n");
});

test("minify esm module", async () => {
  const bundle = await rollup({
    input: "test/fixtures/plain-file.js",
    plugins: [terser()],
  });
  const result = await bundle.generate({ format: "esm" });
  expect(result.output).toHaveLength(1);
  const [output] = result.output;
  expect(output.code).toEqual('console.log("bar");\n');
});

test("minify esm module with disabled module option", async () => {
  const bundle = await rollup({
    input: "test/fixtures/plain-file.js",
    plugins: [terser({ module: false })],
  });
  const result = await bundle.generate({ format: "esm" });
  expect(result.output).toHaveLength(1);
  const [output] = result.output;
  expect(output.code).toEqual('const foo="bar";console.log(foo);\n');
});

test("minify cjs module", async () => {
  const bundle = await rollup({
    input: "test/fixtures/plain-file.js",
    plugins: [terser()],
  });
  const result = await bundle.generate({ format: "cjs" });
  expect(result.output).toHaveLength(1);
  const [output] = result.output;
  expect(output.code).toEqual('"use strict";console.log("bar");\n');
});

test("minify cjs module with disabled toplevel option", async () => {
  const bundle = await rollup({
    input: "test/fixtures/plain-file.js",
    plugins: [terser({ toplevel: false })],
  });
  const result = await bundle.generate({ format: "cjs" });
  expect(result.output).toHaveLength(1);
  const [output] = result.output;
  expect(output.code).toEqual(
    '"use strict";const foo="bar";console.log(foo);\n'
  );
});
