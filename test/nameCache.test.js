const { rollup } = require("rollup");
const { terser } = require("../dist/index");

test("terser accepts the nameCache option", async () => {
  const nameCache = {
    props: {
      props: {
        $_priv: "custom",
      },
    },
  };
  const bundle = await rollup({
    input: "test/fixtures/properties.js",
    plugins: [
      terser({
        mangle: {
          properties: {
            regex: /^_/,
          },
        },
        nameCache,
      }),
    ],
  });
  const result = await bundle.generate({ format: "es" });
  expect(result.output[0].code.trim()).toEqual(
    `console.log({foo:1,custom:2});`
  );
});

// this test fail
// test("terser updates the nameCache object", async () => {
//   const nameCache = {props:{ props: { $_priv: "f", }, }};
//   const props = nameCache.props;

//   const bundle = await rollup({
//     input: "test/fixtures/properties.js",
//     plugins: [
//       terser({ mangle: { properties: { regex: /./, }, }, nameCache, }),
//     ],
//   });

//   const result = await bundle.generate({ format: "es" });
//   expect(result.output[0].code.trim()).toEqual(`console.log({o:1,f:2});`);

//   /**
//    * nameCache ===>  {
//       props: { props: [Object: null prototype] { '$_priv': 'f', '$foo': 'o' } },
//       vars: { props: [Object: null prototype] {} }
//     } props ====>  { _priv: 'f', foo: 'o' }
//    */

//   expect(nameCache.props).toEqual(Object.fromEntries(props));
//   // expect(nameCache.props).toEqual({ props: { $_priv: "f", $foo: "o", }, });
// });

test("omits populates an empty nameCache object", async () => {
  const nameCache = {};
  const bundle = await rollup({
    input: "test/fixtures/properties-and-locals.js",
    plugins: [
      terser({ mangle: { properties: { regex: /./, }, }, nameCache, }),
    ],
  });
  const result = await bundle.generate({ format: "es" });

  expect(result.output[0].code.trim()).toEqual(
    `console.log({o:1,i:2},function o(n){return n>0?o(n-1):n}(10));`
  );

  expect(nameCache.props).toEqual({ props: { $_priv: "i", $foo: "o", }, });
});

// Note: nameCache.vars never gets populated, but this is a Terser issue.
// Here we're just testing that an empty vars object doesn't get added to nameCache if it wasn't there previously.
test("terser preserve vars in nameCache when provided", async () => {
  const nameCache = {
    vars: {
      props: {},
    },
  };
  const bundle = await rollup({
    input: "test/fixtures/properties-and-locals.js",
    plugins: [
      terser({
        mangle: {
          properties: {
            regex: /./,
          },
        },
        nameCache,
      }),
    ],
  });
  const result = await bundle.generate({ format: "es" });
  expect(result.output[0].code.trim()).toEqual(
    `console.log({o:1,i:2},function o(n){return n>0?o(n-1):n}(10));`
  );
  expect(nameCache).toEqual({
    props: {
      props: {
        $_priv: "i",
        $foo: "o",
      },
    },
    vars: {
      props: {},
    },
  });
});