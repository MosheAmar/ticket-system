import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: "https://ticket-system1.vercel.app/api/auth"
})

export const { signIn, signUp, useSession } = createAuthClient()
