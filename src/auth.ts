import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode"

export const authOptions = {

    pages: {
        signIn: '/signin'
    },

    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", "placeholder": "amjad@email.com" },
                password: { label: "Password", type: "password" },
            },
            authorize: async function (credentials) {
                const response = await fetch(`${process.env.API}/auth/signin`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: { "Content-Type": "application/json" }
                })
                const payload = await response.json();
                console.log(payload);

                if (payload.message === 'success') {
                    const { id }: { id: string } = jwtDecode(payload.token) as { id: string };
                    return {
                        id: id,
                        user: payload.user,
                        token: payload.token
                    }
                }

                throw new Error(payload.message || "failed to log in");
            }
        }
        )
    ],

    callbacks: {
        async jwt({ token, user }: { token: Record<string, unknown>; user: Record<string, unknown> }) {
            if (user) {
                token.user = user?.user;
                token.token = user?.token;
            }

            return token;
        },

        async session({ session, token }: { session: Record<string, unknown>; token: Record<string, unknown> }) {
            if (token) {
                session.user = token?.user;
            }

            return session;
        }
    }
}