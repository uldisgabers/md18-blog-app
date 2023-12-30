import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "admin", password: "admin", email: "admin@admin.com" }
  
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ] 
}

// export default async function auth(req: NextApiRequest, res: NextApiResponse) {
//   // Do whatever you want here, before the request is passed down to `NextAuth`
//   return await NextAuth(req, res, {
//     providers: [
//       CredentialsProvider({
//         // The name to display on the sign in form (e.g. "Sign in with...")
//         name: "Credentials",
//         // `credentials` is used to generate a form on the sign in page.
//         // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//         // e.g. domain, username, password, 2FA token, etc.
//         // You can pass any HTML attribute to the <input> tag through the object.
//         credentials: {
//           username: { label: "Username", type: "text", placeholder: "admin" },
//           password: { label: "Password", type: "password" }
//         },
//         async authorize(credentials, req) {
//           // Add logic here to look up the user from the credentials supplied
//           const user = { id: "1", name: "admin", email: "admin@admin.com" }
    
//           if (user) {
//             // Any object returned will be saved in `user` property of the JWT
//             return user
//           } else {
//             // If you return null then an error will be displayed advising the user to check their details.
//             return null
    
//             // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//           }
//         }
//       })
//     ] 
//   })
// }

export const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}