import Link from "next/link";

export default function NotAuthorized() {
    return (
        <main className="text-center mt-4">
            You are not authorized, please{"  "} 
            <Link href="/login" className="underline underline-offset-4">
                Log in
            </Link> 
            {"  "}or{"  "}
            <Link href="/sign-up" className="underline underline-offset-4">
                Sign up
            </Link>
        </main>
    );
}