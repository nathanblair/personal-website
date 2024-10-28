import { env as dynamic_env } from "$env/dynamic/private"
import { SvelteKitAuth } from '@auth/sveltekit'
import GitHub from '@auth/sveltekit/providers/github'

const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
  return {
    providers: [
      GitHub({
        clientId: dynamic_env.GITHUB_APP_CLIENT_ID,
        clientSecret: dynamic_env.GITHUB_APP_CLIENT_SECRET,
        async profile(profile) {
          const config_admins = await event.platform?.env.config.get('ADMINS') || dynamic_env.ADMINS
          const admins = JSON.parse(config_admins)

          const p = {
            ...profile,
            id: `${profile.id}`,
            image: profile.avatar_url,
            role: admins.includes(profile.id) ? 'admin' : 'user',
          }
          return p
        }
      }),
    ],
    session: { strategy: "jwt" },
    trustHost: true,
    callbacks: {
      jwt: async ({ token, user }) => {
        if (user) {
          // @ts-ignore
          token.role = user.role
        }
        return token
      },
      session: ({ session, token }) => { return { ...session, ...token } },
    }
  }
})

export { handle, signIn, signOut }
