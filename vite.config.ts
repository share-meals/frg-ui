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
	'esm',
	'umd'
      ],
      fileName: (format) => `index.${format}.js`,
    name: 'frg-ui',
    },
    minify: false,
    rollupOptions: {
      external: [
	'@hookform/error-message',
	'@ionic/react',
	'react',
	'react-dom',
	'react-hook-form',
	'react/jsx-runtime',
      ],
      output: {
	globals: {
	  '@hookform/error-message': 'ErrorMessage',
	  '@ionic/react': 'IonicReact',
	  'react': 'React',
	  'react-dom': 'ReactDom',
	  'react-hook-form': 'ReactHookForm',
	  'react/jsx-runtime': 'ReactJSXRuntime',
	}
      }
    }
  },
  plugins: [
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
