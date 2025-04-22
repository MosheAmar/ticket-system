import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { admin } from "better-auth/plugins"

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
    enabled: true
  },
  plugins: [
    admin()
  ],
})
