'use client'

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Cards from "../cards/page";
import TableView from "../table/page";
import AddTicket from "../add-ticket/page";
import { redirect } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Dashboard () {
    const [tickets, setTickets] = useState([]);
    const [isCardDisplay, setIsCardDisplay] = useState(true);
    useEffect(()=> {
        const savedTickets = localStorage.getItem('savedTickets')
        if (JSON.parse(savedTickets)) {
            setTickets(JSON.parse(savedTickets))
        }
    }, [])

    const { isAuthenticated, isLoading, user } = useKindeBrowserClient();
    
    if (!isAuthenticated && !isLoading) {
      redirect("/unAuth");
    }

    return (
        <main className="my-7 flex flex-col items-center">
            <div className="flex justify-center gap-5">
                <h1 className="font-bold text-xl leading-8">Hi {user?.given_name}, Manage your tickets here!</h1>
                <Button variant={'outline'} onClick={()=>setIsCardDisplay(!isCardDisplay)}>{isCardDisplay ? 'Table Display' : 'Cards Display'}</Button>
            </div>
            <div>
                {isCardDisplay ? <Cards tickets={tickets}/> : <TableView tickets={tickets}/>}
            </div>
            <AddTicket tickets={tickets} setTickets={setTickets}/>
        </main>
    );
}
