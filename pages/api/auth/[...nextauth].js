import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongo from '../../../database/conn'
import Users from '../../../model/UserSchema'
import { compare } from 'bcryptjs';

export default NextAuth({
    providers: [
        // Google Provider
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID,
        //     clientSecret: process.env.GOOGLE_SECRET
        // }),

        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {

                connectMongo().catch(error => { error: "Connection Failed...!" })

                // check user existance
                const result = await Users.findOne({ email: credentials.email })
                if (!result) {
                    throw new Error("No user Found with Email Please Sign Up...!")
                }

                // compare()
                const checkPassword = await compare(credentials.password, result.password);

                // incorrect password
                if (!checkPassword || result.email !== credentials.email) {
                    throw new Error("Username or Password doesn't match");
                }
                
                return result;

            }
        }),


        // CredentialsProvider({
        //     // The name to display on the sign in form (e.g. 'Sign in with...')
        //     name: 'Credentials',
        //     // The credentials is used to generate a suitable form on the sign in page.
        //     // You can specify whatever fields you are expecting to be submitted.
        //     // e.g. domain, username, password, 2FA token, etc.
        //     // You can pass any HTML attribute to the <input> tag through the object.
        //     async authorize(credentials, req) {
        //         // You need to provide your own logic here that takes the credentials
        //         // submitted and returns either a object representing a user or value
        //         // that is false/null if the credentials are invalid.
        //         // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        //         // You can also use the `req` object to obtain additional parameters
        //         // (i.e., the request IP address)
        //         const { email, password } = credentials;
        //         // console.log({ email, password });

        //         const user = await Users.findOne({ email }).exec();
        //         console.log(user)
        //         const userDoc = user._doc
        //         const isMatched = await compare(password, userDoc.password);
        //         // console.log('user', { userDoc });

        //         if (user && isMatched) {
        //             delete userDoc.password;
        //             return userDoc;
        //         } else {
        //             throw new Error('Email or Password Incorrect...!')
        //         }
        //     }
        // })

    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        session: async ({ session, token }) => {
            // console.log(token)
            if (session?.user) {
                session.user.id = token.uid;
                session.user = await Users.findOne({ _id: token.uid })
            }

            return session;
        },
        jwt: async ({ user, token }) => {
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
    },
    secret: "OJuZVgT6cGSz9tq7Xz0BtQactb9n7AuVnA4Nvsan3KQ=",
    session: {
        strategy: 'jwt',
    },
})