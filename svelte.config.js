import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import autoprefixer from "autoprefixer";
import tailwindcss from 'tailwindcss';
import { mdsvex } from "mdsvex";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	extensions: [".svelte", ".md"],
	preprocess: [
		mdsvex({
			extensions: [".md"],
			layout: {
        blog: "src/routes/blog/_post.svelte"
      }
		}),
		preprocess()
	],
	plugins: [autoprefixer(), tailwindcss()],
	kit: {
		adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: null
		})
	}
};

export default config;
