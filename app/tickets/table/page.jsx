import { deleteTicket, getTickets } from "@/app/actions"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

export default function TableView ({tickets, setTickets}) {

    async function handleClick (id) {
            deleteTicket(id)
            const tickets = await getTickets()
            setTickets(JSON.parse(tickets))
    }

    return (
        <Table className="mt-6 mb-6">
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tickets?.map((ticket) => (
                <TableRow key={ticket._id}>
                    <TableCell className="font-medium">{ticket.title}</TableCell>
                    <TableCell>{ticket.description}</TableCell>
                    <TableCell>
                    <span>{ticket.updatedAt.split('T')[1].slice(0, 5)} </span>   
                    <span>{ticket.updatedAt.split('T')[0]}</span>
                    </TableCell>
                    <TableCell>
                        <div className="text-center" onClick={()=>{handleClick(ticket._id)}}>
                            <i className="bi bi-trash3 text-red-700 text-lg h-20 leading-20"></i>
                        </div>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}