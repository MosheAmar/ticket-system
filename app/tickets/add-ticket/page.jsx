'use client'

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
    Dialog, 
    DialogClose, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useRef, useState } from "react"
import { addTicket, getTickets } from "@/app/actions"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"

export default function AddTicket ({setTickets}) {
    const dialog = useRef()

    const formSchema = z.object({
        title: z.string().min(1, {
            message: "Title must have at least 2 characters.",
        })
        .max(15, {
            message: "Title must have up to 15 characters.",
        }),
        description: z.string().min(2, {
            message: "Description must have at least 2 characters.",
        })
        .max(100, {
            message: "Description must have up to 100 characters.",
        }),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            },
    })

    async function onSubmit (values) {
        const { title, description } = values
        addTicket(title, description)
        const tickets = await getTickets()
        setTickets(JSON.parse(tickets))
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Ticket</Button>
            </DialogTrigger>
            <DialogContent ref={dialog} className="bg-neutral-50 flex flex-col rounded-xl fixed inset-1/2 transform -translate-x-1/2 -translate-y-1/2 py-8 px-6 w-[350px] h-fit">
                <DialogHeader className="items-center font-bold">
                    <DialogTitle className="font-bold text-2xl">Add Ticket</DialogTitle>
                </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <div className="flex justify-between">
                                <DialogClose asChild>
                                    <Button variant="destructive" className="w-30">Close</Button>
                                </DialogClose>
                                <Button data-slot="dialog-close" data-state="open" type="submit" className="w-30">Create</Button>
                            </div>
                        </form>
                    </Form>
            </DialogContent>
        </Dialog>
    )
}
