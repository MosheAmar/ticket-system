'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import Cards from "../cards/page";
import TableView from "../table/page";
import AddTicket from "../addTicket/page";

export default function Dashboard () {
    const [tickets, setTickets] = useState([]);
    const [isCardDisplay, setIsCardDisplay] = useState(true);
    useEffect(()=> {
        const savedTickets = localStorage.getItem('savedTickets')
        console.log(JSON.parse(savedTickets))
        if (JSON.parse(savedTickets)) {
            setTickets(JSON.parse(savedTickets))
        }
    }, [])

    return (
        <main className="my-7 flex flex-col items-center">
            <div className="flex justify-center gap-5">
                <h1 className="font-bold text-xl leading-8">Manage your tickets here!</h1>
                <Button variant={'outline'} onClick={()=>setIsCardDisplay(!isCardDisplay)}>{isCardDisplay ? 'Table Display' : 'Cards Display'}</Button>
            </div>
            <div>
                {isCardDisplay ? <Cards tickets={tickets}/> : <TableView tickets={tickets}/>}
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Create Ticket</Button>
                </DialogTrigger>
                <AddTicket tickets={tickets} setTickets={setTickets}/>
            </Dialog>
        </main>
    );
}