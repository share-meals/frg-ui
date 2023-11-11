import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import {peerDependencies} from './package.json';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    build: {
	lib: {
	    entry: path.resolve(__dirname, 'src/index.tsx'),
	    formats: [
		'es',
		'umd'
	    ],
	    fileName: (format) => `frg-ui.${format}.js`,
	    name: 'frg-ui',
	},
	rollupOptions: {
	    external: Object.keys(peerDependencies),
	    output: {
		globals: {
		    '@ionic/react': 'IonicReact',
		    react: 'React',
		    'react-dom': 'ReactDom',
		    'react-hook-form': 'ReactHookForm',
		}
	    }
	}
    },
    plugins: [
	cssInjectedByJsPlugin(),
	dts({
	    insertTypesEntry: true
	}),
	react(),
	tsconfigPaths(),
    ],
    test: {
	cache: {
	    dir: './.vitest'
	},
	environment: 'jsdom',
	globals: true,
	setupFiles: './src/setupTests.ts'
    }
});
