# Rollup terser plugin

[Rollup](https://github.com/rollup/rollup) [plugin](https://rollupjs.org/guide/en/#plugin-development) to minify generated bundle. Uses [terser](https://github.com/terser/terser) under the hood.

![Version](https://img.shields.io/npm/v/rollup-terser.svg) ![license](https://badgen.net/npm/license/rollup-terser) ![node](https://badgen.net/npm/node/rollup-terser) ![Downloads](https://badgen.net/npm/dt/rollup-terser) ![dependency](https://badgen.net/bundlephobia/dependency-count/rollup-terser) ![Size](https://badgen.net/bundlephobia/minzip/rollup-terser)

# Install

```shell
yarn add -D rollup-plugin-terser
# Or with npm:
npm i -D rollup-plugin-terser
```

# Usage

```js
import { rollup } from "rollup";
import { terser } from "rollup-plugin-terser";

rollup({
  input: "main.js",
  plugins: [terser(options?: MinifyOptions)],
});
```

# Options

This plugin takes a configuration object for the [Terser MinifyOptions](https://github.com/terser/terser#minify-options-structure).

# Tests

Code origin: [rollup-plugin-terser](https://github.com/TrySound/rollup-plugin-terser/tree/master/test)

# License

MIT @[Haikel Fazzani](https://github.com/haikelfazzani)