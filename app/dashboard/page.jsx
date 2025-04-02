
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Tickets from "../tickets/page";
import { redirect } from "next/navigation";
import { mp } from "@/lib/mixpanel";
import { getTickets } from "../actions";

export default async function Dashboard () {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) {
        redirect("/un-auth");
    }

    const user = session?.user

    mp.people.set(user.id, {
        $first_name: user.firstName,
        $last_name: user.lastName,
        $created: (new Date('jan 1 2013')).toISOString(),
    });
    mp.track("Page View", {page: 'dashboard', distinct_id: user.id})

    const savedTickets = await getTickets()

    return (
        <main className="my-7 flex flex-col items-center">
            <div className="flex justify-center gap-5">
                <h1 className="font-bold text-xl leading-8">Hi {user?.firstName}, Manage your tickets here!</h1>
            </div>
            <Tickets savedTickets={JSON.parse(savedTickets)}/>
        </main>
    );
}
