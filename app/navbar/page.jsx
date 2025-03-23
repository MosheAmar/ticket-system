import { Button } from "@/components/ui/button";
import { 
    LoginLink, 
    LogoutLink, 
    RegisterLink,
  } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Navbar () {
    const {isAuthenticated} = getKindeServerSession();
    const isAuthed = await isAuthenticated();
    return (
       <nav className="flex justify-between items-center py-2 px-4">
        <h1 className="font-bold text-2xl">Ticket System</h1>
        {isAuthed ? (
            <LogoutLink>
                <Button variant={'secondary'}>Log Out</Button>
            </LogoutLink>
        ) : (
            <div className="flex gap-2">
                <LoginLink>
                    <Button variant={'secondary'}>Log In</Button>
                </LoginLink>
                <RegisterLink>
                    <Button>Sign Up</Button>
                </RegisterLink>
            </div>
        )}
       </nav> 
    )
}