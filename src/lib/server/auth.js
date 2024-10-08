import { env as dynamic_env } from "$env/dynamic/private"
import { SvelteKitAuth } from '@auth/sveltekit'
import GitHub from '@auth/sveltekit/providers/github'

/** @type {number[]} */
let admins = []

/** @param {import("@cloudflare/workers-types").KVNamespace} config */
export async function init(config) {
  const config_admins = await config.get('ADMINS') || dynamic_env.ADMINS
  admins = JSON.parse(config_admins)
  return true
}

const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
  const github_client_id = await event.platform?.env.config.get("GITHUB_APP_CLIENT_ID") || dynamic_env.GITHUB_APP_CLIENT_ID
  const github_secret = dynamic_env.GITHUB_APP_CLIENT_SECRET
  return {
    providers: [
      GitHub({
        clientId: github_client_id,
        clientSecret: github_secret,
        profile(profile) {
          const p = {
            ...profile,
            id: `${profile.id}`,
            image: profile.avatar_url,
            role: admins.includes(profile.id) ? 'admin' : 'user',
            // role: 'user',
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
