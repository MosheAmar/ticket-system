import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { admin } from "better-auth/plugins"
import { sendEmail } from "@/app/actions";

const client = new MongoClient(process.env.MONGODB_URI)
export const db = client.db()

export const auth = betterAuth({
  database: mongodbAdapter(db),
  user: {
      additionalFields: {
        firstName: {
          type: 'string',
          required: true,
        },
        lastName: {
          type: 'string',
          required: true,
        },
        email: {
          type: 'string',
          defaultValue: ""
        },
        password: {
          type: 'string',
          defaultValue: ""
        },
      },
  },
  emailAndPassword: {  
    enabled: true,
    sendResetPassword: async ({user, url, token}, request) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
  },
  socialProviders: {
    facebook: { 
        clientId: process.env.FACEBOOK_CLIENT_ID, 
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        scopes: ["email", "public_profile", "user_friends"], 
    },
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
  },  
},
  plugins: [
    admin()
  ],
})
