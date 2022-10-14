const { rollup } = require("rollup");
const { terser } = require("../dist/index");

test("throw error on terser fail", async () => {
  try {
    const bundle = await rollup({
      input: "test/fixtures/failed.js",
      plugins: [
        {
          renderChunk: () => ({ code: "var = 1" }),
        },
        terser(),
      ],
    });
    await bundle.generate({ format: "esm" });
    expect(true).toBeFalsy();
  } catch (error) {
    expect(error.toString()).toMatch(/Name expected/);
  }
});

test("throw error on terser fail with multiple outputs", async () => {
  try {
    const bundle = await rollup({
      input: "test/fixtures/failed.js",
      plugins: [
        {
          renderChunk: () => ({ code: "var = 1" }),
        },
        terser(),
      ],
    });
    await Promise.all([
      bundle.generate({ format: "cjs" }),
      bundle.generate({ format: "esm" }),
    ]);
    expect(true).toBeFalsy();
  } catch (error) {
    expect(error.toString()).toMatch(/Name expected/);
  }
});
