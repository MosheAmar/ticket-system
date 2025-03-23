import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="sm:px-24 px-4">
      <Card className="rounded-2xl bg-slate-950 shadow-2xl text-white text-center my-8">
        <div className="mx-auto max-w-[683px] mt-[20px]">
          <h1 className="text-6xl font-bold leading-tight">
            Your new ticket manager
          </h1>
          <p className="text-3xl mt-2">Try it now ;)</p>
          <Button className="mt-12" variant={"secondary"} size={"lg"}>
            Sign up
          </Button>
        </div>
      </Card>
    </main>
  )
}
