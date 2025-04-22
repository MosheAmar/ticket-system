'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

export default function Home() {
  const { isPending, data } = useSession()
  if (!isPending && data?.user) {window.location.href = "/dashboard"}

  return (
    <main className="sm:px-24 px-4">
      <Card className="rounded-2xl bg-slate-950 shadow-2xl text-white text-center my-8">
        <div className="mx-auto max-w-[683px] mt-[20px]">
          <h1 className="text-6xl font-bold leading-tight">
            Your new ticket manager
          </h1>
          <p className="text-3xl mt-2">Try it now ;)</p>
          <Link href="/sign-up">
            <Button className="mt-12" variant={"secondary"} size={"lg"}>
              Sign up
            </Button>
          </Link>
        </div>
      </Card>
    </main>
  )
}
