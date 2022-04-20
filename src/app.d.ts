/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

interface Post {
	meta: {
		date: string,
		title: string,
		preamble: string,
		author: string,
		category: string,
	},
	path: string
}
