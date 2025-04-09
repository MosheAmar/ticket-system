import { deleteTicket, getTickets } from "@/app/actions"

export default function Cards ({tickets, setTickets}) {

    async function handleClick (id) {
            deleteTicket(id)
            const tickets = await getTickets()
            setTickets(JSON.parse(tickets))
    }

    return (
        <div className="flex flex-wrap gap-2 mt-3 mb-6 justify-center">
            {tickets?.map((ticket)=>(
                <div className="flex  mb-1" key={ticket._id}>
                    <div className="flex flex-col justify-between shadow-lg p-3 mt-6 rounded w-[200px]">
                        <div className="font-bold">{ticket.title}</div>
                        <div className="text-sm mb-6 mt-3">{ticket.description}</div>
                        <div className="flex justify-evenly text-xs bg-secondary">
                            <span>{ticket.updatedAt.split('T')[1].slice(0, 5)}</span>   
                            <span>{ticket.updatedAt.split('T')[0]}</span>
                        </div>
                        <div className="text-center" onClick={()=>{handleClick(ticket._id)}}>
                            <i className="bi bi-trash3 text-red-700 text-lg h-20 leading-20"></i>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}