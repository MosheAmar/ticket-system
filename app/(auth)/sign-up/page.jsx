'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
    CardFooter,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"
import Link from "next/link"
import { formSchema } from "@/lib/auth-schema"
import { initTickets } from "@/app/actions"

export default function Signup() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            },
    })

    async function onSubmit(values) {
        const { firstName, lastName, email, password } = values
        const { data, error } = await authClient.signUp.email({
            firstName,
            lastName,
            email,
            password,
            }, {
                onRequest: (ctx) => {
                    //show loading
                },
                onSuccess: async (ctx) => {
                    initTickets()
                    redirect('/dashboard')
                },
                onError: (ctx) => {
                    // display the error message
                    alert(ctx.error.message)
                },
        })
        console.log(values)
    }

return (
    <Card className={"w-full max-w-md mx-auto"}>
        <CardHeader>
            <CardTitle className="text-2xl">Sign up</CardTitle>
            <CardDescription>
            Create your account
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="w-full">
                        Sign Up
                    </Button>
                </form>
            </Form>
        </CardContent>
        <CardFooter className={"flex justify-center"}>
            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                    Log in
                </Link>
            </div>
        </CardFooter>

    </Card>
)



}
