// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: {
				GITHUB_APP_CLIENT_ID: string
				GITHUB_APP_SECRET: string
				GITHUB_APP_INSTALL_ID: number
			}
		}
	}
}

export { }

