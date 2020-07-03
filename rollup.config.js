import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import {terser} from 'rollup-plugin-terser'

import packageJson from './package.json'

export default {
	input: 'src/index.ts',
	output: {
		file: packageJson.main,
		format: 'cjs',
		sourcemap: true,
	},
	plugins: [
		peerDepsExternal(),
		resolve({
			browser: true
		}),
		typescript(),
		commonjs({
			include: ['node_modules/**'],
			namedExports: {
				react: [
					'useState',
					'useEffect',
				]
			}
		}),
		terser() // minify
	]
}
