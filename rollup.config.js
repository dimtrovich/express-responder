import { terser } from 'rollup-plugin-terser';

export default {
	input: 'src/index.js',
	output: [
		{
			file: 'dist/bundle.cjs',
			format: 'cjs'
		},
		{
			file: 'dist/bundle.min.cjs',
			format: 'cjs',
			name: 'version',
      		plugins: [terser()]
		}
	]
};
