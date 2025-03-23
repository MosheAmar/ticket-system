import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

export default function TableView ({tickets}) {
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
                <TableRow key={ticket.title}>
                    <TableCell className="font-medium">{ticket.title}</TableCell>
                    <TableCell>{ticket.description}</TableCell>
                    <TableCell>{ticket.date}</TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}