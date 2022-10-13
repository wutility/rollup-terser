const typescript = require('@rollup/plugin-typescript');
const cjs = require('@rollup/plugin-commonjs');
// const { nodeResolve } = require('@rollup/plugin-node-resolve');

module.exports = {
  strictDeprecations: true,
  input: "src/index.ts",
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
      sourcemap: true,
    }
  ],
  plugins: [
    cjs(),
    // nodeResolve(),
    typescript({ sourceMap: true, removeComments: true })
  ]
};