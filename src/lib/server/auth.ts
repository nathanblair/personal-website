import { env as dynamicEnv } from '$env/dynamic/private'
import { SvelteKitAuth } from '@auth/sveltekit'
import GitHub from '@auth/sveltekit/providers/github'

const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
	return {
		providers: [
			GitHub({
				clientId: dynamicEnv.GITHUB_APP_CLIENT_ID,
				clientSecret: dynamicEnv.GITHUB_APP_CLIENT_SECRET,
			}),
		],
		session: { strategy: 'jwt' },
		trustHost: true,
		callbacks: {
			jwt: async ({ token, profile }) => {
				// Will only be populated on 'signIn' trigger
				if (profile) {
					const configAdmins =
						(await event.platform?.env.config.get('ADMINS')) ||
						dynamicEnv.ADMINS
					const admins = JSON.parse(configAdmins)
					token.admin = admins.includes(profile.id)
					token.sub = profile.id || undefined
				}

				return token
			},
			session: async ({ session, token }) => {
				// @ts-ignore
				session.user.admin = token.admin
				session.user.id = token.sub || ''
				return session
			},
		},
	}
})

export { handle, signIn, signOut }
