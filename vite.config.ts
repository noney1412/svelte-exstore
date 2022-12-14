/// <reference types="vitest" />
/// <reference types="@sveltejs/kit" />

import { sveltekit } from '@sveltejs/kit/vite';
import WindiCSS from 'vite-plugin-windicss';
import type { UserConfigExport } from 'vite';
import { resolve } from 'path';
import { vitestTypescriptAssertPlugin } from 'vite-plugin-vitest-typescript-assert';

const config: UserConfigExport = {
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: 'src/setupTests.ts',
		silent: false
	},
	plugins: [sveltekit(), WindiCSS(), vitestTypescriptAssertPlugin()],
	resolve: {
		alias: {
			$routes: resolve('./src/routes'),
			$examples: resolve('./src/examples')
		}
	},
	server: {
		port: parseInt(process.env.PORT ?? '5500') || 5500
	}
};

export default config;
