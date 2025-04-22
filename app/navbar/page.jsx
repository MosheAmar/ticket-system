
import NavbarClient from "@/components/navbar-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Navbar () {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const isSession = session?.user ? true : false
    const isAdmin = session?.user?.role === "admin" ? true : false
    async function logOut () {
        'use server'
        await auth.api.signOut({
            headers: await headers()
        })
    }

    return <NavbarClient isAdmin={isAdmin} isSession={isSession} logOut={logOut} />
}