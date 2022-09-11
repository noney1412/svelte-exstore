import { browser, dev } from '$app/environment';
import type { Middleware } from '$lib/types/ExMiddleware';
import { get } from 'svelte/store';
import { isReadyForBrowser } from './utils';

interface WithReduxDevtoolsOption {
	/**
	 * The name of the action to be displayed in the Redux DevTools.
	 */
	name?: string;
	/**
	 * The latency of the action to be displayed in the Redux DevTools.
	 * @default 100
	 */
	latency?: number;
}

function initDevtool(options: WithReduxDevtoolsOption = { name: 'anonymous', latency: 100 }) {
	if (!isReadyForBrowser()) return;

	const devTools =
		(window as any).window.__REDUX_DEVTOOLS_EXTENSION__ &&
		(window as any).__REDUX_DEVTOOLS_EXTENSION__.connect(options);

	return devTools;
}

function getDevtool() {
	if (!isReadyForBrowser()) return;

	return (window as any).__REDUX_DEVTOOLS_EXTENSION__;
}

const middlewareByName = new Map();

function withReduxDevtool<State>(middleware: Middleware<State>) {
	update();
	initStore();

	function initStore() {
		if (!isReadyForBrowser()) return;

		if (middlewareByName.has(middleware.storeName)) return;
		middlewareByName.set(middleware.storeName, middleware);

		const devTools = initDevtool({
			name: 'document.title'
		});

		if (!devTools) return;

		devTools.init(middleware.initialState);

		devTools.subscribe((message: any) => {
			console.log(message);
		});
	}

	function update() {
		if (middlewareByName.has(middleware.storeName)) {
			const devTools = getDevtool();

			if (!devTools) return;

			console.log(middleware.storeName);

			devTools.send({ type: middleware.currentActionName }, get(middleware.store), [
				{
					name: middleware.storeName
				}
			]);
		}
	}
}

export default withReduxDevtool;
