import { env as dynamic_env } from '$env/dynamic/private'
import { SvelteKitAuth } from '@auth/sveltekit'
import GitHub from '@auth/sveltekit/providers/github'

const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
	return {
		providers: [
			GitHub({
				clientId: dynamic_env.GITHUB_APP_CLIENT_ID,
				clientSecret: dynamic_env.GITHUB_APP_CLIENT_SECRET,
			}),
		],
		session: { strategy: 'jwt' },
		trustHost: true,
		callbacks: {
			jwt: async ({ token, profile }) => {
				// Will only be populated on 'signIn' trigger
				if (profile) {
					const config_admins =
						(await event.platform?.env.config.get('ADMINS')) ||
						dynamic_env.ADMINS
					const admins = JSON.parse(config_admins)
					token.admin = admins.includes(profile.id)
					token.sub = profile.id || undefined
				}

				return token
			},

			session: async ({ session, token }) => {
				// @ts-ignore
				session.user.admin = token.admin
				session.user.id = token.sub || ''
				console.log(session.user)
				return session
			},
		},
	}
})

export { handle, signIn, signOut }
