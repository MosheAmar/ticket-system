
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { getUsers } from "../admin"


export default async function Users () {
    const users = await getUsers()

    return (
        <Table className="mt-6 mb-6">
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">User ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users?.map((user) => (
                <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.updatedAt.toString()}</TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}