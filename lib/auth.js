import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb"

const client = new MongoClient("mongodb+srv://moshe-amar:T3dyo1zohb1ugZb3@cluster0.touaz.mongodb.net/ticket-system?retryWrites=true&w=majority")
const db = client.db()

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
})