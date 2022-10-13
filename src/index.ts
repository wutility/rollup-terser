import { OutputOptions } from "rollup";
import { minify, MinifyOptions } from "terser";

export function terser(options?: MinifyOptions) {
	return {
		name: 'transform-code',
		async renderChunk(code: string, chunk: any, outputOptions: OutputOptions) {

			const defaultOptions: MinifyOptions = {
				module: outputOptions.format === "es" || outputOptions.format === "esm",
				toplevel: outputOptions.format === "cjs",
				sourceMap: false,
				...options
			};

			const result = await minify(code, defaultOptions);
			return result.code;
		}
	};
}