'use client'

import Link from "next/link"
import { Button } from "./ui/button"

export default function NavbarClient({ isAdmin, isSession, logOut }) {
  return (
    <nav className="flex justify-between items-center py-2 px-4">
    <h1 className="font-bold text-2xl">Ticket System</h1>
    {isAdmin ? (
       <Link href="/admin">
            <Button variant={'secondary'}>User Management</Button>
        </Link> 
    ) : (
        <></>
    )}
    {isSession ? (
        <div onClick={()=>{logOut(); window.location.href = "/"}} className="flex gap-2 cursor-pointer">
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
