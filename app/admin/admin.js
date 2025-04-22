'use server'

import { auth } from "@/lib/auth"
import { headers } from "next/headers"


export async function getUsers() {
    const users = await auth.api.listUsers({
        query: {
            limit: 10,
          },
          headers: await headers()
    })
    return users.users
}

export async function getSession() {
    const usersList = await getUsers()
    
    const sessionPromises = usersList?.map(async (user) => {
        const userSessions = await auth.api.listUserSessions({
            body: {
                userId: user.id,
            },
            headers: await headers()
        })
        const [session] = userSessions.sessions
        return session
    });

    const allSessions = await Promise.all(sessionPromises)
    const sessionsList = allSessions.filter(session => session !== undefined)

    return sessionsList
}