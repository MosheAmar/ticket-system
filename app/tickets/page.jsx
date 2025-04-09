'use client'

import Cards from "../tickets/cards/page";
import TableView from "../tickets/table/page";
import AddTicket from "../tickets/add-ticket/page";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";


export default function Tickets ({ savedTickets }) {
    const [tickets, setTickets] = useState(savedTickets || [])
    const [isCardDisplay, setIsCardDisplay] = useState(true)

    return (
        <>
            <div className="flex justify-center gap-5 mt-2">
                <h1 className="leading-8">Choose tickets layout:</h1>
                <div className="flex justify-between w-[120]">
                    <Button variant={isCardDisplay ? 'outline' : 'secondary'} onClick={()=>setIsCardDisplay(!isCardDisplay)}>
                        <i className="bi bi-grid-3x3-gap-fill"></i>
                    </Button>
                    <Separator orientation="vertical" />
                    <Button variant={isCardDisplay ? 'secondary' : 'outline'} onClick={()=>setIsCardDisplay(!isCardDisplay)}>
                        <i className="bi bi-card-list"></i>
                    </Button>
                </div>
            </div>
            <div>
                {isCardDisplay ? <Cards tickets={tickets} setTickets={setTickets}/> : <TableView tickets={tickets} setTickets={setTickets}/>}
            </div>
            <AddTicket setTickets={setTickets}/>
        </>
    )
}