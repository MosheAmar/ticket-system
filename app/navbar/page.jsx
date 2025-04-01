import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Navbar () {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    return (
       <nav className="flex justify-between items-center py-2 px-4">
        <h1 className="font-bold text-2xl">Ticket System</h1>
        {session ? (
            <div onClick={async ()=>{
                'use server'
                await auth.api.signOut({
                    headers: await headers()
                })
                redirect("/")
            }}>
                <Button variant={'secondary'}>Log Out</Button>
            </div>
        ) : (
            <div className="flex gap-2">
                <Link href="/login">
                    <Button variant={'secondary'}>Log In</Button>
                </Link>
                <Link href="/sign-up">
                    <Button>Sign Up</Button>
                </Link>
            </div>
        )}
       </nav> 
    )
}