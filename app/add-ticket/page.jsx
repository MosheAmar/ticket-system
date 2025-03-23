'use client'

import { Button } from "@/components/ui/button"
import { 
    Dialog, 
    DialogClose, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useState } from "react"

export default function AddTicket ({tickets, setTickets}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    function addTicket () {
        if (title.length > 0 && description.length > 0) {
            const ticketsCopy = [...tickets]
            const currentDate = new Date();
            const hours = String(currentDate.getHours()).padStart(2, '0');
            const minutes = String(currentDate.getMinutes()).padStart(2, '0');
            const seconds = String(currentDate.getSeconds()).padStart(2, '0');
            const formattedDate = currentDate.toISOString().split('T')[0];
            const date = `${formattedDate}   ${hours}:${minutes}:${seconds}`;
            const newTicket = {title, description, date}
            ticketsCopy.push(newTicket)
            localStorage.setItem('savedTickets', JSON.stringify(ticketsCopy))
            setTickets(ticketsCopy)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Ticket</Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-100 flex flex-col rounded fixed inset-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 w-[200px] h-fit">
                <DialogHeader className="items-center font-bold">
                    <DialogTitle>Add Ticket</DialogTitle>
                </DialogHeader>
                <form className="flex flex-col gap-2 m-2">
                    <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-xs">Title</label>
                    <input value={title} required className="text-xs outline-2 rounded p-1" type="text" placeholder="Ticket title" onChange={(e)=>{setTitle(e.target.value)}}/>
                    </div>
                    <div className="flex flex-col gap-2">
                    <label htmlFor="" className="text-xs">Description</label>
                    <textarea value={description} required className="text-xs outline-2 rounded p-1" placeholder="Ticket description" onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                    </div>
                </form>
                <div className="text-center">
                <DialogClose className="" asChild>
                    <Button className="" onClick={()=>addTicket()}>Add</Button>
                </DialogClose>
                </div>  
            </DialogContent>
        </Dialog>
    )
}
