import { join, dirname } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, 'package.json')));
}

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
    stories: [
	'../src/**/*.stories.tsx',
    ],
    addons: [
	getAbsolutePath('@storybook/addon-a11y'),
	getAbsolutePath('storybook-dark-mode'),
	getAbsolutePath('@storybook/addon-essentials'),
	getAbsolutePath('@storybook/addon-viewport'),
    ],
    framework: {
	name: getAbsolutePath('@storybook/react-vite'),
	options: {},
    },
    docs: {
	autodocs: 'tag',
    },
};
export default config;
