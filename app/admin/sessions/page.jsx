
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { getSession } from "../admin"
export default async function Sessions () {
    const sessions = await getSession()

    return (
        <Table className="mt-6 mb-6">
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">User ID</TableHead>
                <TableHead>Token</TableHead>
                <TableHead>Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {(sessions.length > 0) ? (
                    sessions.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.id}</TableCell>
                            <TableCell>{user.token}</TableCell>
                            <TableCell>{user.updatedAt.toString()}</TableCell>
                        </TableRow>
                    ))
                ) : (
                    <></>
                )}
            </TableBody>
        </Table>
    )
}