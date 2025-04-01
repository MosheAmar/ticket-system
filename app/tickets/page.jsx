'use client'

import Cards from "../tickets/cards/page";
import TableView from "../tickets/table/page";
import AddTicket from "../tickets/add-ticket/page";
import { useState } from "react";
import { Button } from "@/components/ui/button";


export default function Tickets () {
    const [tickets, setTickets] = useState([])
    const [isCardDisplay, setIsCardDisplay] = useState(true)

    return (
        <>
            <div className="flex justify-center gap-5 mt-1">
                <h1 className="leading-8">Choose ticket layout:</h1>
                <Button variant={'outline'} onClick={()=>setIsCardDisplay(!isCardDisplay)}>{isCardDisplay ? 'Table Display' : 'Cards Display'}</Button>
            </div>
            <div>
                {isCardDisplay ? <Cards tickets={tickets}/> : <TableView tickets={tickets}/>}
            </div>
            <AddTicket setTickets={setTickets}/>
        </>
    )
}