import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default async function auth(req:any, res:any) {
  const providers = [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      id: "login",
      name: "Login",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        code: { label: "code", type: "number", placeholder: "jsmith" },
        email: { label: "email", type: "email", placeholder: "mail" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/verify`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    
  ]

  const isDefaultSigninPage = req.method === "GET" && req.query.nextauth.includes("signin")

  // Will hide the `GoogleProvider` when you visit `/api/auth/signin`
  if (isDefaultSigninPage) providers.pop()

  return await NextAuth(req, res, {
    providers,
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
      maxAge: 60 * 60,
    },
    jwt: {
      // The maximum age of the NextAuth.js issued JWT in seconds.
      // Defaults to `session.maxAge`.
      // 30 * 24 * 60 * 60, // 30 days
      // set to 1 hour
      maxAge: 60 * 60,
    },
    pages: {
      signIn: "/verify",
    },
    callbacks: {
      async jwt({ token, user, session }) {
        if (user) {
          return {
            ...token,
            token: user.token,
            id: user.user.id,
            role: user.user.role,
            fullName: user.user.fullName,
          };
        }
        return token;
      },

      async session({ session, token }) {
        // console.log("SESSION CALLBACK", session, token);

        return { ...session, user: token };
      },
    },
  })
}