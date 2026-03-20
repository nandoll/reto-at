import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { users } from '@/data/users-seed'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = users.find(
          (u) =>
            u.email === credentials?.email &&
            u.password === credentials?.password
        )

        if (!user) return null

        return { id: user.id, name: user.name, email: user.email }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isProtected = nextUrl.pathname.startsWith('/profile')

      if (isProtected && !isLoggedIn) {
        return Response.redirect(new URL('/login', nextUrl))
      }

      return true
    },
  },
})
