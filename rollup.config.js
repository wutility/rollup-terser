const typescript = require('@rollup/plugin-typescript');
const cjs = require('@rollup/plugin-commonjs');
// const { nodeResolve } = require('@rollup/plugin-node-resolve');

const isProduction = process.env.NODE_ENV === 'production';
console.log('isProduction => ', isProduction);

module.exports = {
  strictDeprecations: true,
  input: "src/index.ts",
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: !isProduction,
    },
    {
      file: 'dist/index.mjs',
      format: 'es',
      sourcemap: !isProduction,
    }
  ],
  plugins: [
    cjs(),
    // nodeResolve(),
    typescript({ sourceMap: !isProduction, removeComments: true })
  ]
};