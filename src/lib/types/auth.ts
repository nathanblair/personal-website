import type { Session as AuthSession, User } from '@auth/sveltekit'

export type Session = AuthSession & {
	user?: User & { admin: boolean; id: number }
}
