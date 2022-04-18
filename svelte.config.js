import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import autoprefixer from "autoprefixer";
import tailwindcss from 'tailwindcss';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),
	plugins: [autoprefixer(), tailwindcss()],
	kit: {
		adapter: adapter()
	}
};

export default config;
