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
import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"
import { z } from "zod"
  

export default function BanUser() {
    const formSchema = z.object({
        userId: z.string(),
        banReason: z.string().min(2, {
            message: "Last name must be at least 2 characters.",
        })
        .max(15, {
            message: "Last name must be up to 15 characters.",
        }),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userId: "",
            },
    })

    async function onSubmit(values) {
        const { userId, banReason } = values
        await authClient.admin.banUser({
            userId,
            banReason,
        })
        redirect("/admin")
    }

    return (
        <Card className={"w-full max-w-md mx-auto my-4"}>
            <CardHeader>
                <CardTitle className="text-xl">Ban user</CardTitle>
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
                        <FormField
                        control={form.control}
                        name="banReason"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Reason for banning (optional)</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="w-full">
                            Ban user
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
