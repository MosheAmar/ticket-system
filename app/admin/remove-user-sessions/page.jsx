'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { removeUser } from "@/app/actions"
import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"
  

export default function CreateUser() {
    const formSchema = z.object({
        userId: z.string()
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userId: "",
            },
    })

    async function onSubmit(values) {
        const { userId } = values
        await authClient.admin.revokeUserSessions({
            userId,
        })
        removeUser(userId)
        redirect("/admin/sessions")
    }

return (
    <Card className={"w-full max-w-md mx-auto my-4"}>
        <CardHeader>
            <CardTitle className="text-xl">Revoke user sessions</CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                    control={form.control}
                    name="userId"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>User ID</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="w-full">
                        Revoke user sessions
                    </Button>
                </form>
            </Form>
        </CardContent>
    </Card>
)



}
