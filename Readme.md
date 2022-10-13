# Rollup terser plugin

Rollup plugin to minify generated bundle. Uses [terser](https://github.com/terser/terser) under the hood.

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