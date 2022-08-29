import { terser } from 'rollup-plugin-terser';

export default {
	input: 'src/index.js',
	output: [
		{
			file: 'dist/bundle.js',
			format: 'cjs'
		},
		{
			file: 'dist/bundle.min.js',
			format: 'cjs',
			name: 'version',
      		plugins: [terser()]
		}
	]
};
