'use client';

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
import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/lib/auth-client";

export default function ResetPassword() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

  const formSchema = z.object({
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    })
    .max(50, {
        message: "Password must be up to 50 characters.",
    }),
  })
  const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            },
  })

  async function onSubmit(values) {
    const { error } = await resetPassword({
        token,
        newPassword: values.password,
      });
  }
    
  return (
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <p className="text-sm text-gray-600 mb-4">
          Enter your new password.
        </p>
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>New Password</FormLabel>
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
  );
}