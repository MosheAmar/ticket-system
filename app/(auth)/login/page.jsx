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
    CardFooter,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { redirect, useRouter } from "next/navigation"
import Link from "next/link"
import { loginFormSchema } from "@/lib/auth-schema"

export default function Login() {
    const router = useRouter()  
    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
            },
    })

    async function onSubmit(values) {
        const { data, error } = await authClient.signIn.email({
            email: values.email,
            password: values.password,
            }, {
                onRequest: (ctx) => {
                    //show loading
                },
                onSuccess: (ctx) => {
                    window.location.href = '/dashboard'
                },
                onError: (ctx) => {
                    // display the error message
                    alert(ctx.error.message)
                },
        })
    }

return (
    <Card className={"w-full max-w-md mx-auto"}>
        <CardHeader>
            <CardTitle className="text-2xl">Log in</CardTitle>
            <CardDescription>
            Welcome back!
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        Log in
                    </Button>
                </form>
            </Form>
        </CardContent>
        <CardFooter className={"flex justify-center"}>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="underline underline-offset-4">
                    Sign up
                </Link>
            </div>
        </CardFooter>

    </Card>
)



}
