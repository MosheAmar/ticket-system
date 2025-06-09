"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { forgetPassword } from "@/lib/auth-client";
import { findUser } from "@/app/actions";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [sentLink, setSentLink] = useState(false);

  const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email."
    }),
  })
  const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            },
  })

  async function onSubmit(values) {

    const data = await findUser(values.email);
    const user = JSON.parse(data);

    if (user) {
        const { error } = await forgetPassword({
            email: values.email,
            redirectTo: `${window.location.origin}/login/reset-password`,
        });
        setSentLink(true);
    } else {
        alert("User not found. Please check your email address.");
    }
  }
    
  return (
     <>
      {!sentLink ? (
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
        <p className="text-sm text-gray-600 mb-4">
          Enter your email address to receive a password reset link.
        </p>
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
                    <Button type="submit" className="w-full">
                        Reset Password
                    </Button>
                </form>
            </Form>
        </div> 
        ) : (
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Check Your Email</h2>
          <p className="text-sm text-gray-600 mb-4">
            A password reset link has been sent to your email address.
            Check your inbox and follow the instructions to reset your password.
          </p>
          <Link href="/login" className="text-blue-500 hover:underline">
            Back to Login
          </Link>
        </div>
        )}
     </> 
  );
}