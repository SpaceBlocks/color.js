import { terser } from "rollup-plugin-terser";

let bundles = [
	{
		"file": "dist/color.iife.js",
		"format": "iife",
		"sourcemap": true,
		"name": "Color"
	},
	{
		"file": "dist/color.js",
		"format": "esm",
		"sourcemap": true,
	},
	{
		"file": "dist/color.cjs",
		"format": "cjs",
		"sourcemap": true,
		"exports": "named",
	},
];

// Add minified versions of every bundle
bundles = bundles.flatMap(bundle => {
	let minBundle = Object.assign({}, bundle);
	minBundle.file = minBundle.file.replace(/\.\w+$/, ".min$&");
	minBundle.plugins ||= [];
	minBundle.plugins.push(terser({
		compress: true,
		mangle: true
	}));

	return [bundle, minBundle];
});

export default {
	input: "src/main.js",
	output: bundles,
	onwarn (warning, rollupWarn) {
		if (warning.code !== 'CIRCULAR_DEPENDENCY') {
			rollupWarn(warning);
		}
	}
};