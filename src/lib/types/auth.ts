import type { Session as AuthSession, User } from '@auth/sveltekit'

export interface Session extends AuthSession {
	user?: User & { admin?: boolean; id: number }
}
