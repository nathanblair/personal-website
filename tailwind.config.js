import { skeleton } from '@skeletonlabs/skeleton/plugin'
import forms from '@tailwindcss/forms'
import { join } from 'path'
import rocket from './src/theme.js'

/** @type {import('tailwindcss').Config} \*/
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton-svelte'), '../**/*.{html,js,svelte,ts}')
	],
	darkMode: ['selector'],
	theme: {
		extend: {},
	},
	plugins: [
		forms,
		skeleton({
			themes: [
				rocket,
			]
		})
	]
}
